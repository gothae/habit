# class Patient(db.Model):
#     __tablename__ = 'patient'
#     patient_id = db.Column(db.varchar(20), db.ForeignKey('patient_register.patient_id'),unique =True, primary_key = True,nullable = False)
#     patient_pw = db.Column(db.varchar(20), db.ForeignKey('patient_register.patient_id'),nullable = False)
#     patient_name = db.Column(db.varchar(20), db.ForeignKey('patient_register.patient_name'),nullable=False)
#     age = db.Column(db.int, nullable = False)
#     weight = db.Column(db.float, nullable = False)
#     height = db.Column(db.float, nullable = False)
#     birth_date = db.Column(db.char, nullable = False)
#     gender  = db.Column(db.varchar(7),nullable = False)
#     illness = db.Column(db.varchar(20),nullable = True)
#     medicine = db.Column(db.varchar(20),nullable = True)
#     phone_number = db.Column(db.varchar(13),nullable = False)
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Doctor(db.model):
    __tablename__ = 'doctor'
    doctor_id = db.Column(db.varchar(20), nullable = False, primary_key = True, unique = True)
    patient_id = db.Column(db.varchar(20),db.ForeignKey('patient.patient_id'),nullable = False, unique = True)
    doctor_name = db.Column(db.varchar(20),nullable = False)
    dept = db.Column(db.varchar(20),nullable = False)

    def __init__(self, doctor_id, patient_id, doctor_name, dept):
        self.doctor_id = doctor_id
        self.patient_id = patient_id
        self.doctor_name = doctor_name
        self.dept = dept