from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Register(db.Model):
    __tablename__ = 'register'
    patient_id = db.Column(db.String(20), unique =True, primary_key = True)
    patient_name = db.Column(db.String(20))
    patient_pw = db.Column(db.String(20))

    def __init__(self, patient_id, patient_name, patient_pw):
        self.patient_id = patient_id
        self.patient_name = patient_name
        self.patient_pw = patient_pw

class Diet(db.Model):
    __tablename__ = 'diet'
    food_detection = db.Column(db.String(80), nullable = False, primary_key = True)
    diet_time = db.Column(db.String)
    #diet_photo = db.Column(db.mediumblob, nullable = False)
    amount = db.Column(db.String(20))

    def __init__(self, food_detection, diet_time,  amount):
        self.food_detection = food_detection
        self.diet_time = diet_time
        #self.diet_photo = diet_photo
        self.amount = amount

class Doctor(db.Model):
    __tablename__ = 'doctor'
    doctor_id = db.Column(db.String(20), nullable = False, primary_key = True, unique = True)
    patient_id = db.Column(db.String(20),db.ForeignKey('register.patient_id'),nullable = False, unique = True)
    doctor_name = db.Column(db.String(20),nullable = False)
    dept = db.Column(db.String(20),nullable = False)

    def __init__(self, doctor_id, patient_id, doctor_name, dept):
        self.doctor_id = doctor_id
        self.patient_id = patient_id
        self.doctor_name = doctor_name
        self.dept = dept

class Nutrient(db.Model):
    __tablename__ = 'nutrient'
    
    carbohydrate = db.Column(db.Float, nullable = False, primary_key = True)
    protein = db.Column(db.Float, nullable = False, primary_key = True)
    fat = db.Column(db.Float, nullable = False, primary_key = True)
    calories = db.Column(db.Float, nullable = False, primary_key = True)
    sodium = db.Column(db.Float, nullable = False)
    calcium = db.Column(db.Float, nullable = False)
    vitamin_c = db.Column(db.Float, nullable = False)
    food_detection = db.Column(db.String(80),db.ForeignKey('diet.food_detection'),nullable = False)

    def __init__(self, carbohydrate, protein, fat, calories, sodium, calcium, vitamin_c, food_detection):
        self.carbohydrate = carbohydrate
        self.protein = protein
        self.fat = fat
        self.calories = calories
        self.sodium = sodium
        self.calcium = calcium
        self.vitamin_c = vitamin_c
        self.food_detection = food_detection

class Patient(db.Model):
    __tablename__ = 'patient'
    patient_id = db.Column(db.String(20), db.ForeignKey('register.patient_id'), unique =True, primary_key = True,nullable = False)
    age = db.Column(db.Integer, nullable = False)
    weight = db.Column(db.Float, nullable = False)
    height = db.Column(db.Float, nullable = False)
    birth_date = db.Column(db.String(10), nullable = False)
    gender  = db.Column(db.String(7),nullable = False)
    illness = db.Column(db.String(20),nullable = True)
    medicine = db.Column(db.String(20),nullable = True)
    phone_number = db.Column(db.String(13),nullable = False)

    def __init__(self,patient_id, age, weight, height, birth_date, gender, illness, medicine, phone_number):
        self.patient_id = patient_id
        self.age= age
        self.weight = weight
        self.height = height
        self.birth_date = birth_date
        self.gender = gender
        self.illness = illness
        self.medicine = medicine
        self.phone_number = phone_number

class Save_diet(db.Model):
    __tablename__ = 'save_diet'
    diet_id = db.Column(db.String(20), nullable = False, primary_key = True)
    #save_diet_photo = db.Column(db.mediumblob, nullable = False)
    photo_time  = db.Column(db.String)

    def __init__(self, diet_id,photo_time):
        self.diet_id = diet_id
        #self.save_diet_photo = save_diet_photo
        self.photo_time = photo_time

class Query_patient(db.Model):
    __tablename__ = 'query_patient'
    query_id = db.Column(db.String(20),nullable = False, unique = True, primary_key = True)
    patient_id = db.Column(db.String(20),db.ForeignKey('register.patient_id'),nullable = False, unique = True)
    question_01 = db.Column(db.String(100), nullable = False)
    question_02 = db.Column(db.String(100), nullable = False)
    question_03 = db.Column(db.String(100), nullable = False)
    question_04 = db.Column(db.String(100), nullable = False)
    question_05 = db.Column(db.String(100), nullable = False)

    def __init__(self, query_id, patient_id, question_01, question_02, question_03, question_04, question_05):
        self.query_id = query_id
        self.patient_id = patient_id
        self.question_01 = question_01
        self.question_02 = question_02
        self.question_03 = question_03
        self.question_04 = question_04
        self.question_05 = question_05

class Simple_solution(db.Model):
    __tablename__ = 'simple_solution'
    simple_sol = db.Column(db.String(40), nullable = False, primary_key = True)

    def __init__(self,simple_sol):
        self.simple_sol = simple_sol
