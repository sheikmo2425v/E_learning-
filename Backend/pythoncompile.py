import requests

from datetime import datetime, timedelta
import os
from flask_cors import *
from flask import *

import json

# import cv2
import os
import mysql.connector
app = Flask(__name__)
cros = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/compile', methods=['POST'], strict_slashes=False)
def w2():
    try:
        r = request.json
        print(r)

        url = 'https://api.jdoodle.com/v1/execute'
        myobj = {"script": r["code"],
                 "language": r["language"],
                 "versionIndex": "0",
                 "clientId": "a5fb09bd6f98a2d4a79e8d0c1d8c4d79",
                 "clientSecret": "d6c2370470ce502a1ac1754710218a3fd3b076d3d877961369f57a22eafdb8a3"}

        x = requests.post(url, json=myobj)

        return (x.text)
    except:
        return ("server error")


@app.route('/check', methods=['POST'], strict_slashes=True)
def check():
    try:
        a = request.json
        print(a)
        # try:
        mydb = mysql.connector.connect(
            host="localhost", user="root",  password="",  database="student_activities")
        mycursor = mydb.cursor()
        e = "select sid,name ,cid ,email,phone from student_details  where sid='%s' and phone='%s'" % (
            a["Register"], a["phone"])
        print(e)
        mycursor.execute(e)
        r = mycursor.fetchall()
        print(r)

        return json.dumps(r)
    except:
        r = []
        return (json.dumps(r), (" check your phone number and register number are correct or not Or server error try again"))


@app.route('/check2', methods=['POST'], strict_slashes=True)
def check2():
    try:
        a = request.json
        print(a)
        # try:
        mydb = mysql.connector.connect(
            host="localhost", user="root",  password="",  database="student_activities")
        mycursor = mydb.cursor()
        e = "select * from student_details  where sid='%s' " % (
            a["Register"])
        print(e)
        mycursor.execute(e)
        r = mycursor.fetchall()
        print(r)

        return json.dumps(r)
    except:
        return (json.dumps(r), " check your phone number and register number are correct or not Or server error try again")


@app.route('/store', methods=['POST'], strict_slashes=False)
def store():
    try:
        a = request.json

        mydb = mysql.connector.connect(
            host="localhost", user="root",  password="",  database="student_activities")
        mycursor = mydb.cursor()

        e = "select sid from student_details order by sid desc limit 1"
        mycursor.execute(e)
        r = mycursor.fetchall()
        print(r)
        if r == []:
            re = 1
        else:

            re = int(r[0][0][7:])+1
        x = datetime.now().year
        sid = "edu"+str(x)[2:]+str(re).zfill(5)
        print(sid)
        e = "insert into student_details(sid,name,cid,phone,email)values('%s','%s','%s','%s','%s')" % (
            sid, a["Name"],  a["course"], a["phone"], a["email"])

        mycursor.execute(e)
        e = "insert into student(sid,cid,chance)values('%s','%s',5)" % (
            sid,  a["course"])

        mycursor.execute(e)

        mydb.commit()

        return json.dumps("your register id is '%s'" % (sid))
    except:
        return ("server error")


@app.route('/upload', methods=['POST'])
def upload_file():
    try:
        # image = Image.open(request.files['file'])
        file = request.files['file']
        mydb = mysql.connector.connect(
            host="localhost", user="root",  password="",  database="student_activities")
        mycursor = mydb.cursor()

        e = "select sid from student_details order by sid desc limit 1"
        mycursor.execute(e)
        r = mycursor.fetchall()
        print(r)
        if r == []:
            re = 1
        else:

            re = int(r[0][0][7:])
        x = datetime.now().year
        sid = "edu"+str(x)[2:]+str(re).zfill(5)
        # path = "./public/images/"
        # os.makedirs(path, exist_ok=True)
        # image.save(path + "'%s'.jpg" % (sid))
        try:
            file.save('./bank/public/images/%s.jpg' % (sid))
        except:
            file.save('./public/images/%s.jpg' % (sid))

        return 'File saved successfully'
    except:
        return ("error")


