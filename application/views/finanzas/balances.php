<div class="container-fluid">
  
    <div class="row">
        <div class="col-lg-4 mx-auto">
        <div class="card-backoffice text-center" tooltip-placement="top" uib-tooltip=""> 
            <font color="">BALANCES</font> 
        </div>
        </div>
    </div>    
    <div ng-show="!cargando" class="row mt-3">
            <div class="col-md-1 col-xl-1 p-4"></div>
            <div class="col-md-5 col-xl-4   mx-auto">
              <div class="card-backoffice h-auto" >
                <div class="row">
                    <div class="col-md-7 col-xl-6 col-xs-12 col-sm-5 mx-auto data-backoffice w-75 h-auto text-center">
                        Balance de Participaciones
                    </div>
                </div>  
                <div class="row">
                    <div class="col-md-11 col-xl-9 col-xs-11 col-sm-10 mx-auto">
                        <div class="pt-3 table-responsive" >
                            <table class="table table-condensed" >
                                <tr>
                                    <td  class="w-50 p-0" rowspan="2">
                                        <img class="w70px float-right"  src="lib/images/participacion.png" alt="">
                                    </td>
                                    <td class="w-25 text-right">
                                        <p class="text-dark"><b>Participaciones</b></p> 
                                        <input type="text"  class="float-right text-right p-2" style="width: 70px; font-size:10pt;" value="25">
                                    </td>
                                    <td class="w-25 text-right">
                                        <p class="text-dark"><b>Saldo Actual &nbsp;&nbsp;</b> </p> 
                                        <input type="text"  class="p-2 text-right w100px" style="font-size:10pt;" value="0.025658700">
                                        <i class=" fab fa-ethereum"></i>
                                    </td>
                                </tr>
                            </table>
                            <hr>
                            <p class="text-dark text-center">
                                EL balance de Participaciones puede ser utilizado en retiros o en la compra de participaciones.
                            </p>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4 col-xs-5 mx-auto"><button class="btn btn-sm btn-primary biselado biselado_primary h-auto  data-backoffice">Retiro</button></div>
                    <div class="col-md-4 col-xs-5 mx-auto"><button class="btn btn-sm btn-primary biselado biselado_primary h-auto  data-backoffice">Compra</button></div>
                </div>  
            </div>
            </div>
            <div class="col-md-5 col-xl-4  mx-auto">
              <div class="card-backoffice h-auto">
                <div class="row">
                    <div class="col-md-7 col-xl-6 col-xs-12 col-sm-5 mx-auto data-backoffice w-75 h-auto text-center">
                        Balance de Planes
                    </div>
                </div>  
                <div class="row">
                    <div class="col-md-11 col-xl-9 col-xs-11 col-sm-10 mx-auto">
                        <div class="pt-3 table-responsive" >
                            <table class="table table-condensed" >
                                <tr>
                                    <td  class="w-25 p-0" rowspan="2">
                                        <img class="w70px float-right"  src="lib/images/escudos/sin rango.png" alt="">
                                    </td>
                                      <td class="w-50 text-left">
                                        <p class="text-dark"><b>&nbsp;&nbsp; Planes</b></p> 
                                        <input type="text"  class="float-left text-right p-2" style="width: 70px; font-size:10pt;" value="1">
                                    </td>
                                  
                                    <td class="w-25 text-right">
                                        <p class="text-dark"><b>Saldo Actual &nbsp;&nbsp;</b> </p> 
                                        <input type="text"  class="p-2 text-right w100px" style="font-size:10pt;" value="0.025658700">
                                        <i class=" fab fa-ethereum"></i>
                                    </td>
                                </tr>
                            </table>
                            <hr>
                            <p class="text-dark text-center">
                                EL balance de Planes puede ser utilizado en retiros o en la compra de participaciones.
                            </p>
                        </div>
                    </div>
                </div> 
                <div class="row">
                    <div class="col-md-4 col-xs-5 mx-auto"><button class="btn btn-sm btn-primary biselado biselado_primary h-auto  data-backoffice">Retiro</button></div>
                    <div class="col-md-4 col-xs-5 mx-auto"><button class="btn btn-sm btn-primary biselado biselado_primary h-auto  data-backoffice">Compra</button></div>
                </div>    
              </div>
            </div>
            <div class="col-md-1 col-xl-1"></div>
    </div>
    <div class="row pb-4">
            <div class="col-md-5 col-xl-4   mx-auto">
              <div class="card-backoffice h-auto" >
              <div class="row">
                    <div class="col-md-7 col-xl-6 col-xs-12 col-sm-5 mx-auto data-backoffice w-75 h-auto text-center">
                        Balance de Comisiones
                    </div>
                </div>  
                <div class="row">
                    <div class="col-md-11 col-xl-9 col-xs-11 col-sm-10 mx-auto">
                    <div class="pt-3 table-responsive" >
                            <table class="table table-condensed" >
                                <tr>
                                    <td class="w-25 text-left">
                                        <img class="w70px float-right"  src="lib/images/participacion.png" alt="">
                                    </td>
                                    <td  class="w-50 p-0" rowspan="2">
                                        <img class="w70px float-left"  src="lib/images/escudos/sin rango.png" alt="">
                                    </td>
                                    <td class="w-25 text-right">
                                        <p class="text-dark"><b>Saldo Actual &nbsp;&nbsp;</b> </p> 
                                        <input type="text"  class="p-2 text-right w100px" style="font-size:10pt;" ng-model="balance_comisiones">
                                        <i class=" fab fa-ethereum"></i>
                                    </td>
                                </tr>
                            </table>
                            <hr>
                            <p class="text-dark text-center">
                                EL balance de Comisiones puede ser utilizado en retiros o en la compra de participaciones.
                            </p>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4 col-xs-5 mx-auto"><button class="btn btn-sm btn-primary biselado biselado_primary h-auto  data-backoffice">Retiro</button></div>
                    <div class="col-md-4 col-xs-5 mx-auto"><button class="btn btn-sm btn-primary biselado biselado_primary h-auto  data-backoffice">Compra</button></div>
                </div>  
              </div>
            </div>
    </div>
</div>