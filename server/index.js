require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const modals = require('./models/models.js')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./Routes/indexRout')
const path = require('path')
const errorHandler = require('./middleware/ErrorHandlingMiddleware.js')
const PORT = process.env.PORT || 5000
const app = express()



app.use(cors())
app.use(express.json()) 
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync();
        
        app.listen(PORT,() => console.log(`Server started on port ${PORT}`))
    } catch(error) {
        console.log(error)
    }
}

start()
