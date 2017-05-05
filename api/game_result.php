<?php

define( INPUT_FILE_NAME, '/data/dominion/GameResult.tsv' );

setlocale( LC_ALL, 'ja_JP.UTF-8' );


function ReadGameResult( $dir ) {
  $filePath = $_SERVER['DOCUMENT_ROOT'] . $dir;
  if ( !is_readable( $filePath ) ) { echo $filePath . ' is not readable'; exit; }

  $file = new SplFileObject( $filePath );
  $file->setFlags( SplFileObject::READ_CSV );
  $file->setCsvControl("\t");

  $GameResult = array();
  foreach ( $file as $line ) {
    if ( $file->key() !=1 ) continue;  // discard the first line

    $i = 0;
    $GameResult[] = array(
      'id'                 => $line[$i++],
      'date'               => $line[$i++],
      'place'              => $line[$i++],
      'number_of_players'  => $line[$i++],
      'players'            => array(
        array( 'name' => $line[$i++], 'VP' => $line[$i++], 'less_turns' => $line[$i++], 'rank' => $line[$i++], 'score' => $line[$i++] ),
        array( 'name' => $line[$i++], 'VP' => $line[$i++], 'less_turns' => $line[$i++], 'rank' => $line[$i++], 'score' => $line[$i++] ),
        array( 'name' => $line[$i++], 'VP' => $line[$i++], 'less_turns' => $line[$i++], 'rank' => $line[$i++], 'score' => $line[$i++] ),
        array( 'name' => $line[$i++], 'VP' => $line[$i++], 'less_turns' => $line[$i++], 'rank' => $line[$i++], 'score' => $line[$i++] ),
        array( 'name' => $line[$i++], 'VP' => $line[$i++], 'less_turns' => $line[$i++], 'rank' => $line[$i++], 'score' => $line[$i++] ),
        array( 'name' => $line[$i++], 'VP' => $line[$i++], 'less_turns' => $line[$i++], 'rank' => $line[$i++], 'score' => $line[$i++] )
      ),
      'memo'               => $line[$i++],
      'used_sets'          => array(
        $line[$i++], $line[$i++], $line[$i++], $line[$i++], $line[$i++],
        $line[$i++], $line[$i++], $line[$i++], $line[$i++], $line[$i++],
        $line[$i++], $line[$i++], $line[$i++], $line[$i++], $line[$i++],
        $line[$i++], $line[$i++], $line[$i++], $line[$i++], $line[$i++]
      ),
      'used_card_IDs'      => array(
        'KingdomCards' => array(
          $line[$i++], $line[$i++], $line[$i++], $line[$i++], $line[$i++],
          $line[$i++], $line[$i++], $line[$i++], $line[$i++], $line[$i++]
        ),
        'Prosperity'   => $line[$i++],
        'DarkAges'     => $line[$i++],
        'BaneCard'     => $line[$i++],
        'EventCards'   => array( $line[$i++], $line[$i++] ),
        'Obelisk'      => $line[$i++],
        'Landmark'     => array( $line[$i++], $line[$i++] ),
        'BlackMarket'  => array(
          $line[$i++], $line[$i++], $line[$i++], $line[$i++], $line[$i++],
          $line[$i++], $line[$i++], $line[$i++], $line[$i++], $line[$i++],
          $line[$i++], $line[$i++], $line[$i++], $line[$i++], $line[$i++]
        )
      )
    );
  }

  return $GameResult;


}



function returnJson( $resultArray ) {
  if ( array_key_exists( 'callback', $_GET ) ) {
    $json = $_GET['callback'] . "(" . json_encode( $resultArray ) . ");";
  } else {
    $json = json_encode( $resultArray );
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
