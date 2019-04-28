<?php

require_once ('variables.php');

$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, $url);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_HEADER, false);
$curlData = curl_exec($curl);

//$curlData = json_decode($curlData);
curl_close($curl);

file_put_contents('tester.txt', $curlData);
file_put_contents('likeCounter.json',$curlData);

?>