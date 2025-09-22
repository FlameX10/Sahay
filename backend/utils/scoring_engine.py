def calculate_phq9_score(answers):
    if len(answers) != 9:
        raise ValueError("PHQ-9 requires exactly 9 answers")

    score = sum(answers)

    if score <= 4:
        severity = "none_minimal"
        message = "You’re doing okay. Keep checking in weekly!"
        counselor_referral = False
    elif score <= 9:
        severity = "mild"
        message = "Some symptoms — try a breathing exercise or journaling?"
        counselor_referral = False
    elif score <= 14:
        severity = "moderate"
        message = "Consider talking to a counselor soon. You don’t have to do this alone."
        counselor_referral = False
    elif score <= 19:
        severity = "moderately_severe"
        message = "Strongly recommend booking a counselor session. We can help you connect."
        counselor_referral = True
    else:
        severity = "severe"
        message = "Please connect with a counselor immediately. Tap below to book a confidential slot."
        counselor_referral = True

    return {
        "score": score,
        "severity": severity,
        "message": message,
        "counselor_referral": counselor_referral
    }


def calculate_gad7_score(answers):
    if len(answers) != 7:
        raise ValueError("GAD-7 requires exactly 7 answers")

    score = sum(answers)

    if score <= 4:
        severity = "none_minimal"
        message = "Low anxiety — great! Keep using calm tools."
        counselor_referral = False
    elif score <= 9:
        severity = "mild"
        message = "Mild stress — try a guided meditation or walk?"
        counselor_referral = False
    elif score <= 14:
        severity = "moderate"
        message = "Moderate anxiety — counselor chat recommended. Tap to book."
        counselor_referral = True
    else:
        severity = "severe"
        message = "High anxiety — please book counselor now. Immediate support available."
        counselor_referral = True

    return {
        "score": score,
        "severity": severity,
        "message": message,
        "counselor_referral": counselor_referral
    }