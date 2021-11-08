import os
from flask import Flask, session,send_from_directory, request, render_template
#from flask_restful import Api, reqparse
from sqlalchemy import create_engine, text
import sqlalchemy
from sqlalchemy.sql.expression import null
from werkzeug.utils import redirect
from flask.helpers import flash, url_for
from models import db, Patient
from logging import FileHandler,WARNING
from forms import LoginForm, RegisterForm, DateForm
from flask_wtf.csrf import CSRFProtect

app = Flask(__name__)
APP_DIR = os.path.abspath(os.path.dirname(__file__)) #/habit/backend

@app.route('/main')
def main():
    return render_template('index.html')

@app.route('/',methods = ['GET','POST'])
def login():
    form = LoginForm()
    if request.method == 'GET':
        return render_template('login.html', form=form)
    else:
        userEmail = request.form.get('userEmail')
        userPassword = request.form.get('userPassword')
        print(userEmail, userPassword)
        # patient = Patient().query.filter_by(patient_email = userEmail).first()

        # if not patient:
        #     flash('존재하지 않는 아이디입니다')
        # else:
        #     if patient.patient_pw == userPassword:
        #         session['patient_id'] = patient.patient_id
        #         return redirect('/main')
        #     else:
        #         flash('비밀번호가 맞지 않습니다')
        #         return render_template('login.html',form=form)

@app.route('/register',methods=['GET','POST'])
def register():
    form = RegisterForm()
    if form.validate_on_submit():
        patient_id = request.form.get['userEmail']
        age = request.form.get['userAge']
        name = request.form.get['userName']
        pw = request.form.get['userPassword']
        pwck = request.form.get['userPasswordCheck']
        weight = request.form.get['userWeight']
        height = request.form.get['userHeight']
        birth_date = request.form.get['userBirthDate']
        gender = request.form.get['gender']
        phone_number = request.form.get['userPhoneNum']
        if pw != pwck:
            flash('비밀번호가 맞지 않습니다')
        else:
            new_patient = Patient(patient_id,name, pw, age, weight, height, birth_date, gender, illness=null, medicine=null ,phone_number=phone_number)

            db.session.add(new_patient)
            db.session.commit()
            flash('회원가입 완료')
            return redirect('/main')
    else:
        return render_template('register.html', form=form)

@app.route('/logout')
def logout():
    session['logged in'] = False
    return redirect(url_for('home'))

@app.route('/user/diet', methods=['GET','POST'])
def diet():
    if request.method == 'POST':
        date = request.form.get('datepicker')
        return redirect('/user/diet/%s'%date)
    else:
        return render_template('diet.html')

@app.route('/user/diet/<dietdate>')
def show_diet(dietdate):
    return render_template('showDiet.html',dietdate = dietdate)

if __name__ == '__main__':
    basedir = os.path.abspath(os.path.dirname(__file__))
    dbfile = os.path.join(basedir, 'db.sqlite')

    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + dbfile
    app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = '526553af16de8020fd3b0fbd'

    # csrf = CSRFProtect()
    # csrf.init_app(app)

    db.init_app(app) #초기화 후 db.app에 app으로 명시적으로 넣어줌
    db.app = app
    db.create_all()   #db 생성

    app.run(host="0.0.0.0",port="5000",debug=True)
    # app.run(debug=True)