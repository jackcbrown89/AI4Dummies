from flask import Flask, request, send_file
import pickle
import RF
app = Flask(__name__)

@app.route('/train', methods=['POST'])
def train():
    if request.method == 'POST':
        f = request.files['data']
        f.save('data.csv')
        target = request.form['target']
        score = RF.first_phase()
        model = send_file('rf_model.pkl')
        return model

@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        f = request.files['model']
        f.save('rf_model.pkl')
        pred_input = request.form['pred_input']
        return RF.second_phase(pred_input)
app.run(debug=True)