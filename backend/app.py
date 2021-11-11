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
app.config['MYSQL_DB'] = 'userdb'
app.config['MYSQL_HOST'] = 'localhost'
app.secret_key = "ABfdgfdg"

mysql.init_app(app)

@app.route('/main')
def main():
    error = None
    # id  = session['user_id']
    id = session.get('user_id',None)
    conn = mysql.connect
    cursor = conn.cursor()
    
    sql = "select user_name, user_id, age,weight,height,birth_date, gender, illness, medicine, phone_number from User where user_id = '%s'"%(id)
    
    cursor.execute(sql)
    user = cursor.fetchall()
    
    name=user[0][0]
    user_id=user[0][1]
    age =user[0][2]
    weight=user[0][3]
    height=user[0][4]
    birth_date=user[0][5]
    gender=user[0][6]
    illness=user[0][7]
    medicine=user[0][8]
    phone_number = user[0][9]
    
    cursor.close()
    conn.close()
    return render_template('index.html',error=error, name=name, user_id=user_id, birth_date=birth_date,
    phone_number=phone_number, age=age, height=height, weight=weight, illness=illness, medicine=medicine, gender=gender)

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
            return redirect('/main')
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

# <user_id>로 수정해야함
# js에서 user_id 받는방법??
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

    sql  = "select foods,image,date,mealtime,diet_id from Diet where diet_id = '%s'"%(diet_id)
    cursor.execute(sql)
    # info = json.dumps(cursor.fetchall())
    info = cursor.fetchall()

    foods = info[0][0].split(',')
    imgsrc = info[0][1]
    date = info[0][2]
    mealtime = info[0][3]
    diet_id = info[0][4]

    sql = "select solution from Solution where Solution.solution_id = (select Diet.solution_id from Diet where diet_id = {0});".format(diet_id)
    cursor.execute(sql)
    solution = cursor.fetchall()
    print(solution)
    return render_template('showDiet.html', foods=foods, imgsrc=imgsrc, date=date, mealtime=mealtime, solution=solution)

@app.route('/<user_id>/survey')
def survey(user_id):
    return render_template('survey.html')

@app.route('/<user_id>/solution')
def solutionIndex(user_id):
    return render_template('solutionIndex.html')

if __name__ == '__main__':
    
    app.run(host="0.0.0.0", port = "5000", debug = True)