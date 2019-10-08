from flask import Flask, render_template
from flask_mysqldb import MySQL
app = Flask(__name__)

app.config['MYSQL_HOST'] = 'localhost' 
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'password'
app.config['MYSQL_DB'] = 'facturaciondistribuidos'
mysql = MySQL(app)


@app.route("/")
def Index():
    return render_template("principal.html")


if __name__ == '__main__':
    app.debug = True
    app.run(host = '192.168.100.18',port=5001)



