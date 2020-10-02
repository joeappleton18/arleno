import React, { useEffect } from "react";

class userService {
  constructor(db, timeStamp, root) {
    this.root = root;
    this.timeStamp = timeStamp;
    this.ref = db.collection("users");
  }

  destructGoogleAuth(cred) {
    const { uid, email } = cred.user;
    const { family_name, given_name } = cred.additionalUserInfo.profile;

    return {
      id: uid,
      email: email,
      photo: "",
      firstName: given_name,
      lastName: family_name,
    };
  }

  destructAuthObj(cred) {
    const { uid, email, photoURL } = cred;

    return {
      id: uid,
      email: email,
      photo: photoURL,
      firstName: "",
      lastName: "",
    };
  }

  create(user, id) {
    user.created = this.timeStamp;
    return this.ref.doc(id).set(user);
  }

  update(user, id) {
    user.updated = this.timeStamp;
    return this.ref.doc(id).update(user);
  }

  read(id = null) {
    return id ? this.ref.doc(id).get() : this.ref.get();
  }
}

export default userService;
