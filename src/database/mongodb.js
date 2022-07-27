const mongoose = require('mongoose');
require('dotenv').config();


const connnectDB = async () => {
    try {
        console.log('Conectando ao mongoDB...');
        await mongoose.connect(process.env.MONGOURL);
        console.log('MongoDB conectado com sucesso!!!');
    }catch(error){
        console.log('Erro de conexão com o mongoDB' + error);

    }
}

module.exports = connnectDB;