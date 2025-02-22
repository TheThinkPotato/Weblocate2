const express = require("express");
const path = require("path");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve the React Vite build
app.use(express.static(path.join(__dirname, "../weblocate2/dist")));

// API Endpoints
app.get("/api/abuse", (req, res) => {
  const ip= req.query.ip;
  const apiKey = process.env.ABUSE_API_KEY;
  console.log(`Abuse call with ip: ${ip}`);
  axios.get(`https://api.abuseipdb.com/api/v2/check?ipAddress=${ip}`, {
    headers: {
      'Key': apiKey
    }
  })
    .then(response => {
      return res.json(response.data);
    })
    .catch(error => {
      res.status(500).json({ error: `Error fetching data from AbuseIPDB` });
    });
});

app.get("/api/geo", (req, res) => {
  const ip= req.query.ip;
  const apiKey = process.env.IPGEOLOCATION_API_KEY;
  console.log(`Geo call with ip: ${ip}`);
  axios.get(`https://api.ipgeolocation.io/ipgeo?ip=${ip}&apiKey=${apiKey}`, {
  })
    .then(response => {
      return res.json(response.data);
    })
    .catch(error => {
      res.status(500).json({ error: `Error fetching data from IP Geo Location.` });
    });
});

app.get("/api/googleResolve", (req, res) => {
  const domain= req.query.name;
  console.log(`Goggle Resolve call with domain: ${domain}`);
  axios.get(`https://dns.google/resolve?name=${domain}`, {
  })
    .then(response => {
      return res.json(response.data);
    })
    .catch(error => {
      res.status(500).json({ error: `Error fetching data from Google Resolve.`});
    });
});


app.get("*", (req, res) => {
  return res.status(404).json({ error: "Not found" });
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
