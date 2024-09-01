<div loading ng-show="cargando"></div>
<div ng-show="!cargando" class="col-lg-12 grid-margin stretch-card">
            <div class="card">
                <div class="card-body">
                  <h2 class=" text-center display-4 text-secondary text-uppercase ">Completar Planes</h2>
                  <hr>
         
                  <div class="table-responsive">
                    <table class="table table-striped">
                      <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellidos</th>
                            <th>Plan</th>
                            <th>Precio USD</th>
                            <th>Fecha Compra</th>
                            <th>Porciento</th>
                            <th>Accion</th>
                            <th> Finalizar</th>
                        </tr>
                      </thead>
                      <tbody>
						<tr ng-repeat="item in PlanesCompletar">
                            <th>{{item.Name}}</th>
                            <th>{{item.apellidos}}</th>
                            <th>{{item.nombre}}</th>
                            <th>{{item.precio_plan | currency:'$'}}</th>
                            <th>{{item.fecha_plan}}</th>
                            <th>{{item.porciento}}%</th>
                            <th>{{item.accion}}</th>
                            <th>
								<button ng-if="item.accion != 'COMPLETADO' && item.accion != 'NINGUNA' " class="btn btn-xs btn-outline-primary" title="Marcar Completado" ng-click="Finalizar(item);">
									<i class="ti-money btn-icon-prepend"></i>                                                    
								</button>
								<div class="modal fade" id="MensajeModal{{item.usuario_id}}" tabindex="-1" data-backdrop="false" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
								<form name="regaloForm" id="regaloForm">
									<div class="modal-dialog" role="document">
										<div class="modal-content">
											<div class="modal-header bg-light">
												<h5 class="modal-title" id="exampleModalLabel">Eviar mensaje a {{item.Name}}</h5>
												<button type="button" class="close" data-dismiss="modal" aria-label="Close">
													<span aria-hidden="true">&times;</span>
												</button>
											</div>
											<div class="modal-body container">
												<div class="form-group row">
													<div class="col-md-12 col-sm-12 col-lg-12">
														<label for="rol">Mensaje</label>
														<div class="input-group mb-3">	
															<textarea id="mensaje" name="mensaje" class="form-control"  ng-model="mensaje" required></textarea>
														</div>
													</div>
												</div>
											</div>
											<div class="modal-footer ">
												<button class="btn btn-outline-light" data-dismiss="modal" >Cancelar</button>
												<button  class="btn  btn-outline-primary" ng-disabled="regaloForm.$invalid" ng-click="EnviarMensaje(item, mensaje);" data-dismiss="modal">Enviar</button>
											</div>
										</div>
									</div>
								</form>
							</div>
							</th>
                      </tbody>
                    </table>
                  </div>
                </div>
            </div>


           