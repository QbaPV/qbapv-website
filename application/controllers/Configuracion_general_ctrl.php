<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Configuracion_general_Ctrl extends CI_Controller {
	
	public function __construct()
	{
	    parent::__construct();
		$this->load->model('configuracion_general_model');
	}

	public function get_config(){
		$request = json_decode(file_get_contents('php://input')); 
		$data = array(
			'codigo'=> $request->codigo
		);
		echo json_encode($this->configuracion_general_model->get_config($data));
	}
	
}