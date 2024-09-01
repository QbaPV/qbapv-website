<?php
defined('BASEPATH') OR exit('No direct script access allowed');
//echo site_url();
?>

<!DOCTYPE html>
<html lang="es"  ng-app="AdminApp">
<head>
<title>Cripto-coins</title>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="description" content="Cripto Project">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" type="text/css" href="financial/css/lib/bootstrap.min.css">
<link href="financial/plugins/font-awesome-4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" type="text/css" href="financial/plugins/OwlCarousel2-2.2.1/owl.carousel.css">
<link rel="stylesheet" type="text/css" href="financial/plugins/OwlCarousel2-2.2.1/owl.theme.default.css">
<link rel="stylesheet" type="text/css" href="financial/plugins/OwlCarousel2-2.2.1/animate.css">
<link rel="stylesheet" type="text/css" href="financial/css/financial.css">
<link rel="stylesheet" type="text/css" href="financial/css/financial_responsive.css">
  <!-- CSS Files -->
<!-- <link rel="stylesheet" href="financial/css/lib/bootstrap.min.css"> -->
<link rel="stylesheet" href="financial/css/lib/angular-ui-notification.css">

<!-- AngularJS scripting -->
<script type="text/javascript" src="financial/js/lib/angular.min.js"></script>
<script type="text/javascript" src="financial/js/lib/jquery.3.2.1.min.js"></script>
<script type="text/javascript" src="financial/js/lib/angular-route.min.js"></script>
<script type="text/javascript" src="financial/js/lib/angular-sanitize.min.js"></script>
<script type="text/javascript" src="financial/js/lib/angular-animate.min.js"></script>
<script type="text/javascript" src="financial/js/lib/angular-touch.min.js"></script>
<script src="financial/js/lib/angular-ui-notification.js"></script>
<script src="financial/js/lib/angular-no-captcha.js"></script>
<script src="financial/js/lib/ui-bootstrap-tpls-3.0.5.min.js"></script>
<!-- <script src="financial/js/angular-moment.min.js"></script> -->
<!-- <script src="js/wip-image-zoom.js"></script> -->
<script src="financial/js/lib/adminDashboard.js"></script>
<script src="financial/js/lib/services.js"></script>
<script src="financial/js/lib/directives.js"></script>  

</head>
<body ng-controller="mainCtrl">

