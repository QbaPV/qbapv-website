<?php
defined('BASEPATH') OR exit('No direct script access allowed');
error_reporting(E_ALL);
ini_set('display_errors', TRUE);
ini_set('display_startup_errors', TRUE);
date_default_timezone_set('Europe/London');

class Usuario_Ctrl extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('usuario_model');
		$this->load->library('Xss_filter');
		$this->load->library('PHPExcel'); 
	}

	public function index()
	{
		
		//print_r(md5("8fd061b095fea9109293855ca269fabf"));
		//print_r(md5("a527dc19f01fa93aa6a10e9522c74795"));
		//print_r(md5("1777a7eca776e9e4f7987f6489a70c26"));
		//print_r(md5("59f5415a8245274546ed504001b1dfa9"));
		
	}

	public function get_sponsors(){		
		$users = $this->usuario_model->consultarall()['data'];
		
		$request = json_decode(file_get_contents('php://input')); 
		$data = array(
			'usuario_id'=>$request->usuario_id
		);
		$user = $this->usuario_model->consultar($data)['data'][0];
		$output = array();
		$this->get_parents($users, $user, $output);
		echo json_encode($output);
	}
	
	public function get_parents($users, $user, &$output){
		$padre = null;
		foreach($users as $u){		
			if($u['usuario_id'] == $user['padre_id'] && $u['usuario_id'] != $user['usuario_id']){
				$padre = $u; 
				array_push($output, $u);				
			}
		}
		if($user['padre_id'] == 0){
			return;
		}
		$this->get_parents($users, $padre, $output);
	}
	
	public function consultar_all_user_info(){
		$response = $this->usuario_model->consultar_all_user_info();
		print_r(count($response['data']));
	}
	
	public function get_user_puntos(){
		$data = $this->usuario_model->get_user_puntos();
		echo(json_encode($data));
	}
	
	public function consultarall()
	{
		$response = $this->usuario_model->consultar_all_user_info();
		echo json_encode($response);
	}

	public function consultar(){
		$request = json_decode(file_get_contents('php://input')); 
		$data = array(
			'usuario_id'=> $request->usuario_id
		);
		echo json_encode($this->usuario_model->consultar($data));
	}

	public function consultar_by_username(){
		//$request = json_decode(file_get_contents('php://input')); 
		$data = array(
			'nombre_usuario'=> $_POST['nombre_usuario'],
			'email'=> $_POST['email']
		);
		echo json_encode($this->usuario_model->consultar_by_username($data));
	}

	public function consultar_by_username_ang(){
		$request = json_decode(file_get_contents('php://input')); 
		$data = array(
			'nombre_usuario'=> $request->nombre_usuario,
			'email'=> $request->email
		);
		echo json_encode($this->usuario_model->consultar_by_username($data));
	}

	public function consultar_by_referal(){
		$request = json_decode(file_get_contents('php://input')); 
		$data = array(
			'referal'=> $request->referal
		);
		echo json_encode($this->usuario_model->consultar_by_referal($data));
	}

	public function list_email(){
		$data = $this->usuario_model->consultar_suscriptores();
		print_r('<hr>');
		print_r('USUARIOS REGISTRADOS QUE NO DESEAN RECIBIR CORREOS');
		print_r('<hr>');
		foreach($data['data'] as $u){
			if($u['recibe_email'] == 0)	
				print_r($u['email'] . '; ');
		}
		print_r('<br>');
		print_r('<br>');
		print_r('<br>');
		print_r('<br>');
		print_r('<hr>');
		print_r('USUARIOS REGISTRADOS');
		print_r('<hr>');
		foreach($data['data'] as $u){
			if($u['recibe_email'] != 0)	
				print_r($u['email'] . '; ');
		}
		
		
		//print_r($data);
	}
	
	public function list_prospectos(){
		$data = $this->usuario_model->consultar_usuarios_prospectos();
		print_r('<hr>');
		print_r('USUARIOS PROSPECTOS QUE SE DIERON BAJA');
		print_r('<hr>');
		foreach($data['data'] as $u){
			if($u['recibe_email'] == 0 ){
				print_r($u['email'] . '; ');
			}
		}
		print_r('<br>');
		print_r('<br>');
		print_r('<br>');
		print_r('<br>');
		
		print_r('<hr>');
		print_r('USUARIOS PROSPECTOS');
		print_r('<hr>');
		foreach($data['data'] as $u){
			if($u['recibe_email'] != 0)
				print_r($u['email'] . '; ');
		}
		
		
		//print_r($data);
	}

	public function get_mis_referidos(){
		$request = json_decode(file_get_contents('php://input')); 
		$idUsuario = $request->usuario_id;
		$query  = $this->usuario_model->getDirectReferals($idUsuario);
		//print_r($query);
		echo json_encode($query);
	}

	public function exportar_actividad_directos($id)
	{
		//$request = json_decode(file_get_contents('php://input')); 
		$idUsuario = $id;
		$tblActividad  = $this->usuario_model->getDirectReferals($idUsuario);
		
		$objPHPExcel = new PHPExcel();

		if(count($tblActividad) > 0){
			//Cargamos la librería de excel.
			$objPHPExcel->getProperties()->setCreator("Ublof.com")
							 ->setLastModifiedBy("Ublof.com")
							 ->setTitle("Office 2007 XLSX Test Document")
							 ->setSubject("Office 2007 XLSX Test Document")
							 ->setDescription("Test document for Office 2007 XLSX, generated using PHP classes.")
							 ->setKeywords("office 2007 openxml php")
							 ->setCategory("Test result file");

			$objPHPExcel->setActiveSheetIndex(0);
			$objPHPExcel->getActiveSheet()->setTitle('Actividad_Referidos');
			
			
			//Contador de filas
			$contador = 1;
			//Le aplicamos ancho las columnas.
			$objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(20);
			$objPHPExcel->getActiveSheet()->getColumnDimension('B')->setWidth(20);
			$objPHPExcel->getActiveSheet()->getColumnDimension('C')->setWidth(20);
			$objPHPExcel->getActiveSheet()->getColumnDimension('D')->setWidth(20);
			$objPHPExcel->getActiveSheet()->getColumnDimension('E')->setWidth(20);
			//Le aplicamos negrita a los títulos de la cabecera.
			$objPHPExcel->getActiveSheet()->getStyle("A{$contador}")->getFont()->setBold(true);
			$objPHPExcel->getActiveSheet()->getStyle("B{$contador}")->getFont()->setBold(true);
			$objPHPExcel->getActiveSheet()->getStyle("C{$contador}")->getFont()->setBold(true);
			$objPHPExcel->getActiveSheet()->getStyle("D{$contador}")->getFont()->setBold(true);
			$objPHPExcel->getActiveSheet()->getStyle("E{$contador}")->getFont()->setBold(true);
			//Definimos los títulos de la cabecera.
			$objPHPExcel->getActiveSheet()->setCellValue("A{$contador}", 'Usuarios');
			$objPHPExcel->getActiveSheet()->setCellValue("B{$contador}", 'Rango');
			$objPHPExcel->getActiveSheet()->setCellValue("C{$contador}", 'Categorias');
			$objPHPExcel->getActiveSheet()->setCellValue("D{$contador}", 'Participaciones');
			$objPHPExcel->getActiveSheet()->setCellValue("E{$contador}", 'Planes');
			
			foreach($tblActividad['data'] as $l){
				//Incrementamos una fila más, para ir a la siguiente.
				$contador++;
			   //Informacion de las filas de la consulta.
			   $objPHPExcel->getActiveSheet()->setCellValue("A{$contador}", $l['nombre_usuario']);
			   $objPHPExcel->getActiveSheet()->setCellValue("B{$contador}", $l['rango']);
			   $objPHPExcel->getActiveSheet()->setCellValue("C{$contador}", $l['categoria']);
			   $objPHPExcel->getActiveSheet()->setCellValue("D{$contador}", $l['cantidad']);
			   $objPHPExcel->getActiveSheet()->setCellValue("E{$contador}", $l['cantidad']);
			}
			//Le ponemos un nombre al archivo que se va a generar.
			// Redirect output to a client’s web browser (Excel2007)
			$archivo = "actividad_directos_usuario{$idUsuario}.xls";
			header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
			header('Content-Disposition: attachment;filename="'.$archivo.'"');
			header('Cache-Control: max-age=0');
			// If you're serving to IE 9, then the following may be needed
			header('Cache-Control: max-age=1');

			// If you're serving to IE over SSL, then the following may be needed
			header ('Expires: Mon, 26 Jul 1997 05:00:00 GMT'); // Date in the past
			header ('Last-Modified: '.gmdate('D, d M Y H:i:s').' GMT'); // always modified
			header ('Cache-Control: cache, must-revalidate'); // HTTP/1.1
			header ('Pragma: public'); // HTTP/1.0

			$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
			//Hacemos una salida al navegador con el archivo Excel.
			$objWriter->save('php://output');
			exit;
		 }else{
			echo 'No hay información disponible';
			exit;        
		}
	}


	public function get_unilevel_tree(){
		$request = json_decode(file_get_contents('php://input')); 
		$idUsuario = $request->usuario_id;

		$query  = $this->usuario_model->getNetwork();

		//print_r($query);

		$parentLogged = 0; 
		$output = array();
     
		if(isset($query['data'])){
			$reg = $query['data'][0];
			if($reg['usuario_id'] = $idUsuario){
				$parentLogged = $reg["padre_id"];
				foreach ($query['data'] as $row) 
				{
					if($idUsuario == $row["usuario_id"]){
						$parentLogged = $row["padre_id"];
					}   
						
					if($row["usuario_id"] == $idUsuario){
						$row["padre_id"] = 0;
					}

					if($parentLogged != $row["padre_id"] )
					{
						array_push($output,array(
							"id" => $row["usuario_id"],
							"name" => $row["nombre"].' '.$row["apellidos"],
							"title" => $row["nivel"],
							"parentId" => $row["padre_id"],
							"urlimagen" => $row["foto"],                
							"pais" => $row["pais"]                
						));   
					}       
				}       
			}
		}
		$tree = $this->buildTree($output);
		echo json_encode($tree, 1);
	}

	public function get_unilevel_full_tree(){
		$request = json_decode(file_get_contents('php://input')); 
		$idUsuario = $request->usuario_id;

		$query  = $this->usuario_model->getNetworkActive($idUsuario);

		$parentLogged = 0; 
		$output = array();
		foreach ($query['data'] as $row) 
		{
			if($idUsuario == $row["usuario_id"]){
				$parentLogged = $row["padre_id"];
			}   
					array_push($output,array(
					"id" => $row["usuario_id"],
					"name" => $row["nombre"].' '.$row["apellidos"],
					"title" => $row["categoria"],
					"parentId" => $row["padre_id"],
					"urlimagen" => "lib/images/defaultprofile.png",
					"pais" => $row["pais"]                
			));           
		}   
		
		$tree = $this->buildTree($output);
		echo json_encode($tree, 1);
	}

	public function buildTree($data)
	{
		$tree = [];
		foreach ($data as &$node) 
			$tree[$node['parentId']][] = &$node;            
		unset($node);
		foreach ($data as &$node) 
			if(isset($tree[$node['id']])) 
				$node['children'] = $tree[$node['id']];       
		return $tree[0][0];
	}
	
	public function get_unilevel_full_tree1(){
		$request = json_decode(file_get_contents('php://input')); 
		$idUsuario = $request->usuario_id;

		$query  = $this->usuario_model->getNetwork();
		//print_r($query);
		$parentLogged = 0; 
		$output = array();
		foreach ($query['data'] as $row) 
		{
			if($idUsuario == $row["usuario_id"]){
				$parentLogged = $row["padre_id"];
			}
			$cant = $this->usuario_model->getDirectReferals($row['usuario_id']);	
			$activos =  $this->usuario_model->getNetworkActive_by_user($row['usuario_id']);
			
			$nodo = [];
			$nodo["nodeId"] = $row["usuario_id"];
			$nodo["Id"] = $row["usuario_id"];
			$nodo["parentId"] = $row["padre_id"];
			$nodo["backColor"] = "#FFFFFF";
			$active = "";
			if($row["activo"] == 1){
				$nodo["backColor"] = "#D1D1D1";	
				$active = "<i class='text-light fa fa-star'></i>";
			}
			if($nodo["parentId"] == 0){
				$nodo["state"]["expanded"] = true;	
			}
			$nodo["text"] = $row["nombre"].' '.$row["apellidos"] . 
				"<span class='btn btn-rounded float-right badge badge-success'> Activos: ".count($activos['data'])."</span>
				<span class='btn btn-rounded float-right badge badge-primary'> Total:".count($cant['data'])."</span>".$active;
			
			array_push($output, $nodo);
		}   
		
		$tree = $this->buildTree1($output);
		echo json_encode($tree, 1);
	}
	
	public function buildTree1($data)
	{
		$tree = [];
		foreach ($data as &$node) 
			$tree[$node['parentId']][] = &$node;            
		unset($node);
		foreach ($data as &$node) 
			if(isset($tree[$node['nodeId']])) 
				$node['nodes'] = $tree[$node['nodeId']];       
		return $tree[0][0];
	}
	
	
	public function login()
	{
		
		$request = json_decode(file_get_contents('php://input')); 
		$data = array(
			'usuario'=> $request->usuario,
			'password'=>$request->password
		);
		$result = $this->usuario_model->login($data);
		//print_r($result['data']);
		if (isset($result['data']) && !empty($result['data']))  
		{
			$this->session->set_userdata('login_state', TRUE);
			$this->session->set_userdata('user_data', $result);
		} 
		echo json_encode($result);
	}

	//Retorna el estado de la sesion y sus datos
	public function login_state(){
		$data['login_state'] = $this->session->userdata('login_state');
		$data['user_data'] = $this->session->userdata('user_data');
		echo json_encode($data);
	}

	public function islogged(){
		$sess = $this->session->userdata('login_state');
		if(isset($sess))
			echo $sess;
		else echo 0;
	}

	public function logout(){
        $this->session->sess_destroy();
    }

	public function reset_password(){
		$xss = new Xss_filter();

		$request = json_decode(file_get_contents('php://input'));
		$newpass = $xss->filter_it($request->clave);
		$userId = $request->usuario_id;
		//$newpass = "empresa10";

		if (empty($newpass) || ctype_space($newpass) || is_null($newpass)) {echo 1; exit();}
		
		$cryptnew = md5($newpass);
		
		$obj = array('usuario_id'=>$userId, 'clave'=>$cryptnew, 'is_valid' =>1);
		
		echo json_encode($this->usuario_model->reset_password($obj));

	}

	public function insertar(){
		$ip_address = $_SERVER["REMOTE_ADDR"];
		$request = json_decode(file_get_contents('php://input')); 
		//print_r($request);
		//print_r($_POST);

		$data = array(
			'rol_id' => '2',
			'nombre_usuario'=> $request->nombre_usuario,
			'email'=> $request->email,
			'clave'=> md5($request->clave),
			'nombre'=> $request->nombre,
			'apellidos'=> $request->apellidos,
			'pais'=> $request->pais,
			'activo'=> 0,
			'can_login'=> 0,
			'pais'=> $request->pais,
			'sexo'=> $request->sexo,
			'tipo'=> 'PER',
			'categoria'=> 0,
			'rango'=>'partner',
			'is_valid'=> 0,
			'padre_id'=> $request->padre_id,
			'referal'=> $request->nombre_usuario,
			'ip_address'=> $ip_address,
			'idioma'=> 'es'
		);
		//verificar si existe el usuario o el email
		$info = $this->usuario_model->consultar_by_username($data);
		//Preparar respuesta vacia
		$response = array('inserted_id'=>0, 'error'=>array('code'=>'100001', 'message'=>'El usuario o email proporcionado ya esta siendo utilizado'), 'data'=>array());

		//Si existe un registro apra este usuario salir.. 
		if(count($info['data']) <= 0)
		{
			$response = $this->usuario_model->insertar($data);
		}
		//print_r($response);
		echo json_encode($response);
	}

	public function send_email(){
		$this->load->view('general/send_email_ok');
	}

	public function enviar_email(){
		// $request = json_decode(file_get_contents('php://input')); 
		
		// $asunto = $request->asunto;
		// $email =  $request->email;
		// $nombre = $request->nombre;
		// $mensaje = $request->mensaje;
		
		//Indicamos el protocolo a utilizar
        $config['protocol'] = 'smtp';
         
       //El servidor de correo que utilizaremos
        $config["smtp_host"] = '167.99.238.189';
         
       //Authenticate user
        $config["smtp_user"] = 'info@ublof.com';
         
       //Authenticated user password
        $config["smtp_pass"] = 'Winmaster111***';   
         
       //El puerto que utilizará el servidor smtp
        $config["smtp_port"] = '25';
        
       //El juego de caracteres a utilizar
        $config['charset'] = 'utf-8';
 
       //Permitimos que se puedan cortar palabras
        $config['wordwrap'] = TRUE;
         
       //El email debe ser valido 
       $config['validate'] = true;   
	  
	   // 
       $config['mailtype'] = 'html';   

		$this->load->library('email', $config);

	   //Establecemos esta configuración
        $this->email->initialize($config);
	
		//Direccion y Nombre de quien envia   
		$this->email->from('info@ublof.com', 'Compañía XXX');
		//Direccion de destino
		$this->email->to('alexandro.millan2009@gmail.com', "Alex");

		 //Definir Asunto
		 $this->email->subject("COrreo prueba");
		 //Definir mensaje
		 $this->email->message("HOLA al fin");

		 //Enviamos el email y si se produce bien o mal que avise con una flashdata
		 try {
			if($this->email->send()){
				echo 'true';
			 }else{
				 echo 'false';
			 }
		 } catch (\Throwable $th) {
			 echo false;
		 }
		 
         
	}

	public function activate_account(){
		$request = json_decode(file_get_contents('php://input')); 
		$data = array(
			'referal'=> $request->referal,
			'is_valid' => 1
		);
		echo json_encode($this->usuario_model->activate_account($data));
	}

	public function actualizar(){
		$request = json_decode(file_get_contents('php://input')); 
		$user = array(
			'usuario_id'=> $request->usuario_id,
			'nombre' => $request->nombre,
			'apellidos' => $request->apellidos
		);
		$info = array(
			'usuario_id'=> $request->usuario_id,
			'telefono' => $request->telefono,
			'codigo_postal' => $request->codigo_postal,
			'ciudad' => $request->ciudad,
			'provincia' => $request->provincia,
			'fecha_nacimiento' => $request->fecha_nacimiento,
			'direccion' => $request->direccion,
			'btc_wallet' => $request->btc_wallet,
			'eth_wallet' => $request->eth_wallet
		);
		echo json_encode($this->usuario_model->actualizar($user, $info));
	}

	public function actualizar_cookie_token(){
		$request = json_decode(file_get_contents('php://input')); 
		$user = array(
			'usuario_id'=> $request->usuario_id,
			'cookie'=> $request->cookie
		);
		echo json_encode($this->usuario_model->actualizar_cookie_token($user));
	}

	public function actualizar_info_usuario(){
		$request = json_decode(file_get_contents('php://input')); 
		$data = array(
			'usuario_id'=> $request->usuario_id,
			'telefono' => $request->telefono,
			'codigo_postal' => $request->codigo_postal,
			'ciudad' => $request->ciudad,
			'provincia' => $request->provincia,
			'fecha_nacimiento' => $request->fecha_nacimiento,
			'direccion' => $request->direccion,
			'btc_wallet' => $request->btc_wallet,
			'eth_wallet' => $request->eth_wallet
		);
		echo json_encode($this->usuario_model->actualizar_info_usuario($data));
	}

	public function actualizar_avatar(){
		$sess = $this->session->get_userdata('user_data');
		$uid = $sess['user_data']['data'][0]['usuario_id'];
		//comprobamos si existe un directorio para subir el archivo
		//si no es así, lo creamos
		if(!is_dir("lib/images/photos/")) 
		mkdir("lib/images/photos/", 0777);
	
		//comprobamos si existe un directorio para subir el archivo temporal
		//si no es así, lo creamos
		if(!is_dir("lib/images/photos/tmp")) 
		mkdir("lib/images/photos/tmp", 0777);
			
		// creamos directorio para el usuario
		if(!is_dir("lib/images/photos/".$uid)) 
		mkdir("lib/images/photos/".$uid, 0777);
	
		//obtenemos el archivo a subir
		$file = $_FILES['file']['name'];
		$profile = $uid;
		//comprobamos si el archivo ha subido y lo movemos a una ruta temporal
		if ($file && move_uploaded_file($_FILES['file']['tmp_name'],"lib/images/photos/".$profile."/".$file)){
		}  
		$date = date("Y-m-d");
		// Creamos ruta del temporal
		$temporal = 'lib/images/photos/'.$profile.'/'.$file;

		// Creamos un alfanumerico aleatorio.
		 $characters = 'abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		 $string = '';
		 for ($i = 0; $i < 60; $i++) {
		  $string .= $characters[rand(0, strlen($characters) - 1)];
		 }
		 // Asignamos una ruta para el proceso de imagen 
		$ruta = 'lib/images/photos/'.$profile.'/normal-'.$string.$date.'.jpg';
		// Asignamos una ruta para la base de datos
		$finalruta = 'lib/images/photos/'.$profile.'/normal-'.$string.$date.'.jpg';
	
		list($widthimg, $heightimg) = getimagesize($temporal);
		
		// Procesamos archivo para redimensionar
		$this->smart_resize_image($temporal, null, 300, 300, false , $ruta, true , false ,100);
	
		$foto = array('usuario_id'=> $uid, 'foto'=>$finalruta);
		
		$ret = $this->usuario_model->actualizar_avatar($foto);
		$sess['user_data']['data'][0]['foto'] = $finalruta;
		$this->session->set_userdata('user_data', $sess['user_data']); 
	
		if($ret['wasModified'])
			echo $finalruta;
	}
	
	public function eliminar(){
		$request = json_decode(file_get_contents('php://input')); 
		$data = array(
			'usuario_id'=> $request->usuario_id
		);
		return $this->usuario_model->eliminar($data);
	}

	public function smart_resize_image($file,
                              $string             = null,
                              $width              = 0, 
                              $height             = 0, 
                              $proportional       = false, 
                              $output             = 'file', 
                              $delete_original    = true, 
                              $use_linux_commands = false,
  							  $quality = 100
		   ) {
      
		if ( $height <= 0 && $width <= 0 ) return false;
		if ( $file === null && $string === null ) return false;
		# Setting defaults and meta
		$info                         = $file !== null ? getimagesize($file) : getimagesizefromstring($string);
		$image                        = '';
		$final_width                  = 0;
		$final_height                 = 0;
		list($width_old, $height_old) = $info;
		$cropHeight = $cropWidth = 0;
		# Calculating proportionality
		if ($proportional) {
		if      ($width  == 0)  $factor = $height/$height_old;
		elseif  ($height == 0)  $factor = $width/$width_old;
		else                    $factor = min( $width / $width_old, $height / $height_old );
		$final_width  = round( $width_old * $factor );
		$final_height = round( $height_old * $factor );
		}
		else {
		$final_width = ( $width <= 0 ) ? $width_old : $width;
		$final_height = ( $height <= 0 ) ? $height_old : $height;
		$widthX = $width_old / $width;
		$heightX = $height_old / $height;
		
		$x = min($widthX, $heightX);
		$cropWidth = ($width_old - $width * $x) / 2;
		$cropHeight = ($height_old - $height * $x) / 2;
		}
		# Loading image to memory according to type
		switch ( $info[2] ) {
		case IMAGETYPE_JPEG:  $file !== null ? $image = imagecreatefromjpeg($file) : $image = imagecreatefromstring($string);  break;
		case IMAGETYPE_GIF:   $file !== null ? $image = imagecreatefromgif($file)  : $image = imagecreatefromstring($string);  break;
		case IMAGETYPE_PNG:   $file !== null ? $image = imagecreatefrompng($file)  : $image = imagecreatefromstring($string);  break;
		default: return false;
		}
		
		
		# This is the resizing/resampling/transparency-preserving magic
		$image_resized = imagecreatetruecolor( $final_width, $final_height );
		if ( ($info[2] == IMAGETYPE_GIF) || ($info[2] == IMAGETYPE_PNG) ) {
		$transparency = imagecolortransparent($image);
		$palletsize = imagecolorstotal($image);
		if ($transparency >= 0 && $transparency < $palletsize) {
			$transparent_color  = imagecolorsforindex($image, $transparency);
			$transparency       = imagecolorallocate($image_resized, $transparent_color['red'], $transparent_color['green'], $transparent_color['blue']);
			imagefill($image_resized, 0, 0, $transparency);
			imagecolortransparent($image_resized, $transparency);
		}
		elseif ($info[2] == IMAGETYPE_PNG) {
			imagealphablending($image_resized, false);
			$color = imagecolorallocatealpha($image_resized, 0, 0, 0, 127);
			imagefill($image_resized, 0, 0, $color);
			imagesavealpha($image_resized, true);
		}
		}
		imagecopyresampled($image_resized, $image, 0, 0, $cropWidth, $cropHeight, $final_width, $final_height, $width_old - 2 * $cropWidth, $height_old - 2 * $cropHeight);
		
		
		# Taking care of original, if needed
		if ( $delete_original ) {
		if ( $use_linux_commands ) exec('rm '.$file);
		else @unlink($file);
		}
		# Preparing a method of providing result
		switch ( strtolower($output) ) {
		case 'browser':
			$mime = image_type_to_mime_type($info[2]);
			header("Content-type: $mime");
			$output = NULL;
		break;
		case 'file':
			$output = $file;
		break;
		case 'return':
			return $image_resized;
		break;
		default:
		break;
		}
		
		# Writing image according to type to the output destination and image quality
		switch ( $info[2] ) {
		case IMAGETYPE_GIF:   imagegif($image_resized, $output);    break;
		case IMAGETYPE_JPEG:  imagejpeg($image_resized, $output, $quality);   break;
		case IMAGETYPE_PNG:
			$quality = 9 - (int)((0.9*$quality)/10.0);
			imagepng($image_resized, $output, $quality);
			break;
		default: return false;
		}
		return true;
  	}
}