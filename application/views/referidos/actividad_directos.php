<div class="container-fluid">
  
  <div class="row">
    <div class="col-lg-4 mx-auto">
      <div class="card-backoffice text-center" tooltip-placement="top" uib-tooltip="Información de tus referidos directos"> 
        <font color="">ACTIVIDAD DE MIS DIRECTOS</font> 
      </div>
    </div>
  </div>

  <div class="row">
    <div class="card-backoffice col-xs-12 col-lg-10 col-xl-8 mx-auto">
      <div class="table-responsive">
      <table id="example" class="w-100 table-primary table table-striped table-bordered table-hover align-center">  
          <thead class="text-center  bg-primary text-light">
                <tr>
                    <td colspan="2">
                      <small>
                          <ul  class="d-flex justify-content-center" uib-pagination total-items="Referals.length" items-per-page="itemsPerPage" ng-model="currentPage" max-size="5" boundary-link-numbers="3"></ul>
                      </small>
                    </td>
                    <td>
                      Mostrar 
                        <select name="cantRows" id="cantRows" class=" m-0 p-1" style="width:60px;" ng-model="itemsPerPage" >
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
                      <div class="col-lg-12 col-xs-10" style="font-size:10pt;">
                        <input type="search" name="buscador" id="buscador" placeholder="buscar" ng-model="buscar">
                      </div>
                    </td>
                    <td>
                      <div class="col-lg-12 col-xs-12 w-100">
                        <button class="btn btn-xs p-2"><i class="ti-printer"></i></button>
                        <a href="index.php/usuario_ctrl/exportar_actividad_directos/{{userData.userId}}" class="btn btn-xs p-2"><i class="ti-download" ></i></a>
                      </div>      
                    </td>
                </tr>
              <tr >
                <th class="mt-5" rowspan="2" >
                  <i ng-click="sortType = 'nombre_usuario'; sortReverse = !sortReverse" >Usuario
                    <span ng-class="sortType != 'nombre_usuario' ? 'icon-unsorted' : sortType == 'nombre_usuario' && !sortReverse ? ' icon-sort-amount-asc' : sortType == 'nombre_usuario' && sortReverse ? 'icon-sort-amount-desc': ''"></span>
                  </i>  
                </th>
                <th rowspan="2">
                  <i ng-click="sortType = 'rango'; sortReverse = !sortReverse">Rango
                    <span ng-class="sortType != 'rango' ? 'icon-unsorted' : sortType == 'rango' && !sortReverse ? ' icon-sort-amount-asc' : sortType == 'rango' && sortReverse ? 'icon-sort-amount-desc': ''"></span>                  
                  </i>  
                </th>
                <th  rowspan="2">
                  <i ng-click="sortType = 'categoria'; sortReverse = !sortReverse">Categoría
                    <span ng-class="sortType != 'categoria' ? 'icon-unsorted' : sortType == 'categoria' && !sortReverse ? ' icon-sort-amount-asc' : sortType == 'categoria' && sortReverse ? 'icon-sort-amount-desc': ''"></span>
                  </i>  
                </th>
                <th  rowspan="2">
                  <i href="" ng-click="sortType = 'cantidad'; sortReverse = !sortReverse">Participaciones
                    <span ng-class="sortType != 'cantidad' ? 'icon-unsorted' : sortType == 'cantidad' && !sortReverse ? ' icon-sort-amount-asc' : sortType == 'cantidad' && sortReverse ? 'icon-sort-amount-desc': ''"></span>
                  </i>  
                </th>
                <th  rowspan="2">Planes</th>
                <th style="width:50px;" colspan="2">Loyalty Points</th>
                </tr>
          </thead>
          <thead class="text-center bg-primary text-light">
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th >Totales</th>
              <th >Canjeables</th>
            </tr>
          </thead>  
          <tbody>     
            <tr class="text-center" ng-repeat="item in Referals = (Referidos | filter:buscar:strict) | orderBy:sortType:sortReverse  | limitTo:itemsPerPage:itemsPerPage*(currentPage-1)">
              <td><a href="" ng-click="GetInfoMisReferidos(item.usuario_id);"  data-toggle="modal" data-target="#modalInfo{{item.usuario_id}}">{{item.nombre_usuario}}</a></td>
              <td>{{item.rango | uppercase}}</td>
              <td>{{item.categoria | uppercase}}</td>
              <td>{{item.cantidad}}</td>
              <td></td>
              <td></td>
              <td style="height:auto; text-align:left">
                <div class="modal fade" id="modalInfo{{item.usuario_id}}" style="opacity:0.9">
                      <div class="modal-dialog modal-lg">
                        <div class="modal-content" style="border: 0px solid rgba(0,0,0,.2); background-color:transparent;">
                          <!-- Modal body -->
                          <div class="modal-body">
                            <div class="card-backoffice">            
                              <div class="">
                                <div class="align-left">
                                  <img class="w-25 h-auto img-thumbnail img-circle" src="{{item.foto}}" alt="">
                                </div>
                                <div class="align-left p-1">
                                  <h4>{{item.nombre}} {{item.apellidos}} </h4>
                                </div>
                                <div class="align-left p-1" style="border-radius:0px;">
                                  <img class="flag" src="lib/images/flags/{{item.pais | lowercase}}.png" alt="">
                                </div>
                                <div class="align-left p-1">
                                  	<h4>Usuario: {{item.nombre_usuario}}</h4> 
                                </div>
                                <div class="align-left p-1">
                                  	<h4>Membresía: {{item.rango}}</h4> 
                                </div>
                                <div class="align-left p-1">
                                  	<h4>Registrado desde: {{item.fecha_registro | date:'medium'}}</h4> 
                                </div>  
                                <div class="align-left p-1">
                                    <h4 ng-show="item.sexo=='M' ">Género: Masculino</h4> 
                                    <h4 ng-show="item.sexo=='F' ">Género: Femenino</h4> 
                                </div>
                                <div class="align-left p-1">
                                  	<h4>Correo electrónico: {{item.email}}</h4> 
                                </div>
                                <div class="align-left p-1 table-responsive">
                                  <table class=""> 
                                    <tr>
                                      <td class="text-left w-25">
                                        <h5>Total de Referidos: {{TotalReferidos}}</h5>
                                        <h5>Referidos Activos: {{Activos}}</h5>
                                        <h5>Participaciones: {{Participaciones}}</h5>
                                        <h5>Planes Totales: 2</h5>
                                      
                                      </td>
                                      <td class="text-left w-25">
                                        <div class="w-100"><h4>Planes</h4></div>
                                        <h5>Plan 100  120%</h5>
                                        <h5>Plan 500  180%</h5>
                                      </td>
                                      <td class="w-25">
                                        <div class="w-100"><h4>Loyalty Points</h4></div>
                                        <h5>Totales: 1200</h5>
                                        <h5>Canjeables 180</h5>
                                      </td>
                                      <td class="w-50">
                                        <img style="width:100px; height: 100px; border-radius:0" src="lib/images/escudos/{{item.rango}}.png" alt="">
                                        <img style="width:100px; height: 100px;" src="lib/images/pages/{{item.categoria}}.png" alt="">
                                      </td>
                                    </tr>
                                    
                                  </table>
                                </div>
                              </div>
                            </div>
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

