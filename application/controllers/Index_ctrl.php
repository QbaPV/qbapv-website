<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Index_Ctrl extends CI_Controller {
	public function __construct()
	{
	    parent::__construct();
		
		// $this->load->language('layout', 'es');
		//$this->load->language('layout', 'english');
		//$this->load->language('layout', 'russian');
	}


	public function index()
	{
		//echo json_encode($this->session->userdata('site_lang'));
		//print_r($this->session->userdata('site_lang'));
		if($this->session->userdata('site_lang')== null){
			$this->session->set_userdata('site_lang', 'es');
		}

		//echo $this->lang->line('inicio');
		$this->load->view('general/layout');
	}

	public function consultar_msg_main()
	{
		$dataText = array(
			'banner1' => utf8_encode($this->lang->line('banner1')),
			'banner2' => utf8_encode($this->lang->line('banner2')),
			'banner3' => utf8_encode($this->lang->line('banner3')),
			'banner4' => utf8_encode($this->lang->line('banner4')),	
			'banner5' => utf8_encode($this->lang->line('banner5')),
			'biencoffe' => utf8_encode($this->lang->line('biencoffe')),
			//mensajes
			'msg_deniedaccess' => utf8_encode($this->lang->line('msg_deniedaccess')),
			'msg_logoff' => utf8_encode($this->lang->line('msg_logoff')),
			'msg_usernopermited' => utf8_encode($this->lang->line('msg_usernopermited')),
			'msg_accountcreatedok' => utf8_encode($this->lang->line('msg_accountcreatedok')),
			'msg_servererror' => utf8_encode($this->lang->line('msg_servererror')),
			'msg_usernoexist' => utf8_encode($this->lang->line('msg_usernoexist')),
			'msg_passupdateok' => utf8_encode($this->lang->line('msg_passupdateok')),
			'msg_passupdatefailed' => utf8_encode($this->lang->line('msg_passupdatefailed')),
			'msg_codeerror' => utf8_encode($this->lang->line('msg_codeerror')),
			//Correos
			'mail' => utf8_encode($this->lang->line('mail')),
			'mail1' => utf8_encode($this->lang->line('mail1')),
			'mail2' => utf8_encode($this->lang->line('mail2')),
			'mail3' => utf8_encode($this->lang->line('mail3')),
			'mail4' => utf8_encode($this->lang->line('mail4')),
			'mail5' => utf8_encode($this->lang->line('mail5')),
			'mail5_1' => utf8_encode($this->lang->line('mail5_1')),
			'mail5_2' => utf8_encode($this->lang->line('mail5_2')),
			'mail5_3' => utf8_encode($this->lang->line('mail5_3')),
			'mail5_4' => utf8_encode($this->lang->line('mail5_4')),
			'mail5_5' => utf8_encode($this->lang->line('mail5_5')),
			'mail5_6' => utf8_encode($this->lang->line('mail5_6')),
			'mail5_7' => utf8_encode($this->lang->line('mail5_7')),
			//Verification code
			'msg_vercode' => utf8_encode($this->lang->line('msg_vercode')),
			'msg_vercode1' => utf8_encode($this->lang->line('msg_vercode1')),
			'msg_vercod2' => utf8_encode($this->lang->line('msg_vercode2')),
			'msg_vercode3' => utf8_encode($this->lang->line('msg_vercode3')),
			
			//Nuevos
			'msg_linkrefcopied' => utf8_encode($this->lang->line('msg_linkrefcopied')),
			'msg_avatarupdated' => utf8_encode($this->lang->line('msg_avatarupdated')),
			'msg_msgsent' => utf8_encode($this->lang->line('msg_msgsent')),
			'msg_fieldrequired' => utf8_encode($this->lang->line('msg_fieldrequired')),
			'msg_passnotmatch' => utf8_encode($this->lang->line('msg_passnotmatch')),
			'msg_passnotmatch1' => utf8_encode($this->lang->line('msg_passnotmatch1')),
			'msg_infoupdatedok' => utf8_encode($this->lang->line('msg_infoupdatedok')),
			'msg_txnoexist' => utf8_encode($this->lang->line('msg_txnoexist')),
			'msg_txincomplete' => utf8_encode($this->lang->line('msg_txincomplete')),
			'msg_compra' => utf8_encode($this->lang->line('msg_compra')),
			'msg_compra1' => utf8_encode($this->lang->line('msg_compra1')),
			'msg_importecopied' => utf8_encode($this->lang->line('msg_importecopied')),
			'msg_addresscopied' => utf8_encode($this->lang->line('msg_addresscopied')),
			'mail6' => utf8_encode($this->lang->line('mail6')),
			'msg_verificandopatro' => utf8_encode($this->lang->line('msg_verificandopatro')),
			'msg_patroinvalido' => utf8_encode($this->lang->line('msg_patroinvalido')),
			'msg_txpagook' => utf8_encode($this->lang->line('msg_txpagook')),
			'msg_txmontoinvalido' => utf8_encode($this->lang->line('msg_txmontoinvalido')),
			'msg_compro' => utf8_encode($this->lang->line('msg_compro')),
			'camcontra' => utf8_encode($this->lang->line('camcontra')),
			'participaciones' => utf8_encode($this->lang->line('participaciones')),
			'msg_transferirpuntos' => utf8_encode($this->lang->line('msg_transferirpuntos')),
			'msg_suficientepuntos' => utf8_encode($this->lang->line('msg_suficientepuntos')),
			'msg_tranfpatocinador' => utf8_encode($this->lang->line('msg_tranfpatocinador')),
			'msg_ret_monto' => utf8_encode($this->lang->line('msg_ret_monto')),
			'msg_ret_saldoinsuf' => utf8_encode($this->lang->line('msg_ret_saldoinsuf')),
			'msg_ret_nobalance' => utf8_encode($this->lang->line('msg_ret_nobalance')),
			'msg_ret_wallet' => utf8_encode($this->lang->line('msg_ret_wallet')),
			'msg_ret_exitoso' => utf8_encode($this->lang->line('msg_ret_exitoso')),
			'loyalp_14' => utf8_encode($this->lang->line('loyalp_14')),
			'loyalp_15' => utf8_encode($this->lang->line('loyalp_15')),
			'loyalp_16' => utf8_encode($this->lang->line('loyalp_16')),
			'loyalp_17' => utf8_encode($this->lang->line('loyalp_17')),
			'buy_offer' => utf8_encode($this->lang->line('buy_offer')),		
			'lp_offer' => utf8_encode($this->lang->line('lp_offer')),		
			'lp_buy' => utf8_encode($this->lang->line('lp_buy')),		
			'two_f_auth_checked' => utf8_encode($this->lang->line('two_f_auth_checked')),		
			'two_f_auth_unchecked' => utf8_encode($this->lang->line('two_f_auth_unchecked')),		
			'two_f_auth_invalid_code' => utf8_encode($this->lang->line('two_f_auth_invalid_code')),		
			'loyalp_21' => utf8_encode($this->lang->line('loyalp_21')),		
			'loyalp_22' => utf8_encode($this->lang->line('loyalp_22')),		
			'loyalp_23' => utf8_encode($this->lang->line('loyalp_23')),		
			'loyalp_24' => utf8_encode($this->lang->line('loyalp_24')),		
			'msg_infoupdatedwalleterror' => utf8_encode($this->lang->line('msg_infoupdatedwalleterror')),		
			'mail_retiro' => utf8_encode($this->lang->line('mail_retiro')),		
			'mail_retiro1' => utf8_encode($this->lang->line('mail_retiro1')),		
			'mail_retiro2' => utf8_encode($this->lang->line('mail_retiro2')),		
		);
		echo json_encode($dataText);
	}
	
	public function consultar_lang()
	{
		echo $this->session->userdata('site_lang');
	}


	public function home()
	{
		$this->load->view('otras/inicio');
	}
	
	
	
	public function procesedorders()
	{
		$this->load->view('ordenes_procesadas');
	}
	public function sendorders()
	{
		$this->load->view('ordenes_enviadas');
	}
	public function client()
	{
		$this->load->view('clientes');
	}
	public function provider()
	{
		$this->load->view('proveedores');
	}

	public function bono_retroactivo()
	{
		$this->load->view('bonos/bono_retroactivo');
	}
	
	public function bono_empresarial()
	{
		$this->load->view('bonos/bono_empresarial');
	}

	public function puntos()
	{
		$this->load->view('puntos/puntos');
	}

	public function retiros()
	{
		$this->load->view('finanzas/retiros');
	}

	public function dashboard()
	{
		$this->load->view('dashboard/dashboard');
	}

	public function dashboard_admin()
	{
		$this->load->view('dashboard/dashboard_admin');
	}
	
	public function completar_planes()
	{
		$this->load->view('otras/completar_planes');
	}
	
	public function negocio()
	{
		$this->load->view('negocio/negocio');
	}

	public function usuarios()
	{
		$this->load->view('usuarios/usuarios');
	}

	public function configurar_comision()
	{
		$this->load->view('configuracion/config_comision');
	}
	
	public function repartit_dividendos()
	{
		$this->load->view('negocio/reparto_dividendos_participaciones');
	}

	public function compra_participaciones()
	{
		$this->load->view('negocio/list_participaciones');
	}

	
	public function contact()
	{
		$this->load->view('otras/contacto');
	}

	public function login()
	{
		$this->load->view('general/login_register');
	}

	public function agregar_referido()
	{
		$this->load->view('referidos/nuevo_referido');
	}

	public function mis_referidos()
	{
		$this->load->view('referidos/mis_referidos');
	}
	
	public function agregar_referido_link()
	{
		$this->load->view('referidos/nuevo_referido_link');
	}


	public function get_unilevel_tree1()
	{
		$this->load->view('otras/arbol_unilevel');
	}	

	public function get_unilevel_tree()
	{
		$this->load->view('otras/arbol_unilevel1');
	}

	public function activate_account()
	{
		$this->load->view('general/account_activation');
	}

	public function perfil()
	{
		$this->load->view('perfil/perfil');
	}

	public function participaciones()
	{
		$this->load->view('negocio/participaciones');
	}
	
	public function planes()
	{
		$this->load->view('negocio/planes');
	}
	
	
	public function resumen_planes()
	{
		$this->load->view('negocio/resumen_planes');
	}

	public function crowfunding()
	{
		$this->load->view('negocio/crowfunding');
	}

	public function balances()
	{
		$this->load->view('finanzas/balances');
	}
	
	
	public function historico()
	{
		$this->load->view('finanzas/historico');
	}
	
	public function historico_participaciones()
	{
		$this->load->view('finanzas/historico/historico_participaciones');
	}
	
	public function historico_planes()
	{
		$this->load->view('finanzas/historico/historico_planes');
	}

	public function historico_comisiones()
	{
		$this->load->view('finanzas/historico/historico_comisiones');
	}
	
	public function ser_miembro()
	{
		$this->load->view('footer/ser_miembro');
	}

	public function ventajas()
	{
		$this->load->view('footer/ventajas');
	}
	
	public function comprar_productos()
	{
		$this->load->view('footer/comprar_productos');
	}

	public function blog()
	{
		$this->load->view('footer/blog');
	}

	public function actividad()
	{
		$this->load->view('referidos/actividad_directos');
	}
	
	public function aviso_legal()
	{
		$this->load->view('footer/aviso_legal');
	}

	
	public function politica()
	{
		$this->load->view('footer/politica');
	}

	public function cargar_paises(){
		$paises = file_get_contents("lib/json/paises.json");
		echo $paises;	
	}
}
