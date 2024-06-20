const app = require('./express');
const port = 3000
const dotenv = require('dotenv')
dotenv.config()

app.listen(process.env.PORT,()=>{
    console.log('listening on port ' + port)
})