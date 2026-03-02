from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score

def get_metrics(pipeline, X_test, y_test):
    """
    Calculates all required benchmarks for a given model pipeline.
    """
    # Get hard predictions (0 or 1)
    preds = pipeline.predict(X_test)
    
    # Get probability scores (needed for ROC-AUC)
    # [:, 1] gets the probability for the "Approved" (1) class
    probs = pipeline.predict_proba(X_test)[:, 1]
    
    metrics = {
        "accuracy": accuracy_score(y_test, preds),
        "precision": precision_score(y_test, preds),
        "recall": recall_score(y_test, preds),
        "f1": f1_score(y_test, preds),
        "roc_auc": roc_auc_score(y_test, probs)
    }
    
    return metrics