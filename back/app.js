const  http  =  require('http');
const  path  =  require('path');
const  express  =  require('express');
const  bodyParser  =  require('body-parser');
const  morgan  =  require('morgan');
const  authRouter = require('./routes/auth/auth.js')
const  connection  = require('./helpers/db.js')
const  app  =  express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended:  false }));
app.use(bodyParser.json());
app.use(express.static(__dirname  +  '/public'));
app.use('/auth', authRouter);

app.get("/data", (req,res) => {
  connection.query("SELECT * FROM restaurant", (error, data) => {
    if(error) {
      return res.status(500).json({
        error: error.message
      })
    }
    res.json(data)
  })
})

app.use(function(req, res, next) {
    var  err  =  new  Error('Not Found');
    err.status  =  404;
    next(err);
});

let  server  =  app.listen( process.env.PORT  ||  5000, function(){
    console.log('Listening on port '  +  server.address().port);
});
