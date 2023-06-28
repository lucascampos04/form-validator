const express = require('express')
const router = express.Router()

router.get('/', (req, res) =>{
    res.render('admin/index')
})

router.get('/post', (req, res) => {
    res.send("PAGINA DE PUBLICAÇÃO")
})

router.get('/categorias', (req, res) => {
    res.send("PAGINA DE CATEGORIAS")
})

module.exports = router
