const { time } = require('console');
const mongoose = require('mongoose')
const Float = require('mongoose-float').loadType(mongoose,2);

const transactionSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    transactionDate : {
        type: Date,
        required: true
    },
    transactionId : {
        type: String,
        required: true,
        unique: true
    },
    transactionAmount : {
        type: Float,
        required: true
    }
})

module.exports = mongoose.model('Transaction', transactionSchema)