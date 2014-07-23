var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  database : 'filazero',
  user     : 'root',
  password : 'abc123'
});

connection.connect();

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static(__dirname));
app.use(bodyParser.json())


app.get('/', function(req, res){
  res.sendfile('index.html');
});

app.get('/cliente', function(req, res){
  var query = connection.query('SELECT * FROM tb_cliente', function(err, rows, fields) {
 	if (err) throw err;
  	res.jsonp(rows);
  });
});

app.get('/cliente/:id', function(req, res){
  var query = connection.query('SELECT * FROM tb_cliente WHERE cpf = ?',[req.params.id], function(err, rows, fields) {
 	if (err) throw err;
  	res.jsonp(rows[0]);
  });
});

app.post('/cliente',function(req, res){    
    console.log(req.body)   
});

var server = app.listen(9999, function() {
    console.log('Listening on port %d', server.address().port);
});
