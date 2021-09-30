const Transaction = require('../models/Transaction')

const showTransaction = (async(req,res) => {

    const{userId, startDate, endDate} = req.query

    const transaction = await Transaction.find({userId: userId, transactionDate : [startDate,endDate]})

    if(!transaction || transaction.length === 0)
        return res.status(404).send("User does not exist")

    const totalAmount = 0    
    for(var i = 0; i < transaction.length; i++)
    {
        totalAmount += transaction[i].transactionAmount
    }
    
    return res.status(200).send(transaction,totalAmount)
})

const showTransactionAll = (async(req,res) => {
    
    const{userId} = req.query

    const transaction = await Transaction.find({userId: userId})
    
    if(!transaction || transaction.length === 0)
        return res.status(404).send("User does not exist")

    const totalAmount = 0    
    for(var i = 0; i < transaction.length; i++)
    {
        totalAmount += transaction[i].transactionAmount
    }

    return res.status(200).send(transaction,totalAmount)
})

const addTransaction = (async(req,res) => {

    const{userId, transactionDate, transactionId, transactionAmount} = req.body

    const transaction = new Transaction({
        userId, transactionDate, transactionId, transactionAmount
    })
    try{
        await transaction.save()
    }catch(err){
        return res.status(500).send(err)
    }
    return res.status(201).send(transaction)

})

const updateTransaction = (async(req,res) => {

})

const deleteTransaction = (async(req,res) => {

})

module.exports = {showTransaction, showTransactionAll, updateTransaction, deleteTransaction, addTransaction}