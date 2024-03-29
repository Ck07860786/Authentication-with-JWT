import express from 'express'
import dotnev from 'dotenv'
import mongoDB from './config/mongo.js';
import morgan from 'morgan';
import authRoute from './routes/authRoute.js'
import bodyParser from 'body-parser';

const app = express();

//env config
dotnev.config();

//db config
mongoDB();

//middleware
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())
app.use(morgan('dev'))

//rest api
app.use('/api/v1/auth',authRoute)





//listen

const PORT = process.env.PORT || 8080

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})