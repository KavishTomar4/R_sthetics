require('dotenv').config();
const cookieParser = require('cookie-parser');
let express = require('express');
let mongoose = require('mongoose');
let authRoutes = require('./Routes/auth');
let bodyParser = require('body-parser')
let cors = require('cors')
let cookieSession = require('cookie-session')
let app = express();



let corsOptions = {
  origin: ['http://localhost:3000', 'https://rs-thetics-frontend.onrender.com'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow cookies to be sent
};

app.set("trust proxy", 1);
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
