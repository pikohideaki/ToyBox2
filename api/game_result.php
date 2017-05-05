<?php

define( INPUT_FILE_NAME, '/data/dominion/GameResult.tsv' );

setlocale( LC_ALL, 'ja_JP.UTF-8' );




function ReformLine( $line, $line_no ) {
  $it = 0;

  $GameResult = array(
    'no' => $line_no,
    'id' => $line[$it++],
    'date' => $line[$it++],
    'place' => $line[$it++],
    'number_of_players' => $line[$it++],
    'players' => array(),
    'memo' => 0,
    'used_sets' => array(),
    'used_card_IDs' => array(
      'KingdomCards' => array(),
      'Prosperity' => 0,
      'DarkAges' => 0,
      'BaneCard' => 0,
      'EventCards' => array(),
      'Obelisk' => 0,
      'Landmark' => array(),
      'BlackMarket' => array(),
    ),
  );

  for ( $i = 0; $i < $GameResult['number_of_players']; $i++ ) {
    $GameResult['players'][] = array(
      'name'       => $line[$it++],
      'VP'         => $line[$it++],
      'less_turns' => $line[$it++],
      'rank'       => $line[$it++],
      'score'      => $line[$it++] );
  }
  $it += (6 - $GameResult['number_of_players']) * 5;

  $GameResult['memo'] = $line[$it++];
  for ( $i = 0; $i < 20; $i++ ) {
      $GameResult['used_sets'][] = $line[$it++];
  }
  for ( $i = 0; $i < 10; $i++ ) {
    $GameResult['used_card_IDs']['KingdomCards'][] = $line[$it++];
  }
  $GameResult['used_card_IDs']['Prosperity']  = $line[$it++];
  $GameResult['used_card_IDs']['DarkAges']    = $line[$it++];
  $GameResult['used_card_IDs']['BaneCard']    = $line[$it++];
  $GameResult['used_card_IDs']['EventCards']  = array( $line[$it++], $line[$it++] );
  $GameResult['used_card_IDs']['Obelisk']     = $line[$it++];
  $GameResult['used_card_IDs']['Landmark']    = array( $line[$it++], $line[$it++] );
  for ( $i = 0; $i < 15; $i++ ) {
    $GameResult['used_card_IDs']['BlackMarket'][] = $line[$it++];
  }

  return $GameResult;
}


function ReadGameResult( $dir ) {
  $filePath = $_SERVER['DOCUMENT_ROOT'] . $dir;
  if ( !is_readable( $filePath ) ) { echo $filePath . ' is not readable'; exit; }

  $file = new SplFileObject( $filePath );
  $file->setFlags( SplFileObject::READ_CSV );
  $file->setCsvControl("\t");

  $GameResult = array();
  $line_no = 1;
  foreach ( $file as $line ) {
    // if ( $file->key() == 0 ) continue;  // discard the first line
    $GameResult[] = ReformLine( $line, $line_no++ );
  }

  return $GameResult;


}



function returnJson( $resultArray ) {
  if ( array_key_exists( 'callback', $_GET ) ) {
    $json = $_GET['callback'] . "(" . json_encode( $resultArray, JSON_PRETTY_PRINT ) . ");";
  } else {
    $json = json_encode( $resultArray, JSON_PRETTY_PRINT );
  }

  header('Access-Control-Allow-Origin: http://localhost:4200');
  header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
  header('Content-Type: application/json; charset=UTF-8');
  // header('Content-Type: text/html; charset=utf-8');
  echo  $json;
  exit(0);
}


//  値の取得（リクエストの受付）
// $type = $_REQUEST['user_type'];

try {
  $GameResult = ReadGameResult( INPUT_FILE_NAME );

  if ( empty( $GameResult ) ) {
    header("HTTP/1.1 404 Not Found");
    exit(0);
  }

  //  返却値の作成
  $result = array( 'data' => $GameResult );
  //  JSONでレスポンスを返す
  returnJson( $result );

} catch ( RuntimeException $e ) {
  header("HTTP/1.1 400 Bad Reques");
  exit(0);
} catch ( Exception $e ) {
  header("HTTP/1.1 500 Internal Server Error");
  exit(0);
}
