<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Punto_plan_Model extends CI_Model
{
	public function insertar($object)
    {
        $this->db->insert('puntos_plan', $object);
        if($data['error'] = $this->db->error());
        return $data; 
    }
	
	public function consultar_by_usuario()
    {
		$userData = json_decode(json_encode($this->session->userdata('user_data')));
		$data['data']  = array();
		//print_r($userData);
		if(isset($userData)){		
			//$this->db->join('participaciones', 'participaciones.participaciones_id = puntos_participaciones.participacion_id');	
			$this->db->where('puntos_plan.usuario_id', $userData->data[0]->usuario_id);
			$query = $this->db->get('puntos_plan');
			$data['data']  = $query->result_array();
        }
		if($data['error'] = $this->db->error());
		return $data;
    }
	
	public function get_total_by_usuario(){
		$userData = json_decode(json_encode($this->session->userdata('user_data')));
		$data['data']  = array();
		if(isset($userData)){
			$this->db->select_sum('cantidad');
			$this->db->where('usuario_id', $userData->data[0]->usuario_id);
			$query = $this->db->get('puntos_plan');
			$data['data']  = $query->result_array();
		}
		if($data['error'] = $this->db->error());
		return $data; 
	}
	
	public function get_total_by_usuario1($userData){
		$data['data']  = array();
		if(isset($userData)){
			$this->db->select_sum('cantidad');
			$this->db->where('usuario_id', $userData['usuario_id']);
			$query = $this->db->get('puntos_plan');
			$data['data']  = $query->result_array();
		}
		if($data['error'] = $this->db->error());
		return $data; 
	}

}