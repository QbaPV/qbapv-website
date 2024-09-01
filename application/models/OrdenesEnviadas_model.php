<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class OrdenesEnviadas_Model extends CI_Model
{
    
    public function get_ordenes_enviadas_all(){
        
		// $this->db->join('clientOrders', 'client.systemaccountId = clientOrders.systemaccountId');
		$this->db->join('client', 'client.systemaccountId = clientOrders.clientId');
        $this->db->join('systemaccount', 'systemaccount.systemaccountId = client.systemaccountId');

		$query = $this->db->get('clientorders');
        //print_r($query);
		if($query){
			$data['data'] = $query->result_array();
			if($data['error'] = $this->db->error());
			return $data; 
		}
	}
}