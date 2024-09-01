<style>
</style>
	
<div class="col-lg-12 grid-margin stretch-card" ng-controller="videosCtrl">
            <div class="card">
                <div class="card-body">
					<button class="float-left btn btn-primary" data-target="#newModal" data-toggle="modal">Agregar</button>
                  <h2 class=" text-center display-4 text-secondary text-uppercase " >Videos Promocionales</h2>
                  <div class="table-responsive">
                    <table class="table table-striped">
                      <thead>
						<tr>
                            <th>No.</th>
                            <th>Identificador (URL)</th>
                            <th>Descripcion</th>
                            <th>Fecha</th>
                            <th>Estado</th>
                            <th style="width:10px;">Acción</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr ng-repeat="item in ListVideos">
                          <td>
                            {{item.video_id}}
                          </td>
						  <td>
                            {{item.url}}
                          </td>
                          <td>
                            {{item.descripcion}}
                          </td>
                          <td>
                            {{item.fecha}}
                          </td>
						  <td>
                            <span ng-show="item.estado == 1"><i class='ti-check'></i></span>
                            <span ng-show="item.estado ==0"><button class="btn btn-sm btn-primary" ng-click="Activar(item)">Activar</button></span>
                          </td>
                          <td>
                            <button type="button" class="btn btn-xs btn-outline-primary" ng-click="loadVideo(item);" title="Ver video">
                                <i class="ti-video-clapper  btn-icon-prepend"></i>                                                    
                            </button>
                           
							<div class="modal fade" id="videoModal{{item.video_id}}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
									<div class="modal-dialog" role="document">
										<div class="modal-content">
											<div class="modal-header bg-light">
												<h5 class="modal-title" id="exampleModalLabel">Vista previa</h5>
												<button type="button" class="close" data-dismiss="modal" aria-label="Close">
													<span aria-hidden="true">&times;</span>
												</button>
											</div>
											<div class="modal-body container">
												<div class="form-group row">
													<div class="col-md-12 col-sm-12 col-lg-12">
														 <div id="vframe"  name="vframe" class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
															
														  </div>
													</div>
												</div>
											</div>
											<div class="modal-footer ">
												<button type="button" class="btn btn-outline-light" data-dismiss="modal" ><span></span>Cerrar</button>
												
											</div>
										</div>
									</div>
							</div>
                          </td>
						</tr>
                      </tbody>
                    </table>
                  </div>
                </div>
            </div>            
</div>

<div class="modal fade" id="newModal" tabindex="-1" role="dialog" aria-labelledby="newModal" aria-hidden="true" >
		<form name="ModalForm" id="ModalForm">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header bg-light">
						<h5 class="modal-title" id="exampleModalLabel">Agregar Video</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body container">
						<div class="form-group row">
							<div class="col-md-12 col-sm-12 col-lg-12">
								<label for="">Identificador</label>
								<div class="input-group mb-3">	
									<input id="video" name="video" class="form-control input-group-prepend input-group-sm" placeholder="CB0PBfhgI6M"   ng-model="vid.url" required>
								</div>
								<label for="">Descripción</label>
								<div class="input-group mb-3">	
									<textarea row="" id="descripcion" name="descripcion" class="form-control input-group-prepend input-group-sm"  ng-model="vid.descripcion" required></textarea>
								</div>
							</div>
						</div>
					</div>
					<div class="modal-footer ">
						<button type="button" class="btn btn-outline-light" data-dismiss="modal" ><span></span>Cancelar</button>
						<button type="button" class="btn  btn-outline-primary" ng-disabled="ModalForm.$invalid || cantidad<=0" ng-click="GuardarVideo(vid);" data-dismiss="modal"><span class="mr-1 ti-check"></span>Guardar</button>
					</div>
				</div>
			</div>
		</form>
</div>
