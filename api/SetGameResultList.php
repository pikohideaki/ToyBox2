<?php

define( OUTPUT_FILE_PATH, './test.tsv' );
// define( OUTPUT_FILE_PATH, '../data/dominion/GameResult.tsv' );

setlocale( LC_ALL, 'ja_JP.UTF-8' );



/* 書き込みモードでファイルをオープンします */
$output_file_handler = fopen( OUTPUT_FILE_PATH, "w");


$json_string = file_get_contents('php://input');
$GameResultList = json_decode( $json_string );

// $json = '["a":"1","b":"2","c":"3","d":"4","e":"5"]';
// $json = '[1,2,3,4,5,6]';
// $json = '[{"a":1,"b":2}, {"a":3,"b":4}]';
// $test_list = json_decode( $json );

$GameResultList_TSV = "";

// foreach ( $test_list as $value ) {
foreach ( $GameResultList as $gr ) {
    $tsv_line_buf = "";


    { /* make tsv line string in $tsv_line_buf */
        $tsv_line_buf .= (
                         $gr->id
                . "\t" . $gr->date
                . "\t" . $gr->place
                . "\t" . $gr->number_of_players
            );

        foreach ( $gr->players as $pl ) {
            $tsv_line_buf .= (
                  "\t" . $pl->name
                . "\t" . $pl->VP
                . "\t" . $pl->lessTurns
                . "\t" . $pl->rank
                . "\t" . $pl->score
            );
        }
        $tsv_line_buf .= str_repeat( "\t", 5 * ( 6 - $gr->number_of_players ) );

        $tsv_line_buf .= ("\t" . $value->memo);


        for ( $i = 0; $i < 20; $i++ ) {
            $tsv_line_buf .= ("\t" . $gr->used_sets[$i]);
        }

        $ids = $gr->used_card_IDs;

        for ( $i = 0; $i < 10; $i++ ) {
            $tsv_line_buf .= ("\t" . $ids->KingdomCards[$i]);
        }
        $tsv_line_buf .= (
                  "\t" . $ids->Prosperity
                . "\t" . $ids->DarkAges
                . "\t" . $ids->BaneCard
                . "\t" . $ids->EventCards[0]
                . "\t" . $ids->EventCards[1]
                . "\t" . $ids->Obelisk
                . "\t" . $ids->Landmark[0]
                . "\t" . $ids->Landmark[1]
                );
        for ( $i = 0; $i < 15; $i++ ) {
            $tsv_line_buf .= "\t" . $ids->BlackMarket[$i];
        }
    }

    $GameResultList_TSV .= $tsv_line_buf . "\n";
}

// substr( $GameResultList_TSV, 0, strlen( $GameResultList_TSV ) - 1 );  // 最後の改行を省く
$GameResultList_TSV = rtrim( $GameResultList_TSV );
fwrite( $output_file_handler, $GameResultList_TSV );




/* PUT されたデータは標準入力からやってきます */
// $putdata_handler = fopen("php://input", "r");


// fwrite( $output_file_handler, $json_string );



/* データを 8 KB 単位で読み込み、
   ファイルに書き込みます */
// $json = "";
// while ( $json .= fread($putdata_handler, 8192) ) { }

// $json = mb_convert_encoding( $json, 'UTF8', 'ASCII,JIS,UTF-8,EUC-JP,SJIS-WIN');
// while ($data = fread($putdata, 1024))
//   fwrite($fp, $data);
// $json .= "testestestestestestestestest";

// fwrite( $output_file_handler, $json );





/* ストリームを閉じます */
fclose($output_file_handler);
// fclose($putdata_handler);

