<div !loading ng-show="cargando"></div>
<div  class="col-lg-12 grid-margin stretch-card"  ng-controller="OrdenesProcesadasCtrl">
            <div class="card ">
                <div class="card-body">
                  <h2 class="p-3 text-center display-5 text-secondary text-uppercase ">Pedidos Procesados</h2><button class="btn btn-primary btn-sm" ng-click="CargarOrdenesProcesadas()"><i class="icon-refresh"></i> Refrescar</button>
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
                        <td>Fecha</td>
                        <td>Cliente</td>
                        <td>Proveedor</td>
                        <td>Duracion</td>
                        <td>Actividad</td>
                        <td>Lugar</td>
                        <td>Importe</td>
                        <!-- <td>Comision</td> -->
                        <td></td>
                      </thead>
                      <tr  ng-repeat="item in listOrdenesProcesadas">
                        <td>{{item.date}}</td>
                        <td><a href="" ng-click="GetClientInfo(item.clientId)" data-toggle="modal" data-target="#exampleModal">{{item.clientId}}</a></td>
                        <td>{{item.name}} {{item.lastname}} ({{item.email}})</td>
                        <td>{{item.duration}} horas</td>
                        <td>{{item.activity}}</td>
                        <td>{{item.officeName}}</td>
                        <td>$ {{item.cost}}</td>
                        <!-- <td>$ {{item.comision}}</td> -->
                        
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
                        <td>
                          <button class="btn btn-danger btn-sm">Confirmar pago</button>
                        </td>
                      </tr>
                    </table>
                    </div>
                </div>
                </div>
                </div>
            </div>
           
          </div>
