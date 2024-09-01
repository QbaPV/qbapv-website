<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Videos_Model extends CI_Model
{
    public function insertar($object)
    {
        $this->db->insert('videos_promo', $object);
        $data['inserted_id'] = $this->db->insert_id();
        if($data['error'] = $this->db->error());
        return $data; 
    }

    public function actualizar($object)
    {
        $this->db->where('video_id', $object['video_id']);
        $data['wasModified'] =  $this->db->update('videos_promo', $object);
        if($data['error'] = $this->db->error());
        return $data; 
    }

	public function activar($object)
    {
		$this->desactivar_todos();
        $this->db->where('video_id', $object['video_id']);
		$object['estado'] = 1;
        $data['wasModified'] =  $this->db->update('videos_promo', $object);
		print_r($this->db->queries);
        if($data['error'] = $this->db->error());
        return $data; 
    }
	public function desactivar_todos()
    {
		$object['estado'] = 0;
        $data['wasModified'] =  $this->db->update('videos_promo', $object);
        if($data['error'] = $this->db->error());
        return $data; 
    }
	
    public function consultarall()
    {
        $query = $this->db->get('videos_promo');
        $data['data'] = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
    }

    public function consultar_activo()
    {
        $this->db->where('estado', 1);        
        $query = $this->db->get('videos_promo');
        $data['data'] = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
    }
}