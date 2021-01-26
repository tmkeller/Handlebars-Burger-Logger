// Include and initialize Express.js
const express = require( "express" );
const app = express();

// Dynamic port for Heroku
const PORT = process.env.PORT || 8080;

// Static content comes from the /public directory.
app.use( express.static( "public" ));

// Middleware to parse application.
app.use( express.urlencoded( { extended: true }));
app.use( express.json());

// Include Handlebars.
const exphbs = require( "express-handlebars" );

app.engine( "handlebars", exphbs({ defaultLayout: "main" }));
app.set( "view engine", "handlebars" );

// Import routes from burgersController and use them.
var routes = require( "./controllers/burgersController.js" );
app.use( routes );

// Start server and log that it's listening for requests.
app.listen( PORT, function() {
    console.log( `Server listening on port ${ PORT }` );
})