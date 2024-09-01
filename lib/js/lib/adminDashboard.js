var AdminApp = angular.module('AdminApp', ['ngRoute', 'ngCookies', 'ui.bootstrap', 'ngSanitize', 'ngAnimate', 'ui-notification', 'noCAPTCHA', 'ja.qr', 'ngMd5']);

AdminApp.config(function($routeProvider, NotificationProvider, googleGrecaptchaProvider) {
    //captcha
    googleGrecaptchaProvider.setLanguage('es');

    //Notification 
    NotificationProvider.setOptions({
        delay: 2000,
        startTop: 100,
        startRight: 10,
        verticalSpacing: 20,
        horizontalSpacing: 20,
        positionX: 'right',
        positionY: 'top'
    });

    //Rutas
    $routeProvider.
    when('/', {
        templateUrl: 'index.php/index_ctrl/home',
        controller: 'mainCtrl'
    }).
    when('/procesedorders', {
        templateUrl: 'index.php/index_ctrl/procesedorders',
        controller: 'OrdenesProcesadasCtrl'
    }).
    when('/sendorders', {
        templateUrl: 'index.php/index_ctrl/sendorders',
        controller: 'OrdenesEnviadasCtrl'
    }).
    when('/provider', {
        templateUrl: 'index.php/index_ctrl/provider',
        controller: 'ProviderCtrl'
    }).
    when('/client', {
        templateUrl: 'index.php/index_ctrl/client',
        controller: 'ClientCtrl'
    }).
    when('/participaciones', {
        templateUrl: 'index.php/index_ctrl/participaciones',
        controller: 'participacionesCtrl'
    }).
    when('/compra_participaciones', {
        templateUrl: 'index.php/index_ctrl/compra_participaciones',
        controller: 'participacionesCtrl'
    }).
    when('/repartir_dividendos', {
        templateUrl: 'index.php/index_ctrl/repartit_dividendos',
        controller: 'participacionesCtrl'
    }).
    when('/usuarios', {
        templateUrl: 'index.php/index_ctrl/usuarios',
        controller: 'usuariosCtrl'
    }).
    when('/planes', {
        templateUrl: 'index.php/index_ctrl/planes',
        controller: 'planesCtrl'
    }).
    when('/resumen_planes', {
        templateUrl: 'index.php/index_ctrl/resumen_planes',
        controller: 'planesCtrl'
    }).
    when('/puntos', {
        templateUrl: 'index.php/index_ctrl/puntos',
        controller: 'puntosCtrl'
    }).
    when('/retiros', {
        templateUrl: 'index.php/index_ctrl/retiros',
        controller: 'retirosCtrl'
    }).
	when('/videos_promo', {
        templateUrl: 'index.php/index_ctrl/videos_promo',
        controller: 'videosCtrl'
    }).
    when('/inicio/en', {
        templateUrl: 'index.php/index_ctrl/home',
        controller: 'mainCtrl'
    }).

    when('/inicio/pt', {
        templateUrl: 'index.php/index_ctrl/home',
        controller: 'mainCtrl'
    }).
    when('/roles', {
        templateUrl: 'index.php/rol_ctrl',
        controller: 'rolCtrl'
    }).

    when('/login', {
        templateUrl: 'index.php/index_ctrl/login',
        controller: 'mainCtrl'
    }).
    when('/nuevo_referido/es', {
        templateUrl: 'index.php/index_ctrl/agregar_referido',
        controller: 'NuevoReferidoCtrl'
    }).
    when('/nuevo_referido/en', {
        templateUrl: 'index.php/index_ctrl/agregar_referido',
        controller: 'NuevoReferidoCtrl'
    }).
    when('/nuevo_referido/pt', {
            templateUrl: 'index.php/index_ctrl/agregar_referido',
            controller: 'NuevoReferidoCtrl'
        })
        .when('/nuevo_link_referido/:sponsorRef', {
            templateUrl: 'index.php/index_ctrl/agregar_referido_link',
            controller: 'mainCtrl'
        })
        .when('/activate_account/:accountRef', {
            templateUrl: 'index.php/index_ctrl/activate_account',
            controller: 'activateCtrl'
        }).
    when('/send_email', {
        templateUrl: 'index.php/usuario_ctrl/send_email',
        controller: 'mainCtrl'
    }).
    when('/dashboard', {
        templateUrl: 'index.php/index_ctrl/dashboard',
        controller: 'dashboardCtrl'
    }).
	when('/dashboard_admin', {
        templateUrl: 'index.php/index_ctrl/dashboard_admin',
        controller: 'dashboardCtrl'
    }).
	
	when('/dashboard/en', {
        templateUrl: 'index.php/dashboard_ctrl',
        controller: 'dashboardCtrl'
    }).
    when('/dashboard/pt', {
        templateUrl: 'index.php/dashboard_ctrl',
        controller: 'dashboardCtrl'
    }).
    when('/red', {
        templateUrl: 'index.php/index_ctrl/get_unilevel_tree',
        controller: 'unilevelTreeCtrl'
    }).

    when('/explorarred', {
        templateUrl: 'index.php/index_ctrl/get_unilevel_tree1',
        controller: 'exploreTreeCtrl'
    }).
    when('/referals/es', {
        templateUrl: 'index.php/index_ctrl/mis_referidos',
        controller: 'misReferidosCtrl'
    }).
    when('/referals/en', {
        templateUrl: 'index.php/index_ctrl/mis_referidos',
        controller: 'misReferidosCtrl'
    }).
    when('/referals/pt', {
        templateUrl: 'index.php/index_ctrl/mis_referidos',
        controller: 'misReferidosCtrl'
    }).
    when('/actividad/es', {
        templateUrl: 'index.php/index_ctrl/actividad',
        controller: 'misReferidosCtrl'
    }).
    when('/actividad/en', {
        templateUrl: 'index.php/index_ctrl/actividad',
        controller: 'misReferidosCtrl'
    }).
    when('/actividad/pt', {
        templateUrl: 'index.php/index_ctrl/actividad',
        controller: 'misReferidosCtrl'
    }).
    when('/profile/es', {
        templateUrl: 'index.php/index_ctrl/perfil',
        controller: 'perfilCtrl'
    }).
    when('/profile/en', {
        templateUrl: 'index.php/index_ctrl/perfil',
        controller: 'perfilCtrl'
    }).
    when('/profile/pt', {
        templateUrl: 'index.php/index_ctrl/perfil',
        controller: 'perfilCtrl'
    }).
	when('/bono_e', {
        templateUrl: 'index.php/index_ctrl/bono_empresarial',
        controller: 'bonosCtrl'
    }).
	when('/bono_r', {
        templateUrl: 'index.php/index_ctrl/bono_retroactivo',
        controller: 'bonosCtrl'
    }).
    when('/participaciones/es', {
        templateUrl: 'index.php/index_ctrl/participaciones',
        controller: 'participacionesCtrl'
    }).
    when('/participaciones/en', {
        templateUrl: 'index.php/index_ctrl/participaciones',
        controller: 'participacionesCtrl'
    }).
    when('/participaciones/pt', {
        templateUrl: 'index.php/index_ctrl/participaciones',
        controller: 'participacionesCtrl'
    }).
    when('/comprar_planes/es', {
        templateUrl: 'index.php/index_ctrl/comprar_planes',
        controller: 'planesCtrl'
    }).
    when('/comprar_planes/en', {
        templateUrl: 'index.php/index_ctrl/comprar_planes',
        controller: 'planesCtrl'
    }).
    when('/comprar_planes/pt', {
        templateUrl: 'index.php/index_ctrl/comprar_planes',
        controller: 'planesCtrl'
    }).
    when('/crowfunding/es', {
        templateUrl: 'index.php/index_ctrl/crowfunding',
        controller: 'crowfundingCtrl'
    }).
    when('/crowfunding/en', {
        templateUrl: 'index.php/index_ctrl/crowfunding',
        controller: 'crowfundingCtrl'
    }).
    when('/crowfunding/pt', {
        templateUrl: 'index.php/index_ctrl/crowfunding',
        controller: 'crowfundingCtrl'
    }).
    when('/negocio/es', {
        templateUrl: 'index.php/index_ctrl/negocio',
        controller: 'negocioCtrl'
    }).
    when('/negocio/en', {
        templateUrl: 'index.php/index_ctrl/negocio',
        controller: 'negocioCtrl'
    }).
    when('/negocio/pt', {
        templateUrl: 'index.php/index_ctrl/negocio',
        controller: 'negocioCtrl'
    }).
    when('/balances/es', {
        templateUrl: 'index.php/index_ctrl/balances',
        controller: 'balancesCtrl'
    }).
    when('/balances/en', {
        templateUrl: 'index.php/index_ctrl/balances',
        controller: 'balancesCtrl'
    }).
    when('/balances/pt', {
        templateUrl: 'index.php/index_ctrl/balances',
        controller: 'balancesCtrl'
    }).
    when('/historico/es', {
        templateUrl: 'index.php/index_ctrl/historico',
        controller: 'historicoCtrl'
    }).
    when('/historico/en', {
        templateUrl: 'index.php/index_ctrl/historico',
        controller: 'historicoCtrl'
    }).
    when('/historico/pt', {
        templateUrl: 'index.php/index_ctrl/historico',
        controller: 'historicoCtrl'
    }).
    when('/retiros', {
        templateUrl: 'index.php/index_ctrl/retiros',
        controller: 'retirosCtrl'
    }).
    when('/acerca/es', {
        templateUrl: 'index.php/index_ctrl/acerca',
        controller: 'mainCtrl'
    }).
    when('/acerca/en', {
        templateUrl: 'index.php/index_ctrl/acerca',
        controller: 'mainCtrl'
    }).
    when('/acerca/pt', {
        templateUrl: 'index.php/index_ctrl/acerca',
        controller: 'mainCtrl'
    }).
    when('/contacto/es', {
        templateUrl: 'index.php/index_ctrl/contact',
        controller: 'mainCtrl'
    }).
    when('/contacto/en', {
        templateUrl: 'index.php/index_ctrl/contact',
        controller: 'mainCtrl'
    }).
    when('/contacto/pt', {
        templateUrl: 'index.php/index_ctrl/contact',
        controller: 'mainCtrl'
    }).
    when('/ser_miembro/es', {
        templateUrl: 'index.php/index_ctrl/ser_miembro',
        controller: 'mainCtrl'
    }).
    when('/ser_miembro/en', {
        templateUrl: 'index.php/index_ctrl/ser_miembro',
        controller: 'mainCtrl'
    }).
    when('/ser_miembro/pt', {
        templateUrl: 'index.php/index_ctrl/ser_miembro',
        controller: 'mainCtrl'
    }).
    when('/ventajas/es', {
        templateUrl: 'index.php/index_ctrl/ventajas',
        controller: 'mainCtrl'
    }).
    when('/ventajas/en', {
        templateUrl: 'index.php/index_ctrl/ventajas',
        controller: 'mainCtrl'
    }).
    when('/ventajas/pt', {
        templateUrl: 'index.php/index_ctrl/ventajas',
        controller: 'mainCtrl'
    }).
    when('/comprar_productos/es', {
        templateUrl: 'index.php/index_ctrl/comprar_productos',
        controller: 'mainCtrl'
    }).
    when('/comprar_productos/en', {
        templateUrl: 'index.php/index_ctrl/comprar_productos',
        controller: 'mainCtrl'
    }).
    when('/comprar_productos/pt', {
        templateUrl: 'index.php/index_ctrl/comprar_productos',
        controller: 'mainCtrl'
    }).
    when('/blog/es', {
        templateUrl: 'index.php/index_ctrl/blog',
        controller: 'mainCtrl'
    }).
    when('/blog/en', {
        templateUrl: 'index.php/index_ctrl/blog',
        controller: 'mainCtrl'
    }).
    when('/blog/pt', {
        templateUrl: 'index.php/index_ctrl/blog',
        controller: 'mainCtrl'
    }).
    when('/aviso_legal/es', {
        templateUrl: 'index.php/index_ctrl/aviso_legal',
        controller: 'mainCtrl'
    }).
    when('/aviso_legal/en', {
        templateUrl: 'index.php/index_ctrl/aviso_legal',
        controller: 'mainCtrl'
    }).
    when('/aviso_legal/pt', {
        templateUrl: 'index.php/index_ctrl/aviso_legal',
        controller: 'mainCtrl'
    }).
    when('/politica/es', {
        templateUrl: 'index.php/index_ctrl/politica',
        controller: 'mainCtrl'
    }).
    when('/politica/en', {
        templateUrl: 'index.php/index_ctrl/politica',
        controller: 'mainCtrl'
    }).
    when('/politica/pt', {
        templateUrl: 'index.php/index_ctrl/politica',
        controller: 'mainCtrl'
    }).
    when('/completar_planes', {
        templateUrl: 'index.php/index_ctrl/completar_planes',
        controller: 'planesCtrl'
    }).
    otherwise({
        redirectTo: '/'
    });

    //Optional
    //$locationProvider.html5Mode(true);
});

