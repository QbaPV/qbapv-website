<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class OrdenesProcesadas_Model extends CI_Model
{
    
    public function get_ordenes_procesadas_all(){
        $this->db->join('clientorders', 'clientorders.orderId = procesecedorders.orderId');
        $this->db->join('provider', 'provider.systemaccountId = procesecedorders.providerId');
        $this->db->join('systemaccount', 'systemaccount.systemaccountId = provider.systemaccountId');

		$query = $this->db->get('procesecedorders');
        //print_r($query);
		if($query){
			$data['data'] = $query->result_array();
			if($data['error'] = $this->db->error());
			return $data; 
		}
	}
}