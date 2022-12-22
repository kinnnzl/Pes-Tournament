module.exports = app => {
    const master = require("../../controllers/Master/master.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve all mtnMenu
    router.get("/getCountrys", master.findAllMtnCountry);

    router.post("/createLeauge", master.CreateMtnLeauge);
  
    app.use('/api/master', router);
  };