// -------------------------------------
// Controladores
// -------------------------------------
//Main
AdminApp.controller('mainCtrl', ['$scope', '$cookies', '$http', '$location', 'loginService', 'sessionService', 'servicio', '$rootScope', 'Notification', '$route', '$routeParams', 'paisesServicio', '$interval', 'md5', function($scope, $cookies, $http, $location, loginService, sessionService, servicio, $rootScope, Notification, $route, $routeParams, paisesServicio, $interval, md5) {
    $scope.user = [];
    $scope.cargando = true;
    $scope.isLogged = false;
    $scope.notificaciones = {};
    $scope.cantNotificaciones = 0;
    $scope.padre = {};
    $scope.newLogin = {};
    $scope.isReferido = -1;
    $scope.retiros_no_procesados = 0;

    //Desplaza menu 
    var offset = $("#sidebar").offset();
    var topPadding = -15;
    $(window).scroll(function() {
        if ($(window).scrollTop() > offset.top) {
            $("#sidebar").stop().animate({
                marginTop: $(window).scrollTop() - offset.top + topPadding
            });
        } else {
            $("#sidebar").stop().animate({
                marginTop: -15
            }, 200);
        };
    });

    //scrool button
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100)
            $('.scrolltop').fadeIn();
        else
            $('.scrolltop').fadeOut();
    });
    //Scroll button click to top
    $('.scrolltop').click(function() {
        $("html, body").animate({ scrollTop: 0 }, 500);
        return false;
    });

    //Cookies  
    $scope.GenerateToken = function(seed = "") {
        return seed + Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2); // remove `0.`
    };

    $scope.SetCookies = function(cookiename, val) {
        $cookies.put(cookiename, val);
    };

    $scope.GetCookies = function(cookiename) {
        return $cookies.get(cookiename);
    };

    $scope.ClearCookies = function(cookiename) {
        $cookies.remove(cookiename);
    };

    var localUser = $scope.GetCookies("localuser");
    // if(localUser === null){
    //   alert();
    // }
    // else
    //   console.log(localUser);

		$http.get("index.php/retiros_ctrl/consultar_pendientes").then(function(r){
			$scope.retiros_no_procesados = r.data['data'].length;
		})

	if (localUser !== "") {
        var usr = $http.post("index.php/usuario_ctrl/consultar_by_username_ang", {
            nombre_usuario: localUser,
            email: localUser
        });
        usr.then(function(response) {
            var uid = response.data['data'].usuario_id;
            sessionService.set('uid', uid);
            $scope.isLogged = true;
            servicio.setUser(response.data['data']);
            servicio.setIsLogged(true);
            $rootScope.$broadcast('value-event');
            $scope.user = response.data['data'][0];

            //Redireccionar al dashboard en el idioma seleccionado
            var lang = loginService.getLanguage();
            lang.then(function(response) {
                if (response.data === "") {
                    $location.path('/dashboard/es');
                } else {
                    $location.path('/dashboard/' + response.data);
                }
                if ($location.url().search("inicio") > 0 || $location.url() === "/" || $location.url() === "") {
                    $scope.showLoginButton = false;
                } else {
                    $scope.showLoginButton = true;
                }
            })
        })

    }

    //$scope.Login.remember = false;
    $scope.DoLogin = function(user) {
        user.password = md5.createHash(user.password);
		//console.log(user.password);
        var requestlogin = loginService.login(user, $scope);
		//console.log(requestlogin);
        requestlogin.then(function(response) {
			//var obj = JSON.stringify(response.data) ;
			
			//response = JSON.parse(obj);
			//console.log(response.data['data']);
            if (response.data['data'].length > 0) {
                var uid = response.data['data'].id;
                sessionService.set('uid', uid);
                $scope.isLogged = true;
                servicio.setUser(response.data['data']);
                servicio.setIsLogged(true);
                $rootScope.$broadcast('value-event');
                $scope.user = response.data['data'];

                Notification.success('Bienvenido ' + $scope.user[0].nombre);
				$location.path('/dashboard');
            } else {
                $scope.isLogged = false;
                Notification.error('Acceso denegado. Verifique sus credenciales');
            }
            $scope.cargando = false;		
			//$location.reload();
        });
    }



    $scope.Logout = function() {
        $scope.ClearCookies("localuser");
        loginService.logout();
        servicio.setIsLogged(false);
        $scope.isLogged = servicio.getIsLogged();
        $rootScope.$broadcast('loginuser-event');
        //Salir
        //loginService.logout();
        //$timeout.cancel($scope.cancel);
        //Limpiar variable del servicio
        Notification.success('Usted se ha desconectado correctamente');
        //$location.path('/');
        //Redireccionar al dashboard en el idioma seleccionado
        var lang = loginService.getLanguage();
        lang.then(function(response) {
            if (response.data === "null") {
                $location.path('/inicio/es');
            } else {
                $location.path('/inicio/' + response.data);
            }
        })
    }


    $scope.DoRegister = function(padre) {
        //Ingresar usuario
        var req = $http.post("index.php/usuario_ctrl/insertar", {
            nombre_usuario: $scope.newLogin.nombre_usuario,
            nombre: $scope.newLogin.nombre,
            apellidos: $scope.newLogin.apellidos,
            email: $scope.newLogin.email,
            clave: $scope.newLogin.clave,
            pais: $scope.newLogin.pais,
            sexo: $scope.newLogin.sexo,
            padre_id: padre
        });
        //console.log($scope.newLogin);
        req.then(function(response) {
            if (response.data['error'].code == '100001') //Manual error handle si existe la cuenta
            {
                Notification.error(response.data['error'].message);
                //$scope.cargando = false;
                return;
            }
            Notification.success("Su cuenta se ha creado exitosamente");
            //$location.path('/send_email');
            var reqUser = $http.post("index.php/usuario_ctrl/consultar", {
                usuario_id: response.data.inserted_id
            });
            reqUser.then(function(resp) {
                $scope.userData = resp.data['data'][0];

                if (response.data['inserted_id'] <= 0) {
                    Notification.error("Se ha generado un error en el servidor. Err Num: " + response.data.error['code']);
                } else {
                    var name = $scope.userData.nombre + ' ' + $scope.userData.apellidos;
                    $scope.SendActivationEmail(name, $scope.userData.nombre_usuario, $scope.newLogin.email, $scope.userData.referal);
                    //$scope.cargando = false;
                }
            })
        });
    }


    //mensaje:'Hola ' + '<b><font size="5" color="red">'+ usuario +'</font></b>' + '<br> Visita este enlace para completar el registro: ' + '<a href="www.ublof.com/activate_account.php?account=' + $refLink + '"> Activar cuenta </a>',

    $scope.SendActivationEmail = function(nombre, usuario, email, refLink) {

        $scope.enviandoEmail = true;
        var request = $http.post("index.php/email_ctrl/enviar_email", {
            asunto: "Ublof.com Activación de Cuenta",
            email: email,
            nombre: nombre,
            mensaje: 'Estimado ' + nombre + ', Gracias por registrarte. Tu nombre de usuario es <' + usuario + '> <br> Para activar tu cuenta (plazo para activacion de 72 horas), por favor sigue este enlace para completar el registro: <br/> ' +
                '<a target="blank" href="https://test.ublof.com/#!/activate_account/' + refLink + '"> Completa tu registro en Ublof.com haciendo click aquí</a> <br>',
            nombreFrom: 'Administración de cuentas Ublof'
        })
        request.then(function(response) {
            //console.log(response);
            if (response === 'false') {
                $scope.entregado = false;
            } else $scope.entregado = true;

            //Notification.info("Enviando mensaje para activación de su cuenta");
        })
        $scope.enviandoEmail = false;
    }


    $('#div_sponsor').show();
    $('#div_registro').hide();
    $("#textMsg").hide();
    $("#frmSponsor").hide();
    $("#msgPatrocinio").hide();
    $('#cartel_membresia').hide('slide');


    $("#isReferido").on("click", function() {
        $scope.sponsorId = "";
        $("#frmSponsor").show('fade');
        $("#msgPatrocinio").hide('fade');

        $("#textMsg").hide();
    });

    $("#noReferido").on("click", function() {
        $scope.sponsorId = "";
        $("#frmSponsor").hide('fade');
        $("#msgPatrocinio").show('fade');
        $("#textMsg").hide();
    });

    $("#btnBack").on("click", function() {
        $('#div_sponsor').show('fade');
        $('#div_registro').hide('fade');
        $("#textMsg").hide();
        $('.sponsorImg').attr('src', 'lib/images/defaultprofile.png').addClass('reg_avatar');
        $('#cartel_membresia').hide('slide');

    });

    $("#btnContinuar").on("click", function() {
        var datosPadre = $http.post("index.php/usuario_ctrl/consultar_by_username_ang", {
            nombre_usuario: $("#sponsorTxt").val(),
            email: $("#sponsorTxt").val()
        });
        //console.log(datosPadre);
        datosPadre.then(function(response) {
            $scope.padreId = response.data['data'][0].usuario_id;
        });

        //console.log($scope.sponsorId);
        var datos = {
            nombre_usuario: $scope.sponsorId,
            email: $scope.sponsorId
        }

        if ($scope.isReferido === 1) {
            $.ajax({
                url: 'index.php/usuario_ctrl/consultar_by_username',
                type: 'POST',
                dataType: 'json',
                data: datos,
                beforeSend: function() {
                    $("#textMsg").html("Espere...Estamos Verificando el Patrocinador");
                    $("#textMsg").show();
                },
                //una vez finalizado correctamente
                success: function(response) {
                    if (response['data'].length <= 0) {
                        $("#textMsg").html("El Usuario del patrocinador no es válido.");
                        $("#textMsg").show();
                    } else {
                        $('#div_sponsor').hide('fade');
                        $('#div_registro').show('fade');
                        $('#nombrePatrocinador').html('Tu patrocinador es: <font size="3" color="#02082c">' + response['data'][0].nombre + ' ' + response['data'][0].apellidos + '</font>');
                        $('.sponsorImg').attr('src', response['data'][0].foto).addClass('reg_avatar');
                        $scope.pasdreId = 0;

                    }
                },
                //si ha ocurrido un error
                error: function() {
                    Notification.error("Ha ocurrido un error");
                }
            });
        } else if ($scope.isReferido === 0) {
            $('#div_sponsor').hide('fade');
            $('#div_registro').show('fade');
            $scope.sponsorId = "empresa";
            $scope.padreId = 1;
            $('#nombrePatrocinador').html('');
        }

        $('#cartel_membresia').show('slide');


    });

    $("#registrarse").on("click", function() {
        //$scope.padreId = 0;
        $("#frmRegister")[0].reset();
        $("#modalSponsor").modal('hide');
        // $('#div_sponsor').hide('fade'); 
        // $('#div_registro').hide('fade');
    });

    $("#modalSponsor").on('hidden.bs.modal', function(e) {
        $('#div_sponsor').show();
        $('#div_registro').hide();
        $("#textMsg").hide();
        $("#frmSponsor").hide();
        $("#msgPatrocinio").hide();
        $scope.sponsorId = "";
        $("#sponsorTxt").val("");
        $('#cartel_membresia').hide('slide');
        $('.sponsorImg').attr('src', 'lib/images/defaultprofile.png').addClass('reg_avatar');
    })

    //Estilos menu principal
    $('.inactive').click(function() {
        $('.inactive').removeClass('active');
        $(this).addClass('active');
    })

    //Validar la ventana activa para ocultar boton login
    $('.link').click(function() {
        var uri = $(this).attr('href').toString();
        //alert(uri);
        if (uri.search("inicio") > 0 || uri === "#!/") {
            $scope.showLoginButton = false;
        } else {
            $scope.showLoginButton = true;
        }
    })

    // $('#skin').bootstrapToggle({
    //   on: 'Tema Ocean',
    //   off: 'Tema Light',
    //   size: 'mini',
    //   onstyle: 'primary',
    //   offstyle: 'light'
    // });

    //Geolaclizacion
    $scope.countryData = [];
    $scope.countryData.countryCode = "";
    $scope.countryData.countryCodeName = "";
    var localizacion = $http.get("http://www.geoplugin.net/json.gp");;
    localizacion.then(function(response) {
        $scope.countryData.countryCode = response.data.geoplugin_countryCode;
        $scope.countryData.countryCodeName = response.data.geoplugin_countryName;
        $scope.newLogin.pais = $scope.countryData.countryCode;
        //console.log($scope.newLogin.pais);
    });

    $scope.getCoinsMarquet = function() {
        //Precio Bitcoin
        //var req = $http.get("https://blockchain.info/ticker");
        var req = $http.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false");
        //console.log(req);
        req.then(function(response) {
            //console.log(response.data[0]);
            $scope.cryptos = response.data;
            //console.log($scope.btc);

        });
    }

    $scope.getCoinsMarquet();

    $interval(function() {
        $scope.getCoinsMarquet();
    }, 300000);

    if (angular.isDefined($routeParams.sponsorRef)) {
        //console.log($routeParams.sponsorRef);
        var resp = $http.post("index.php/usuario_ctrl/consultar_by_referal", {
            referal: $routeParams.sponsorRef
        });
        resp.then(function(response) {
            //console.log(response);
            $scope.UserPadre = response.data['data'][0];
        })
    }
    //initHomeSlider();
    $scope.Slider = function() {
        //Config slider principal
        $scope.myInterval = 5000;
        $scope.noWrapSlides = false;
        $scope.active = 0;
        $scope.slides = [];
        var currIndex = 0;

        $scope.slides.push({
            image: 'lib/images/slider/carrusel01.png',
            text: "Bienvenido a Ublof.com",
            parrafo: "",
            id: currIndex++
        });
        $scope.slides.push({
            image: 'lib/images/slider/carrusel02.jpg',
            text: "Aprende con Ublof lo que nadie te enseña",
            parrafo: "",
            id: currIndex++
        });
        $scope.slides.push({
            image: 'lib/images/slider/carrusel03.png',
            text: "Descubre todas las posibilidades que ofrecemos",
            parrafo: "",
            id: currIndex++
        });
        $scope.slides.push({
            image: 'lib/images/slider/carrusel04.png',
            text: "Participa de la economía digital del futuro",
            parrafo: "",
            id: currIndex++
        });

        $scope.slides.push({
            image: 'lib/images/slider/carrusel05.png',
            text: "Únete a nuestro crecimiento mundial",
            parrafo: "",
            id: currIndex++
        });
    }

    $scope.Slider();

    //Cargar paises
    var req = $http.get("index.php/index_ctrl/cargar_paises");
    req.then(function(response) {
        $scope.paises = response.data;
        //console.log(response.data);
        $scope.cargando = false;
    });

    //Mantener el usuario logueado si refresca la pagina.
    var userrequest = loginService.isLogged();
    userrequest.then(function(response) {
        //console.log(response);    
        if (response.data[0] == '1') {
            $scope.isLogged = true;
            var req = loginService.getLogin();
            req.then(function(resp) {
                $scope.user = resp.data['user_data']['data'][0];
                $('#welcome').html("Bienvenido a tu BackOffice <font color='#072672' >" + $scope.user.nombre + "</font>");
                $scope.CargarNotificaciones();
            })
        }
    });

    //Leer Notificaciones por usuario logueado
    $scope.CargarNotificaciones = function() {
        //Cargar notificaciones
        var reqNot = $http.post("index.php/notificaciones_ctrl/consultar_by_usuario_id", {
            usuario_id: $scope.user.usuario_id
        });
        reqNot.then(function(response) {
            $scope.notificaciones = response.data['data'];
            //servicio.setNotificaciones(response.data['data']);
            //$scope.notificaciones = servicio.getNotificaciones();
        })
    }

    // $scope.CargarNotificaciones();

    // $scope.$on('notificacion-event', function () {
    //   $scope.CargarNotificaciones();
    // });

    $scope.$on('value-event', function() {
        $scope.user = servicio.getUser();
        $scope.isLogged = servicio.getIsLogged();
        $scope.notificaciones = servicio.getNotificaciones();
    });

}]);

