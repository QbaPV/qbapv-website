
//----------------------------------------------------------
//               SESSION SERVICE
//----------------------------------------------------------
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
    		$http.post('index.php/usuario_ctrl/Logout');
    		return sessionStorage.removeItem(key);
    	}
    };
}]);

//----------------------------------------------------------
//               LOGIN SERVICE
//----------------------------------------------------------
'use strict'
AdminApp.factory('loginService', function($http, $route, $location, sessionService){
    return{
            login: function($user,$scope){
                var response = $http.post('index.php/usuario_ctrl/login', $user);
                return response;
            },
            logout: function(){
                sessionService.destroy('uid');
                $http.get("index.php/usuario_ctrl/logout");
                //$location.path('/inicio');
                //$route.reload();
            },
            isLogged: function(){
                var checkSession = $http.get("index.php/usuario_ctrl/islogged");
                return checkSession;
            },
            getLogin: function(){
                var user = $http.get('index.php/usuario_ctrl/login_state');
                return user;
            },
            getRoles: function(){
                return $http.get('index.php/rol_ctrl/consultarall');
            },
            getLanguage: function(){
                return $http.get('index.php/index_ctrl/consultar_lang');
            }
        }
});

//----------------------------------------------------------
//               NEGOCIO SERVICE
//----------------------------------------------------------
'use strict'
AdminApp.factory('negocioService', function($http){
    return{
    	tengoPlan: function(){
    		var validate = $http.get('php/tengoPlan.php');
    		return validate;
    	},
    		obtenerPaquetes: function(){
				var paquete = $http.get('classes/controllers/controller_paquetes.php');
				return paquete;
			},
			creditoAcumulado: function($scope){
				var requestCredito = $http.get('php/obtenerCredito.php');
				requestCredito.then(function (response) {
					$scope.credito = response.data;
					//Condición para mostrar el estado que tiene los creditos
					if(response.data<=0){
						$scope.tiene = false;
					} else {
						$scope.tiene = true;
					}
				});
				return requestCredito;
			},
			obtenerTipoPlan:function(){
				var requestTipo = $http.get('php/obtenerTipoPlan.php');
				return requestTipo;
			},
			obtenerPaquetePorTipo:function(tipo){
    		var paquete = $http.get('./classes/controllers/controller_paquetes.php?func=Consultar_Por_Tipo&idtipo=' + tipo);
    		return paquete;
			}
			,
			obtenerTipoMembresia:function(){
    		var tipo = $http.get("./classes/controllers/controller_tipo_membresia.php");
    		return tipo;
			}
    }
});

//----------------------------------------------------------
//               PAISES SERVICE
//----------------------------------------------------------
'use strict'
AdminApp.factory('paisesServicio', function($http){
    return{
    	getPasises: function(){
    		var validate = $http.get('./lib/json/paises.json');
    		return validate;
    	},
        getUbicacion: function(){
            return $http.get('index.php/paises_ctrl/getUbicacion');
        },
    }
});

//----------------------------------------------------------
//               COMPARTIR SERVICE
//----------------------------------------------------------
'use strict'
AdminApp.factory('servicio', function(){
    var cantidad = 0;
    var total = 0.0;
    var user = [];
    var idreferal = 0;
    var notificaciones = [];
    var  nombrereferal = "";
    var  return_url = "";
    var islogged = true;
    var dataFilter = "";
    var url = "";
    return{
        getNotificaciones: function(){
            return notificaciones;
        },
        setNotificaciones: function(obj){
            notificaciones = obj;
        },
        getValue: function(){
            return cantidad;
        },
        getTotal: function(){
            return total;
        },
        getUser: function(){
            return user;
        },
        getIsLogged: function(){
            return islogged;
        },
        getIdReferal: function(){
            return idreferal;
        },
        getNombreReferal: function(){
            return nombrereferal;
        },
        setTotal: function(totalvalor){
            total = parseFloat(totalvalor);
        },
        setValue: function(value){
            cantidad = parseInt(value);
        },
        setUser: function(uservalue){
            user = uservalue;
        },
        setIsLogged: function(value){
            islogged = value;
        },
        setIdReferal: function(value){
            idreferal = parseInt(value);
        },
        setNombreReferal: function(value){
            nombrereferal = value;
        }, 
        setReturnUrl: function(value){
            return_url =value;
        },
        getReturnUrl: function(){
            return return_url;
        },

        setDataFilter: function(value){
            dataFilter = value;
        },

        getDataFilter: function(){
            return dataFilter;
        },
        setUrl: function(value){
            url = value;
        },

        getUrl: function(){
            return url;
        }
    };
});


//----------------------------------------------------------
//               SHOP SERVICE
//----------------------------------------------------------
'use strict'
AdminApp.factory('shopService', function($http){
    return{
        getProductos: function($scope){
            var data = $http.post('./classes/controllers/controller_productos.php');
            return data;
        },
        getCategorias: function($scope){
            var data = $http.post('./classes/controllers/controller_categorias.php');
            return data;
        },
        getFabricantes: function($scope){
            var data = $http.post('./classes/controllers/controller_fabricantes.php');
            return data;
        },
        adicionarProductoCarrito: function($producto){
            var data = $http.post('./classes/controllers/controller_productos.php?func=Agregar_al_Carrito', $producto);
            return data;
        },
        obtenerCantidadCarrito: function(){
            var data = $http.post('./classes/controllers/controller_productos.php?func=Cantidad_Productos_en_Carrito');
            return data;
        },
        vaciarCarrito: function($scope){
            var data = $http.get('./classes/controllers/controller_productos.php?func=Vaciar_Carrito');
            data.then(function(response){
                $scope.productos_carrito = [];
            });
        },
        obtenerProductosCarrito:function($scope){
            var data = $http.post('./classes/controllers/controller_productos.php?func=Productos_en_Carrito');
            data.then(function(response){
                $scope.productos_carrito = response.data;
            });
        }
    }
});


//----------------------------------------------------------
//               FILIACION SERVICE
//----------------------------------------------------------
'use strict'
AdminApp.factory('filiacionService', function($http){
    return{
        getMembresias: function($scope){
            var data = $http.post('./classes/controllers/controller_paquetes.php');
            return data;
        }
    }
});

