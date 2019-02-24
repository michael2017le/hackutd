from flask import Flask, render_template
from flask_pymongo import PyMongo

app = Flask(__name__, static_folder="../static/dist", template_folder="../static")
app.config["MONGO_URI"] = "mongodb://localhost:27017/test"
mongo = PyMongo(app)

@app.route("/")
def index():
  user = mongo.db.users.find({"x":2})
  print(user[0])
  return render_template("index.html")

@app.route("/hello")
def hello():
  return render_template("home.html")

if __name__ == "__main__":
  app.run()
