const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

const port = 3030;
const admin = require('./routes/admin');

// Configurações
// body-parser 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// handlebars
const handlebars = exphbs.create({ 
  defaultLayout: 'main',
  extname: '.handlebars'
});
app.set('views', path.join(__dirname, 'view'));
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars'); 

// mongoose
mongoose.Promise = global.Promise;
const DB_URL = "mongodb://127.0.0.1:27017/demo"
mongoose.connect(DB_URL, {useNewUrlParser : true, useUnifiedTopology: true,}).then(() => {
    console.log("O banco de dados foi criado com sucesso");
}).catch((err) => {
    console.log(`Erro ao criar o servidor ${err}`);
});

// public
app.use(express.static(path.join(__dirname, 'public')));

// criando o middleware
app.use((req, res, next) => {
  console.log("heelo word!!")
  next(); // Significa passar a requisição

})

// rotas
app.use('/', admin);

// criando servidor 
app.listen(port, () => {
  console.log(`O Servidor está On!! Porta: ${port}`);
});
