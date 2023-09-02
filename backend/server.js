require ('dotenv').config()
const express = require('express')
const cors = require('cors')
const {db} = require('./database/db')
const errorHandler = require('./middleware/errorHandler')
const auth = require('./middleware/authenticaton')


const PORT = process.env.PORT
const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/v1/income', auth, require('./routes/route'))
app.use('/api/v2/expense', auth, require('./routes/expense-route'))
app.use('/api/v3/user', require('./routes/user-route'))
app.use(errorHandler)

const start = () => {
    db()
    app.listen(PORT, () => {
        console.log('listening to port', PORT)
    }) 
}
start()