<?php

setlocale( LC_ALL, 'ja_JP.UTF-8' );

$targetFileName = $_REQUEST['targetFileName'];

$json_string = file_get_contents('php://input');

$output_file_handler = fopen( $targetFileName, "w");
fwrite( $output_file_handler, $json_string );
fclose($output_file_handler);