<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Punto_participaciones_Model extends CI_Model
{
	public function insertar($object)
    {
        $this->db->insert('puntos_participaciones', $object);
        if($data['error'] = $this->db->error());
        return $data; 
    }
	
	public function consultar_by_usuario()
    {
		$userData = json_decode(json_encode($this->session->userdata('user_data')));
		$data['data']  = array();
		if(isset($userData)){		
			$this->db->join('participaciones', 'participaciones.participaciones_id = puntos_participaciones.participacion_id');	
			$this->db->where('participaciones.usuario_id', $userData->data[0]->usuario_id);
			$query = $this->db->get('puntos_participaciones');
			$data['data']  = $query->result_array();
        }
		if($data['error'] = $this->db->error());
		return $data;
    }
	
	public function get_total_by_usuario(){
		$userData = json_decode(json_encode($this->session->userdata('user_data')));
		$data['data']  = array();
		if(isset($userData)){
			$this->db->join('puntos_participaciones', ' participaciones.participaciones_id=puntos_participaciones.participacion_id ');	
			$this->db->select_sum('puntos_participaciones.cantidad');
			$this->db->where('participaciones.usuario_id', $userData->data[0]->usuario_id);
			$query = $this->db->get('participaciones');
			$data['data']  = $query->result_array();
		}
		if($data['error'] = $this->db->error());
		return $data; 
	}
	
	public function get_total_by_usuario1($userData){
		$data['data']  = array();
		if(isset($userData)){
			$this->db->join('puntos_participaciones', ' participaciones.participaciones_id=puntos_participaciones.participacion_id ');	
			$this->db->select_sum('puntos_participaciones.cantidad');
			$this->db->where('participaciones.usuario_id', $userData['usuario_id']);
			$query = $this->db->get('participaciones');
			$data['data']  = $query->result_array();
		}
		if($data['error'] = $this->db->error());
		return $data; 
	}
}