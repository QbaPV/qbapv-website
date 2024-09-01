<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class OrdenesProcesadas_Ctrl extends CI_Controller {
	
	public function __construct()
	{
	    parent::__construct();
		$this->load->model('ordenesprocesadas_model');
	}

	public function consultar_all()
	{
		$response = $this->ordenesprocesadas_model->get_ordenes_procesadas_all();
		echo json_encode($response);
	}
}