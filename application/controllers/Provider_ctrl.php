<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Provider_Ctrl extends CI_Controller {
	
	public function __construct()
	{
	    parent::__construct();
		$this->load->model('provider_model');
    }
    
    public function consultar_by_provider_id(){
		$request = json_decode(file_get_contents('php://input')); 
		$data = array(
			'providerId'=> $request->providerId
		);
		echo json_encode($this->provider_model->consultar_by_provider_id($data));
	}

	public function consultar_all(){
		echo json_encode($this->provider_model->consultar_all());
	}
}