<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Balances_Model extends CI_Model
{
    public function distribuir($data)
    {
		//Iniciar transaction
        $this->db->trans_start();
		
		$PBE = 0.27; $PBI = 0.70; $PBoE = 0.03; 
		$BE  = $data['monto'] * $PBE;
		$BI  = $data['monto'] * $PBI;
		$BoE = $data['monto'] * $PBoE;
		
		$origen = $data['origen'];
		switch ($origen){
			case 'plan':
				//BE
				$b = $data;
				$b['monto'] = $BE;
				$this->db->insert('balance_empresa', $b);
				//print_r($b);
				
				//BI
				$b['monto'] = $BI;
				$this->db->insert('balance_inversiones', $b);
				//print_r($b);
				
				//BoE
				$b['monto'] = $BoE;
				$this->db->insert('bono_empresarial', $b);
				//print_r($b);
				
				break;
			case 'participacion':
				//BE
				$b = $data;
				$b['monto'] = $BE;
				$this->db->insert('balance_empresa', $b);
				//print_r($b);
				
				//BI
				$b['monto'] = $BI + $BoE;
				$this->db->insert('balance_inversiones', $b);
				//print_r($b);
				break;
		}
		$this->db->trans_complete();
        if ($this->db->trans_status() === FALSE)
        {
            if($data['error'] = $this->db->error());
        }        
        return $data; 		
    }

	public function consultar_balance_general_by_user($object)
    {
		$this->db->where('balances_totales.usuario_id', $object['usuario_id']);
		$query = $this->db->get('balances_totales');
        $data['data'] = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
    }
	
	public function actualizar_balance_general_by_user($object)
    {
		$this->db->where('usuario_id', $object['usuario_id']);
        $data['wasModified'] =  $this->db->update('balances_totales', $object);
        if($data['error'] = $this->db->error());
        return $data; 
    }
	
	public function insertar_balance_general($object){
		$b = $this->consultar_balance_general_by_user($object)['data'];
		if(count($b) > 0){ //Si encontro algun balance
			//Actualizar los valores
			$temp = $b[0];
			if(isset($object['balance_planes'])) $temp['balance_planes']+= $object['balance_planes'];
			if(isset($object['balance_participaciones'])) $temp['balance_participaciones'] += $object['balance_participaciones'];
			if(isset($object['balance_comisiones'])) $temp['balance_comisiones'] += $object['balance_comisiones'];
			
			return $this->actualizar_balance_general_by_user($temp);
		}
		else {
			$this->db->insert('balances_totales', $object);
			$data['inserted_id'] = $this->db->insert_id();
			if($data['error'] = $this->db->error());
			return $data;
		}
	}
	
	public function retirar($object){
		$b = $this->consultar_balance_general_by_user($object)['data'];
		if(count($b) > 0){ //Si encontro algun balance
			$temp = $b[0];
			if(isset($object['balance_planes'])) {
				if($temp['balance_planes'] >= $object['balance_planes']) {
					$temp['balance_planes'] -= $object['balance_planes'];
					$data['data'] = $this->actualizar_balance_general_by_user($temp);
				}else{
					$data['noSaldoPlanes'] = true; 
				}
			}
			
			if(isset($object['balance_participaciones'])) {
				if($temp['balance_participaciones'] >= $object['balance_participaciones']) {
					$temp['balance_participaciones'] -= $object['balance_participaciones'];
					$data['data'] = $this->actualizar_balance_general_by_user($temp);
				}else{
					$data['noSaldoParticipaciones'] = true;
				}	
			}			
			if(isset($object['balance_comisiones'])) {
				if($temp['balance_comisiones'] >= $object['balance_comisiones']){
					$temp['balance_comisiones'] -= $object['balance_comisiones'];
					$data['data'] = $this->actualizar_balance_general_by_user($temp);
				}else{
					$data['noSaldoComisiones'] = true;
				}
			}
			
			if($data['error'] = $this->db->error());
			return $data;
		}else{
			$data['data']=[];
		}
	}
	
	public function get_balance_empresa(){
		//$this->db->select_sum('monto', 'bal_empresa');
		$query = $this->db->get('balance_empresa');
        $data['data'] = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
	}
	
	public function get_balance_inversion(){
		//$this->db->select_sum('monto', 'bal_empresa');
		$query = $this->db->get('balance_inversiones');
        $data['data'] = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
	}
	
	public function get_balance_empresa_fecha($object){
		$this->db->where('balance_empresa.fecha >=', date($object['fecha'].' 00:00:00'));
		$this->db->where('balance_empresa.fecha <=', date($object['fecha'].' 23:59:59'));
		$query = $this->db->get('balance_empresa');
        $data['data'] = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
	}
	
	public function get_balance_inversion_fecha($object){
		$this->db->where('balance_inversiones.fecha >=', date($object['fecha'].' 00:00:00'));
		$this->db->where('balance_inversiones.fecha <=', date($object['fecha'].' 23:59:59'));
		$query = $this->db->get('balance_inversiones');
        $data['data'] = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
	}

	//Rango fechas
	/*public function get_balance_empresa_rango_fecha($object){
		//$this->db->where("balance_empresa.fecha >= ".date($object['fechaInicio'].' 00:00:00')." && balance_empresa.fecha <= ".date($object['fechaInicio'].' 23:59:59'));
		//$this->db->where("balance_empresa.fecha >= ".date($object['fechaFin'].' 00:00:00')." && balance_empresa.fecha <= ".date($object['fechaFin'].' 23:59:59'));
		
		$this->db->where('balance_empresa.fecha >=', date($object['fechaInicio'].' 00:00:00'));
		$this->db->where('balance_empresa.fecha <=', date($object['fechaInicio'].' 23:59:59'));
		$this->db->where('balance_empresa.fecha >=', date($object['fechaFin'].' 00:00:00'));
		$this->db->where('balance_empresa.fecha <=', date($object['fechaFin'].' 23:59:59'));

		$query = $this->db->get('balance_empresa');
		///print_r($this->db->queries);
        $data['data'] = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
	}*/
	
	public function get_balance_inversion_rango_fecha($object){
		$this->db->where('balance_inversiones.fecha >=', date($object['fechaInicio'].' 00:00:00'));
		$this->db->where('balance_inversiones.fecha <=', date($object['fechaFin'].' 23:59:59'));
		$query = $this->db->get('balance_inversiones');
        $data['data'] = $query->result_array();
		if($data['error'] = $this->db->error());
        return $data; 
	}

	//Consultar los porcientos de planes repartidos por fecha
	public function get_total_balance_plan_repartido($object){
		$this->db->select_sum('monto');
		$this->db->where('balance_planes.fecha >=', date($object['fecha'].' 00:00:00'));
		$this->db->where('balance_planes.fecha <=', date($object['fecha'].' 23:59:59'));
		$query = $this->db->get('balance_planes');
		//print_r($this->db->queries);
        $data['data'] = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
	}
	
	public function get_total_balance_plan_repartido_rango_fecha($object){
		$this->db->select_sum('monto');
		$this->db->where('balance_planes.fecha >=', date($object['fechaInicio'].' 00:00:00'));
		$this->db->where('balance_planes.fecha <=', date($object['fechaFin'].' 23:59:59'));
		$query = $this->db->get('balance_planes');
		//print_r($this->db->queries);
        $data['data'] = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
	}
	
	public function consultar_balance_general()
    {
		$this->db->select_sum('balance_planes', 'real_planes');
		$this->db->select_sum('balance_participaciones', 'real_participaciones');
		$this->db->select_sum('balance_comisiones', 'real_comisiones');
		$query = $this->db->get('balances_totales');
        $data['data'] = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
    }
}