//Ordenes procesadas Ctrl
AdminApp.controller('OrdenesProcesadasCtrl', ['$scope', '$http', '$location', 'loginService', 'sessionService', 'servicio', '$rootScope', '$filter', 'Notification', function($scope, $http, $location, loginService, sessionService, servicio, $rootScope, $filter, Notification) {
    if (!$scope.isLogged)
        $location.path('/home');

    $("html, body").animate({ scrollTop: 0 }, 500);

    $scope.cargando = true;
    $scope.listOrdenesProcesadas = [];
    $scope.client = {};
    $scope.currentPage = 1; // página que esta corriendo
    $scope.itemsPerPage = 5;

    $scope.sortType = '';
    $scope.sortReverse = false;
	
	$scope.CargarOrdenesProcesadas = function(){
	//Ordenes procesadas
		var respuesta = $http.get("index.php/ordenesprocesadas_ctrl/consultar_all");
        respuesta.then(function(response) {
            $scope.listOrdenesProcesadas = response.data['data'];
            $scope.cargando = false;
        })	
	};
    $scope.CargarOrdenesProcesadas();

    $scope.GetClientInfo = function(clientId) {
        var respuesta = $http.post("index.php/client_ctrl/consultar_by_client_id",{
            clientId: clientId,
        });
        respuesta.then(function(response) {
            console.log(response);
            $scope.client = response.data['data'];
            $scope.cargando = false;
        })	
    }



}]);


