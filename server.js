const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.use(express.json());

app.get("/proxy", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send("Missing ?url=");

  try {
    const response = await fetch(url);
    const body = await response.text();

    res.set("Access-Control-Allow-Origin", "*");
    res.send(body);
  } catch (err) {
    res.status(500).send("Failed to fetch: " + err.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Proxy server running on port", PORT);
});
