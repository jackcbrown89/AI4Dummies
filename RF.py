import pandas as pd, numpy as np, pickle
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn import svm


def first_phase():
    df = pd.read_csv('data.csv')
    df.replace('?', -1, inplace=True)

    d = df.drop(['id', 'class'], axis=1).as_matrix()
    targets = df['class'].as_matrix()


    rf_scores, svm_scores = [], []


    x_train, x_test, y_train, y_test = train_test_split(d, targets, test_size=1/3)

    rf = RandomForestClassifier()
    rf.fit(x_train, y_train)
    
    with open('rf_model.pkl', 'wb') as f:
        pickle.dump(rf, f)
    
    clf = svm.SVC()
    clf.fit(x_train, y_train)
    
    rf_results = rf.predict(x_test)
    svm_results = clf.predict(x_test)
    
    rf_wrong = [df.drop(['class', 'id'], axis=1).as_matrix()[x] for x in range(0,len(rf_results)) if rf_results[x]!=y_test[x]]
    svm_wrong = [df.drop(['class', 'id'], axis=1).as_matrix()[x] for x in range(0,len(svm_results)) if svm_results[x]!=y_test[x]]
    
    rf_score = len([x for x in range(0,len(rf_results)) if rf_results[x]==y_test[x]])/len(x_test)
    svm_score = len([x for x in range(0,len(svm_results)) if svm_results[x]==y_test[x]])/len(x_test)
    print('RF score: %s\n' % rf_score)
    print('SVM score: %s\n' % svm_score)
    
    return rf_score

def second_phase():
    df = pd.read_csv('data.csv')
    df.replace('?', -1, inplace=True)

    d = df.drop(['id', 'class'], axis=1).as_matrix()
    targets = df['class'].as_matrix()


    rf_scores, svm_scores = [], []


    x_train, x_test, y_train, y_test = train_test_split(d, targets, test_size=1/3)

    rf = RandomForestClassifier()
    rf.fit(x_train, y_train)
    
    with open('rf_model.pkl', 'rb') as f:
        rf = cPickle.load(f)
    
    clf = svm.SVC()
    clf.fit(x_train, y_train)
    
    rf_results = rf.predict(x_test)
    svm_results = clf.predict(x_test)
    
    rf_wrong = [df.drop(['class', 'id'], axis=1).as_matrix()[x] for x in range(0,len(rf_results)) if rf_results[x]!=y_test[x]]
    svm_wrong = [df.drop(['class', 'id'], axis=1).as_matrix()[x] for x in range(0,len(svm_results)) if svm_results[x]!=y_test[x]]
    
    rf_score = len([x for x in range(0,len(results)) if results[x]==y_test[x]])/len(x_test)
    svm_score = len([x for x in range(0,len(results)) if results[x]==y_test[x]])/len(x_test)
    print('RF score: %s\n' % rf_score)
    print('SVM score: %s\n' % svm_score)
    
    rf.save()
    
    return []

    #import matplotlib.pyplot as plt
    #
    #plt.plot(rf_scores, color='b')
    #plt.plot(svm_scores, color='r')
    #print(np.mean(rf_scores), np.mean(svm_scores))
    #plt.show()
#    print(rf.predict_proba(rf_wrong))