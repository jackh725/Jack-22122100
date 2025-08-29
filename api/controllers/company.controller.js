const db = require("../models");
const Company = db.companies;

// Create new company
exports.create = (req, res) => {
    if (!req.body.company_name || !req.body.contact_id) {
      res.status(400).send({ message: "company_name and contact_id are required!" });
      return;
    }
    const company = {
        company_name: req.body.company_name,
        company_address: req.body.company_address,
        contact_id: req.body.contact_id,
    };
    Company.create(company)
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({ message: err.message || "Error creating Company" });
    });
};

// Get all companies
// exports.findAll = (req, res) => {
//     Company.findAll()
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: err.message || "Some error occurred while retrieving companies."
//             });
//         });
// };


// Get all companies with optional contact_id filter
// This allows fetching companies for a specific contact
exports.findAll = (req, res) => {
    const contactId = req.params.contactId;
  
    Company.findAll({ where: { contact_id: contactId } })
      .then(data => res.send(data))
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving companies."
        });
      });
  };
  
  

// Get one company by id
exports.findOne = (req, res) => {
    const id = req.params.companyId;

    Company.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Company with id=" + id
            });
        }
    );
};

// Update one company by id
// exports.update = (req, res) => {
//     const id = req.params.companyId;

//     Company.update(req.body, {
//         where: { company_id: id }
//     })
//     .then(num => {
//         if (num == 1) {
//             res.send({
//                 message: "Company was updated successfully."
//             });
//         } else {
//             res.send({
//                 message: `Cannot update Company with id=${id}. Maybe not found or body is empty.`
//             });
//         }
//     })
//     .catch(err => {
//         res.status(500).send({
//             message: "Error updating Company with id=" + id
//         });
//     });
// };

// Update one company by id
exports.update = (req, res) => {
    const id = req.params.companyId;
  
    Company.update(req.body, {
      where: { company_id: id }
    })
    .then(num => {
      if (num == 1) {
        return Company.findByPk(id);   
      } else {
        throw new Error(`Cannot update Company with id=${id}`);
      }
    })
    .then(updated => res.send(updated))
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error updating Company with id=" + id
      });
    });
};
  


// Delete one contact by id
exports.delete = (req, res) => {
    const id = req.params.companyId;

    Company.destroy({
        where: { company_id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Company was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Company`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Company with id=" + id
        });
    });
};
