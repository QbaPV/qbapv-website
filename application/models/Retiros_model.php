<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Retiros_Model extends CI_Model
{
    public function insertar($object)
    {
        $this->db->insert('retiros', $object);
        $data['inserted_id'] = $this->db->insert_id();
        if($data['error'] = $this->db->error());
        return $data; 
    }

	public function actualizar($object)
    {
        $this->db->where('retiro_id', $object['retiro_id']);
        $data['wasModified'] =  $this->db->update('retiros', $object);
        if($data['error'] = $this->db->error());
        return $data; 
    }

	
    public function consultarall()
    {
        $this->db->join('usuarios', 'usuarios.usuario_id = retiros.usuario_id');
		$this->db->order_by('fecha', 'desc');
        $query = $this->db->get('retiros');
        $data['data'] = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
    }

	public function consultar_pendientes()
    {
		$this->db->where('estado', "EN PROCESO");
        $query = $this->db->get('retiros');
        $data['data'] = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
    }

	
    public function consultar_by_user($object)
    {
        $this->db->join('usuarios', 'usuarios.usuario_id = retiros.usuario_id');
        $this->db->where('usuarios.usuario_id', $object['usuario_id']);        
        $query = $this->db->get('retiros');
        $data['data'] = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
    }
}