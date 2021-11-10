import os
from flask import Flask, session, jsonify, request, render_template
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
import json
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
        conn = mysql.connect
        cursor = conn.cursor()
        sql  = "select user_id from User where user_id = %s and user_pw = %s"
        value  = (userEmail, userPassword)
        cursor.execute(sql,value)

        data = cursor.fetchall()
        cursor.close()
        conn.close()

        if data:
            session['user_id'] = userEmail
            return render_template('index.html')
        else:
            error = '잘못된 정보입니다'

@app.route('/register',methods=['GET','POST'])
def register():
    if request.method=='POST':
        user_id = request.form['userEmail']
        age = request.form['userAge']
        name = request.form['userName']
        pw = request.form['userPassword']
        pwck = request.form['userPasswordCheck']
        weight = request.form['userWeight']
        height = request.form['userHeight']
        birth_date = request.form['userBirthDate']
        gender = request.form['userGender']
        ispatient = int(request.form['isPatient'])
        illness = request.form['userIllness']
        medicine = request.form['userMedicine']
        phone_number = request.form['userPhoneNum']

        conn = mysql.connect
        cursor = conn.cursor()
        
        sql = "Insert into User(user_id, user_name, user_pw, is_patient, age, weight, height, birth_date, gender,illness,medicine, phone_number) values ('%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s')"%(user_id, 
        name, pw, ispatient, age, weight, height, birth_date, gender,illness, medicine, phone_number)
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
    return redirect('/')

@app.route('/user/diet/<date>', methods=['GET','POST'])
def diet_show(date):
    if request.method == 'GET':
        conn = mysql.connect
        cursor = conn.cursor()
        sql  = "select * from Diet where date = '%s';"%date

        cursor.execute(sql)
        info = json.dumps(cursor.fetchall())
        return info
    else:
        return None

@app.route('/user/diet/<int:diet_id>')
def diet_solution(diet_id):
    conn = mysql.connect
    cursor = conn.cursor()

    sql  = "select * from Diet where diet_id = '%s'"%(diet_id)
    cursor.execute(sql)
    info = cursor.fetchall()
    foods = info[1].split(',')
    imgsrc = info[2]
    date = info[4]
    mealtime = info[5]
    return render_template('showDiet.html', foods=foods, imgsrc=imgsrc, date=date, mealtime=mealtime)

if __name__ == '__main__':
    
    app.run(host="0.0.0.0", port = "5000", debug = True)