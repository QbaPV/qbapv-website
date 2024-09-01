<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Client_Ctrl extends CI_Controller {
	
	public function __construct()
	{
	    parent::__construct();
		$this->load->model('client_model');
    }
    
    public function consultar_by_client_id(){
		$request = json_decode(file_get_contents('php://input')); 
		$data = array(
			'clientId'=> $request->clientId
		);
		echo json_encode($this->client_model->consultar_by_client_id($data));
	}
	public function consultar_all(){
		echo json_encode($this->client_model->consultar_all());
	}
}