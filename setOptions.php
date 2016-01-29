<?php
include('base.php');
    //nom de la table (id , class)
    $table=$_GET["table"];
    //valeur entrée par l'utilisateur
    $value_in=$_GET["value"];
    //script d'insertion en base INSERT INTO..

$base->exec('INSERT INTO produit (droit) values ("'.$value_in.'")') or die(print_r($base->errorInfo())); 
$response = $base->query('SELECT droit,id FROM produit ORDER BY id ASC') or die(print_r($base->errorInfo())); 
 
$uniq=new Array();
    while($data = $response->fetch() ) 
  {
        if(in_array($data["droit"],$uniq)){
            continue;
        }
        $uniq[]=$data['droit'];
      echo "<option value=\"".$data["id"]."\"".($data["droit"]===$value_in?"selected":"").">".$data["droit"]."</option>";
  }
?>
