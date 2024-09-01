<div loading ng-show="cargando"></div>
<div class="container-fluid">
  <div class="row mb-4" ng-class="{'w_row_referidos': Sponsor != null">
    <div class="col-lg-5 col-xl-3 mx-auto">
      <div class="card-backoffice text-center" tooltip-placement="top" uib-tooltip="Aquí tendrás toda la información de tus referidos directos">
        <font color="">Mis Directos</font>
      </div>
    </div>
    <!-- <div ng-show="Referidos <= 0" class="=text-center" tooltip-placement="top" uib-tooltip="Aquí tendrás toda la información de tus referidos directos">
          <img src="lib/images/about-img.png" alt="">
      </div> -->
  </div>
  <div ng-show="Sponsor != null" ng-class="{'w_row_referidos': Sponsor != null" class="col-md-2 col-lg-3 col-xl-2 grid-margin stretch-card sponsor_card menu_principal">

              <div class="m-0 card-backoffice h-auto">
                <div class="card-body">
                  <p class="card-title text-center text-dark p-0 m-0"><b> Mi Patrocinador</b></p>
                  <p class="card-title text-center text-dark data-backoffice"> {{Sponsor.nombre_usuario | uppercase}}</p>
                  <div class="h-auto d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
                    <img class="card-img-top img-thumbnail" src="{{Sponsor.foto}}" alt="Card image" style="width:100%; height:100%;margin-bottom:0">
                    <img class="flag corner-left"  src="lib/images/flags/{{Sponsor.pais | lowercase}}.png">
                  </div>
                  <!-- <p class="m-0 text-dark  text_bold">{{Sponsor.nombre}}</p> -->
                  <!-- <small class="text-muted mb-2 mb-xl-0">{{Sponsor.apellidos}}</small> -->
                  <div class="w-100 mt-3">
                    <img class="img-sm" src="lib/images/escudos/{{Sponsor.rango}}.png" alt="">
                    <img class="img-sm" src="lib/images/pages/{{Sponsor.categoria}}.png" alt="">
                  </div>
                </div>
              </div>
      </div>
    	<div  ng-class="{'w_row_referidos': Sponsor != null}"  class="row">
          <div ng-class="{'col-lg-4 col-xl-2': Sponsor != null}" class=" col-lg-3 col-xl-2 grid-margin stretch-card" ng-repeat="item in Referidos | filter:search:strict" ng-show="item.usuario_id != item.parentId">
              <div class="m-0 card-backoffice h-auto">
                <div class="card-body p-1">
                  <!-- <p class="card-title text-md-center text-xl-left">Sales</p> -->
                  <!-- <ul class="grid cs-style-3 p-0">
                        <li>
                          <figure>
                            <div class="h-auto d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
                              <img class="card-img-top " src="{{item.foto}}" alt="Card image" style="width:100%; height:100%;margin-bottom:0">
                              <img class="flag corner-left"  src="lib/images/flags/{{item.pais}}.png">
                            </div>
                            <figcaption>
                              <div class="row w-100">
                              <div class=" col-lg-3 col-xl-3 mx-auto" style=""><a href="" class="user_options" ><i class=" ti-info-alt  "tooltip-placement="right" uib-tooltip="Ver más información de {{item.nombre}}"></i></a></div>
                              <div class=" col-lg-3 col-xl-3 mx-auto" style=""><a href="" class="user_options"><i class=" ti-comment-alt "  tooltip-placement="top" uib-tooltip="Envíale un mensaje a {{item.nombre}}"></i></a></div>
                              <div class=" col-lg-3 col-xl-3 mx-auto" style=""><a href="" class="user_options"><i class=" icon-transfer_within_a_station "  tooltip-placement="left" uib-tooltip="Transfiere puntos a {{item.nombre}}"></i></a></div>
                              </div>
                            </figcaption>
                          </figure>
                        </li>
                  </ul> -->

                  <!-- <p class="m-0 text-dark  text_bold">{{item.nombre}}</p>
                  <small class="text-muted mb-2 mb-xl-0">{{item.apellidos}}</small>
                  <div class="w-100 mt-3">
                    <img class="img-sm" src="lib/images/escudos/{{item.rango}}.png" alt="">
                    <img class="img-sm" src="lib/images/pages/{{item.categoria}}.png" alt="">
                  </div>
                   -->
                   <div class="h-auto d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
                    <img class="card-img-top img-thumbnail" src="{{item.foto}}" alt="Card image" style="width:100%; height:100%;margin-bottom:0">
                    <img class="flag corner-left"  src="lib/images/flags/{{item.pais | lowercase}}.png">
                  </div>  

                  <p class="m-0 text-dark  text_bold">{{item.nombre}}</p>
                  <small class="text-muted mb-2 mb-xl-0">{{item.apellidos}}</small>
                  <div class="w-100 mt-3">
                    <img class="img-sm" src="lib/images/escudos/{{item.rango}}.png" alt="">
                    <img class="img-sm" src="lib/images/pages/{{item.categoria}}.png" alt="">
                  </div>

                </div>
                <div class="w-100 p-1 align-right text-right ">
                              <a href="" ng-click="GetInfoMisReferidos(item.usuario_id);"  data-toggle="modal" data-target="#modalInfo{{item.usuario_id}}" class="user_options"  tooltip-placement="top" uib-tooltip="Ver más información de {{item.nombre}}"><i class="text-primary ti-info-alt"></i></a>
                              <a href="" id="msg-dlg" ng-click="ShowFrmMessage(item);"  class="user_options"  tooltip-placement="top" uib-tooltip="Envíale un mensaje a {{item.nombre}}"><i class="text-success ti-comment-alt"></i></a>
                              <a href="" class="user_options" tooltip-placement="top" uib-tooltip="Transfiere puntos a {{item.nombre}}"><i class="text-warning icon-transfer_within_a_station"></i></a>

                
                 </div>


                <div class="modal fade" id="modalInfo{{item.usuario_id}}" style="opacity:0.9">
                      <div class="modal-dialog modal-lg">
                        <div class="modal-content" style="border: 0px solid rgba(0,0,0,.2); background-color:transparent;">
                          <!-- Modal body -->
                          <div class="modal-body">
                            <div class="card-backoffice">            
                              <div class="">
                                <div class="align-left">
                                  <img class="w-25 img-thumbnail img-circle" src="{{item.foto}}" alt="">
                                </div>
                                <div class="align-left p-1">
                                  <h4>{{item.nombre}} {{item.apellidos}} </h4>
                                </div>
                                <div class="align-left p-1">
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
                                  <table class="table table table-striped table-bordered"> 
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
              </div>
            </div>
            <div id="msgData" class="msg-globe">
              <div class="msg-globe-close"><a href="" class="icon-close" ng-click="HideFrmMessage()"></a></div>
              <div class="msg-globe-header">
                Envíale un mensaje a  <b>{{msgUser.nombre | uppercase}}</b>
              </div>
              <div>
                <!-- <form class="form-1">
                  <input type="text" class="form-control">
                  <textarea name="" id="" cols="" rows="5" class="form-control"></textarea>
                  
                </form> -->
                <div id="sendUserMsg" ng-show="!frmMsg.$invalid" ng-click="SendUserMsg()" tooltip-placement="left" uib-tooltip="Haz click para enviar el mensaje">
                      <a role="button"  href=""  class=""><i class="icon-send2 "></i> </a> 
                </div>
             

                <form class="form-1 "   name="frmMsg" id="frmMsg" style="padding-top: 10px; z-index:20000;">
                            <p class="field">
                                <input type="text" name="asunto" placeholder="Asunto" ng-model="msgUser.asunto" required>
                                <i class="icon-message"></i>
                            </p>
                            <p class="field">
                              <textarea rows="15" type="text" placeholder="Mensaje" ng-model="msgUser.mensaje" required>                      
                            </p>
                  </form>   
                           
                </div>   
            </div>
         </div>
         