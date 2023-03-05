require('dotenv').config()
const connectDB = require('./db/connect')
const productJson = require('./products.json')
const Product = require('./models/Product')
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        await Product.deleteMany()
        await Product.create(productJson)
        console.log("success!!!")
        process.exit(0)

    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
start()


