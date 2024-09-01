<div class="container">
	<div class="row">
		<div class="col-lg-12">
            <div class="card">
				<div class="card-body">
				<h4 class="card-title">Planes Comprados</h4>
				<div class="table-responsive">
					<table class="table table-striped table-condensed">
					<thead>
					<tr>
							<td colspan="2">
							  <small ng-show="ListUser.length > itemsPerPage">
								  <ul  class="d-flex justify-content-center" uib-pagination total-items="ListUser.length" items-per-page="itemsPerPage" ng-model="currentPage" max-size="5" boundary-link-numbers="3"></ul>
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
							Plan
						</th>
						<th class="text-right">
							Fecha Compra
						</th>
						<th class="text-right">
							Vencido
						</th>
						<th class="text-right">
							Balance Actual
						</th>
						<th class="text-right">
							Balance Final
						</th>
						<th class="text-right">
							% <?php echo utf8_encode('Ejecución'); ?>
						</th>
						<th class="text-right">
							Completar
						</th>
						</tr>
					</thead>
					<tbody>
						<tr ng-repeat="item in ListUser = (UsuariosPlan | filter:buscar:strict) | limitTo:itemsPerPage:itemsPerPage*(currentPage-1) ">
							<td>
								{{item.Nombre}} {{item.Apellidos}}
							</td>
							<td class="text-center">
								<div class="badge badge-primary rounded">
									{{item.Plan}}	
								</div>
							</td>
							<td class="text-center">
								{{item.fecha_compra}}	
							</td>
							<td class="text-center" >
								<label ng-show="item.vencido == 1">SI</label>
								<label ng-show="item.vencido == 0">NO</label>
							</td>
							<td class="text-right">
								{{item.monto * 1 |number:9}}<i class="fab fa-ethereum"></i>	
							</td>
							<td class="text-right">
								{{((item.porciento/100) * item.Precio) | number: 9}}<i class="fab fa-ethereum"></i>	
							</td>
							<td class="text-right">
								{{((item.monto * 1) / ((item.porciento/100) * item.Precio))* 100 | number: 2}}	%
							</td>
							<td	class="text-right">
								<button class="btn btn-xs btn-outline-primary" title="Seleccionar Plan para completar"ng-click="SeleccionarPlanaCompletar(item);">
									<i class="ti-money btn-icon-prepend"></i>                                                    
								</button>

							</td>
						</tr>
					</tbody>
					</table>
				</div>
                </div>
              </div>
        </div>
