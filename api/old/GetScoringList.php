<?php

define( INPUT_FILE_PATH, 'ScoringList.tsv' );

setlocale( LC_ALL, 'ja_JP.UTF-8' );

include './returnJson.php';


/*
得点計算は， 4人以上の場合は公式に従い， 1位6点、2位3点、3位1点、4位以下0点というようにしています． 2，3人のときは平均点が(6+3+1+0)/4=2.5と同じになるように最下位が0点としてそれぞれ設定しました．
*/


function ReadScoringList( $filePath ) {
    if ( !is_readable( $filePath ) ) { echo $filePath . ' is not readable'; exit; }

    $file = new SplFileObject( $filePath );
    $file->setFlags( SplFileObject::READ_CSV );
    $file->setCsvControl("\t");

    $ScoringList = array();
    foreach ( $file as $line ) {
        $ScoringList[] = array_map( function($e) { return floatval($e); }, $line );
    }

    return $ScoringList;
}



//  値の取得（リクエストの受付）
// $type = $_REQUEST['user_type'];

try {
  $ScoringList = ReadScoringList( INPUT_FILE_PATH );

  if ( empty( $ScoringList ) ) {
    header("HTTP/1.1 404 Not Found");
    exit(0);
  }

  //  返却値の作成
  $result = array( 'data' => $ScoringList );
  //  JSONでレスポンスを返す
  returnJson( $result );

} catch ( RuntimeException $e ) {
  header("HTTP/1.1 400 Bad Reques");
  exit(0);
} catch ( Exception $e ) {
  header("HTTP/1.1 500 Internal Server Error");
  exit(0);
}
