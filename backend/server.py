from flask import Flask, send_from_directory
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS
# react는 포트 3000 flask는 5000써서 나는 API오류제거 위함
from APIHandler import ApiHandler

app = Flask(__name__, static_url_path='', static_folder='./frontend/src')
#static_url_path : 웹에서 정적 파일에 대해 다른경로 지정할 때
CORS(app)
api = Api(app)

@app.route('/')
def ab():
    return send_from_directory(app.static_folder,'index.js')
# /frontend/src에서 index.js

if __name__ == '__main__':
    api.add_resource(ApiHandler, '/flask/hello')
    app.run(debug=True)