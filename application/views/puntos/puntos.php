<div class="">
	<div class="row">
		<div class="col-lg-12">
            <div class="card">
				<div class="card-body">
				<h4 class="card-title">Resumen de Puntos</h4>
				
				<div class="table-responsive">
					<table class="table table-striped table-condensed">
					<thead>
						<tr>
							<td colspan="2">
							  <small ng-show="ListUser.length > itemsPerPage">
								  <ul  class="d-flex justify-content-center" uib-pagination total-items="ListUser.length" items-per-page="itemsPerPage" ng-model="currentPage" max-size="5" boundary-link-numbers="3"></ul>
							  </small>
							</td>
							<td>
							  Mostrar 
								<select name="cantRows" id="cantRows" class=" m-0 p-1" style="width:70px;" ng-model="itemsPerPage" >
								  <option ng-value="5">5</option>  
								  <option ng-value="10">10</option>  
								  <option ng-value="20">20</option>  
								  <option ng-value="50">50</option>  
								  <option ng-value="100">100</option>  
								  <option ng-value="">Todos</option>  
								</select>
								entradas
							</td>
							<td colspan="3">
							  <div class="col-lg-12 col-xs-10 form-group" style="font-size:10pt;">
								<input type="search" name="buscador" id="buscador" class="form-control" placeholder="buscar" ng-model="buscar">
							  </div>
							</td>
						</tr>
						<tr>
						<th></th>
						<th>
							Nombre y Apellidos
						</th>
						<th class="text-center">
							Puntos Totales
						</th>
						<th class="text-center">
							Puntos Transferibles
						</th>
						<th class="text-right">
							Regalar
						</th>
						<th class="text-right">
							Detalle
						</th>
						</tr>
					</thead>
					<tbody>
						<tr ng-repeat="item in ListUser = (List | filter:buscar:strict) | limitTo:itemsPerPage:itemsPerPage*(currentPage-1)">
						<td style="width:25px;">
						{{$index+1}}
						</td>
						
						<td>
						{{item.nombre}} {{item.apellidos}}
						</td>
						<td class="text-center">
						<div class="badge badge-primary rounded">
							{{item.puntos['totales']}}	
						</div>
						</td>
						<td class="text-center">
						<div class="badge badge-primary rounded">
							{{item.puntos['transferibles']}}	
						</div>
						</td>
						<td>
							<button class="btn btn-primary btn-xs float-right" data-target="#puntosModal{{item.usuario_id}}" data-toggle="modal"><i class="ti-gift"></i></button>
							
							<div class="modal fade" id="puntosModal{{item.usuario_id}}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
								<form name="puntosModalForm" id="puntosModalForm">
									<div class="modal-dialog" role="document">
										<div class="modal-content">
											<div class="modal-header bg-light">
												<h5 class="modal-title" id="exampleModalLabel">Regalar Puntos a {{item.nombre}}</h5>
												<button type="button" class="close" data-dismiss="modal" aria-label="Close">
													<span aria-hidden="true">&times;</span>
												</button>
											</div>
											<div class="modal-body container">
												<div class="form-group row">
													<div class="col-md-12 col-sm-12 col-lg-12">
														<label for="rol">Cantidad de puntos a enviar (duración 3 meses)</label>
														<div class="input-group mb-3">	
															<input id="cantidadPuntos" name="cantidadPuntos" type="number" class="form-control input-group-prepend input-group-sm"  ng-model="cantidad" required>
														</div>
													</div>
													
													
												</div>
											</div>
											<div class="modal-footer ">
												<button type="button" class="btn btn-outline-light" data-dismiss="modal" ><span></span>Cancelar</button>
												<button type="button" class="btn  btn-outline-primary" ng-disabled="puntosModalForm.$invalid || cantidad<=0" ng-click="RegalarPuntos(item, cantidad);" data-dismiss="modal"><span class="mr-1 ti-check"></span>Guardar</button>
											</div>
										</div>
									</div>
								</form>
							</div>
						</td>
						<td>
							<button class="btn btn-primary btn-xs float-right"  ng-click="ViewPointDetails(item);" ><i class="ti-list"></i></button>
							
							<div class="modal fade" id="detalleModal{{item.usuario_id}}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
								<form name="puntosModalForm" id="puntosModalForm">
									<div class="modal-dialog modal-xl" role="document">
										<div class="modal-content">
											<div class="modal-header bg-light">
												<h5 class="modal-title" id="exampleModalLabel">Detalles de puntos recibidos por {{item.nombre}}</h5>
												<button type="button" class="close" data-dismiss="modal" aria-label="Close">
													<span aria-hidden="true">&times;</span>
												</button>
											</div>
											<div class="modal-body container">
												<div class="form-group row">
													<div class="col-md-12 col-sm-12 col-lg-12">
														<div class="table-responsive">
															<table class="table table-striped table-condensed">
															<thead>
																<tr>
																	<td colspan="2">
																	  <small ng-show="ListUser.length > itemsPerPage">
																		  <ul  class="d-flex justify-content-center" uib-pagination total-items="ListUser.length" items-per-page="itemsPerPage" ng-model="currentPage" max-size="5" boundary-link-numbers="3"></ul>
																	  </small>
																	</td>
																	<td>
																	  Mostrar 
																		<select name="cantRows" id="cantRows" class=" m-0 p-1" style="width:70px;" ng-model="itemsPerPage" >
																		  <option ng-value="5">5</option>  
																		  <option ng-value="10">10</option>  
																		  <option ng-value="20">20</option>  
																		  <option ng-value="50">50</option>  
																		  <option ng-value="100">100</option>  
																		  <option ng-value="">Todos</option>  
																		</select>
																		entradas
																	</td>
																	<td colspan="3">
																	  <div class="col-lg-12 col-xs-10 form-group" style="font-size:10pt;">
																		<input type="search" name="buscador" id="buscador" class="form-control" placeholder="buscar" ng-model="buscarPts">
																	  </div>
																	</td>
																</tr>
																<tr>
																<th></th>
																<th class="text-center">
																	Fecha Creado
																</th>
																<th class="text-center">
																	Fecha Vence
																</th>
																<th class="text-center">
																	Cantidad
																</th>
																<th class="text-center">
																	Descripcion
																</th>
																</tr>
															</thead>
															<tbody>
																<tr ng-repeat="item in ListDetail = (ListDetalle | filter:buscarPts:strict) | limitTo:itemsPerPage:itemsPerPage*(currentPage-1)">
																<td style="width:25px;">
																{{$index+1}}
																</td>
																
																<td class="text-center">
																	<div >
																		{{item.fecha_creado}}	
																	</div>
																</td>
																<td class="text-center">
																	<div >
																		{{item.fecha_vence}}	
																	</div>
																</td>
																<td class="text-center">
																	<div >
																		{{item.cantidad}}	
																	</div>
																</td>
																<td class="text-center">
																	<div >
																		{{item.descripcion}}	
																	</div>
																</td>
																</tr>
															</tbody>
															</table>
														</div>
													</div>
												</div>
											</div>
											<div class="modal-footer ">
												<button type="button" class="btn btn-outline-light" data-dismiss="modal" ><span></span>Cancelar</button>
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
	</div>
</div>