<div class="super_container">
	
	<!-- Home -->

	<div class="">
	<!-- Header -->
		<header class="header">
			<!-- Top Bar -->
			<div class="top_bar" style="display:none;">
				<div class="container">
					<div class="row">
						<div class="col">
							<div class="top_bar_container d-flex flex-row align-items-center justify-content-start">
								<div class="logo_container">
									<div class="logo">
										<a href="#">
											<div class="logo_line_1"><span>Cry</span>pto</div>
											<div class="logo_line_2">coins</div>
											<div class="logo_img"><img src="financial/images/logo.png" alt=""></div>
										</a>
									</div>
								</div>
								<div class="top_bar_content ml-auto">
								</div>
								<div class="burger">
									<i class="fa fa-bars" aria-hidden="true"></i>
								</div>
							</div>
						</div>
					</div>
				</div>		
			</div>

			<!-- sidebar -->
			<!-- Main Menu -->
			<div class="main_menu">
				<div class="container">
					<div class="row">
						<div class="col">
							<div class="main_menu_container d-flex flex-row align-items-center justify-content-start">
								<div class="logo_container" style="margin-right:20px;">
									<div class="logo">
										<a href="#">
											<div class="logo_line_1"><span>Cry</span>pto</div>
											<div class="logo_line_2">coins</div>
											<div class="logo_img"><img src="financial/images/logo.png" alt=""></div>
										</a>
									</div>
								</div>
								
								<div class="main_menu_content">
									<ul class="main_menu_list">
										<li class="active hassubs">
											<a href="#">Inicio
												<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
													 width="9px" height="5px" viewBox="0 0 9 5" enable-background="new 0 0 9 5" xml:space="preserve">
													<g>
														<polyline class="arrow_d" fill="none" stroke="#FFFFFF" stroke-miterlimit="10" points="0.022,-0.178 4.5,4.331 9.091,-0.275 	"/>
													</g>
												</svg>
											</a>
										</li>
										<li><a href="about.html">Sobre nosotros
											<svg version="1.1" id="Layer_4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
												 width="9px" height="5px" viewBox="0 0 9 5" enable-background="new 0 0 9 5" xml:space="preserve">
												<g>
													<polyline class="arrow_d" fill="none" stroke="#FFFFFF" stroke-miterlimit="10" points="0.022,-0.178 4.5,4.331 9.091,-0.275 	"/>
												</g>
											</svg>
										</a></li>
										<li><a href="#">Inicio Sesión / Registrarse
											<svg version="1.1" id="Layer_15" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
												 width="9px" height="5px" viewBox="0 0 9 5" enable-background="new 0 0 9 5" xml:space="preserve">
												<g>
													<polyline class="arrow_d" fill="none" stroke="#FFFFFF" stroke-miterlimit="10" points="0.022,-0.178 4.5,4.331 9.091,-0.275 	"/>
												</g>
											</svg>
										</a></li>
										<li><a href="#">contacto
											<svg version="1.1" id="Layer_16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
												 width="9px" height="5px" viewBox="0 0 9 5" enable-background="new 0 0 9 5" xml:space="preserve">
												<g>
													<polyline class="arrow_d" fill="none" stroke="#FFFFFF" stroke-miterlimit="10" points="0.022,-0.178 4.5,4.331 9.091,-0.275 	"/>
												</g>
											</svg>
										</a></li>
										<li><a href="#">Idioma
											<svg version="1.1" id="Layer_16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
												 width="9px" height="5px" viewBox="0 0 9 5" enable-background="new 0 0 9 5" xml:space="preserve">
												<g>
													<polyline class="arrow_d" fill="none" stroke="#FFFFFF" stroke-miterlimit="10" points="0.022,-0.178 4.5,4.331 9.091,-0.275 	"/>
												</g>
											</svg>
										</a></li>
									</ul>
								</div>
								<div class="main_menu_contact ml-auto">
									<div class="main_menu_search">
										<div class="main_menu_search_button">
											<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 512 512" enable-background="new 0 0 512 512" width="15px" height="15px">
												<g>
												<path class="mag_path" d="M495,466.2L377.2,348.4c29.2-35.6,46.8-81.2,46.8-130.9C424,103.5,331.5,11,217.5,11C103.4,11,11,103.5,11,217.5   S103.4,424,217.5,424c49.7,0,95.2-17.5,130.8-46.7L466.1,495c8,8,20.9,8,28.9,0C503,487.1,503,474.1,495,466.2z M217.5,382.9   C126.2,382.9,52,308.7,52,217.5S126.2,52,217.5,52C308.7,52,383,126.3,383,217.5S308.7,382.9,217.5,382.9z" fill="#f4f4f8"/>
												</g>
											</svg>
										</div>
										<div class="main_menu_search_content">
											<form action="#">
												<input class="form-control search_input input-lg" type="search" placeholder="buscar" required="required">
											</form>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="menu">
				<div class="menu_register_login">
					<div class="container">
						<div class="row">
							<div class="col">
								<div class="menu_register_login_content d-flex flex-row align-items-center justify-content-end">
									<div class="register"><a href="#">register</a></div>
									<div class="login"><a href="#">login</a></div>
								</div>
							</div>
						</div>
					</div>
						
				</div>
				<ul class="menu_list">
					<li class="menu_item">
						<div class="container">
							<div class="row">
								<div class="col">
									<a href="#">home</a>
								</div>
							</div>
						</div>
					</li>
					<li class="menu_item">
						<div class="container">
							<div class="row">
								<div class="col">
									<a href="about.html">about us</a>
								</div>
							</div>
						</div>
					</li>
					<li class="menu_item">
						<div class="container">
							<div class="row">
								<div class="col">
									<a href="listings.html">services</a>
								</div>
							</div>
						</div>
					</li>
					<li class="menu_item">
						<div class="container">
							<div class="row">
								<div class="col">
									<a href="news.html">portfolio</a>
								</div>
							</div>
						</div>
					</li>
					<li class="menu_item">
						<div class="container">
							<div class="row">
								<div class="col">
									<a href="contact.html">blog</a>
								</div>
							</div>
						</div>
					</li>
					<li class="menu_item">
						<div class="container">
							<div class="row">
								<div class="col">
									<a href="contact.html">contact</a>
								</div>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</header>
	</div>
		</header>
	</div>
	
    <div class="wrapper"style="padding-top:80px" ng-show="islogged">
        <!-- Sidebar  -->
        <nav id="sidebar" style="height:100%;" class="active">
            <ul class="list-unstyled components">
			<li class="" >
                    <a href="">
                        <i class="menu-span-i icon-home"></i>
                        Dashboard
                    </a>
				</li>
				<li>
                    <a href="" data-target="#pageBonus" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">
                        <i class="menu-span-i  icon-money"></i>
                        Referidos
                    </a>
                    <ul class="collapse list-unstyled" id="pageBonus">
                        <li>
                            <a href="" ng-click="NoDisponible()"> 
                                <i class="menu-span-i icon-file-powerpoint-o"></i>
                               Todos
                            </a>
                        </li>
                        <li>
                            <a href="" ng-click="NoDisponible()">
                                <i class="menu-span-i icon-bold"></i>
                                Nuevo Miembro
                            </a>
						</li>
						<li>
                            <a href="" ng-click="NoDisponible()">
                                <i class="menu-span-i icon-bold"></i>
                                Explorar la Red
                            </a>
						</li>
						<li>
                            <a href="" ng-click="NoDisponible()">
                                <i class="menu-span-i icon-bold"></i>
                                Patrocinados por mí
                            </a>
                        </li>
                    </ul>
				</li>
				<li>
                    <a href="" data-target="#negocio" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">
                        <i class="menu-span-i  icon-money"></i>
                        Negocio
                    </a>
                    <ul class="collapse list-unstyled" id="negocio">
                        <li>
                            <a href="" ng-click="NoDisponible()"> 
                                <i class="menu-span-i icon-file-powerpoint-o"></i>
                               Planes
                            </a>
                        </li>
                        <li>
                            <a href="" ng-click="NoDisponible()">
                                <i class="menu-span-i icon-bold"></i>
                                Participaciones
                            </a>
						</li>
						<li>
                            <a href="" ng-click="NoDisponible()">
                                <i class="menu-span-i icon-bold"></i>
                                Croudfunding
                            </a>
						</li>
                    </ul>
				</li>
				<li>
                    <a href="" data-target="#finanzas" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">
                        <i class="menu-span-i  icon-money"></i>
                        Finanzas
                    </a>
                    <ul class="collapse list-unstyled" id="finanzas">
                        <li>
                            <a href="" ng-click="NoDisponible()"> 
                                <i class="menu-span-i icon-file-powerpoint-o"></i>
                               Balance
                            </a>
                        </li>
                        <li>
                            <a href="" ng-click="NoDisponible()">
                                <i class="menu-span-i icon-bold"></i>
                                Historial
                            </a>
						</li>
						<li>
                            <a href="" ng-click="NoDisponible()">
                                <i class="menu-span-i icon-bold"></i>
                                Retiros
                            </a>
						</li>
                    </ul>
                </li>
				<li>
                    <a href="" data-target="#tools" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">
                        <i class="menu-span-i  icon-money"></i>
                        Herramientas
                    </a>
                    <ul class="collapse list-unstyled" id="tools">
                        <li>
                            <a href="" ng-click="NoDisponible()"> 
                                <i class="menu-span-i icon-file-powerpoint-o"></i>
                               Videos
                            </a>
                        </li>
                        <li>
                            <a href="" ng-click="NoDisponible()">
                                <i class="menu-span-i icon-bold"></i>
                                Presentaciones
                            </a>
						</li>
						<li>
                            <a href="" ng-click="NoDisponible()">
                                <i class="menu-span-i icon-bold"></i>
                                Documentos
                            </a>
						</li>
                    </ul>
                </li>
				
				<li class="" >
                    <a href="">
                        <i class="menu-span-i icon-home"></i>
                        Reportes
                    </a>
                </li>
                <li>
                    <a href="" >
                        <i class="menu-span-i icon-wrench"></i>
                        Soporte Técnico
                    </a>
                </li>
                <li>
                    <a href="" ng-click="logout();">
                        <i class="menu-span-i  icon-power-off"></i>
                        F.A.Q.S
                    </a>
				</li>
				<li>
                    <a href="" ng-click="logout();">
                        <i class="menu-span-i  icon-power-off"></i>
                        Salir
                    </a>
                </li>
            </ul>
        </nav>
	</div>
     <!-- RENDER THE CONTENT HERE -->
          <div class="container-fluid" ng-view  style="padding:175px;" ></div>
