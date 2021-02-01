class documentService {
  constructor(db, timeStamp, root) {
    this.root = root;
    this.timeStamp = timeStamp;
    this.ref = db.collection("documents");
  }


  createAnnotation(annotation, id) {
    annotation.created = this.timeStamp;
    return this.ref.doc(id).
      collection("annotations").add(annotation);
  }

  read(id = null) {
    return id ? this.ref.doc(id).get() : this.ref.get();
  }

  readAnnotations(id) {
    return this.ref.doc(id).collection('annotations').get();
  }
}

export default documentService;