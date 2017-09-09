import pandas as pd, numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

df = pd.read_csv('data/wdbc.csv')
df.replace('?', -1, inplace=True)

d = df.drop(['id', 'class'], axis=1).as_matrix()
targets = df['class'].as_matrix()


rf_scores, svm_scores = [], []


x_train, x_test, y_train, y_test = train_test_split(d, targets, test_size=1/3)

rf = RandomForestClassifier()
rf.fit(x_train, y_train)

results = rf.predict(x_test)
score = len([x for x in range(0,len(results)) if results[x]==y_test[x]])/len(x_test)
rf_scores.append(score)
print(score)
rf_wrong = [df.drop(['class', 'id'], axis=1).as_matrix()[x] for x in range(0,len(results)) if results[x]!=y_test[x]]
print(results)
from sklearn import svm

clf = svm.SVC()
clf.fit(x_train, y_train)
results = clf.predict(x_test)
score = len([x for x in range(0,len(results)) if results[x]==y_test[x]])/len(x_test)
svm_scores.append(score)
print('%s\n' % score)

#import matplotlib.pyplot as plt
#
#plt.plot(rf_scores, color='b')
#plt.plot(svm_scores, color='r')
#print(np.mean(rf_scores), np.mean(svm_scores))
#plt.show()
print(rf.predict_proba(rf_wrong))