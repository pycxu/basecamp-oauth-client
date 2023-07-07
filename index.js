require("dotenv").config();
const axios = require("axios");
const express = require("express");
const path = require("path");

const app = express();

app.use(express.static("static"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/static/index.html"));
});

app.get("/auth", (req, res) => {
  res.setHeader("User-Agent", process.env.USER_AGENT);
  res.redirect(
    `https://launchpad.37signals.com/authorization/new?type=web_server&client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.CALLBACK_URL}`
  );
});

app.get("/oauth-callback", ({ query: { code } }, res) => {
  const config = {
    headers: { "User-Agent": process.env.USER_AGENT },
    params: {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      type: "web_server",
      code: code,
      redirect_uri: process.env.CALLBACK_URL,
    },
  };
  const opts = { headers: { accept: "application/json" } };
  axios
    .post("https://launchpad.37signals.com/authorization/token", {}, config)
    .then((_res) => _res.data.access_token)
    .then((token) => {
      // eslint-disable-next-line no-console
      console.log("Access token:", token);

      res.redirect(`/?token=${token}`);
    })
    .catch((err) => res.status(500).json({ err: err.message }));
});

app.listen(3000);
// eslint-disable-next-line no-console
console.log("App listening on port 3000");
