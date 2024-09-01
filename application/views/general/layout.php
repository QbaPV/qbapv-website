<?php
defined('BASEPATH') OR exit('No direct script access allowed');
//echo site_url();
?>

<!DOCTYPE html>
<html lang="es" ng-app="AdminApp">

<head>
  <!-- Required meta tags -->

  <meta charset="utf-8">
  <!-- EXTRAEMOS EL BASEURL DE CODEIGNITER PARA PODER MANEJAR LAS RUTAS EN ANGULARJS -->
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title>Panel de Administración - K&Os Adlitem</title>

  <!-- plugins:css -->
  <link rel="stylesheet" href="lib/vendors/ti-icons/css/themify-icons.css">
  <link rel="stylesheet" href="lib/vendors/base/vendor.bundle.base.css">
  <link rel="stylesheet" href="lib/fonts/fonts.css">

  <!-- CSS Files -->
	<link rel="stylesheet" href="lib/css/lib/bootstrap.min.css">
	<link rel="stylesheet" href="lib/css/lib/bootstrap-treeview.min.css">
	<link rel="stylesheet" href="lib/css/lib/angular-ui-notification.css">
	<!-- <link rel="stylesheet" href="lib/css/lib/owl.carousel.min.css"> -->

  <link rel="stylesheet" href="lib/css/lib/jquery-social-share-bar.css">
  <link rel="stylesheet" href="lib/css/lib/jquery.orgchart.css">

  <link rel="stylesheet" href="lib/css/lib/countrySelect.css">

  <link rel="stylesheet" href="lib/fonts/icomoon/style.css">

  <!-- inject:css -->
  <link rel="stylesheet" href="lib/css/style.css">
 
 
  <!-- <link rel="stylesheet" href="https://unpkg.com/leaflet@1.5.1/dist/leaflet.css" integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ==" crossorigin=""/> -->
    
  <!-- endinject -->
  <link rel="shortcut icon" href="lib/images/logo-mini.png" />
  <link href="lib/css/lib/bootstrap-toggle.min.css" rel="stylesheet">

  <!--   Core JS Files   -->
  <script src="lib/js/lib/angularjs.js"></script>
  <script src="lib/js/lib/qrcode.js" type="text/javascript"></script>
  <script src="lib/js/lib/angularjs-qr.js" type="text/javascript"></script>
	<script src="lib/js/lib/ui-bootstrap-tpls-3.0.5.min.js"></script>
	<script src="lib/js/lib/angular-ui-notification.js"></script>
	<script src="lib/js/lib/angular-route.min.js"></script>
	<script src="lib/js/lib/angular-sanitize.min.js"></script>
	<script src="lib/js/lib/angular-animate.min.js"></script>
  <script src="lib/js/lib/angular-cookies.js"></script>
	<script src="lib/js/lib/angular-no-captcha.js"></script>
<script src="lib/js/lib/angular-md5.js"></script>
	<script src="lib/js/lib/ngclipboard.min.js"></script>
	<script src="lib/js/lib/jquery.3.2.1.min.js"></script>
	<script src="lib/js/lib/jquery.keyframe.min.js"></script>
	<script src="lib/js/lib/bootstrap.min.js"></script>
	<script src="lib/js/lib/bootstrap-treeview.min.js"></script>
  <script src="lib/js/lib/countrySelect.js"></script>

  <script src="lib/js/lib/plugin/bootstrap-toggle/bootstrap-toggle.min.js"></script>
<!-- <script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script> -->

	<!-- Admin Dashboard logic -->
	<script src="lib/js/lib/adminDashboard.js"></script>	
	<script src="lib/js/lib/adminDashboardServices.js"></script>
  <script src="lib/js/lib/services.js"></script>
  <script src="lib/js/lib/directives.js"></script>  
  <script src="lib/js/lib/modernizr.custom.js"></script>
  <!-- <script src="lib/js/tabs.js"></script> -->

<style>
  
