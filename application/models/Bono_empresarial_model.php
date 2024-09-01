<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Bono_empresarial_Model extends CI_Model
{
    public function insertar($object)
    {
        $this->db->insert('bono_empresarial', $object);
        $data['inserted_id'] = $this->db->insert_id();
        if($data['error'] = $this->db->error());
        return $data; 
    }
}