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