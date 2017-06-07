<?php

define( INPUT_FILE_PATH, 'GameResultList.tsv' );
// define( INPUT_FILE_PATH, 'gr_out.tsv' );

setlocale( LC_ALL, 'ja_JP.UTF-8' );

include './returnJson.php';



function ReformLine( $line, $line_no ) {
  $it = 0;

  $GameResult = array(
    'no'                   => intval( $line_no     ),
    'id'                   => intval( $line[$it++] ),
    'date'                 =>         $line[$it++]  ,
    'place'                =>         $line[$it++]  ,
    'numberOfPlayers'      => intval( $line[$it++] ),
    'players'              => array(),
    'memo'                 => "",
    'selectedDominionSets' => array(),
    'usedCardIDs'          => array(
      'KingdomCards'        => array(),
      'Prosperity'          => false,
      'DarkAges'            => false,
      'BaneCard'            => array(),
      'EventCards'          => array(),
      'Obelisk'             => array(),
      'Landmark'            => array(),
      'BlackMarket'         => array(),
    ),
  );

  for ( $i = 0; $i < $GameResult['numberOfPlayers']; $i++ ) {
    $GameResult['players'][] = array(
      'name'      =>         $line[$it++] ,
      'VP'        => intval( $line[$it++] ),
      'lessTurns' =>       ( $line[$it++] == "true" ),
      'rank'      => intval( $line[$it++] ),
      'score'     => intval( $line[$it++] )
      );
  }
  $it += (6 - $GameResult['numberOfPlayers']) * 5;

  $GameResult['memo'] = $line[$it++];
  for ( $i = 0; $i < 20; $i++ ) {
      $GameResult['selectedDominionSets'][] = ( $line[$it++] == "true" );
  }
  for ( $i = 0; $i < 10; $i++ ) {
    $GameResult['usedCardIDs']['KingdomCards'][] = $line[$it++];
  }
  $GameResult['usedCardIDs']['Prosperity']  = ( $line[$it++] == "true" );
  $GameResult['usedCardIDs']['DarkAges']    = ( $line[$it++] == "true" );
  $GameResult['usedCardIDs']['BaneCard']    = array( $line[$it++] );
  $GameResult['usedCardIDs']['EventCards']  = array( $line[$it++], $line[$it++] );
  $GameResult['usedCardIDs']['Obelisk']     = array( $line[$it++] );
  $GameResult['usedCardIDs']['Landmark']    = array( $line[$it++], $line[$it++] );
  for ( $i = 0; $i < 15; $i++ ) {
    $GameResult['usedCardIDs']['BlackMarket'][] = $line[$it++];
  }

  return $GameResult;
}


function ReadGameResult( $filePath ) {
  // $filePath = $_SERVER['DOCUMENT_ROOT'] . $dir;
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



//  値の取得（リクエストの受付）
// $type = $_REQUEST['user_type'];

try {
  $GameResult = ReadGameResult( INPUT_FILE_PATH );

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
