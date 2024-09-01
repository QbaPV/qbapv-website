<div class="container">
	<div class="row">
        <div class="col-lg-12 grid-margin stretch-card">
            <div class="card">
                <div class="card-body">
                  <h4 class="card-title">Configurar grupos de comisiones</h4>
				  <button class="btn btn-primary btn-sm" data-toggle="modal" data-target="#crearGrupo">Crear Grupo</button>
                </div>
            </div>
        </div>
    </div>
	
	<div class="row">
        <div class="col-lg-4 grid-margin stretch-card" ng-repeat="g in grupos">
            <div class="card">
                <div class="card-header">
					<div class="form-check">
                            <!--input type="radio" class="form-check-input" name="optionsRadios" id="optionsRadios1" value="" ng-class="'selected':g.seleccionado"-->
                            <button class="btn btn-outline-primary " ng-show="g.seleccionado==0" ng-click="UsarGrupo(g)">Usar </button>
                            <!--button class="btn btn-outline-primary " ng-show="g.seleccionado==1" ng-disabled="g.seleccionado==1">En Uso </button-->
							<button type="button" class="btn btn-primary btn-icon-text" ng-show="g.seleccionado==1" ng-disabled="g.seleccionado==1">
								En Uso
								<i class="ti-check btn-icon-append"></i>                                                                              
							</button>
							<button type="button" class="btn btn-outline-warning btn-icon-text" ng-click="ResetGrupo(g);">
								Reiniciar                                                           
							</button>
							<button type="button" class="btn btn-outline-warning btn-icon-text" ng-show="g.seleccionado==0" ng-click="EliminarGrupo(g);">
								Quitar                                                           
							</button>							
                        </div>
					<h4 class="card-title text-secondary"><b>Introduce valores al Grupo {{g.nombre}}%<b>
					</h4>
					<form class="form-inline" id="formPorciento" name="formPorciento" role='form'>						
						<input type="hidden" id="id"  >
						<input type="text" class="form-control mb-2 mr-sm-2" id="valor{{g.grupro_porciento_id}}" placeholder="Agregar. Ej: 0.21" ng-model="p.valor">
						<button type="submit" class="btn btn-outline-primary mb-2" ng-click="GuardarPorciento(g);"><i class="ti-save"></i></button>
					</form>
				</div>
				<div class="card-body">
					<div class="row">
						<div class="col-lg-4" ng-repeat="p in porcientos | filter:p.grupo_porciento_id=g.grupo_porciento_id | orderBy:'valor'">						
							<div class="form-check">
								<!-- label class="form-check-label">{{p.valor}}
								< input type="radio" class="form-check-input" name="r{{p.porciento_comision_id}}" id="r{{p.porciento_comision_id}}" ng-value="p.valor" -->								 
								<button type="button" class="btn btn-outline-primary btn-xs" ng-show="p.usado == 0" ng-click="EliminarValor(p);"><i class="ti-trash">{{p.valor}}%</i></button>
								<button type="button" class="btn btn-success btn-xs" ng-show="p.usado == 1" ng-click="EliminarValor(p);"><i class="ti-trash">{{p.valor}}%</i></button>
								<i class="input-helper"></i></label>
							</div>
						</div>
					</div>
                </div>

            </div>
        </div>
    </div>
</div>


<!--  Modal crear Grupo -->
<div class="modal fade" id="crearGrupo">
    <div class="modal-dialog modal-md">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header bg-primary">
          <h5 class="modal-title text-light">Nuevo Grupo de Comisiones</h5>
          <button type="button" class="close" data-dismiss="modal" >&times;</button>
        </div>
        <!-- Modal body -->
        <div class="modal-body">
          <div class="">
          <div class="container">
            <div class="row">
              <div class="col-md-12"> 
				<form class="form" name="crearGrupoForm" role="form">
                    <div class="form-group">
                      <label for="grupo">Identificador numérico del Grupo</label>
                      <input type="text" class="form-control" id="grupo" placeholder="Ej: 10" required ng-model="grupo.nombre">
                    </div>
                    <button type="submit" class="btn btn-primary ml-2 float-right" ng-click="Guardar();" >Guardar</button>
                    <button class="btn btn-light float-right" data-dismiss="modal">Cancelar</button>
                  </form>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
