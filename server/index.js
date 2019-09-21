const keys = require("./keys");
const redis = require("redis");
const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");

// Express App Setup
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Postgres Setup
const { Pool } = require("pg");
const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort
});

pgClient.on("error", () => console.log("Lost PG connection"));

pgClient
  .query("CREATE TABLE IF NOT EXISTS values (number INT)")
  .then(() => {})
  .catch(error => console.log(error));

// Redis Server Setup
const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000
});

const redisPub = redisClient.duplicate();

// Epxress route handlers
app.get("/", (req, res) => {
  res.send("Hi");
});

app.get("/values", async (req, res) => {
  const values = await pgClient.query("SELECT * FROM values");

  res.send(values.rows);
});

app.get("/values/current", async (req, res) => {
  redisClient.hgetall("values", (err, values) => {
    res.send(values);
  });
});

app.post("/values", (req, res) => {
  const { index } = req.body;

  if (parseInt(index) > 40) {
    return res.status(422).send("Index too hight");
  }

  redisClient.hset("values", index, "Nothing yet");
  redisPub.publish("insert", index);

  pgClient.query("INSERT INTO values(number) VALUES ($1)", [index]);

  res.send({ working: true });
});

app.listen(5000, error => {
  console.log("Listening...");
});
