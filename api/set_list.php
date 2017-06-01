<?php

define( INPUT_FILE_PATH, '../data/dominion/SetNameList.tsv' );

setlocale( LC_ALL, 'ja_JP.UTF-8' );

include './returnJson.php';



function ReadSetNameList( $filePath ) {
    if ( !is_readable( $filePath ) ) { echo $filePath . ' is not readable'; exit; }

    $file = new SplFileObject( $filePath );
    // $file->setFlags( SplFileObject::READ_CSV );
    // $file->setCsvControl("\t");

    $SetNameList = array();
    foreach ( $file as $line ) {
        // if ( count( $line ) == 0 ) continue;
        if ( $line == "" ) continue;
        $SetNameList[] = $line;
    }
    return $SetNameList;
}



// 値の取得（リクエストの受付）
// $type = $_REQUEST['user_type'];

try {
    $SetNameList = ReadSetNameList( INPUT_FILE_PATH );

    if ( empty( $SetNameList ) ) {
        header("HTTP/1.1 404 Not Found");
        exit(0);
    }

    // 返却値の作成
    $result = array( 'data' => $SetNameList );
    // JSONでレスポンスを返す
    returnJson( $result );

} catch ( RuntimeException $e ) {
    header("HTTP/1.1 400 Bad Reques");
    exit(0);
} catch ( Exception $e ) {
    header("HTTP/1.1 500 Internal Server Error");
    exit(0);
}
