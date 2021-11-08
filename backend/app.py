import os
from flask import Flask, session,send_from_directory, request, render_template
#from flask_restful import Api, reqparse
# from sqlalchemy import create_engine, text
# import sqlalchemy
# from sqlalchemy.sql.expression import null
from werkzeug.utils import redirect
from flask.helpers import flash, url_for
from forms import LoginForm, RegisterForm, DateForm
from flask_wtf.csrf import CSRFProtect
# from flaskext.mysql import MySQL
from flask_mysqldb import MySQL
import MySQLdb.cursors
import re
import mysql.connector
app = Flask(__name__)
mysql = MySQL(app)
APP_DIR = os.path.abspath(os.path.dirname(__file__)) #/habit/backend
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '1234'
app.config['MYSQL_DB'] = 'Patientdb'
app.config['MYSQL_HOST'] = 'localhost'
app.secret_key = "ABfdgfdg"

mysql.init_app(app)

@app.route('/main')
def main():
    return render_template('index.html')

# @app.route('/',methods = ['GET','POST'])
# def login():
#     form = LoginForm()
#     if request.method == 'GET':
#         return render_template('login.html', form=form)
#     else:
#         userEmail = request.form.get('userEmail')
#         userPassword = request.form.get('userPassword')
#         print(userEmail, userPassword)
#         # patient = Patient().query.filter_by(patient_email = userEmail).first()

#         # if not patient:
#         #     flash('존재하지 않는 아이디입니다')
#         # else:
#         #     if patient.patient_pw == userPassword:
#         #         session['patient_id'] = patient.patient_id
#         #         return redirect('/main')
#         #     else:
#         #         flash('비밀번호가 맞지 않습니다')
#         #         return render_template('login.html',form=form)
@app.route('/',methods = ['GET','POST'])
def login():
    form = LoginForm()
    if request.method == 'GET':
        return render_template('login.html', form=form)
    else:
        userEmail = request.form.get('userEmail')
        userPassword = request.form.get('userPassword')
        #print(userEmail, userPassword)
        conn = mysql.connect()
        cursor = conn.cursor()
        sql  = "select patient_id from Patient where patient_id = %s and patient_pw = %s"
        value  = (userEmail, userPassword)
        #cursor.execute("set names utf8")
        cursor.execute(sql,value)

        data = cursor.fetchall()
        cursor.close()
        conn.close()

        for i in data:
            data = i[0]
        
        if data:
            session['patient_id'] = userEmail
            return redirect(url_for('/main'))
        else:
            error = '잘못된 정보입니다'

# @app.route('/register',methods=['GET','POST'])
# def register():
#     form = RegisterForm()
#     if form.validate_on_submit():
#         patient_id = request.form.get['userEmail']
#         age = request.form.get['userAge']
#         name = request.form.get['userName']
#         pw = request.form.get['userPassword']
#         pwck = request.form.get['userPasswordCheck']
#         weight = request.form.get['userWeight']
#         height = request.form.get['userHeight']
#         birth_date = request.form.get['userBirthDate']
#         gender = request.form.get['gender']
#         phone_number = request.form.get['userPhoneNum']
#         if pw != pwck:
#             flash('비밀번호가 맞지 않습니다')
#         else:
#             new_patient = Patient(patient_id,name, pw, age, weight, height, birth_date, gender, illness=null, medicine=null ,phone_number=phone_number)

#             db.session.add(new_patient)
#             db.session.commit()
#             flash('회원가입 완료')
#             return redirect('/main')
#     else:
#         return render_template('register.html', form=form)

@app.route('/register',methods=['GET','POST'])
def register():
    if request.method=='POST':
        #return render_template('register.html',form=form)
        patient_id = request.form['userEmail']
        age = request.form['userAge']
        name = request.form['userName']
        pw = request.form['userPassword']
        pwck = request.form['userPasswordCheck']
        weight = request.form['userWeight']
        height = request.form['userHeight']
        birth_date = request.form['userBirthDate']
        gender = request.form['userGender']
        # illness = None
        # medicine = None
        phone_number = request.form['userPhoneNum']
        

        conn = mysql.connect
        cursor = conn.cursor()
        
        sql = "Insert into Patient(patient_id, patient_name, patient_pw, age, weight, height, birth_date, gender, phone_number) values ('%s','%s','%s','%s','%s','%s','%s','%s','%s')"%(patient_id, 
        name, pw, age, weight, height, birth_date, gender, phone_number)
        print(patient_id)
        cursor.execute(sql)
        
        # cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        # cursor.execute('SELECT * FROM patient WHERE patient_id = % s', (patient_id, ))
        # print(1)
        # account = cursor.fetchone()
        # print(3)
        # if account:
        #     msg = 'Account already exists !'
        # # elif not re.match(r'[A-Za-z0-9]+', name):
        # #     msg = 'Username must contain only characters and numbers !'
        # # elif not name or not pw or not patient_id:
        # #     msg = 'Please fill out the form !'
        # else:
        #     cursor.execute(sql)
        #     mysql.connection.commit()
        #     msg = 'You have successfully registered!'
        # print(5)

        data = cursor.fetchall()

        if not data:
            conn.commit()
            return render_template('index.html')
        else:
            conn.rollback()
            return "등록 실패"
        return render_template('main.html')
        
    else:
        return render_template('register.html')
        

    

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
    
    app.run(host="0.0.0.0", port = "5000", debug = True)