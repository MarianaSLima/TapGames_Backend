require('dotenv').config(); //importa o dotenv, config inicializa o dotenv;
const express = require('express'); //importo o express para o projeto - criando o servidor
const server = express(); //inicializa o express
//importando o arquivo(modulo) de rotas do express
const ApiRoutes = require('./src/routes/routes'); //importando as rotas da Api
const cors = require('cors'); // importando o cors
const mongodb = require('./src/database/mongodb'); //importa o arquivo de conexao com o mongoDB

mongodb();//inicializa a conexao com o mongoDB

const UsersRoutes = require('./src/routes/usersRoutes');
//meu servidor vai usar as configuracoes do cors
server.use(cors(
    {//configuracoes do cors
        origin: '*',
        methods: ['GET', 'POST', 'DELETE', 'PUT', 'UPDATE', 'PATCH'],
        allowedHeaders: ['Content-Type']
    }
));
//requisicoes serao convertidas ou comparadas em json
server.use(express.json());
//o body das requisicoes devem estar no padrao urlencoded
server.use(express.urlencoded({extended: true}));
//definindo as rotas a partir do '/'
server.use('/', ApiRoutes); 
server.use('/user', UsersRoutes); 

//inicializando o servidro para escutar na porta definida no arquivo .env
server.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT} no endereco ${process.env.BASE}`)
});