# class Patient(db.Model):
#     __tablename__ = 'patient_register'
#     patient_id = db.Column(db.String(20),unique=True,primary_key=True)
#     patient_pw = db.Column(db.String(20),primary_key=True)
#     patient_name = db.Column(db.String(20),primary_key = True)
#     patient_email = db.Column(db.String(30), unique = True)
    

#     def __init__(self,patient_name,patient_pw):
#         self.patient_name = patient_name
#         self.patient_pw = patient_pw
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


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
