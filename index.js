const express = require('express');
//importando o model de pessoa que estamos usando
const Pessoa = require('./models/Pessoa')
const bodyParser = require('body-parser')
//instanciando e atribuindo o express a variavel app

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}));

//rota de principal usaremos de teste da aplicação
app.get('/', (req, res) => {

    //apresentamos uma mensagem simples
    res.send('Função testada, mysql com node usando sequelizer')
})

//rota para criar pessoa
app.post('/criarpessoa', (req, res) => {
    //o comando create manda o banco de dados criar uma instancia do model com os dados que queremos
    Pessoa.create(req.body).then(() => {
        console.log('pessoa criada')
    }).catch((err) => {
        console.log('não foi possível criar a pessoa')
    })

    return res.send(
        ' pessoa criada'
    );
    /*Pessoa.create({
          //atributos que vamos inserir
          nome: 'Jhon Doe',
          idade: 28,
          cpf: '89400098400'
      })*/
})

app.get('/pessoas', (req,res) => {
    // Find all persons
    Pessoa.findAll().then(pessoas => {
    res.status(200).send(JSON.stringify(pessoas, null, 4));
  }).catch((err) => {
    res.status(200).json({success: false, message: 'não foi possível listar as pessoas'})
  });
 
  
})

//rota para edição
app.post('/editarpessoa', (req, res) => {

    const person = req.body;

    Pessoa.update({
        nome: person.nome,
        idade: person.idade,
        cpf: person.cpf

    }, {
        where: {
            id: person.id
        }
    }).then(() => res.status(200).json({
        success: true,
        message: "A pessoa em questão foi atualizada com sucesso"
    })).catch((err) => {
        res.status(500).json({
            success: false,
            message: "Houve uma falha ao atulizar dados pessoais"
        })
    })


})


//rota para exclusão por id
app.delete('/excluir/:id', (req, res) => {
    const id = req.params.id;

    Pessoa.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.status(200).json({
            success: true,
            message: 'Usuario excluido com sucesso!'
        })
    }).catch((err) => {
        res.status(500).json({
            success: false,
            message: 'Houve um erro ao excluir o usuário!'
        })
    })
})

//rota para deletar a pessoa em questão passando o nome como parâmetro de busca 
//(caso haja 2 ou mais pessoas com o mesmo nome ele irá excluir tbm)
app.delete('/excluirpornome', (req, res) => {
    const name = req.body.nome;

    Pessoa.destroy({
        where: {
            nome: name
        }
    }).then(() => {
        res.status(200).json({
            success: true,
            message: 'Usuario excluido com sucesso!'
        })
    }).catch((err) => {
        res.status(500).send('falha interna no servidor durante a criação da pessoa')
    })
})

//servidor está servindo a aplicação nessa porta
app.listen(3000, () => {
    console.log('servidor rodando na porta 3000')
})