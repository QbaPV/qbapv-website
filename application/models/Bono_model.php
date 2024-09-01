<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Bono_Model extends CI_Model
{
    public function actualizar_bono($object)
    {
		//Consultar el existente
		$obj = array();
		if($object['tipo'] == 'R'){
			$obj = $this->consultar_br();
		}else{
			$obj = $this->consultar_be();
		}
		$bono = $obj['data'][0];
		
		//$object['valor'] = $object['valor'] + $bono['valor'];
		$bono['valor'] = $bono['valor'] + $object['valor'];
		
		$this->db->where('tipo', $object['tipo']);
        $data['wasModified'] =  $this->db->update('bono', $bono);
        if($data['error'] = $this->db->error());
        return $data; 
    }
	
	
	public function insertar_be_detalle($object)
    {
        $this->db->insert('bono_empresarial', $object);
        $data['inserted_id'] = $this->db->insert_id();
        if($data['error'] = $this->db->error());
        return $data; 
    }
	public function insertar_br_detalle($object)
    {
        $this->db->insert('bono_retroactivo', $object);
        $data['inserted_id'] = $this->db->insert_id();
        if($data['error'] = $this->db->error());
        return $data; 
    }

	public function consultar_be()
    {
        $this->db->where('bono.tipo', 'E');        
        $query = $this->db->get('bono');
        $data['data'] = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
    }
	
	public function consultar_br()
    {
        $this->db->where('bono.tipo', 'R');        
        $query = $this->db->get('bono');
        $data['data'] = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
    }
	
	public function consultarall()
    {
        $query = $this->db->get('bono');
        $data['data'] = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
    }
	
	public function consultar_br_detalle()
    {
		$this->db->order_by('fecha', 'DESC');
        $query = $this->db->get('bono_retroactivo');
        $data['data'] = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
    }
	
	
	public function consultar_total_br()
    {
		$this->db->where('tipo', 'R');
        $query = $this->db->get('bono');
		$data['data'] = $query->result_array();
        if($data['error'] = $this->db->error());
        
		return $data; 
    }
	
	public function actualizar_br($object){
		$this->db->where('bono_id', $object['bono_id']);
        $data['wasModified'] =  $this->db->update('bono_retroactivo', $object);
        if($data['error'] = $this->db->error());
        return $data; 
	}
	
	public function consultar_be_detalle()
    {
        $this->db->order_by('fecha', 'DESC');
        $query = $this->db->get('bono_empresarial');
        $data['data'] = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
    }
	
	public function consultar_total_be()
    {
		$this->db->where('tipo', 'E');
        $query = $this->db->get('bono');
		$data['data'] = $query->result_array();
        if($data['error'] = $this->db->error());
        
		return $data; 
    }
	
}