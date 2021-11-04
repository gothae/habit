import os
from flask import Flask, session,send_from_directory, request
from flask.templating import render_template
#from flask_restful import Api, reqparse
from flask_cors import CORS
from flask_cors.core import serialize_option, serialize_options
# react는 포트 3000 flask는 5000써서 나는 API오류제거 위함
from sqlalchemy import create_engine, text
import sqlalchemy
from sqlalchemy.sql.expression import null
from werkzeug.utils import redirect
from flask.helpers import flash, url_for
from models import db, Patient
from logging import FileHandler,WARNING

app = Flask(__name__, static_url_path='', static_folder='./frontend/public')
CORS(app)

@app.route('/')
def test():
    return render_template('index.html')

@app.route('/pages/login',methods = ['GET','POST'])
def login():
    if request.method == 'GET':
        return render_template('login.html')
    else:
        userEmail = request.get_json()['userEmail']
        userPassword = request.get_json()['userPassword']        
        return 'test'
        # try:
        #     patient = Patient().query.filter_by(patient_email = userEmail).first()
        #     if !patient:
                # flash('존재하지 않는 아이디입니다')
            # else:
                # if user.patient_pw == userPassword
                # session['patient_id'] = patient.patient_id
                # else:
                # flash('비밀번호가 맞지 않습니다')
            # return '수도코드'
        # except:
        #     return 'Dont login'

@app.route('/pages/register',methods=['GET','POST'])
def register():
    if request.method == 'POST':

        user = request.get_json()['user']
        patient_id = user['email']
        age = user['age']
        name = user['name']
        pw = user['password']
        weight = user['weight']
        height = user['height']
        birth_date = user['birth_date']
        gender = user['gender']
        phone_number = user['phone_number']

        new_patient = Patient(patient_id,name, pw, age, weight, height, birth_date, gender, illness=null, medicine=null ,phone_number=phone_number)
        print(new_patient)
        db.session.add(new_patient)
        db.session.commit()
        return user
    else:
        return redirect(url_for('/pages/register'))

@app.route('/logout')
def logout():
    session['logged in'] = False
    return redirect(url_for('home'))

if __name__ == '__main__':
    basedir = os.path.abspath(os.path.dirname(__file__))
    dbfile = os.path.join(basedir, 'db.sqlite')

    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + dbfile
    app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = '526553af16de8020fd3b0fbd'

    db.init_app(app) #초기화 후 db.app에 app으로 명시적으로 넣어줌
    db.app = app
    db.create_all()   #db 생성

    app.run(host="0.0.0.0",port="5000",debug=True)