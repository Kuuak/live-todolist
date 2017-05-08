// Express & socket.io
const express	= require( 'express' );
const app			= express();
const server	= require( 'http' ).Server( app );
const io			= require( 'socket.io' )( server );

// Helpers
const ent			= require( 'ent' );
const isNull	= require( 'lodash.isnull' );
const isEmpty	= require( 'lodash.isempty' );

// Initialize an empty task list
let tasks = Array();

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

	// Listen to client events
	socket
		.on( 'getTasks', data => {
			// Send the task list to client
			socket.emit( 'updateTasks', tasks );
		} )

		.on( 'addTask', data => {

			if ( isEmpty( data ) ) {
				// avoid adding empty task
				return;
			}

			// Save the new task
			tasks.push( ent(data) );

			// Broadcast the updated task list
			socket.broadcast.emit( 'updateTasks', tasks );

		} )

		.on( 'removeTask', data => {

			if ( isEmpty(data) || isNaN( parseInt( data ) ) ) {
				// avoid removing task if no correct index given
				return;
			}

			// Remove task at the desired index
			tasks.splice( parseInt( data ), 1 );

			// Broadcast the updated task list
			socket.broadcast.emit( 'updateTasks', tasks );
		} );

} );


// start server
server.listen( 8080 );
