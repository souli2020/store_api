const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'must provide a title for the product'],
        trim: true
    },
    price: {
        type: Number,
        require: [true, "must provide a price"]
    },
    featured: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 4.5
    },
    createAt: {
        type: Date,
        default: Date.now()

    },
    company: {
        type: String,
        enum: {
            values: ["ikea", "marcos", "caressa", "liddy"],
            message: '{VALUE} is not supported'
        }
        // OR without the error msg ===> enum: ["ikea", "marcos", "caressa", "liddy"]
    }

})
module.exports = mongoose.model('Product', productSchema)
