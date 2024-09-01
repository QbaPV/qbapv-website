<?php 
defined('BASEPATH') OR exit('No direct script access allowed');

//Coinbase Api handler		
define('API_KEY', 'sewDIXaAGZunkEyo');
define('API_SECRET', 'Prd5ifEZiYILIcENX2ISrWbCdrKIYwDT');
define('API_BASE', 'https://api.coinbase.com');
define('API_VERSION', '2019-11-15');

class Criptocurrency_Ctrl extends CI_Controller 
{
	
	private $user_id = "4b5b449c-958c-5fba-a0ef-4c86085139ed";
	private $account_id = "f416793e-8a81-534d-933c-c4de556f1148";
	private $address = "6a11e8dc-52d8-5901-aa45-8f6b290c0e32"; //0xc22782FA3E6ACd431683C86b7bE7cF977008A89A 

	public function __construct()
	{
		parent::__construct();		
	}

	public function index()
	{
		$data = json_decode($this->get_account_transaction1());
		print_r($data);
	}
	
	public function get_transaction_by_hash()
	{
		$request = json_decode(file_get_contents('php://input')); 
		$hash_tx = $request->hash_tx;
		//$hash_tx = "1b4c1b4134d41f0834168e054b68476420278a6c34a1c1e48348b1dad427cc75";
		$data = json_decode($this->get_account_transaction1());
		$output = null;
		foreach($data->data as $tx) 
		{	
 			if(strcmp($tx->type, "send")==0 && (strcmp($tx->network->hash, $hash_tx)==0 || strcmp("0x".$tx->network->hash, $hash_tx)==0)){
				$output = $tx;
			} 				
		}
		echo json_encode($output);
	}
	
	//Get timestaamp from server
	public function get_server_timestamp(){
		$time = file_get_contents('https://api.coinbase.com/v2/time');
		$time = json_decode($time);
		return $time->data->epoch;
	}			
	
	public function get_currencies(){
		$curr = file_get_contents('https://api.coinbase.com/v2/currencies');
		$curr = json_decode($curr);
		return $curr->data; //data[i]->id
	}
	
	//Generate Coinbase valid Signature
	public function generate_signature($path, $method){
		$time = $this->get_server_timestamp();
		return hash_hmac("sha256", $time.$method.$path, API_SECRET);
	}

	//Get user sosociated to apikey
	public function get_current_user()
	{
		$time = $this->get_server_timestamp();
		$path = "/v2/user";	
		$signature = $this->generate_signature($path, "GET");
		$headers = array(
			'Content-Type: application/json',
			'CB-VERSION: '.API_VERSION,
			'CB-ACCESS-SIGN: '.$signature,
			'CB-ACCESS-TIMESTAMP: '.$time,
			'CB-ACCESS-KEY: '.API_KEY
		);
		$ch = curl_init(API_BASE.$path);
		curl_setopt($ch, CURLOPT_HTTPGET, true);
		curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		$result = curl_exec($ch);
		return $result;
	}
	
	public function get_user($user_id)
	{
		$time = $this->get_server_timestamp();
		$path = "/v2/users/".$user_id;	
		$signature = $this->generate_signature($path, "GET");
		$headers = array(
			'Content-Type: application/json',
			'CB-VERSION: '.API_VERSION,
			'CB-ACCESS-SIGN: '.$signature,
			'CB-ACCESS-TIMESTAMP: '.$time,
			'CB-ACCESS-KEY: '.API_KEY
		);
		$ch = curl_init(API_BASE.$path);
		curl_setopt($ch, CURLOPT_HTTPGET, true);
		curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		$result = curl_exec($ch);
		return $result;
	}
	
	//Get account sosociated to apikey
	public function get_accounts()
	{
		$time = $this->get_server_timestamp();
		$path = "/v2/accounts";	
		$signature = $this->generate_signature($path, "GET");
		$headers = array(
			'Content-Type: application/json',
			'CB-VERSION: '.API_VERSION,
			'CB-ACCESS-SIGN: '.$signature,
			'CB-ACCESS-TIMESTAMP: '.$time,
			'CB-ACCESS-KEY: '.API_KEY
		);
		$ch = curl_init(API_BASE.$path);
		curl_setopt($ch, CURLOPT_HTTPGET, true);
		curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		$result = curl_exec($ch);
		return $result;
	}

	//Get account by Id
	public function get_account($sccount_id)
	{
		$time = $this->get_server_timestamp();
		$path = "/v2/accounts/".$this->account_id;	
		$signature = $this->generate_signature($path, "GET");
		$headers = array(
			'Content-Type: application/json',
			'CB-VERSION: '.API_VERSION,
			'CB-ACCESS-SIGN: '.$signature,
			'CB-ACCESS-TIMESTAMP: '.$time,
			'CB-ACCESS-KEY: '.API_KEY
		);
		$ch = curl_init(API_BASE.$path);
		curl_setopt($ch, CURLOPT_HTTPGET, true);
		curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		$result = curl_exec($ch);
		return $result;
	}


