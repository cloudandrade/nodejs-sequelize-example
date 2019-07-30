const express = require('express');
//importando o model de pessoa que estamos usando
const Pessoa = require('./models/Pessoa')
//instanciando e atribuindo o express a variavel app
const app = express();

//rota de principal usaremos de teste da aplicação
app.use('/', (req, res) => {

    //o comando create manda o banco de dados criar uma instancia do model com os dados que queremos
    Pessoa.create({
        //atributos que vamos inserir
        nome: 'Jhon Doe',
        idade: 28,
        cpf: '89400098400'
    }).then(() => {
        //caso seja criada com sucesso irá apresentar essa mensagem
        console.log('a pessoa foi criada com sucesso no banco de dados')
    }).catch((err) => {
        //caso dê erro irá apresentar essa mensagem
        console.log('houve um erro ao salvar a pessoa: ' + err)
    })

    //apresentamos uma mensagem simples
    res.send('Função testada, mysql com node usando sequelizer')
})

//servidor está servindo a aplicação nessa porta
app.listen(3000, () => {
    console.log('servidor rodando na porta 3000')
})