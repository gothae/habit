from flask import Flask, session, jsonify, request, render_template, redirect
from flask.helpers import flash, url_for
from forms import LoginForm
from flask_wtf.csrf import CSRFProtect
# from flaskext.mysql import MySQL
from flask_mysqldb import MySQL
import MySQLdb.cursors
import json
import mysql.connector

app = Flask(__name__)
mysql = MySQL(app)
app.config['MYSQL_USER'] = 'hhshin98'
app.config['MYSQL_PASSWORD'] = 'james11'
app.config['MYSQL_DB'] = 'userdb'
app.config['MYSQL_HOST'] = 'localhost'
app.secret_key = "ABfdgfdg"

mysql.init_app(app)

@app.route('/main')
def main():
    error = None
    id = session.get('user',None)
    conn = mysql.connect
    cursor = conn.cursor()
    
    sql = "select user_name, user_id, age,weight,height,birth_date, gender, illness, medicine, phone_number, is_patient from User where user_id = '%s'"%(id)
    
    cursor.execute(sql)
    user = cursor.fetchall()
    is_patient = user[0][10]
    user_id=user[0][1]
    name=user[0][0]
    age =user[0][2]
    weight=user[0][3]
    height=user[0][4]
    birth_date=user[0][5]
    gender=user[0][6]
    illness=user[0][7]
    medicine=user[0][8]
    phone_number = user[0][9]
    # cursor.close()
    # conn.close()

    if is_patient == 1: #환자일때
        return render_template('index.html',error=error, name=name, user_id=user_id, birth_date=birth_date,
        phone_number=phone_number, age=age, height=height, weight=weight, illness=illness, medicine=medicine, gender=gender, is_patient=is_patient)

    else: #의사일때
        sql = "select * from User where doctor_in_charge = '%s';"%(user_id)
        cursor.execute(sql)
        patientList = []
        info = cursor.fetchall()
        for i in info:
            patientList.append(i[1]) # name

        return render_template('index.html',error=error, name=name, user_id=user_id, birth_date=birth_date,
        phone_number=phone_number, age=age, height=height, weight=weight, illness=illness, medicine=medicine, gender=gender, is_patient=is_patient, patientList=patientList)
        
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
            session['user'] = userEmail
            return redirect('/main')
        else:
            flash('ID와 비밀번호를 확인해주세요')
            return render_template('login.html',form=form)

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
            return redirect('/')
        else:
            conn.rollback()
            return "등록 실패"
        
    else:
        return render_template('register.html')

@app.route('/updateUser',methods=['GET','POST'])
def updateUser():
    user_id = session['user']
    conn = mysql.connect
    cursor = conn.cursor()
    if request.method == 'GET':
        sql = "select * from User where user_id='%s';"%(user_id)
        cursor.execute(sql)
        user = cursor.fetchall()[0]
        return render_template('updateUser.html',user=user)
    else:
        age = int(request.form['updateAge'])
        pw = request.form['updatePassword']
        weight = float(request.form['updateWeight'])
        height = float(request.form['updateHeight'])
        birth_date = request.form['updateBirthDate']
        medicine = request.form['updateMedicine']
        phone_number = request.form['updatePhoneNum']
        sql = "update User set age=%d, user_pw='%s', weight=%f, height=%f, birth_date='%s', medicine='%s', phone_number='%s' where user_id='%s';"%(age, pw, weight, height, birth_date, medicine, phone_number, user_id)
        cursor.execute(sql)
        conn.commit()

        return redirect('/main')

@app.route('/logout')
def logout():
    session.pop('user',None)
    return redirect('/')

@app.route('/user/diet/<date>', methods=['GET','POST'])
def diet_show(date):
    user_id = session['user']
    if request.method == 'GET':
        conn = mysql.connect
        cursor = conn.cursor()
        sql  = "select * from Diet where date = '%s' and user_id = '%s';"%(date,user_id)

        cursor.execute(sql)
        info = json.dumps(cursor.fetchall())
        print(info)
        return info
    else:
        return None

@app.route('/survey')
def survey():
    return render_template('survey.html')

@app.route('/user/solution/<date>')
def show_solution_day(date):
    user_id = session['user']
    if request.method == 'GET':
        conn = mysql.connect
        cursor = conn.cursor()
        sql  = "select * from Diet where date = '%s' and user_id = '%s';"%(date,user_id)
        cursor.execute(sql)
        daydiets = json.dumps(cursor.fetchall())
        return daydiets
    else:
        return None

@app.route('/<username>/dietList',methods=['GET','POST'])
def getUserDiets(username):
    if request.method == 'GET':
        conn = mysql.connect
        cursor = conn.cursor()
        sql = "select * from Diet where user_id = (select user_id from User where user_name = '%s')"%(username)
        cursor.execute(sql)
        diets = json.dumps(cursor.fetchall())
        return diets

@app.route('/patientDiet/<dietId>')
def showPatientDiet(dietId):
    conn = mysql.connect
    cursor = conn.cursor()
    sql = "select * from Diet where diet_id = '%s';"%(dietId)
    cursor.execute(sql)
    diet = json.dumps(cursor.fetchall())[0]
    return render_template('showPatientDiet.html',diet = diet)

if __name__ == '__main__':
    
    app.run(host="0.0.0.0", port = "5000", debug = True)