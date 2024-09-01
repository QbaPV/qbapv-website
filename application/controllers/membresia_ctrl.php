<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Membresia_Ctrl extends CI_Controller {

	public function __construct()
	{
	    parent::__construct();
	    $this->load->model('membresia_model');
	}


	//-------------------------------------------
	//CATALOGO MEMBRESIA
	//--------------------------------------------
	public function index()
	{
		$this->load->view("catalogo_membresia_list");
	}

	public function ConsultarAll()
	{
		echo json_encode($this->membresia_model->ConsultarAll());
	}

	public function Consultar()
	{
		$request = json_decode(file_get_contents('php://input')); 
		$data = array(
			'membresia_id'=> $request->membresia_id
		);
		echo json_encode($this->membresia_model->Consultar($data));
	}

	public function Insertar()
	{
		$request = json_decode(file_get_contents('php://input')); 
		if(!isset($request->descuento_compra_mayorista)) $request->descuento_compra_mayorista = 0;
		if(!isset($request->cash_back_compras)) $request->cash_back_compras = 0;
		if(!isset($request->cash_back_publicidad)) $request->cash_back_publicidad = 0;
		if(!isset($request->retiro_minimo)) $request->retiro_minimo = 0;
		if(!isset($request->shipping_nacional)) $request->shipping_nacional = 0;
		if(!isset($request->loyalty_bonus)) $request->loyalty_bonus = 0;
		if(!isset($request->cantidad_retiros)) $request->cantidad_retiros = 0;
		if(!isset($request->publicar_tienda)) $request->publicar_tienda = 0;
		if(!isset($request->trading_afiliados)) $request->trading_afiliados = 0;
		if(!isset($request->cash_back_viajes)) $request->cash_back_viajes = 0;
		if(!isset($request->black_day)) $request->black_day = 0;
		if(!isset($request->tarjeta_debito)) $request->tarjeta_debito = 0;
		if(!isset($request->tarjeta_asociado)) $request->tarjeta_asociado = 0;
		if(!isset($request->decal)) $request->decal = 0;
		if(!isset($request->publicar_sorteo)) $request->publicar_sorteo = false;
		$data = array(
			'nombre' => $request->nombre,
			'descripcion' => $request->descripcion,
			'descuento_compra_mayorista' => $request->descuento_compra_mayorista,
			'cash_back_compras' => $request->cash_back_compras,
			'cash_back_publicidad' => $request->cash_back_publicidad,
			'retiro_minimo' => $request->retiro_minimo,
			'shipping_nacional' => $request->shipping_nacional,
			'loyalty_bonus' => $request->loyalty_bonus,
			'cantidad_retiros' => $request->cantidad_retiros,
			'publicar_tienda' => $request->publicar_tienda,
			'trading_afiliados' => $request->trading_afiliados,
			'cash_back_viajes' => $request->cash_back_viajes,
			'black_day' => $request->black_day,
			'publicar_sorteo' => $request->publicar_sorteo,
			'tarjeta_debito' => $request->tarjeta_debito,
			'tarjeta_asociado' => $request->tarjeta_asociado,
			'decal' => $request->decal
		);
		$response = $this->membresia_model->Insertar($data);
		echo json_encode($response);
	}

	public function Actualizar()
	{
		$request = json_decode(file_get_contents('php://input')); 
		$data = array(
			'catalogo_membresia_id'=> $request->catalogo_membresia_id,
			'nombre' => $request->nombre,
			'descripcion' => $request->descripcion,
			'descuento_compra_mayorista' => $request->descuento_compra_mayorista,
			'cash_back_compras' => $request->cash_back_compras,
			'cash_back_publicidad' => $request->cash_back_publicidad,
			'retiro_minimo' => $request->retiro_minimo,
			'shipping_nacional' => $request->shipping_nacional,
			'loyalty_bonus' => $request->loyalty_bonus,
			'cantidad_retiros' => $request->cantidad_retiros,
			'publicar_tienda' => $request->publicar_tienda,
			'trading_afiliados' => $request->trading_afiliados,
			'cash_back_viajes' => $request->cash_back_viajes,
			'black_day' => $request->black_day,
			'publicar_sorteo' => $request->publicar_sorteo,
			'tarjeta_debito' => $request->tarjeta_debito,
			'tarjeta_asociado' => $request->tarjeta_asociado,
			'decal' => $request->decal
		);
		$response = $this->membresia_model->Actualizar($data);
		echo json_encode($response);
	}

	public function Eliminar()
	{
		$request = json_decode(file_get_contents('php://input')); 
		$data = array(
			'catalogo_membresia_id'=> $request->catalogo_membresia_id
		);
		$response =  $this->membresia_model->Eliminar($data);
		echo json_encode($response);
	}

	//-------------------------------------------
	//MEMBRESIA periodo - precio
	//--------------------------------------------

	public function Membresia()
	{
		$this->load->view("membresia_list");
	}

	public function ConsultarMembresiaAll()
	{
		echo json_encode($this->membresia_model->ConsultarMembresiaAll());
	}

	public function ConsultarMembresia()
	{
		$request = json_decode(file_get_contents('php://input')); 
		$data = array(
			'membresia_id'=> $request->membresia_id
		);
		echo json_encode($this->membresia_model->ConsultarMembresia($data));
	}

	public function InsertarMembresia()
	{
		$request = json_decode(file_get_contents('php://input')); 
		$data = array(
			'catalogo_membresia_id' => $request->catalogo_membresia_id,
			'precio' => $request->precio,
			'periodo' => $request->periodo
		);
		$response = $this->membresia_model->InsertarMembresia($data);
		echo json_encode($response);
	}

	public function ActualizarMembresia()
	{
		$request = json_decode(file_get_contents('php://input')); 
		$data = array(
			'membresia_id'=> $request->membresia_id,
			'catalogo_membresia_id' => $request->catalogo_membresia_id,
			'precio' => $request->precio,
			'periodo' => $request->periodo
		);
		$response = $this->membresia_model->ActualizarMembresia($data);
		echo json_encode($response);
	}

	public function EliminarMembresia()
	{
		$request = json_decode(file_get_contents('php://input')); 
		$data = array(
			'membresia_id'=> $request->membresia_id
		);
		$response =  $this->membresia_model->EliminarMembresia($data);
		echo json_encode($response);
	}

}