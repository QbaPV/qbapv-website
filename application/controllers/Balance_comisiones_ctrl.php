<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Balance_comisiones_Ctrl extends CI_Controller {
	
	public function __construct()
	{
	    parent::__construct();
		$this->load->model('balance_comisiones_model');
	}

	public function insertar()
	{
		$request = json_decode(file_get_contents('php://input')); 
		$data = array(
			'usuario_genera_id' => $request->usuario_genera_id,
			'usuario_recibe_id' => $request->usuario_recibe_id,
		  	'tipo_comision' => "puntos",
		  	'monto' => $request->monto,
			'concepto' => "compra",
			'fecha' => date("Y-m-d H:i:s")
		);
		$response = $this->balance_comisiones_model->insertar($data);
		echo json_encode($response);
	}
}