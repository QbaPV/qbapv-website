<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Balances_Ctrl extends CI_Controller {
	
	public function __construct()
	{
	    parent::__construct();
		
		$this->load->model('balances_model');
	}
	
	public function index(){
		$dia_semana = date('N'); //Retorna dia de la semana en numero 1-Lunes 7-Domingo
		echo $dia_semana;
		if($dia_semana > 5) //Si dia es sabado o domingo
		{
			echo $dia_semana . " Lo sentimos no operamos los fines de semana.";
			//return;
		}
	}
	
	//----------------
	//Balances
	//----------------
	public function distribuir(){
		$request = json_decode(file_get_contents('php://input')); 
		$data = array(
			'usuario_genera_id' => $request->usuario_genera_id,
			'monto' => $request->monto,
			'origen' => $request->origen,
			'fecha' => date("Y-m-d H:i:s")
		);
		/*$data = array(
			'usuario_genera_id' => 30,
			'monto' => 1,
			'origen' => 'participacion',
			'fecha' => date("Y-m-d H:i:s")
		);*/
		
		$this->balances_model->distribuir($data);
	}
	
	public function get_balance_empresa(){
		$data = array('balances'=>array(), 'total'=>0, 'balance_part'=>0, 'balance_plan'=>0);
		$data['balances'] = $this->balances_model->get_balance_empresa();
		//Total
		foreach($data['balances']['data'] as $b){
			//Total
			$data['total'] += $b['monto'];
			//Total participaciones
			if($b['origen'] == 'participacion')
			{
				$data['balance_part'] += $b['monto'];
			}
			//Total plan
			if($b['origen'] == 'plan')
			{
				$data['balance_plan'] += $b['monto'];
			}			
		}
		echo json_encode($data);	
	}
	
	public function get_balance_inversion(){
		$data = array('balances'=>array(), 'total'=>0, 'balance_part'=>0, 'balance_plan'=>0);
		$data['balances'] = $this->balances_model->get_balance_inversion();
		//Total
		foreach($data['balances']['data'] as $b){
			//Total
			$data['total'] += $b['monto'];
			//Total participaciones
			if($b['origen'] == 'participacion')
			{
				$data['balance_part'] += $b['monto'];
			}
			//Total plan
			if($b['origen'] == 'plan')
			{
				$data['balance_plan'] += $b['monto'];
			}			
		}
		echo json_encode($data);	
	}
	
	
	public function get_balance_empresa_fecha(){
		$request = json_decode(file_get_contents('php://input')); 
		$obj = array(
			'fecha' => $request->fecha
		);
		$data = array('balances'=>array(), 'total'=>0, 'balance_part'=>0, 'balance_plan'=>0);
		$data['balances'] = $this->balances_model->get_balance_empresa_fecha($obj);
		//Total
		foreach($data['balances']['data'] as $b){
			//Total
			$data['total'] += $b['monto'];
			//Total participaciones
			if($b['origen'] == 'participacion')
			{
				$data['balance_part'] += $b['monto'];
			}
			//Total plan
			if($b['origen'] == 'plan')
			{
				$data['balance_plan'] += $b['monto'];
			}			
		}
		echo json_encode($data);	
	}

	public function get_balance_inversion_fecha(){
		$request = json_decode(file_get_contents('php://input')); 
		$obj = array(
			'fecha' => $request->fecha
		);
		$data = array('balances'=>array(), 'total'=>0, 'balance_part'=>0, 'balance_plan'=>0, 'total_usd'=>0, 'balance_part_usd'=>0, 'balance_plan_usd'=>0);
		$data['balances'] = $this->balances_model->get_balance_inversion_fecha($obj);
		//Total
		foreach($data['balances']['data'] as $b){
			//Total
			$data['total'] += $b['monto'];
			$data['total_usd'] += $b['native_amount'];
			
			//Total participaciones
			if($b['origen'] == 'participacion')
			{
				$data['balance_part'] += $b['monto'];
				$data['balance_part_usd'] += $b['native_amount'];
			}
			//Total plan
			if($b['origen'] == 'plan')
			{
				$data['balance_plan'] += $b['monto'];
				$data['balance_plan_usd'] += $b['native_amount'];
			}			
		}
		echo json_encode($data);	
	}
	
	public function get_balance_inversion_rango_fecha(){
		$request = json_decode(file_get_contents('php://input')); 
		$obj = array(
			'fechaInicio' => date($request->fechaInicio),
			'fechaFin' => date($request->fechaFin)
		);
		$data = array('balances'=>array(), 'total'=>0, 'balance_part'=>0, 'balance_plan'=>0, 'total_usd'=>0, 'balance_part_usd'=>0, 'balance_plan_usd'=>0);
		$data['balances'] = $this->balances_model->get_balance_inversion_rango_fecha($obj);
		//Total
		foreach($data['balances']['data'] as $b){
			//Total
			$data['total'] += $b['monto'];
			$data['total_usd'] += $b['native_amount'];
			//Total participaciones
			if($b['origen'] == 'participacion')
			{
				$data['balance_part'] += $b['monto'];
				$data['balance_part_usd'] += $b['native_amount'];
			}
			//Total plan
			if($b['origen'] == 'plan')
			{
				$data['balance_plan'] += $b['monto'];
				$data['balance_plan_usd'] += $b['native_amount'];
			}			
		}
		echo json_encode($data);	
	}

	public function get_balance_empresa_rango_fecha(){
		$request = json_decode(file_get_contents('php://input')); 
		$obj = array(
			'fechaInicio' => date($request->fechaInicio),
			'fechaFin' => $request->fechaFin
		);
		//print_r($obj);
		$data = array('balances'=>array(), 'total'=>0, 'balance_part'=>0, 'balance_plan'=>0);
		$data['balances'] = $this->balances_model->get_balance_empresa_rango_fecha($obj);
		//Total
		foreach($data['balances']['data'] as $b){
			//Total
			$data['total'] += $b['monto'];
			//Total participaciones
			if($b['origen'] == 'participacion')
			{
				$data['balance_part'] += $b['monto'];
			}
			//Total plan
			if($b['origen'] == 'plan')
			{
				$data['balance_plan'] += $b['monto'];
			}			
		}
		echo json_encode($data);	
	}
	
	//Consultar los porcientos de planes repartidos por fecha
	public function get_total_balance_plan_repartido(){
		$request = json_decode(file_get_contents('php://input')); 
		$obj = array(
			'fecha' => $request->fecha
			//'fecha' => "2020-07-29"
		);
		echo json_encode($this->balances_model->get_total_balance_plan_repartido($obj));
	}
	
	public function get_total_balance_plan_repartido_rango_fecha(){
		$request = json_decode(file_get_contents('php://input')); 
		$obj = array(
			'fechaInicio' => date($request->fechaInicio),
			'fechaFin' => date($request->fechaFin)
		);
		echo json_encode($this->balances_model->get_total_balance_plan_repartido_rango_fecha($obj));
	}

	//Balance General Real
	public function consultar_balance_general(){
		$response = $this->balances_model->consultar_balance_general();
		echo json_encode($response);
	}
}