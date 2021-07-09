const cors = require("cors");
const express = require("express");
const queueStatus = require("./queuestatus.json");
const list = require("./list.json");

// Express App Setup
const app = express();
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Epxress route handlers
app.get("/", (req, res) => {
  res.send("Hi");
});

app.get("/rest/elevator/dbconnect/eNformControl", async (req, res) => {
  res.send({
    jdbcDriver: "oracle.jdbc.OracleDriver",
    jdbcURL: "jdbc:oracle:thin:@127.0.0.1:1521:ORCLCDB.localdomain",
    username: "NFORMCTRL5",
    passwd: "6ADDEF92054992C0",
    encryptedPassword: true,
  });
});

app.get("/rest/elevator/queuestatus", async (req, res) => {
  res.send(queueStatus);
});

app.get("/rest/elevator/stepisrunning/:stepName", async (req, res) => {
  res.send(Boolean(Math.round(Math.random())).toString());
});

app.get(
  "/rest/elevator/fileservice/logfile/search/:params",
  async (req, res) => {
    res.send(list);
  }
);

app.listen(12700, (error) => {
  console.log("Listening...");
});
