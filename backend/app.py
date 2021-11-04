import os
from flask import Flask, session,send_from_directory, request
from flask.templating import render_template
#from flask_restful import Api, reqparse
from flask_cors import CORS
from flask_cors.core import serialize_option, serialize_options
# react는 포트 3000 flask는 5000써서 나는 API오류제거 위함
from sqlalchemy import create_engine, text
import sqlalchemy
from werkzeug.utils import redirect
from flask.helpers import url_for
from models import db, Patient
from logging import FileHandler,WARNING

app = Flask(__name__, static_url_path='', static_folder='./frontend/public')

@app.route('/')
def test():
    return 'asd'

@app.route('/pages/login',methods = ['GET','POST'])
def login():
    if request.method == 'GET':
        return render_template('login.html')
    else:
        # id  = request.form['patient_id']
        name = request.form['name']
        pw = request.form['password']
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

        user = request.get_json['user']
        patient_id = user['email']
        age = user['age']
        name = user['name']
        pw = user['password']
        weight = user['weight']
        height = user['height']
        birth_date = user['birth_date']
        gender = user['gender']
        phone_number = user['phone_number']

        new_register = Patient(email, name, pw)

        db.session.add(new_register)
        db.session.commit()
        return user
    else:
        return render_template('register.html')

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

    app.run(debug=True)