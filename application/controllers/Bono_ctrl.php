<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Bono_Ctrl extends CI_Controller {
	
	public function __construct()
	{
	    parent::__construct();
		$this->load->model('bono_model');
		$this->load->model('usuario_model');
		$this->load->model('balance_comisiones_model');		
		$this->load->model('balances_model');		
		$this->load->model('notificaciones_model');	
	}

	public function index(){
		$mes = date('n'); //Numero del mes 1 - 12
		if(($mes % 2)==0)  
		{
			echo "El reparto de bonos es cada dos meses";
			return;
		}	
	}
	
	public function insertar_be()
	{
		$request = json_decode(file_get_contents('php://input')); 
		$data = array(
			'valor' => $request->valor,
			'tipo' => $request->tipo,
			'fecha' => date("Y-m-d H:i:s")
		);
		$response = $this->bono_model->insertar_be($data);
		echo json_encode($response);
	}
	
	public function insertar_br()
	{
		$request = json_decode(file_get_contents('php://input')); 
		$data = array(
			'valor' => $request->valor,
			'tipo' => $request->tipo,
			'fecha' => date("Y-m-d H:i:s")
		);
		$response = $this->bono_model->insertar_br($data);
		echo json_encode($response);
	}
	
	
	
	
	public function insertar_br_detalle()
	{
		$this->db->trans_start();
		
		$request = json_decode(file_get_contents('php://input')); 
		$data = array(
			'usuario_genera_id' => $request->usuario_genera_id,
			'monto'=> $request->monto,
			'origen'=> $request->origen,
			'fecha' => date("Y-m-d H:i:s"),
			'activo' => 1,
			'destino' => "EMPRESA",
			
		);
		$this->bono_model->insertar_br_detalle($data);
		
		//Actualizar el monto general del Bono Retroactivo
		$br = array(
			'tipo' => 'R',
			'valor'=> $request->monto,
			'fecha'=> date('Y-m-d H:i:s')
		);
		$this->bono_model->actualizar_bono($br);
		
		$data = array();
		$this->db->trans_complete();
        $data['data'] = $this->db->trans_status();
		if ($this->db->trans_status() === FALSE)
        {
			if($data['error'] = $this->db->error());
        }
		echo json_encode($data);
	}
	
	public function insertar_be_detalle()
	{
		$this->db->trans_start();
		
		$request = json_decode(file_get_contents('php://input')); 
		$data = array(
			'usuario_genera_id' => $request->usuario_genera_id,
			'monto'=> $request->monto,
			'origen'=> $request->origen,
			'fecha' => date("Y-m-d H:i:s")
		);
		$this->bono_model->insertar_be_detalle($data);
		
		//Actualizar el monto general del Bono Empresarial
		$br = array(
			'tipo' => 'E',
			'valor'=> $request->monto,
			'fecha'=> date('Y-m-d H:i:s')
		);
		$this->bono_model->actualizar_bono($br);
		
		//
		$data = array();
		$this->db->trans_complete();
        $data['data'] = $this->db->trans_status();
		if ($this->db->trans_status() === FALSE)
        {
			if($data['error'] = $this->db->error());
        }
		echo json_encode($data);
	}
	
	
	public function consultarall()
	{
		$response = $this->bono_model->consultarall();
		echo json_encode($response);
	}
	
	public function consultar_ber()
	{
		$be['data'] = $this->bono_model->consultar_be();
		$br['data'] = $this->bono_model->consultar_br();
		$bonos=array('be'=>$be['data'], 'br'=>$br['data'], 'total_be'=>0, 'total_br'=>0);
		
		echo json_encode($bonos);
	}
	
	public function consultar_be()
	{
		$response = $this->bono_model->consultar_be();
		echo json_encode($response);
	}
	
	public function consultar_br()
	{
		$response = $this->bono_model->consultar_be();
		echo json_encode($response);
	}
	
	public function consultar_br_detalle()
	{
		$response = $this->bono_model->consultar_br_detalle();
		echo json_encode($response);
	}
	
	public function consultar_total_br()
	{
		$response = $this->bono_model->consultar_total_br();
		echo json_encode($response);
	}
	
	public function consultar_be_detalle()
	{
		$response = $this->bono_model->consultar_be_detalle();
		echo json_encode($response);
	}

	public function consultar_total_be()
	{
		$response = $this->bono_model->consultar_total_be();
		echo json_encode($response);
	}
	
	
	public function distribuir_br()
	{
		$mes = date('n'); //Numero del mes 1 - 12
		if(($mes % 2)==0)  
		{
			echo "El reparto de bonos es cada dos meses";
			return;
		}	
		
		$porciento = 0.2;	
		$total_repartido = 0;
		
		$this->db->trans_start();
		
		//1-calcular el 20% correspondiente a cada categoria en base al monto a repartir (REPARTO)
		$bono = $this->bono_model->consultar_total_br();
		$monto = $bono['data'][0]['valor']; //TOtal disponible a repartir
		if($monto <= 0) return;
		$monto_x_cat = $monto * $porciento;
		
		//2-Consultar los usuarios en cada categoria
		$users = $this->usuario_model->consultar_all_user_category();
		$category = array('cat1'=>array(), 'cat2'=>array(), 'cat3'=>array(), 'cat4'=>array(), 'cat5'=>array());
		foreach($users['data'] as $u){
			array_push($category["cat".$u['categoria']],$u);	
		}		
		
		//3- Dividir (REPARTO) entre cantidad de usuarios por cada categoria (MONTO PERCAPITA)
		$monto_x_user = array();
		
		if(count($category['cat1']) > 0)
			$monto_x_user['cat1'] = $monto_x_cat / count($category['cat1']); 
		if(count($category['cat2']) > 0)
			$monto_x_user['cat2'] = $monto_x_cat / count($category['cat2']); 
		if(count($category['cat3']) > 0)
			$monto_x_user['cat3'] = $monto_x_cat / count($category['cat3']); 
		if(count($category['cat4']) > 0)
			$monto_x_user['cat4'] = $monto_x_cat / count($category['cat4']); 
		if(count($category['cat5']) > 0)
			$monto_x_user['cat5'] = $monto_x_cat / count($category['cat5']); 
			
		$fecha = date("Y-m-d H:i:s");
		foreach($category as $cat){ //categorias
			foreach($cat as $u){ //usuarios
				//Generar balance comisiones
				$total_repartido = $total_repartido + $monto_x_user["cat".$u['categoria']];
		
				$data = array(
					'usuario_genera_id' => 1,
					'usuario_recibe_id' => $u['usuario_id'],
					'tipo_comision' => "bono_r",
					'monto' => $monto_x_user["cat".$u['categoria']],
					'concepto' => "bonificacion",
					'activo' => 1,
					'descripcion' =>$monto_x_user["cat".$u['categoria']] . " ETH " . utf8_encode($this->lang->line('msg_bono_retroactivo')),
					'fecha' => $fecha
				);
				$this->balance_comisiones_model->insertar($data);
					
				//Actualizar el balance General
				$bgc = array(
					'usuario_id' => $u['usuario_id'],
					'balance_comisiones'=> $monto_x_user["cat".$u['categoria']],
				);
				$this->balances_model->insertar_balance_general($bgc);
				
				//Generar Notificacion
				$noti = array(
					'usuario_id'=>  $u['usuario_id'],
					'usuario_envia'=>1,
					'fecha'=> $fecha,
					'asunto'=> $monto_x_user["cat".$u['categoria']] . " ETH " . utf8_encode($this->lang->line('msg_bono_retroactivo')),
					'leido'=> 0
				);
				$this->notificaciones_model->insertar($noti);					
			}
		}
		
		//Rebajar del Bono Retroactivo lo repartido.
		//$monto  = $monto - $total_repartido; 
		$b = array(
			'tipo'=>'R',
			'valor'=> $total_repartido * (-1)
		);	
		$this->bono_model->actualizar_bono($b);
				
		//print_r($monto);			
		
		$data = array();
		$this->db->trans_complete();
        $data['data'] = $this->db->trans_status();
		if ($this->db->trans_status() === FALSE)
        {
			if($data['error'] = $this->db->error());
        }
		echo json_encode($data);		
	}
	
	public function distribuir_be()
	{
		$mes = date('n'); //Numero del mes 1 - 12
		if(($mes % 2)==0)  
		{
			echo "El reparto de bonos es cada dos meses";
			return;
		}	
		
		$porciento = 0.2;	
		$total_repartido = 0;
		
		$this->db->trans_start();
		
		//1-calcular el 20% correspondiente a cada categoria en base al monto a repartir (REPARTO)
		$bono = $this->bono_model->consultar_total_be();
		$monto = $bono['data'][0]['valor']; //TOtal disponible a repartir
		if($monto <= 0) return;
		$monto_x_cat = $monto * $porciento;
		
		//2-Consultar los usuarios en cada categoria
		$users = $this->usuario_model->consultar_all_user_category();
		$category = array('cat1'=>array(), 'cat2'=>array(), 'cat3'=>array(), 'cat4'=>array(), 'cat5'=>array());
		foreach($users['data'] as $u){
			array_push($category["cat".$u['categoria']],$u);	
		}		
		
		//3- Dividir (REPARTO) entre cantidad de usuarios por cada categoria (MONTO PERCAPITA)
		$monto_x_user = array();
		
		if(count($category['cat1']) > 0)
			$monto_x_user['cat1'] = $monto_x_cat / count($category['cat1']); 
		if(count($category['cat2']) > 0)
			$monto_x_user['cat2'] = $monto_x_cat / count($category['cat2']); 
		if(count($category['cat3']) > 0)
			$monto_x_user['cat3'] = $monto_x_cat / count($category['cat3']); 
		if(count($category['cat4']) > 0)
			$monto_x_user['cat4'] = $monto_x_cat / count($category['cat4']); 
		if(count($category['cat5']) > 0)
			$monto_x_user['cat5'] = $monto_x_cat / count($category['cat5']); 
			
		$fecha = date("Y-m-d H:i:s");
		foreach($category as $cat){ //categorias
			foreach($cat as $u){ //usuarios
				//print_r($u);return;
				if($u['categoria'] > 1){
					//Generar balance comisiones
					$total_repartido = $total_repartido + $monto_x_user["cat".$u['categoria']];
			
					$data = array(
						'usuario_genera_id' => 1,
						'usuario_recibe_id' => $u['usuario_id'],
						'tipo_comision' => "bono_e",
						'monto' => $monto_x_user["cat".$u['categoria']],
						'concepto' => "bonificacion",
						'activo' => 1,
						'descripcion' =>$monto_x_user["cat".$u['categoria']] . " ETH " . utf8_encode($this->lang->line('msg_bono_empresarial')),
						'fecha' => $fecha
					);
					$this->balance_comisiones_model->insertar($data);
						
					//Actualizar el balance General
					$bgc = array(
						'usuario_id' => $u['usuario_id'],
						'balance_comisiones'=> $monto_x_user["cat".$u['categoria']],
					);
					$this->balances_model->insertar_balance_general($bgc);
					
					//Generar Notificacion
					$noti = array(
						'usuario_id'=>  $u['usuario_id'],
						'usuario_envia'=>1,
						'fecha'=> $fecha,
						'asunto'=> $monto_x_user["cat".$u['categoria']] . " ETH " . utf8_encode($this->lang->line('msg_bono_empresarial')),
						'leido'=> 0
					);
					$this->notificaciones_model->insertar($noti);
				}					
			}
		}
		
		//Rebajar del Bono Retroactivo lo repartido.
		//$monto  = $monto - $total_repartido; 
		$b = array(
			'tipo'=>'E',
			'valor'=> $total_repartido * (-1)
		);	
		$this->bono_model->actualizar_bono($b);
				
		//print_r($monto);			
		
		$data = array();
		$this->db->trans_complete();
        $data['data'] = $this->db->trans_status();
		if ($this->db->trans_status() === FALSE)
        {
			if($data['error'] = $this->db->error());
        }
		echo json_encode($data);		
	}
	
	
	public function recoger_bono_retroactivo(){
		//1-Consultar los bonos retroactivos generados por usuarios
		$bonosR = $this->bono_model->consultar_br_detalle();
		//2- Determinar que usuario genera la cominion en ESPERA
		foreach($bonosR['data'] as $b){
			if($b['origen'] != 'admin' && $b['destino'] == "ESPERA")
			{ 
				//Los Bonos que estan en HOLD
				$user_id = $b['usuario_genera_id'];
				$monto = $b['monto'];
				$usr = array('usuario_id'=>$user_id);
				//Consultar Usuario para conocer su padre
				$userData = $this->usuario_model->consultar($usr);		
				$padre_id = $userData['data'][0]['padre_id'];
				$parent = array('usuario_id'=>$padre_id);
				$padreData = $this->usuario_model->consultar($parent);
				$estadoPadre = $padreData['data'][0]['activo']; //Conocer si el padre es un user activo.
				
				//SI EL PADRE ESTA ACTIvo
				if($estadoPadre){
					//Pasa la comision a su balance comisiones
					$c = Array(
						'usuario_genera_id'=>$user_id,
						'usuario_recibe_id'=>$padre_id,
						'tipo_comision'=>'punto',
						'concepto'=>'comision',
						'monto'=> $monto,
						'activo'=> 1,
						'fecha'=> date("Y-m-d H:i:s"),
						'descripcion'=> $monto. ' ETH ' .utf8_encode($this->lang->line('msg_bonoretroactivo')) 
					);							
					$this->db->insert('balance_comisiones', $c);
					//Actualizar el balance general
					$bgc = array(
						'usuario_id' => $padre_id,
						'balance_comisiones'=> $monto 
					);
					$this->balances_model->insertar_balance_general($bgc);
						
					//cambia el estado del bono a USUARIO
					$updBono = array(
						'bono_id'=> $b['bono_id'],
						'destino'=> "USUARIO"
					);
					$this->bono_model->actualizar_br($updBono);
					//Notificaciones
					$noti = array(
						'fecha'=> date("Y-m-d H:i:s"),
						'usuario_id'=>$padre_id,
						'usuario_envia'=> 1,
						'asunto'=>$monto. ' ETH ' .utf8_encode($this->lang->line('msg_bonoretroactivo')) ,
						'leido'=> 0
					);
					$this->notificaciones_model->insertar($noti);
				}
				else{
					//Pasa la comision al bono retroativo general
					//Actualizar el monto general del Bono Retroactivo
					$br = array(
						'tipo' => 'R',
						'valor'=> $monto,
						'fecha'=> date('Y-m-d H:i:s')
					);
					$this->bono_model->actualizar_bono($br);
		
					//Cambia el estado del bono a EMPRESA
					$updBono = array(
						'bono_id'=> $b['bono_id'],
						'destino'=> "EMPRESA"
					);
					$this->bono_model->actualizar_br($updBono);
				}
				
				
				
				print_r($padreData['data'][0]['activo']);
				echo '--';
				print_r($padreData['data'][0]['usuario_id']);
				echo '--';
				print_r($padreData['data'][0]['nombre_usuario']);
				echo '--';
				print_r($userData['data'][0]['usuario_id']);
				echo '-';
				print_r($userData['data'][0]['nombre_usuario']);
				echo '<br>';
			}
		}
	}
}