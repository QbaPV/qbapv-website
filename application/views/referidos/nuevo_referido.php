<div loading ng-show="cargando"></div>
<div class="container-fluid" ng-controller="NuevoReferidoCtrl">
  <div class="row mb-4">
    <div class="col-lg-4 mx-auto">
      <div class="card-backoffice text-center" tooltip-placement="top" uib-tooltip="Podrás registrar tus propios referidos"> 
        <font color="">REGISTRAR MIS REFERIDOS</font> 
      </div>
    </div>
  </div>
  <div>
    <div class="row">
            <div class="col-lg-6 col-xl-5 mx-auto card-backoffice p-4">
                    <div class="">
                    <div class="data-backoffice">
                        <h4>Registra tus referidos desde aquí!!!</h4>   
                        <h6 class="font-weight-light">Siempre su membesía será FREE</h6>
                    </div>
                       
                        <!-- <div class="brand-logo">
                            <img class="img-thumbnail" src="lib/images/about-img.png" alt="">
                        </div> -->
                        <form class="pt-3" name="frmRegister">
                            <div class="form-group">
                                <input type="text" class="form-control form-control-lg " id="reg_nombre" name="reg_nombre" placeholder="Nombre" ng-model="newLogin.nombre" required>
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control form-control-lg" id="reg_apellidos" name="reg_apellidos" placeholder="Apellidos" ng-model="newLogin.apellidos" required>
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control form-control-lg" id="reg_usuario" name="reg_usuario" placeholder="Usuario" ng-model="newLogin.nombre_usuario" required>
                            </div>
                            <div class="form-group">
                                <input type="email" class="form-control form-control-lg" id="reg_email" placeholder="Email" ng-model="newLogin.email">
                            </div>
                            <div class="form-group">
                                <select class="form-control form-control-lg" id="selPais" ng-model="newLogin.pais">
                                    <option selected value="" >País</option>
                                    <option ng-value="item.iso" ng-repeat="item in paises">{{item.name}}</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <select class="form-control form-control-lg" id="selSexo" ng-model="newLogin.sexo" required>
                                    <option selected value="" >Sexo</option>
                                    <option  value="M" > HOMBRE</option>
                                    <option  value="F" >MUJER</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <input type="password" class="form-control form-control-lg" id="reg_password" name="reg_password" placeholder="Contraseña" ng-model="newLogin.clave" ng-minlength="6" required>
                                <div ng-if="frmRegister.reg_password.$touched ">
									<p ng-show="frmRegister.reg_password.$error.minlength" class="alert alert-danger">La contraseña debe contener mínimo 6 caracteres.</p>
							</div>
                            </div>
                             <div class="form-group">
                                <input type="password" class="form-control form-control-lg" id="confirm_reg_password" name="confirm_reg_password" placeholder="Confirmar Contraseña" ng-model="newLogin.confirmarclave" match-password="newLogin.clave" ng-required="true">
                                <div ng-if="frmRegister.confirm_reg_password.$touched">
                                    <p ng-show="frmRegister.confirm_reg_password.$error.required" class="alert alert-danger">Repita la contraseña</p>
                                    <p ng-show="frmRegister.confirm_reg_password.$error.matchPassword && !frmRegister.confirm_reg_password.$error.required" class="alert alert-danger">Las cotraseñas no coinciden.</p>
							    </div>
                            </div>
                            <div class="mb-4">
                                <div class="form-check">
                                    <label class="form-check-label text-muted">
                                    <input type="checkbox" class="form-check-input" required ng-model="acceptTerm">
                                    Estoy de acuerdo con los Términos y Condiciones
                                    <i class="input-helper"></i></label>
                                </div>
                            </div>
                            <div class="mt-3">
                                <button class="btn btn-block biselado biselado_primary" ng-disabled="frmRegister.$invalid || !acceptTerm" ng-click="DoRegister(user.usuario_id)">REGISTRAR</button>
                            </div>
                            <!-- <div class="text-center mt-4 font-weight-light">
                            Already have an account? <a href="login.html" class="text-primary">Login</a>
                            </div> -->
                        </form>
                    </div>
            </div>
            <!-- <div class="col-lg-6 col-xl-7 ">
                <div class="brand-logo">
                    <img class="card-image" src="lib/images/login-bg.jpg" alt="">
                </div>
            </div> -->
    </div>
</div>