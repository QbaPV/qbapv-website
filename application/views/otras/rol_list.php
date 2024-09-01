<div loading ng-show="cargando"></div>
<div ng-show="!cargando" class="col-lg-12 grid-margin stretch-card">
            <div class="card">
                <div class="card-body">
                  <h2 class=" text-center display-4 text-secondary text-uppercase ">Gestión de Roles</h2>
                  <hr>
                  <p class="card-description">
                     <button type="button" class="btn btn-outline-primary btn-icon-text" data-target="#rolModal" data-toggle="modal" ng-click="ClearForm()">
                          <i class="ti-plus btn-icon-prepend"></i>                                                    
                          Agregar
                    </button>
                  </p>
                  <div class="table-responsive">
                    <table class="table table-striped">
                      <thead>
                        <tr>
                            <th style="width:50px;">Id</th>
                            <th>Rol</th>
                            <th style="width:10px;"></th>
                           
                        </tr>
                      </thead>
                      <tbody>
                        <tr ng-repeat="item in Roles">
                          <td class="py-1">
                            {{item.rol_id}}
                          </td>
                          <td>
                            {{item.rol}}
                          </td>
                          <td>
                            <button type="button" class="btn btn-xs btn-outline-warning" data-target="#rolModal" data-toggle="modal" ng-click="CargarDatos(item);">
                                <i class="ti-pencil btn-icon-prepend"></i>                                                    
                            </button>
                            <button type="button" class="btn btn-xs btn-outline-danger" ng-click="Eliminar(item)">
                                <i class="ti-trash btn-icon-prepend"></i>                                                    
                            </button>
                          </td>
                          
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
            </div>


            <div class="modal fade" id="rolModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                <form name="rolForm" id="rolForm">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header bg-light">
                                <h5 class="modal-title" id="exampleModalLabel">Agregar Rol</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body container">
                                <div class="form-group row">
                                    <div class="col-md-12 col-sm-12 col-lg-12">
                                        <input id="rol_id" name="rol_id" type="hidden" ng-model="newItem.rol_id">
                                        <label for="rol">Rol</label>
                                        <div class="input-group mb-3">	
                                            <input id="rol" name="rol" type="text" class="form-control input-group-prepend input-group-sm"  aria-label="" aria-describedby="basic-addon1" ng-model="newItem.rol" required>
                                        </div>
                                    </div>
                                    
                                    
                                </div>
                            </div>
                            <div class="modal-footer ">
                                <button type="button" class="btn btn-outline-light" data-dismiss="modal" ><span></span>Cancelar</button>
                                <button type="button" class="btn  btn-outline-primary" ng-disabled="rolForm.$invalid" ng-click="Guardar();" data-dismiss="modal"><span class="mr-1 ti-check"></span>Guardar</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
</div>