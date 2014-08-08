var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  database : 'filazero',
  user     : 'root',
  password : 'abc123'
});

connection.connect();

var HOST = '0.0.0.0';
var PORT = 9999;

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var app = express();

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({secret: 'secret'}));

//Root
app.get('/', function(req, res){
  res.sendfile('index.html');
});

app.post('/login/adm', loginAdm);
app.get('/logout/adm',logoutAdm);

//routers clientes
app.get('/paciente', getUsers);
app.get('/paciente/:id', getUser);
app.post('/paciente', addUser);
app.delete('/paciente/:id',deleteUser);
app.delete('/paciente/',deleteUsers);
app.put('/paciente/cpf',updateUser);
app.put('/paciente',updateUsers);


//routers manager doctors
app.get('/manager',authenticateAdm,manager);
app.get('/manager/medico/:crm', authenticateAdm, getDoctor);
app.get('/manager/medico', authenticateAdm, getDoctorsEstab);
app.put('/manager/medico/:crm', authenticateAdm, updateDoctor);
app.put('/manager/medico', authenticateAdm, updateDoctors);
app.post('/manager/medico',authenticateAdm, addDoctor);
app.post('/manager/medico/relation', authenticateAdm, addRelationDoctorEstab);
app.delete('/manager/medico/:crm', authenticateAdm, deleteRelationDoctorEstab);

//routes manager paciente 
app.get('/manager/paciente',authenticateAdm, getPatients);
app.get('/manager/paciente/:cpf', authenticateAdm,getPatient);
app.put('/manager/paciente/:id', authenticateAdm, updatePatient);
app.post('/manager/paciente', authenticateAdm, addPatient);
app.delete('/manager/paciente/:cpf', authenticateAdm, deleteRelationPatientEstab);


//routers adm estabelishments
app.get('/adm/estabelecimento', getEstabs);
app.get('/adm/estabelecimento/:id',getEstab);


// ------------------------------------------------- Login/Logout --------------------------------------------------------
function loginAdm(req, res) {
	var query = connection.query('SELECT * FROM tb_administrador WHERE Login = ? AND Senha = ? ', 
			        [req.body.login, req.body.senha], function(err, rows){
			    	  if(!err){
			    		  if(rows!=null){
			    			  var adm = rows[0];
			    		 	  req.session.idEstab = adm.FK_Estabelecimento;
			    			  res.send(200, req.session.idEstab);
			    			  console.log('login sucess');
              }
			    		else{
			    			res.send(403,'Administrador nao cadastrado');
			    		}			    		
			    	}
			    });
}

function logoutAdm(req, res){
  if(typeof req.session.idEstab!='undefined'){
    req.session.destroy();
    res.send(200,'logout sucess');
    console.log('logout sucess');
  }
}

function authenticateAdm(req, res, next){
  if(req.session.idEstab) next();
  else res.send(403,'Access denied');  
}

function manager(req,res){
  res.redirect('/#manager');
}

