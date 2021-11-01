from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# create table save_diet(
#    diet_id String(20) not null,
#    save_diet_photo mediumblob not null,
#    photo_time String default current_timestamp on update current_timestamp,
#    primary key(diet_id)
# );

class Save_diet(db.model):
    __tablename__ = 'save_diet'
    diet_id = db.Column(db.String(20), nullable = False, primary_key = True)
    save_diet_photo = db.Column(db.mediumblob, nullable = False)
    photo_time  = db.Column(db.String)

    def __init__(self, diet_id, save_diet_photo, photo_time):
        self.diet_id = diet_id
        self.save_diet_photo = save_diet_photo
        self.photo_time = photo_time