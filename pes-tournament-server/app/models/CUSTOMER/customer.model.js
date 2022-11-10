module.exports = (sequelize, Sequelize) => {
  const Customer = sequelize.define("CUSTOMER", {
    Id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    FirstName: {
      type: Sequelize.STRING
    },
    LastName: {
      type: Sequelize.STRING
    },
    City: {
      type: Sequelize.STRING
    },
    Country: {
      type: Sequelize.STRING
    },
    Phone: {
      type: Sequelize.STRING
    },
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    },
    tableName: 'CUSTOMER',
    name: {
      singular: 'CUSTOMER',
      plural: 'CUSTOMER'
    },
    timestamps: false
  });

  return Customer;
}