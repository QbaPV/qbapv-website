<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Videos_Ctrl extends CI_Controller {
	
	public function __construct()
	{
	    parent::__construct();
		
		$this->load->model('videos_model');		
	}
	
	public function index(){
	}

	public function insertar(){
		$request = json_decode(file_get_contents('php://input')); 
		$data = array(
			'url' => $request->url,
			'descripcion' => $request->descripcion,
			'fecha' => date("Y-m-d H:i:s"),
			'estado' => 0
		);
		$this->videos_model->insertar($data);
		echo json_encode($response); 
	}

	public function actualizar()
	{
		$request = json_decode(file_get_contents('php://input')); 
		$data = array(
			'video_id'=> $request->video_id,
			'url' => $request->url,
			'estado' => $request->estado
		);
		$response = $this->videos_model->actualizar($data);
		echo json_encode($response);
	}
	
	public function activar()
	{
		$request = json_decode(file_get_contents('php://input')); 
		$data = array(
			'video_id'=> $request->video_id
		);
		$response = $this->videos_model->activar($data);
		echo json_encode($response);
	}

	public function consultarall()
	{
		$response = $this->videos_model->consultarall();
		echo json_encode($response);
	}

	public function consultar_activo(){
		$response = $this->videos_model->consultar_activo();
		echo json_encode($response);
	}
	
}