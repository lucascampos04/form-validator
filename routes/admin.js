const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models/Categoria');
const Categoria = mongoose.model("Categoria");

router.get('/admin', (req, res) => {
    res.render('admin/index');
});

router.get('/post', (req, res) => {
    res.send("PAGINA DE PUBLICAÇÃO");
});

router.get('/categorias', (req, res) => {
    res.render("admin/categorias");
});

router.get('/add', (req, res) => {
    res.render("admin/addcategorias");
});

router.post('/nova', (req, res) => {
    const novaCategoria = {
        nome: req.body.nome,
        slug: req.body.slug
    }

    new Categoria(novaCategoria).save().then(()=>{
        console.log("Categoria salva com sucesso")
    }).catch((err)=> {
        console.log(`Erro ao salvar a categoria ${err}`)
    })
});

module.exports = router;
