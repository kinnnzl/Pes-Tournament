module.exports = app => {
  const master = require("../../controllers/Master/master.controller.js");

  var router = require("express").Router();

  router.get("/getCountrys", master.findAllMtnCountry);

  router.post("/createLeague", master.createMtnLeague);

  router.post("/updateLeague", master.updateMtnLeague);

  router.get("/getLeagues", master.findAllMtnLeague);

  app.use('/api/master', router);
};