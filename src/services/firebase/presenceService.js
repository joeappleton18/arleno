class presenceService {
  constructor(db, rtdb, timestamp, timestampRtdb, root) {
    if (!rtdb) {
      return;
    }
    this.connectedRef = rtdb.ref(".info/connected");
    this.rtdb = rtdb;
    this.statusRef = db.collection("status");
    this.rtStatusRef = "";
    this.timestamp = timestamp;
    this.timestampRtdb = timestampRtdb;
  }

  setPresence(state, rt = false) {
    return {
      state: state,
      last_changed: rt ? this.timestampRtdb : this.timestamp,
    };
  }

  setStatus(state, id) {
    return this.statusRef.doc(id).set(this.setPresence(state));
  }

  setRtStatus(state, id) {
    debugger;
    this.rtdb.ref("/status/" + id).set(this.setPresence(state, true));
  }

  onDisconnect(id) {
    return this.rtdb
      .ref("/status/" + id)
      .onDisconnect()
      .set(this.setPresence("offline", true));
  }
}

export default presenceService;
