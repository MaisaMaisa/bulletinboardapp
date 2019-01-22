const express = require('express'),
     ejs = require ('ejs'),
     path = require('path'),
     app = express(),
     port = process.env.PORT || 3000,
     Messages = require('./models/messages.js');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
     
app.use('/', express.static(path.join(__dirname, 'views')));

app.use(express.urlencoded({extended: false}));

app.get('/', (req,res) => {
    res.render('home');
});

app.route('/form')
    .get((req,res) =>{
        res.render('form');
    })
    .post((req, res) => {
        console.log('This is request body:',req.body)
        Messages.create({
            title: req.body.title,
            body: req.body.body
    })
    res.redirect('allmessages')
    })


app.get('/allmessages',(req, res) => {
    Promise.all([
        Messages.findAll(),
    ]).then((entities) => {
        let title = entities[0].map(function (row){
            return{
                title: row.dataValues.title,
                body: row.dataValues.body
            };
        });
        res.render('allmessages',{
            content: title            
        }); 
    })
});

     
app.listen(port, () => console.log(`ears on ${port}!`));

