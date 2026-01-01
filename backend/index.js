const express = require('express')
const Connection = require('./config/db')
const routes = require('./routes/index')
const cors = require('cors');
require('dotenv').config()
const app = express();

const PORT = process.env.port || 4500;

app.use(express.json())
app.use(cors({
    origin:"*"
}))

app.use('/', routes)


app.listen(PORT, async () => {
    try {
        await Connection
        console.log("connected to db")
    } catch (e) {
console.log(e)
    }
    console.log(`server running on port ${PORT}`)
})



module.exports = app;