context_keywords = {
    "academic": ["exam", "test", "fail", "grade", "study", "result", "math", "subject"],
    "family": ["parent", "mom", "dad", "family", "pressure", "expectation", "burden"],
    "social": ["friend", "alone", "lonely", "isolated", "bully", "group"],
    "self_worth": ["worthless", "useless", "failure", "not good enough", "disappointed"],
    "crisis": ["die", "end", "disappear", "tired of life", "no point", "suicide"]
}

def detect_context(text):
    if not text:
        return []
    text = text.lower()
    detected = []
    for tag, keywords in context_keywords.items():
        if any(kw in text for kw in keywords):
            detected.append(tag)
    return detected