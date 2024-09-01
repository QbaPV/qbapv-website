<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Mensajes_Ctrl extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('mensajes_model');
	}

	public function index()
	{
		
	}

	public function enviar()
	{
		$request = json_decode(file_get_contents('php://input')); 
		$data = array(
			'usuario_origen_id' => $request->usuario_origen_id,
			'usuario_destino_id' => $request->usuario_destino_id,
			'asunto'=> $request->asunto,
			'mensaje'=> $request->mensaje,
			'fecha'=> date("Y/m/d"),
			'estado'=> false
		);
		$response = $this->mensajes_model->enviar($data);
		echo json_encode($response);
	}

	public function eliminar()
	{
		
	}

	public function marcar_leido()
	{
		
	}
}
