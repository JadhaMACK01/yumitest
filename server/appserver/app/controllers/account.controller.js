const db = require("../models");
const Account = db.accounts;
const Op = db.Sequelize.Op;

// Create and Save an account
exports.create = (req, res) => {
    // Create a Account
    const account = {
     firstName: req.body.firstName,
     lastName: req.body.lastName,
     email: req.body.email,
     password: req.body.password,
      university: req.body.university 
    };
  
    // Save Account in the database
    Account.create(account)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Account."
        });
      });
  };
// Retrieve all accounts from the database.
exports.findAll = (req, res) => {
  const email = req.query.email;
  var condition = email ? { email: { [Op.like]: `%${email}%` } } : null;

  Account.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
// login page: 
exports.findemail = (req, res) => {
    const email = req.params.email;
    
    Account.findOne({ where: { email:email }})
   // check if the account exists in the database
      .then(data => {
        if(data!=null){
          res.send(data);
          res.send({
            message: '1'
          });
        }
        else res.send({
          message:"0"
        })
          
      })
      .catch(err => {
        res.status(500).send({
          message: 
            err.message ||  "Error retrieving Tutorial with email=" + email
        });
      });
  };

//* Find a single Account with an id
exports.findid = (req, res) => {
    const id = req.params.id;
  
    Account.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Account with id=" + id
        });
      });
  };
// Update a Account by the id in the request
exports.update = (req, res) => {
  const email = req.params.email;

  Account.update(req.body, {
    where: { email: email }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Account was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Account with email=${email}. Maybe Account was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Account with email=" + email
      });
    });
};

// Delete a Account with the specified email in the request
exports.delete = (req, res) => {
    const email = req.params.email;
  
    Account.destroy({
      where: { email: email }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Account was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Account with email=${email}. Maybe Account was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Account with email=" + email
        });
      });
  };

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Account.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Tutorials were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all tutorials."
        });
      });
  };

