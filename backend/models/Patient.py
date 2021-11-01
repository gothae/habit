# class Patient(db.Model):
#     __tablename__ = 'patient_register'
#     patient_id = db.Column(db.varchar(20),unique=True,primary_key=True)
#     patient_pw = db.Column(db.varchar(20),primary_key=True)
#     patient_name = db.Column(db.varchar(20),primary_key = True)
#     patient_email = db.Column(db.varchar(30), unique = True)
    

#     def __init__(self,patient_name,patient_pw):
#         self.patient_name = patient_name
#         self.patient_pw = patient_pw
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Patient(db.Model):
    __tablename__ = 'patient'
    patient_id = db.Column(db.varchar(20), unique =True, primary_key = True,nullable = False)
    patient_pw = db.Column(db.varchar(20), nullable = False)
    patient_name = db.Column(db.varchar(20), nullable=False)
    age = db.Column(db.int, nullable = False)
    weight = db.Column(db.float, nullable = False)
    height = db.Column(db.float, nullable = False)
    birth_date = db.Column(db.char, nullable = False)
    gender  = db.Column(db.varchar(7),nullable = False)
    illness = db.Column(db.varchar(20),nullable = True)
    medicine = db.Column(db.varchar(20),nullable = True)
    phone_number = db.Column(db.varchar(13),nullable = False)

    def __init__(self,patient_id,patient_pw,patient_name, age, weight, height, birth_date, gender, illness, medicine, phone_number):
        self.patient_id = patient_id
        self.patient_pw = patient_pw
        self.patient_name = patient_name
        self.age= age,
        self.weight = weight,
        self.height = height,
        self.birth_date = birth_date,
        self.gender = gender
        self.illness = illness,
        self.medicine = medicine
        self.phone_number = phone_number
