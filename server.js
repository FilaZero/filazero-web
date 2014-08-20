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
  res.sendFile('index.html');
});

app.post('/login/adm', loginAdm);
app.get('/logout/adm',logoutAdm);

//admin
app.get('/admin',authenticateAdmin,admin);

//routers clientes
app.get('/paciente', getUsers);
app.get('/paciente/:id', getUser);
app.post('/paciente', addUser);
app.delete('/paciente/:id',deleteUser);
app.delete('/paciente/',deleteUsers);
app.put('/paciente/cpf',updateUser);
app.put('/paciente',updateUsers);

//routers manager appointments
app.post('/consulta', authenticateManager, newAppointment);
app.get('/consulta', authenticateManager, getAppointments);
app.delete('/consulta/:id', authenticateManager, deleteAppointment);

//routers manager doctors
app.get('/manager',authenticateManager,manager);
app.get('/manager/medico/:id', authenticateManager, getDoctor);
app.get('/manager/medico', authenticateManager, getDoctorsEstab);
app.put('/manager/medico/:id', authenticateManager, updateDoctor);
app.put('/manager/medico', authenticateManager, updateDoctors);
app.post('/manager/medico',authenticateManager, addDoctor);
app.delete('/manager/medico/:id', authenticateManager, deleteRelationDoctorEstab);

//routes manager paciente 
app.get('/manager/paciente',authenticateManager, getPatients);
app.get('/manager/paciente/:id', authenticateManager,getPatient);
app.put('/manager/paciente/:id', authenticateManager, updatePatient);
app.post('/manager/paciente', authenticateManager, addPatient);
app.delete('/manager/paciente/:id', authenticateManager, deleteRelationPatientEstab);


//routers adm estabelishments
app.get('/adm/estabelecimento', getEstabs);
app.get('/adm/estabelecimento/:id',getEstab);
app.post('/adm/estabelecimento', addEstab);
app.delete('/adm/estabelecimento/:id', deleteEstab);


// ------------------------------------------------- Login/Logout --------------------------------------------------------
function loginAdm(req, res) {
	var query = connection.query('SELECT * FROM tb_administrador WHERE Login = ? AND Senha = ? ', 
			        [req.body.login, req.body.senha], function(err, rows){
			    	if(!err){
			    		if(rows[0] != null){
			    			var adm = rows[0];
			    		 	req.session.idEstab = adm.FK_Estabelecimento;
			    			console.log('login manager sucess');
                res.status(200).end();
              } else{
                var query = connection.query('SELECT * FROM tb_su WHERE Login = ? AND Senha = ? ', 
                  [req.body.login, req.body.senha], function(err, rows){
                if(!err){
                  if(rows[0] != null){
                    var adm = rows[0];
                    req.session.idAdmin = adm.PK_SU;
                    console.log(adm);
                    console.log('login admin sucess');
                    res.status(202).end();
                        }
                  else{
                    res.status(403).send(403);
                  }             
                }
              });
			    		}			    		
			    	}
            else{
              res.status(403).send(403);
              console.log(err);
            }
			    });
}

function logoutAdm(req, res){
  if(req,session.idEstab){
    req.session.destroy();
    res.redirect('/');
    console.log('logout sucess');
  }
}

function authenticateManager(req, res, next){
  if(req.session.idEstab) next();
  else{
    res.redirect('/');
    console.log('Access denied');
  } 
}

function authenticateAdmin(req, res, next){
  if(req.session.idAdmin) next();
  else{
    res.redirect('/');
    console.log('Access denied');
  } 
}

