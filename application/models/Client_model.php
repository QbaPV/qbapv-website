<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Client_Model extends CI_Model
{
    public function consultar_by_client_id($object){
       // $this->db->join('clientorders', 'clientorders.clientId = client.clientId');
       // $this->db->join('client', 'client.systemaccountId = clientorders.providerId');
        $this->db->join('systemaccount', 'systemaccount.systemaccountId = client.systemaccountId');
		$this->db->where('systemaccount.systemaccountId', $object['clientId']);
        
		$query = $this->db->get('client');
        //print_r($query);
		if($query){
			$data['data'] = $query->result_array();
			if($data['error'] = $this->db->error());
			return $data; 
		}
    }

	
	public function consultar_all(){
		$this->db->join("systemaccount", "client.systemaccountId = systemaccount.systemaccountId");
		$query = $this->db->get('client');
        $data['data']  = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
    }
}