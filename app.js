require('dotenv').config()
//async error package
require('express-async-errors')
const express = require('express')
const app = express()
const notFound = require('./middleware/notFound')
const errorHandler = require('./middleware/errorHandler')

const product = require('./routes/product')

const connectDB = require('./db/connect')

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send("<h1>STORE API</h1> <a href='/api/v1/products'>products</a> ")
})
app.use(express.json())
app.use('/api/v1/products', product)

//middlewares

app.use(notFound)
app.use(errorHandler)
//
const start = async () => {
    try {
        //CONNECT DB
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, console.log(`server started at : ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}
start()