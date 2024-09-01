<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Notificaciones_Ctrl extends CI_Controller {
	
	public function __construct()
	{
	    parent::__construct();
		$this->load->model('notificaciones_model');
    }

    public function insertar()
	{
		$request = json_decode(file_get_contents('php://input')); 
		$data = array(
			'usuario_id' => $request->usuario_id,
		  	'usuario_envia' => $request->usuario_envia,
			'fecha' => date("Y/m/d H:i:s"),
			'asunto' => $request->asunto,
			'leido' => false			
		);
		$response = $this->notificaciones_model->insertar($data);
		echo json_encode($response);
    }
    
    public function consultar_by_usuario_id(){
		$request = json_decode(file_get_contents('php://input')); 
		$data = array(
			'usuario_id'=> $request->usuario_id
		);
		echo json_encode($this->notificaciones_model->consultar_by_usuario_id($data));
	}

}