	//Get account addresses
	public function get_addresses($account_id)
	{
		$time = $this->get_server_timestamp();
		$path = "/v2/accounts/".$account_id."/addresses";	
		$signature = $this->generate_signature($path, "GET");
		$headers = array(
			'Content-Type: application/json',
			'CB-VERSION: '.API_VERSION,
			'CB-ACCESS-SIGN: '.$signature,
			'CB-ACCESS-TIMESTAMP: '.$time,
			'CB-ACCESS-KEY: '.API_KEY
		);
		$ch = curl_init(API_BASE.$path);
		curl_setopt($ch, CURLOPT_HTTPGET, true);
		curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		$result = curl_exec($ch);
		return $result;
	}
	
		//Get account addresses transactios
	public function get_address_transaction($account_id, $address_id)
	{
			$time = $this->get_server_timestamp();
			$path = "/v2/accounts/".$account_id."/addresses/".$address_id."/transactions";	
			$signature = $this->generate_signature($path, "GET");
			$headers = array(
				'Content-Type: application/json',
				'CB-VERSION: '.API_VERSION,
				'CB-ACCESS-SIGN: '.$signature,
				'CB-ACCESS-TIMESTAMP: '.$time,
				'CB-ACCESS-KEY: '.API_KEY
			);
			$ch = curl_init(API_BASE.$path);
			curl_setopt($ch, CURLOPT_HTTPGET, true);
			curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			$result = curl_exec($ch);
			return $result;
	}
		
		//Get account transactions
		public function get_account_transaction()
		{
			$account_id = $this->account_id;
			$time = $this->get_server_timestamp();
			$path = "/v2/accounts/".$account_id."/transactions";	
			$signature = $this->generate_signature($path, "GET");
			$headers = array(
				'Content-Type: application/json',
				'CB-VERSION: '.API_VERSION,
				'CB-ACCESS-SIGN: '.$signature,
				'CB-ACCESS-TIMESTAMP: '.$time,
				'CB-ACCESS-KEY: '.API_KEY
			);
			$ch = curl_init(API_BASE.$path);
			curl_setopt($ch, CURLOPT_HTTPGET, true);
			curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			$result = curl_exec($ch);
			echo $result;
		}

		public function get_transaction_by_hash(){
			$data = json_decode($this->get_account_transaction1());
			print_r($data->data);
				
		}
		
		
	//Get account transactions
		public function get_account_transaction1()
		{
			$account_id = $this->account_id;
			$time = $this->get_server_timestamp();
			$path = "/v2/accounts/".$account_id."/transactions";	
			$signature = $this->generate_signature($path, "GET");
			$headers = array(
				'Content-Type: application/json',
				'CB-VERSION: '.API_VERSION,
				'CB-ACCESS-SIGN: '.$signature,
				'CB-ACCESS-TIMESTAMP: '.$time,
				'CB-ACCESS-KEY: '.API_KEY
			);
			$ch = curl_init(API_BASE.$path);
			curl_setopt($ch, CURLOPT_HTTPGET, true);
			curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			$result = curl_exec($ch);
			return $result;
		}

	//Get account deposits
	public function get_account_deposits($account_id)
	{
		$time = $this->get_server_timestamp();
		$path = "/v2/accounts/".$account_id."/deposits";	
		$signature = $this->generate_signature($path, "GET");
		$headers = array(
			'Content-Type: application/json',
			'CB-VERSION: '.API_VERSION,
			'CB-ACCESS-SIGN: '.$signature,
			'CB-ACCESS-TIMESTAMP: '.$time,
			'CB-ACCESS-KEY: '.API_KEY
		);
		$ch = curl_init(API_BASE.$path);
		curl_setopt($ch, CURLOPT_HTTPGET, true);
		curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		$result = curl_exec($ch);
		return $result;
	}
	
	//Get notifications
	public function get_notification()
	{
		$time = $this->get_server_timestamp();
		$path = "/v2/notifications";	
		$signature = $this->generate_signature($path, "GET");
		$headers = array(
			'Content-Type: application/json',
			'CB-VERSION: '.API_VERSION,
			'CB-ACCESS-SIGN: '.$signature,
			'CB-ACCESS-TIMESTAMP: '.$time,
			'CB-ACCESS-KEY: '.API_KEY
		);
		$ch = curl_init(API_BASE.$path);
		curl_setopt($ch, CURLOPT_HTTPGET, true);
		curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		$result = curl_exec($ch);
		return $result;
	}
}