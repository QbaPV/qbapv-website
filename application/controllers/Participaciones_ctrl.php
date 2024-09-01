<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Participaciones_Ctrl extends CI_Controller {
	
	public function __construct()
	{
	    parent::__construct();
		$this->load->model('participaciones_model');
	}

	public function insertar()
	{
		$request = json_decode(file_get_contents('php://input')); 
		$data = array(
			'usuario_id' => $request->usuario_id,
		  	'cantidad' => $request->cantidad,
		  	'precio' => $request->precio,
			'estado' => "completed",
			'fecha_activacion' => null,
			'fecha_solicitud' => date("Y-m-d H:i:s"),
			'transaction_hash' => $request->hash_tx		
		);
		$response = $this->participaciones_model->Insertar($data);
		echo json_encode($response);
	}
	
	public function insertar_config_balance_participaciones()
	{
		$request = json_decode(file_get_contents('php://input')); 
		$data = array(
			'monto' => $request->monto,
			'monto_total' => $request->monto_total,
			'monto_usd' => $request->monto_usd,
		  	'estado' => false,
			'fecha' => date("Y-m-d H:i:s"),
			'cant_participaciones' => $request->cant_participaciones
		);
		$response = $this->participaciones_model->insertar_config_balance_participaciones($data);
		echo json_encode($response);
	}
	
	public function set_completed(){
		$request = json_decode(file_get_contents('php://input')); 
		$data = array(
			'usuario_id' => $request->usuario_id,
		  	'estado' => "completed",
			'fecha_activacion' => date("Y-m-d H:i:s")	
		);
		echo json_encode($this->participaciones_model->set_completed($data));
	}

	
	public function get_total_compradas()
	{
		$cantidad = $this->participaciones_model->get_total_compradas();
		echo json_encode($cantidad['data'][0]['cantidad'] * 1);
	}
	
	public function get_total_activas()
	{
		$cantidad = $this->participaciones_model->get_total_activas();
		echo json_encode($cantidad['data'][0]['cantidad'] * 1);
	}

	public function get_grouped_by_user()
	{
		$data = $this->participaciones_model->get_grouped_by_user();
		echo json_encode($data);
	}
	
	public function get_disponibles()
	{
		$cantidad = $this->participaciones_model->get_total_compradas();
		$cantidad = $cantidad['data'][0]['cantidad'];
		$response = NUM_PARTICIPACIONES - $cantidad;
		echo json_encode($response);
	}

	public function consultar_by_usuario_id(){
		$request = json_decode(file_get_contents('php://input')); 
		$data = array(
			'usuario_id'=> $request->usuario_id
		);
		echo json_encode($this->participaciones_model->consultar_by_usuario_id($data));
	}
	
	public function consultar_all(){
		echo json_encode($this->participaciones_model->consultar_all());
	}

	public function total_by_usuario_id(){
		$request = json_decode(file_get_contents('php://input')); 
		$data = array(
			'usuario_id'=> $request->usuario_id
		);
		echo json_encode($this->participaciones_model->total_by_usuario_id($data));
	}
	
	public function consultar_by_hash(){
		$request = json_decode(file_get_contents('php://input')); 
		$data = array(
			'transaction_hash'=> $request->hash_tx
		);
		echo json_encode($this->participaciones_model->consultar_by_hash($data));
	}
	
	public function consultar_ultima_ganancia_repartida()
	{
		$data = $this->participaciones_model->consultar_ultima_ganancia_repartida();
		echo json_encode($data);
	}
	
	public function consultar_ganancias_repartidas()
	{
		$data = $this->participaciones_model->consultar_ganancias_repartidas();
		echo json_encode($data);
	}

	public function set_promocion_active(){
		$request = json_decode(file_get_contents('php://input')); 
		$data = array(
			'codigo' => $request->codigo,
			'valor' => $request->valor
		);
		echo json_encode($this->participaciones_model->set_promocion_active($data));
	}

}