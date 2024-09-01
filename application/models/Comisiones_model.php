<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Comisiones_Model extends CI_Model
{
	public function load(){
		$this->load->model('usuario_model');
	}
	public function consultar_plan_usuario($object)
    {
		$this->db->join('plan_usuario', 'plan_usuario.plan_id = planes.plan_id');
		$this->db->join('usuarios', 'usuarios.usuario_id = plan_usuario.usuario_id');
		$this->db->where('plan_usuario.usuario_id', $object['usuario_id']);
		$query = $this->db->get('planes');
		//var_dump($this->db->queries);
        $data['data'] = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
    }
	
    public function distribuir($padres, $user)
    {
		$data = Array();
		$isActive=false;
		//Iniciar transaction
		$this->db->trans_start();
		if(strcmp($user['concepto'], "compra")==0){		
			$OK = false;
			foreach($padres as $p){	
				$comision10 = 0;
				print_r($p);
				if($user['padre_id'] == $p['usuario_id']){//Enviar al esponsor el porciento de comision de acuerdo a su plan.
					if(isset($p['plan_id'])){
						$comision = ($p['porciento_comision']/100) * $user['monto'];
					}	
					else{
						$comision = 0.10 * $user['monto'];
					}
				    
					$c = Array(
							'usuario_genera_id'=>$user['usuario_id'],
							'usuario_recibe_id'=>$user['padre_id'],
							'tipo_comision'=>'punto',
							'concepto'=>'compra',
							'monto'=> $comision,
							'activo'=> $p['activo'],
							'fecha'=> date("Y-m-d H:i:s")	
					);
					$this->db->insert('balance_comisiones', $c);
				}
				else{
					if(!$OK){
						$comision10 = $comision;	
						for($i=0; $i < count($padres); $i++){
							$comision10 = (0.10 * $comision10);
							if($padres[$i]['padre_id'] > 0){
								$c = Array(
									'usuario_genera_id'=>$padres[$i]['usuario_id'],
									'usuario_recibe_id'=>$padres[$i]['padre_id'],
									'tipo_comision'=>'punto',
									'concepto'=>'comision',
									'monto'=> $comision10,
									'activo'=> $padres[$i+1]['activo'],
									'fecha'=> date("Y-m-d H:i:s")
								);
							
								$this->db->insert('balance_comisiones', $c);
							}
						}	
					}
					$OK = true;
				}
			}	
		}
		else{
			$OK = false;
			foreach($padres as $p){	
				$comision = 0.10 * $user['monto'];
				if($user['padre_id'] == $p['usuario_id']){//Enviar al esponsor el porciento de comision de acuerdo a su plan.
					$c = Array(
							'usuario_genera_id'=>$user['usuario_id'],
							'usuario_recibe_id'=>$user['padre_id'],
							'tipo_comision'=>'punto',
							'concepto'=>'comision',
							'monto'=> $comision,
							'activo'=> $p['activo'],
							'fecha'=> date("Y-m-d H:i:s")	
					);
					$this->db->insert('balance_comisiones', $c);
				}
				else{
					if(!$OK){
						$comision10 = $comision;	
						for($i=0; $i < count($padres); $i++){
							$comision10 = (0.10 * $comision10);
							if($padres[$i]['padre_id'] > 0){
								$c = Array(
									'usuario_genera_id'=>$padres[$i]['usuario_id'],
									'usuario_recibe_id'=>$padres[$i]['padre_id'],
									'tipo_comision'=>'punto',
									'concepto'=>'comision',
									'monto'=> $comision10,
									'activo'=> $padres[$i+1]['activo'],
									'fecha'=> date("Y-m-d H:i:s")
								);							
								$this->db->insert('balance_comisiones', $c);
							}
						}	
					}
					$OK = true;
				}
			}
		}		
		$this->db->trans_complete();
        $data['data'] = $this->db->trans_status();
		if ($this->db->trans_status() === FALSE)
        {
			if($data['error'] = $this->db->error());
        }        
        return $data; 		
    }
	
	public function consultar_by_user($object)
    {
        $this->db->where('usuario_recibe_id', $object['usuario_id']);
        $query = $this->db->get('balance_comisiones');
        $data['data'] = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
    }
	
	public function get_balance_comisiones($object)
    {	
		$this->db->select_sum('monto');
        $this->db->where('usuario_recibe_id', $object['usuario_id']);
        $query = $this->db->get('balance_comisiones');
		$this->db->group_by('usuario_id');
    
        $data['data'] = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
    }
}