const path = require("path");

const { https, auth, database, firestore } = require("firebase-functions");
const { default: next } = require("next");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();
/*const auth = admin.auth();*/

const isDev = process.env.NODE_ENV !== "production";
//const nextjsDistDir = join('src', require('./src/next.config.js').distDir)

const nextjsServer = next({
  dev: isDev,
  conf: {
    distDir: `${path.relative(process.cwd(), __dirname)}/.next`,
  },
});
const nextjsHandle = nextjsServer.getRequestHandler();

exports.nextjsFunc = https.onRequest((req, res) => {
  return nextjsServer.prepare().then(() => nextjsHandle(req, res));
});

exports.userCreated = auth.user().onCreate((user) => {
  const { uid, email, photoURL } = user;
  return db
    .collection("users")
    .doc(uid)
    .set({ uid, email, photoURL, joinStage: 1 });
});




exports.userDeleted = auth.user().onDelete(async (user) => {
  const { uid } = user;
  await db.collection("status").doc(uid).delete();
  return db.collection("users").doc(uid).delete();
});


exports.answerUpdated = firestore
  .document("questions/{questionID}/answers/{answerID}")
  .onWrite((change, context) => {

    const answer = change.after.exists ? change.after.data() : null;
    if (!answer) {
      console.log('record deleted no need to act');
      return;
    }
    let updatedRecord = {};
    if (!answer.upvotes) {
      updatedRecord.upvotes = [];
    }

    updatedRecord.upvotes_count = answer.upvotes.length;

    return change.after.ref.set(updatedRecord, { merge: true });

  })


exports.onUserStatusChanged = database
  .ref("/status/{uid}")
  .onUpdate(async (change, context) => {
    const eventStatus = change.after.val();
    const statusSnapshot = await change.after.ref.once("value");
    const status = statusSnapshot.val();

    if (status.last_changed > eventStatus.last_changed) {
      return null;
    }
    eventStatus.last_changed = new Date(eventStatus.last_changed);
    return db.collection("status").doc(context.params.uid).set(eventStatus);
  });


