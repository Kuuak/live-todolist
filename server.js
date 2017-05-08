// Express & socket.io
const express	= require( 'express' );
const app			= express();
const server	= require( 'http' ).Server( app );
const io			= require( 'socket.io' )( server );

// Helpers
const ent			= require( 'ent' );
const isNull	= require( 'lodash.isnull' );
const isEmpty	= require( 'lodash.isempty' );

app
	// Set up the static folder
	.use( express.static( __dirname +'/public' ) )

	// Serve the html file on root request
	.get( '/', (req, res) => {
		res.sendFile( __dirname +'/public/index.html' );
	} )

	// redirect to root for any route requested
	.use( (req, res) => res.redirect('/') );


// Listen to WebSocket connections
io.on( 'connection', socket => {
	console.log( 'New connection' );
} );


// start server
server.listen( 8080 );
