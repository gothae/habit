db = {
    'user'     : 'root',
    'password' : '1234',
    'host'     : '127.0.0.1',
    'port'     : '3306',
    'database' : 'db'
}

DB_URL = f"mysql+mysqlconnector://{db['user']}:{db['password']}@{db['host']}:{db['port']}/{db['database']}?charset=utf8" 

CLIENT_ID = "f17bbc9c720f3d63d85ce1417675a0ea"
CLIENT_SECRET = "ej5lg0ktuWo70XMPwLHEWHKfImWwDru8"
REDIRECT_URI = "http://3.36.96.100:5000/"