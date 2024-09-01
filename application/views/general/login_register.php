<div class="container mt-5" ng-controller="mainCtrl">
    <div class="row">
        <div class="col-lg-6">
            <!-- Button trigger modal -->
            <button class="btn btn-primary btn-lg" data-toggle="modal" data-target="#modalSponsor">
                Registro
            </button>
        </div>    
    </div>
</div>


<!-- Modal -->

  
  <!-- Modal -->
  <div class="modal fade" id="modalSponsor" >
  <div class="modal-dialog modal-lg" style="margin-right: -57px;">
    <div class="modal-content" style="border: 0px solid rgba(0,0,0,.2); background-color:transparent;">
      <!-- Modal body -->
      <div class="modal-body">
        <div class="">
                
          <div ng-hide="isLogged" class="register-modal">
            <div class="img-register-sponsor" >
                <span><img class="img-tumnbnail" style="width:60px;" src="lib/images/defaultprofile.png" alt=""></span>
            </div>
            <br>
            <div class="">
              <h5 class="  title_shadow text-light">¿Has sido referido por alguien?</h5>
              <h6 class="font-weight-light text-light">Introduzca su email aquí.</h6>
              <form class="pt-3" name="frmSponsor">
					<div class="form-group">
					  <input type="email" class="input_item form-control form-control-lg" id="reg_email" placeholder="Email" ng-model="newLogin.email">
				</div>
				<div class="mt-3">
					<button id="btnSponsor" class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" ng-disabled="frmSponsor.$invalid" ng-click="checkSponsor()">Continuar</button>
				</div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


    <div class="modal fade" id="modalRegister" >
      <div class="modal-dialog modal-lg" style="margin-right: -57px;">
        <div class="modal-content" style="border: 0px solid rgba(0,0,0,.2); background-color:transparent;">
          <!-- Modal body -->
          <div class="modal-body">
            <div class="">
                    
              <div ng-hide="isLogged" class="register-modal">
                <div class="img-register">
                    <span><img class="img-tumnbnail" style="width:60px;" src="lib/images/defaultprofile.png" alt=""></span>
                </div>
                <br>
                <div class="">
                  <h5 class="  title_shadow text-light">¿Eres nuevo aquí?</h5>
                  <h6 class="font-weight-light text-light">Registrarse es fácil. Sólo lleva unos pasos</h6>
                  <form class="pt-3" name="frmRegister">
                    <div class="form-group">
                      <input type="text" class="input_item form-control form-control-lg" id="reg_nombre" name="reg_nombre" placeholder="Nombre" ng-model="newLogin.nombre" required>
                    </div>
                    <div class="form-group">
                      <input type="text" class="input_item form-control form-control-lg" id="reg_apellidos" name="reg_apellidos" placeholder="Apellidos" ng-model="newLogin.apellidos" required>
                    </div>
                    <div class="form-group">
                      <input type="text" class="input_item form-control form-control-lg" id="reg_usuario" name="reg_usuario" placeholder="Usuario" ng-model="newLogin.nombre_usuario" required>
                    </div>
                    <div class="form-group">
                      <input type="email" class="input_item form-control form-control-lg" id="reg_email" placeholder="Email" ng-model="newLogin.email">
                    </div>
                    <div class="form-group">
                      <select class="input_item form-control form-control-lg" id="selPais" ng-model="newLogin.pais" required>
                        <option selected value="" >País</option>
                        <option ng-value="item.iso" ng-repeat="item in paises">{{item.name}}</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <select class="input_item form-control form-control-lg" id="selSexo" placeholder="Sexo" ng-model="newLogin.sexo" required>
                        <option value="" selected>Sexo</option>
                        <option value="M" >HOMBRE</option>
                        <option  value="F">MUJER</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <input type="password" class="input_item form-control form-control-lg" id="reg_password" name="reg_password" placeholder="Contraseña" ng-model="newLogin.clave" ng-minlength="6" required>
                      <div ng-if="frmRegister.reg_password.$touched ">
									    <p ng-show="frmRegister.reg_password.$error.minlength" class="alert alert-danger">La contraseña debe contener mínimo 6 caracteres.</p>
							      </div>
                <div class="form-group">
                  <input type="password" class="input_item form-control form-control-lg" id="confirm_reg_password" name="confirm_reg_password" placeholder="Confirmar Contraseña" ng-model="newLogin.confirmarclave" match-password="newLogin.clave" ng-required="true">
                  <div ng-if="frmRegister.confirm_reg_password.$touched">
                    <p ng-show="frmRegister.confirm_reg_password.$error.required" class="alert alert-danger">Repita la contraseña</p>
                    <p ng-show="frmRegister.confirm_reg_password.$error.matchPassword && !frmRegister.confirm_reg_password.$error.required" class="alert alert-danger">Las cotraseñas no coinciden.</p>
							    </div>
                  <div class="mb-4">
                    <div class="form-check">
                      <label class="form-check-label text-muted">
                      <input type="checkbox" class="form-check-input" required ng-model="acceptTerm">
                        Estoy de acuerdo con los Términos y Condiciones
                        <i class="input-helper"></i></label>
                    </div>
                  </div>
                  <div class="mb-4">
                    <no-captcha 
                      g-recaptcha-response="gRecaptchaResponse"
                      theme='light'
                      control="noCaptchaControl"
                      site-key="6LeHD8gUAAAAAP5g6pRoaSLAlc85k2yjZlIkz2vW"
                      size="normal" ng-show="!frmLogin.$invalid">
                    </no-captcha>
                  </div>
                  <div class="mt-3">
                    <button class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" ng-disabled="frmRegister.$invalid || !acceptTerm" ng-click="DoRegister(1)">REGISTRARSE</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>