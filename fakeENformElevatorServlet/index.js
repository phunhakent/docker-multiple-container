const cors = require("cors");
const express = require("express");
const queueStatus = require("./queuestatus.json");
const list = require("./list.json");
const destinationqueues = require("./destinationqueues.json");
const restoresteps = require("./restoresteps.json");

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

app.get("/rest/elevator/destinationqueues", async (req, res) => {
  res.send(destinationqueues);
});

app.get("/rest/elevator/restoresteps", async (req, res) => {
  res.send(restoresteps);
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

app.get(
  "/rest/elevator/fileservice/logfile/get/:fileName",
  async (req, res) => {
    var fileName = req.params.fileName;

    res.download(`${__dirname}/demo_logfile.log`, fileName);
  }
);

app.post("/rest/elevator/restartjob/:jobId", async (req, res) => {
  res.send({ jobId: req.params.jobId });
});

app.post("/rest/elevator/deletejob/:jobId", async (req, res) => {
  res.send({ jobId: req.params.jobId });
});

app.post("/rest/elevator/jobtoqueue/:jobId/:queueName", async (req, res) => {
  res.send({
    jobId: req.params.jobId,
    queueName: req.params.queueName,
  });
});

app.post("/rest/elevator/stepstart/:stepName", async (req, res) => {
  res.send({
    stepName: req.params.stepName,
  });
});

app.post(
  "/rest/elevator/jobstoqueue/:stepName/:queueName",
  async (req, res) => {
    res.send({
      stepName: req.params.stepName,
      queueName: req.params.queueName,
    });
  }
);

app.post("/rest/elevator/stepstop/:stepName", async (req, res) => {
  res.send({
    stepName: req.params.stepName,
  });
});

app.post("/rest/elevator/loglevel/:stepName/:logLevel", async (req, res) => {
  res.send({
    stepName: req.params.stepName,
    logLevel: req.params.logLevel,
  });
});

app.post("/rest/elevator/instances/:stepName/:amount", async (req, res) => {
  res.send({
    stepName: req.params.stepName,
    amount: req.params.amount,
  });
});

app.get("/rest/elevator/fileservice/jobfile/get/:path", async (req, res) => {
  res.download(`${__dirname}/demo_logfile.log`, "jobfile");
});

app.get("/rest/elevator/fileservice/backup/get/:path", async (req, res) => {
  res.download(`${__dirname}/demo_logfile.log`, "backup");
});

app.post("/rest/elevator/fileservice/jobfile/set/:path", async (req, res) => {
  res.send({
    filename: req.params.path,
  });
});

app.post("/rest/elevator/fileservice/backup/set/:path", async (req, res) => {
  res.send({
    filename: req.params.path,
  });
});

app.listen(12700, (error) => {
  console.log("Listening...");
});
