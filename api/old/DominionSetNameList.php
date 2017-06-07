<?php

define( INPUT_FILE_PATH, 'DominionSetNameList.tsv' );

setlocale( LC_ALL, 'ja_JP.UTF-8' );

include './returnJson.php';



function ReadDominionSetNameList( $filePath ) {
    if ( !is_readable( $filePath ) ) { echo $filePath . ' is not readable'; exit; }

    $file = new SplFileObject( $filePath );
    // $file->setFlags( SplFileObject::READ_CSV );
    // $file->setCsvControl("\t");

    $DominionSetNameList = array();
    foreach ( $file as $line ) {
        // if ( count( $line ) == 0 ) continue;
        if ( $line == "" ) continue;
        $DominionSetNameList[] = preg_replace( '~[\r\n]+~', '', $line );
    }
    return $DominionSetNameList;
}



// 値の取得（リクエストの受付）
// $type = $_REQUEST['user_type'];

try {
    $DominionSetNameList = ReadDominionSetNameList( INPUT_FILE_PATH );

    $json_string = json_encode( $DominionSetNameList, JSON_UNESCAPED_UNICODE );
    $output_file_handler = fopen( "./DominionSetNameList.json", "w");
    fwrite( $output_file_handler, $json_string );
    fclose($output_file_handler);  /* ストリームを閉じる */


    if ( empty( $DominionSetNameList ) ) {
        header("HTTP/1.1 404 Not Found");
        exit(0);
    }

    // 返却値の作成
    $result = array( 'data' => $DominionSetNameList );
    // JSONでレスポンスを返す
    returnJson( $result );

} catch ( RuntimeException $e ) {
    header("HTTP/1.1 400 Bad Reques");
    exit(0);
} catch ( Exception $e ) {
    header("HTTP/1.1 500 Internal Server Error");
    exit(0);
}
