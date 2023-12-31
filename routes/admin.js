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
    Categoria.find().lean().then((categorias) => {
        res.render('admin/categorias', {categorias: categorias})
    }).catch((err) => {
        req.flash('error_msg', 'Erro ao listar categorias')
        res.redirect('/admin')
    })
})

router.get('/add', (req, res) => {
    res.render("admin/addcategorias");
});

router.post('/nova', (req, res) => {
    

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
    } else{
        const novaCategoria = {
            nome: req.body.nome,
            slug: req.body.slug
        }

        new Categoria(novaCategoria).save().then(()=>{
            req.flash('success_msg', 'Categoria salva com sucesso')
            console.log("Categoria salva")
            res.redirect('/add')
        }).catch((err)=> {
            req.flash('error', 'Erro ao salvar a categoria')
            console.log(`Erro ao salvar a categoria ${err}`)
        })
    }


});

module.exports = router;
