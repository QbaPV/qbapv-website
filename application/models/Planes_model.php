<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Planes_Model extends CI_Model
{

    public function solicitar_plan($object)
    {
        $this->db->insert('plan_usuario', $object);
        //$data['inserted_id'] = $this->db->insert_id();
        if($data['error'] = $this->db->error());
        return $data; 	
    }

	public function set_completed($object)
    {
        $this->db->where('usuario_id', $object['usuario_id']);
        $this->db->where('plan_id', $object['plan_id']);
        $data['wasModified'] =  $this->db->update('plan_usuario', $object);
        if($data['error'] = $this->db->error());
        return $data; 
    }

    public function consultarall()
    {
        $query = $this->db->get('planes');
        $data['data'] = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
    }

    public function consultar_usuario_plan($object){
        $this->db->where('usuario_id', $object['usuario_id']);
        $this->db->where('plan_id', $object['plan_id']);
		$query = $this->db->get('plan_usuario');
        $data['data'] = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
    }
    
    public function consultar_planes_comprados_usuario($object){
        $this->db->select(' info_usuarios.usuario_id, info_usuarios.foto, 
                            info_usuarios.telefono, info_usuarios.direccion, info_usuarios.codigo_postal , info_usuarios.ciudad, 
                            info_usuarios.fecha_registro, info_usuarios.fecha_nacimiento, info_usuarios.representante, info_usuarios.eth_wallet, 
                            plan_usuario.usuario_id, plan_usuario.plan_id, plan_usuario.fecha_compra, plan_usuario.estado, planes.*');

        $this->db->from('plan_usuario');
        $this->db->join('planes', 'planes.plan_id = plan_usuario.plan_id');
        $this->db->join('info_usuarios', 'info_usuarios.usuario_id = plan_usuario.usuario_id');
        $this->db->where('plan_usuario.usuario_id', $object['usuario_id']);
        $query = $this->db->get();
        print_r($query);
        $data['data'] = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
	}
	
	public function consultar_by_hash($object){
        $this->db->where('transaction_hash', $object['transaction_hash']);
        
		$query = $this->db->get();
        $data['data']  = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
    }
	
	public function consultar_planes_grouped(){
		$this->db->select('usuarios.usuario_id, usuarios.nombre as Nombre, usuarios.apellidos as Apellidos, usuarios.nombre_usuario as Usuario, planes.nombre as Plan, planes.precio as Precio, planes.rango_val as Rango, plan_usuario.vencido, plan_usuario.fecha_compra, planes.porciento');
        $this->db->select('count(plan_usuario.plan_id) as Planes');
        //$this->db->select_sum('balance_planes.monto');
		
		$this->db->from('usuarios');
        $this->db->join('plan_usuario', 'usuarios.usuario_id = plan_usuario.usuario_id');
        $this->db->join('planes', 'plan_usuario.plan_id = planes.plan_id');
        //$this->db->join('balance_planes', 'plan_usuario.plan_usuario_id = balance_planes.plan_usuario_id', 'left');
		$this->db->where('plan_usuario.transaction_hash != "0x0" ');
		$this->db->group_by('plan_usuario.usuario_id');
		$this->db->order_by('plan_usuario.fecha_compra', 'desc');
		$query = $this->db->get();
        $data['data']  = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
    }
	
	public function consultar_planes_comprados(){
		$this->db->select('usuarios.usuario_id, planes.plan_id, plan_usuario.precio_usd as precioPago, usuarios.nombre as Nombre, usuarios.apellidos as Apellidos, usuarios.nombre_usuario as Usuario, planes.nombre as Plan, plan_usuario.precio_eth as Precio, planes.rango_val as Rango, plan_usuario.vencido, plan_usuario.fecha_compra, planes.porciento');
        $this->db->select_sum('balance_planes.monto');
        
		$this->db->from('usuarios');
        $this->db->join('plan_usuario', 'usuarios.usuario_id = plan_usuario.usuario_id');
        $this->db->join('planes', 'plan_usuario.plan_id = planes.plan_id');
        $this->db->join('balance_planes', 'plan_usuario.plan_usuario_id = balance_planes.plan_usuario_id', 'left');
		$this->db->where('plan_usuario.transaction_hash != "0x0" ');
		$this->db->group_by('plan_usuario.plan_usuario_id');
		$this->db->order_by('plan_usuario.fecha_compra', 'desc');
		$query = $this->db->get();
		//print_r($this->db->queries);
        $data['data']  = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
    }
	
	public function consultar_planes_comprados_by_usuario_id($object){
		$this->db->select('usuarios.nombre as Nombre, usuarios.apellidos as Apellidos, usuarios.nombre_usuario as Usuario, planes.nombre as Plan, plan_usuario.precio_eth as Precio, planes.rango_val as Rango, plan_usuario.vencido, plan_usuario.fecha_compra, planes.porciento');
        $this->db->select_sum('balance_planes.monto');
        
		$this->db->from('usuarios');
        $this->db->join('plan_usuario', 'usuarios.usuario_id = plan_usuario.usuario_id');
        $this->db->join('planes', 'plan_usuario.plan_id = planes.plan_id');
        $this->db->join('balance_planes', 'plan_usuario.plan_usuario_id = balance_planes.plan_usuario_id', 'left');
		$this->db->where('plan_usuario.transaction_hash != "0x0" ');
		$this->db->where('plan_usuario.usuario_id', $object['usuario_id']);
		$this->db->group_by('plan_usuario.plan_usuario_id');
		$this->db->order_by('plan_usuario.fecha_compra', 'desc');
		$query = $this->db->get();
        $data['data']  = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
    }
}