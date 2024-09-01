<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Depositos_Model extends CI_Model
{
    public function insertar($object)
    {
        $this->db->insert('depositos', $object);
        $data['inserted_id'] = $this->db->insert_id();
        if($data['error'] = $this->db->error());
        return $data; 
    }

    public function consultarall()
    {
        $this->db->join('usuarios', 'usuarios.usuario_id = depositos.usuario_id');
        $this->db->order_by('depositos.fecha','DESC');
		$query = $this->db->get('depositos');
        $data['data'] = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
    }

    public function consultar_by_user($object)
    {
        $this->db->join('usuarios', 'usuarios.usuario_id = depositos.usuario_id');
        $this->db->where('usuarios.usuario_id', $object['usuario_id']);        
        $this->db->order_by('depositos.fecha', 'DESC');
		$query = $this->db->get('depositos');
        $data['data'] = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
    }
}