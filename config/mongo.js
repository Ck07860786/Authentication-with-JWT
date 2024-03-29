import mongoose from'mongoose';

const mongoDB =async()=>{
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL)
        console.log(`database connected ${connect.connection.host}`)
        
    } catch (error) {

        console.log(error)
        
    }
}

export default mongoDB;