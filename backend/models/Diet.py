from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Diet(db.model):
    __tablename__ = 'diet'
    food_detection = db.Column(db.varchar(80), nullable = False, primary_key = True)
    diet_time = db.Column(db.datetime)
    diet_photo = db.Column(db.mediumblob, nullable = False)
    amount = db.Column(db.varchar(20))

    def __init__(self, food_detection, diet_time, diet_photo, amount):
        self.food_detection = food_detection
        self.diet_time = diet_time
        self.diet_photo = diet_photo
        self.amount = amount