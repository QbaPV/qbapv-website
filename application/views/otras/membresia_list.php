<div loading ng-show="cargando"></div>
<div ng-show="!cargando" class="col-lg-12 grid-margin stretch-card">
            <div class="card">
                <div class="card-body">
                  <h2 class=" text-center display-4 text-secondary text-uppercase ">CONFIGURAR PLANES</h2>
                  <hr>
                  <p class="card-description">
                     <button type="button" class="btn btn-outline-primary btn-icon-text" data-target="#membresiaModal" data-toggle="modal" ng-click="ClearForm()">
                          <i class="ti-plus btn-icon-prepend"></i>                                                    
                          Agregar
                    </button>
                  </p>
                  <div class="table-responsive">
                    <table class="table table-striped">
                      <thead>
                        <tr>
                            <th></th>
                            <th>Nombre</th>
                            <th>Periodo</th>
                            <th>Precio</th>
                            <th style="width:10px;"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr ng-repeat="item in ListMembresia">
                          <td class="py-1">
                            <img class="" src="lib/images/memberships.png" alt="">
                            <!-- {{item.foto}} -->
                          </td>
                          <td>
                            {{item.nombre}}
                          </td>
                          <td>
                            {{item.periodo}}
                          </td>
                          <td>
                            {{item.precio | currency:'$'}}
                          </td>
                          <td>
                            <button type="button" class="btn btn-xs btn-outline-warning" data-target="#membresiaModal" data-toggle="modal" ng-click="CargarDatosMembresia(item);">
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


            <div class="modal fade" id="membresiaModal" tabindex="-1" membresiae="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                <form name="membresiaForm" id="membresiaForm">
                    <div class="modal-dialog" membresiae="document">
                        <div class="modal-content">
                            <div class="modal-header bg-light">
                                <h5 ng-show="transaction=='new'" class="modal-title" id="exampleModalLabel">Agregar Plan</h5>
                                <h5 ng-show="transaction=='edit'" class="modal-title" id="exampleModalLabel">Modificar Plan</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body container">
                                <div class="form-group row">
                                    <div class="col-md-12 col-sm-12 col-lg-12">
                                        <input id="membresia_id" name="membresia_id" type="hidden" ng-model="newItem.membresia_id">
                                    </div>
                                    <div class="col-md-12 col-sm-12 col-lg-12">
                                        <label for="membresia">Nombre de la Membresia</label>
                                        <div class="input-group mb-3">
                                            <select class="form-control" name="catalogo_membresia" id="catalogo_membresia" required ng-model="newItem.catalogo_membresia_id">
                                                <option ng-repeat="opt in List" value="{{opt.catalogo_membresia_id}}">{{opt.nombre}}</option>
                                            </select>	
                                        </div>
                                    </div>
                                    <div class="col-md-12 col-sm-12 col-lg-12">
                                        <label for="periodo">Plan</label>
                                        <div class="input-group mb-3">
                                            <select class="form-control" name="periodo" id="periodo" ng-model="newItem.periodo" required>
                                                <option value=""></option>
                                                <option value="MENSUAL">MENSUAL</option>
                                                <option value="ANUAL"> ANUAL</option>
                                            </select>	
                                        </div>
                                    </div>
                                    <div class="col-md-12 col-sm-12 col-lg-12">
                                        <label for="precio">Precio</label>
                                        <div class="input-group mb-3">
                                            <input class="form-control" id="precio" name="precio" type="text" required ng-model="newItem.precio">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer ">
                                <button type="button" class="btn btn-outline-light" data-dismiss="modal" ><span></span>Cancelar</button>
                                <button type="button" class="btn  btn-outline-primary" ng-disabled="membresiaForm.$invalid" ng-click="GuardarMembresia();" data-dismiss="modal"><span class="mr-1 ti-check"></span>Guardar</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
</div>