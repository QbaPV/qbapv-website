<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class OrdenesEnviadas_Ctrl extends CI_Controller {
	
	public function __construct()
	{
	    parent::__construct();
		$this->load->model('ordenesenviadas_model');
	}

	public function consultar_all()
	{
		$response = $this->ordenesenviadas_model->get_ordenes_enviadas_all();
		echo json_encode($response);
	}
}