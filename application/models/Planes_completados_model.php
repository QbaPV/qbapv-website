<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Planes_completados_Model extends CI_Model
{
    public function consultar_by_user($object)
    {
        $this->db->join('usuarios', 'usuarios.usuario_id = planes_completados.usuario_id');
        $this->db->join('planes', 'planes.plan_id = planes_completados.plan_id');
        $this->db->where('planes_completados.usuario_id', $object['usuario_id']);        
        $this->db->where('accion', "NINGUNA");  
        $query = $this->db->get('planes_completados');
        $data['data'] = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
    }
	
	
	public function consultar_all()
    {
		$this->db->select('usuarios.nombre as Name, usuarios.apellidos, planes.*, planes_completados.*' );
        $this->db->join('usuarios', 'usuarios.usuario_id = planes_completados.usuario_id');
        $this->db->join('planes', 'planes.plan_id = planes_completados.plan_id');
        $this->db->order_by('fecha_vigencia_retiro', 'DESC');
		
        $query = $this->db->get('planes_completados');
        $data['data'] = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
    }
	
	public function insertar($object)
    {
        $this->db->insert('planes_completados', $object);
        $data['inserted_id'] = $this->db->insert_id();
        if($data['error'] = $this->db->error());
        return $data; 
    }

	
    public function actualizar($object)
    {
		$data['accion'] = $object['accion'];
		$this->db->where('usuario_id', $object['usuario_id']);  
		$this->db->where('accion <>', "NINGUNA");  
		$data['wasModified'] =  $this->db->update('planes_completados', $data);
       
		if($data['error'] = $this->db->error());
        return $data;  
    }
}