<?php

define( INPUT_FILE_PATH, 'PlayersNameList.tsv' );

setlocale( LC_ALL, 'ja_JP.UTF-8' );

include './returnJson.php';



function ReadPlayersNameList( $filePath ) {
    if ( !is_readable( $filePath ) ) { echo $filePath . ' is not readable'; exit; }

    $file = new SplFileObject( $filePath );
    $file->setFlags( SplFileObject::READ_CSV );
    $file->setCsvControl("\t");

    $PlayersNameList = array();
    foreach ( $file as $line ) {
        // if ( count( $line ) == 0 ) continue;
        // if ( $line == "" ) continue;
        // $PlayersNameList[] = preg_replace( '~[\r\n]+~', '', $line );
        $PlayersNameList[] = array(
            'name'      => $line[0],
            'name_yomi' => $line[1],
        );
    }
    return $PlayersNameList;
}



// 値の取得（リクエストの受付）
// $type = $_REQUEST['user_type'];

try {
    $PlayersNameList = ReadPlayersNameList( INPUT_FILE_PATH );

    if ( empty( $PlayersNameList ) ) {
        header("HTTP/1.1 404 Not Found");
        exit(0);
    }

    // 返却値の作成
    $result = array( 'data' => $PlayersNameList );
    // JSONでレスポンスを返す
    returnJson( $result );

} catch ( RuntimeException $e ) {
    header("HTTP/1.1 400 Bad Reques");
    exit(0);
} catch ( Exception $e ) {
    header("HTTP/1.1 500 Internal Server Error");
    exit(0);
}
