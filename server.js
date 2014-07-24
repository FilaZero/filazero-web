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
var HOST = '0.0.0.0';
var PORT = 9999;

app.use(express.static(__dirname));
app.use(bodyParser.json());


//Root
app.get('/', function(req, res){
  res.send('index.html');
});

//routers clientes
app.get('/cliente', getUsers);
app.get('/cliente/:id', getUser);
app.post('/cliente', addUser);
app.delete('/cliente/:id',deleteUser);
app.delete('/cliente/',deleteUsers);
app.put('/cliente/cpf',updateUser);
app.put('/cliente',updateUsers);

//functions clientes
function getUsers (req, res) {
  var query = connection.query('SELECT * FROM tb_cliente', function(err, rows, fields) {
    if (!err) res.jsonp(rows);
    else{
      res.send('Ocorreu algum erro')
      console.log(err);
    }
  });
}

function getUser (req,res) {
  var query = connection.query('SELECT * FROM tb_cliente WHERE cpf = ?',[req.params.id], function(err, rows, fields) {
    if (!err) res.jsonp(rows[0]);
    else{
      res.send('Ocorreu algum erro')
      console.log(err);
    }
  });
}

function addUser (req,res) {
  var query = connection.query('INSERT INTO tb_cliente (CPF, Nome, Login, Senha, Sexo, Email, Telefone) Values(?,?,?,?,?,?,?)',
  [req.body.CPF, req.body.Nome, req.body.Login , req.body.Senha , req.body.Sexo , req.body.Email , req.body.Telefone],function(err){
      if(!err) {
        res.send(200,'Cliente adicionado'); 
        console.log('Cliente adicionado');
      } 
      else{
        res.send(403,'Verifique os dados');
        console.log('Verifique os dados');
        console.log(err);
      }          
  });
}

function deleteUser (req,res) {
  var query = connection.query('DELETE FROM tb_cliente WHERE CPF = ?', [req.params.id], function(err){
      if(!err){
        res.send(200,'Cliente removido');
        console.log('Cliente removido');
      } 
      else{
        res.send(403,'Erro ao remover');
        console.log('Erro ao remover');
        console.log(err);
      }
  });
}

function deleteUsers(req,res){
  var query = connection.query('DELETE FROM tb_cliente', function(err){
      if(!err){
        res.send(200,'Clientes removidos');
        console.log('Clientes removidos');
      } 
      else{
        res.send(403,'Erro ao remover');
        console.log('Erro ao remover');
        console.log(err);
      }
  });
}

function updateUser (req,res) {
  var clienteTemp = req.body;
  var queryTemp = 'UPDATE tb_cliente SET '
  var count = 0
  for(var key in clienteTemp){
    if(count>0){
      queryTemp+= key +' = \"' + clienteTemp[key] + '\" ,';       
    }
    count++;
  } 

  var temp = new String(queryTemp); 
  queryTemp = temp.substring(0,(temp.length-1)); //retira a ultima virgula
  queryTemp+= ' WHERE CPF = ?';
  var cpf = clienteTemp.CPF;
  
  var query = connection.query(queryTemp, cpf, function(err){
    if(!err){
      res.send(200,'Cliente atualizado');
      console.log('Cliente atualizado');
    }
    else {
      res.send(403,'Erro ao atualizar');
      console.log('Erro ao atualizar');
      console.log(err);
    }  
  });
}

function updateUsers(req,res){
  var clienteTemp = req.body;
  var queryTemp = 'UPDATE tb_cliente SET '
  var count = 0
  for(var key in clienteTemp){
    queryTemp+= key +' = \"' + clienteTemp[key] + '\" ,';       
  } 
  var temp = new String(queryTemp); 
  queryTemp = temp.substring(0,(temp.length-1)); //retira a ultima virgula

  var query = connection.query(queryTemp,function(err){
    if(!err){
      res.send(200,'Clientes atualizados');
      console.log('Clientes atualizados');
    }
    else {
      res.send(403,'Erro ao atualizar');
      console.log('Erro ao atualizar');
      console.log(err);
    }  
  });
}


var server = app.listen(PORT,HOST, function() {
    console.log('Servidor rodando em'+HOST + ':' + PORT);
});