// ------------------------------------------------- Function Users --------------------------------------------------------
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
  if(typeof req.session.idEstab=='undefined'){
    res.send(403,"Access denied");
    return;
  }
  
  var query = connection.query('INSERT INTO tb_cliente (CPF, Nome, Login, Senha, Sexo, Email, Telefone) Values(?,?,?,?,?)',
  [req.body.CPF, req.body.Nome, req.body.Sexo , req.body.Email , req.body.Telefone],function(err){
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

// ------------------------------------------------- Functions Doctors --------------------------------------------------------
function getDoctors(req, res){
  var query = connection.query('SELECT * FROM tb_medico', function(err, rows){
    if (!err) res.jsonp(rows);
    else{
      res.send(403,'Ocorreu algum erro');
      console.log(err);
    }
  });
}

function getDoctor(req, res){
  var query = connection.query('SELECT * FROM tb_medico WHERE CRM = ?', req.params.crm, function(err, rows){
    if (!err) res.jsonp(rows[0]);
    else{
      res.send(403,'Ocorreu algum erro');
      console.log(err);
    }
  });
}

function getDoctorsEstab(req, res){
  var query = connection.query('SELECT med.CRM, med.Nome, med.Descricao, med.Especialidade ' +
                               'FROM tb_medico med,tb_estabelecimento est, tb_medico_trabalha_estabelecimento mestb ' +
                               'WHERE est.CNES= ? AND mestb.FK_Estabelecimento_Med = est.CNES AND med.CRM = mestb.FK_Medico_Estab ', 
                                req.session.idEstab, function(err, rows){
                        
        	      if (!err) res.jsonp(rows);
        	      else{
        	        res.send(403,'Ocorreu algum erro');
        	        console.log(err);
        	      }
	            });
}

function addDoctor(req, res){
  var query = connection.query('INSERT INTO tb_medico (CRM, Nome,Especialidade, Descricao) VALUES(?,?,?,?)',
                                [req.body.CRM,req.body.Nome, req.body.Descricao,req.body.Especialidade],function (err){
              if(!err){
                var query2 = connection.query('INSERT INTO tb_medico_trabalha_estabelecimento(FK_Medico_Estab,FK_Estabelecimento_Med) VALUES(?,?)',
                                              [req.body.CRM, req.session.idEstab], function(erro){
                                                  if(!erro) res.send(200,"Medico adicionado");
                                                  else {
                                                    res.send(403,"Ocorreu algum erro, Verifique o log");
                                                    console.log(erro);
                                                  }
                                              });                            
              }
              else{
                res.send(403,'Ocorreu algum erro ao adicionar o medico');
                console.log(err);
              }
  });
}

function addRelationDoctorEstab(req,res){
    var query = connection.query('INSERT INTO tb_medico_trabalha_estabelecimento(FK_Medico_Estab,FK_Estabelecimento_Med) VALUES(?,?)',
                                  [req.body.CRM, req.session.idEstab], function(err){
                                    if(!err) res.send(200,'Relacao adicionada');               
                                    else res.send(403,'Ocorreu algum erro');
                                  });
}

function deleteRelationDoctorEstab(req,res){
  var query = connection.query('DELETE FROM tb_medico_trabalha_estabelecimento WHERE FK_Medico_Estab = ? AND FK_Estabelecimento_Med = ?',
                                [req.params.crm, req.session.idEstab], function(err){
                                  if(!err) res.send(200,'Medico deletado');
                                  else{ 
                                    res.send(403,'Ocorreu algum erro, verifiqueo log');
                                    console.log(err);
                                  }
                              });
}

function updateDoctors(req, res){
  var doctorTemp = req.body;
  var queryTemp = 'UPDATE tb_medico SET '
  var count = 0
  for(var key in doctorTemp) queryTemp+= key +' = \"' + doctorTemp[key] + '\" ,';       
  
  var temp = new String(queryTemp); 
  queryTemp = temp.substring(0,(temp.length-1)); //retira a ultima virgula

  var query = connection.query(queryTemp,function(err){
    if(!err){
      res.send(200,'Medicos atualizados');
      console.log('Medicoss atualizados');
    }
    else {
      res.send(403,'Erro ao atualizar medicos');
      console.log('Erro ao atualizar medicos');
      console.log(err);
    } 
  }); 
}

function updateDoctor(req, res){
  var doctorTemp = req.body;
  var queryTemp = 'UPDATE tb_medico SET '
  var count = 0
  for(var key in doctorTemp){
    if(count>0) queryTemp+= key +' = \"' + doctorTemp[key] + '\" ,';       
    count++;
  } 
  var temp = new String(queryTemp); 
  queryTemp = temp.substring(0,(temp.length-1)); //retira a ultima virgula
  queryTemp+= ' WHERE CRM = ?';
  var crm = doctorTemp.CRM;
  
  var query = connection.query(queryTemp, crm, function(err){
    if(!err){
      res.send(200,'Medico atualizado');
      console.log('Medico atualizado');
    }else {
      res.send(403,'Erro ao atualizar medico');
      console.log('Erro ao atualizar medico');
      console.log(err);
    }  
  });
}

// ------------------------------------------------- Functions Pacientes Estab --------------------------------------------------------
function getPatients(req, res){
  var query = connection.query('SELECT cli.CPF, cli.Nome, cli.Sexo, cli.Email, cli.Telefone '+
                               'FROM tb_cliente cli, tb_estabelecimento est, tb_client_cad_estab cad '+
                               'WHERE est.CNES = ? AND cad.FK_Cliente=cli.CPF AND cad.FK_Estabelecimento=est.CNES',
                                req.session.idEstab, function(err, rows) {
    if (!err) res.jsonp(rows);
    else{
      res.send('Ocorreu algum erro')
      console.log(err);
    }
  });
}

function getPatient(req, res){
  var query = connection.query('SELECT cli.CPF, cli.Nome, cli.Sexo, cli.Email, cli.Telefone '+
                               'FROM tb_cliente cli, tb_estabelecimento est, tb_client_cad_estab cad '+
                               'WHERE cli.CPF =? AND est.CNES = ? AND cad.FK_Cliente=cli.CPF AND cad.FK_Estabelecimento = est.CNES',
                                [req.params.cpf, req.session.idEstab], function(err, rows) {
    if (!err) res.jsonp(rows[0]);
    else{
      res.send('Ocorreu algum erro')
      console.log(err);
    }
  });
}

function addPatient(req, res){
  var check = connection.query('SELECT * FROM tb_cliente WHERE CPF = ?', req.body.CPF, function(err, rows){
    var patient = rows[0];

    if(patient==null){
      var query = connection.query('INSERT INTO tb_cliente(CPF,Nome,Sexo,Email,Telefone) VALUES(?,?,?,?,?)',
                [req.body.CPF, req.body.Nome, req.body.Sexo, req.body.Email, req.body.Telefone], function(err){
                  if(!err){
                    addRelationPatientEstab(req,res);
                  }
                  else{
                    res.send(403,'Erro ao adicionar, verifique o log');
                    console.log(err);
                  }
               });
    }
    else addRelationPatientEstab(req,res);
  }); 
}

function addRelationPatientEstab(req,res){
  var query=connection.query('INSERT INTO tb_client_cad_estab(FK_Cliente,FK_Estabelecimento) VALUES(?,?)',
                  [req.body.CPF, req.session.idEstab], function(erro){
                    if(!erro) res.send(200,'Cliente adicionado');
                    else {
                      res.send(403,'Erro ao adicionar, Verifique o log');
                      console.log(erro);
                    }
            });
}

function deleteRelationPatientEstab(req, res){
  var query = connection.query('DELETE FROM tb_client_cad_estab WHERE FK_Cliente=? AND FK_Estabelecimento=?',
              [req.params.cpf, req.session.idEstab], function(err){
                if(!err) res.send(200,'Cliente removido');
                else{
                  res.send(403,'Ocorreu algum erro, Verifique o log');
                  console.log(err);
                }
              });
}

function updatePatient (req,res) {
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


// ------------------------------------------------- Functions Estabs --------------------------------------------------------

function getEstabs(req, res){
  var query = connection.query('SELECT est.CNES, est.Nome, est.Descricao, tel.Telefone, est.Numero, end.Estado, end.Cidade, end.Bairro, end.Rua '+
                               'FROM tb_estabelecimento AS est, tb_estabelecimento_endereco AS estend, ' +
                                     'tb_endereco AS end, tb_telefone_estabelecimento AS tel ' +
                                'WHERE est.CNES = estend.FK_Estabelecimento_End AND ' + 
                                      'end.PK_Endereco = estend.FK_Endereco_Estab AND tel.FK_Estabelecimento = est.CNES ', 
                                function(err, rows, fields) {
    if (!err) res.jsonp(rows);
    else{
      res.send(403,'Ocorreu algum erro')
      console.log(err);
    }
  });
}  

function getEstab(req, res){
  var query = connection.query('SELECT est.CNES, est.Nome, est.Descricao, tel.Telefone, est.Numero, end.Estado, end.Cidade, end.Bairro, end.Rua '+
                               'FROM tb_estabelecimento AS est, tb_estabelecimento_endereco AS estend, ' +
                                    'tb_endereco AS end, tb_telefone_estabelecimento AS tel ' +
                               'WHERE est.CNES = ? AND est.CNES = estend.FK_Estabelecimento_End AND ' + 
                                    'end.PK_Endereco = estend.FK_Endereco_Estab AND tel.FK_Estabelecimento = est.CNES ',req.params.id,
                               function(err, rows, fields) {
    if (!err) res.jsonp(rows[0]);
    else{
      res.send(403,'Ocorreu algum erro')
      console.log(err);
    }
  });
}



var server = app.listen(PORT,HOST, function() {
    console.log('Servidor rodando em: '+HOST + ':' + PORT);
});