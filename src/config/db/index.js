const mongoose = require('mongoose');

async function connect() {
    try {
        mongoose.connect('mongodb://127.0.0.1:27017/edu_dev');
        console.log('Connected Successfully!!!');
    } catch (error) {
        console.log('Error connecting');
    }
}

module.exports = {connect};