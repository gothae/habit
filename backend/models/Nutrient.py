from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# create table nutrient(
#    carbohydrate float not null,
#    protein float not null,
#    fat float not null,
#    calories float not null,
#    sodium float not null,
#    calcium float not null,
#    vitamin_c float not null,
#    food_detection String(80) not null,
#    foreign key(food_detection) references diet(food_detection),
#    primary key(carbohydrate, protein, fat, calories)
# );

class Nutrient(db.model):
    __tablename__ = 'nutrient'
    
    carbohydrate = db.Column(db.float, nullable = False, primary_key = True)
    protein = db.Column(db.float, nullable = False, primary_key = True)
    fat = db.Column(db.float, nullable = False, primary_key = True)
    calories = db.Column(db.float, nullable = False, primary_key = True)
    sodium = db.Column(db.float, nullable = False)
    calcium = db.Column(db.float, nullable = False)
    vitamin_c = db.Column(db.float, nullable = False)
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
    