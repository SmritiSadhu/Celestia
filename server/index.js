const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors')
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const app = express();
const authRoutes = require('./api/routes/auth');
const genAiRoutes = require('./api/routes/questionnaire')
dotenv.config();
const PORT = 8080;
app.use(cors())
app.use(bodyParser.json());
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL,{
  
})
mongoose.connection.on('connected',()=>{
  console.log('Connected to mongo...')
})
mongoose.connection.on('error',(err)=>{
  console.log('error connecting...',err)
})

//Mounting routes
app.use('/api/auth', authRoutes);
app.use('/api/questionnaire', genAiRoutes);
app.listen(PORT, () => {
  console.log(`Server running on port `, PORT)
})