<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Retiros_Ctrl extends CI_Controller {
	
	public function __construct()
	{
	    parent::__construct();
		
		$this->load->model('retiros_model');
		$this->load->model('balances_model');
	}
	
	public function index(){
	}

	public function insertar(){
		$request = json_decode(file_get_contents('php://input')); 
		$data = array(
			'usuario_id' => $request->usuario_id,
		  	'fecha' => date("Y-m-d H:i:s"),
			  'monto' => $request->monto,
			  'moneda' => $request->moneda,
			  'estado' => "EN PROCESO",
			  'direccion' => $request->direccion,
			  'interes' => $request->interes
		);
		$response = $this->retiros_model->insertar($data);
		echo json_encode($response);
	}

	
	public function aprobar_retiro(){
		
		$request = json_decode(file_get_contents('php://input')); 
		$this->db->trans_start();
		
		switch($request->balance){
			case "Comisiones":
				$data = array(
					'usuario_id' => $request->usuario_id, 
					'balance_planes'=>  0.0,
					'balance_participaciones'=> 0.0,
					'balance_comisiones'=>  $request->total_descontar //(retiroComisiones * 1) + ($scope.tasaCom * retiroComisiones)
				);
				$this->balances_model->retirar($data);
				//print_r($data);
			break;
			case 'Participaciones':
				$data = array(
					'usuario_id' => $request->usuario_id, 
					'balance_planes'=>  0.0,
					'balance_participaciones'=>  $request->total_descontar,
					'balance_comisiones'=>  0.0				
				);
				$this->balances_model->retirar($data);
			break;
			case 'Plan':
				$data = array(
					'usuario_id' => $request->usuario_id, 
					'balance_planes'=>  $request->total_descontar,
					'balance_participaciones'=> 0.0,
					'balance_comisiones'=> 0.0				
				);
				$this->balances_model->retirar($data);
			break;
		}
		
		$this->db->trans_complete();
        if ($this->db->trans_status() === FALSE)
        {
            if($data['error'] = $this->db->error());
        }        
        return $data; 
	}
	
	
	public function actualizar_estado(){
		$request = json_decode(file_get_contents('php://input')); 
		$ret = array(
			'retiro_id'=> $request->retiro_id,
			'estado'=> $request->estado
		);
		echo json_encode($this->retiros_model->actualizar($ret));
	}

	
	public function consultarall()
	{
		$response = $this->retiros_model->consultarall();
		echo json_encode($response);
	}
	
	public function consultar_pendientes()
	{
		$response = $this->retiros_model->consultar_pendientes();
		echo json_encode($response);
	}

	public function consultar_by_user(){
		$request = json_decode(file_get_contents('php://input')); 
		$data = array(
			'usuario_id'=> $request->usuario_id
		);
		$response = $this->retiros_model->consultar_by_user($data);
		echo json_encode($response);
	}
}