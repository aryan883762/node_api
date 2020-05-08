const express = require("express")
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.json())


app.use((error, req, res, next) => {
    console.log(req)
    console.error(error)
    res.status(error.statusCode || 500).json({message: error.message})
})

module.exports = app