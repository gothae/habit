from flask import Flask, request, jsonify
import sys
import os
from urllib.request import urlopen, Request
import requests
import json
from urllib.request import urlopen, Request
from bs4 import BeautifulSoup
import requests
import urllib
from flaskext.mysql import MySQL
from flask_mysqldb import MySQL
import MySQLdb.cursors
import json
import mysql.connector
import pymysql
import random

app = Flask(__name__)

mysql = MySQL(app)

global num_diet
global num_solution
num_diet = random.randrange(0, 1000)
num_solution = random.randrange(0, 1000)

app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '1234'
app.config['MYSQL_DB'] = 'userdb'
app.config['MYSQL_HOST'] = 'localhost'
app.secret_key = "ABfdgfdg"

mysql.init_app(app)


@app.route('/locsearch', methods=['POST'])
def locsearch():
    req = request.get_json()

    params = req['action']['detailParams']

    keyword = params['sys_location']['value']

    url = 'https://dapi.kakao.com/v2/local/search/keyword.json?query='+keyword+'병원'
    print(url)

    headers = {"Authorization": "KakaoAK 6ca88b45f8ff86577e1e17431a9d7a54"}
    result = json.loads(str(requests.get(url, headers=headers).text))

    print(result)
    search_url = []
    title = []
    if len(result['documents']) > 0:
        for data in result['documents']:
            title.append(data['place_name'])
            search_url.append(
                'https://map.kakao.com/link/to/{}'.format(data['id']))

        title.insert(0, '🗺 클릭시 카카오맵 길찾기로 연결됩니다.')
        search_url.insert(0, '')
    else:
        res = {
            "version": "2.0",
            "template": {
                "outputs": [
                    {
                        "simpleText": {
                            "text": "검색이 불가한 지역입니다."
                        }
                    }
                ]
            }
        }
        return jsonify(res)

    listItems = []

    cnt = 0

    if len(title) >= 5:
        items = 6
    else:
        items = len(title)

    for i in range(items):

        if cnt == 0:
            itemtype = 'title'
        else:
            itemtype = 'item'

        listItems.append({
            "type": itemtype,               # 카드 리스트의 아이템 티입
            "title": title[i],              # 제목
            "linkUrl": {
                "type": "OS",
                "webUrl": search_url[i]
            }
        })
        cnt += 1

    # 카드 리스트형 응답용 메시지
    res = {
        "contents": [
            {
                "type": "card.list",
                "cards": [
                    {
                        "listItems": listItems
                    }
                ]
            }
        ]
    }

    # 전송
    return jsonify(res)


@app.route('/diet', methods=['POST'])
def diet():

    req = request.get_json()
    input_text = req['userRequest']['utterance']

    if '된장국' in input_text:

        res = {
            "version": "2.0",
            "template": {
                "outputs": [
                    {
                        "simpleText": {
                            "text": " utterance을 드셨군요 utterance의 칼로리는~."
                        }
                    }
                ],
            }
        }

    return jsonify(res)


@app.route("/calorie", methods=["GET", "POST"])
def calorie():

    req = request.get_json()
    print(req)

    select = req["action"]["detailParams"]["선택지"]["value"]
    print(select)

    res = {
        "version": "2.0",
        "template": {
            "outputs": [
                {
                    "simpleText": {
                        "text": "섭취한 양은 ~~ 칼로리는~~~\n\n다음 음식은 무엇을 드셨나요?\n\n계속 입력하시려면 [계속 입력]을 \n 없다면 [종료]를 눌러주세요."
                    }
                }
            ],
            "quickReplies": [
                {
                    "messageText": "직접 입력",
                    "action": "message",
                    "label": "계속 입력"
                }, {
                    "messageText": "종료",
                    "action": "message",
                    "label":  "🏠종료"
                }
            ]
        }
    }

    return jsonify(res)


@app.route("/getPhoto", methods=["GET", "POST"])
def start():
    print("start func")
    req = request.get_json()

    print(req)

    photo_type3 = req["action"]["detailParams"]["image"]["value"]
    photo_json = json.loads(photo_type3)
    # foods = [] //AI통해서 인식한 음식
    print('3', photo_type3)

    # print(photo_json["secureUrls"])
    photo_url = photo_json["secureUrls"]
    u = photo_url[5:-1]
    print(u)

    conn = mysql.connect
    cur = conn.cursor()

    # sql = "Insert into Diet(diet_id, image,mealtime) values('%s','%s','%s')" % (num, u, select)
    # sql = "select * from Diet"
    sql = "update Diet set image = '%s' where diet_id = '%s'" % (u, num_diet)

    cur.execute(sql)
    conn.commit()
    # cur.fetchall()
    # print(hi)
    cur.close()
    conn.close()

    res = {
        "version": "2.0",
        "template": {
            "outputs": [
                {
                    "simpleText": {
                        "text": "사진 전송이 완료되었습니다.\n\n '인식된 음식'의 드신 양을 입력해 주세요."
                    }
                }
            ],
        }
    }
    return jsonify(res)


