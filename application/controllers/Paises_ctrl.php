<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Paises_Ctrl extends CI_Controller {
	public function index()
	{
		
	}

	public function get_ubicacion()
	{
		$ip=$_SERVER["REMOTE_ADDR"];
		//Traer geolocalizacion del ip cliente
		$informacionSolicitud = file_get_contents("http://www.geoplugin.net/json.gp");
		// Convertir el texto JSON en un array
		$dataSolicitud = json_decode($informacionSolicitud);
		echo json_encode($dataSolicitud);
	}

}
