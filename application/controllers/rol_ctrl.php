<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Rol_Ctrl extends CI_Controller {

	public function __construct()
	{
	    parent::__construct();
	    $this->load->model('rol_model');
	}

	public function index()
	{
		$this->load->view("rol_list");
	}

	public function ConsultarAll()
	{
		echo json_encode($this->rol_model->ConsultarAll());
	}

	public function Consultar()
	{
		$request = json_decode(file_get_contents('php://input')); 
		$data = array(
			'rol_id'=> $request->rol_id
		);
		echo json_encode($this->rol_model->Consultar($data));
	}

	public function Insertar()
	{
		$request = json_decode(file_get_contents('php://input')); 
		$data = array(
			'rol' => $request->rol
		);
		$response = $this->rol_model->Insertar($data);
		echo json_encode($response);
	}

	public function Actualizar()
	{
		$request = json_decode(file_get_contents('php://input')); 
		$data = array(
			'rol_id'=> $request->rol_id,
			'rol' => $request->rol
		);
		$response = $this->rol_model->Actualizar($data);
		echo json_encode($response);
	}

	public function Eliminar()
	{
		$request = json_decode(file_get_contents('php://input')); 
		$data = array(
			'rol_id'=> $request->rol_id
		);
		$response =  $this->rol_model->Eliminar($data);
		echo json_encode($response);
	}
}