//Ordenes Enviadas Ctrl
AdminApp.controller('OrdenesEnviadasCtrl', ['$scope', '$http', '$location', 'loginService', 'sessionService', 'servicio', '$rootScope', '$filter', 'Notification', function($scope, $http, $location, loginService, sessionService, servicio, $rootScope, $filter, Notification) {
    if (!$scope.isLogged)
        $location.path('/home');

    $("html, body").animate({ scrollTop: 0 }, 500);

    $scope.cargando = true;
    $scope.listOrdenesProcesadas = [];
    $scope.client = {};
    $scope.currentPage = 1; // página que esta corriendo
    $scope.itemsPerPage = 5;

    $scope.sortType = '';
    $scope.sortReverse = false;
	
	$scope.CargarOrdenesEnviadas = function(){
	//Ordenes procesadas
		var respuesta = $http.get("index.php/ordenesenviadas_ctrl/consultar_all");
        respuesta.then(function(response) {
            $scope.listOrdenesProcesadas = response.data['data'];
            $scope.cargando = false;
        })	
	};
    $scope.CargarOrdenesEnviadas();

    $scope.GetClientInfo = function(clientId) {
        var respuesta = $http.post("index.php/client_ctrl/consultar_by_client_id",{
            clientId: clientId,
        });
        respuesta.then(function(response) {
            console.log(response);
            $scope.client = response.data['data'];
            $scope.cargando = false;
        })	
    }



}]);

