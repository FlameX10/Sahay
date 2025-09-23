from flask import Blueprint, request, jsonify
from utils.scoring_engine import calculate_phq9_score, calculate_gad7_score
from utils.context_detector import detect_context
from utils.llm_rephraser import rephrase_with_llama
from utils.db import save_assessment_log
import json
import os
# Load questions from data/questions.json
with open(os.path.join(os.path.dirname(__file__), '../../data/questions.json'), 'r') as f:
    QUESTIONS = json.load(f)

assessment_bp = Blueprint('assessment', __name__)
@assessment_bp.route('/assess', methods=['POST'])
def get_assessment_questions():
    try:
        print("=== ASSESSMENT REQUEST RECEIVED ===")
        data = request.get_json()
        print(f"Request data: {data}")
        assessment_type = data.get('assessment_type')
        context_text = data.get('context', '')
        print(f"Assessment type: {assessment_type}")
        print(f"Context: {context_text}")

        # Validate input
        if not assessment_type or assessment_type not in ['PHQ9', 'GAD7']:
            print("ERROR: Invalid assessment type")
            return jsonify({"error": "Invalid assessment type"}), 400

        # Detect context tags
        context_tags = detect_context(context_text) if context_text else []

        # Load questions
        with open(os.path.join(os.path.dirname(__file__), '../../data/questions.json'), 'r') as f:
            QUESTIONS = json.load(f)

        question_set = QUESTIONS.get(assessment_type, [])
        adaptive_questions = []

        # Process each question
        for q in question_set:
            # Try LLM rephrasing
            rephrased = None
            if context_text:
                rephrased = rephrase_with_llama(q['original'], context_text)

            # Fallback to variant
            if not rephrased and context_tags:
                matching_variants = [v for v in q.get('variants', []) if set(v['context']) & set(context_tags)]
                if matching_variants:
                    rephrased = matching_variants[0]['text']

            # Final fallback
            displayed_text = rephrased or q['original']

            adaptive_questions.append({
                "q_id": q['id'],
                "text": displayed_text,
                "options": ["Not at all", "Several days", "More than half the days", "Nearly every day"]
            })

        print(f"Returning {len(adaptive_questions)} questions")
        return jsonify(adaptive_questions)
    except Exception as e:
        print("Error in /api/assess:", str(e))
        import traceback
        traceback.print_exc()
        return jsonify({"error": "Internal server error"}), 500

@assessment_bp.route('/submit', methods=['POST'])
def submit_assessment():
    try:
        print("=== SUBMIT ASSESSMENT REQUEST RECEIVED ===")
        data = request.get_json()
        print(f"Request data: {data}")
        
        int_id = data.get('int_id')
        assessment_type = data.get('assessment_type')
        responses = data.get('responses', [])  # list of { "q_id": "...", "answer": 2 }
        context_text = data.get('context', '')

        print(f"int_id: {int_id}")
        print(f"assessment_type: {assessment_type}")
        print(f"responses: {responses}")
        print(f"context_text: {context_text}")

        context_tags = detect_context(context_text) if context_text else []
        print(f"context_tags: {context_tags}")

        answers = [r['answer'] for r in responses]
        
        print(f"Debug: Received {len(answers)} answers for {assessment_type}")
        print(f"Debug: Answers: {answers}")

        if assessment_type == "PHQ9":
            if len(answers) != 9:
                return jsonify({"error": f"PHQ-9 requires exactly 9 answers, received {len(answers)}"}), 400
            print("Calculating PHQ9 score...")
            result = calculate_phq9_score(answers)
            print(f"PHQ9 result: {result}")
        elif assessment_type == "GAD7":
            if len(answers) != 7:
                return jsonify({"error": f"GAD-7 requires exactly 7 answers, received {len(answers)}"}), 400
            print("Calculating GAD7 score...")
            result = calculate_gad7_score(answers)
            print(f"GAD7 result: {result}")
        else:
            return jsonify({"error": "Invalid assessment type"}), 400

        next_step_url = f"/book?ref={assessment_type}&score={result['score']}" if result['counselor_referral'] else None

        # Save log
        try:
            log_id = save_assessment_log(
                int_id=int_id,
                assessment_type=assessment_type,
                responses=responses,
                total_score=result['score'],
                severity=result['severity'],
                counselor_referral=result['counselor_referral'],
                context_tags=context_tags
            )
            print(f"Saved to database with log_id: {log_id}")
        except Exception as db_error:
            print(f"Database save failed: {db_error}")
            log_id = "db_error"  # Continue without failing

        response_data = {
            "total_score": result['score'],
            "severity": result['severity'],
            "message": result['message'],
            "next_step_url": next_step_url,
            "log_id": str(log_id)
        }
        
        print(f"Returning response: {response_data}")
        return jsonify(response_data)
    except Exception as e:
        print(f"Error in /api/submit: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({"error": "Internal server error"}), 500