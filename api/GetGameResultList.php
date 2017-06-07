<?php

define( INPUT_FILE_PATH, 'test.json' );

setlocale( LC_ALL, 'ja_JP.UTF-8' );

include './returnJson.php';


//  値の取得（リクエストの受付）
// $type = $_REQUEST['user_type'];

try {
//   $GameResult = ReadGameResult( INPUT_FILE_PATH );
    $json_string = file_get_contents( INPUT_FILE_PATH );
    // var_dump( $json_string );
    $GameResultList = json_decode( $json_string );

    if ( empty( $GameResultList ) ) {
        header("HTTP/1.1 404 Not Found");
        exit(0);
    }

    //  返却値の作成
    $result = array( 'data' => $GameResultList );
    //  JSONでレスポンスを返す
    returnJson( $result );

} catch ( RuntimeException $e ) {
    header("HTTP/1.1 400 Bad Reques");
    exit(0);
} catch ( Exception $e ) {
    header("HTTP/1.1 500 Internal Server Error");
    exit(0);
}