//clientes Ctrl
AdminApp.controller('ClientCtrl', ['$scope', '$http', '$location', 'loginService', 'sessionService', 'servicio', '$rootScope', '$filter', 'Notification', function($scope, $http, $location, loginService, sessionService, servicio, $rootScope, $filter, Notification) {
    if (!$scope.isLogged)
        $location.path('/home');

    $("html, body").animate({ scrollTop: 0 }, 500);

    $scope.cargando = true;
    $scope.list = [];
    $scope.client = {};
    $scope.currentPage = 1; // página que esta corriendo
    $scope.itemsPerPage = 5;

    $scope.sortType = '';
    $scope.sortReverse = false;
	
	$scope.CargarClientes = function(){
	//Ordenes procesadas
		var respuesta = $http.get("index.php/client_ctrl/consultar_all");
        respuesta.then(function(response) {
            $scope.list = response.data['data'];
            $scope.cargando = false;
        })	
	};
    $scope.CargarClientes();
}]);



//Prveedor Ctrl
AdminApp.controller('ProviderCtrl', ['$scope', '$http', '$location', 'loginService', 'sessionService', 'servicio', '$rootScope', '$filter', 'Notification', function($scope, $http, $location, loginService, sessionService, servicio, $rootScope, $filter, Notification) {
    if (!$scope.isLogged)
        $location.path('/home');

    $("html, body").animate({ scrollTop: 0 }, 500);

    $scope.cargando = true;
    $scope.list = [];
    $scope.provider = {};
    $scope.currentPage = 1; // página que esta corriendo
    $scope.itemsPerPage = 5;

    $scope.sortType = '';
    $scope.sortReverse = false;
	
	$scope.CargarProvider = function(){
	//Ordenes procesadas
		var respuesta = $http.get("index.php/provider_ctrl/consultar_all");
        respuesta.then(function(response) {
            $scope.list = response.data['data'];
            $scope.cargando = false;
        })	
	};
    $scope.CargarProvider();
}]);


























