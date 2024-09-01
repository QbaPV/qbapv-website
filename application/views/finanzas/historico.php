<div class="container-fluid">
  
  <div class="row">
    <div class="col-lg-4 mx-auto">
      <div class="card-backoffice text-center h-auto" tooltip-placement="top" uib-tooltip=""> 
        <font color="">HISTORIAL</font> 
      </div>
    </div>
  </div>
   <div  class="row ">
    <div id="container" class="col-md-12 mt-4  card-backoffice h-auto">
      <div style="position:absolute; top:20px; right:5px; width:150px;">
        <button class="btn btn-sm"><i class="icon-print"></i></button>
        <button class="btn btn-sm"><i class="icon-download"></i></button>
      </div>  
      
      <div class="navbar-menu-wrapper d-flex align-items-center justify-content-end" style="height:70px;">
        <ul class="main_menu_list ml-1 pl-3 pb-3 col-12">
          <li class="active ">
            <a class="" href="" data-toggle="collapse" data-target="#hist_participaciones" aria-expanded="true"  aria-controls="hist_participaciones">Participaciones</a>
          </li>
          <li class="active ">
            <a class=""  href="" data-toggle="collapse" data-target="#hist_planes" aria-expanded="true"  aria-controls="hist_planes">&nbsp;&nbsp;&nbsp;&nbsp;Planes&nbsp;&nbsp;&nbsp;&nbsp;</a>          
          </li>
          <li class="active" >
            <a  class=" " href="" data-toggle="collapse" data-target="#hist_comisiones" aria-expanded="true"  aria-controls="hist_comisiones">&nbsp;&nbsp;&nbsp;Comisiones&nbsp;&nbsp;&nbsp;</a>          
          </li>
        </ul>
      </div>
      
       <div class="collapse show" data-parent="#container"  id="hist_participaciones">
            <div class="row">
              <div class="table-responsive">
              <table class="ml-4" border="0" width="96%">
                <tr>
                  <td class="w50px"><p class="text-dark pt-2">Desde: &nbsp;</p></td>
                  <td  class="w200px">
                    <div class="form-group float-left">
                      <div class="input-group align-middle">
                          <input id="birthdate" name="birthdate" class="form-control data-backoffice" style="font-size:10pt;" type="date"  placeholder="" >
                        <div class="input-group-append">
                          <button id="calendarBtn" class="btn data-backoffice date-h83">
                            <i class="icon-calendar"></i>     
                          </button>
                        </div>
                      </div>          
                    </div>
                  </td>
                  <td class="w10px">&nbsp;</td>
                  <td  class="w50px"><p class="text-dark pt-2">Hasta: &nbsp;</p></td>
                  <td  class="w200px">
                    <div class="form-group float-left">
                      <div class="input-group align-middle">
                          <input id="birthdate" name="birthdate" class="form-control data-backoffice" style="font-size:10pt;" type="date"  placeholder="" >
                        <div class="input-group-append">
                          <button id="calendarBtn" class="btn data-backoffice date-h83">
                            <i class="icon-calendar"></i>     
                          </button>
                        </div>
                      </div>          
                    </div>
                  </td>
                  <td class="">
                    <div class="form-group float-left mt-1">
                          <div class="input-group-append">
                            <button id="calendarBtn" class="btn btn-sm btn-success">
                              <i class="icon-search"></i>     
                              Buscar
                            </button>
                            
                        </div>          
                    </div>
                  </td>
                  <td>
                      <div class="float-right" style="font-size:12pt;"> Comisiones saldo actual: <span class="bg-primary p-2 text-light">0.025684000 <i class="fab fa-ethereum"></i></span>
                  </div>
                  </td>
                </tr>
              </table>     
              </div>  
            </div>
            <div class="pt-2 table-responsive">
                <table class="table-primary table table-striped table-bordered table-hover align-center">
                    <thead  class="  bg-primary text-light">
                        <tr>
                            <th colspan="3">
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
                            </th>
                           
                        </tr>              
                        <tr>
                            <th class="w150px">
                              <i ng-click="sortType = 'fecha_solicitud'; sortReverse = !sortReverse" >Fecha
                                <span ng-class="sortType != 'fecha_solicitud' ? 'icon-unsorted' : sortType == 'fecha_solicitud' && !sortReverse ? ' icon-sort-amount-asc' : sortType == 'fecha_solicitud' && sortReverse ? 'icon-sort-amount-desc': ''"></span>
                              </i>  
                            </th>
                            <th class="text-center w150px">
                              <i ng-click="sortType = 'cantidad'; sortReverse = !sortReverse" >Cantidad
                                <span ng-class="sortType != 'cantidad' ? 'icon-unsorted' : sortType == 'cantidad' && !sortReverse ? ' icon-sort-amount-asc' : sortType == 'cantidad' && sortReverse ? 'icon-sort-amount-desc': ''"></span>
                              </i>
                            </th>
                             <th class="text-center">Descripción</th>
                            <!--<th >
                              <i ng-click="sortType = 'total'; sortReverse = !sortReverse" >Total (<i class="fab fa-ethereum"></i> )
                                <span ng-class="sortType != 'total' ? 'icon-unsorted' : sortType == 'total' && !sortReverse ? ' icon-sort-amount-asc' : sortType == 'total' && sortReverse ? 'icon-sort-amount-desc': ''"></span>
                              </i>
                            </th>
                            <th class="text-center">
                              <i ng-click="sortType = 'estado'; sortReverse = !sortReverse" >Estado</i>
                                <span ng-class="sortType != 'estado' ? 'icon-unsorted' : sortType == 'estado' && !sortReverse ? ' icon-sort-amount-asc' : sortType == 'estado' && sortReverse ? 'icon-sort-amount-desc': ''"></span>
                              </i>
                            </th> -->
                            </tr>
                        </thead>
                        <tbody>
                            <tr >
                                <td >2020-05-30 12:15:12</td>
                                <td class="text-center">0.021000000 <i class="fab fa-ethereum"></i></td>
                                <td class=""> Pago correspondiente al mes de enero de 2020, por la tenencia de 30 participaciones</td> 
                            </tr>
                            <tr >
                                <td >2020-05-30 12:15:12</td>
                                <td class="text-center">0.021000000 <i class="fab fa-ethereum"></i></td>
                                <td class=""> Pago correspondiente al mes de enero de 2020, por la tenencia de 30 participaciones</td> 
                            </tr>
                            <tr >
                                <td >2020-05-30 12:15:12</td>
                                <td class="text-center">0.021000000 <i class="fab fa-ethereum"></i></td>
                                <td class=""> Pago correspondiente al mes de enero de 2020, por la tenencia de 30 participaciones</td> 
                            </tr>
                        </tbody>
                        <tfoot class="bg-gradient-primary text-light">
                            <th>Total</th>
                            <th>0.063000000 <i class="fab fa-ethereum"></i></th>
                            <th></th>
                            <!-- <th>{{(totalActivas * precioParticipacion) | number: 9}} <i class="fab fa-ethereum"></i></th>
                            <th></th> -->
                        </tfoot>
                        </table>
                    </div>
      </div>
      <div class="collapse" data-parent="#container"  id="hist_planes">
      <div class="row">
              <div class="table-responsive">
              <table class="ml-4" border="0" width="96%">
                <tr>
                  <td class="w50px"><p class="text-dark pt-2">Desde: &nbsp;</p></td>
                  <td  class="w200px">
                    <div class="form-group float-left">
                      <div class="input-group align-middle">
                          <input id="birthdate" name="birthdate" class="form-control data-backoffice" style="font-size:10pt;" type="date"  placeholder="" >
                        <div class="input-group-append">
                          <button id="calendarBtn" class="btn data-backoffice date-h83">
                            <i class="icon-calendar"></i>     
                          </button>
                        </div>
                      </div>          
                    </div>
                  </td>
                  <td class="w10px">&nbsp;</td>
                  <td  class="w50px"><p class="text-dark pt-2">Hasta: &nbsp;</p></td>
                  <td  class="w200px">
                    <div class="form-group float-left">
                      <div class="input-group align-middle">
                          <input id="birthdate" name="birthdate" class="form-control data-backoffice" style="font-size:10pt;" type="date"  placeholder="" >
                        <div class="input-group-append">
                          <button id="calendarBtn" class="btn data-backoffice date-h83">
                            <i class="icon-calendar"></i>     
                          </button>
                        </div>
                      </div>          
                    </div>
                  </td>
                  <td class="">
                    <div class="form-group float-left mt-1">
                          <div class="input-group-append">
                            <button id="calendarBtn" class="btn btn-sm btn-success">
                              <i class="icon-search"></i>     
                              Buscar
                            </button>
                            
                        </div>          
                    </div>
                  </td>
                  <td>
                      <div class="float-right" style="font-size:12pt;"> Comisiones saldo actual: <span class="bg-primary p-2 text-light">0.039.
                      684000 <i class="fab fa-ethereum"></i></span>
                  </div>
                  </td>
                </tr>
              </table>     
              </div>  
            </div>
            <div class="pt-2 table-responsive">
                <table class="table-primary table table-striped table-bordered table-hover align-center">
                    <thead  class="  bg-primary text-light">
                        <tr>
                            <th colspan="3">
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
                            </th>
                           
                        </tr>              
                        <tr>
                            <th class="w150px">
                              <i ng-click="sortType = 'fecha_solicitud'; sortReverse = !sortReverse" >Fecha
                                <span ng-class="sortType != 'fecha_solicitud' ? 'icon-unsorted' : sortType == 'fecha_solicitud' && !sortReverse ? ' icon-sort-amount-asc' : sortType == 'fecha_solicitud' && sortReverse ? 'icon-sort-amount-desc': ''"></span>
                              </i>  
                            </th>
                            <th class="text-center w150px">
                              <i ng-click="sortType = 'cantidad'; sortReverse = !sortReverse" >Cantidad
                                <span ng-class="sortType != 'cantidad' ? 'icon-unsorted' : sortType == 'cantidad' && !sortReverse ? ' icon-sort-amount-asc' : sortType == 'cantidad' && sortReverse ? 'icon-sort-amount-desc': ''"></span>
                              </i>
                            </th>
                             <th class="text-center">Descripción</th>
                            <!--<th >
                              <i ng-click="sortType = 'total'; sortReverse = !sortReverse" >Total (<i class="fab fa-ethereum"></i> )
                                <span ng-class="sortType != 'total' ? 'icon-unsorted' : sortType == 'total' && !sortReverse ? ' icon-sort-amount-asc' : sortType == 'total' && sortReverse ? 'icon-sort-amount-desc': ''"></span>
                              </i>
                            </th>
                            <th class="text-center">
                              <i ng-click="sortType = 'estado'; sortReverse = !sortReverse" >Estado</i>
                                <span ng-class="sortType != 'estado' ? 'icon-unsorted' : sortType == 'estado' && !sortReverse ? ' icon-sort-amount-asc' : sortType == 'estado' && sortReverse ? 'icon-sort-amount-desc': ''"></span>
                              </i>
                            </th> -->
                            </tr>
                        </thead>
                        <tbody>
                            <tr >
                                <td >2020-05-30 12:15:12</td>
                                <td class="text-center">0.021000000 <i class="fab fa-ethereum"></i></td>
                                <td class=""> Pago correspondiente al mes de enero de 2020, por la tenencia de 30 participaciones</td> 
                            </tr>
                            <tr >
                                <td >2020-05-30 12:15:12</td>
                                <td class="text-center">0.021000000 <i class="fab fa-ethereum"></i></td>
                                <td class=""> Pago correspondiente al mes de enero de 2020, por la tenencia de 30 participaciones</td> 
                            </tr>
                            <tr >
                                <td >2020-05-30 12:15:12</td>
                                <td class="text-center">0.021000000 <i class="fab fa-ethereum"></i></td>
                                <td class=""> Pago correspondiente al mes de enero de 2020, por la tenencia de 30 participaciones</td> 
                            </tr>
                        </tbody>
                        <tfoot class="bg-gradient-primary text-light">
                            <th>Total</th>
                            <th>0.063000000 <i class="fab fa-ethereum"></i></th>
                            <th></th>
                            <!-- <th>{{(totalActivas * precioParticipacion) | number: 9}} <i class="fab fa-ethereum"></i></th>
                            <th></th> -->
                        </tfoot>
                        </table>
                    </div>
      </div>
      <div class="collapse" data-parent="#container" id="hist_comisiones">
      <div class="row">
              <div class="table-responsive">
              <table class="ml-4" border="0" width="96%">
                <tr>
                  <td class="w50px"><p class="text-dark pt-2">Desde: &nbsp;</p></td>
                  <td  class="w200px">
                    <div class="form-group float-left">
                      <div class="input-group align-middle">
                          <input id="birthdate" name="birthdate" class="form-control data-backoffice" style="font-size:10pt;" type="date"  placeholder="" >
                        <div class="input-group-append">
                          <button id="calendarBtn" class="btn data-backoffice date-h83">
                            <i class="icon-calendar"></i>     
                          </button>
                        </div>
                      </div>          
                    </div>
                  </td>
                  <td class="w10px">&nbsp;</td>
                  <td  class="w50px"><p class="text-dark pt-2">Hasta: &nbsp;</p></td>
                  <td  class="w200px">
                    <div class="form-group float-left">
                      <div class="input-group align-middle">
                          <input id="birthdate" name="birthdate" class="form-control data-backoffice" style="font-size:10pt;" type="date"  placeholder="" >
                        <div class="input-group-append">
                          <button id="calendarBtn" class="btn data-backoffice date-h83">
                            <i class="icon-calendar"></i>     
                          </button>
                        </div>
                      </div>          
                    </div>
                  </td>
                  <td class="">
                    <div class="form-group float-left mt-1">
                          <div class="input-group-append">
                            <button id="calendarBtn" class="btn btn-sm btn-success">
                              <i class="icon-search"></i>     
                              Buscar
                            </button>
                            
                        </div>          
                    </div>
                  </td>
                  <td>
                      <div class="float-right" style="font-size:12pt;"> Comisiones saldo actual: <span class="bg-primary p-2 text-light">0.056684000 <i class="fab fa-ethereum"></i></span>
                  </div>
                  </td>
                </tr>
              </table>     
              </div>  
            </div>
            <div class="pt-2 table-responsive">
                <table class="table-primary table table-striped table-bordered table-hover align-center">
                    <thead  class="  bg-primary text-light">
                        <tr>
                            <th colspan="3">
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
                            </th>
                           
                        </tr>              
                        <tr>
                            <th class="w150px">
                              <i ng-click="sortType = 'fecha_solicitud'; sortReverse = !sortReverse" >Fecha
                                <span ng-class="sortType != 'fecha_solicitud' ? 'icon-unsorted' : sortType == 'fecha_solicitud' && !sortReverse ? ' icon-sort-amount-asc' : sortType == 'fecha_solicitud' && sortReverse ? 'icon-sort-amount-desc': ''"></span>
                              </i>  
                            </th>
                            <th class="text-center w150px">
                              <i ng-click="sortType = 'cantidad'; sortReverse = !sortReverse" >Cantidad
                                <span ng-class="sortType != 'cantidad' ? 'icon-unsorted' : sortType == 'cantidad' && !sortReverse ? ' icon-sort-amount-asc' : sortType == 'cantidad' && sortReverse ? 'icon-sort-amount-desc': ''"></span>
                              </i>
                            </th>
                             <th class="text-center">Descripción</th>
                            <!--<th >
                              <i ng-click="sortType = 'total'; sortReverse = !sortReverse" >Total (<i class="fab fa-ethereum"></i> )
                                <span ng-class="sortType != 'total' ? 'icon-unsorted' : sortType == 'total' && !sortReverse ? ' icon-sort-amount-asc' : sortType == 'total' && sortReverse ? 'icon-sort-amount-desc': ''"></span>
                              </i>
                            </th>
                            <th class="text-center">
                              <i ng-click="sortType = 'estado'; sortReverse = !sortReverse" >Estado</i>
                                <span ng-class="sortType != 'estado' ? 'icon-unsorted' : sortType == 'estado' && !sortReverse ? ' icon-sort-amount-asc' : sortType == 'estado' && sortReverse ? 'icon-sort-amount-desc': ''"></span>
                              </i>
                            </th> -->
                            </tr>
                        </thead>
                        <tbody>
                            <tr >
                                <td >2020-05-30 12:15:12</td>
                                <td class="text-center">0.021000000 <i class="fab fa-ethereum"></i></td>
                                <td class=""> Pago correspondiente al mes de enero de 2020, por la tenencia de 30 participaciones</td> 
                            </tr>
                            <tr >
                                <td >2020-05-30 12:15:12</td>
                                <td class="text-center">0.021000000 <i class="fab fa-ethereum"></i></td>
                                <td class=""> Pago correspondiente al mes de enero de 2020, por la tenencia de 30 participaciones</td> 
                            </tr>
                            <tr >
                                <td >2020-05-30 12:15:12</td>
                                <td class="text-center">0.022000000 <i class="fab fa-ethereum"></i></td>
                                <td class=""> Pago correspondiente al mes de enero de 2020, por la tenencia de 30 participaciones</td> 
                            </tr>
                        </tbody>
                        <tfoot class="bg-gradient-primary text-light">
                            <th>Total</th>
                            <th>0.068000000 <i class="fab fa-ethereum"></i></th>
                            <th></th>
                            <!-- <th>{{(totalActivas * precioParticipacion) | number: 9}} <i class="fab fa-ethereum"></i></th>
                            <th></th> -->
                        </tfoot>
                        </table>
                    </div>      
      </div>
    </div>
  </div> 
  
</div>