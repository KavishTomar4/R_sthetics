require('dotenv').config();
const cookieParser = require('cookie-parser');
let express = require('express');
let mongoose = require('mongoose');
let authRoutes = require('./Routes/auth');
let bodyParser = require('body-parser')
let cors = require('cors')
let app = express();
var cookieSession = require('cookie-session')

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.set("trust proxy", 1);
app.use(cors({
  origin: ['https://r-sthetics-frontend.vercel.app'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}));
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())
app.use('/api', authRoutes);




mongoose.connect(process.env.URL);
let con = mongoose.connection;

con.on('open', ()=>{

    app.listen(process.env.PORT, ()=>{
        console.log("connected successfully");
    });

})
