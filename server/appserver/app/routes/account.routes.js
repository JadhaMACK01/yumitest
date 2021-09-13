module.exports = app => {
    const accounts = require("../controllers/account.controller.js");
  
    var router = require("express").Router();
  
    // Create a new account
    router.post("/", accounts.create);
    router.get("/", accounts.findAll);
    // Retrieve a single Account with email
    router.get("/:email", accounts.findemail);
    
  
    // Retrieve a single Account with id
    //router.get("/:", accounts.findid);
  
    
    // Update a Account with email
    router.put("/:email", accounts.update);
  
    // Delete a Account with email
    router.delete("/:email", accounts.delete);
  
    // delete all Accounts
    router.delete("/", accounts.deleteAll);
  
    app.use('/skillsme/accounts', router);
  };
  