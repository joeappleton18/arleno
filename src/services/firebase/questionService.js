class questionService {
  constructor(db, timeStamp, root) {
    this.root = root;
    this.timeStamp = timeStamp;
    this.ref = db.collection("questions");

  }


  create(question, id = false) {
    question.created = this.timeStamp;
    if (id) {
      return this.ref.doc(id).set(question);
    }
    return this.ref.add(question);
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
    question.updated = this.timeStamp;
    return this.ref.doc(id).update(question);
  }


  read(id = null) {
    return id ? this.ref.doc(id).get() : this.ref.get();
  }

  realtimeRead(id = null, callback, orderBy = "upvotes_count", order = "desc") {

    return this.ref.doc(id).collection("answers").where("active", "==", 1).orderBy(orderBy, order).onSnapshot(callback);
  }

  readAnswers(id) {
    return this.ref.doc(id)
      .collection("answers")
      .get();
  }

}

export default questionService;