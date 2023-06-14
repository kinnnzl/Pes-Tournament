const db = require("../../models");
const countryObj = require('../../class/Master/country.js');
const leagueObj = require('../../class/Master/league.js');
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const mtnCountry = db.mtnCountry;
const mtnLeague = db.mtnLeague;
const Op = db.Sequelize.Op;
var $ = jQuery = require('jquery')(window);

const getCountrys = async function (condition) {
    return await mtnCountry.findAll({ where: condition });
};

exports.findAllMtnCountry = (req, res) => {
    const countryName = req.query.countryName;
    var condition = countryName ? { countryName: { [Op.like]: `%${countryName}%` } } : null;

    (async () => {
        try {
            const data = await getCountrys(condition);
            res.send(data);

        }
        catch (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving mtnCountry."
            });
        }
    })()
};

const getLeagues = async function (condition) {
    return await mtnLeague.findAll({ where: condition });
};

exports.findAllMtnLeague = (req, res) => {
    (async () => {
        try {
            var leagueID = req.query.LeagueID != 'null' ? req.query.LeagueID : null;
            var condition = leagueID ? { LeagueID: { [Op.like]: `%${leagueID}%` } } : null;
            const data = await getLeagues(condition);
            if (data.length != 0) {
                const countrys = await getCountrys(null);
                let index = 1
                data.forEach(element => {
                    var typeFile = 'data:' + element.dataValues.LogoType + ';base64,';
                    element.dataValues.No = index++;
                    element.dataValues.Teams = 0;
                    element.dataValues.CountryImgUrl = countrys.find(x => x.CountryID == element.dataValues.CountryID)?.CountryImgUrl;
                    element.dataValues.LogoBase64 = typeFile + convertFileToBase64(element.LogoPath);
                });;
            }
            res.send(data)

        }
        catch (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving mtnLeague."
            });
        }
    })()
};

exports.createMtnLeague = (req, res) => {
    if (isEmptyObj(req.body)) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    else {
        var league = req.body.leagueObj;
        let objLeague = new leagueObj().MtnLeague;
        if (league) {
            var date = new Date();
            var pathImg = 'app/asset/images/';
            objLeague = $.extend(objLeague, league);
            objLeague.LogoPath = pathImg + objLeague.LogoName;
            objLeague.CreatedBy = 'Admin';
            objLeague.CreatedDate = date
            objLeague.UpdatedBy = 'Admin';
            objLeague.UpdatedDate = date
            mtnLeague.create(objLeague)
                .then(data => {
                    writeFile(objLeague.LogoName, pathImg, league.LogoBase64);
                    res.send(data);
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Error occurred while creating the MtnLeague."
                    });
                });
        }
        else {
            res.status(500).send({
                message:
                    "Error request param is empty on create league."
            });
        }
    }
};

exports.deleteLeague = (req, res) => {
    if (isEmptyObj(req.body)) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    else {
        var leagueID = req.query.LeagueID != 'null' ? req.query.LeagueID : null;
        if (leagueID) {
            mtnLeague.destroy({ where: { LeagueID: leagueID } })
                .then(data => {
                    res.send(data);
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Error occurred while deleting the MtnLeague."
                    });
                });
        }
    }
};

exports.updateMtnLeague = (req, res) => {
    if (isEmptyObj(req.body)) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    else {
        var league = req.body.leagueObj;
        let objLeague = new leagueObj().MtnLeague;
        if (league) {
            var date = new Date();
            var pathImg = 'app/asset/images/';
            objLeague = $.extend(objLeague, league);
            objLeague.LogoPath = pathImg + objLeague.LogoName;
            objLeague.UpdatedBy = 'Admin';
            objLeague.UpdatedDate = date
            mtnLeague.findAll({ where: { LeagueID: objLeague.LeagueID } }).then(data => {
                if (data) {
                    mtnLeague.update(
                        {
                            LeagueName: objLeague.LeagueName,
                            CountryID: objLeague.CountryID,
                            Country: objLeague.Country,
                            LogoName: objLeague.LogoName,
                            LogoType: objLeague.LogoType,
                            LogoPath: objLeague.LogoPath,
                            UpdatedBy: 'Admin',
                            UpdatedDate: date,
                        },
                        { where: { LeagueID: objLeague.LeagueID } })
                        .then(data => {
                            removeFile(objLeague.LogoName, pathImg);
                            writeFile(objLeague.LogoName, pathImg, league.LogoBase64);
                            res.send(data);
                        })
                        .catch(err => {
                            res.status(500).send({
                                message:
                                    err.message || "Error occurred while updating the MtnLeague."
                            });
                        });
                }
            })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Error occurred while updating the MtnLeague."
                    });
                });
        }
    }
};

function isEmptyObj(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false;
    }
    return JSON.stringify(obj) === JSON.stringify({});
}

function convertFileToBase64(path) {
    const fs = require('fs');
    return fs.readFileSync(path, { encoding: 'base64' });
}

function removeFile(fileName, path) {
    require('fs').unlink(path + fileName, function (err) {
        if (err && err.code == 'ENOENT') {
            // file doens't exist
            console.info("File doesn't exist, won't remove it.");
        } else if (err) {
            // other errors, e.g. maybe we don't have enough permission
            console.error("Error occurred while trying to remove file");
        } else {
            console.info(`removed`);
        }
    });
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
