const connectToMongo = require('./db');
const express = require('express')
const cors = require('cors')
connectToMongo();
const app = express()
const port = 4000;
app.use(express.json())
app.use("/public",express.static("public"))
app.use(cors())
app.use('/api/auth',require('./routes/auth'))
app.get('/', (req, res) => {
    res.send('Hello harry')
})
app.use('/api/notes',require('./routes/notapi'))
app.use('/api/admin',require('./routes/admin'))
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})