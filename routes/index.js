const Router = require("express").Router();
const needle = require("needle");
const url = require("url");
const apiCache = require("apicache");

const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;

//init cache
const cache = apiCache.middleware;

Router.get("/", cache("2 minutes"), async (req, res) => {
  try {
    const params = new URLSearchParams({
      [API_KEY_NAME]: API_KEY_VALUE,
      ...url.parse(req.url, true).query,
    });

    const apiRes = await needle("get", `${API_BASE_URL}?${params}`);
    const data = apiRes.body;
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = Router;
