module.exports = (sequelize, Sequelize) => {
    const mtnMenuItem = sequelize.define("MtnMenuItem", {
      Id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      MenuId: {
        type: Sequelize.INTEGER
      },
      Seq: {
        type: Sequelize.INTEGER
      },
      SubMenuName: {
        type: Sequelize.STRING
      },
      RouterLink: {
        type: Sequelize.STRING
      },
      Icon: {
        type: Sequelize.STRING
      },
      Module: {
        type: Sequelize.STRING
      },
    }, {
      hooks: {
        beforeCount(options) {
          options.raw = true;
        }
      },
      tableName: 'MtnMenuItem',
      name: {
        singular: 'MtnMenuItem',
        plural: 'MtnMenuItem'
      },
      timestamps: false
    });
  
    return mtnMenuItem;
  }