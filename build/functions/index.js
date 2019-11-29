const functions = require('firebase-functions');
const cors = require('cors')({
    origin: true,
});
const paint = require('./paint.js');
const construct = require('./construct.js');

exports.paint = functions.https.onRequest((req, res) => {
    return cors(req, res, () => {
        const image = construct({
            height: req.query.height,
            width: req.query.width,
        });
        paint(image, req.query);
        res.send(image);
    });
});