'use strict';

var express = require('express');
var cors = require('cors');
const fs = require('fs');

// require and use "multer"...
var multer  = require('multer');
var upload = multer({ dest: './public/uploads' });

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), function(req, res){
  try {
    fs.unlinkSync(req.file.path);
    res.json({
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size
    });
  } 
  catch (error) {
    res.send(error.message);
  }
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});