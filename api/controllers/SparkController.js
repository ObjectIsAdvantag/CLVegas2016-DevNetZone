/**
 * SparkController
 *
 * @description :: Server-side logic for on-boarding new users into the DevnetZone Team Room
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var Sparky = require("node-sparky");

// Create a Spark client to send messages back to the Room
var sparky = new Sparky({ token: process.env.SPARK_TOKEN });

module.exports = {

    registerUser: function (req, res) {
        var email = req.param('email');
        if (!email) {
            return res.json(400, { err: "no email specified" });
        }

        var roomId = req.param('roomId');
        if (!roomId) {
            roomId = process.env.SPARK_ROOM;
            if (!roomId) return res.json(400, { err: "no default room, please specify a roomId" });
        }

        sparky.membership.add(roomId, email, function (err, results) {
            if (err) {
                if (err.toString()  === "Error: response code: 409") {
                    return res.json(204, { success: "membership already in room " + email });
                }
                if (err.toString() === "Error: response code: 400") {
                    return res.json(400, { failed: "could not add membership for user: ", err: "invalid email", email:email });
                }

                return res.json(500, { failed: "could not add membership for user: " + email, err: err.toString() });
            }

            res.json(200, { success: "membership added for user " + email });
        });

    },
};
