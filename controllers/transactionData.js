const Transaction = require('../models/Transaction')

const testRoute = (async(req,res) => {
    return res.send("Connection Successful")
})

const showTransaction = (async(req,res) => {

    try
    {
        const{userId, startDate, endDate} = req.query

        if(startDate === '' || endDate === '') {
            return res.status(400).json({
                status:'failure',
                message: 'Please ensure you pick two dates'
            })
        }

        const transaction = await Transaction.find({userId: userId, transactionDate : {$gte: new Date(new Date(startDate).setHours(00, 00, 00)), $lt: new Date(new Date(endDate).setHours(23, 59, 59))} })

        const totalAmount = 0    
        for(var i = 0; i < transaction.length; i++)
        {
            totalAmount += transaction[i].transactionAmount
        }
    
        if(!transaction || transaction.length === 0)
            { 
                return res.status(404).json({
                    status: 'failure',
                    message: 'could not retrieve any records'
                })
            }

        return res.status(200).json({status: 'success',data: transaction,total: totalAmount})
    }
    catch(error) 
    {
        return res.status(500).json({
            status:'failure',
            error: error.message
        })
    }
})

const showTransactionAll = (async(req,res) => {

    try
    {
        const{userId} = req.query

        const transaction = await Transaction.find({userId: userId})
    
        const totalAmount = 0    
        for(var i = 0; i < transaction.length; i++)
        {
            totalAmount += transaction[i].transactionAmount
        }

        if(!transaction || transaction.length === 0)
        { 
            return res.status(404).json({
                status: 'failure',
                message: 'could not retrieve any records'
            })
        }

        return res.status(200).json({status: 'success',data: transaction,total: totalAmount})
    }
    catch(error) 
    {
        return res.status(500).json({
            status:'failure',
            error: error.message
        })
    }
})

const showTransactionParticular = (async(req,res) => {
    try
    {
        const {transactionId} = req.query

        const transaction = await Transaction.findOne({transactionId: transactionId})

        if(!transaction || transaction.length === 0)
        { 
            return res.status(404).json({
                status: 'failure',
                message: 'could not retrieve any records'
            })
        }

        return res.status(200).json({status: 'success',data: transaction,total: totalAmount})
    }
    catch(error) 
    {
        return res.status(500).json({
            status:'failure',
            error: error.message
        })
    }
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

module.exports = {showTransaction, showTransactionAll, updateTransaction, deleteTransaction, addTransaction, testRoute, showTransactionParticular}