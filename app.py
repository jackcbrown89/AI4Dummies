from flask import Flask, request, send_file
import pickle, numpy as np
import RF
app = Flask(__name__)

@app.route('/train', methods=['POST'])
def train():
    if request.method == 'POST':
        f = request.files['data']
        f.save('data.csv')
        target = request.form['target']
        ID = request.form['ID']
        bad_vals = request.form['bad_vals']
        score = RF.first_phase(target, ID, bad_vals)
        model = send_file('rf_model.pkl')
        return model

@app.route('/load_model', methods=['POST'])
def load_model():
    if request.method == 'POST':
        f = request.files['model']
        f.save('rf_model.pkl')
        pred_in_size = RF.prepred_model()
        return str(pred_in_size)
    
@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        f = request.files['model']
        f.save('rf_model.pkl')
        pred_input = np.matrix(request.form['pred_input'])
        pred_result = RF.predict(pred_input)
        return pred_result
        
        
app.run(debug=True)