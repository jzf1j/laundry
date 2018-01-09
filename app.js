const express =require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

var config = require('./config');
const app = express();
const port  = config.port;

app.set('view engine', 'ejs');

mongoose.Promise = require('bluebird');
mongoose.connect(config.db_url, { useMongoClient: true })
    .then(() => { // if all is ok we will be here
      console.log('mongod Connected');
    })
    .catch(err => { // if error we will be here
        console.error('App starting error:', err.stack);
        process.exit(1);
    });

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.listen(port,()=>{
    var date = new Date();
    var current_time = date.getMinutes();
    console.log('!server started - '+ current_time);
});



//addon:

//login
require('./addon/login/init_login')(app);  

//manager
require('./addon/manager/init_manager')(app); 

//admin
// require('./addon/fjTool/email'); 

//curd
//require('./addon/init_crud')(site);

//fetch
//require('./addon/init_fetch')(site); 



//template
require('./'+config.template+'/init_template')(app);