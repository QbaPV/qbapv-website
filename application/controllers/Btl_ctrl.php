<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Btl_Ctrl extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('btl_model');
		$this->load->model('notificaciones_model');
		$this->load->model('bono_model');
	}

	public function index()
	{
		
	}
	
	public function get_daily_eth(){
		//get eth price
		$url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false";
	 	$headers = array(
				"Accept: application/json",
				"Content-Type: application/json"
			);
		$ch = curl_init($url);
		curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
		curl_setopt($ch, CURLOPT_HEADER, FALSE);
		$execResult = curl_exec($ch);
		curl_close($ch);
		
		$data = json_decode($execResult);
		return $data[1];
	}
	
	public function actualizar_eth_actual(){
		$dia_semana = date('N');
		if($dia_semana > 5) //Si dia es sabado o domingo
		{
			echo "Lo sentimos no operamos los fines de semana.";
			return;
		}
		//Valor eth real
		$ethData = $this->get_daily_eth();
		
		//Valor eth almacenado
		$currBtl = $this->consultar_btl_actual();
		$btlEth = $currBtl['data'][0]['precio_eth'];
		
		echo 'Valor actual ETH - '. $ethData->current_price ;
		echo '<br>';
		echo 'Valor almacenado ETH - '. $btlEth;
		
		//Si precio de eth real es mayor entonces se actualiza.
		if($btlEth >= $ethData->current_price){
			return;
		}
		$btl = array(
			'precio_eth' => $ethData->current_price,
			'fecha'=> date('Y-m-d H:i:s')
		);
		$this->btl_model->actualizar_eth_actual($btl);
	}
	
	public function actualizar_valor_actual(){
		$ethData = $this->get_daily_eth();
		//$request = json_decode(file_get_contents('php://input')); 
		$btl = array(
			'valor'=> $_POST['valor'],
			'precio_eth'=>$ethData->current_price
		);
		echo json_encode($this->btl_model->actualizar_valor_actual($btl));
	}
	
	
	public function actualizar_btl_semana_anterior()
	{
		$data['data']  = array();
		$this->db->trans_start();
		
		$btl = $this->consultar_btl_actual();
		$btl_ant = array(
			'fecha'=>$btl['data'][0]['fecha'],
			'valor'=>$btl['data'][0]['valor'],
			'precio_eth'=>$btl['data'][0]['precio_eth'],
		);
		$this->btl_model->actualizar_btl_semana_anterior($btl_ant);	
			
		$this->btl_model->insertar_btl_semanal_detalle($btl_ant);
		//Distribuir ganancias semanal
		$this->distribuir_btl_semanal();
		//Resetear valores actuales.
		$this->btl_model->reset_btl_semana_actual();
		//complete transaction
		 $this->db->trans_complete();
		 if ($this->db->trans_status() === FALSE)
         {
             if($data['error'] = $this->db->error());
         }        
         return $data;

	}
	
	//Consultar el valor del eth almacenado en el actual
	public function consultar_btl_actual_json(){
		$currBtl = $this->btl_model->consultar_btl_actual();
		echo json_encode($currBtl);
	}
	public function consultar_btl_actual(){
		$currBtl = $this->btl_model->consultar_btl_actual();
		return $currBtl;
	}
	
	//Consultar el valor del eth almacenado en el actual
	public function consultar_btl_semana_anterior_json(){
		$currBtl = $this->btl_model->consultar_btl_semana_anterior();
		echo json_encode($currBtl);
	}
	public function consultar_btl_semana_anterior(){
		$currBtl = $this->btl_model->consultar_btl_semana_anterior();
		return $currBtl;
	}
	
	public function consultar_btl_all(){
		$currBtl = $this->btl_model->consultar_btl_all();
		echo json_encode ($currBtl);
	}
	
	public function consultar_btl_by_grupo(){
		$request = json_decode(file_get_contents('php://input')); 
		$btl = array(
			'grupo'=> $request->grupo
		);
		$currBtl = $this->btl_model->consultar_btl_by_grupo($btl);
		echo json_encode ($currBtl);
	}
	
	//BTL USUARIOS
	//Consultar agrupados por btl
	public function consultar_usuarios_by_btl(){
		$currBtl = $this->btl_model->consultar_usuarios_by_btl();
		echo json_encode($currBtl);
	}
	
	public function consultar_btl_usuario_activo(){
		$request = json_decode(file_get_contents('php://input')); 
		$btl = array(
			'usuario_id'=> $request->usuario_id
		);
		$currBtl = $this->btl_model->consultar_btl_usuario_activo($btl);
		echo json_encode ($currBtl);
	}
	
	public function actualizar_btl_empresa(){
		$request = json_decode(file_get_contents('php://input')); 
		$btl = array(
			'btl_usuario_id'=> $request->btl_usuario_id,
			'btl_id'=> $request->btl_id
		);
		echo json_encode($this->btl_model->actualizar_btl_empresa($btl));
	}
	
	public function consultar_btl_usuario_empresa(){
		$currBtl = $this->btl_model->consultar_btl_usuario_empresa();
		echo json_encode ($currBtl);
	}
	
	
	public function actualizar_semana($data){
		//$request = json_decode(file_get_contents('php://input')); 
		$btl = array(
			'usuario_id'=> $data['usuario_id']
		);
		//Consultar informacion de user y btl
		$currBtl = $this->btl_model->consultar_btl_usuario_activo($btl)['data'];
		if(count($currBtl) > 0){
			//Si semanas corridas < semanas del btl
			$cant_semanas = $currBtl[0]['btlSemana'];
			$semanaUso = $currBtl[0]['btlSemanasUso'];
			if($semanaUso < $cant_semanas){			
				$btl['semanas'] = $semanaUso + 1;
				$this->btl_model->actualizar_semana($btl);
				
				if($semanaUso+1 >= $cant_semanas){
					$btl['activo'] = 0;
					$this->btl_model->actualizar_semana($btl);
					//Generar notificaciones					
					$noti = array(
						'usuario_id'=> $data['usuario_id'],
						'usuario_envia'=>1,
						'fecha'=>date('Y-m-d H:i:s'),
						'asunto'=>"Ha finalizado el ciclo de inversion de su BTL",
						'leido'=>0
					);
					$this->notificaciones_model->insertar($noti);
				}
			}
		}
	}
	
	//Consultar todos los usuarios con BTL activos
	public function consultar_btl_usuario_all(){
		$currBtl = $this->btl_model->consultar_btl_usuario_all();
		echo json_encode ($currBtl);
	}
	
	//Distribuir Ganancia BTL SEMANAL
	public function distribuir_btl_semanal(){
		$data['data']  = array();
		$this->db->trans_start();
		//-------------------------------------------------------------
		//Btl Semana Actual
		$semanaActual = $this->btl_model->consultar_btl_actual()['data'][0];
		$ganancia_sem_actual = $semanaActual['valor'] / $semanaActual['precio_eth'];  

		//echo "ganancia semana actual TOTAL: " . $ganancia_sem_actual;
	
		//Totales en BTL
		$totalxBTL = $this->btl_model->consultar_usuarios_by_btl()['data'];

		//echo "<br> Totales en BTL " . $totalxBTL[0]['Inversion'];

		//Consultar los usuarios con btl activos
		$usrsBTL_activo = $this->btl_model->consultar_btl_usuario_all()['data'];
		
		$ganancia_empresa = array('bull'=>0, 'tiger'=>0, 'lion'=>0);
		foreach($usrsBTL_activo as $u){
			//Ganancia Semanal tipo Inversion
			$porciento  = $u['porciento'];
			$ganancia_semanal = $ganancia_sem_actual * ($porciento / 100);
				
			//echo "<br> Ganancia Semanal tipo Inversion ".$u['usuario_id'] ." -> ínversion:" . $u['precio_usd'].'--' . $ganancia_semanal;
			
			$ganancia_user = 0;
			switch($u['grupo']){
				case 'bull':
					$ganancia_user = ($u['precio_usd'] / $totalxBTL[0]['Inversion']) * $ganancia_semanal;
					if($u['usuario_id'] == 0){
						$ganancia_empresa['bull'] = $ganancia_user;  
					}
					break;
				case 'tiger':
					$ganancia_user = ($u['precio_usd'] / $totalxBTL[1]['Inversion']) * $ganancia_semanal;
					if($u['usuario_id'] == 0){
						$ganancia_empresa['tiger'] = $ganancia_user;  
					}
					break;
				case 'lion':
					$ganancia_user = ($u['precio_usd'] / $totalxBTL[2]['Inversion']) * $ganancia_semanal;
					if($u['usuario_id'] == 0){
						$ganancia_empresa['lion'] = $ganancia_user;  
					}
					break;
				default:
			}
			//echo "<br>Ganancia Semanal Usuario: ".$ganancia_user; 
			$usrData = array(
				'usuario_id' => $u['usuario_id'],
				'btl_usuario_id' => $u['btl_usuario_id'],
				'ganancia' => $ganancia_user,
				'fecha' => date("Y:m:d H:i:s"),
				'semana' => 1,
				'btl_id' => $u['btl_id']
			);
			$this->btl_model->insertar_ganancia_usuario($usrData);
			
			//Actualiza la semana distribuida
			$this->actualizar_semana($usrData);
			
			//Generar notificaciones
			$noti = array(
				'usuario_id'=> $u['usuario_id'],
				'usuario_envia'=>1,
				'fecha'=>date('Y-m-d H:i:s'),
				'asunto'=>$ganancia_user." ETH Recibidos de la ganancia semanal de tu BTL " . $u['nombre'],
				'leido'=>0
			);
			$this->notificaciones_model->insertar($noti);	
		}
		//GANANCIA EMPRESA
		$ganancia = $ganancia_empresa['lion'] + $ganancia_empresa['tiger'] + $ganancia_empresa['bull'];
		$ge = array(
			'btl_bull'=>$ganancia_empresa['bull'],
			'btl_tiger'=>$ganancia_empresa['tiger'],
			'btl_lion'=>$ganancia_empresa['lion'],
			'ganancia'=> $ganancia,
			'bono_empresarial'=> 0.6 * $ganancia,
			'bono_retroactivo'=> 0.4 * $ganancia,
			'fecha'=> date('Y-m-d H:i:s'),
			'activo'=> 1
		);
		//Cambiar activo = 0 al anterior
		$obj = array('activo'=>0);
		$this->btl_model->actualizar_btl_ganancia_empresa($obj);
		$this->btl_model->insertar_btl_ganancia_empresa($ge);
		
		//ENVIAR AL BONO EMPRESARIAL.
		$be = Array(
			'usuario_genera_id'=>$u['usuario_id'],
			'origen'=>'admin',
			'monto'=> $ge['bono_empresarial'],
			'fecha'=> $ge['fecha']	
		);
		$this->bono_model->insertar_be_detalle($be);
		
		//Actualizar el monto general del Bono Empresarial
		$be = array(
			'tipo' => 'E',
			'valor'=> $ge['bono_empresarial'],
			'fecha'=> $ge['fecha']
		);
		$this->bono_model->actualizar_bono($be);
		
		//ENVIAR AL BONO RETROACTIVO.
		$br = Array(
			'usuario_genera_id'=>$u['usuario_id'],
			'origen'=>'admin',
			'monto'=> $ge['bono_retroactivo'],
			'fecha'=> $ge['fecha'],
			'activo' => 1,
			'destino' => "EMPRESA",	
		);
		$this->bono_model->insertar_br_detalle($br);
		
		//Actualizar el monto general del Bono Retroactivo
		$br = array(
			'tipo' => 'R',
			'valor'=> $ge['bono_retroactivo'],
			'fecha'=> $ge['fecha']
		);
		$this->bono_model->actualizar_bono($br);
		
		
		//complete transaction
		 $this->db->trans_complete();
		 if ($this->db->trans_status() === FALSE)
         {
             if($data['error'] = $this->db->error());
         }        
         return $data;
	}
	
	public function consultar_ganancia_acumulada_by_user(){
		$request = json_decode(file_get_contents('php://input')); 
		$btl = array(
			'usuario_id'=> $request->usuario_id
		);
		$currBtl = $this->btl_model->consultar_ganancia_acumulada_by_user($btl);
		echo json_encode ($currBtl);
	}

	public function consultar_ganancias_all(){
		$currBtl = $this->btl_model->consultar_ganancias_all();
		echo json_encode ($currBtl);
	}
	
	public function get_ganancias_rango_fecha(){
		$request = json_decode(file_get_contents('php://input')); 
		$obj = array(
			'fechaInicio' => date($request->fechaInicio),
			'fechaFin' => date($request->fechaFin)
		);
		$data = $this->btl_model->get_ganancias_rango_fecha($obj);
		
		echo json_encode($data);	
	}	
	
	//Ganancias Empresa
		
	//Consultar todos los usuarios con BTL activos
	public function consultar_ganancia_empresa(){
		//Bull
		$b = $this->btl_model->consultar_ganancia_empresa_by_btl(1)['data'];
		//TIger
		$t = $this->btl_model->consultar_ganancia_empresa_by_btl(2)['data'];
		//Lion
		$l = $this->btl_model->consultar_ganancia_empresa_by_btl(3)['data'];
		
		$btlEmpresa = array('bull'=>$b[0]['ganancia'], 'tiger'=>$t[0]['ganancia'], 'lion'=>$l[0]['ganancia']);
		echo json_encode($btlEmpresa);
	}

	public function consultar_btl_ganancias_empresa_all(){
		$currBtl = $this->btl_model->consultar_btl_ganancias_empresa_all();
		echo json_encode ($currBtl);
	}
	
	public function consultar_ganancias_by_grupo(){
		$currBtl = $this->btl_model->consultar_ganancias_by_grupo();
		$ganancias = array();
		foreach($currBtl['data'] as $b){
			if($b['grupo'] == 'bull'){
				$ganancias['bull']=$b['ganancia'];			
			}
			else if($b['grupo'] == 'tiger'){
				$ganancias['tiger']=$b['ganancia'];			
			}
			else if($b['grupo'] == 'lion'){
				$ganancias['lion']=$b['ganancia'];			
			}
		}
		echo json_encode($ganancias);
	}
		
	public function get_ganancias_empresa_rango_fecha(){
		$request = json_decode(file_get_contents('php://input')); 
		$obj = array(
			'fechaInicio' => date($request->fechaInicio),
			'fechaFin' => date($request->fechaFin)
		);
		$data = $this->btl_model->get_ganancias_empresa_rango_fecha($obj);
		
		echo json_encode($data);	
	}

	public function consultar_btl_ganancias_total_empresa_by_grupo(){
		$currBtl = $this->btl_model->consultar_btl_ganancias_total_empresa_by_grupo();
		echo json_encode ($currBtl);
	}	
}

