<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Provider_Model extends CI_Model
{
    public function consultar_by_provider_id($object){
        $this->db->join('systemaccount', 'systemaccount.systemaccountId = provider.systemaccountId');
		$this->db->where('systemaccount.systemaccountId', $object['providerId']);
      
		$query = $this->db->get('provider');
		if($query){
			$data['data'] = $query->result_array();
			if($data['error'] = $this->db->error());
			return $data; 
		}
    }

	public function consultar_all(){
		$this->db->join("systemaccount", "provider.systemaccountId = systemaccount.systemaccountId");
		$query = $this->db->get('provider');
        $data['data']  = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
    }
}