function admin(req,res){
  res.redirect('/#admin');
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
  var query = connection.query('SELECT * FROM tb_medico WHERE CRM = ?', req.params.id, function(err, rows){
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
  var query1 = connection.query('SELECT * FROM tb_medico WHERE CRM = ?', req.body.CRM, function(exists, rows) {
  var debug = rows[0];
  if (debug != null) {
	addRelationDoctorEstab(req, res);
  }
  else {
    var query = connection.query('INSERT INTO tb_medico (CRM, Nome,Especialidade, Descricao) VALUES(?,?,?,?)',
                                  [req.body.CRM,req.body.Nome, req.body.Descricao,req.body.Especialidade],function (err){
                if(!err) addRelationDoctorEstab(req, res);                                 
                else{
                  res.send(403,'Ocorreu algum erro ao adicionar o medico');
                  console.log(err); 
                }
    });
  }
  });
}

function addRelationDoctorEstab(req,res){
  var query1 = connection.query('SELECT * FROM tb_medico_trabalha_estabelecimento WHERE FK_Medico_Estab = ? AND FK_Estabelecimento_Med', 
               [req.body.CRM, req.session.idEstab], 
               function(exists, rows) {
                	var debug = rows[0];
                	if (debug == null) {
                     var query = connection.query('INSERT INTO tb_medico_trabalha_estabelecimento(FK_Medico_Estab,FK_Estabelecimento_Med) VALUES(?,?)',
                                                  [req.body.CRM, req.session.idEstab], function(err){
                                                    if(!err) res.send(200,'Relacao adicionada');               
                                                    else res.send(403,'Ocorreu algum erro');
                                                  });
                	}
                	else res.send(403, "Já existe relação entre o médico e o estabelecimento");  
  });
}

function deleteRelationDoctorEstab(req,res){
  var query = connection.query('DELETE FROM tb_medico_trabalha_estabelecimento WHERE FK_Medico_Estab = ? AND FK_Estabelecimento_Med = ?',
                                [req.params.id, req.session.idEstab], function(err){
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
  var query = connection.query('UPDATE tb_medico SET Nome = ?, Especialidade = ?, Descricao = ? WHERE CRM = ?',
              [req.body.Nome,req.body.Especialidade, req.body.Descricao, req.body.CRM],
              function(err){
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
                               'FROM tb_cliente cli, tb_estabelecimento est, tb_cliente_cad_estab cad '+
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
                               'FROM tb_cliente cli, tb_estabelecimento est, tb_cliente_cad_estab cad '+
                               'WHERE cli.CPF =? AND est.CNES = ? AND cad.FK_Cliente=cli.CPF AND cad.FK_Estabelecimento = est.CNES',
                                [req.params.id, req.session.idEstab], function(err, rows) {
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
  var check = connection.query('SELECT * FROM tb_cliente_cad_estab WHERE FK_Cliente=? AND FK_Estabelecimento=?',
    [req.params.id, req.session.idEstab], function(err, rows){
      var cad = rows[0];
      if(cad==null){
        var query=connection.query('INSERT INTO tb_cliente_cad_estab(FK_Cliente,FK_Estabelecimento) VALUES(?,?)',
                  [req.body.CPF, req.session.idEstab], function(erro){
                    if(!erro) res.send(200,'Cliente adicionado');
                    else {
                      res.send(403,'Erro ao adicionar, Verifique o log');
                      console.log(erro);
                    }
        });
      }
  }); 
}

function deleteRelationPatientEstab(req, res){
  var query = connection.query('DELETE FROM tb_cliente_cad_estab WHERE FK_Cliente=? AND FK_Estabelecimento=?',
              [req.params.id, req.session.idEstab], function(err){
                if(!err) res.send(200,'Cliente removido');
                else{
                  res.send(403,'Ocorreu algum erro, Verifique o log');
                  console.log(err);
                }
              });
}

function updatePatient (req,res) {
  var query = connection.query('UPDATE  tb_cliente SET  Nome=?, Sexo=?, Email=?, Telefone=? where CPF = ?',
  [ req.body.Nome, req.body.Sexo , req.body.Email , req.body.Telefone,req.body.CPF],function(err){
      if(!err) {
        res.send(200,'Cliente atualizado');
        console.log('Cliente atualizado');
      } 
      else{
        res.send(403,'Erro ao atualizar');
        console.log('Erro ao atualizar');
        console.log(err);
      }          
  });
  /*
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
  });*/
}


// ------------------------------------------------- Functions Estabs --------------------------------------------------------

function getEstabs(req, res){
  var query = connection.query('SELECT est.CNES, est.Nome, est.Descricao, est.Numero, end.Estado, end.Cidade, end.Bairro, end.Rua '+
                               'FROM tb_estabelecimento est, tb_estabelecimento_endereco estend, tb_endereco end ' +
                               'WHERE est.CNES = estend.FK_Estabelecimento_End AND end.PK_Endereco = estend.FK_Endereco_Estab', 
                                function(err, rows, fields) {
    if (!err) res.jsonp(rows);
    else{
      res.send(403,'Ocorreu algum erro')
      console.log(err);
    }
  });
}  

function getEstab(req, res){
  var query = connection.query('SELECT est.CNES, est.Nome, est.Descricao, est.Numero, end.Estado, end.Cidade, end.Bairro, end.Rua '+
                               'FROM tb_estabelecimento est, tb_estabelecimento_endereco estend, tb_endereco AS end ' +
                               'WHERE est.CNES = ? AND est.CNES = estend.FK_Estabelecimento_End AND end.PK_Endereco = estend.FK_Endereco_Estab',
                               req.params.id,function(err, rows, fields) {
    if (!err) res.jsonp(rows[0]);
    else{
      res.send(403,'Ocorreu algum erro')
      console.log(err);
    }
  });
}

function addEstab(req, res){
   var query = connection.query('INSERT INTO tb_estabelecimento(CNES,Nome,Descricao,Numero) VALUES(?,?,?,?)',
                                [req.body.CNES, req.body.Nome, req.body.Descricao, req.body.Numero], 
                                function(erro){
                                  if(!erro){
                                    var query2= connection.query('INSERT INTO tb_endereco(Rua,Bairro,Cidade,Estado) VALUES(?,?,?,?)',
                                                [req.body.Rua, req.body.Bairro, req.body.Cidade, req.body.Estado], 
                                                function(erro2) {
                                                  if(!erro2){
                                                    var query3 = connection.query('SELECT * FROM tb_endereco', function(err, rows) {
                                                      if (!err) {
                                                        var pkEndereco = rows[rows.length-1].PK_Endereco;   
                                                        var query4= connection.query('INSERT INTO tb_estabelecimento_endereco'+
                                                                '(FK_Estabelecimento_End, FK_Endereco_Estab) VALUES(?,?)',
                                                                [req.body.CNES, pkEndereco], function(erro3){
                                                                  if(!erro3) res.send(200, 'Estabelecimento adicionado');
                                                                  else{
                                                                    res.send(403, 'Ocorreu algum erro');
                                                                    console.log(erro3);
                                                                  }                                                                
                                                        });
                                                      }                                                     
                                                    });                                                    
                                                  }else res.send(403,"Ocorreu um erro ao adicionar o endereco");                                                    
                                  });
                                }else res.send(403,"Ocorreu um erro ao adicionar o estabelecimento");
                              });
}

function deleteEstab(req, res){
var query = connection.query('SELECT * FROM tb_estabelecimento_endereco WHERE FK_Estabelecimento_End = ?',
      req.params.id, function(erro,rows){
        if(!erro && rows!=null){
          var pkEndereco = rows[0].FK_Endereco_Estab;
          var pkRelacao = rows[0].PK_Establecimento_Endereco;
          console.log(pkEndereco);
          var deleteRelacao = connection.query('DELETE FROM tb_estabelecimento_endereco WHERE  PK_Establecimento_Endereco = ?',
          					  pkRelacao, function(erro2){
          					  	if(!erro2){
          					  		var deleteEstab = connection.query('DELETE FROM tb_estabelecimento WHERE CNES = ?',
				          					  		  req.params.id, function(erro3){
				          					  		  	if(!erro3){
				          					  		  	   var deleteEndereco = connection.query('DELETE FROM tb_endereco WHERE PK_Endereco = ?',
				          					  		  	                        pkEndereco, function(erro4){
				          					  		  	                        	if(!erro4) res.send(200, "Estabelecimento deletado");   
				          					  		  	                        	else res.send(403, "Ocorreu algum erro ao deletar"); 
				          					  		  	                        });
				          					  		  	}
				          					  		  });
          					  	} 
          					  });         
        }
        else{
        	res.send(403, "Ocorreu algum erro ao deletar, verifique os dados");	
        	console.log(erro);
        } 
      });
}

function newAppointment(req, res){
  var query = connection.query('INSERT INTO tb_consulta (FK_Cliente, FK_Estabelecimento, FK_Medico, Status, Data, Turno)  '+
                               'VALUES (?, ?, ?, ?, ?, ?)',
                               [req.body.CPF, req.session.idEstab, req.body.CRM, req.body.Status, req.body.Data, req.body.Turno], function(err, rows, fields) {
    if (!err) res.jsonp(rows[0]);
    else{
      res.send(403,'Ocorreu algum erro')
      console.log(err);
    }
  });
}

function getAppointments(req, res){
  var query = connection.query('SELECT tbC.PK_Consulta, tbC.Data, tbC.Turno, tbC.Status, tbC.HoraConfirmacao, tbC.DataConfirmacao, tbC.FK_Medico,  tBM.Nome AS "NomeMedico", tbCl.Nome "NomeCliente" FROM tb_consulta tbC, tb_medico tbM, tb_cliente tbCl WHERE tbC.FK_Estabelecimento = ? and tbM.CRM = tbC.FK_Medico AND tbCl.CPF = tbC.FK_Cliente', req.session.idEstab, function(err, rows, fields) {
    if (!err) res.jsonp(rows);
    else{
      res.send('Ocorreu algum erro')
      console.log(err);
    }
  });
}

function deleteAppointment(req, res){
  var query = connection.query('DELETE FROM tb_consulta WHERE FK_Estabelecimento = ? AND PK_Consulta = ?', [req.session.idEstab, req.params.id], function(err, rows, fields) {
    if(!err){
      res.send(200,'Consulta removida');
      console.log('Consulta removida');
    } 
     else{
      res.send(403,'Erro ao remover');
      console.log('Erro ao remover');
      console.log(err);
    }
  });
}

var server = app.listen(PORT,HOST, function() {
    console.log('Servidor rodando em: '+HOST + ':' + PORT);
});