@app.route('/mark', methods=['POST'], strict_slashes=False)
def mark():
    try:
        a = request.json
        mydb = mysql.connector.connect(
            host="localhost", user="root",  password="",  database="student_activities")
        mycursor = mydb.cursor()

        e = "select question ,mark  from student_task  where sid='%s' UNION SELECT question,mark from student_d_task where sid='%s' ORDER BY mark  desc " % (
            a['sid'], a['sid'])

        print(e)
        mycursor.execute(e)
        r1 = mycursor.fetchall()
        return json.dumps(r1)
    except:
        r1 = []
        return (json.dumps(r1), "error")


@app.route('/leave', methods=['POST'], strict_slashes=False)
def leave():
    try:
        a = request.json
        mydb = mysql.connector.connect(
            host="localhost", user="root",  password="",  database="student_activities")
        mycursor = mydb.cursor()
        e = "select sid from lve where sid='%s' and wdate ='%s' and edate='%s'" % (
            a['sid'], a['wdate'], a['edate'])
        print(e)
        mycursor.execute(e)
        r = mycursor.fetchall()
        if r == []:
            e = "insert into lve(sid,wdate,edate,reason)values('%s','%s','%s','%s')" % (
                a['sid'], a['wdate'], a['edate'], a['reason'])

            print(e)
            mycursor.execute(e)

            mydb.commit()
            return "submitted"
        else:
            return "already Submitted"
    except:
        return "error"


@app.route('/matl', methods=['POST'], strict_slashes=False)
def matl():
    try:
        a = request.json
        cid = ""
        if a["course"] == "python3":
            cid = "edu0p"
        elif a["course"] == "java":
            cid = "edu1j"
        elif a["course"] == "c":
            cid = "edu2c"
        elif a["course"] == "cpp":
            cid = "edu3cp"
        mydb = mysql.connector.connect(
            host="localhost", user="root",  password="",  database="student_activities")
        mycursor = mydb.cursor()
        e = "select material from material where sid='%s' or cid='%s'" % (
            a['sid'],   cid)
        print(e)
        mycursor.execute(e)
        r = mycursor.fetchall()
        return json.dumps(r)
    except:
        r1 = []
        return (json.dumps(r1), "error")


@app.route('/get_task', methods=['POST'], strict_slashes=False)
def get_task():
    try:
        a = request.json
        print(a)
        cid = ""
        if a["course"] == "python3":
            cid = "edu0p"
        elif a["course"] == "java":
            cid = "edu1j"
        elif a["course"] == "c":
            cid = "edu2c"
        elif a["course"] == "cpp":
            cid = "edu3cp"
        mydb = mysql.connector.connect(
            host="localhost", user="root",  password="",  database="student_activities")
        mycursor = mydb.cursor()
        if a["stage"] != "daily_task":
            e = "select * from task  where (cid='%s' or sid='%s')  and task_stage='%s'" % (cid, a['sid'],
                                                                                           a["stage"])
            print(e)
            mycursor.execute(e)
            r1 = mycursor.fetchall()

            return json.dumps(r1)
        else:
            e = "select * from d_task where cid='%s' or sid='%s' " % (
                cid, a["sid"])
            print(e)
            mycursor.execute(e)
            v2 = mycursor.fetchall()

            return json.dumps(v2)
    except:
        r1 = []
        return (json.dumps(r1), "error")


@app.route('/request', methods=['POST'], strict_slashes=False)
def request_():

    a = request.json
    try:
        mydb = mysql.connector.connect(
            host="localhost", user="root",  password="",  database="student_activities")
        mycursor = mydb.cursor()
        e = "select answer_request from student where sid='%s'" % (
            a["sid"])
        mycursor.execute(e)
        r = mycursor.fetchall()
        print(r[0][0])
        if r[0][0] != "reached_limit":
            e = " UPDATE student SET answer_request='request' WHERE sid='%s'" % (
                a["sid"])
            mycursor.execute(e)

            mydb.commit()
            return "wait for your admin response after reload"
        else:
            return "you reached limit no more option to see answer sorry"
    except:
        return " network error try again later"


@app.route('/limit', methods=['POST'], strict_slashes=False)
def limit():
    a_s = request.json
    print(a_s)
    try:
        mydb = mysql.connector.connect(
            host="localhost", user="root",  password="",  database="student_activities")
        mycursor = mydb.cursor()
        e = " UPDATE student SET chance='%s' WHERE sid='%s'" % (
            a_s["limit"], a_s["sid"])
        mycursor.execute(e)
        mydb.commit()
        e = "select chance from student where sid='%s'  " % (
            a_s["sid"])
        mycursor.execute(e)
        r = mycursor.fetchall()
        print(r)
        return json.dumps(r)
    except:
        e = "select chance from student where sid='%s'  " % (
            a_s["sid"])
        mycursor.execute(e)
        r = mycursor.fetchall()
        print(r)
        return json.dumps(r)


