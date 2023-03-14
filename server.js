const app = require('./app');
const PORT = process.env.PORT || 4000;
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});

const DB = process.env.DATABASE.replace("<PASSWORD>",process.env.DATABASE_PASSWORD);

mongoose.connect(DB)
.then(()=>{
    console.log('DB connection successful');
})
.catch((err)=>{
    console.log(`Error connecting Database. Error: ${err}`);
})


app.listen(PORT,()=>{
    console.log(`App listening to port: ${PORT}`);
});