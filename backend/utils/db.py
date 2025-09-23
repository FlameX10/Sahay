from pymongo import MongoClient
from datetime import datetime
import os

client = MongoClient(os.getenv('MONGO_URI', 'mongodb://localhost:27017/'))
db = client['sahay_db']
assessment_logs = db['self_assessment_logs']

def save_assessment_log(int_id, assessment_type, responses, total_score, severity, counselor_referral, context_tags=None):
    log = {
        "int_id": int_id,
        "assessment_type": assessment_type,
        "responses": responses,
        "total_score": total_score,
        "severity": severity,
        "counselor_referral_triggered": counselor_referral,
        "context_tags": context_tags or [],
        "timestamp": datetime.utcnow()
    }
    result = assessment_logs.insert_one(log)
    return result.inserted_id