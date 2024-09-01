<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Btl_Model extends CI_Model
{ 
	//Analizar valor eth
	public function actualizar_eth_actual($object){	
		$this->db->where('semana', "ACTUAL");	
        $data['wasModified'] =  $this->db->update('btl_semanal', $object);
        if($data['error'] = $this->db->error());
        return $data; 

	}
	
	public function actualizar_btl_semana_anterior($object){	
		$this->db->where('semana', "ANTERIOR");	
        $data['wasModified'] =  $this->db->update('btl_semanal', $object);
        if($data['error'] = $this->db->error());
        return $data; 
	}
	
	public function reset_btl_semana_actual(){	
		$this->db->where('semana', "ACTUAL");
		$object = array('valor'=>0, 'precio_eth'=>0, 'fecha'=>date("Y-m-d H:i:s"));	
        $data['wasModified'] =  $this->db->update('btl_semanal', $object);
        if($data['error'] = $this->db->error());
        print_r ($data); 
	}
	
	public function actualizar_valor_actual($object){
		$this->db->where('semana', "ACTUAL");		
        $data['wasModified'] =  $this->db->update('btl_semanal', $object);
        if($data['error'] = $this->db->error());
        return $data; 
	}
	
	//Consultar el valor del eth almacenado en el actual
	public function consultar_btl_actual(){
		$this->db->where('semana', "ACTUAL");		
		$query = $this->db->get('btl_semanal');
		$data['data'] = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
	}
	
	//Consultar el valor del eth almacenado en el actual
	public function consultar_btl_semana_anterior(){
		$this->db->where('semana', "ANTERIOR");		
		$query = $this->db->get('btl_semanal');
		$data['data'] = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
	}
	
	public function consultar_btl_all(){
		$query = $this->db->get('btl');
		$data['data'] = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
	}
	
	public function consultar_btl_by_grupo($object){
		$this->db->where('grupo', $object['grupo']);		
		$query = $this->db->get('btl');
		$data['data'] = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
	}
	
	//BTL SEMANALES
	public function insertar_btl_semanal_detalle($object)
    {
        $this->db->insert('btl_semanal_historico', $object);
        $data['inserted_id'] = $this->db->insert_id();
        if($data['error'] = $this->db->error());
        return $data; 
    }
	
	//BTL USUARIOS
	public function consultar_usuarios_by_btl(){
		$sql = "SELECT btl.grupo as BTL, count(btl.btl_id)  as Cantidad, sum(btl.precio_usd) as Inversion
				FROM `btl_usuario` 
				INNER JOIN btl on btl.btl_id = btl_usuario.btl_id  where btl_usuario.activo 
				group by btl.grupo order by btl.btl_id";
		$query = $this->db->query($sql);
		$data['data'] = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
	}
	
	public function consultar_btl_usuario_activo($object){
		
		$sql = "SELECT btl.*, btl_usuario.*, btl.semanas as btlSemana, btl_usuario.semanas as btlSemanasUso
				FROM `btl_usuario` 
				INNER JOIN btl on btl.btl_id = btl_usuario.btl_id  
				WHERE btl_usuario.activo = 1 AND btl_usuario.usuario_id = ".$object['usuario_id'];
		$query = $this->db->query($sql);
		$data['data'] = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
	}
	
	public function actualizar_btl_empresa($object){	
		$this->db->where('btl_usuario_id', $object['btl_usuario_id']);	
        $data['wasModified'] =  $this->db->update('btl_usuario', $object);
        if($data['error'] = $this->db->error());
        return $data; 
	}
	
	public function consultar_btl_usuario_empresa(){
		$this->db->join('btl', 'btl_usuario.btl_id = btl.btl_id');
		$this->db->where('btl_usuario.activo', 1);
        $this->db->where('btl_usuario.usuario_id', 0);
        $this->db->order_by('btl_usuario.btl_usuario_id', 'ASC');
		$query = $this->db->get('btl_usuario');
		$data['data'] = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
	}
	
	public function actualizar_semana($object){
		$this->db->where('btl_usuario.activo', 1);
		$this->db->where('btl_usuario.usuario_id', $object['usuario_id']);
		$this->db->where('btl_usuario.usuario_id <>', 0);
		$data['wasModified'] =  $this->db->update('btl_usuario', $object);
        if($data['error'] = $this->db->error());
        echo json_encode($data); 
	}
	
	public function consultar_btl_usuario_all(){
		$this->db->join('btl', 'btl_usuario.btl_id = btl.btl_id');
		$this->db->where('btl_usuario.activo', 1);
        $this->db->order_by('btl_usuario.btl_usuario_id', 'ASC');
		$query = $this->db->get('btl_usuario');
		$data['data'] = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
	}
	
	//GANANCIAS
	public function insertar_ganancia_usuario($object)
    {
        $this->db->insert('btl_ganancias', $object);
        $data['inserted_id'] = $this->db->insert_id();
        if($data['error'] = $this->db->error());
        return $data; 
    }
	
	public function consultar_ganancia_acumulada_by_user($object){
		$this->db->select_sum('ganancia', 'acumulado');
		$this->db->join('btl_usuario', 'btl_ganancias.btl_usuario_id = btl_usuario.btl_usuario_id');
		$this->db->where('btl_ganancias.usuario_id', $object['usuario_id']);		
		$this->db->where('btl_usuario.activo', 1);		
		$query = $this->db->get('btl_ganancias');
		//print_r($this->db->queries);
		$data['data'] = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
	}
	
	public function consultar_ganancias_all(){
		$this->db->select('btl.*,btl_usuario.*, btl_ganancias.*, btl_usuario.semanas as semanas_inv, btl.semanas as semanas_ciclo');
		$this->db->join('btl_usuario', 'btl_ganancias.btl_usuario_id = btl_usuario.btl_usuario_id');
		$this->db->join('btl', 'btl_usuario.btl_id = btl.btl_id');
		$this->db->where('btl_usuario.activo', 1);		
		$this->db->order_by('fecha', 'desc');
		$query = $this->db->get('btl_ganancias');
		//print_r($this->db->queries);
		$data['data'] = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
	}
	
	public function consultar_ganancias_by_grupo(){
		$this->db->select('btl.grupo, btl_ganancias.ganancia');
		$this->db->join('btl_usuario', 'btl_ganancias.btl_usuario_id = btl_usuario.btl_usuario_id');
		$this->db->join('btl', 'btl_usuario.btl_id = btl.btl_id');
		$this->db->where('btl_usuario.activo', 1);		
		$this->db->group_by('grupo');
		$query = $this->db->get('btl_ganancias');
		//print_r($this->db->queries);
		$data['data'] = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
	}
	
	public function get_ganancias_rango_fecha($object){
		$this->db->select('btl.*,btl_usuario.*, btl_ganancias.*, btl_usuario.semanas as semanas_inv, btl.semanas as semanas_ciclo');
		$this->db->join('btl_usuario', 'btl_ganancias.btl_usuario_id = btl_usuario.btl_usuario_id');
		$this->db->join('btl', 'btl_usuario.btl_id = btl.btl_id');
		$this->db->where('btl_usuario.activo', 1);		
		$this->db->order_by('fecha', 'desc');
		$this->db->where('fecha >=', date($object['fechaInicio'].' 00:00:00'));
		$this->db->where('fecha <=', date($object['fechaFin'].' 23:59:59'));
		$query = $this->db->get('btl_ganancias');
        $data['data'] = $query->result_array();
		if($data['error'] = $this->db->error());
        return $data; 
	}
	
	public function consultar_ganancia_empresa_by_btl($btl_usuario_id){
		$this->db->select_sum('ganancia');
		$this->db->join('btl_usuario', 'btl_ganancias.btl_usuario_id = btl_usuario.btl_usuario_id');
		$this->db->where('btl_ganancias.usuario_id', 0);		
		$this->db->where('btl_usuario.activo', 1);		
		$this->db->where('btl_ganancias.btl_usuario_id', $btl_usuario_id);	
		$this->db->order_by('fecha', 'desc');		
		$query = $this->db->get('btl_ganancias');
		$data['data'] = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
	}
	
	//GANANCIA EMPRESA y BONO RETROATIVO y EMPREASARIAL
	public function insertar_btl_ganancia_empresa($object)
    {
        $this->db->insert('btl_ganancias_empresa', $object);
        $data['inserted_id'] = $this->db->insert_id();
        if($data['error'] = $this->db->error());
        return $data; 
    }
	
	public function actualizar_btl_ganancia_empresa($object){	
		$this->db->where('activo', 1);	
        $data['wasModified'] =  $this->db->update('btl_ganancias_empresa', $object);
        if($data['error'] = $this->db->error());
        return $data; 
	}
	
	public function consultar_btl_ganancia_empresa_activo(){
		$this->db->where('activo', 1);		
		$query = $this->db->get('btl_ganancias_empresa');
		$data['data'] = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
	}
	
	public function consultar_btl_ganancias_empresa_all(){		
		$this->db->order_by('fecha', 'DESC');
		$query = $this->db->get('btl_ganancias_empresa');
		$data['data'] = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
	}
	
	public function consultar_btl_ganancias_total_empresa_by_grupo(){		
		$this->db->select_sum('btl_bull');
		$this->db->select_sum('btl_tiger');
		$this->db->select_sum('btl_lion');
		$query = $this->db->get('btl_ganancias_empresa');
		//print_r($this->db->queries);
		$data['data'] = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
	}
	
	public function get_ganancias_empresa_rango_fecha($object){
		$this->db->where('fecha >=', date($object['fechaInicio'].' 00:00:00'));
		$this->db->where('fecha <=', date($object['fechaFin'].' 23:59:59'));
		$this->db->order_by('fecha', 'desc');
		$query = $this->db->get('btl_ganancias_empresa');
        $data['data'] = $query->result_array();
		if($data['error'] = $this->db->error());
        return $data; 
	}
	
	

}