<div class="container mt-5">
	<div class="row">
		<div class="col-lg-12 text-center">
			<div class="features_title_container">
				<div class="features_title title_shadow text-light">Contáctenos</div>
			</div>		
		</div>
		<div class="col-lg-8 mx-auto">
				<div class="card-backoffice p-3 " style="border-radius: 20px;">
					<div class="text-center">
					<h3 class="contact_header_text"><i class="icon-clock-o contact_clock contact_icon_size"></i>
						Horario de Atención al cliente</h3>
					</div>
					<div class="text-center ">
						<h4 class="text_bold">En ublof hablamos Inglés y Español</h4>
					</div>
					<div class="text-center pt-3">
						<h4  class="text_bold">Nuestro equipo de atención al cliente está disponible 24/5 </h4>
						<h4  class="text_bold">desde Lunes 10:00 UTC a Viernes 22:00 UTC </h4>
					</div>
					<div class="text-center pt-3">
					</div>
				</div>		
		</div>
	</div>
	<div class="row">
		<div class="col-lg-2"></div>
		<div class="col-lg-4">
				<div class="card-backoffice p-3 " style="border-radius: 20px;">
					<div class="text-center">
						<span>
							<i class="icon-live_help  contact_icon_size"></i>
						</span>
						<div>Atención On-Line</div>
						<div class="m-2"><button class="btn btn-primary btn-sm biselado biselado_primary"><i class="ti-comments"></i> CHAT</button></div>
					</div>
					<div class="text-center pt-3">
					</div>
				</div>		
		</div>
		<div class="col-lg-4">
				<div class="card-backoffice p-3 " style="border-radius: 20px;">
					<div class="text-center">
						<span>
							<i class="contact_icon_size">@</i>
						</span>
						<div>Escribir a Atención al cliente</div>
						<div class="m-2">
							<!-- <a role="button" class="btn biselado biselado_primary" data-toggle="collapse" data-target="#form_contacto" aria-expanded="true" aria-controls="form_contacto">
								<i class="icon-email">Envíenos un mensaje</i>
							</a>  -->
							<div class="m-2"><button class="btn btn-primary btn-sm biselado biselado_primary" data-toggle="collapse" data-target="#form_contacto" aria-expanded="true" aria-controls="form_contacto"><i class="icon-envelope-o"></i> Email</button></div>
						</div>
					</div>
					<div class="text-center pt-3">
					</div>
				</div>		
		</div>
	</div>	
	<div class="row">
		<div class="col-lg-2">
		</div>
		<div class="col-lg-8 contact_form_container collapse" id="form_contacto">
			<form name="frm_contacto" id="frm_contacto" class="contact_form">
				<div class="row">
					<div class="col-md-12">
					<input type="text" class="input_item" placeholder="Tu Nombre" required>
					</div>
					<div class="col-md-12">
									<input type="email" class="form-control input_item" placeholder="Tu Email" required>
					</div>
					<div class="col-md-12">
									<input type="text" class="input_item" placeholder="Tu Teléfono">
					</div>
					<div class="col-md-12">
						<textarea rows="4" cols="50" id="contact_message" class="input_item contact_message" name="message" placeholder="Tu Mensaje" required></textarea>
					</div>
					<div class="col-lg-4"  >
						<no-captcha 
							g-recaptcha-response="gRecaptchaResponse"
							theme='light'
							control="noCaptchaControl"
							site-key="6LeHD8gUAAAAAP5g6pRoaSLAlc85k2yjZlIkz2vW"
							size="normal" 
							ng-show="!frmLogin.$invalid">
						</no-captcha>
					</div>
					<div class="col-md-5 mx-auto p-3" >
						<button ng-disabled="!gRecaptchaResponse"  id="contact_btn" type="button" class="btn btn-block btn-primary biselado biselado_primary">Enviar</button>
					</div>
				</div>
			</form>
		</div>
	</div>	
</div>
		
		