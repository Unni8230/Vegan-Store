const express  = require('express')
const router = express.Router()
const initDB = require('../db/database')

//To get all the Products and based on Search query
router.get('/', async (request, response)=> {
    try{
    const db = await initDB()
    const {q = ''} = request.query
    let products;
    if (q) {
        const searchTerm = `%${q}%`
        const filterProductsQuery = `
        SELECT * FROM products
        WHERE title LIKE ? OR category LIKE ?
        ORDER BY created_at DESC
        `;
        products = await db.all(filterProductsQuery,[searchTerm, searchTerm])
    }
    else{
        const allProductsQuery = 'SELECT * FROM products ORDER BY created_at DESC'
        products = await db.all(allProductsQuery)
    }
    response.status(200).json(products)
    }
    catch(error){
        response.status(500).json({ error: error.message });
    }
})

//To get a specific product based on product id
router.get('/:id', async(request,response)=> {
    try{
        const db = await initDB()
        const specificProductQuery = 'select * from products where id = ?'
        const {id} = request.params
        const productDetails = await db.get(specificProductQuery,[id])
        if (!productDetails){
            response.status(404).json({error: "Product not Found"})
        }
        else{
            response.status(200).json(productDetails)
        }
        
    }
    catch(error){
        response.status(500).json({ error: error.message });
    }
})


module.exports = router