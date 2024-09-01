
<div class="row mt-3">
    <div class="col-md-2 small">
        <span>Desde: </span>
        <div class="form-group">
                    <div class="input-group align-middle">
                        <input id="birthdate" name="birthdate" class="form-control data-backoffice" style="font-size:10pt;" type="date"  placeholder="" >
                      <div class="input-group-append">
                        <button id="calendarBtn" class="btn data-backoffice date-h83">
                          <i class="icon-calendar"></i>     
                        </button>
                      </div>
                    </div>          
            </div>
    </div>
    <div class="col-md-2 small">
        <span>Hasta: </span>
        <div class="form-group">
                    <div class="input-group align-middle">
                     <input id="birthdate" name="birthdate" class="form-control data-backoffice" style="font-size:10pt;" type="date"  placeholder="" >
                      <div class="input-group-append">
                        <button id="calendarBtn" class="btn data-backoffice date-h83">
                          <i class="icon-calendar"></i>     
                        </button>
                      </div>
                    </div>          
            </div>
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