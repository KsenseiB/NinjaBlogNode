const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog')

//express app
const app = express();

//connect to mongoDB
const dbURI = 'mongodb+srv://ksensei:Kseninja@whatsacluster.4lyvo.mongodb.net/NinjaNode?retryWrites=true&w=majority';
// this is an asyncronous task so we can use .then on it with a callback function
mongoose.connect(dbURI)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err))

//register view engine, needs to be after weve created the express app. ejs is going to look at its default folder named 'views'
app.set('view engine', 'ejs');
// If I want to set a folder with a different name I need to set it like so:, the second argument is the folder where ill be keeping my views
//      app.set('views', 'myviews')

// listen for requests. We dont want our server to be listening for requests until the connection in mongoose.connect() is made thats why we use it there^ 
// app.listen(3000);

//middleware & static files: we give the name of the folder we declare as static which will contain css
app.use(express.static('public'));

// HTTP request logger middleware for node.js, logs in terminal, lots of options for morgan('x') in the npm morgan page
app.use(morgan('dev'));


//mogoose and mongo sandbox routes
//the GET handler is going to respond to requests to /add-blog and this is used to add a blog to the collection
app.get('/add-blog', (req, res) =>
{
    const blog = new Blog({
        title: 'new blog5',
        snippet: 'about my new blog',
        body: 'more about my awesome blog'
    });
    blog.save()
        .then((result) =>
        {
            res.send(result)
        })
        .catch((err) =>
        {
            console.log(err);
        });
});

// to get all the blogs from the collection we do another handler /hich for all blogs will fire a callback func.
app.get('/all-blogs', (req, res) =>
{
    Blog.find()
        .then((result) =>
        {
            res.send(result);
        })
        .catch((err) =>
        {
            console.log(err)
        })
});
 app.get('/single-blog', (req, res) =>
 {
     Blog.findById('HERE PLACE THE ID FROM MONGO ATLAS SITE')
         .then((result) =>
         {
             res.send(result)
         })
         .catch((err) =>
         {
             console.log(err)
         })
 })

//  Basic routes
app.get('/', (req, res) =>
{
    // I want to display on the homepage dynamic data like an array of blogs. 
    const blogs = [
        { title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur' },
        { title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur' },
        { title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur' },
    ];

    // Express is going to look inside its default folder views find the file index and the ejs view engine will render it and send to the browser
    // to pass  data from the handler to a view i.e. a dynamic value we just write it in the second parameter in the render method as an object with the property we want to add/change
    res.render('index', { title: 'Home', blogs: blogs });
});

app.get('/about', (req, res) =>
{

    res.render('about', { title: 'About' });
});

// Blog routes 
app.get('/blogs/create', (req, res) =>
{
    res.render('create', { title: 'Create' });
})

app.use((req, res) =>
{
    res.status(404).render('404', { title: 'Not today' });
})