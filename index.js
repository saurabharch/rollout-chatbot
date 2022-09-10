require('dotenv').config();
var express = require('express');

var app = express();
const tybot = require("@saurabharch/rollout-tybot-connector");
//const tybot = require("./tybotRoute");
const tybotRoute = tybot.router;
app.use("/", tybotRoute); // /tybot

tybot.startApp(
  {
    MONGODB_URI: process.env.mongoUrl,
    API_ENDPOINT: process.env.API_ENDPOINT,
    log: process.env.Rolltbot_LOG
  }, () => {
    console.log("Rolltbot route successfully started.");
    var port = process.env.PORT || 3000;
    app.listen(port, function () {
      console.log('Rolltbot connector listening on port ', port);
    });
  }
);

/* GETS PARAMS FROM PROCESS.ENV
tybot.startApp(() => {
    console.log("Tybot route successfully started.");
    var port = process.env.PORT || 3000;
    app.listen(port, function () {
      console.log('Rolltbot connector listening on port:', port);
    });
  }
);
*/
