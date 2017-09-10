import pandas as pd, numpy as np, pickle
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn import svm
from flask import jsonify

def first_phase(target, ID, to_drop):
    target = target.strip()
    df = pd.read_csv('data.csv')
    targets = df[target].as_matrix()
    for col in df.columns:
        if col in to_drop:
            df.drop(col, axis=1, inplace=True)
    
    for col in df.columns:
        df[col] = pd.to_numeric(df[col], errors='coerce').fillna(-1)
        
    d = df.as_matrix()
    
    rf_scores, svm_scores = [], []
    x_train, x_test, y_train, y_test = train_test_split(d, targets, test_size=1/3)

    rf = RandomForestClassifier()
    rf.fit(x_train, y_train)
    feature_importance = rf.feature_importances_
    
    with open('rf_model.txt', 'wb') as f:
        pickle.dump(rf, f, 0)
    
    clf = svm.SVC()
    clf.fit(x_train, y_train)
    
    rf_results = rf.predict(x_test)
    svm_results = clf.predict(x_test)
    
    rf_wrong = [df.as_matrix()[x] for x in range(0,len(rf_results)) if rf_results[x]!=y_test[x]]
    svm_wrong = [df.as_matrix()[x] for x in range(0,len(svm_results)) if svm_results[x]!=y_test[x]]

    rf_score = len([x for x in range(0,len(rf_results)) if rf_results[x]==y_test[x]])/len(x_test)
    svm_score = len([x for x in range(0,len(svm_results)) if svm_results[x]==y_test[x]])/len(x_test)
    
    return feature_importance, rf_score

def prepred_model(target, to_drop, feature_importance):
    df = pd.read_csv('data.csv')
    targets = df[target].as_matrix()
    for col in df.columns:
        if col in to_drop:
            df.drop(col, axis=1, inplace=True)
    
    for col in df.columns:
        df[col] = pd.to_numeric(df[col], errors='coerce').fillna(-1)
    
    cols = [x for x in df.columns if x not in to_drop]
    pred_in_cols = ','.join(cols)
    avgs = [df[x].mean() for x in cols]
    avg = {key: value for (key, value) in zip(cols,avgs)}
    f_imp = {key: value for (key, value) in zip(cols,feature_importance)}
    feature_dict = jsonify(dict({'avg': avg, 'f_imp': f_imp}))
    return feature_dict

def predict(pred_input):
    rf = pickle.load(open('rf_model.txt', 'rb'))
    rf_results = rf.predict(pred_input)
    
    return str(rf_results)
