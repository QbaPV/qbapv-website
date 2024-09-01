<div loading ng-show="cargando"></div>

<div ng-show="!cargando">
<div class="site-wrap container">
    <div class="site-section">
      <div class="container">
        <div class="row mt-5 mb-5">
          <div class="col-md-6 col-xl-5 text-center mx-auto card-backoffice">
            <span class="ti-check-box display-1 text-success"></span>
            <h2 class="display-3 text-black">Bienvenido! {{UserData.nombre}}</h2>
            <p class="lead mb-5 text-secondary">Su cuenta ha sido activada correctamente.</p>
            <p><a href="" data-toggle="modal" data-target="#modalLogin" class="btn btn-md height-auto px-4 py-3 btn-primary">Inicie Sesión para comenzar</a></p>
          </div>
        </div>
      </div>
    </div>

 
</div>