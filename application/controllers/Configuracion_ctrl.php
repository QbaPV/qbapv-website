<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Configuracion_Ctrl extends CI_Controller {
	
	public function __construct()
	{
	    parent::__construct();
		$this->load->model('configuracion_model');
	}
	public function index(){
	//	 $resp= $this->configuracion_model->consultar_porciento_actual_retorno();
	//	 print_r($resp['data'][0]['porciento_actual']);
	}
	
	public function insertar_grupo_comision(){
		$request = json_decode(file_get_contents('php://input'));  
		$data = array(
			'nombre' => $request->nombre
		);
		$response = $this->configuracion_model->insertar_grupo_comision($data);
		echo json_encode($response);
	}
	
	public function consultar_grupo_comision_all(){
		$response = $this->configuracion_model->consultar_grupo_comision_all();
		echo json_encode($response);
	}
	
	//USAR GRUPO
	public function usar_grupo(){
		$request = json_decode(file_get_contents('php://input'));  
		$data = array(
			'grupo_porciento_id' => $request->grupo_porciento_id
		);
		$response = $this->configuracion_model->usar_grupo($data);
		//$this->configuracion_model->ingresar_porciento_comision_usado($data);
		echo json_encode($response);
	}
	
	//REINICIAR GRUPO
	public function reset_grupo(){
		$request = json_decode(file_get_contents('php://input'));  
		$data = array(
			'grupo_porciento_id' => $request->grupo_porciento_id
		);
		$response = $this->configuracion_model->reset_grupo($data);
		echo json_encode($response);
	}
	
	public function eliminar_grupo(){
		$request = json_decode(file_get_contents('php://input'));  
		$data = array(
			'grupo_porciento_id' => $request->grupo_porciento_id
		);
		$response = $this->configuracion_model->eliminar_grupo($data);
		echo json_encode($response);
	}
	
	//Porcientos
	public function insertar_porcientos(){
		$request = json_decode(file_get_contents('php://input'));  
		$data = array(
			'grupo_porciento_id' => $request->grupo_porciento_id,
			'valor'=>$request->valor
		);
		$response = $this->configuracion_model->insertar_porcientos($data);
		echo json_encode($response);
	}
	
	public function consultar_porciento_comision(){
		$request = json_decode(file_get_contents('php://input'));  
		$data = array(
			'grupo_porciento_id' => $request->grupo_porciento_id
		);
		$response = $this->configuracion_model->consultar_porciento_comision();
		echo json_encode($response);
	}
	
	public function consultar_porciento_comision_all(){
		$response = $this->configuracion_model->consultar_porciento_comision_all();
		echo json_encode($response);
	}
	
	
	public function eliminar_porciento()
	{
		$request = json_decode(file_get_contents('php://input')); 
		$data = array(
			'porciento_comision_id'=> $request->porciento_comision_id
		);
		$response =  $this->configuracion_model->eliminar_porciento($data);
		echo json_encode($response);
	}
	
	public function consultar_porciento_actual_retorno(){
		 $resp= $this->configuracion_model->consultar_porciento_actual_retorno();
		 echo json_encode(json_decode($resp['data'][0]['porciento_actual']));
	}
}