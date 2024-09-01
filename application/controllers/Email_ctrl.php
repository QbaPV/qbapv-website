<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Email_Ctrl extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
	}

	public function index()
	{
		$this->enviar_email();
	}

	
	public function send_email(){
		$this->load->view('general/send_email_ok');
	}

	public function enviar_email(){
		$request = json_decode(file_get_contents('php://input')); 
		
		$asunto = $request->asunto;
		$emailTo =  $request->email;
		$nombreTo = $request->nombre;
		$mensaje = $request->mensaje;
		$nombreFrom = $request->nombreFrom;
		
		//Indicamos el protocolo a utilizar
        $config['protocol'] = 'smtp';
		 
        //El servidor de correo que utilizaremos
        $config["smtp_host"] = 'ublof.com';
		
        //Authenticate user
        $config["smtp_user"] = 'info@ublof.com';
         
        //Authenticated user password
        $config["smtp_pass"] = 'Winmaster111***';   
         
        //El puerto que utilizará el servidor smtp
        $config["smtp_port"] = '25';
        
        //El juego de caracteres a utilizar
        $config['charset'] = 'utf-8';
 
        //Permitimos que se puedan cortar palabras
        $config['wordwrap'] = TRUE;
         
        //El email debe ser valido 
		$config['validate'] = true;   
	  
	   // 
       $config['mailtype'] = 'html';   

		$this->load->library('email', $config);

	   //Establecemos esta configuración
        $this->email->initialize($config);
	
		//Direccion y Nombre de quien envia   
		$this->email->from('info@ublof.com', $nombreFrom);
		//Direccion de destino
		$this->email->to($emailTo, $nombreTo);

		 //Definir Asunto
		 $this->email->subject($asunto);
		 //Definir mensaje
		 $this->email->message($mensaje);

		 //Enviamos el email y si se produce bien o mal que avise con una flashdata
		 try {
			if($this->email->send()){
				echo 'true';
			 }else{
				 echo 'false';
			 }
		 } 
		 catch (\Throwable $th) {
			 echo false;
		 }
	}
}