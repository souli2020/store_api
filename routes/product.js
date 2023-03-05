const express = require('express')
const router = express.Router()

const { getAllProducts, getAllProductsStatic, createProducts, filterByName, deletAll } = require('../controllers/product')


router.get('/', getAllProducts)
router.get('/static', getAllProductsStatic)
router.post('/', createProducts)
router.delete('/delete', deletAll)
router.get('/names', filterByName)


module.exports = router