@app.route('/submit_task', methods=['POST'], strict_slashes=False)
def submit_task():

    a = request.json

    ans = a["code"].replace("'", "\\'")
    ans = ans.replace('"', '\\"')
    quest = a["task"].replace("'", "\\'")
    quest = quest.replace('"', '\\"')
    output = a["output"].replace("'", "\\'")
    output = output.replace('"', '\\"')
    mydb = mysql.connector.connect(
        host="localhost", user="root",  password="",  database="student_activities")
    mycursor = mydb.cursor()
    if a["stage"] != "daily_task":
        e = "select question from student_task where question='%s' and sid='%s'" % (
            a["task"], a["sid"])
        print(e)
        mycursor.execute(e)

        r = mycursor.fetchall()
        print(r)
        e = "select task_status from student where sid='%s' " % (
            a["sid"])
        print(e)
        mycursor.execute(e)

        v = mycursor.fetchall()

        if v[0][0] == "pending":
            value = 1
        else:
            value = int(v[0][0])+1
        if r != []:
            return "already submitted so you can't change that"
        else:
            e = '''insert into student_task(sid,qid,question,code,output)values('%s',"%s",'%s','%s','%s')''' % (
                a["sid"], a["qid"],  quest, ans, output)
            print(e)
            mycursor.execute(e)
            e = "UPDATE student set  task_status='%s' where sid='%s' " % (
                value, a["sid"])
            mycursor.execute(e)
            mydb.commit()

        return "submited"
    else:
        e = "select question from student_d_task where dtid='%s' and sid='%s'" % (
            a["qid"], a["sid"])
        print(e)
        mycursor.execute(e)

        r = mycursor.fetchall()
        print(r)
        e = "select daily_task_status from student where sid='%s' " % (
            a["sid"])
        print(e)
        mycursor.execute(e)

        v = mycursor.fetchall()
        print(v)
        if v[0][0] == "pending":
            value = "compelted"

        if r != []:
            return "already submitted so you can't change that"
        else:
            e = '''insert into student_d_task(sid,dtid,question,answer,output)values("%s","%s",'%s',"%s","%s")''' % (
                a["sid"], a["qid"],  quest, ans, output)
            print(e)
            mycursor.execute(e)
            e = "UPDATE student set daily_task_status='%s' where sid='%s' " % (
                value, a["sid"])
            mycursor.execute(e)
            mydb.commit()

        return "submited"
    # except:
    #     return "error"


@app.route('/status', methods=['POST'], strict_slashes=False)
def status():
    try:
        # a = request.json
        mydb = mysql.connector.connect(
            host="localhost", user="root",  password="",  database="student_activities")
        mycursor = mydb.cursor()
        e = "select sid , cid,task_status,daily_task_status,mark,grade ,answer_request from student  ORDER BY mark  desc "
        print(e)
        mycursor.execute(e)

        v = mycursor.fetchall()
        print(v)
        return json.dumps(v)
    except:

        r1 = []
        return (json.dumps(r1), "error")


@app.route('/give_chance', methods=['POST'], strict_slashes=False)
def give_chance():
    try:
        a = request.json
        mydb = mysql.connector.connect(
            host="localhost", user="root",  password="",  database="student_activities")
        mycursor = mydb.cursor()
        e = "select answer_request from student  where sid='%s'" % (a["sid"])
        print(e)
        mycursor.execute(e)

        v = mycursor.fetchall()
        if v[0][0] == "request":
            e = "UPDATE student set  chance=4 , answer_request = 'reached_limit' where sid='%s' " % (
                a["sid"])
            mycursor.execute(e)
            mydb.commit()

            e = "select sid , cid,task_status,daily_task_status,mark,grade ,answer_request from student  ORDER BY mark  desc "
            print(e)
            mycursor.execute(e)

            v = mycursor.fetchall()
            print(v)
            return (json.dumps(v), "chance added successfully")
        elif v[0][0] == "reached_limit":
            e = "select sid , cid,task_status,daily_task_status,mark,grade ,answer_request from student  ORDER BY mark  desc "
            print(e)
            mycursor.execute(e)

            v = mycursor.fetchall()

            return (json.dumps(v), "he is reached_limit")
        else:
            e = "select sid , cid,task_status,daily_task_status,mark,grade ,answer_request from student  ORDER BY mark  desc "
            print(e)
            mycursor.execute(e)

            v = mycursor.fetchall()
            return (json.dumps(v), " no need ")
    except:
        r1 = []
        return (json.dumps(r1), "error")