@app.route("/food", methods=['POST'])
def food():
    global food_name
    print("Start to enter: ")
    req = request.get_json()

    print(req)

    food = req["action"]["detailParams"]["음식이름"]["value"]
    foods = food
    print(foods)

    conn = mysql.connect
    cur = conn.cursor()

    sql = "select choice_01, choice_02, choice_03, unit from Food where food_type = '%s'" % (
        foods)

    cur.execute(sql)
    # conn.commit()
    food_str = cur.fetchall()
    print(food_str)
    cur.close()
    conn.close()

    food_tuple = food_str[0]

    choice_01 = food_tuple[0]
    choice_02 = food_tuple[1]
    choice_03 = food_tuple[2]
    unit = food_tuple[3]

    res = {
        "version": "2.0",
        "template": {
            "outputs": [
                {
                    "simpleText": {
                        "text": foods + "을 드셨군요\n 아래에서 드신량을 선택해주세요."
                    }
                }
            ],
            "quickReplies": [
                {
                    "messageText": "선택1",
                    "action": "message",
                    "label": choice_01 + unit
                }, {
                    "messageText": "선택2",
                    "action": "message",
                    "label":  choice_02 + unit
                }, {
                    "messageText": "선택3",
                    "action": "message",
                    "label": choice_03 + unit
                }, {
                    "messageText": "기타",
                    "action": "message",
                    "label": "기타"
                }
            ]
        }
    }

    return jsonify(res)
    # conn = mysql.connect
    # cursor = conn.cursor()

    # sql = ""


@app.route("http://172.31.3.198:5000/date", methods=["GET", "POST"])
def date():
    print("Start to enter: ")
    req = request.get_json()

    print(req)

    time = req["action"]["detailParams"]["date"]["value"]
    date_json = json.loads(time)

    meal_date = date_json["date"]

    print(meal_date)
    meal_month = meal_date[5:7]
    meal_day = meal_date[8:]

    if meal_month[0] == "0":
        if meal_day[0] == "0":
            answer = meal_month[1]+"월 "+meal_day[1]+"일" + \
                "에 드셨군요. \n\n 아래에서 아침, 점심,저녁 중 하나를 골라주세요."
        else:
            answer = meal_month[1]+"월 "+meal_day+"일" + \
                "에 드셨군요. \n\n 아래에서 아침, 점심,저녁 중 하나를 골라주세요."
    else:
        if meal_day[0] == "0":
            answer = meal_month+"월 " + \
                meal_day[1]+"일" + "에 드셨군요. \n\n 아래에서 아침, 점심,저녁 중 하나를 골라주세요."
        else:
            answer = meal_month+"월 "+meal_day+"일" + \
                "에 드셨군요. \n\n 아래에서 아침, 점심,저녁 중 하나를 골라주세요."
    conn = mysql.connect
    cur = conn.cursor()
    print(6)
    sql = "insert into Diet(diet_id, date,solution_id) values ('%s','%s','%s')" % (
        num_diet, meal_date, num_solution)

    cur.execute(sql)
    conn.commit()
    # cur.fetchall()
    # print(hi)
    cur.close()
    conn.close()

    res = {
        "version": "2.0",
        "template": {
            "outputs": [
                {
                    "simpleText": {
                        "text": answer
                    }
                }
            ],
            "quickReplies": [
                {
                    "messageText": "아침",
                    "action": "message",
                    "label": "아침"
                }, {
                    "messageText": "점심",
                    "action": "message",
                    "label": "점심"
                }, {
                    "messageText": "저녁",
                    "action": "message",
                    "label": "저녁"
                }, {
                    "messageText": "간식",
                    "action": "message",
                    "label": "간식"
                }
            ]
        }
    }
    return jsonify(res)


@app.route("/time", methods=["POST"])
def time():
    req = request.get_json()

    select = req['userRequest']['utterance']
    print(select)

    conn = mysql.connect
    cur = conn.cursor()
    sql = "update Diet set mealtime='%s' where diet_id = '%s'" % (
        select, num_diet)
    # sql = 'select * from Diet'

    cur.execute(sql)
    conn.commit()
    # print(hi)
    cur.close()
    conn.close()
    # if select == "아침":
    #     answer2 = "아침 식사로 드셨군요"
    # elif select == "점심":
    #     answer2 = "점심 식사로 드셨군요"
    # elif select == "저녁":
    #     answer2 = "저녁 식사로 드셨군요"
    # elif select == "간식":
    #     answer2 = "간식으로 드셨군요"
    #     print(answer2)

    res = {
        "version": "2.0",
        "template": {
            "outputs": [
                {
                    "simpleText": {
                        "text": "야"
                    }
                }
            ],
        }
    }
    return jsonify(res)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, threaded=True)
