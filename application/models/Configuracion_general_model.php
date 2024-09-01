<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Configuracion_general_Model extends CI_Model
{
     public function get_config($object){
        $this->db->where('codigo', $object['codigo']);
        $query = $this->db->get('config_general');
        $data['data']  = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
    }
}