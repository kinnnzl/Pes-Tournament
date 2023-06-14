module.exports = (sequelize, Sequelize) => {
    const mtnLeague = sequelize.define("MtnLeague", {
      LeagueID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      LeagueName: {
        type: Sequelize.STRING
      },
      CountryID: {
        type: Sequelize.INTEGER
      },
      Country: {
        type: Sequelize.STRING
      },
      LogoName: {
        type: Sequelize.STRING
      },
      LogoType: {
        type: Sequelize.STRING
      },
      LogoPath: {
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
        type: Sequelize.DATE
      }
    }, {
      hooks: {
        beforeCount(options) {
          options.raw = true;
        }
      },
      tableName: 'MtnLeague',
      name: {
        singular: 'MtnLeague',
        plural: 'MtnLeague'
      },
      timestamps: false
    });
  
    return mtnLeague;
  }