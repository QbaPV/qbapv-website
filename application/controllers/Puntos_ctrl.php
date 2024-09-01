<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Puntos_Ctrl extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('punto_plan_model');
		$this->load->model('punto_participaciones_model');
		$this->load->model('punto_loyalty_model');
	}

	public function index()
	{
		//$data = $this->punto_plan_model->consultar_by_usuario();
		//print_r(json_encode($data));
	}
	
	public function get_puntos_loyalty_by_user(){
		$request = json_decode(file_get_contents('php://input')); 
		$data = array(
			'usuario_id' => $request->usuario_id
		);
		$lyp = $this->punto_loyalty_model->consultar_by_usuario1($data);
		echo json_encode($lyp);
	}
	
	public function get_totales(){
		$lp = array(
			'totales'=> 0,
			'transferibles'=> 0,
		);
		$transf = $this->punto_loyalty_model->get_total_by_usuario()['data'];
		$PnP = $this->punto_plan_model->get_total_by_usuario()['data'];
	    $PtP = $this->punto_participaciones_model->get_total_by_usuario()['data'];
		
		if(count($transf) > 0) $tr =  $transf[0]['cantidad']; else $tr = 0;
		if(count($PnP) > 0) $pn =  $PnP[0]['cantidad']; else $pn = 0;
		if(count($PtP) > 0) $pt =  $PtP[0]['cantidad']; else $pt = 0;
		
		$lp = array(
			'totales'=> $tr + $pn + $pt,
			'transferibles'=> $tr + 0
		);
		
		echo json_encode($lp);
	}
	
	public function get_totales_by_user(){
		$request = json_decode(file_get_contents('php://input')); 
		$data = array(
			'usuario_id' => $request->usuario_id
		);
		$lp = array(
			'totales'=> 0,
			'transferibles'=> 0,
		);
		$transf = $this->punto_loyalty_model->get_total_by_usuario1($data)['data'];
		$PnP = $this->punto_plan_model->get_total_by_usuario1($data)['data'];
	    $PtP = $this->punto_participaciones_model->get_total_by_usuario1($data)['data'];
		
		if(count($transf) > 0) $tr =  $transf[0]['cantidad']; else $tr = 0;
		if(count($PnP) > 0) $pn =  $PnP[0]['cantidad']; else $pn = 0;
		if(count($PtP) > 0) $pt =  $PtP[0]['cantidad']; else $pt = 0;
		
		$lp = array(
			'totales'=> $tr + $pn + $pt,
			'transferibles'=> $tr + 0
		);
		
		echo json_encode($lp);
	}
	
	public function insertar_pnp()
	{
		$request = json_decode(file_get_contents('php://input')); 
		$data = array(
			'usuario_id' => $request->usuario_id,
			'plan_id' => $request->plan_id,
			'cantidad'=> $request->cantidad,
			'fecha'=> date("Y/m/d"),
			'activo'=>1
		);
		$response = $this->punto_plan_model->insertar($data);
		echo json_encode($response);
	}
	
	public function insertar_ptp()
	{
		$request = json_decode(file_get_contents('php://input')); 
		$data = array(
			'usuario_id' => $request->usuario_id,
			'plan_id' => $request->plan_id,
			'cantidad'=> $request->cantidad,
			'fecha'=> date("Y/m/d"),
			'activo'=>1
		);
		$response = $this->punto_participaciones_model->insertar($data);
		echo json_encode($response);
	}
	
	public function insertar_lyp()
	{
		$request = json_decode(file_get_contents('php://input')); 
		$data = array(
			'usuario_id' => $request->usuario_id,
			'cantidad'=> $request->cantidad,
			'fecha'=> date("Y/m/d"),
			'activo'=>1
		);
		//$dias = $request->dias;
		$after3months = new DateTime(date('Y-m-d', strtotime(date('Y-m-d')."+3 months")));
		;
		$p = array(
			'usuario_id' => $data['usuario_id'],
			'cantidad'=> $data['cantidad'],
			'fecha_creado'=> date("Y/m/d H:i:s"),
			'fecha_vence'=> $after3months->Format("Y/m/d H:i:s"),
			'activo'=>1,
			'descripcion'=>$this->lang->line('loyalp_19'),
			'origen'=>"regalo"
		);
		$response = $this->punto_loyalty_model->insertar($p);
		echo json_encode($response);
	}
	
	
}