@app.route('/view_s', methods=['POST'], strict_slashes=False)
def view_s():
    try:
        mydb = mysql.connector.connect(
            host="localhost", user="root",  password="",  database="student_activities")
        mycursor = mydb.cursor()
        e = "select * from student_details "
        mycursor.execute(e)
        r = mycursor.fetchall()
        print(r)
        return json.dumps(r)
    except:

        r1 = []
        return (json.dumps(r1), "error")


@app.route('/update_s', methods=['POST'], strict_slashes=False)
def update_s():
    try:
        try:
            file = request.files['file']
            a = request.form
            try:
                file.save('./bank/public/images/%s.jpg' % (a["sid"]))
            except:
                file.save('./public/images/%s.jpg' % (a["sid"]))
        except:
            a = request.form
        a = request.form
        print(a["sid"])

        mydb = mysql.connector.connect(
            host="localhost", user="root",  password="",  database="student_activities")
        mycursor = mydb.cursor()
        e = "UPDATE student_details set name='%s', email='%s', phone='%s' where sid='%s' " % (
            a["name"], a["email"], a["phone"], a["sid"])
        mycursor.execute(e)
        mydb.commit()
        e = "select * from student_details where sid='%s'" % (a["sid"])
        mycursor.execute(e)
        r = mycursor.fetchall()
        print(r)
        return json.dumps(r)
    except:
        r1 = []
        return (json.dumps(r1), "error")


@app.route('/update_s_a', methods=['POST'], strict_slashes=False)
def update_s_a():
    try:
        try:
            file = request.files['file']
            a = request.form
            try:
                file.save('./bank/public/images/%s.jpg' % (a["sid"]))
            except:
                file.save('./public/images/%s.jpg' % (a["sid"]))
        except:
            pass
        a = request.form
        print(a["sid"])

        mydb = mysql.connector.connect(
            host="localhost", user="root",  password="",  database="student_activities")
        mycursor = mydb.cursor()
        e = "UPDATE student_details set name='%s', email='%s', phone='%s' where sid='%s' " % (
            a["name"], a["email"], a["phone"], a["sid"])
        mycursor.execute(e)
        mydb.commit()
        e = "select * from student_details "
        mycursor.execute(e)
        r = mycursor.fetchall()
        print(r)
        return json.dumps(r)
    except:
        r1 = []
        return (json.dumps(r1), "error")


@app.route('/delete_s', methods=['POST'], strict_slashes=False)
def delete_s():
    try:
        a = request.json
        mydb = mysql.connector.connect(
            host="localhost", user="root",  password="",  database="student_activities")
        mycursor = mydb.cursor()
        e = "DELETE FROM student_details where sid='%s' " % (a["sid"])
        mycursor.execute(e)
        e = "DELETE FROM student where sid='%s' " % (a["sid"])
        mycursor.execute(e)
        mydb.commit()
        try:
            os.remove('./public/images/%s.jpg' % (a['sid']))

        except:
            print("nothing")

        e = "select * from student_details "
        mycursor.execute(e)
        r = mycursor.fetchall()
        print(r)
        return json.dumps(r)
    except:

        r1 = []
        return (json.dumps(r1), "error")


