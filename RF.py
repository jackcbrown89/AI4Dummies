import pandas as pd, numpy as np, pickle
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn import svm

def first_phase(target, ID):
    df = pd.read_csv('data.csv')
    print(target.strip())
    targets = df[target].as_matrix()
    global to_drop
    to_drop = [target, ID]
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
    print('RF score: %s\n' % rf_score)
    print('SVM score: %s\n' % svm_score)
    
    return rf_score

def prepred_model():
#    rf = pickle.load(open('rf_model.txt', 'rb'))
    df = pd.read_csv('data.csv')
    pred_in_cols = ','.join([x for x in df.columns if x not in to_drop])
    
    return pred_in_cols

def predict(pred_input):
    rf = pickle.load(open('rf_model.txt', 'rb'))
    rf_results = rf.predict(pred_input)
    
    return str(rf_results)
    
    #import matplotlib.pyplot as plt
    #
    #plt.plot(rf_scores, color='b')
    #plt.plot(svm_scores, color='r')
    #print(np.mean(rf_scores), np.mean(svm_scores))
    #plt.show()
#    print(rf.predict_proba(rf_wrong))
