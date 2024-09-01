<div !loading ng-show="cargando"></div>
<div  class="col-lg-12 grid-margin stretch-card"  ng-controller="ProviderCtrl">
            <div class="card ">
                <div class="card-body">
                  <h2 class="p-3 text-center display-5 text-secondary text-uppercase ">Proveedores</h2><button class="btn btn-primary btn-sm" ng-click="CargarOrdenesEnviadas()"><i class="icon-refresh"></i> Refrescar</button>
                  <!-- <hr> -->
                  <div class="">
                  <!-- <div class="card m-1">
                    <div class="card-body ">
                    asjkaj
                    </div>
                </div> -->
                <div class="card m-1">
                    <div class="card-body">
                    <table class="table table-bordered ">
                      <thead class="bg-info text-white">
                        <td></td>                     
                        <td>Nombre y Apellidos</td>
                        <td>Email</td>
                        <td>Provider</td>
                        <td>Idiomas</td>
                        <td>Titulos</td>
                        <td>Horarios</td>
                        <!-- <td>Comision</td> -->
                      </thead>
                      <tr ng-repeat="item in list">
                        <!-- <td><a href="" ng-click="GetClientInfo(item.clientId)" data-toggle="modal" data-target="#exampleModal">{{item.clientId}}</a></td> -->
                        <td style="width:25px;">
                         {{$index+1}}
                        </td>
                        <td>{{item.name}} {{item.lastname}}</td>
                        <td>{{item.email}}</td>
                        <td>{{item.providerGroup}}</td>
                        <td style="width:25px;"><a href=""><span class="icon-eye"></span></a></td>
                        <td style="width:25px;"><a href=""><span class="icon-eye"></span></a></td>
                        <td style="width:25px;"><a href=""><span class="icon-eye"></span></a></td>
                        
                        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                          <div class="modal-dialog" role="document">
                            <div class="modal-content">
                              <div class="modal-header bg-primary text-white">
                                <h5 class="modal-title" id="exampleModalLabel">
                                    <span>{{client[0].clientGroup}}</span>: {{client[0].name }}  {{client[0].lastname }}
                                  </h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div class="modal-body">
                                <div class="p-2">
                                </div>
                                <div class="p-2">
                                    <span>Email: {{client[0].email}}</span>
                                </div>
                              </div>
                              <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
                              </div>
                            </div>
                          </div>
                        </div>
                        <!-- <td>
                          <button class="btn btn-danger btn-sm">Confirmar pago</button>
                        </td> -->
                      </tr>
                    </table>
                    </div>
                </div>
                </div>
                </div>
            </div>
           
          </div>
