<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Usuario_Model extends CI_Model
{
    public function insertar($object)
    {
        $data =  array('inserted_id'=>0, 'error'=>array('code'=>'', 'message'=>''), 'data'=>array());
        //Iniciar transaction
        $this->db->trans_start();
        
        $this->db->insert('usuarios', $object);
        //print_r($object);
        
        $data['inserted_id'] = $this->db->insert_id();
        
        $foto = "lib/images/defaultprofile.png";        
        if($object['sexo'] == "F")
                $foto = "lib/images/defaultprofilewoman.png";

        $info = array('ciudad'=>'', 'codigo_postal'=>'', 'direccion'=>'', 'fecha_nacimiento'=>'', 'fecha_registro'=>'', 'foto'=>$foto, 'representante'=>'', 'telefono'=>'','usuario_id'=>$data['inserted_id'], 'btc_wallet'=>'', 'eth_wallet'=>'');
        
        $this->db->insert('info_usuarios', $info);

        //complete transaction
        $this->db->trans_complete();

        if ($this->db->trans_status() === FALSE)
        {
            if($data['error'] = $this->db->error());
        }        
        return $data; 
    }

    public function actualizar($user, $info)
    {
        $data =  array('error'=>array('code'=>'0', 'message'=>''), 'data'=>array());
        //Iniciar transaction
       $this->db->trans_start();
        
        $this->db->where('usuario_id', $user['usuario_id']);
        $this->db->update('usuarios', $user);
        
        $this->db->where('usuario_id', $info['usuario_id']);
        $this->db->update('info_usuarios', $info);
        
        $this->db->trans_complete();

        if ($this->db->trans_status() === FALSE)
        {
            if($data['error'] = $this->db->error());
        }        
        return $data; 
    }

    public function actualizar_cookie_token($object)
    {
        $this->db->where('usuario_id', $object['usuario_id']);
        $data['wasModified'] =  $this->db->update('usuarios', $object);
        if($data['error'] = $this->db->error());
        return $data; 
    }

    public function activate_account($object)
    {
        $this->db->where('referal', $object['referal']);
        $data['wasModified'] =  $this->db->update('usuarios', $object);
        if($data['error'] = $this->db->error());
        return $data; 
    }

	public function unsuscribe($object)
    {
        $this->db->where('usuario_id', $object['usuario_id']);
        $data['wasModified'] =  $this->db->update('usuarios', $object);
        if($data['error'] = $this->db->error());
        return $data; 
    }

	
    public function actualizar_avatar($object)
    {
        $this->db->where('usuario_id', $object['usuario_id']);  
        $data['wasModified'] =  $this->db->update('info_usuarios', $object);
        if($data['error'] = $this->db->error());
        return $data; 
    }

    public function reset_password($object)
    {
        $this->db->where('usuario_id', $object['usuario_id']);  
        $data['wasModified'] =  $this->db->update('usuarios', $object);
        if($data['error'] = $this->db->error());
        return $data; 
    }

	public function consultar_all_user_info(){
		//$this->db->distinct(true);
		$this->db->join('plan_usuario', 'plan_usuario.plan_id = planes.plan_id' );
		$this->db->join('usuarios', 'usuarios.usuario_id = plan_usuario.usuario_id','right');
		$this->db->join('roles', 'roles.rol_id = usuarios.rol_id');
		$this->db->join('info_usuarios', 'info_usuarios.usuario_id = usuarios.usuario_id', 'left');
		$this->db->where('usuarios.is_valid', 1);  
		$this->db->group_by('usuarios.usuario_id');
		$query = $this->db->get('planes');
		$data['data'] = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
		
	}
	
    public function consultarall()
    {
        $this->db->join('roles', 'roles.rol_id = usuarios.rol_id');
        $query = $this->db->get('usuarios');
        $data['data'] = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
    }
	
	public function consultar_suscriptores(){
		$this->db->where('usuario_id <>', 0); 
		$query = $this->db->get('suscriptores');
        $data['data'] = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data;
	}
	
	public function consultar_usuarios_prospectos(){
		$this->db->where('usuario_id', 0); 
		$query = $this->db->get('suscriptores');
        $data['data'] = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data;
	}
	
	public function consultar_all_user_category()
    {
        $this->db->where('usuarios.categoria >', 0);  
		$query = $this->db->get('usuarios');
        $data['data'] = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
    }

    public function consultar($object)
    {
        $this->db->join('info_usuarios', 'info_usuarios.usuario_id = usuarios.usuario_id');
        $where = "usuarios.usuario_id = ". $object['usuario_id'];
        $this->db->where($where);
        $query = $this->db->get('usuarios');
       //print_r($query);
        $data['data'] = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
    }

    public function consultar_by_username($object)
    {
        $this->db->join('info_usuarios', 'info_usuarios.usuario_id = usuarios.usuario_id');        
        $this->db->where('nombre_usuario', $object['nombre_usuario']);
        $this->db->or_where('email', $object['email']);
        $query = $this->db->get('usuarios');
        $data['data'] = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
    }

    public function consultar_like_username($object)
    {
        $filter = $object['nombre_usuario'];
        
        $sql = "select * from usuario where nombre_usuario like ''";
        
        $this->db->like('nombre_usuario', $object['nombre_usuario']);
        $this->db->or_like('email', $object['email']);
        $query = $this->db->get('usuarios');
        $data['data'] = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
    }

    //Incluye el padre para conformar el arbol
    public function getDirectReferals($userId)
    {
        $this->db->select('info_usuarios.*, usuarios.*');
        $this->db->select_sum('participaciones.cantidad');
        $this->db->join('roles', 'usuarios.rol_id = roles.rol_id');
        $this->db->join('info_usuarios', 'info_usuarios.usuario_id = usuarios.usuario_id');        
        $this->db->join('participaciones', 'info_usuarios.usuario_id = participaciones.usuario_id', 'left');        
        $where = "(usuarios.padre_id = $userId and usuarios.is_valid = 1)";

        $this->db->where($where);
        $this->db->group_by('usuarios.usuario_id');
    
		$query = $this->db->get('usuarios');
        $data['data'] = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data;
    }
	
	//Referal Net
	public function getNetwork()
    {
        $this->db->select('usuarios.*');
        //$this->db->where('usuarios.padre_id', 0);
		$this->db->where('usuarios.is_valid', 1);
        
		$query = $this->db->get('usuarios');
        $data['data'] = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data;
    }
	public function getNetworkActive()
    {
        //$this->db->select('usuarios.*');
        $this->db->where('usuarios.activo', 1);
        
		$query = $this->db->get('usuarios');
        $data['data'] = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data;
    }
	
	public function getNetworkActive_by_user($userId)
    {
        //$this->db->select('usuarios.*');
        $this->db->where('usuarios.activo', 1);
        $this->db->where('usuarios.padre_id', $userId);
        
		$query = $this->db->get('usuarios');
        $data['data'] = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data;
    }
	
    
    public function consultar_by_referal($object)
    {
        $this->db->where('referal', $object['referal']);
        $query = $this->db->get('usuarios');
        $data['data'] = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
    }

    public function login($object)
    {
        /*$this->db->select('usuarios.usuario_id, usuarios.nombre_usuario, usuarios.nombre, usuarios.sexo, usuarios.apellidos, usuarios.email, usuarios.referal, info_usuarios.provincia,
                            usuarios.pais, usuarios.activo, usuarios.tipo, usuarios.padre_id, usuarios.idioma, 
                            usuarios.can_login, usuarios.categoria, usuarios.rango, roles.rol_id, roles.rol, info_usuarios.usuario_id, info_usuarios.foto, 
                            info_usuarios.telefono, info_usuarios.direccion, info_usuarios.codigo_postal , info_usuarios.ciudad, 
                            info_usuarios.fecha_registro, info_usuarios.fecha_nacimiento, info_usuarios.representante, info_usuarios.eth_wallet');
         $this->db->from('usuarios');
         $this->db->join('roles', 'usuarios.rol_id = roles.rol_id');
         $this->db->join('info_usuarios', 'info_usuarios.usuario_id = usuarios.usuario_id', 'left');
         $this->db->where('usuarios.nombre_usuario', $object['usuario']);
         $this->db->where('usuarios.clave', $object['password']);
         $this->db->where('usuarios.is_valid', 1);
         $this->db->where('usuarios.rol_id', 1);

        $query = $this->db->get();
        $data['data'] = $query->result_array();
*/
		//print_r($object['usuario']);
		//print_r($object['password']);
		$data['data'] = array();
		foreach(USERS as $u){
			//print_r($u);
			if($u['user'] == $object['usuario'] && $u['clave'] == $object['password']){
				$data['data'] = array($u);
            }
            //print_r($data['data']);
		}
		if($data['error'] = $this->db->error());
        return $data;
    }

    public function eliminar($object)
    {
        $this->db->where('usuario_id', $object['usuario_id']);
        $this->db->delete('usuarios');
        if($data['error'] = $this->db->error());
        return $data; 
    }
	
	public function get_user_puntos()
    {
		$data['data']  = array();
		$R = array();
		//$Output = Array();
		$this->db->trans_start();
		//Get all users
		$users = $this->consultar_all_user_info()['data'];
		foreach($users as $u){
			$R = $u;
			//print_r( $u);
			$R['puntos'] = $this->get_puntos($u['usuario_id']);
			array_push($data['data'], $R);
			//print_r($data['data']);
			
			//break;
		}	
		//complete transaction
		 $this->db->trans_complete();
		 if ($this->db->trans_status() === FALSE)
         {
             if($data['error'] = $this->db->error());
         }        
         return $data;	
    }
	
	public function get_puntos($userId){
		$data = array(
			'usuario_id' => $userId
		);
		$lp = array(
			'totales'=> 0,
			'transferibles'=> 0,
		);
		$lyCI =& get_instance();
		$lyCI->load->model('punto_loyalty_model');
		$transf = $lyCI->punto_loyalty_model->get_total_by_usuario1($data)['data'];
		
		$pnpCI =& get_instance();
		$pnpCI->load->model('punto_plan_model');
		$PnP = $pnpCI->punto_plan_model->get_total_by_usuario1($data)['data'];
		
		$ptpCI =& get_instance();
		$ptpCI->load->model('punto_participaciones_model');
	    $PtP = $ptpCI->punto_participaciones_model->get_total_by_usuario1($data)['data'];
		
		$puaCI =& get_instance();
		$puaCI->load->model('punto_usuario_activo_model');
	    $Pua = $puaCI->punto_usuario_activo_model->get_total_by_usuario1($data)['data'];
		
		if(count($transf) > 0) $tr =  $transf[0]['cantidad']; else $tr = 0;
		if(count($PnP) > 0) $pn =  $PnP[0]['cantidad']; else $pn = 0;
		if(count($PtP) > 0) $pt =  $PtP[0]['cantidad']; else $pt = 0;
		if(count($Pua) > 0) $pa =  $Pua[0]['cantidad']; else $pa = 0;
		$lp = array(
			'totales'=> $tr + $pn + $pt + $pa,
			'transferibles'=> $tr + 0
		);
		
		return $lp;
	}
	
}
