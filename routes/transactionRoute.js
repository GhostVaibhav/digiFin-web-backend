const router = require('express').Router()

const {showTransaction, showTransactionAll, addTransaction, updateTransaction, deleteTransaction, testRoute, showTransactionParticular} = require('../controllers/transactionData')

router.get('/show', showTransaction)
router.get('/showall', showTransactionAll)
router.post('/add', addTransaction)
router.patch('/update', updateTransaction)
router.delete('/delete', deleteTransaction)
router.get('/', testRoute)
router.get('/showone', showTransactionParticular)

module.exports = router
