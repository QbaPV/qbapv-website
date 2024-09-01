<script>
window.scroll({
  top: 100,
  left: 100,
  behavior: 'smooth'
});
</script>
<div class="container-fluid">
  <div class="row">
    <div class="col-lg-5"></div>
    <div class="col-lg-4">
      <div class="card-backoffice text-center" tooltip-placement="top" uib-tooltip="Contiene la información de tus datos personales"> 
        <font color="">PERFIL</font> 
      </div>
    </div>
  </div>

  <div class="row ">
          <div class="col-lg-3 card-backoffice">
              <img id="profileclick"  class="card-img-top" src="{{userData.foto}}" alt="Foto de Perfil" style="width:100%;margin-bottom:0; cursor:pointer;" tooltip-placement="top" uib-tooltip="Haz click sobre la imagen si deseas cambiarla">
              <div class="card-body">                              
                  <table> 
                    <tr>
                      <td style="width: 75%;">Tu Rango</td>   
                      <td>
                        <img ng-show="userData.rango!='sin rango'" class="img-md"  src="lib/images/escudos/{{userData.rango}}.png" alt=" Rango" tooltip-placement="top" uib-tooltip="Rango {{userData.rango | uppercase}}: recibes comisiones de ??% por cada compra que realicen referidos directos">
                        <img ng-show="userData.rango=='sin rango'" class="img-md"  src="lib/images/escudos/{{userData.rango}}.png" alt=" Rango" tooltip-placement="top" uib-tooltip="NO TIENES RANGO: No recibirás comisiones">
                      </td>
                    </tr> 
                    <tr>
                      <td>Tu Categoría</td>   
  	                  <td>
                        <img ng-show="userData.categoria!=0" class="img-md"  src="lib/images/pages/{{userData.categoria}}.png" alt=" Categoría" tooltip-placement="bottom" uib-tooltip="Categoría {{userData.categoria | uppercase}}: recibes las comisiones correspondientes que brinda el Loyalty Program">
                        <img ng-show="userData.categoria==0" class="img-md"  src="lib/images/pages/{{userData.categoria}}.png" alt=" Categoría" tooltip-placement="bottom" uib-tooltip="NO TIENES CATEGORÍA: No recibirás comisiones">
                      </td>
                    </tr>                                                    
                  </table>
                  <hr>
                  <a href="javascript:void(0)" class="btn  btn-outline-primary biselado biselado_primary btn-block"  data-toggle="modal" data-target="#changePassModal" uib-tooltip="Haz click aquí si quieres cambiar tu contraseña.">Cambiar Contraseña</a> 
              </div>
          </div>
      
          <div class="col-lg-9">
              <div class="row">
                  <div class="col-lg-1"></div>
                  <div class="col-lg-4 card-backoffice">
                    <div class="form-group">
                          <label>Nombre </label>
                          <div class="input-group">
                            <input type="text" class="form-control data-backoffice" ng-model="userData.nombre" readonly >
                          </div>
                    </div>
                  </div>
                  <div class="col-lg-1" style="max-width:3%;"></div>
                  <div class="col-lg-4  card-backoffice">
                      <div class="form-group">
                        <label>Segundo Nombre</label>
                        <div class="input-group">
                          <input type="text" class="form-control data-backoffice" ng-model="userData.apellidos  " readonly >
                        </div>
                    </div>
                  </div>
              </div>
              <div class="row">
                  <div class="col-lg-1"></div>
                  <div class="col-xs-12 col-lg-9 card-backoffice margin-backoffice-adjust">
                    <div class="form-group">
                          <label>Apellidos </label>
                          <div class="input-group">
                            <input type="text" class="form-control data-backoffice" ng-model="userData.apellidos" readonly >
                          </div>
                    </div>
                  </div>
              </div>
              <div class="row">
                <div class="col-lg-1"></div>
                <div class="col-lg-3 card-backoffice" >
                        <div class="form-group">
                          <label>Usuario</label>
                          <div class="input-group">
                            <input type="text" class="form-control data-backoffice" ng-model="userData.nombre_usuario" readonly >
                            <div class="input-group-append">
                              <button class="btn data-backoffice h83" >
                                <i class="ti-user"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                </div>
                <div class="col-lg-1" style="max-width:3%;"></div>
                <div class="col-lg-7 card-backoffice" style="margin-right: 0px;">
                  <div class="form-group">
                    <label>Email</label>
                    <div class="input-group">
                      <input type="text" class="form-control data-backoffice" ng-model="userData.email" readonly >
                      <div class="input-group-append">
                        <button class="btn data-backoffice h83" >
                          <i class="ti-email"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
              <div class="col-lg-1"></div>
                <div class="col-lg-4 card-backoffice" style="margin-right: 0px;">
                  <div class="form-group">
                      <label>Número de Teléfono</label>
                      <div class="input-group">
                        <input type="text" class="form-control data-backoffice" ng-model="userData.telefono" >
                        <div class="input-group-append">
                          <button class="btn data-backoffice h83" >
                            <i class="icon-phone"></i>
                          </button>
                        </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-1" style="max-width:3%;"></div>
                <div class="col-lg-4 card-backoffice" style="margin-right: 0px;">
                  <div class="form-group">
                    <label>Fecha de Nacimiento</label>
                    <div class="input-group">
                      <input id="birthdate" name="birthdate" class="form-control data-backoffice" type="date" ng-model="userData.fecha_nacimiento"  ng-disabled="!empty.fecha_nacimiento" value="{{userData.fecha_nacimiento}}" placeholder="" >
                      <div class="input-group-append">
                        <button id="calendarBtn" class="btn data-backoffice date-h83">
                          <i class="icon-calendar"></i>     
                        </button>
                      </div>
                    </div>
                  </div>  
                </div>
              </div>
              <div class="row">
              <div class="col-lg-1"></div>
                <div class="col-lg-3 card-backoffice" style="margin-right: 0px;">
                  <label class="text-12">Sexo</label>
                  <div class="form-group">
                    <div class="form-check">
                      <label class="form-check-label">
                      <input type="radio" class="form-check-input" name="sexo" id="sexoM" value="M" ng-model="userData.sexo"  checked="">
                        Masculino
                        <i class="input-helper"></i></label>
                    </div>
                    <div class="form-check">
                      <label class="form-check-label">
                      <input type="radio" class="form-check-input" name="sexo" id="sexoF" value="F" ng-model="userData.sexo">
                        Femenino
                        <i class="input-helper"></i></label>
                    </div>                    
                  </div>  
                </div>
              </div>
              <div class="row">
                  <div class="col-lg-1"></div>
                  <div class="col-lg-12 card-backoffice margin-backoffice-adjust-direccion">
                        <div class="form-group">
                          <label>Dirección</label>
                          <div class="input-group">
                            <input type="text" class="form-control data-backoffice" ng-model="userData.direccion"  >
                          </div>
                        </div>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-1"></div>
                <div class="col-lg-5  card-backoffice">
                  <div class="form-group">
                    <label>Ciudad </label>
                    <div class="input-group">
                      <input type="text" class="form-control data-backoffice" ng-model="userData.ciudad"  ng-disabled="!empty.ciudad">
                    </div>
                  </div>
                </div>
                <div class="col-lg-1" style="max-width:3%;"></div>
                <div class="col-lg-5 card-backoffice">
                  <div class="form-group">
                    <label>Estado</label>
                  <div class="input-group">
                    <input type="text" class="form-control data-backoffice" ng-model="userData.provincia" ng-disabled="!empty.estado">
                  </div>
                </div>
              </div>
              </div>

              <div class="row">
                <div class="col-lg-1"></div>
                <div class="col-lg-5  card-backoffice">
                  <div class="form-group">
                    <label>País </label>
                    <!-- <input type="text" name="paisTxt" id="paisTxt" class="form-control data-backoffice" > -->
                    <div class="input-group">
                      <select  id="paises" name="paises" class="form-control data-backoffice" ng-model="userData.pais" required disabled>
                        <option ng-repeat="itempais in paises" value="{{itempais.iso}}">
                          {{itempais.name}}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="col-lg-1" style="max-width:3%;"></div>
                <div class="col-lg-5 card-backoffice">
                        <div class="form-group">
                          <label>Código Postal</label>
                          <div class="input-group">
                            <input type="text" class="form-control data-backoffice" ng-model="userData.codigo_postal" ng-disabled="!empty.codigo_postal">
                          </div>
                        </div>
                </div>
              </div>
              <div class="row">
                  <div class="col-lg-1"></div>
                  <div class="col-lg-12 card-backoffice margin-backoffice-adjust-direccion">
                        <div class="form-group">
                          <label>Dirección de los procesadores de retiro</label>
                          <div class="input-group p-0 pr-2  data-backoffice h-auto">
                              <span style="width: 35px;" class="pl-3 mt-3" >
                                Bitcoin: 
                              </span>
                              <input type="text" id="txt_btc" class="input_retiro text-retiro-backoffice" style="font-size: 12pt; font-weight: bold;" ng-model="userData.btc_wallet" ng-disabled="!empty.btc_wallet">
                          </div>
                          <div class="input-group p-0 pr-2  data-backoffice h-auto">
                              <span style="width: 35px;" class="pl-3 mt-3" >
                                Ethereum: 
                              </span>
                              <input type="text" id="txt_eth" class="input_retiro text-retiro-backoffice"  style="font-size: 12pt; font-weight: bold;" ng-model="userData.eth_wallet" ng-disabled="!empty.eth_wallet">
                          </div>
                        </div>
                        <!-- <button ng-show ="userData.btc_wallet!='' || userData.eth_wallet != '' " class="btn btn-danger btn-block" data-toggle="collapse" href="" data-target="#importante" aria-expanded="false" aria-controls="#ui-basic"><i class="icon-warning" ></i> Importante !!!</button> -->
                        <div id="importante" class="container text-danger text-justify ">
                          <p class="text-danger">
                            <i class="icon-warning"></i> Por favor revise cuidadosamente las direcciones de sus billeteras antes de actualizar su información, Ublof no se hace responsable si el usuario introduce una billetera errónea y el retiro no le llega, la responsabilidad de colocar la billetera correcta tanto en Bitcoin como en Ethereum es solo del usuario.
                          </p>
                          <div class="form-check">
                                      <label class="form-check-label text-muted">
                                      <input id="acceptUpdate" type="checkbox" class="form-check-input" required ng-model="acceptUpdate">
                                      Confirmo que he introducido las direcciones correctas y me hago responsable de la veracidad de los datos.
                                      <i class="input-helper"></i></label>
                          </div>
                        </div>
                        
                </div>
              </div>
              <div class="row">
              <div class="col-lg-1"></div>
                <div class="col-lg-4 mx-auto mt-4 ">
                    <div class="form-group">    
                      <button id="btnActualizar" class="btn biselado biselado_light btn-block" ng-click="ActualizarDatos()" uib-tooltip="Haz click aquí para actualizar si haz hecho algún cambio en los campos de arriba.">Actualizar</button>
                    </div>
                </div>
                </div>
              </div>
            </div>
          </div>
  </div>
