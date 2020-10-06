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

  setStatus(state, id, data) {
    return this.statusRef.doc(id).set({ ...this.setPresence(state), ...data });
  }

  setRtStatus(state, id, data) {
    this.rtdb
      .ref("/status/" + id)
      .set({ ...this.setPresence(state, true), ...data });
  }

  onDisconnect(id, data) {
    return this.rtdb
      .ref("/status/" + id)
      .onDisconnect()
      .set({ ...this.setPresence("offline", true), ...data });
  }

  readOnlineUpdate() {
    return this.statusRef.where("state", "==", "online");
  }
}

export default presenceService;
