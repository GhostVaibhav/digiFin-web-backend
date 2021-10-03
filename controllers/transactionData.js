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

        let totalAmount = 0   
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

        return res.status(200).json({status: 'success',data: transaction,total: totalAmount, count: transaction.length})
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
    
        let totalAmount = 0    
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

        return res.status(200).json({status: 'success',data: transaction,total: totalAmount, count: transaction.length})
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

        return res.status(200).json({status: 'success',data: transaction,total: transaction.transactionAmount})
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

    try
    {
        const{userId, transactionDate, transactionId, transactionAmount} = req.body
    
        const transaction = new Transaction({
            userId, transactionDate, transactionId, transactionAmount
        })

        transaction.transactionDate instanceof Date
        
        await transaction.save()
        return res.status(201).json({status: 'record successfully added',data: transaction})
    }
    catch(error) 
    {
        return res.status(500).json({
            status:'failure',
            error: error.message
        })
    }
})

const updateTransaction = (async(req,res) => {
    try{
        const {transactionid} = req.query

        const{userId, transactionDate, transactionId, transactionAmount} = req.body

        if(transactionId != transactionid)
        { 
            return res.status(404).json({
                status: 'failure',
                message: 'enter valid transactionId'
            })
        }


        const transaction = await Transaction.findOneAndUpdate({transactionId: transactionid},
        {
            userId, transactionDate, transactionId, transactionAmount
        },{new: true})
        if(!transaction || transaction.length === 0)
        { 
            return res.status(404).json({
                status: 'failure',
                message: 'could not retrieve any records'
            })
        }
        await transaction.save()
        return res.status(201).json({status: 'record successfully updated',data: transaction})
    }catch(error) 
    {
        return res.status(500).json({
            status:'failure',
            error: error.message
        })
    }
})

const deleteTransaction = (async(req,res) => {
    try{
        transactionId = req.query
        await Transaction.findOneAndDelete({transactionId: transactionId})
    }
    catch(error) 
    {
        return res.status(500).json({
            status:'failure',
            error: error.message
        })
    }
    return res.status(202).json({
        status: 'record successfully deleted',
    })
})

module.exports = {showTransaction, showTransactionAll, updateTransaction, deleteTransaction, addTransaction, testRoute, showTransactionParticular}