</style>
</head>
<body  ng-controller="mainCtrl" style="background: #dddce1">
    <nav class="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row" ng-show="isLogged">
      <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
        <a class="navbar-brand brand-logo mr-5" href="index.html"><img src="lib/images/logo.png" class="mr-2" style="width:130px; height:60px;"alt="logo"/></a>
        <a class="navbar-brand brand-logo-mini" href="index.html"><img src="lib/images/logo-mini.png" alt="logo"/></a>
      </div>
      <div class="navbar-menu-wrapper d-flex align-items-center justify-content-end">
        <button class="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
          <span class="ti-view-list"></span>
        </button>
        <!--ul class="navbar-nav mr-lg-2">
          <li class="nav-item nav-search d-none d-lg-block">
            <div class="input-group">
              <div class="input-group-prepend hover-cursor" id="navbar-search-icon">
                <span class="input-group-text" id="search">
                  <i class="ti-search"></i>
                </span>
              </div>
              <input type="text" class="form-control" id="navbar-search-input" placeholder="buscar" aria-label="search" aria-describedby="search">
            </div>
          </li>
        </ul-->
        <ul class="navbar-nav navbar-nav-right">
          <li class="nav-item dropdown mr-1">
            <a class="nav-link count-indicator dropdown-toggle d-flex justify-content-center align-items-center" id="messageDropdown" href="" data-toggle="dropdown">
              <i class="ti-email mx-0"></i>
            </a>
            <div class="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="messageDropdown">
              <p class="mb-0 font-weight-normal float-left dropdown-header">Mensajes</p>
              <a class="dropdown-item">
                <div class="item-thumbnail">
                    <img src="{{user.foto}}" alt="image" class="profile-pic">
                </div>
                <div class="item-content flex-grow">
                  <h6 class="ellipsis font-weight-normal">
                  </h6>
                  <p class="font-weight-light small-text text-muted mb-0">
                  </p>
                </div>
              </a>
            </div>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link count-indicator dropdown-toggle" id="notificationDropdown" href="" data-toggle="dropdown">
              <i class="ti-bell mx-0"></i>
              <span class="count"></span>
            </a>
            <div class="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="notificationDropdown">
              <p class="mb-0 font-weight-normal float-left dropdown-header">Notificaciones</p>
              <a class="dropdown-item">
                <div class="item-thumbnail">
                  <div class="item-icon bg-success">
                    <i class="ti-info-alt mx-0"></i>
                  </div>
                </div>
                <!--div class="item-content">
                  <h6 class="font-weight-normal">Compra de Planes</h6>
                  <p class="font-weight-light small-text mb-0 text-muted">
                    Hace 10 Horas
                  </p>
                </div -->
              </a>
              <!--a class="dropdown-item">
                <div class="item-thumbnail">
                  <div class="item-icon bg-warning">
                    <i class="ti-settings mx-0"></i>
                  </div>
                </div>
                <div class="item-content">
                  <h6 class="font-weight-normal">Settings</h6>
                  <p class="font-weight-light small-text mb-0 text-muted">
                    Private message
                  </p>
                </div>
              </a>
              <a class="dropdown-item">
                <div class="item-thumbnail">
                  <div class="item-icon bg-info">
                    <i class="ti-user mx-0"></i>
                  </div>
                </div>
                <div class="item-content">
                  <h6 class="font-weight-normal">New user registration</h6>
                  <p class="font-weight-light small-text mb-0 text-muted">
                    2 days ago
                  </p>
                </div>
              </a-->
            </div>
          </li>
          <li class="nav-item nav-profile dropdown">
            <a class="nav-link dropdown-toggle" href="" data-toggle="dropdown" id="profileDropdown">
              <img src="{{user.foto}}" alt="profile"/>
            </a>
            <div class="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
              <a class="dropdown-item">
                <i class="ti-settings text-primary"></i>
                Configurar
              </a>
              <a class="dropdown-item"  ng-click="Logout();">
                <i class="ti-power-off text-primary"></i>
                Cerrar Sesión
              </a>
            </div>
          </li>
        </ul>
        <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
          <span class="ti-view-list"></span>
        </button>
      </div>
    </nav>

