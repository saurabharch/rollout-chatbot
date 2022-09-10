
class DirMoveToAgent {

  constructor(rolloutclient) {
    // rolloutclient.openNow(callback) {
    if (!rolloutclient) {
      throw new Error('rolloutclient (TiledeskClient) object is mandatory.');
    }
    this.rolloutclient = rolloutclient;
  }

  execute(directive, requestId, depId, callback) {
    console.log("DirMoveToAgent...")
    if (directive.whenOnlineOnly === true) {
      this.rolloutclient.openNow((err, result) => {
        if (err) {
          console.error("Agent in DirOfflineHours Error:", err);
          callback();
        }
        else {
          if (result && result.isopen) {
            this.rolloutclient.agent(requestId, depId, (err) => {
              if (err) {
                console.error("Error moving to agent during online hours:", err);
              }
              else {
                console.log("Successfully moved to agent during online hours");
              }
              callback();
            });
          }
          else {
            callback();
          }
        }
      });
    }
    else {
      this.rolloutclient.agent(requestId, depId, (err) => {
        if (err) {
          console.error("Error moving to agent:", err);
        }
        else {
          console.log("Successfully moved to agent");
        }
        callback();
      });
    }
  }
}

module.exports = { DirMoveToAgent };