//Actividad de los Referidos Table.
AdminApp.controller('actividadCtrl', ['$scope', '$http', '$location', '$routeParams', '$filter', '$rootScope', 'servicio', 'loginService', 'sessionService', 'Notification', '$route', function($scope, $http, $location, $routeParams, $filter, $rootScope, servicio, loginService, sessionService, Notification, $route) {
    if (!$scope.isLogged)
        $location.path('/home');

    $("html, body").animate({ scrollTop: 0 }, 500);

    $scope.cargando = true;
    $scope.userData = [];
    $scope.Referidos = [];

    $scope.currentPage = 1; // página que esta corriendo
    $scope.itemsPerPage = 5;

    $scope.sortType = '';
    $scope.sortReverse = false;

    //Referidos del usuario logueado
    var logged = loginService.getLogin();
    logged.then(function(resp) {
        $scope.userData.userId = resp.data['user_data']['data'][0].usuario_id;
        var referidos = $http.post("index.php/usuario_ctrl/get_mis_referidos", {
            usuario_id: $scope.userData.userId
        });
        referidos.then(function(response) {
            $scope.Referidos = response.data['data'];
        })
    })

    $scope.Reload = function() {

    }
}]);


// -------------------------------------
// Metodos publicos
// -------------------------------------

function Graficar() {
    if ($("#order-chart").length) {
        var areaData = {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
            datasets: [{
                    data: [175, 200, 130, 210, 40, 60, 25],
                    backgroundColor: [
                        'rgba(255, 193, 2, .8)'
                    ],
                    borderColor: [
                        'transparent'
                    ],
                    borderWidth: 3,
                    fill: 'origin',
                    label: "services"
                },
                {
                    data: [175, 145, 190, 130, 240, 160, 200],
                    backgroundColor: [
                        'rgba(245, 166, 35, 1)'
                    ],
                    borderColor: [
                        'transparent'
                    ],
                    borderWidth: 3,
                    fill: 'origin',
                    label: "purchases"
                }
            ]
        };
        var areaOptions = {

            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                filler: {
                    propagate: false
                }
            },
            scales: {
                xAxes: [{
                    display: false,
                    ticks: {
                        display: true
                    },
                    gridLines: {
                        display: false,
                        drawBorder: false,
                        color: 'transparent',
                        zeroLineColor: '#eeeeee'
                    }
                }],
                yAxes: [{
                    display: false,
                    ticks: {
                        display: true,
                        autoSkip: false,
                        maxRotation: 0,
                        stepSize: 100,
                        min: 0,
                        max: 260
                    },
                    gridLines: {
                        drawBorder: false
                    }
                }]
            },
            legend: {
                display: false
            },
            tooltips: {
                enabled: true
            },
            elements: {
                line: {
                    tension: .45
                },
                point: {
                    radius: 0
                }
            }
        }
        var salesChartCanvas = $("#order-chart").get(0).getContext("2d");
        var salesChart = new Chart(salesChartCanvas, {
            type: 'line',
            data: areaData,
            options: areaOptions
        });
    }

    if ($("#sales-chart").length) {
        var SalesChartCanvas = $("#sales-chart").get(0).getContext("2d");
        var SalesChart = new Chart(SalesChartCanvas, {
            type: 'bar',
            data: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May"],
                datasets: [{
                        label: 'Offline Sales',
                        data: [480, 230, 470, 210, 330],
                        backgroundColor: '#8EB0FF'
                    },
                    {
                        label: 'Online Sales',
                        data: [400, 340, 550, 480, 170],
                        backgroundColor: '#316FFF'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 20,
                        bottom: 0
                    }
                },
                scales: {
                    yAxes: [{
                        display: true,
                        gridLines: {
                            display: false,
                            drawBorder: false
                        },
                        ticks: {
                            display: false,
                            min: 0,
                            max: 500
                        }
                    }],
                    xAxes: [{
                        stacked: false,
                        ticks: {
                            beginAtZero: true,
                            fontColor: "#9fa0a2"
                        },
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                            display: false
                        },
                        barPercentage: 1
                    }]
                },
                legend: {
                    display: false
                },
                elements: {
                    point: {
                        radius: 0
                    }
                }
            },
        });
        document.getElementById('sales-legend').innerHTML = SalesChart.generateLegend();
    }

    if ($("#north-america-chart").length) {
        var areaData = {
            labels: ["Jan", "Feb", "Mar"],
            datasets: [{
                data: [100, 50, 50],
                backgroundColor: [
                    "#71c016", "#8caaff", "#248afd",
                ],
                borderColor: "rgba(0,0,0,0)"
            }]
        };
        var areaOptions = {
            responsive: true,
            maintainAspectRatio: true,
            segmentShowStroke: false,
            cutoutPercentage: 78,
            elements: {
                arc: {
                    borderWidth: 4
                }
            },
            legend: {
                display: false
            },
            tooltips: {
                enabled: true
            },
            legendCallback: function(chart) {
                var text = [];
                text.push('<div class="report-chart">');
                text.push('<div class="d-flex justify-content-between mx-4 mx-xl-5 mt-3"><div class="d-flex align-items-center"><div class="mr-3" style="width:20px; height:20px; border-radius: 50%; background-color: ' + chart.data.datasets[0].backgroundColor[0] + '"></div><p class="mb-0">Referidos Directos</p></div>');
                text.push('<p class="mb-0">22789</p>');
                text.push('</div>');
                text.push('<div class="d-flex justify-content-between mx-4 mx-xl-5 mt-3"><div class="d-flex align-items-center"><div class="mr-3" style="width:20px; height:20px; border-radius: 50%; background-color: ' + chart.data.datasets[0].backgroundColor[1] + '"></div><p class="mb-0">Transferencias o Retiros</p></div>');
                text.push('<p class="mb-0">94678</p>');
                text.push('</div>');
                text.push('<div class="d-flex justify-content-between mx-4 mx-xl-5 mt-3"><div class="d-flex align-items-center"><div class="mr-3" style="width:20px; height:20px; border-radius: 50%; background-color: ' + chart.data.datasets[0].backgroundColor[2] + '"></div><p class="mb-0">Returns</p></div>');
                text.push('<p class="mb-0">12097</p>');
                text.push('</div>');
                text.push('</div>');
                return text.join("");
            },
        }
        var northAmericaChartPlugins = {
            beforeDraw: function(chart) {
                var width = chart.chart.width,
                    height = chart.chart.height,
                    ctx = chart.chart.ctx;

                ctx.restore();
                var fontSize = 3.125;
                ctx.font = "600 " + fontSize + "em sans-serif";
                ctx.textBaseline = "middle";
                ctx.fillStyle = "#000";

                var text = "63",
                    textX = Math.round((width - ctx.measureText(text).width) / 2),
                    textY = height / 2;

                ctx.fillText(text, textX, textY);
                ctx.save();
            }
        }
        var northAmericaChartCanvas = $("#north-america-chart").get(0).getContext("2d");
        var northAmericaChart = new Chart(northAmericaChartCanvas, {
            type: 'doughnut',
            data: areaData,
            options: areaOptions,
            plugins: northAmericaChartPlugins
        });
        document.getElementById('north-america-legend').innerHTML = northAmericaChart.generateLegend();
    }

}

