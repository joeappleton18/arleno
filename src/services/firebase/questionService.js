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

  update(question, id) {
    user.updated = this.timeStamp;
    return this.ref.doc(id).update(question);
  }

  read(id = null) {
    return id ? this.ref.doc(id).get() : this.ref.get();
  }
}

export default questionService;