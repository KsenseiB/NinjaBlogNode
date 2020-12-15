const mongoose = require('mongoose');
// Schema is the thing that is going to define the structure of the documents that we're gonna later store inside a collection, it's the thing that a model wraps around.
// .Schema is a cunstructor function -> we use it to make new schemas
const Schema = mongoose.Schema;

// 1. Make a schema which defines the structure:
const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    } // timestamp generates time stamp properties
}, { timestamps: true });

// the name in model('') is important because it's going to look at this name, pluralize it and then look for that collection inside the database whenever we use this model in the future to communicate with the database. 2nd argument is what type of objects are we going to store inside the collection
// 2. then we create a model based on that schema:
const Blog = mongoose.model('Blog', blogSchema);

//need to export 
module.exports = Blog;