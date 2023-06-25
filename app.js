const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const port = 3030
// const mongoose = require('mongoose')
const admin = require('./routes/admin')

// Configurações
    // body-parser 
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    // handlebars
    const handlebars = exphbs.create({ 
        defaultLayout: 'main',
        extname: '.handlebars',
        runtimeOptions: {
          allowProtoPropertiesByDefault: true,
          allowProtoMethodsByDefault: true,
        },
      });
      app.engine('handlebars', handlebars.engine);
      app.set('view engine', 'handlebars');
    // mongoose

// rotas
app.use('/', admin)

// criando servidor 
app.listen(port, () => {
    console.log("Servidor on")
})