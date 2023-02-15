"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var questionService =
/*#__PURE__*/
function () {
  function questionService(db, timeStamp, root) {
    _classCallCheck(this, questionService);

    this.root = root;
    this.timeStamp = timeStamp;
    this.ref = db.collection("questions");
  }

  _createClass(questionService, [{
    key: "create",
    value: function create(question) {
      var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      question.created = this.timeStamp;

      if (id) {
        return this.ref.doc(id).set(question);
      }

      return this.ref.add(question);
    }
  }, {
    key: "updateAnswer",
    value: function updateAnswer(answer, questionId, id) {
      answer.updated = this.timeStamp;
      return this.ref.doc(questionId).collection("answers").doc(id).update(answer);
    }
  }, {
    key: "createAnswer",
    value: function createAnswer(answer, questionId, id) {
      answer.created = this.timeStamp;
      answer.active = 1;
      answer.upvotes = [];
      return this.ref.doc(questionId).collection("answers").doc(id).set(answer);
    }
  }, {
    key: "deleteAnswer",
    value: function deleteAnswer(questionId, id) {
      return this.ref.doc(questionId).collection("answers").doc(id).update({
        active: 0
      });
    }
  }, {
    key: "update",
    value: function update(question, id) {
      question.updated = this.timeStamp;
      return this.ref.doc(id).update(question);
    }
  }, {
    key: "read",
    value: function read() {
      var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      return id ? this.ref.doc(id).get() : this.ref.get();
    }
  }, {
    key: "realtimeRead",
    value: function realtimeRead() {
      var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var callback = arguments.length > 1 ? arguments[1] : undefined;
      var orderBy = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "upvotes_count";
      var order = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "desc";
      return this.ref.doc(id).collection("answers").where("active", "==", 1).orderBy(orderBy, order).onSnapshot(callback);
    }
  }, {
    key: "readAnswers",
    value: function readAnswers(id) {
      return this.ref.doc(id).collection("answers").get();
    }
  }]);

  return questionService;
}();

var _default = questionService;
exports["default"] = _default;