const express = require("express");
const EasyXml = require("easyxml");
const app = express();
const serialize = new EasyXml();
const customers = [
  { id: 1, Name: "Sunil" },
  { id: 2, Name: "Arun" },
  { id: 3, Name: "Vijay" }
];

app.use(function(req, res, next) {
  res.sendData = function(obj) {
    if (req.accepts("json") || req.accepts("text/html")) {
      res.header("Content-Type", "application/json");
      res.send(obj);
    } else if (req.accepts("application/xml")) {
      res.header("Content-Type", "text/xml");
      var xml = serialize.render(obj);
      res.send(xml);
    } else {
      res.send(406);
    }
  };

  next();
});

app.get("/", (req, res, next) => {
  res.send("<h1>Hello world</h1>");
});

app.get("/customers", (req, res) => {
  res.sendData(customers);
});

app.listen(5000, () => {
  console.log(`Listening to the port ${5000}`);
});