</div>


  <div style="display:none;">
      <form id="formProfilePhoto">        
          <input type="file" name="file" id="filePhotoInput" accept="image/x-png,image/gif,image/jpeg" />
      </form>
  </div>  




  <!-- Modal Change password -->
  <div class="modal fade" id="changePassModal">
    <div class="modal-dialog modal-md">
      <div class="modal-content">

        <!-- Modal Header -->
        <div class="modal-header bg-info">
          <h5 class="modal-title text-light">Cambiar mi Contraseña</h5>
          <button type="button" class="close" data-dismiss="modal" >&times;</button>
        </div>

        <!-- Modal body -->
        <div class="modal-body">
          <div class="">
          <div class="container">
            <div class="row">
              <div class="col-md-12"> 
                <form name="passform" role="form">
                  <div class="p-4 p-lg-2 border">
                    <div class="form-group row">
                      <div class="col-md-12">
                        <label for="password" class="text-black">Contraseña Actual <span style="color:red;">*</span></label>
                        <input type="password" id="actualPass" name="actualPass" class="form-control" ng-model="usuario.actualPass" required></textarea>
                        <div ng-if="passform.actualPass.$touched">
                          <p ng-show="passform.actualPass.$error.required" class="error-msg">Introduzca la contraseña actual</p>
                        </div>
                      </div>
                    </div>
                    <div class="form-group row">
                      <div class="col-md-12">
                        <label for="newPass" class="text-black">Contraseña Nueva <span style="color:red;">*</span></label>
                        <input type="password" class="form-control" id="newPass" name="newPass" ng-model="usuario.newPass" required="Requerido" ng-minlength="6">
                        <div ng-if="passform.newPass.$touched ">
                          <p ng-show="passform.newPass.$error.required" class="error-msg">Introduzca la contraseña nueva</p>
                          <p ng-show="passform.newPass.$error.minlength" class="error-msg">La contraseña debe contener mínimo 6 caracteres.</p>
                        </div>
                      </div>
                    </div>
                    <div class="form-group row">
                      <div class="col-md-12">
                        <label for="confirmPassword" class="text-black">Confirmar Contraseña Nueva <span style="color:red;">*</span></label>
                        <input type="password" class="form-control" id="confirmPassword" name="confirmPassword" ng-model="usuario.confirmPassword" match-password="usuario.newPass" required> 
                        <div ng-if="passform.confirmPassword.$touched">
                          <p ng-show="passform.confirmPassword.$error.required" class="error-msg">Repita la contraseña nueva</p>
                          <p ng-show="passform.confirmPassword.$error.matchPassword && !passform.confirmPassword.$error.required" class="error-msg">Las cotraseñas no coinciden.</p>
                        </div>
                      </div>
                    </div>
                    <div class="form-group row">
                      <div class="col-lg-12">
                        <button class="btn btn-outline-danger btn-md btn-block" ng-disabled="passform.confirmPassword.$error.matchPassword || passform.confirmPassword.$error.required || passform.actualPass.$error.required"  ng-click="ChangePassword();"><i class="icon-check"></i> Cambiar Contraseña</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
