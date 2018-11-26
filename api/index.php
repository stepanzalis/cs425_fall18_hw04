<?php
	// Headers
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');
	
	// Welcome Msg
	echo json_encode(
		array('message' => 'Welcome to the API')
	);
?>