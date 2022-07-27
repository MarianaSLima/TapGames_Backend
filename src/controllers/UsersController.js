const mongoose = require('mongoose');
const Users = require('../models/Users'); //importando o modelo de Users

module.exports = {
    add: async (req, res) => {
        const {avatar, nome, nick, email, passwordHash, score, ranking} = req.body;
        let addUser = new Users({avatar, nome, nick, email, passwordHash, score, ranking});
        const saveUsers = await addUser.save();
        if(!saveUsers) {
            res.json({
                error: 'Erro ao adicionar User'
            });
        }else {
            res.json({
                data: saveUsers
            });
        }
    },
    list: async(req, res) => {
        const listUsers = await Users.find();
        if(!listUsers){
            res.json({
                error: 'Erro ao recuperar os registros'
            });
        }else {
            res.json({
                data: listUsers
            })
        }
        
    },
    getId: async(req, res) => {
        const id = req.params.id;
        const listUsers = await Users.findById(id);
        if(!listUsers){
            res.json({
                error: 'Erro ao recuperar os registros'
            });
        }else {
            res.json({
                data: listUsers
            })
        }
    },
    deleteId: async(req, res) => {
        const id = req.params.id;
        const listUsers = await Users.findByIdAndDelete(id);
        if(!listUsers){
            res.json({
                error: 'Erro ao recuperar os registros'
            });
        }else {
            res.json({
                data: listUsers
            })
        }
    },
    updateId: async(req, res) => {
        const id = req.params.id;
        const {avatar, nome, nick, email, passwordHash, score, ranking} = req.body;

        const UserUpdate = await Users.findByIdAndUpdate(id, {avatar, nome, nick, email, passwordHash, score, ranking});

        if(!UserUpdate) {
            res.json({
                erro: 'Não foi possivel localizar o User'
            });
        } else {
            res.json({
                data:UserUpdate
            });
        }
    }

}