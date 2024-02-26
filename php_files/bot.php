<?php

$input_data = file_get_contents('php://input');

$input = json_decode($input_data,true);

$message = $input['message'];

$url = 'https://smart-agent-l-6qt7febroq-uc.a.run.app/chat/invoke';
$curl = curl_init();
$fields = array(
    'input' => ['input'=>$message],
    'config' => ['configurable'=>['session_id'=>'ec1a7da5-b325-4f08-8b9f-fc70aad1cace']]
);
$json_string = json_encode($fields);
curl_setopt($curl, CURLOPT_URL, $url);
curl_setopt($curl, CURLOPT_POST, TRUE);
curl_setopt($curl, CURLOPT_POSTFIELDS, $json_string);
curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true );
$data = curl_exec($curl);
curl_close($curl);

echo $data;

?>