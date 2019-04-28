<?php

$challenge = isset($_REQUEST['hub_challenge']) ? $_REQUEST['hub_challenge'] : "";

$verify_token = isset($_REQUEST['hub_verify_token']) ? $_REQUEST['hub_verify_token'] : "";

if ($verify_token == 'testtoken') {
	echo $challenge;
}

$data = file_get_contents('php://input');

//$data = '{"entry": [{"changes": [{"field": "feed", "value": {"item": "like", "verb": "add"}}], "id": "216046745080249", "time": 1556292665}], "object": "page"}';
$isLike  = json_decode($data);
$isLike = $isLike->entry[0]->changes[0]->value->item;

if($isLike == 'like'){
	require_once ('variables.php');

	$curl = curl_init();
	curl_setopt($curl, CURLOPT_URL, $url);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($curl, CURLOPT_HEADER, false);
	$curlData = curl_exec($curl);
	curl_close($curl);

	file_put_contents('tester.txt', $curlData);
	file_put_contents('likeCounter.json',$curlData);
}
else{
	file_put_contents('tester.txt', $data);
}

http_response_code(200);

?>