const db = require("../../models");
const countryObj = require('../../class/Master/country.js');
const leaugeObj = require('../../class/Master/leauge.js');
const mtnCountry = db.mtnCountry;
const Op = db.Sequelize.Op;

// Retrieve all menu from the database.
exports.findAllMtnCountry = (req, res) => {
    const countryName = req.query.countryName;
    var condition = countryName ? { countryName: { [Op.like]: `%${countryName}%` } } : null;

    mtnCountry.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving mtnCountry."
            });
        });
};

exports.CreateMtnLeauge = (req, res) => {
    if (isEmptyObj(req.body)) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    else {
        var leauge = req.body.leaugeObj;
        let objLeauge = new leaugeObj().MtnLeauge;
        if (leauge) {
            var date = new Date();
            objLeauge.LeaugeName = leauge.LeaugeName;
            objLeauge.Country = leauge.Country;
            objLeauge.CountryID = leauge.CountryID;
            objLeauge.LogoName = leauge.LogoName;
            objLeauge.LogoType = leauge.LogoType;
            objLeauge.CreatedBy = 'Admin';
            objLeauge.CreatedDate = date
            objLeauge.UpdatedBy = 'Admin';
            objLeauge.UpdatedDate = date
            writeFile(objLeauge.LogoName, '../../asset/images/', leauge.LogoBase64);
        }
        console.log(objLeauge);
        // mtnCountry.create(objLeauge)
        //     .then(data => {
        //         res.send(data);
        //     })
        //     .catch(err => {
        //         res.status(500).send({
        //             message:
        //                 err.message || "Error occurred while creating the MtnLeauge."
        //         });
        //     });
    }
};

function isEmptyObj(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false;
    }
    return JSON.stringify(obj) === JSON.stringify({});
}

function writeFile(fileName, path, base64Data) {
    // Regular expression for image type:
    // This regular image extracts the "jpeg" from "image/jpeg"
    var imageTypeRegularExpression = /\/(.*?)$/;

    var imageBuffer = decodeBase64Image(base64Data);
    // var imageTypeDetected = imageBuffer
    //     .type
    //     .match(imageTypeRegularExpression);

    var userUploadedImagePath = path + fileName;

    // Save decoded binary image to disk
    try {
        require('fs').writeFile(userUploadedImagePath, imageBuffer.data,
            function () {
                console.log('DEBUG - feed:message: Saved to disk image attached by user:', userUploadedImagePath);
            });
    }
    catch (error) {
        console.log('ERROR:', error);
    }
}

function decodeBase64Image(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    var response = {};

    if (matches.length !== 3) {
        return new Error('Invalid input string');
    }

    response.type = matches[1];
    response.data = Buffer.from(matches[2], 'base64');

    return response;
}
