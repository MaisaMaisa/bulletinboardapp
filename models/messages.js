const Sequelize = require('sequelize');

//setting up sequelize connection with database

const allmessages =  new Sequelize('bulletinboard', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: false,
    password: 'not123456789'
});

//check if connected
allmessages
    .authenticate()
    .then(() => {
        console.error('Congrats');
    }).catch(err => {
        console.error(`Nope: ${error.stack}`)
    });

//define Messages model
const Messages = allmessages.define('messages', {
    title: Sequelize.STRING,
    body: Sequelize.TEXT
});

allmessages.sync()
.then(() => {
    console.log('table has been created');
}, (error) => {
    console.log(`error: ${error,stack}`);
});

module.exports = Messages