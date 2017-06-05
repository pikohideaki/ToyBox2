<?php

// if (Request::is("api/*")) {
//     header("Access-Control-Allow-Origin: *");
//     header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization, If-Modified-Since, Cache-Control, Pragma");
// }


// JSON_PRETTY_PRINT はdump確認のため
function returnJson( $resultArray ) {
//   if ( array_key_exists( 'callback', $_GET ) ) {
//     $json = $_GET['callback'] . "(" . json_encode( $resultArray, JSON_PRETTY_PRINT ) . ");";
//   } else {
//     $json = json_encode( $resultArray, JSON_PRETTY_PRINT );
//   }
  if ( array_key_exists( 'callback', $_GET ) ) {
    $json = $_GET['callback'] . "(" . json_encode( $resultArray ) . ");";
  } else {
    $json = json_encode( $resultArray );
  }

  // header('Access-Control-Allow-Origin: http://localhost:4200');
  header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
  header('Content-Type: application/json; charset=UTF-8');
  // header('Content-Type: text/html; charset=utf-8');
  echo  $json;
  exit(0);
}
