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

let corsOptions = {
  origin: ['http://localhost:3000', 'https://r-sthetics-frontend.vercel.app'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow cookies to be sent
};

app.set("trust proxy", 1);
/*app.use(cookieSession({
  name: 'rs_client',
  keys: [process.env.SECRET],

  // Cookie Options
  maxAge: 30*24*60*60 // 24 hours
}))*/
app.use(express.json());
app.use(cors(corsOptions));
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
