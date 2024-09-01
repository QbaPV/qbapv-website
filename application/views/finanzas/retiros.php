<div class="">
	<div class="row">
		<div class="col-lg-12">
            <div class="card">
				<div class="card-body">
				<h4 class="card-title">Retiros</h4>
				<div class="table-responsive">
					<table class="table table-striped table-condensed">
					<thead>
					<tr>
							<td colspan="6">
							  <small ng-show="Retiros.length > itemsPerPage">
								  <ul  class="d-flex justify-content-center" uib-pagination total-items="Retiros.length" items-per-page="itemsPerPage" ng-model="currentPage" max-size="5" boundary-link-numbers="3"></ul>
							  </small>
							</td>
							<td colspan="3">
							  <div class="col-lg-12 col-xs-10 form-group" style="font-size:10pt;">
								<input type="search" name="buscador" id="buscador" class="form-control" placeholder="buscar" ng-model="buscar">
							  </div>
							</td>
						</tr>
						<tr>
						<th>
							Nombre y Apellidos
						</th>
						<th class="text-center">
							Fecha
						</th>
						<th class="text-right">
							Monto
						</th>
						<th class="text-center">
							Moneda
						</th>
						<th class="text-center">
							Balance
						</th>
						<th class="text-right">
							Tasa
						</th>
						<th class="text-center">
							Estado
						</th>
						<th class="text-center">
							Dirección
						</th>
						<th class="text-center">
							Opciones
						</th>
						</tr>
					</thead>
					<tbody>
						<tr ng-repeat="item in Retiros = (UsuariosRetiros | filter:buscar:strict) | limitTo:itemsPerPage:itemsPerPage*(currentPage-1) ">
						<td>
						{{item.nombre}} {{item.apellidos}}
						</td>
						<td class="text-center">
							{{item.fecha}}	
						</td>
						<td class="text-right">
							{{item.monto}}	
						</td>
						<td class="text-center">
							{{item.moneda}}	
						</td>
						<td class="text-center">
							{{item.balance}}	
						</td>
						<td class="text-center">
							{{item.interes}}	
						</td>
						<td class="text-center">
							<b>{{item.estado}}</b>	
						</td>
						<td class="text-center">
							{{item.direccion}}	
						</td>
						<td class="text-center">
							<button class="btn btn-xs btn-primary" ng-show="item.estado == 'EN PROCESO'" ng-click="SetEstado(item, 'APROBADO')"><i class="ti-check">Aprobar</i></button>	
							<button class="btn btn-xs btn-warning" ng-show="item.estado == 'EN PROCESO'" ng-click="SetEstado(item, 'RECHAZADO')"><i class="ti-close">Rechazar</i></button>
							<button class="btn btn-xs btn-danger" ng-show="item.estado == 'RECHAZADO'" ><i class="ti-close"></i></button>
							<button class="btn btn-xs btn-success" ng-show="item.estado == 'APROBADO'" ><i class="ti-check"></i></button>
						</td>
						</tr>
					</tbody>
					</table>
				</div>
                </div>
              </div>
        </div>
	</div>
	
</div>