from flask import Flask,request
from flask import jsonify
import pymysql
from flask import abort
import json
from flask_cors import *
from flask import Response
import os

app = Flask(__name__)
CORS(app, supports_credentials=True)
UPLOAD_FOLDER = 'static'

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
class Database:
    def __init__(self):
        host = "127.0.0.1"
        user = "root"
        password = "1234567"
        db = "webproject"
        self.con = pymysql.connect(host=host, user=user, password=password, db=db, cursorclass=pymysql.cursors.
                                   DictCursor)
        self.cur = self.con.cursor()

    def get_user(self, username, password):
        sql = "SELECT * FROM webproject.users where username = %s and password = %s "
        self.cur.execute(sql, (username, password))
        result = self.cur.fetchall()
        return result

    def create_user(self,username,password):
        sql = "INSERT INTO webproject.users (username,password) VALUES (%s,%s)"
        self.cur.execute(sql, (username, password))
        self.con.commit()

    def add_to_shelf(self,user_id,book_id):
        sql = "INSERT INTO webproject.bookshelf (user_id,book_id) VALUES (%s,%s)"
        self.cur.execute(sql, (user_id, book_id))
        self.con.commit()


    def delete_from_shelf(self,user_id,book_id):
        sql = "DELETE FROM webproject.bookshelf where user_id = %s and book_id = %s;"
        self.cur.execute(sql, (user_id, book_id))
        self.con.commit()

    def find_book(self, user_id):
        sql = "SELECT book_id FROM webproject.bookshelf where user_id = %s "
        self.cur.execute(sql, user_id)
        result = self.cur.fetchall()
        return result

    def add_comment(self, username, book_id, comment):
        sql = "INSERT INTO webproject.comments (username,book_id,comment) VALUES (%s,%s,%s)"
        self.cur.execute(sql, (username, book_id, comment))
        self.con.commit()

    def find_comment(self, book_id):
        sql = "SELECT * FROM webproject.comments where book_id = %s "
        self.cur.execute(sql, book_id)
        result = self.cur.fetchall()
        return result

    def get_books(self):
        sql = "SELECT * FROM webproject.books"
        self.cur.execute(sql)
        result = self.cur.fetchall()
        return result

    def delete_book(self,title):
        print(title)
        sql = "DELETE FROM webproject.books where title= %s"
        self.cur.execute(sql, title)
        self.con.commit()

    def add_book(self,author,title,description,cover_img_url):
        sql = "DELETE FROM webproject.books where title= %s"
        self.cur.execute(sql, title)
        self.con.commit()
        sql = "INSERT INTO webproject.books (author,title,description,cover_image_url) VALUES (%s,%s,%s,%s)"
        self.cur.execute(sql, (author,title,description,cover_img_url))
        self.con.commit()


@app.route('/api/books')
def get_books():
    db = Database()
    result = db.get_books()
    print(result)
    response = dict()
    for tmp in result :
        response[tmp['id']] = tmp

    return jsonify(response)


@app.route('/api/delete_book/<title>')
def delete_book(title):
    db = Database()
    db.delete_book(title)
    print(os.path.join(app.config['UPLOAD_FOLDER'], title))
    if os.path.exists(os.path.join(app.config['UPLOAD_FOLDER'], title+'.epub')):
        os.remove(os.path.join(app.config['UPLOAD_FOLDER'], title+'.epub'))

    if os.path.exists(os.path.join(app.config['UPLOAD_FOLDER'], title+'.svg')):
        os.remove(os.path.join(app.config['UPLOAD_FOLDER'], title+'.svg'))
    return"ok"


@app.route('/api/session', methods=['POST'])
def get_user():
    db = Database()
    data = request.get_data()
    j_data = json.loads(data)
    result = db.get_user(j_data['username'], j_data['password'])
    response = dict()
    print(result)
    response['username'] = result[0]['username']
    response['id'] = result[0]['id']
    return jsonify(response)


@app.route('/api/user', methods=['POST'])
def create_user():
    db = Database()
    data = request.get_data()
    j_data = json.loads(data)
    db.create_user(j_data['username'], j_data['password'])
    return "ok"


@app.route('/api/bookshelf', methods=['POST'])
def add_to_shelf():
    db = Database()
    data = request.get_data()
    j_data = json.loads(data)
    db.add_to_shelf(j_data['user_id'], j_data['book_id'])
    return "ok"


@app.route('/api/delete_bookshelf', methods=['POST'])
def delete_from_shelf():
    db = Database()
    data = request.get_data()
    j_data = json.loads(data)
    db.delete_from_shelf(j_data['user_id'], j_data['book_id'])
    return "ok"


@app.route('/api/bookshelf/<user_id>')
def find_book(user_id):
    db = Database()
    user_id = int(user_id)
    result = db.find_book(user_id)
    return jsonify(result)




@app.route("/api/svg/<title>")
def find_svg(title):
    imgPath = "static/{}.svg".format(title)
    with open(imgPath, 'rb') as f:
        image = f.read()
    resp = Response(image, mimetype="image/svg+xml")
    return resp


@app.route("/api/epub/<title>")
def find_epub(title):
    imgPath = "static/{}".format(title)
    with open(imgPath, 'rb') as f:
        image = f.read()
    resp = Response(image, mimetype="application/epub+zip")
    return resp


@app.route("/api/upload_epub",methods=['POST'])
def save_epub() :
    print(request.files)
    file = request.files['epub']
    file.save(os.path.join(app.config['UPLOAD_FOLDER'], file.filename))
    return "ok"


@app.route("/api/upload",methods=['POST'])
def add_book() :
    db = Database()
    data = request.get_data()
    j_data = json.loads(data)
    print(j_data)
    db.add_book(j_data['author'], j_data['title'], j_data['description'], j_data['cover_img_url'])
    return "ok"

if __name__ == '__main__':
    app.run(debug=True)

