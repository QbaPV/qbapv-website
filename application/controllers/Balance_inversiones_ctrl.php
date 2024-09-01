<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Balance_inversiones_Ctrl extends CI_Controller {
	
	public function __construct()
	{
	    parent::__construct();
		$this->load->model('balance_inversiones_model');
	}

	public function insertar()
	{
		$request = json_decode(file_get_contents('php://input')); 
		$data = array(
			'usuario_genera_id' => $request->usuario_genera_id,
			'monto' => $request->monto,
			'origen' => $request->origen,
			'fecha' => date("Y-m-d H:i:s")
		);
		$response = $this->balance_inversiones_model->insertar($data);
		echo json_encode($response);
	}
}