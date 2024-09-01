<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Rol_Model extends CI_Model
{
    public function Insertar($object)
    {
        $this->db->insert('roles', $object);
        $data['inserted_id'] = $this->db->insert_id();
        if($data['error'] = $this->db->error());
        return $data; 
    }

    public function Actualizar($object)
    {
        $this->db->where('rol_id', $object['rol_id']);
        $data['wasModified'] =  $this->db->update('roles', $object);
        if($data['error'] = $this->db->error());
        return $data; 
    }

    public function ConsultarAll()
    {
        $query = $this->db->get('roles');
        $data['data'] = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
    }

    public function Consultar($object)
    {
        $this->db->where('rol_id', $object['rol_id']);
        $query = $this->db->get('roles');
        return $query->result_array();
    }

    public function Eliminar($object)
    {
        $this->db->where('rol_id', $object['rol_id']);
        $this->db->delete('roles');
        if($data['error'] = $this->db->error());
        return $data; 
    }
}
