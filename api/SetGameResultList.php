<?php

define( OUTPUT_FILE_PATH, './test.json' );
// define( OUTPUT_FILE_PATH, '../data/dominion/GameResult.tsv' );

setlocale( LC_ALL, 'ja_JP.UTF-8' );

/* 書き込みモードでファイルをオープンします */
$output_file_handler = fopen( OUTPUT_FILE_PATH, "w");

$json_string = file_get_contents('php://input');

fwrite( $output_file_handler, $json_string );

/* ストリームを閉じます */
fclose($output_file_handler);

