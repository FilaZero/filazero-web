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
  var query = connection.query('INSERT INTO tb_cliente (CPF, Nome, Login, Senha, Sexo, Email, Telefone) Values(?,?,?,?,?,?,?)',
  [req.body.CPF, req.body.Nome, req.body.Login , req.body.Senha , req.body.Sexo , req.body.Email , req.body.Telefone],function(err){
      if(err==null) {
        res.send(200,'Cliente Adicionado'); 
        console.log('Cliente Adicionado');
      } 
      else{
        res.send(403,'Verifique os dados'); 
      }

      if (err) throw err;          
  });      
});

app.delete('/cliente/?:id',function(req,res){
  var query = connection.query('DELETE FROM tb_cliente WHERE CPF = ?', [req.params.id], function(err){
      if (err) throw err;
      if(err==null){
        res.send(200,'Cliente Removido');
        console.log('Cliente Removido');
      } 
  });
});



var server = app.listen(9999, function() {
    console.log('Listening on port %d', server.address().port);
});
