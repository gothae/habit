class Patient(db.Model):
    __tablename__ = 'patient_register'
    patient_id = db.Column(db.varchar(20),unique=True,primary_key=True)
    patient_pw = db.Column(db.varchar(20),primary_key=True)
    patient_name = db.Column(db.varchar(20),primary_key = True)
    patient_email = db.Column(db.varchar(30), unique = True)
    

    def __init__(self,patient_name,patient_pw):
        self.patient_name = patient_name
        self.patient_pw = patient_pw