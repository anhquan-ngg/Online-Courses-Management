const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const mongooseDelete = require('mongoose-delete');

const Course = new Schema({
    _id: {type: Number},
    name: {type: String},
    description: {type: String},
    image: {type: String},
    videoID: {type: String},
    level: {type: String},
    slug: {type: String, slug: 'name'},
}, {
    _id: false,
    timestamps: true,
});

// Add plugins
mongoose.plugin(slug);

// AutoIncrement plugin
Course.plugin(AutoIncrement);

Course.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
});

module.exports = mongoose.model('Course', Course);