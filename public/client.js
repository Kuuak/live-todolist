if ( typeof io === undefined ) {
// avoid undefined io exception in case of socket.io is not initialized

	const socket = io.connect( 'http://localhost:8080' );

}
