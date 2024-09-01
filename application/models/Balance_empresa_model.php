<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Balance_empresa_Model extends CI_Model
{
	public function get_all_balances(){
        $query = $this->db->get('balance_empresa');
        $data['data']  = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 

	}
    
	public function insertar($object)
    {
        $this->db->insert('balance_empresa', $object);
        $data['inserted_id'] = $this->db->insert_id();
        if($data['error'] = $this->db->error());
        return $data; 
    }
}