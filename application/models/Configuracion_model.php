<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Configuracion_Model extends CI_Model
{
	//Grupos
	public function insertar_grupo_comision($object)
    {
        $this->db->insert('grupo_porciento_comisiones', $object);
        $data['inserted_id'] = $this->db->insert_id();
        if($data['error'] = $this->db->error());
        return $data; 
    }
	public function consultar_grupo_comision_all()
    {
		$this->db->order_by('nombre', 'asc');
        $query = $this->db->get('grupo_porciento_comisiones');
        $data['data'] = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
    }
	
	public function eliminar_grupo($object)
    {
		$this->db->trans_start();
        
		$this->db->where('grupo_porciento_comisiones.grupo_porciento_id', $object['grupo_porciento_id']);
        $this->db->delete('grupo_porciento_comisiones');
        
		$this->db->where('porciento_comision.grupo_porciento_id', $object['grupo_porciento_id']);
		$this->db->delete('porciento_comision');

		$this->db->trans_complete();
        $data['data'] = $this->db->trans_status();
		if ($this->db->trans_status() === FALSE)
        {
			if($data['error'] = $this->db->error());
        }        
        return $data; 				
    }

	public function usar_grupo($object){
		$this->db->trans_start();
        
		$data = array('seleccionado'=>0);
		$this->db->update('grupo_porciento_comisiones', $data);
		
		$data = array('seleccionado'=>1);
		$this->db->where('grupo_porciento_comisiones.grupo_porciento_id', $object['grupo_porciento_id']);
		$this->db->update('grupo_porciento_comisiones', $data);
		
		$this->ingresar_porciento_comision_usado($object);
		
		$this->db->trans_complete();
        $data['data'] = $this->db->trans_status();
		if ($this->db->trans_status() === FALSE)
        {
			if($data['error'] = $this->db->error());
        }        
        return $data; 			
	}
	
	public function reset_grupo($object){
		$data = Array(
			'usado' => 0
		);
		$this->db->where('porciento_comision.grupo_porciento_id', $object['grupo_porciento_id']);
		$data['wasModified'] = $this->db->update('porciento_comision', $data);
		if($data['error'] = $this->db->error());
        return $data; 			
	}	
		
	//Porcientos
	public function insertar_porcientos($object)
    {
        $this->db->insert('porciento_comision', $object);
        $data['inserted_id'] = $this->db->insert_id();
        if($data['error'] = $this->db->error());
        return $data; 
    }
	public function consultar_porciento_comision($object)
    {
		$this->db->where('grupo_porciento_id', $object['grupo_porciento_id']);
        $query = $this->db->get('porciento_comision');
        $data['data'] = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
    }
	
	public function consultar_porciento_comision_all()
    {
        $query = $this->db->get('porciento_comision');
        $data['data'] = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
    }	
	
    public function eliminar_porciento($object)
    {
        $this->db->where('porciento_comision_id', $object['porciento_comision_id']);
        $this->db->delete('porciento_comision');
        if($data['error'] = $this->db->error());
        return $data; 
    }
	
	//---------------------------------------
	// Detalles de Porcientos comision usados
	//---------------------------------------
	
	public function ingresar_porciento_comision_usado($object)
    {	
		//print_r($object);
		//Ultimo grupo usado
		$ultimosUsados = $this->consultar_top_4_porciento_comision_usado();
		if(count($ultimosUsados['data']) > 0){
			$ultimoUsado = $ultimosUsados['data'][0];
			
			$desde_after7days = new DateTime(date('Y-m-d', strtotime($ultimoUsado['fecha_desde']."+7 days"))); //7 dias despues para la proxima fecha desde
			$hasta_after7days = new DateTime(date('Y-m-d', strtotime($ultimoUsado['fecha_hasta']."+7 days"))); //7 dias despues para la proxima fecha hasta
		
			$data = Array(
				"fecha_desde"=>$desde_after7days->format("Y/m/d H:i:s"),
				"fecha_hasta"=>$hasta_after7days->format("Y/m/d H:i:s"),
				"grupo_porciento_id"=>$object['grupo_porciento_id']
			);
			//print_r($data);
			$this->db->insert('porciento_comision_usados', $data);
			if($data['error'] = $this->db->error());
			return $data;
		}		 
    }
	
	public function consultar_top_4_porciento_comision_usado()
    {
		$this->db->limit('4');
		$this->db->join('grupo_porciento_comisiones', 'porciento_comision_usados.grupo_porciento_id = grupo_porciento_comisiones.grupo_porciento_id');
        $this->db->where('grupo_porciento_comisiones.seleccionado', 0);
		$this->db->order_by('porciento_comision_usado_id', 'DESC');
		$query = $this->db->get('porciento_comision_usados');
		$data['data'] = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
    }	
	
	public function consultar_porciento_actual_retorno()
    {
		$this->db->select("(sum(grupo_porciento_comisiones.nombre) / 4 / 5) as porciento_actual");
		$this->db->limit('4');
		$this->db->join('grupo_porciento_comisiones', 'porciento_comision_usados.grupo_porciento_id = grupo_porciento_comisiones.grupo_porciento_id');
        $this->db->where('grupo_porciento_comisiones.seleccionado', 0);
		$this->db->order_by('porciento_comision_usado_id', 'DESC');
		$query = $this->db->get('porciento_comision_usados');
		$data['data'] = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
    }
	
}