</div>

	<!-- Footer -->
	<footer class="footer">
		<div class="container">
			<div class="row">

				<!-- Footer Column -->
				<div class="col-lg-3 footer_col">
					<div class="footer_about">
						<div class="logo_container footer_logo">
							<div class="logo">
								<a href="#">
									<div class="logo_line_1"><span>Cry</span>pto</div>
									<div class="logo_line_2">coin</div>
									<div class="logo_img"><img src="financial/images/logo.png" alt=""></div>
								</a>
							</div>
						</div>
						<!-- <p class="footer_about_text">jdfkds f k ksfjsdkjskf sk jfskdfksdfksd fksdjf;sldkfs;fj;ak;f jaf;; jalkhfasjlhfla hfa .</p> -->
					</div>
				</div>

				<!-- Footer Column -->
				<div class="col-lg-3 ">
					<div class="footer_links">
						<div class="footer_title">Información</div>
						<ul>
							<li><a href="#">¿Cómo ser miembro?</a></li>
							<li><a href="#">Ventajas de ser miembro</a></li>
							<li><a href="#">Comprar nuestros productos</a></li>
						</ul>
					</div>
				</div>
				<div class="col-lg-3 footer_col">
					<div class="footer_links">
						<div class="footer_title">Contacto</div>
						<ul>
							<li><a href="#">Contáctenos</a></li>
							<li><a href="#">Blog</a></li>
						</ul>
					</div>
				</div>
				<div class="col-lg-3 footer_col">
					<div class="footer_links">
						<div class="footer_title">Explorar</div>
						<ul>
							<li><a href="#">Aviso Legal y Condiciones</a></li>
							<li><a href="#">Política de Cookies</a></li>
						</ul>
					</div>
				</div>

				<!-- Footer Column -->
				<!-- <div class="col-lg-6 footer_col">
					<div class="footer_newsletter">
						<div class="footer_title">Suscribete a nuestro newsletter</div>
						<form action="#" class="footer_newsletter_form">
							<input type="email" class="footer_newsletter_input" placeholder="tu E-mail" required="required">
							<button class="footer_newsletter_button" type="submit">suscribirse</button>
						</form>
						<div class="footer_newsletter_text">jkfslkfjsdfjdsfkjdsl fds sklfjsdklf jdsklf jslkf sdlkfsdlkf jdskfjsdklfj slkdfjdsklfj dsl.</div>
						<div class="footer_social">
							<ul>
								<li><a href="#"><i class="fa fa-google-plus" aria-hidden="true"></i></a></li>
								<li><a href="#"><i class="fa fa-pinterest" aria-hidden="true"></i></a></li>
								<li><a href="#"><i class="fa fa-reddit-alien" aria-hidden="true"></i></a></li>
								<li><a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
							</ul>
						</div>
					</div>
				</div> -->

			</div>
		</div>

<!-- <script src="financial/js/lib/jquery-3.3.1.min.js"></script> -->
<script src="financial/js/lib/popper.min.js"></script>
<script src="financial/js/lib/bootstrap.min.js"></script>
<script src="financial/plugins/OwlCarousel2-2.2.1/owl.carousel.js"></script>
<script src="financial/plugins/easing/easing.js"></script>
<script src="financial/plugins/parallax-js-master/parallax.min.js"></script>
<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyCIwF204lFZg1y4kPSIhKaHEXMLYxxuMhA"></script>
<script src="financial/js/financial_custom.js"></script>
</body>
</html>