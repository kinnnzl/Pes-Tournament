module.exports = (sequelize, Sequelize) => {
    const mtnCountry = sequelize.define("MtnCountry", {
      CountryID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      CountryName: {
        type: Sequelize.STRING
      },
      CountryImgUrl: {
        type: Sequelize.STRING
      },
      CreatedBy: {
        type: Sequelize.STRING
      },
      CreatedDate: {
        type: Sequelize.DATE
      },
      UpdatedBy: {
        type: Sequelize.STRING
      },
      UpdatedDate: {
        type: Sequelize.STRING
      }
    }, {
      hooks: {
        beforeCount(options) {
          options.raw = true;
        }
      },
      tableName: 'MtnCountry',
      name: {
        singular: 'MtnCountry',
        plural: 'MtnCountry'
      },
      timestamps: false
    });
  
    return mtnCountry;
  }