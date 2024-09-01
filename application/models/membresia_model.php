<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Membresia_Model extends CI_Model
{

    //-------------------------------------------
	//MEMBRESIA CATALOGO
	//--------------------------------------------

    public function Insertar($object)
    {
        $this->db->insert('catalogo_membresias', $object);
        $data['inserted_id'] = $this->db->insert_id();
        if($data['error'] = $this->db->error());
        return $data; 
    }

    public function Actualizar($object)
    {
        $this->db->where('catalogo_membresia_id', $object['catalogo_membresia_id']);
        $data['wasModified'] =  $this->db->update('catalogo_membresias', $object);
        if($data['error'] = $this->db->error());
        return $data; 
    }

    public function ConsultarAll()
    {
        $query = $this->db->get('catalogo_membresias');
        $data['data'] = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
    }

    public function Consultar($object)
    {
        $this->db->where('catalogo_membresia_id', $object['catalogo_membresia_id']);
        $query = $this->db->get('catalogo_membresias');
        return $query->result_array();
    }

    public function Eliminar($object)
    {
        $this->db->where('catalogo_membresia_id', $object['catalogo_membresia_id']);
        $this->db->delete('catalogo_membresias');
        if($data['error'] = $this->db->error());
        return $data; 
    }

    //-------------------------------------------
	//MEMBRESIA periodo - precio
    //--------------------------------------------
    public function InsertarMembresia($object)
    {
        $this->db->insert('membresias', $object);
        $data['inserted_id'] = $this->db->insert_id();
        if($data['error'] = $this->db->error());
        return $data; 
    }

    public function ActualizarMembresia($object)
    {
        $this->db->where('membresia_id', $object['membresia_id']);
        $data['wasModified'] =  $this->db->update('membresias', $object);
        if($data['error'] = $this->db->error());
        return $data; 
    }

    public function ConsultarMembresiaAll()
    {
        $this->db->join('catalogo_membresias', 'catalogo_membresias.catalogo_membresia_id = membresias.catalogo_membresia_id');
        $query = $this->db->get('membresias');
        $data['data'] = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
    }

    public function ConsultarMembresia($object)
    {
        $this->db->where('membresia_id', $object['membresia_id']);
        $query = $this->db->get('membresias');
        return $query->result_array();
    }

    public function EliminarMembresia($object)
    {
        $this->db->where('membresia_id', $object['membresia_id']);
        $this->db->delete('membresias');
        if($data['error'] = $this->db->error());
        return $data; 
    }
}
