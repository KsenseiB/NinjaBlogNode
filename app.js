const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

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

//middleware & static files
//we give the name of the folder we declare as static which will contain css
app.use(express.static('public'));
//urlencoded method takes all the URL encoded data from the form submmitted and passes it into an object that we can use on the request object. Is NECESSARY to be able to get the data sent from the form otherwise it will be undefined.
app.use(express.urlencoded({ extended: true }));
// HTTP request logger middleware for node.js, logs in terminal, lots of options for morgan('x') in the npm morgan page
app.use(morgan('dev'));

// basic routes
app.get('/', (req, res) =>
{
    res.redirect('/blogs');

});

app.get('/about', (req, res) =>
{
    res.render('about', { title: 'About' });
});

// blog routes
//the middleware will look at the blogRoutes file at all the router.x and apply all of those handlers to the 'app'
app.use('/blogs', blogRoutes);

//404 page
app.use((req, res) =>
{
    res.status(404).render('404', { title: 'Not today' });
});