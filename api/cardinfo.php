<?php

setlocale( LC_ALL, 'ja_JP.UTF-8' );

// if (Request::is("api/*")) {
//     header("Access-Control-Allow-Origin: *");
//     header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization, If-Modified-Since, Cache-Control, Pragma");
// }

function ReadCardlist( $DIR ) {
  $IFilename = $_SERVER['DOCUMENT_ROOT'] . $DIR;
  if ( !is_readable( $IFilename ) ) { echo $IFilename . ' is not readable'; exit; }
  $fpd = fopen( $IFilename, 'r' );

  $d = fgetcsv( $fpd, 100000, "\t" );  // 1行目を捨てる
  $Cardlist = array();
  $i = 0;
  while ( $line = fgetcsv( $fpd, 100000, "\t" ) ) {
    $it = 1;
    $Cardlist[$i] = array(
      'name_jp'      => $line[$it++],
      'name_jp_yomi' => $line[$it++],
      'name_eng'     => $line[$it++],
      'set_name'     => $line[$it++],
      'cost_str'     => $line[$it++],
      'cost_coin'    => $line[$it++],
      'cost_potion'  => $line[$it++],
      'cost_debt'    => $line[$it++],
      'category'     => $line[$it++],
      'card_type'    => $line[$it++],
      'VP'           => $line[$it++],
      'draw_card'    => $line[$it++],
      'action'       => $line[$it++],
      'buy'          => $line[$it++],
      'coin'         => $line[$it++],
      'VPtoken'      => $line[$it++],
      'effect1'      => $line[$it++],
      'effect2'      => $line[$it++],
      'effect3'      => $line[$it++],
      'effect4'      => $line[$it++],
      'implemented'  => $line[$it++]
    );
    $i++;
  }
  fclose( $fpd );
  return $Cardlist;
}


/**
 * 結果をjsonで返却する
 *
 * @param  array resultArray 返却値
 * @return string jsonで表現されたレスポンス
 * @author kobayashi
 **/
function returnJson( $resultArray ) {
  if ( array_key_exists( 'callback', $_GET ) ) {
    $json = $_GET['callback'] . "(" . json_encode($resultArray) . ");";
  } else {
    $json = json_encode($resultArray);
  }

  header('Access-Control-Allow-Origin: http://localhost:4200');
  header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
  header('Content-Type: application/json; charset=UTF-8');
  // header('Content-Type: text/html; charset=utf-8');
  echo  $json;
  exit(0);
}



/**
 * ユーザの一覧をjsonで返す
 *
 * @param string user_type  a,admin,o,operatorg,guest,のいずれか
 * @return array
 *          string result   OK,NG
 *          array  users   成功時のみ。ユーザリスト
 *              string name ユーザ名
 *              int age 年齢
 *          string message  失敗時のみ。エラーメッセージ
 *
 * @author kobayashi
 **/
//---------------------------------------------------------
//  処理の開始
//---------------------------------------------------------
//  値の取得（リクエストの受付）
// $type = $_REQUEST['user_type'];

try {
  //  read CardList.tsv
  
  $CardInfoList = ReadCardlist('/data/dominion/Cardlist.tsv');

  // $CardInfoList = [
  //   ['id' => 11, 'name' => 'aaaaa'],
  //   ['id' => 12, 'name' => 'bbbbb'],
  //   ['id' => 13, 'name' => 'ccccc'],
  // ];

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
