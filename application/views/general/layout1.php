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
  <title>Panel de Administración - Ublof</title>

  <!-- plugins:css -->
  <link rel="stylesheet" href="lib/vendors/ti-icons/css/themify-icons.css">
  <link rel="stylesheet" href="lib/vendors/base/vendor.bundle.base.css">
  <link rel="stylesheet" href="lib/fonts/fonts.css">

  <!-- CSS Files -->
	<link rel="stylesheet" href="lib/css/lib/bootstrap.min.css">
	<link rel="stylesheet" href="lib/css/lib/angular-ui-notification.css">
	<!-- <link rel="stylesheet" href="lib/css/lib/owl.carousel.min.css"> -->

  <link rel="stylesheet" href="lib/css/lib/jquery-social-share-bar.css">
  <link rel="stylesheet" href="lib/css/lib/jquery.orgchart.css">

  <link rel="stylesheet" href="lib/css/lib/countrySelect.css">

  <link rel="stylesheet" href="lib/fonts/icomoon/style.css">

  <!-- inject:css -->
  <link rel="stylesheet" href="lib/css/style.css">
  <link rel="stylesheet" href="lib/css/financial.css">
  <link rel="stylesheet" href="li b/css/financial_responsive.css">
  <link rel="stylesheet" href="lib/css/about.css">
  <link rel="stylesheet" href="lib/css/contact.css">
  <link rel="stylesheet" href="lib/css/services.css">
  <link rel="stylesheet" href="lib/css/services_responsive.css">
  <link rel="stylesheet" href="lib/css/contact_responsive.css">
  <link rel="stylesheet" href="lib/css/about_responsive.css">
  <!-- <link rel="stylesheet" href="lib/css/exagono.css"> -->
  <link rel="stylesheet" href="lib/css/exagono1.css">
		<link rel="stylesheet" type="text/css" href="lib/css/component.css" />
 
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
  <script src="lib/js/lib/ngclipboard.min.js"></script>
	<script src="lib/js/lib/jquery.3.2.1.min.js"></script>
	<script src="lib/js/lib/bootstrap.min.js"></script>
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
</head>

<body  ng-controller="mainCtrl">	
    <!-- RENDER THE CONTENT HERE -->
	<div class="content-wrapper" id="contenido">
        <div style="background: transparent;">
          <div ng-view ></div>
        </div>
    </div>
</body>
