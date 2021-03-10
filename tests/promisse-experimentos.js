const getJson = require("../src/networking");

getJson("https://reqbin.com/echo/get/json3")
  .then(console.log)
  .catch((e) => console.log("ua....."));