function Notificacion(titulo, message) {
    $.notify({
        // options
        message: message,
        icon: 'flaticon-alarm-1',
        title: titulo
    }, {
        // settings
        type: 'info'
    });
}

function Swall(message) {
    swal(message, {
        icon: "error",
        buttons: {
            confirm: {
                className: 'btn btn-primary'
            }
        },
    });
}

function SwallInfo(message) {
    swal(message, {
        icon: "info",
        buttons: {
            confirm: {
                className: 'btn btn-primary',
                text: 'Aceptar'
            }
        },
    });
}

function initHomeSlider() {
    if ($('.home_slider').length) {
        var homeSlider = $('.home_slider');

        homeSlider.owlCarousel({
            items: 1,
            loop: true,
            smartSpeed: 1200,
            autoplay: true,
            dots: true,
            nav: false,
            responsive: {
                0: { dots: false },
                575: { dots: true }
            }
        });

        if ($('.home_slider_prev').length) {
            var prev = $('.home_slider_prev');
            prev.on('click', function() {
                homeSlider.trigger('prev.owl.carousel');
            });
        }

        if ($('.home_slider_next').length) {
            var next = $('.home_slider_next');
            next.on('click', function() {
                homeSlider.trigger('next.owl.carousel');
            });
        }
    }
}

function FormatDate(m){
	var dateString =
			m.getFullYear() + "/" +
			("0" + (m.getMonth()+1)).slice(-2) + "/" +
			("0" + m.getDate()).slice(-2)
			return dateString;
}