@app.route('/submit_q', methods=['POST'], strict_slashes=False)
def submit_q():
    try:
        a = request.json
        quest = a["question"].replace("'", "\\'")
        quest = quest.replace('"', '\\"')
        ans = a["answer"].replace("'", "\\'")
        ans = ans.replace('"', '\\"')
        # print(a)
        # if a["sid"] == " ":
        #     a["sid"] = "null"
        cid = ""
        if a["course"] == "python3":
            cid = "edu0p"
        elif a["course"] == "java":
            cid = "edu1j"
        elif a["course"] == "c":
            cid = "edu2c"
        elif a["course"] == "cpp":
            cid = "edu3cp"
        mydb = mysql.connector.connect(
            host="localhost", user="root",  password="",  database="student_activities")
        mycursor = mydb.cursor()
        e = "insert into task(sid,cid,task_stage,question,answer)values('%s','%s','%s','%s','%s')" % (
            a["sid"], cid,   a["task_stage"], quest, ans)
        print(e)
        mycursor.execute(e)
        mydb.commit()
        e = "select tid,sid ,cid,task_stage ,question,answer from task "
        mycursor.execute(e)
        r = mycursor.fetchall()
        print(r)
        return json.dumps(r)
    except:
        r1 = []
        return (json.dumps(r1), "error")


@app.route('/view_q', methods=['POST'], strict_slashes=False)
def view_q():
    try:
        mydb = mysql.connector.connect(
            host="localhost", user="root",  password="",  database="student_activities")
        mycursor = mydb.cursor()
        e = "select tid,sid ,cid,task_stage ,question,answer from task "
        mycursor.execute(e)
        r = mycursor.fetchall()
        print(r)
        return json.dumps(r)
    except:

        r1 = []
        return (json.dumps(r1), "error")


@app.route('/delete_q', methods=['POST'], strict_slashes=False)
def delete_q():
    try:
        a = request.json
        mydb = mysql.connector.connect(
            host="localhost", user="root",  password="",  database="student_activities")
        mycursor = mydb.cursor()
        e = "DELETE FROM task where tid='%s' " % (a["tid"])
        mycursor.execute(e)
        mydb.commit()
        e = "select tid,sid ,cid,task_stage ,question,answer from task "
        mycursor.execute(e)
        r = mycursor.fetchall()
        return json.dumps(r)
    except:
        r1 = []
        return (json.dumps(r1), "error")


@app.route('/update_q', methods=['POST'], strict_slashes=False)
def update_q():
    try:
        a = request.json
        quest = a["question"].replace("'", "\\'")
        quest = quest.replace('"', '\\"')
        ans = a["answer"].replace("'", "\\'")
        ans = ans.replace('"', '\\"')
        mydb = mysql.connector.connect(
            host="localhost", user="root",  password="",  database="student_activities")
        mycursor = mydb.cursor()
        e = "UPDATE task set question='%s', answer='%s'  where tid='%s' " % (
            quest, ans, a["tid"])
        print(e)
        mycursor.execute(e)
        mydb.commit()
        e = "select tid,sid ,cid,task_stage ,question,answer from task "
        mycursor.execute(e)
        r = mycursor.fetchall()
        return json.dumps(r)
    except:
        r1 = []
        return (json.dumps(r1), "error")


@app.route('/view_d_s', methods=['POST'], strict_slashes=False)
def view_d_s():
    #
    try:

        try:
            a = request.json
            cid = ""
            if a["course"] == "python3":
                cid = "edu0p"
            elif a["course"] == "java":
                cid = "edu1j"
            elif a["course"] == "c":
                cid = "edu2c"
            elif a["course"] == "cpp":
                cid = "edu3cp"
            mydb = mysql.connector.connect(
                host="localhost", user="root",  password="",  database="student_activities")
            mycursor = mydb.cursor()
            e = "select cid,sid , daily_task_status from student  where cid='%s' ORDER BY mark  desc " % (
                cid)
            print(e)

            mycursor.execute(e)

            v1 = mycursor.fetchall()

            e = "select cid,sid , d_task,date from d_task "
            mycursor.execute(e)

            v2 = mycursor.fetchall()

            v = {"c": v1, "d": v2}
            return json.dumps(v)
        except:
            cid = ""
            mydb = mysql.connector.connect(
                host="localhost", user="root",  password="",  database="student_activities")
            mycursor = mydb.cursor()
            e = "select cid,sid , daily_task_status from student where cid='%s' ORDER BY mark  desc " % (
                cid)
            mycursor.execute(e)

            v1 = mycursor.fetchall()
            e = "select cid,sid , d_task,date from d_task "
            mycursor.execute(e)

            v2 = mycursor.fetchall()

            v = {"c": v1, "d": v2}
            return json.dumps(v)
    except:
        r1 = []
        return (json.dumps(r1), "error")


