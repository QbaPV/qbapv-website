<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Depositos_Ctrl extends CI_Controller {
	
	public function __construct()
	{
	    parent::__construct();
		
		$this->load->model('depositos_model');		
		$this->load->model('balance_comisiones_model');		
		$this->load->model('balances_model');		
		$this->load->model('notificaciones_model');		
	}
	
	public function index(){
	}

	public function insertar(){
		$request = json_decode(file_get_contents('php://input')); 
		$fecha = date("Y-m-d H:i:s");
		$data = array(
			'usuario_id' => $request->usuario_id,
		  	'fecha' => $fecha,
			'monto' => $request->monto,
		  	'monto_usd' => $request->monto_usd,
			'descripcion' => $request->descripcion
		);
		$this->db->trans_start();
		//Registrar deposito
		$this->depositos_model->insertar($data);
		//Generar balance comisiones
		$data = array(
			'usuario_genera_id' => 1,
			'usuario_recibe_id' => $request->usuario_id,
		  	'tipo_comision' => "punto",
		  	'monto' => $request->monto,
			'concepto' => "bonificacion",
			'activo' => 1,
			'descripcion' =>  $request->descripcion,
			'fecha' => $fecha
		);
		$this->balance_comisiones_model->insertar($data);
		//Actualizar el balance General
		$bgc = array(
			'usuario_id' =>  $request->usuario_id,
			'balance_comisiones'=> $request->monto,
		);
		$this->balances_model->insertar_balance_general($bgc);
		//Generar Notificacion
		$noti = array(
			'usuario_id'=>  $request->usuario_id,
			'usuario_envia'=>1,
			'fecha'=> $fecha,
			'asunto'=> $request->monto . ' ' . utf8_encode($this->lang->line('msg_bonificacion_deposito')),
			'leido'=> 0
		);
		$this->notificaciones_model->insertar($noti);
		
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
		$response = $this->depositos_model->consultarall();
		echo json_encode($response);
	}

	public function consultar_by_user(){
		$request = json_decode(file_get_contents('php://input')); 
		$data = array(
			'usuario_id'=> $request->usuario_id
		);
		$response = $this->depositos_model->consultar_by_user($data);
		echo json_encode($response);
	}
	
}