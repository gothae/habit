from flask import Flask, session,send_from_directory, request
from flask.templating import render_template
from flask_restful import Api, reqparse
from flask_cors import CORS
# react는 포트 3000 flask는 5000써서 나는 API오류제거 위함
from sqlalchemy import create_engine, text
import sqlalchemy
from werkzeug.utils import redirect
from flask.helpers import url_for
from models import Patient

app = Flask(__name__, static_url_path='', static_folder='./frontend/public')
app.config.from_pyfile('config.py')
#static_url_path : 웹에서 정적 파일에 대해 다른경로 지정할 때
CORS(app)
api = Api(app)

database = create_engine(app.config['DB_URL'], encoding = 'utf-8')
app.database = database
# db = sqlalchemy(app)

@app.route('/pages/login',methods = ['GET','POST'])
def login():
    if request.method == 'GET':
        return render_template('login.html')
    else:
        # id  = request.form['patient_id']
        name = request.form['patient_name']
        pw = request.form['patient_pw']
        # email = request.form['patient_eail']

        try:
            data = Patient.query.filter_by(patient_name = name, patient_pw = pw).first()
            if data:
                session['logged in'] = True
                return redirect(url_for('/dashboard/default'))
            else:
                return
        except:
            return 'Dont login'

@app.route('/pages/register',methods=['GET','POST'])
def register():
    if request.method == 'POST':
        # new_patient = Patient(patient_id = request.form['patient_id'],patient_name=request.form['patient_name'],
        # patient_pw = request.form['patient_pw'],patietn_email = request.form['patient_email'])
        
        # db.session.add(new_patient)
        # db.session.commit()
        # return render_template('login.html')
        user = request.get_data()
        return user
    else:
        return render_template('register.html')

@app.route('/logout')
def logout():
    session['logged in'] = False
    return redirect(url_for('home'))

if __name__ == '__main__':
    app.run(debug=True)