@app.route('/view_s_d', methods=['POST'], strict_slashes=False)
def view_s_d_():
    try:
        a = request.json
        mydb = mysql.connector.connect(
            host="localhost", user="root",  password="",  database="student_activities")
        mycursor = mydb.cursor()

        e = "select question,answer,output ,dtid from student_d_task  where sid='%s'  ORDER by dtid desc limit 1" % (
            a["sid"])
        print(e)
        mycursor.execute(e)

        v2 = mycursor.fetchall()
        return json.dumps(v2)
    except:
        r1 = []
        return (json.dumps(r1), "error")


@ app.route('/submit_d', methods=['POST'], strict_slashes=False)
def Submit_d():
    try:

        a = request.json

        quest = a["question"].replace("'", "\\'")
        quest = quest.replace('"', '\\"')
        print(quest)
        print(a)
        cid = ""
        if a["course"] == "python3":
            cid = "edu0p"
        elif a["course"] == "java":
            cid = "edu1j"
        elif a["course"] == "c":
            cid = "edu2c"
        elif a["course"] == "cpp":
            cid = "edu3cp"
        mydb = mysql.connector.connect(
            host="localhost", user="root",  password="",  database="student_activities")
        mycursor = mydb.cursor()
        e = "insert into d_task(sid,cid,d_task)values('%s','%s','%s')" % (
            a["sid"], cid, quest)
        print(e)
        mycursor.execute(e)
        mydb.commit()
        e = "select cid,sid , d_task,date from d_task "
        mycursor.execute(e)
        r = mycursor.fetchall()
        print(r)
        return json.dumps(r)
    except:
        r1 = []
        return (json.dumps(r1), "error")


@app.route('/d_s_m', methods=['POST'], strict_slashes=False)
def d_s_m():
    try:
        a = request.json
        mydb = mysql.connector.connect(
            host="localhost", user="root",  password="",  database="student_activities")
        mycursor = mydb.cursor()
        e = "select mark from student_d_task  where dtid='%s' and sid='%s'" % (
            a["dtid"], a["sid"])
        mycursor.execute(e)

        v2 = mycursor.fetchall()
        print(v2)
        if v2 == [(0,)]:
            e = "select mark from student  where sid='%s'" % (
                a["sid"])
            mycursor.execute(e)

            v2 = mycursor.fetchall()
            if v2[0][0] == None:

                mark = a["mk"]
            else:
                mark = int(a["mk"])+v2[0][0]
            e = "UPDATE student_d_task set mark='%s'where sid='%s' and dtid='%s' " % (int(a["mk"]),
                                                                                      a["sid"], a["dtid"])

            print(e)
            mycursor.execute(e)
            mydb.commit()
            e = "UPDATE student set mark='%s'where sid='%s'  " % (
                mark,  a["sid"])

            print(e)
            mycursor.execute(e)
            mydb.commit()
            e = "select mark from student  where sid='%s'" % (
                a["sid"])
            mycursor.execute(e)

            v2 = mycursor.fetchall()
            mark = v2[0][0]
            grade = ""
            if mark >= 90:
                grade = "a"
            elif mark >= 70:
                grade = "b "
            elif mark >= 50:
                grade = "c"
            elif mark >= 35:
                grade = "d"
            elif mark < 35:
                grade = "e"
            e = "UPDATE student set grade='%s'where sid='%s'  " % (
                grade, a["sid"])

            print(e)
            mycursor.execute(e)
            mydb.commit()

            return "done"
        elif v2 == []:
            return "sorry he is not completed"

        else:
            return "mark already added"
    except:
        return "error"


@app.route('/lve_message', methods=['POST'], strict_slashes=False)
def lve_message():
    try:
        a = request.json
        mydb = mysql.connector.connect(
            host="localhost", user="root",  password="",  database="student_activities")
        mycursor = mydb.cursor()
        date = datetime.now()
        e = "select * from lve ORDER by date desc "
        print(e)
        mycursor.execute(e)
        r = mycursor.fetchall()
        print(r)
        return json.dumps(r)
    except:

        r1 = []
        return (json.dumps(r1), "error")


