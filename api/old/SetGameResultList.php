<?php

define( OUTPUT_FILE_PATH, './GameResultList.json' );
setlocale( LC_ALL, 'ja_JP.UTF-8' );

$json_string = file_get_contents('php://input');

$output_file_handler = fopen( OUTPUT_FILE_PATH, "w");
fwrite( $output_file_handler, $json_string );
fclose($output_file_handler);  /* ストリームを閉じる */
