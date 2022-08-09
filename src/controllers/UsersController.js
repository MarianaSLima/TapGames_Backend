const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Users = require('../models/Users'); //importando o modelo de Users

module.exports = {
    add: async (req, res) => {
        const { avatar, nome, nick, email, password, score, ranking } = req.body;

        const userExist = await Users.findOne({ email });
        if (userExist) {
            res.json({
                data: [],
                error: "E-mail já cadastrado!"
            });
            return;
        }

        const passwordHash = await bcrypt.hash(password, 10);

        let addUser = new Users({ avatar, nome, nick, email, passwordHash, score, ranking });
        const saveUsers = await addUser.save();
        if (!saveUsers) {
            res.json({
                error: 'Erro ao adicionar User'
            });
            return;
        }

        res.json({
            data: saveUsers
        });

    },

    signin: async (req, res) => {
        const { email, password } = req.body;
        const userExist = await Users.findOne({ email });

        if (!userExist) {
            res.json({
                data: [],
                error: 'O Usuário não existe!'
            });
            return;
        }

        const match = await bcrypt.compare(password, userExist.passwordHash);

        if (!match) {
            res.json({
                data: [],
                error: "Senha incorreta!"
            });
            return;
        }
        res.json({
            data: userExist
        });
    },

    ranking: async (req, res) => {
        const rankingList = await Users.find({ ranking: { $gt: 0 }, score: { $ne: 0 } })
            .sort({ ranking: 1 })
            .limit(10)
            .select({
                ranking: 1,
                avatar: 1,
                nick: 1,
                score: 1,
                _id: 0
            }).exec();
        res.json({
            data: rankingList
        });
    },


    /*
    list: async (req, res) => {
        const listUsers = await Users.find();
        if (!listUsers) {
            res.json({
                error: 'Erro ao recuperar os registros'
            });
        } else {
            res.json({
                data: listUsers
            })
        }

        res.json({
            data: userExist
        });

    },
    getId: async (req, res) => {
        const id = req.params.id;
        const listUsers = await Users.findById(id);
        if (!listUsers) {
            res.json({
                error: 'Erro ao recuperar os registros'
            });
        } else {
            res.json({
                data: listUsers
            })
        }
    },
    deleteId: async (req, res) => {
        const id = req.params.id;
        const listUsers = await Users.findByIdAndDelete(id);
        if (!listUsers) {
            res.json({
                error: 'Erro ao recuperar os registros'
            });
        } else {
            res.json({
                data: listUsers
            })
        }
    },
    */
    updateId: async (req, res) => {
        const id = req.params.id;
        const { avatar, nome, nick, email } = req.body;

        await Users.findByIdAndUpdate(id, { avatar, nome, nick, email });
        const userUpdate = await Users.findById(id);
        if (!userUpdate) {
            res.json({
                data: [],
                erro: 'Não foi possivel atualizar'
            });
        } else {
            res.json({
                data: userUpdate
            });
        }
    },

    score: async (req, res) => {
        const nick = req.params.nick;
        const novoScore = req.params.score;
        const user = await Users.findOne({ nick });

        if (!user) {
            res.json({
                data: [],
                erro: 'Não foi possivel localizar o User'
            });
            return;
        }

        const id = user._id;
        const scoreAtual = user.score;

        if (novoScore > scoreAtual) {
            await Users.findByIdAndUpdate(id, { score: novoScore });
            const gerarRanking = await Users.aggregate([
                {
                    $setWindowFields: {
                        sortBy: { score: -1 },
                        output: {
                            ranking: {
                                $rank: {}
                            }
                        }
                    }
                }
            ]).exec();
            gerarRanking.map((user => {
                Users.updateOne({ _id: user._id }, { ranking: user.ranking }).exec();
            }
            ));
        }
        res.json({
            data: [],
            msg: 'Score atualizado!'
        });
    }

}