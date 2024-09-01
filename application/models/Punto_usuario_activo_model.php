<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Punto_usuario_activo_Model extends CI_Model
{
	public function insertar($object)
    {
        $this->db->insert('puntos_usuarios_activos', $object);
        $data['inserted_id'] = $this->db->insert_id();
        if($data['error'] = $this->db->error());
        return $data; 
    }
	
	public function consultar_by_usuario()
    {
		$userData = json_decode(json_encode($this->session->userdata('user_data')));
		$data['data']  = array();
		if(isset($userData)){
			$this->db->where('puntos_usuarios_activos.usuario_id', $userData->data[0]->usuario_id);
			$this->db->where('puntos_usuarios_activos.activo', 1);
			$query = $this->db->get('puntos_usuarios_activos');
			$data['data']  = $query->result_array();
		}
		if($data['error'] = $this->db->error());
		return $data; 
	}

	public function get_total_by_usuario1($userData){
		$data['data']  = array();
		if(isset($userData)){
			$this->db->select_sum('puntos_usuarios_activos.cantidad');
			$this->db->where('puntos_usuarios_activos.usuario_id', $userData['usuario_id']);
			$this->db->where('puntos_usuarios_activos.activo', 1);
			$query = $this->db->get('puntos_usuarios_activos');
			$data['data']  = $query->result_array();
		}
		if($data['error'] = $this->db->error());
		return $data; 
	}

	public function actualizar($object)
    {
        $this->db->where('usuario_genera_id', $object['usuario_id']);
        $data['wasModified'] =  $this->db->update('puntos_usuarios_activos', $object);
        if($data['error'] = $this->db->error());
        return $data; 
    }

		
	public function consultar_ultimos_puntos_user()
    {
		$userData = json_decode(json_encode($this->session->userdata('user_data')));
		$data['data']  = array();
		if(isset($userData)){
			$this->db->limit(1);
			$this->db->where('puntos_usuarios_activos.usuario_id', $userData->data[0]->usuario_id);
			$this->db->where('puntos_usuarios_activos.activo', 1);
			$this->db->order_by('fecha_creado', 'desc');
			$query = $this->db->get('puntos_usuarios_activos');
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
			$this->db->where('puntos_usuarios_activos.usuario_id', $userData->data[0]->usuario_id);
			$this->db->where('puntos_usuarios_activos.activo', 1);
			$query = $this->db->get('puntos_usuarios_activos');
			$data['data']  = $query->result_array();
		}
		if($data['error'] = $this->db->error());
		return $data; 
	}
	
	// public function get_total_by_usuario1($userData){
	// 	$data['data']  = array();
	// 	if(isset($userData)){
	// 		$this->db->select_sum('cantidad');
	// 		$this->db->where('puntos_usuarios_activos.usuario_id', $userData['usuario_id']);
	// 		$this->db->where('puntos_usuarios_activos.activo', 1);
	// 		$query = $this->db->get('puntos_usuarios_activos');
	// 		$data['data']  = $query->result_array();
	// 	}
	// 	if($data['error'] = $this->db->error());
	// 	return $data; 
	// }
}