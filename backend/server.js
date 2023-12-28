require('dotenv').config();
const cookieParser = require('cookie-parser');
let express = require('express');
let mongoose = require('mongoose');
let authRoutes = require('./Routes/auth');
let bodyParser = require('body-parser')
let cors = require('cors')
let app = express();

/*app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });*/


app.use(express.json());
app.use(cors(
    {
        origin: [
          "http://localhost:3000",
          "https://kaleidoscopic-puffpuff-49f3aa.netlify.app/",
        ],
        credentials: true,
      }
));
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
