<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Punto_loyalty_Model extends CI_Model
{
	public function insertar($object)
    {
        $this->db->insert('puntos_loyalty', $object);
        $data['inserted_id'] = $this->db->insert_id();
        if($data['error'] = $this->db->error());
        return $data; 
    }
	
	public function consultar_by_usuario()
    {
		$userData = json_decode(json_encode($this->session->userdata('user_data')));
		$data['data']  = array();
		if(isset($userData)){
			$this->db->where('puntos_loyalty.usuario_id', $userData->data[0]->usuario_id);
			$query = $this->db->get('puntos_loyalty');
			$data['data']  = $query->result_array();
		}
		if($data['error'] = $this->db->error());
		return $data; 
    }
	
	public function consultar_by_usuario1($userData)
    {
		$data['data']  = array();
		if(isset($userData)){
			$this->db->where('puntos_loyalty.usuario_id', $userData['usuario_id']);
			$this->db->order_by('fecha_creado', 'DESC');
			$query = $this->db->get('puntos_loyalty');
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
			$this->db->where('puntos_loyalty.usuario_id', $userData->data[0]->usuario_id);
			$query = $this->db->get('puntos_loyalty');
			$data['data']  = $query->result_array();
		}
		if($data['error'] = $this->db->error());
		return $data; 
	}
	
	public function get_total_by_usuario1($userData){
		$data['data']  = array();
		if(isset($userData)){
			$this->db->select_sum('cantidad');
			$this->db->where('puntos_loyalty.usuario_id', $userData['usuario_id']);
			$query = $this->db->get('puntos_loyalty');
			$data['data']  = $query->result_array();
		}
		if($data['error'] = $this->db->error());
		return $data; 
	}
}