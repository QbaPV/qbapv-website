
<div loading ng-show="cargando"></div>

<div ng-show="!cargando">
<div class="site-wrap container">
    <div class="site-section">
      <div class="container">
        <div class="row">
          <div class="col-md-12 text-center" ng-show="entregado">
            <span class="ti-check-box display-1 text-success"></span>
            <h2 class="display-3 text-black">Muchas Gracias!</h2>
            <p class="lead mb-5">Tu cuenta se ha creado con éxito. Se ha enviado a su correo un mensaje para activar la cuenta.</p>
            <p><a href="#!/home" class="btn btn-md height-auto px-4 py-3 btn-primary">Volver al Inicio</a></p>
          </div>
          <div class="col-md-12 text-center" ng-show="!entregado">
            <span class="ti-alert display-1 text-success"></span>
            <h2 class="display-3 text-black">Lo sentimos!</h2>
            <p class="lead mb-5">El mensaje de verificación no pudo ser enviado.</p>
            <p class="lead mb-5">Contacte con soporte técnico.</p>
            <p><a href="#!/home" class="btn btn-md height-auto px-4 py-3 btn-primary">Volver al Inicio</a></p>
          </div>
        </div>
      </div>
    </div>

 
</div>

<?php
//phpinfo();
?>