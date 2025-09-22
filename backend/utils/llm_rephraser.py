import requests
import os
from utils.context_detector import detect_context

OLLAMA_HOST = os.getenv('OLLAMA_HOST', '')

def is_safe_rephrase(text):
    forbidden = ["should", "must", "go to", "talk to", "don’t", "never", "call", "helpline"]
    if any(word in text.lower() for word in forbidden):
        return False
    if len(text.split()) > 25:  # avoid essays
        return False
    return True

def rephrase_with_llama(original_question, context_text=""):
    if not OLLAMA_HOST:
        return None  # LLM disabled

    # Build prompt
    prompt = f"""
You are a mental health assistant helping rephrase clinical screening questions to feel more personal and contextual — WITHOUT changing their clinical intent.

Original Question: "{original_question}"
User Context: "{context_text}"

Rephrase this question to feel more relevant to the user’s situation, while keeping the exact same meaning.
Use simple, compassionate, Indian-student-friendly language.
Do NOT give advice, solutions, or interpretations.
Max 15 words.

Rephrased Question:
""".strip()

    try:
        response = requests.post(
            f"{OLLAMA_HOST}/api/generate",
            json={
                "model": "llama3",
                "prompt": prompt,
                "stream": False
            },
            timeout=10
        )
        if response.status_code == 200:
            result = response.json()
            rephrased = result.get('response', '').strip().strip('"').strip("'")
            if is_safe_rephrase(rephrased):
                return rephrased
    except Exception as e:
        print("LLM Error:", e)

    return None  # fallback if error or unsafe