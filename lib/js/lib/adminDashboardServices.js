//---------------------------------------------------------------
//Servicio para Manejo de sesiones
//---------------------------------------------------------------
'use strict'
AdminApp.factory('sessionService', ['$http', function($http){
    return{
    	set: function(key, value){
    		return sessionStorage.setItem(key, value);
    	},
    	get: function(key){
    		return sessionStorage.getItem(key);
    	},
    	destroy: function(key){
    		$http.post('../php/adminlogout.php');
    		return sessionStorage.removeItem(key);
    	}
    };
}]);

'use strict'
//---------------------------------------------------------------
//Servicio para Manejo autenticacion
//---------------------------------------------------------------
AdminApp.factory('loginService', function($http, $location, sessionService){
    return{
    	getLoginData: function($user){
    		var response = $http.post('../data/controllers/controller_usuarios.php?func=Consultar_Login', $user);
    		return response;
    	},
    	logout: function(){
			sessionService.destroy('uid');	
			sessionService.destroy('Nombre');	
			sessionService.destroy('Foto');	
			sessionService.destroy('grupo');	
			sessionService.destroy('didLogin');	
    		window.location = "../admin"; 
    	},
    	islogged: function(){
    		var checkSession = $http.post('php/session.php');
    		return checkSession;
    	},
    	fetchuser: function(){
    		var user = $http.get('php/fetch.php');
    		return user;
    	}
    }
});

//---------------------------------------------------------------
//Servicio para Manejo de paises almacenados en json
//---------------------------------------------------------------
'use strict'
AdminApp.factory('paisesService', function($http){
    return{
    	getPasises: function(){
    		var response = $http.get('../classes/paises.json');
    		return response;
    	}
    }
});


//----------------------------------------------------------
//               COMPARTIR SERVICE
//----------------------------------------------------------
'use strict'
AdminApp.factory('servicio', function(){
    var  return_url = "";
    var dataFilter = "";
    return{ 
        setReturnUrl: function(value){
            return_url =value;
        },
        getReturnUrl: function(){
            return return_url;
        },

        setSearchFilterValue: function(value){
            dataFilter = value;
        },

        getSearchFilterValue: function(){
            return dataFilter;
        }

    };
});
