from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# create table simple_solution(
#    simple_sol String(40) not null,
  
#    primary key(simple_sol)
# );
class Simple_solution(db.model):
    __tablename__ = 'simple_solution'
    simple_sol = db.Column(db.String(40), nullable = False, primary_key = True)

    def __init__(self,simple_sol):
        self.simple_sol = simple_sol