@app.route('/upload_m', methods=['POST'], strict_slashes=False)
def upload_m():
    try:
        file = request.files['file']
        sid = request.form['sid']
        course = request.form['course']
        filename = request.form['file_name']
        mydb = mysql.connector.connect(
            host="localhost", user="root",  password="",  database="student_activities")
        mycursor = mydb.cursor()
        cid = ""
        if course == "python3":
            cid = "edu0p"
        elif course == "java":
            cid = "edu1j"
        elif course == "c":
            cid = "edu2c"
        elif course == "cpp":
            cid = "edu3cp"
        try:
            file.save('./bank/public/materials/%s.pdf' % (filename))
        except:
            file.save('./public/materials/%s.pdf' % (filename))
        e = "insert into material(sid,cid,material)values('%s','%s','%s')" % (
            sid, cid, filename)
        print(e)
        mycursor.execute(e)
        mydb.commit()

        return "Uploaded successfully"
    except:

        return "error"


@app.route('/sho_st_task', methods=['POST'], strict_slashes=False)
def sho_st_task():
    try:
        a = request.json
        mydb = mysql.connector.connect(
            host="localhost", user="root",  password="",  database="student_activities")
        mycursor = mydb.cursor()
        cid = ""
        if a["course"] == "python3":
            cid = "edu0p"
        elif a["course"] == "java":
            cid = "edu1j"
        elif a["course"] == "c":
            cid = "edu2c"
        elif a["course"] == "cpp":
            cid = "edu3cp"
        e = '''SELECT sd.cid, st.sid,sd.task_status,st.qid,st.question,st.code,st.output from student sd
    JOIN student_task st
    ON sd.sid = st.sid WHERE sd.cid='%s'ORDER BY st.mark ; ''' % (
            cid)
        print(e)
        mycursor.execute(e)

        v2 = mycursor.fetchall()
        return json.dumps(v2)
    except:

        r1 = []
        return (json.dumps(r1), "error")


@app.route('/t_s_m', methods=['POST'], strict_slashes=False)
def t_s_m():
    try:
        a = request.json
        mydb = mysql.connector.connect(
            host="localhost", user="root",  password="",  database="student_activities")
        mycursor = mydb.cursor()
        e = "select mark from student_task  where qid='%s' and sid='%s'" % (
            a["qid"], a["sid"])
        mycursor.execute(e)

        v2 = mycursor.fetchall()
        print(v2)
        if v2 == [(0,)] or v2 == [(0,), (0,)]:
            e = "select mark from student  where sid='%s'" % (
                a["sid"])
            mycursor.execute(e)

            v2 = mycursor.fetchall()

            print(v2, a["mk"])
            if v2[0][0] == None:

                mark = a["mk"]
            else:
                mark = int(a["mk"])+v2[0][0]

            e = "UPDATE student_task set mark='%s'where sid='%s' and qid='%s' " % (
                int(a["mk"]),  a["sid"], a["qid"])

            print(e)
            mycursor.execute(e)
            mydb.commit()
            e = "UPDATE student set mark='%s'where sid='%s'  " % (
                mark,  a["sid"])

            print(e)
            mycursor.execute(e)
            mydb.commit()
            e = "select mark from student  where sid='%s'" % (
                a["sid"])
            mycursor.execute(e)

            v2 = mycursor.fetchall()
            mark = v2[0][0]
            grade = ""
            if mark >= 90:
                grade = "a"
            elif mark >= 70:
                grade = "b "
            elif mark >= 50:
                grade = "c"
            elif mark >= 35:
                grade = "d"
            elif mark < 35:
                grade = "e"
            e = "UPDATE student set grade='%s'where sid='%s'  " % (
                grade, a["sid"])

            print(e)
            mycursor.execute(e)
            mydb.commit()

            return "done"
        elif v2 == []:
            return "sorry he is not completed"

        else:
            return "mark already added"
    except:
        return "error"


@app.route('/view_m', methods=['POST'], strict_slashes=False)
def view_m():
    try:
        mydb = mysql.connector.connect(
            host="localhost", user="root",  password="",  database="student_activities")
        mycursor = mydb.cursor()
        e = "select cid ,sid,material from material"
        mycursor.execute(e)

        v2 = mycursor.fetchall()
        return json.dumps(v2)
    except:

        r1 = []
        return (json.dumps(r1), "error")


if __name__ == "__main__":
    app.run(debug=True)
