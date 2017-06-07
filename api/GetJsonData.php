<?php

setlocale( LC_ALL, 'ja_JP.UTF-8' );


function returnJson( $result ) {
  if ( array_key_exists( 'callback', $_GET ) ) {
    $json = $_GET['callback'] . "(" . json_encode( $result ) . ");";
  } else {
    $json = json_encode( $result );
  }

  // header('Access-Control-Allow-Origin: http://localhost:4200');
  header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
  header('Content-Type: application/json; charset=UTF-8');
  // header('Content-Type: text/html; charset=utf-8');
  echo  $json;
  exit(0);
}



//  値の取得（リクエストの受付）
$targetFileName = $_REQUEST['targetFileName'];

try {
    $json_string = file_get_contents( $targetFileName );
    $data = json_decode( $json_string );

    if ( empty( $data ) ) {
        header("HTTP/1.1 404 Not Found");
        exit(0);
    }

    $result = array( 'data' => $data );  // 返却値の作成
    returnJson( $result );  // JSONでレスポンスを返す
} catch ( RuntimeException $e ) {
    header("HTTP/1.1 400 Bad Reques");
    exit(0);
} catch ( Exception $e ) {
    header("HTTP/1.1 500 Internal Server Error");
    exit(0);
}



// memo
// json_encode options : JSON_PRETTY_PRINT,  JSON_UNESCAPED_UNICODE
// JSON_PRETTY_PRINT はdump確認のため
