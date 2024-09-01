<!-- <div loading ng-show="cargando"></div>  -->
<div ng-controller="mainCtrl" class="container-fluid">
<div ng-hide="isLogged">
		<div class=" d-flex align-items-center auth px-0">
        <div class="row w-100 mx-0">
          <div class="col-lg-4 mx-auto">
            <div class="auth-form-light text-left py-5 px-4 px-sm-5">
              <div class="brand-logo">
                <img class="img" src="lib/images/logo.png" alt="logo">
              </div>
              <h4>Panel Administrativo</h4>
              <h6 class="font-weight-light">Inicie sesión para continuar.</h6>
              <form class="pt-3">
                <div class="form-group">
                  <input type="text" name="login" class="form-control form-control-lg" placeholder="Usuario o email" ng-model="Login.usuario" required>
                </div>
                <div class="form-group">
                  <input type="password" name="password" class="form-control form-control-lg" placeholder="Contraseña" ng-model="Login.password" required>	
				</div>
                <!--div class="my-2 d-flex justify-content-between align-items-center">
                  <div class="form-check">
                    <label class="form-check-label text-muted">
                      <input type="checkbox" class="form-check-input">
                      Mantenme logueado
                    </label>
                  </div>
                  <a href="#" class="auth-link text-black">Olvidaste tu clave</a>
                </div-->
                <div class="mt-3">
                  <button class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" ng-click="DoLogin(Login)">ENTRAR</button>
                </div>
                
              </form>
            </div>
          </div>
        </div>
      </div>
	</div>	
</div>

</div>