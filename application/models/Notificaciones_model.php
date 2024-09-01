<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Notificaciones_Model extends CI_Model
{
    public function insertar($object)
    {
        $this->db->insert('notificaciones', $object);
        $data['inserted_id'] = $this->db->insert_id();
        if($data['error'] = $this->db->error());
        return $data; 
    }

    public function consultar_by_usuario_id($object){
        $this->db->join('usuarios', 'notificaciones.usuario_envia = usuarios.usuario_id');
        $this->db->join('info_usuarios', 'info_usuarios.usuario_id = notificaciones.usuario_envia', 'left');

        $this->db->group_by(array("notificaciones.usuario_id","notificaciones.usuario_envia","notificaciones.asunto"));
        $this->db->where('notificaciones.usuario_id', $object['usuario_id']);
        $this->db->where('notificaciones.leido', 0);
        $query = $this->db->get('notificaciones');
        $data['data']  = $query->result_array();
        if($data['error'] = $this->db->error());
        return $data; 
    }
}