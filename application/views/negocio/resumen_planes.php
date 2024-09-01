<div class="container">
	<div class="row">
		<div class="col-lg-9 mx-auto">
            <div class="card">
				<div class="card-body">
				<h4 class="card-title">Resumen Planes</h4>
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
							Planes
						</th>
						
						<th class="text-right">
							Historial
						</th>
						
						</tr>
					</thead>
					<tbody>
						<tr ng-repeat="item in ListUser = (PlanesAgrupados | filter:buscar:strict) | limitTo:itemsPerPage:itemsPerPage*(currentPage-1) ">
							<td>
								{{item.Nombre}} {{item.Apellidos}}
							</td>
							<td class="text-center">
								<div class="badge badge-primary rounded">
									{{item.Planes}}	
								</div>
							</td>
							<td class="text-right">
								<button class="btn btn-primary btn-xs float-right" data-target="#histModal{{item.usuario_id}}" data-toggle="modal" ng-click="CargarPlanes(item.usuario_id)"><i class="icon-history"></i></button>	
								<div class="modal fade" id="histModal{{item.usuario_id}}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
								<form name="histForm" id="histForm">
									<div class="modal-dialog modal-lg" role="document">
										<div class="modal-content">
											<div class="modal-header bg-light">
												<h5 class="modal-title" id="exampleModalLabel">Resumen Planes de {{item.Nombre}}</h5>
												<button type="button" class="close" data-dismiss="modal" aria-label="Close">
													<span aria-hidden="true">&times;</span>
												</button>
											</div>
											<div class="modal-body container">
													<div class="table-responsive">
														<table class="table table-striped table-condensed">
														<thead>
															<tr>
						
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
														</tr>
													</thead>
													<tbody>
														<tr ng-repeat="item in ListUser = (Planes | filter:buscar:strict) | limitTo:itemsPerPage:itemsPerPage*(currentPage-1) ">
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
														</tr>
													</tbody>
													</table>
												</div>						
											</div>
											<div class="modal-footer ">
												<button type="button" class="btn btn-outline-light" data-dismiss="modal" ><span></span>Cerrar</button>
											</div>
										</div>
									</div>
								</form>
							</div>
							</td>
							
						</tr>
					</tbody>
					</table>
				</div>
                </div>
              </div>
        </div>
