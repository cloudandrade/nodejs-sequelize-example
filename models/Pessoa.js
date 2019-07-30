const db = require('../config/db')

const Pessoa = db.sequelize.define('pessoas', {
    nome: {
        type: db.Sequelize.STRING
    },
    idade: {
        type: db.Sequelize.INTEGER
    },
    cpf: {
        type: db.Sequelize.STRING
    }
})

//Pessoa.sync({force: true}) 

module.exports = Pessoa