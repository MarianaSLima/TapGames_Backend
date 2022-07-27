const express = require('express'); //importei o express
const router = express.Router(); //chamei o controle de rotas do express

router.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>');
});
  
router.get('/ping', (req, res) => {
    res.send('<h1>Pong</h1>');
});

router.get('/nome/:nomestring/:exibicao', (req, res) => {
    const nomeString = req.params.nomestring;
    let exibicao = req.params.exibicao;
    if(exibicao === 'invertida') {
        res.send(`<h1>${nomeString.split("").reverse().join("")}</h1>`);
        return;
    }
    res.send(`<h1>${nomeString}</h1>`);
});

let nomes = [];
//dados sendo passados pelo corpo da requisicao
router.post('/nome', (req, res) => {
    const { nome } = req.body;
    nomes.push(nome);
    res.json({
        mensagem: 'Nome adicionado com sucesso!',
        data: nomes
    });
    //nomes.slice(id,1)
});

router.delete('/nome/:id', (req, res) => {
    const id = req.params.id;
    nomes.splice(id, 1);
    res.json({
        mensagem: 'Nome deletado com sucesso!',
        data: nomes
    });
});

//soma

let animais = [
    'cachorro',
    'gato',
    'girafa',
    'triceratopes',
    'macaco',
    'leão',
    'jacare',
    'boi',
    'cobra',
    'cavalo',
    'barata'
];

router.get('/animal/:id', (req, res) => {
    const id = req.params.id;
    res.send(`<h1>${animais[id]}</h1`);
});

let frases = [
    "Desista hoje para não perder amanha!",
    "Se você não tentar você não perde",
    "Lute como nunca perda como sempre",
    "Só sei que nada sei",
    "Voce nao pode mudar o seu passdo, mas pode estragar seu futuro!",
    "Nenhum obstaculo é grande se voce nem tentar!"
];

router.get('/frases', (req, res) => {
    const rndInt = Math.floor(Math.random()*frases.length);
    res.send(`${frases[rndInt]}`);
});






//exportei o modulo de router
module.exports = router;