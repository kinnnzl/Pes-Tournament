module.exports = app => {
    const mtnMenu = require("../../controllers/Menu/menu.controller.js");
  
    var router = require("express").Router();
  
    // Create a new mtnMenu
    router.post("/createMtnMenu", mtnMenu.CreateMtnMenu);
  
    // Retrieve all mtnMenu
    router.get("/", mtnMenu.findAllMtnMenu);

    // Retrieve all mtnMenuItem
    router.get("/mtnMenuItem", mtnMenu.findAllMtnMenuItem);
  
    // // Retrieve all published Tutorials
    // router.get("/published", tutorials.findAllPublished);
  
    // // Retrieve a single Tutorial with id
    // router.get("/:id", tutorials.findOne);
  
    // // Update a Tutorial with id
    // router.put("/:id", tutorials.update);
  
    // // Delete a Tutorial with id
    // router.delete("/:id", tutorials.delete);
  
    // // Delete all Tutorials
    // router.delete("/", tutorials.deleteAll);
  
    app.use('/api/mtnMenu', router);
  };