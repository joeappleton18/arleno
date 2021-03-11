class documentService {
  constructor(db, timeStamp, root) {
    this.root = root;
    this.timeStamp = timeStamp;
    this.ref = db.collection("documents");
  }


  updateAnnotation(annotation, documentId, id) {
    annotation.updated = this.timeStamp;
    return this.ref.doc(documentId)
      .collection("annotations")
      .doc(id)
      .update(annotation);
  }


  deleteAnnotation(documentId, id) {
    return this.ref.doc(documentId)
      .collection("annotations")
      .doc(id)
      .delete();
  }

  createAnnotation(annotation, id) {
    annotation.created = this.timeStamp;
    return this.ref.doc(id).
      collection("annotations").add(annotation);
  }

  create(document, id = null) {
    document.created = this.timeStamp;
    return id ? this.ref.doc(id).set(document) : this.ref.add(document);
  }

  read(id = null) {
    return id ? this.ref.doc(id).get() : this.ref.get();
  }

  readAnnotations(id, annotationId = null) {
    return annotationId ? this.ref.doc(id).collection('annotations')
      .doc(annotationId)
      .get()
      : this.ref.doc(id).collection('annotations').get();
  }
}

export default documentService;