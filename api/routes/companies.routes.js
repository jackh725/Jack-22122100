module.exports = app => {
    const companies = require("../controllers/company.controller.js");
  
    var router = require("express").Router();
  
    router.post("/companies/", companies.create);
    
    // Get all companies for a specific contact
    router.get("/contacts/:contactId/companies", companies.findAll);
  
    //router.get("/companies/", companies.findAll);
  
    router.get("/companies/:companyId", companies.findOne);
  
    router.put("/companies/:companyId", companies.update);
  
    router.delete("/companies/:companyId", companies.delete);
  
    app.use('/api', router);
};