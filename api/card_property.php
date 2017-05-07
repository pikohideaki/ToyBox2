<?php

define( INPUT_FILE_PATH, '../data/dominion/CardList.tsv' );

setlocale( LC_ALL, 'ja_JP.UTF-8' );

include './returnJson.php';



function ReadCardList( $filePath ) {
  // $filePath = $_SERVER['DOCUMENT_ROOT'] . $dir;
  if ( !is_readable( $filePath ) ) { echo $filePath . ' is not readable'; exit; }

  $file = new SplFileObject( $filePath );
  $file->setFlags( SplFileObject::READ_CSV );
  $file->setCsvControl("\t");

  $CardList = array();
  $line_no = 0;
  foreach ( $file as $line ) {
    if ( $file->key() == 0 ) continue;  // discard the first line

    $it = 0;
    $line_no++;
    $CardList[] = array(
      'no'                      => $line_no,
      'card_ID'                 => $line[$it++],
      'name_jp'                 => $line[$it++],
      'name_jp_yomi'            => $line[$it++],
      'name_eng'                => $line[$it++],
      'set_name'                => $line[$it++],
      'cost' => array(
        'coin'   => (integer)( $line[$it++] ),
        'potion' => (integer)( $line[$it++] ),
        'debt'   => (integer)( $line[$it++] ),
      ),
      'category'                => $line[$it++],
      'card_type'               => $line[$it++],
      'VP'                      => (integer)( $line[$it++] ),
      'draw_card'               => (integer)( $line[$it++] ),
      'action'                  => (integer)( $line[$it++] ),
      'buy'                     => (integer)( $line[$it++] ),
      'coin'                    => (integer)( $line[$it++] ),
      'VPtoken'                 => (integer)( $line[$it++] ),
      'effect'                  => $line[$it++],
      'description'             => $line[$it++],
      'recommended_combination' => $line[$it++],
      'memo'                    => $line[$it++],
      'implemented'             => ( $line[$it++] == 'true' ),
    );
  }

  return $CardList;
}




//  値の取得（リクエストの受付）
// $type = $_REQUEST['user_type'];

try {
  $CardInfoList = ReadCardList( INPUT_FILE_PATH );

  if ( empty( $CardInfoList ) ) {
    header("HTTP/1.1 404 Not Found");
    exit(0);
  }

  //  返却値の作成
  $result = array( 'data' => $CardInfoList );
  //  JSONでレスポンスを返す
  returnJson( $result );

} catch ( RuntimeException $e ) {
  header("HTTP/1.1 400 Bad Reques");
  exit(0);
} catch ( Exception $e ) {
  header("HTTP/1.1 500 Internal Server Error");
  exit(0);
}
