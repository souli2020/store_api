const Product = require('../models/Product')

//testing
const getAllProductsStatic = async (req, res) => {

    const test = await Product.find({ price: { '$gt': 30 }, rating: { $gt: 4 } })
    res.status(200).json({ nbHits: test.length, test })
}
const deletAll = async (req, res) => {
    const products = await Product.deleteMany({})
    res.status(200).send('all products deleted')
}

const filterByName = async (req, res) => {
    const productsByName = await Product.find({ name: 'sofa' })
    res.status(200).json({ productsByName, nbHits: productsByName.length })
}
const createProducts = async (req, res) => {
    try {

        const { name, price } = req.body
        const p = await Product.create({ name, price })
        res.json(p)
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

//end of testing

const getAllProducts = async (req, res) => {
    let { featured, name, company, sort, fields, numericFilters } = req.query
    const queryObject = {}

    if (featured) {
        queryObject.featured = featured === 'true' ? true : false
    }
    if (company) {
        queryObject.company = company
    }
    if (name) {
        queryObject.name = { $regex: name, $options: 'i' }
    }

    let result = Product.find(queryObject)

    //numeric filtring
    if (numericFilters) {
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
        };
        const regEx = /\b(<|>|>=|=|<|<=)\b/g;
        let filters = numericFilters.replace(
            regEx,
            (match) => `-${operatorMap[match]}-`
        );
        const options = ['price', 'rating'];
        filters = filters.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-');
            if (options.includes(field)) {
                queryObject[field] = { [operator]: Number(value) };
            }
        });
        result = result.find(queryObject)

    }
    console.log(queryObject)
    if (sort) {

        let sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    }
    else {
        result = result.sort('-createAt')
    }

    //pagination
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit


    //selecting
    if (fields) {
        result.select(fields.split(',').join(' '))
    }
    result.skip(skip).limit(limit)
    let products = await result
    res.json({ nbHits: products.length, products })
}


module.exports = { getAllProducts, getAllProductsStatic, createProducts, deletAll, filterByName } 