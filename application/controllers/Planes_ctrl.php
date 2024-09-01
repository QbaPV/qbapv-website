<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Planes_Ctrl extends CI_Controller {
	public function __construct()
	{
		parent::__construct();
		$this->load->model('planes_model');
	}
	public function index()
	{

	}
	public function consultarall()
	{
		$response = $this->planes_model->consultarall();
		echo json_encode($response);
	}

	//Relaciona plan con Usuarios
	public function solicitar_plan()
	{
		$request = json_decode(file_get_contents('php://input')); 
		$data = array(
			'usuario_id' => $request->usuario_id,
		  	'plan_id' => $request->plan_id,
		  	'precio' => $request->precio,
			'estado' => "pending",
			'fecha_compra' => date("Y-m-d H:i:s")			
		);
		$response = $this->planes_model->solicitar_plan($data);
		echo json_encode($response);
	}
	
	public function set_completed(){
		$request = json_decode(file_get_contents('php://input')); 
		$data = array(
			'usuario_id' => $request->usuario_id,
			'plan_id' => $request->plan_id,
		  	'estado' => "completed",
			'fecha_activacion' => date("Y-m-d H:i:s")	
		);
		echo json_encode($this->planes_model->set_completed($data));
	}

	public function consultar_usuario_plan(){
		$request = json_decode(file_get_contents('php://input')); 
		$data = array(
			'usuario_id'=> $request->usuario_id,
			'plan_id'=> $request->plan_id
		);
		$response = $this->planes_model->consultar_usuario_plan($data);
		echo json_encode($response);
	}
	
	public function consultar_planes_comprados_usuario(){
		$request = json_decode(file_get_contents('php://input')); 
		$data = array(
			'usuario_id'=> $request->usuario_id
		);
		$response = $this->planes_model->consultar_planes_comprados_usuario($data);
		echo json_encode($response);
	}

	public function consultar_by_hash(){
		$request = json_decode(file_get_contents('php://input')); 
		$data = array(
			'transaction_hash'=> $request->hash_tx
		);
		echo json_encode($this->planes_model->consultar_by_hash($data));
	}

	public function consultar_planes_grouped(){
		$response = $this->planes_model->consultar_planes_grouped();
		echo json_encode($response);
	}
	
	public function consultar_planes_comprados(){
		$response = $this->planes_model->consultar_planes_comprados();
		echo json_encode($response);
	}
	
	public function consultar_planes_comprados_by_usuario_id(){
		$request = json_decode(file_get_contents('php://input')); 
		$data = array(
			'usuario_id'=> $request->usuario_id
		);
		$response = $this->planes_model->consultar_planes_comprados_by_usuario_id($data);
		echo json_encode($response);
	}
}