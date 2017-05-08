if ( typeof io !== undefined ) {
// avoid undefined io exception in case of socket.io is not initialized

	const socket = io.connect( 'http://localhost:8080' );

	const taskList			= document.getElementById( 'tasks' );
	const taskForm			= document.getElementById( 'taskForm' );
	const taskNameInput	= taskForm.querySelector( '.task-name' );

	// Listen for the updateTasks event,
	// and update the entire list when triggered
	socket.on( 'updateTasks', tasks => {

		if ( ! Array.isArray( tasks ) ) {
			// Do not continue if tasks is not an array
			return;
		}

		// Build an array with each task in HTML
		let tasks_html = Array();
		tasks.forEach( (task, index) => {
			tasks_html.push(
				'<li>' +
					'<a href="/task/remove/'+ index +'" rel="'+ index +'">✘</a>' +
					task +
				'</li>'
			);
		} );

		// Add the tasks to the HTML
		taskList.innerHTML = tasks_html.join( "\n" );
	} );

	taskForm.addEventListener( 'submit', event => {
		event.preventDefault();

		// Send the new task
		socket.emit( 'addTask', taskNameInput.value );

		// Clear the field
		taskNameInput.value = "";
	} );

	taskList.addEventListener( 'click', event => {

		// Event delegation, only perform action when the <a> is clicked
		if ( event.target && event.target.tagName === 'A' ) {
			event.preventDefault();

			// Send the index of the task to remove
			socket.emit( 'removeTask', event.target.rel );
		}

	} );
}
