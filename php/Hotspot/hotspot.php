<?php
require '../constants.php';

/*****************CREATE CRUD****************/

class Hotspot{
const NAME_PROJECT = 'TERQUIMSA';
/**CREATE HOSTPOT**/
// public function createHotspot($listHostpots){

//     $conn = connection();

//     $project = self::NAME_PROJECT;
//     $scene = $listHostpots['scene'];
//     $name = $listHostpots[$i]['name'];
//     $title = $listHostpots[$i]['title'];
//     $message = $listHostpots[$i]['message'];
//     $icon = $listHostpots[$i]['icon'];
//     $image = $listHostpots[$i]['image'];
//     $video = $listHostpots[$i]['video'];
//     $type = $listHostpots[$i]['type'];
//     $link = $listHostpots[$i]['link'];
//     $coordinate_x = $listHostpots[$i]['coordinate_x'];
//     $coordinate_y = $listHostpots[$i]['coordinate_y'];

//     $sql = "INSERT INTO  `hotspots` (`project`,`scene`,`name`, `title`, `message`, `icon`, `image`, `video`,`type`,`link`,`coordinate_x`, `coordinate_y`)
//     VALUES ('".$project."','".$scene."','".$name."','".$title."','".$message."','".$icon."',
//     '".$image."','".$video."','".$type."','".$link."',".$coordinate_x.",".$coordinate_y.")";
 
//             if($conn->query($sql) === TRUE) {
//             // echo '<br>New Hotspot created successfully<br>';
//             return true;
//             }else{
//             return 'Error: ' .$sql . '<br>' .$conn->error;
//             }
//         $conn->close();
//     }

public function createListHotspots($listHostpots){

    $list = [];
    $conn = connection();

    for($i = 0; $i < sizeof($listHostpots); $i++){
        $project = self::NAME_PROJECT;
        $scene = $listHostpots[$i]['scene'];
        $name = $listHostpots[$i]['name'];
        $title = $listHostpots[$i]['title'];
        $message = $listHostpots[$i]['message'];
        $icon = $listHostpots[$i]['icon'];
        $image = $listHostpots[$i]['image'];
        $video = $listHostpots[$i]['video'];
        $type = $listHostpots[$i]['type'];
        $link = $listHostpots[$i]['link'];
        $coordinate_x = $listHostpots[$i]['coordinate_x'];
        $coordinate_y = $listHostpots[$i]['coordinate_y'];
        $scale = $listHostpots[$i]['scale'];

        $sql = 'INSERT INTO  `hotspots` (`project`,`scene`,`name`, `title`, `message`, `icon`, `image`, `video`,`type`,`link`,`coordinate_x`, `coordinate_y`, `scale`)
        VALUES ("'.$project.'","'.$scene.'","'.$name.'","'.$title.'","'.$message.'","'.$icon.'",
        "'.$image.'","'.$video.'","'.$type.'","'.$link.'",'.$coordinate_x.','.$coordinate_y.','.$scale.')';

        if($conn->query($sql) === TRUE) {
        // echo '<br>New Hotspot created successfully<br>';
        array_push($list, $i+1);
        }else{
        return 'Error: ' .$sql . '<br>' .$conn->error;
        }
    }
    return $list;
    $conn->close(); 
}
/**DELETE HOSTPOT**/
public function deleteHotspot($hotspot){

    $conn = connection();

    $sql = 'DELETE FROM `hotspots` WHERE `id` = "'.$hotspot['id'].'"';

            if($conn->query($sql) === TRUE){
                 echo "<br>Record deleted successfully";
            }else{
                 echo "<br>Error deleting record: " .$conn->error;
            }
    $conn->close();
}

/**GET ALL HOTSPOTS**/
public function getAllHotspots(){

    $conn = connection();

    $listHostpots = [];

    $sql = 'SELECT * FROM `hotspots` WHERE project="TERQUIMSA"';
    $result = $conn->query($sql);
            if($result->num_rows>0){
                while($row = $result->fetch_assoc()){
                    array_push($listHostpots, $row);
                }
            }
        $conn->close(); 
        return $listHostpots;
}

/**UPDATE HOTSPOTS BY NAME**/
public function updateHotspotByName($listHostpots){

    $conn = connection(); 
    $updated = false;

    for($i = 0; $i < sizeof($listHostpots); $i++){

        $project = self::NAME_PROJECT;
        $name = $listHostpots[$i]['name'];
        $coordinate_x = $listHostpots[$i]['coordinate_x'];
        $coordinate_y = $listHostpots[$i]['coordinate_y'];

    $sql = 'UPDATE `hotspots` SET `coordinate_x` = '.$coordinate_x.' , `coordinate_y` = '.$coordinate_y.'
             WHERE `name` = "'.$name.'" AND `project` = "'.$project.'"';
             if($conn->query($sql) === TRUE){
                $updated = true;
           }else{
                return "Error deleting record: " .$conn->error;
           }
    }
        $conn->close();
        return $updated;
    }
}