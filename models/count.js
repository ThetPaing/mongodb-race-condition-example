const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CountSchema = new Schema({
    
    count: { type: Number },
},
    {
        timestamps: true,
    });
module.exports = mongoose.model('count', CountSchema, 'counts');