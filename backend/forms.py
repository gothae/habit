
from flask.app import Flask
from flask_wtf import FlaskForm
from models import Patient
from wtforms import StringField, PasswordField, FloatField, RadioField, IntegerField, DateField
from wtforms.validators import DataRequired, EqualTo

class RegisterForm(FlaskForm):
    username = StringField('userName', validators=[DataRequired()])
    userEmail = StringField('userEmail', validators=[DataRequired()])
    userPassword = PasswordField('userPassword', validators=[DataRequired(), EqualTo('userPasswordCheck')])
    userPasswordCheck = PasswordField('userPasswordCheck', validators=[DataRequired()])
    userAge = IntegerField('userAge', validators=[DataRequired()])
    userHeight = FloatField('userHeight', validators=[DataRequired()])
    userWeight = FloatField('userWeight', validators=[DataRequired()])
    userGender = RadioField('userGender', validators=[DataRequired()], choices=[('male','남자'),('female','여자')])
    userBirthDate = DateField('userBirthDate', validators=[DataRequired()])
class LoginForm(FlaskForm):
    class UserPassword(object):
        def __init__(self, message=None):
            self.message = message
        def __call__(self,form,field):
            userid = form['userid'].data
            userpw = field.data
            new_user = Patient.query.filter_by(userid=userid).first()
            if new_user.password != userpw:
                # raise ValidationError(message % d)
                raise ValueError('비밀번호가 틀렸습니다')
    userid = StringField('userid', validators=[DataRequired()])
    userpw = PasswordField('password', validators=[DataRequired(), UserPassword()])

class DateForm(FlaskForm):
    date = StringField('datepicker')