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

    var error = []

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        error.push({text : "Nome invalido"})
    }

    if(req.body.nome.length < 2){
        error.push({text : "Nome da categoria muito pequeno. Minimo de 5 caracteres"})
    }

    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
        error.push({text : "Texto Slug invalido"})
    }

    if(error.length > 0){
        res.render("admin/addcategorias", {error : error})
    }

    new Categoria(novaCategoria).save().then(()=>{
        console.log("Categoria salva com sucesso")
    }).catch((err)=> {
        console.log(`Erro ao salvar a categoria ${err}`)
    })
});

module.exports = router;
