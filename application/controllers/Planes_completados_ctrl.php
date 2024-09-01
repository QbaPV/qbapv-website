<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Planes_completados_Ctrl extends CI_Controller {
	
	public function __construct()
	{
	    parent::__construct();
		
		$this->load->model('planes_completados_model');		
	}

	public function get_server_day(){
		$dia_semana = date('N'); //Retorna dia de la semana en numero 1-Lunes 7-Domingo
		echo json_decode($dia_semana);
	}
	
	public function consultar_by_user(){
		$request = json_decode(file_get_contents('php://input')); 
		$data = array(
			'usuario_id'=> $request->usuario_id
		);
		$response = $this->planes_completados_model->consultar_by_user($data);
		echo json_encode($response);
	}

	public function consultar_all(){
		$response = $this->planes_completados_model->consultar_all();
		echo json_encode($response);
	}

	
	public function insertar()
	{
		$request = json_decode(file_get_contents('php://input')); 
		$data = array(
			'fecha_plan' => $request->fecha_plan,
			'usuario_id' => $request->usuario_id,
			'plan_id' => $request->plan_id,
			'fecha_vigencia_retiro' => date("Y-m-d H:i:s"),
			'accion' => $request->accion,
			'precio_plan' => $request->precio_plan,
			'porciento' => $request->porciento
		);
		$response = $this->planes_completados_model->insertar($data);
		echo json_encode($response);
	}
	
	
	public function actualizar()
	{
		$request = json_decode(file_get_contents('php://input')); 
		$data = array(
		  	'usuario_id' => $request->usuario_id,
			'accion'=> $request->accion
		);
		$response = $this->planes_completados_model->actualizar($data);
		echo json_encode($response);
	}
}