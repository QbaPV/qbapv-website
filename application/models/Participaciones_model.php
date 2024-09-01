<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Participaciones_Model extends CI_Model
{
    public function insertar($object)
    {
        $this->db->insert('participaciones', $object);
        $data['inserted_id'] = $this->db->insert_id();
        if($data['error'] = $this->db->error());
        return $data; 
    }
	
	public function insertar_config_balance_participaciones($object)
    {
        $this->db->insert('config_balance_participaciones', $object);
        $data['inserted_id'] = $this->db->insert_id();
        if($data['error'] = $this->db->error());
        return $data; 
    }

	public function set_completed($object)
    {
        $this->db->where('usuario_id', $object['usuario_id']);
        $data['wasModified'] =  $this->db->update('participaciones', $object);
        if($data['error'] = $this->db->error());
        return $data; 
    }
	
    public function get_total_compradas(){
        $this->db->select_sum('cantidad');
        $this->db->where('estado', 'completed');
        $query = $this->db->get('participaciones');
        $data['data']  = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
    }
	
	public function get_total_activas(){
		//1- seleccionar las participaciones con fecha de compra al menos 14 dias antes o mas.
		$week_before = new DateTime(date('Y-m-d', strtotime(date('Y-m-d')."-13 days")));
		$diasAntes =  $week_before->Format("Y-m-d H:i:s");
		//print_r($diasAntes);
        $this->db->select_sum('cantidad');
        $this->db->where('estado', 'completed');
        $this->db->where('fecha_solicitud <',$diasAntes);
		
        $query = $this->db->get('participaciones');
        $data['data']  = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
    }
	
	public function get_grouped_by_user(){
        $this->db->select("usuarios.nombre, usuarios.usuario_id, usuarios.apellidos, participaciones.transaction_hash");
		$this->db->select_sum('cantidad');
		//$this->db->select_sum('monto');
        $this->db->join("usuarios", "usuarios.usuario_id = participaciones.usuario_id");
        //$this->db->join("balance_participaciones", "usuarios.usuario_id = balance_participaciones.usuario_recibe_id", 'left');
		$this->db->join("info_usuarios", "info_usuarios.usuario_id = usuarios.usuario_id");
        $this->db->group_by("usuarios.usuario_id");
        $this->db->order_by("cantidad", "desc");
		$query = $this->db->get('participaciones');
        $data['data']  = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
    }

    public function consultar_by_usuario_id($object){
        $this->db->where('usuario_id', $object['usuario_id']);
		$this->db->order_by('fecha_solicitud', 'desc');
        $query = $this->db->get('participaciones');
        $data['data']  = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
    }
	
	public function consultar_all(){
		$this->db->select("usuarios.nombre, usuarios.usuario_id, usuarios.apellidos, participaciones.cantidad, participaciones.precio, participaciones.fecha_solicitud,  participaciones.transaction_hash");
		$this->db->from('participaciones');
		$this->db->join("usuarios", "usuarios.usuario_id = participaciones.usuario_id");
		$this->db->order_by('fecha_solicitud', 'desc');
        $query = $this->db->get();
        $data['data']  = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
    }

    public function total_by_usuario_id($object){
        $this->db->select_sum('cantidad');
        $this->db->where('estado', 'completed');
        $this->db->where('usuario_id', $object['usuario_id']);
        $query = $this->db->get('participaciones');
        $data['data']  = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
    }

    public function consultar_by_hash($object){
        $this->db->where('transaction_hash', $object['transaction_hash']);
        $query = $this->db->get('participaciones');
        $data['data']  = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
    }

	public function consultar_ultima_ganancia_repartida(){
		$this->db->limit(1);
		$this->db->order_by('fecha', 'desc');
		$query = $this->db->get('config_balance_participaciones');
        $data['data']  = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data;
	}
	
	public function consultar_ganancias_repartidas(){
		$this->db->order_by('fecha', 'desc');
		$query = $this->db->get('config_balance_participaciones');
        $data['data']  = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data;
	}
	
	public function set_promocion_active($object)
    {
        $this->db->where('codigo', $object['codigo']);
        $data['wasModified'] =  $this->db->update('config_general', $object);
        if($data['error'] = $this->db->error());
        return $data; 
    }
}