<!-- partial -->
<!-- <div loading ng-show="cargando"></div> -->

    <div class="container-fluid page-body-wrapper" style="padding-top: 0px;">
      <!-- partial:partials/_sidebar.html -->
      <nav class="sidebar sidebar-offcanvas pt-5" id="sidebar" ng-show="isLogged">
        <ul class="nav">
          <!--li class="nav-item">
            <a class="nav-link" href="">
              <img id="img-avatar" name="img-avatar" class="" style="width:40%; height:40%; border-radius:50%; margin:0;" src="{{user.foto}}" alt="">
            </a>
          </li-->
          <!--li class="nav-item" ng-show="user.rol =='administrador'">
            <a class="nav-link active" href="#!/dashboard_admin">
              <i class="ti-desktop menu-icon"></i>
              <span class="menu-title">Dashboard Administrador</span>
            </a>
          </li-->
		  <li class="nav-item mt-3">
            <a class="nav-link active" href="#!/dashboard">
              <i class="ti-desktop menu-icon"></i>
              <span class="menu-title">Dashboard</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" href="#!/client">
              <i class="icon-list menu-icon"></i>
              <span class="menu-title">Clientes</span>
            </a>
          </li>	  
          <li class="nav-item">
            <a class="nav-link active" href="#!/provider">
              <i class="icon-list menu-icon"></i>
              <span class="menu-title">Proveedores</span>
            </a>
          </li>	  
          <li class="nav-item">
            <a class="nav-link active" href="#!/sendorders">
              <i class="icon-list menu-icon"></i>
              <span class="menu-title">Ordenes Enviadas</span>
            </a>
          </li>	  
		  <li class="nav-item">
            <a class="nav-link active" href="#!/procesedorders">
              <i class="icon-list menu-icon"></i>
              <span class="menu-title">Ordenes Recibidas</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" href="#!/procesedorders">
              <i class="icon-list menu-icon"></i>
              <span class="menu-title">Ordenes Terminadas</span>
            </a>
          </li>
		   <li class="nav-item">
            <a class="nav-link active" href="">
              <i class="icon-bell menu-icon"></i>  
              <span class="menu-title">Notificaciones</span>
            </a>
          </li>
	
		  <!--<li class="nav-item">
            <a class="nav-link" data-toggle="collapse" href="" data-target="#ui-plan" aria-expanded="false" aria-controls="ui-membre">
              <i class="icon-gear   menu-icon"></i>
              <span class="menu-title">Planes</span>
              <i class="menu-arrow"></i>
            </a>
            <div class="collapse" id="ui-plan">
              <ul class="nav flex-column sub-menu"  >
                <li class="nav-item"> <a class="nav-link" href="#!/resumen_planes">Resumen</a></li>
                <li class="nav-item"> <a class="nav-link" href="#!/planes">Compras</a></li>
				<li class="nav-item"> <a class="nav-link" href="#!/config_comision">% Comisiones</a></li>
				<li class="nav-item"> <a class="nav-link" href="#!/completar_planes">Completar Planes</a></li>
              </ul>
            </div>
          </li>
		  <li class="nav-item">
            <a class="nav-link" data-toggle="collapse" href="" data-target="#ui-part" aria-expanded="false" aria-controls="ui-membre">
              <i class="icon-gear   menu-icon"></i>
              <span class="menu-title">Participaciones</span>
              <i class="menu-arrow"></i>
            </a>
            <div class="collapse" id="ui-part">
              <ul class="nav flex-column sub-menu"  >
                <li class="nav-item"> <a class="nav-link" href="#!/participaciones">Resumen</a></li>
              </ul>
              <ul class="nav flex-column sub-menu"  >
                <li class="nav-item"> <a class="nav-link" href="#!/compra_participaciones">Compras</a></li>
              </ul>

			  <ul class="nav flex-column sub-menu"  >
                <li class="nav-item"> <a class="nav-link" href="#!/repartir_dividendos">Dividendos</a></li>
              </ul>
            </div>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#!/puntos" role="button">
              <i class="ti-cup  menu-icon"></i>
              <span class="menu-title">Puntos</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#!/retiros" role="button">
              <i class=" ti-wallet   menu-icon"></i>
              <span class="menu-title">Retiros </span><span ng-show="retiros_no_procesados > 0" class="float-right badge badge-danger "> {{retiros_no_procesados}} new</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#!/videos_promo" role="button">
              <i class="ti-video-clapper    menu-icon"></i>
              <span class="menu-title">Promociones</span>
            </a>
          </li>
          
		  <li class="nav-item">
            <a class="nav-link" href="https://webmail.ublof.com" target="blank" role="button">
              <i class="ti-email  menu-icon"></i>
              <span class="menu-title">Web Mail</span>
            </a>
          </li>
		  <li class="nav-item">
            <a class="nav-link" href="" role="button" ng-click="Logout();">
              <i class="ti-power-off  menu-icon"></i>
              <span class="menu-title">Cerrar Sesión</span>
            </a>
          </li> -->
          <li class="nav-item">
            <a class="nav-link" href="" role="button" ng-click="Logout();">
              <i class="ti-power-off  menu-icon"></i>
              <span class="menu-title">Cerrar Sesión</span>
            </a>
          </li>
        </ul>
      </nav>

    <!-- RENDER THE CONTENT HERE -->
    <div class="content-wrapper pt-5 mt-5" id="contenido">
        <div ng-view ></div>
	</div>
    <!-- page-body-wrapper ends -->
  </div>
</div>


  <!-- plugins:js -->
  <!-- <script src="vendors/base/vendor.bundle.base.js"></script> -->
  <!-- endinject -->
  <!-- Plugin js for this page-->
  <!-- <script src="lib/vendors/chart.js/Chart.min.js"></script> -->
  <script src="lib/js/lib/toucheffects.js"></script>
  <script src="lib/js/lib/jquery-social-share-bar.js"></script>
  <script src="lib/js/lib/jquery.orgchart.js"></script>
  <script src="lib/js/lib/jquery.validate.min.js"></script>
  <script src="lib/js/lib/popper.min.js"></script>
   <script src="lib/js/hoverable-collapse.js"></script>

  <!-- End plugin js for this page-->
  <!-- inject:js -->
  <script src="lib/js/off-canvas.js"></script>
  <script src="lib/js/hoverable-collapse.js"></script>
  <script src="lib/js/template.js"></script>
  <script src="lib/js/todolist.js"></script>
  <script src="lib/js/custom.js"></script>
  <!-- endinject -->
  <!-- Sweet Alert -->
	<script src="lib/js/lib/plugin/sweetalert/sweetalert.min.js"></script>
	<!-- MAPS -->
	<!-- <script src="https://unpkg.com/leaflet@1.5.1/dist/leaflet.js" integrity="sha512-GffPMF3RvMeYyc1LWMHtK8EbPv0iNZ8/oTtHPx9/cc2ILxQ+u905qIwdpULaqDkyBKgOaB57QTMg7ztg8Jm2Og==" crossorigin=""></script> -->

  <!-- End custom js for this page-->

  <!-- <div  class="container-fluid"> 
          <h3 style="color:gray;" class="text-center"></h3>
          <div  class="container-fluid" id="mapid" style="height: 300px; z-index: 0;"></div>
        </div> -->
</body>
</html>

