from flask import Flask, render_template, jsonify, request
from flask_pymongo import PyMongo
from flask_cors import CORS
from bson.objectid import ObjectId

app = Flask(__name__, static_folder="../static/dist", template_folder="../static")
app.config["MONGO_URI"] = "mongodb://localhost:27017/test"
mongo = PyMongo(app)

CORS(app)

@app.route("/api/jobs", methods=['GET'])
def get_all_jobs():
  jobs = mongo.db.jobs
  result = []
  for job in jobs.find():
    result.append({"_id":str(job["_id"]), "title":job["title"], "description":job["description"]})
  return jsonify(result)

@app.route("/api/job", methods=['POST'])
def add_job():
  jobs = mongo.db.jobs
  title = request.get_json()['title']
  description = request.get_json()['description']
  print(description)
  job_id = jobs.insert({"title":title, 'description':description})
  new_job = jobs.find_one({"_id":job_id})
  result = {'title':new_job['title'], 'description':new_job['description']}
  return jsonify({"result":result})

@app.route("/api/job/<id>", methods=['PUT'])
def update_job(id):
  jobs = mongo.db.jobs
  title = request.get_json()['title']
  description = request.get_json()['description']
  jobs.find_one_and_update({'_id':ObjectId(id)}, {"$set": {"title":title, "description":description}}, upsert=False)
  new_job = jobs.find_one({'_id':ObjectId(id)})
  result = {'title':new_job['title'], 'description':new_job['description']}
  return jsonify({"result":result})

@app.route("/api/job/<id>", methods=['DELETE'])
def delete_job(id):
  jobs = mongo.db.jobs
  response = jobs.delete_one({'_id':ObjectId(id)})
  if response.deleted_count == 1:
    result = {'message': 'record deleted'}
  else:
    result = {'message': 'no record found'}
  return jsonify({"result":result})

if __name__ == "__main__":
  app.run()
