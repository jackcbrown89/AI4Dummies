from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
import pickle, numpy as np
import RF

app = Flask(__name__)
CORS(app)
@app.route('/', methods=['GET'])
def hello():
    return 'You just made a GET request'

@app.route('/train', methods=['POST'])
def train():
    global target
    global to_drop
    global feature_importance
    
    if request.method == 'POST':
        f = request.files['data']
        f.save('data.csv')
        target = request.form['target'].strip()
        ID = request.form['ID'].strip()
        to_drop = [target, ID]
        feature_importance, score = RF.first_phase(target, ID, to_drop)
        model = send_file('rf_model.pkl')
        return model

@app.route('/load_model', methods=['POST'])
def load_model():
    if request.method == 'POST':
        f = request.files['model']
        f.save('rf_model.pkl')
        feature_dict = RF.prepred_model(target, to_drop, feature_importance)
        return feature_dict

@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        f = request.files['model']
        f.save('rf_model.pkl')
        pred_input = np.matrix(request.form['pred_input'])
        pred_result = RF.predict(pred_input)
        return pred_result
        
@app.route('/test', methods=['POST'])
def test():
    if request.method == 'POST':
        string = request.form['string']
        
    return 'Good job!'

app.run(debug=True)