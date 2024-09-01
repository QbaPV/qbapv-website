<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Mensajes_Model extends CI_Model
{
    public function enviar($object)
    {
        $this->db->insert('mensajes', $object);
        $data['inserted_id'] = $this->db->insert_id();
        if($data['error'] = $this->db->error());
        return $data; 
    }

    public function marcar_leido($object)
    {
        
    }

    public function eliminar($object)
    {
        
    }

}