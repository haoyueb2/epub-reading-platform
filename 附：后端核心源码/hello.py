from flask import Flask
from flask import jsonify
import pymysql
from flask import abort
import json
from flask_cors import *

app = Flask(__name__)
CORS(app, supports_credentials=True)


class Database:
    def __init__(self):
        host = "127.0.0.1"
        user = "root"
        password = "1234567"
        db = "web3test"
        self.con = pymysql.connect(host=host, user=user, password=password, db=db, cursorclass=pymysql.cursors.
                                   DictCursor)
        self.cur = self.con.cursor()

    def list_all(self):
        self.cur.execute("SELECT * FROM web3test.films_all limit 100 ")
        result = self.cur.fetchall()
        return result

    def list_one_page(self, start):
        sql = "SELECT * FROM web3test.films_all limit %s,10 "
        self.cur.execute(sql, start)
        result = self.cur.fetchall()
        return result

    def get_film_id(self, _id):
        sql = "SELECT * FROM web3test.films_all where _id like %s"
        self.cur.execute(sql, "%" + _id + "%")
        result = self.cur.fetchall()
        return result

    def genre_num(self, genre):
        sql ="select _id from web3test.films_all where genres like %s"
        result = self.cur.execute(sql, "%"+genre+"%")
        return str(result)

    def list_genre_page(self, genre, start):
        sql = "SELECT * FROM web3test.films_all where genres like %s limit %s,10 "
        self.cur.execute(sql, ("%"+genre+"%", start))
        result = self.cur.fetchall()
        return result

    def title_num(self, title):
        sql ="select _id from web3test.films_all where title like %s"
        result = self.cur.execute(sql, "%"+title+"%")
        return str(result)

    def list_title_page(self, title, start):
        sql = "SELECT * FROM web3test.films_all where title like %s limit %s,10 "
        self.cur.execute(sql, ("%"+title+"%", start))
        result = self.cur.fetchall()
        return result

    def all_num(self, value):
        sql ="select _id from web3test.films_all where title like %s"
        result = self.cur.execute(sql, "%"+value+"%")
        sql = "select _id from web3test.films_all where genres like %s"
        result += self.cur.execute(sql, "%" + value + "%")
        sql = "select _id from web3test.films_all where casts like %s"
        result += self.cur.execute(sql, "%" + value + "%")
        sql = "select _id from web3test.films_all where countries like %s"
        result += self.cur.execute(sql, "%" + value + "%")
        sql = "select _id from web3test.films_all where languages like %s"
        result += self.cur.execute(sql, "%" + value + "%")
        sql = "select _id from web3test.films_all where directors like %s"
        result += self.cur.execute(sql, "%" + value + "%")
        sql = "select _id from web3test.films_all where writers like %s"
        result += self.cur.execute(sql, "%" + value + "%")
        sql = "select _id from web3test.films_all where summary like %s"
        result += self.cur.execute(sql, "%" + value + "%")
        sql = "select _id from web3test.films_all where aka like %s"
        result += self.cur.execute(sql, "%" + value + "%")
        sql = "select _id from web3test.films_all where _id like %s"
        result += self.cur.execute(sql, "%" + value + "%")
        return str(result)

    def list_all_page(self, value, start):
        result = []
        sql = "SELECT * FROM web3test.films_all where title like %s limit %s,10 "
        self.cur.execute(sql, ("%"+value+"%", start))
        result += self.cur.fetchall()
        sql = "SELECT * FROM web3test.films_all where genres like %s limit %s,10 "
        self.cur.execute(sql, ("%" + value + "%", start))
        result.extend(self.cur.fetchall())
        sql = "SELECT * FROM web3test.films_all where casts like %s limit %s,10 "
        self.cur.execute(sql, ("%" + value + "%", start))
        result.extend(self.cur.fetchall())
        sql = "SELECT * FROM web3test.films_all where countries like %s limit %s,10 "
        self.cur.execute(sql, ("%" + value + "%", start))
        result.extend(self.cur.fetchall())
        sql = "SELECT * FROM web3test.films_all where languages like %s limit %s,10 "
        self.cur.execute(sql, ("%" + value + "%", start))
        result.extend(self.cur.fetchall())
        sql = "SELECT * FROM web3test.films_all where directors like %s limit %s,10 "
        self.cur.execute(sql, ("%" + value + "%", start))
        result.extend(self.cur.fetchall())
        sql = "SELECT * FROM web3test.films_all where writers like %s limit %s,10 "
        self.cur.execute(sql, ("%" + value + "%", start))
        result.extend(self.cur.fetchall())
        sql = "SELECT * FROM web3test.films_all where summary like %s limit %s,10 "
        self.cur.execute(sql, ("%" + value + "%", start))
        result.extend(self.cur.fetchall())
        sql = "SELECT * FROM web3test.films_all where aka like %s limit %s,10 "
        self.cur.execute(sql, ("%" + value + "%", start))
        result.extend(self.cur.fetchall())
        sql = "SELECT * FROM web3test.films_all where _id like %s limit %s,10 "
        self.cur.execute(sql, ("%" + value + "%", start))
        result.extend(self.cur.fetchall())
        return result

    def all_genre(self):
        sql ="select genres from web3test.films_all"
        self.cur.execute(sql)
        result = self.cur.fetchall()
        return result

    def all_country(self):
        sql ="select countries from web3test.films_all"
        self.cur.execute(sql)
        result = self.cur.fetchall()
        return result

    def all_language(self):
        sql ="select languages from web3test.films_all"
        self.cur.execute(sql)
        result = self.cur.fetchall()
        return result

@app.route('/api/films')
def index():
    db = Database()
    titles = db.list_all()
    return jsonify(titles)
    # return json.dumps(titles, ensure_ascii=False)


@app.route('/api/films/<page>')
def get_page(page):
    db = Database()
    page = int(page)
    start = page * 10 - 10
    # start表示每回开始取的位置，比如第10页从第90项开始，每页取10项
    one_page_film = db.list_one_page(start)
    return jsonify(one_page_film)


@app.route('/api/id/<_id>')
def get_id(_id):
    db = Database()
    one_page_film = db.get_film_id(_id)
    return jsonify(one_page_film)


@app.route('/api/genre/<genre>')
def get_genre_num(genre):
    db = Database()
    return db.genre_num(genre)


@app.route('/api/genre/<genre>/<page>')
def get_genres_page(genre, page):
    db = Database()
    page = int(page)
    start = page * 10 - 10
    one_page_film = db.list_genre_page(genre, start)
    return jsonify(one_page_film)


@app.route('/api/title/<title>')
def get_title_num(title):
    db = Database()
    return db.title_num(title)


@app.route('/api/title/<title>/<page>')
def get_title_page(title, page):
    db = Database()
    page = int(page)
    start = page * 10 - 10
    one_page_film = db.list_title_page(title, start)
    return jsonify(one_page_film)


@app.route('/api/all/<all>')
def get_all_num(all):
    db = Database()
    return db.all_num(all)


@app.route('/api/all/<all>/<page>')
def get_all_page(all, page):
    db = Database()
    page = int(page)
    start = page * 10 - 10
    one_page_film = db.list_all_page(all, start)
    return jsonify(one_page_film)


@app.route('/api/genre/all')
def get_all_genre():
    db = Database()
    return jsonify(db.all_genre())


@app.route('/api/country/all')
def get_all_country():
    db = Database()
    return jsonify(db.all_country())


@app.route('/api/language/all')
def get_all_language():
    db = Database()
    return jsonify(db.all_language())


if __name__ == '__main__':
    app.run(debug=True)
