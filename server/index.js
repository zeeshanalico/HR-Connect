const express=require('express')
const cors=require('cors')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv');
dotenv.config({path:"./config.env"})
const routes = require('./Routes/index.js');
const port=process.env.PORT
const app=express();
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:3001',
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true
}));

app.use(cookieParser())

app.use(routes)

app.listen(port, (error) => {
    if (error) {
      console.error('Error starting the server:', error);
    } else {
      console.log(`Server is restarting at (${new Date().toString().slice(0,25)}) and running on port ${port}`);
    }
  });