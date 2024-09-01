<div class="">
	<div class="row">
		<div class="col-lg-6">
            <div class="card">
				<div class="card-body">
				<h4 class="card-title">Resumen Participaciones</h4>
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
							Participaciones
						</th>
						<th class="text-right">
							Historial
						</th>
						
						</tr>
					</thead>
					<tbody>
						<tr ng-repeat="item in ListUser = (UsuariosParticipaciones | filter:buscar:strict) | limitTo:itemsPerPage:itemsPerPage*(currentPage-1) ">
						<td>
						{{item.nombre}} {{item.apellidos}}
						</td>
						<td class="text-center">
						<div class="badge badge-primary rounded">
							{{item.cantidad}}	
						</div>
						</td>
						
						
						<td>
							<button class="btn btn-primary btn-xs float-right" data-target="#histModal{{item.usuario_id}}" data-toggle="modal" ng-click="CargarParticipaciones(item.usuario_id)"><i class="icon-history"></i></button>
							
							<div class="modal fade" id="histModal{{item.usuario_id}}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
								<form name="histForm" id="histForm">
									<div class="modal-dialog modal-lg" role="document">
										<div class="modal-content">
											<div class="modal-header bg-light">
												<h5 class="modal-title" id="exampleModalLabel">Resumen participaciones de {{item.nombre}}</h5>
												<button type="button" class="close" data-dismiss="modal" aria-label="Close">
													<span aria-hidden="true">&times;</span>
												</button>
											</div>
											<div class="modal-body container">
													<div class="table-responsive">
														<table class="table table-striped table-condensed">
														<thead>
															<tr>
																<th>
																	Fecha Compra
																</th>
																<th class="text-center">
																	Cantidad
																</th>
																<th class="text-right">
																	Precio
																</th>
																<th class="text-right">
																	Importe
																</th>	
																<th class="text-right">
																	Origen
																</th>																	
															</tr>
														</thead>
														<tbody>
															<tr ng-repeat="item in Participaciones">
																<td>
																	{{item.fecha_solicitud}}
																</td>
															<td class="text-right">
																<div class="badge badge-primary rounded">
																	{{item.cantidad | number:0}} 	
																</div>
															</td>
															<td class="text-right">
																	{{item.precio | number: 9}}	<i class="fab fa-ethereum"></i>
															</td>
															<td class="text-right">
																	{{item.cantidad * item.precio | number:9}}	<i class="fab fa-ethereum"></i>
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
	
		<div class="col-lg-5">
			<div class="card">
				<div class="card-header">
					<h4 class="card-title">Promoción de participaciones Mes de 	Lanzamiento</h4>	
				</div>
				<div class="card-body">
					<div class="card p-2">
						<span> Comprar hasta 1000  <img style="width:50px;" src="lib/images/participacion.png" /> </span>	
							<button class="btn btn-outline-primary float-right" ng-show="compra1000" ng-click="Activar('compra1000', 'false')"> Desactivar </button>
							<button class="btn btn-outline-success float-right" ng-show="!compra1000" ng-click="Activar('compra1000', 'true')"> Activar </button>
					</div>
					<div class="card p-2 mt-3">
						<span> Regalo de <img style="width:50px;" src="lib/images/participacion.png" />Compra de Plan100 o superior</span>
							<button class="btn btn-outline-success float-right" ng-show="!plan100" ng-click="Activar('plan100', 'true')"> Activar </button>
							<button class="btn btn-outline-primary float-right" ng-show="plan100" ng-click="Activar('plan100', 'false')"> Desactivar </button>
					</div>					
				</div>
			</div>
		
		</div>
	</div>
	
</div>