<?php
include 'constants.php';
class consultarLogin{
	function verificarLogin($dataLogin){
		$usuario= $dataLogin['usuario'];
		$contrasena= $dataLogin['contrasena'];
		$query = 'SELECT pwd FROM general WHERE matricula="'.$usuario.'"';
		$result = mysqli_query(connection(), $query); 
		if(!connection()){
		    echo json_encode("No connection to DB");
		} else { 
			if($result->num_rows > 0){
				while ($row = mysqli_fetch_assoc($result)){			
					$password_hash = $row['pwd'];
					if(password_verify($contrasena, $password_hash)){
					return true;
					} else {
					return false;
					}
				}
			} else {
				return false;
			}
		}
		
	}
	// function verificarLogin($dataLogin){
	// 	$usuario= $dataLogin['usuario'];
	// 	$contrasena= $dataLogin['contrasena'];
	// 	$query = 'SELECT DISTINCT(username), pwd FROM credentials WHERE username="'.$usuario.'" AND pwd="'.$contrasena.'"';
	// 	$result = mysqli_query(connection(), $query);
	// 	if(!connection()){
	// 	    echo json_encode("No connection to DB");
	// 	} else {
	// 	    $data = array();
	// 	    while ($row = mysqli_fetch_assoc($result))
	// 	    {
	// 	        array_push($data, $row);
	// 	    }  

	// 	    // echo json_encode($data);
	// 	}
			
	// 	return json_encode($data);
	// }

	function updateAptoIV($para) {   
        $query = 'UPDATE `general` SET `apto_vid`=1 WHERE `matricula`="'.$para['matricula'].'"';
        if(mysqli_query(connection(), $query)) {
            return true;
        } else {
            return 'ERROR: query error';
        }
    }
}

class ConsultarDatos{
	function verificarDatos($dataRecovery){
		
		$matricula= $dataRecovery['matricula'];
		$dni= $dataRecovery['dni'];
		$query = 'SELECT matricula FROM general WHERE matricula="'.$matricula.'" AND DNI="'.$dni.'"';
		$result = mysqli_query(connection(), $query);
		if($result->num_rows > 0){
			while($row = $result->fetch_assoc()){
				// $data=$row[0]['DNI'];
				return true;
				}
			}else {
				return false;
			}
				
		}
}


class CreatePwd{
	function generatePwd($dataPwd){
		$matricula = $dataPwd['matricula'];
		$pwd = $dataPwd['pwd'];
		$hash = password_hash($pwd, PASSWORD_DEFAULT);
		//if (password_verify($pwd, $hash)) {
		$query = 'UPDATE general SET pwd="'.$hash.'" WHERE matricula='.$matricula;
		$result = mysqli_query(connection(), $query);
		return true;  
		// } else { 
		// 	return false; 
		// }	
	}
}

?>