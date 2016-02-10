<?php
include('base.php');
if(isset($_GET["table"])){
    $table=$_GET["table"];
    switch($table){
        case "table1_":
            $key="name";
            $id="name_id";
        break;
        default:
            die("<option>Error</option>");
        break;
        }
}
if(isset($_GET["value"])){
    $value_in=$_GET["value"];
    $base->exec("INSERT INTO $table ($key) values (\"".$value_in."\")") or die(print_r($base->errorInfo())); 
}else{
    $value_in="default_value";
}
$response = $base->query("SELECT $id,$key FROM $table ORDER BY $id ASC") or die(print_r($base->errorInfo())); 
$uniq=Array();
while($data = $response->fetch() ) 
{
    if(in_array($data[$key],$uniq)){
        continue;
    }
    $uniq[]=$data[$key];
    echo "<option value=\"".$data[$id]."\"".($data[$key]==$value_in?"selected":"").">".$data[$key]."</option>";
}
?>