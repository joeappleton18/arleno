class questionService {
  constructor(db, timeStamp, root) {
    this.root = root;
    this.timeStamp = timeStamp;
    this.ref = db.collection("questions");

  }


  create(question, id) {
    question.created = this.timeStamp;
    return this.ref.doc(id).set(question);
  }


  updateAnswer(answer, questionId, id) {
    answer.updated = this.timeStamp;
    return this.ref.doc(questionId)
      .collection("answers")
      .doc(id)
      .update(answer);
  }

  createAnswer(answer, questionId, id) {
    answer.created = this.timeStamp;
    answer.active = 1;
    answer.upvotes = [];
    return this.ref.doc(questionId)
      .collection("answers")
      .doc(id)
      .set(answer);
  }

  deleteAnswer(questionId, id) {
    return this.ref.doc(questionId)
      .collection("answers")
      .doc(id)
      .update({ active: 0 })
  }

  update(question, id) {
    user.updated = this.timeStamp;
    return this.ref.doc(id).update(question);
  }


  read(id = null) {
    return id ? this.ref.doc(id).get() : this.ref.get();
  }

  realtimeRead(id = null, callback) {
    return this.ref.doc(id).collection("answers").where("active", "==", 1).orderBy("upvotes_count", "desc").onSnapshot(callback);
  }

  readAnswers(id) {
    return this.ref.doc(id)
      .collection("answers")
      .get();
  }

}

export default questionService;