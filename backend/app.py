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
app.config['MYSQL_USER'] = 'hhshin98'
app.config['MYSQL_PASSWORD'] = 'james11'
app.config['MYSQL_DB'] = 'patientdb'
app.config['MYSQL_HOST'] = 'localhost'
app.secret_key = "ABfdgfdg"

mysql.init_app(app)

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

@app.route('/register',methods=['GET','POST'])
def register():
    if request.method=='POST':
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

        data = cursor.fetchall()

        if not data:
            conn.commit()
            return render_template('index.html')
        else:
            conn.rollback()
            return "등록 실패"
        
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

@app.route('/user/diet/<int:diet_id>')
def show_diet(diet_id): 
    imgsrc = '../static/img/dietimage-01.jpg'
    info = ['foodDetection',mealtime,imgsrc]
    return render_template('showDiet.html',dietdate = dietdate, info=info)

if __name__ == '__main__':
    
    app.run(host="0.0.0.0", port = "5000", debug = True)