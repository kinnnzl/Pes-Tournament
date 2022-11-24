module.exports = (sequelize, Sequelize) => {
  const mtnMenu = sequelize.define("MtnMenu", {
    Id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Seq: {
      type: Sequelize.INTEGER
    },
    MenuName: {
      type: Sequelize.STRING
    },
    RouterLink: {
      type: Sequelize.STRING
    },
    Icon: {
      type: Sequelize.STRING
    },
    IsMenuItem: {
      type: Sequelize.BOOLEAN
    },
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    },
    tableName: 'MtnMenu',
    name: {
      singular: 'MtnMenu',
      plural: 'MtnMenu'
    },
    timestamps: false
  });

  return mtnMenu;
}