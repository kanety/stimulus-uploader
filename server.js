process.env['DEBUG'] = 'express:*';

const express = require("express");
const serveIndex = require('serve-index');
const multiparty = require('multiparty');

let app = express();
app.use('/examples', express.static('examples'));
app.use('/dist', express.static('dist'));
app.use('/node_modules', express.static('node_modules'));
app.post("/post", (req, res, next) => {
    console.log(req.headers);
    let form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {
      console.log(fields);
      console.log(files);
    });
    res.json({ status: 'ok' });
});
app.post("/422", (req, res, next) => {
    console.log(req);
    res.status(422).send('Unprocessable Entity');
});
app.use('/', serveIndex('./'));
app.listen(8080);
