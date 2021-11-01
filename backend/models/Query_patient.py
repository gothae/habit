from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# create table query_patient(
#    query_id String(20) not null unique primary key,
#    patient_id String(20) not null unique,
#    patient_name String(20) not null,
#    age int not null,
#    weight float not null,
#    height float not null,
#    birth_date String(8) not null,
#    gender String(7) not null,
#    question_01 String(100) not null,
#    question_02 String(100) not null,
#    question_03 String(100) not null,
#    question_04 String(100) not null,
#    question_05 String(100) not null,
#    foreign key(patient_id, patient_name,age, weight, height, birth_date,gender) references patient(patient_id, patient_name,age, weight, height,birth_date,gender)
# );

class Query_patient(db.model):
    __tablename__ = 'query_patient'
    query_id = db.Column(db.String(20),nullable = False, unique = True, primary_key = True)
    patient_id = db.Column(db.String(20),db.ForeignKey('patient.patient_id'),nullable = False, unique = True)
    patient_name = db.Column(db.String(20),db,ForeignKey('patient.patient_name'),nullable=False)
    age = db.Column(db.int,db,ForeignKey('patient.age'),nullable=False)
    weight = db.Column(db.float,db,ForeignKey('patient.weight'),nullable=False)
    height = db.Column(db.float,db,ForeignKey('patient.height'),nullable=False)
    birth_date = db.Column(db.String(8),db,ForeignKey('patient.birth_date'),nullable=False)
    gender = db.Column(db.String(7),db,ForeignKey('patient.gender'),nullable=False)
    question_01 = db.Column(db.String(100), nullable = False)
    question_02 = db.Column(db.String(100), nullable = False)
    question_03 = db.Column(db.String(100), nullable = False)
    question_04 = db.Column(db.String(100), nullable = False)
    question_05 = db.Column(db.String(100), nullable = False)

    def __init__(self, query_id, patient_id, patient_name, age,weight,height,birth_date, gender, question_01, question_02, question_03, question_04, question_05):
        self.query_id = query_id
        self.patient_id = patient_id
        self.patient_name = patient_name
        self.age = age
        self.weight = weight
        self.height= height
        self.birth_date = birth_date
        self.gender = gender
        self.question_01 = question_01
        self.question_02 = question_02
        self.question_03 = question_03
        self.question_04 = question_04
        self.question_05 = question_05
