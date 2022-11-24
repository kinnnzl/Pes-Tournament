const db = require("../../models");
const mtnMenuObj = require('../../class/Menu/menu.js');
const mtnMenu = db.mtnMenu;
const mtnMenuItem = db.mtnMenuItem;
const Op = db.Sequelize.Op;

// Retrieve all menu from the database.
exports.findAllMtnMenu = (req, res) => {
    const menuName = req.query.menuName;
    var condition = menuName ? { MenuName: { [Op.like]: `%${menuName}%` } } : null;

    mtnMenu.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving mtnMenu."
            });
        });
};

exports.findAllMtnMenuItem = (req, res) => {
    const subMenuName = req.query.subMenuName;
    var condition = subMenuName ? { SubMenuName: { [Op.like]: `%${subMenuName}%` } } : null;

    mtnMenuItem.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving mtnMenuItems."
            });
        });
};

exports.CreateMtnMenu = (req, res) => {
    if (isEmptyObj(req.body)) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    else {
        var menu = req.body;
        let objMenu = new mtnMenuObj().MtnMenu;
        if (menu) {
            objMenu.Seq = menu.Seq;
            objMenu.MenuName = menu.MenuName;
            objMenu.RouterLink = menu.RouterLink;
            objMenu.Icon = menu.Icon;
            objMenu.IsMenuItem = menu.IsMenuItem;
        }
        mtnMenu.create(objMenu)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Error occurred while creating the MtnMenu."
                });
            });
    }
};

function isEmptyObj(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false;
    }
    return JSON.stringify(obj) === JSON.stringify({});
}
