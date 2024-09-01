<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Balance_empresa_Ctrl extends CI_Controller {
	
	public function __construct()
	{
	    parent::__construct();
		$this->load->model('balance_empresa_model');
	}	

	public static function index(){
		echo "Helo";
	}
	
	public static function get_all_balances(){
		//echo 3;
		$response = $this->balance_empresa_model->get_all_balances();
		echo json_encode($response);
	}
	
	
	public static function insertar()
	{
		$request = json_decode(file_get_contents('php://input')); 
		$data = array(
			'usuario_genera_id' => $request->usuario_genera_id,
			'monto' => $request->monto,
			'origen' => $request->origen,
			'fecha' => date("Y-m-d H:i:s")
		);
		$response = $this->balance_empresa_model->insertar($data);
		echo json_encode($response);
	}
}