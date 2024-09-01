<div loading ng-show="cargando"></div>
<div ng-show="!cargando" class="col-lg-12 grid-margin stretch-card">
    <div class="card">
        <div class="card-body">
            <h2 class=" text-center display-4 text-secondary text-uppercase ">Catálogo de Membresías</h2>
            <hr>
            <p class="card-description">
                <button type="button" class="btn btn-outline-primary btn-icon-text" data-target="#catalogo_membresiaModal" data-toggle="modal" ng-click="ClearForm()">
                    <i class="ti-plus btn-icon-prepend"></i>                                                    
                    Agregar
                </button>
            </p>
            <div class="row">
                <div class="col-md-12 grid-margin stretch-card" ng-repeat="item in List">
                            <div class="card bg-light border-bottom-0"><div style="position: absolute; inset: 0px; overflow: hidden; pointer-events: none; visibility: hidden; z-index: -1;" class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;"><div style="position:absolute;width:1000000px;height:1000000px;left:0;top:0"></div></div><div class="chartjs-size-monitor-shrink" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;"><div style="position:absolute;width:200%;height:200%;left:0; top:0"></div></div></div>
                                <div class="card-body pb-0">
                                    <p class="card-title">Membresía {{item.nombre}}</p>
                                    <h5 class="text-muted font-weight-light text-justify">{{item.descripcion}}</h5>
                                    <hr>
                                    <h5 class="text-left text-muted font-weight-light text-justify">BENEFICIOS</h5>

                                    <div class="row">
                                        <div class="col-md-3">
                                            <p class=" text-muted">Descuento Compra Mayorista</p>
                                            <h4 class=" text-danger">{{item.descuento_compra_mayorista}} %</h4>
                                            <hr>
                                        </div>
                                        <div class="col-md-3">
                                            <p class=" text-muted">Cash/Back Compras</p>
                                            <h4 class=" text-danger">{{item.cash_back_compras}}%</h4>
                                            <hr>
                                        </div>
                                        <div class="col-md-3">
                                            <p class=" text-muted">Cash/Back Publicidad</p>
                                            <h4 class=" text-danger">{{item.cash_back_publicidad}}%</h4>
                                            <hr>
                                        </div>
                                        <div class="col-md-3">
                                            <p class=" text-muted">Retiro Mínimo</p>
                                            <h4 class=" text-danger">{{item.retiro_minimo | currency:'$'}}</h4>
                                            <hr>
                                        </div>
                                        <div class="col-md-3">
                                            <p class=" text-muted">Shipping Nacional</p>
                                            <h4 class=" text-danger">{{item.shipping_nacional}}%</h4>
                                            <hr>
                                        </div>
                                        <div class="col-md-3">
                                            <p class=" text-muted">Loyalty Bonus</p>
                                            <h4 class=" text-danger">{{item.loyalty_bonus}}%</h4>
                                            <hr>
                                        </div>
                                        <div class="col-md-3">
                                            <p class=" text-muted">Cantidad de Retiros</p>
                                            <h4 ng-show="item.cantidad_retiros >= 0" class=" text-danger">{{item.cantidad_retiros}}</h4>
                                            <h4 ng-show="item.cantidad_retiros < 0" class=" text-danger">Ilimitado</h4>
                                            <hr>
                                        </div>
                                        <div class="col-md-3">
                                            <p class=" text-muted">Publicar en Tienda</p>
                                            <h4 ng-show="item.publicar_tienda > 0" class=" text-danger">{{item.publicar_tienda}} productos</h4>
                                            <h4 ng-show="item.publicar_tienda == 0" class=" text-danger">No</h4>
                                            <h4 ng-show="item.publicar_tienda < 0" class=" text-danger">Ilimitado</h4>
                                            <hr>
                                        </div>

                                        <div class="col-md-3">
                                            <p class=" text-muted">Trading Afiliados</p>
                                            <h4 class=" text-danger">{{item.trading_afiliados}}%</h4>
                                            <hr>
                                        </div>
                                        <div class="col-md-3">
                                            <p class=" text-muted">Cash/Back Viajes</p>
                                            <h4 class=" text-danger">{{item.cash_back_viajes}}%</h4>
                                            <hr>
                                        </div>
                                        <div class="col-md-3">
                                            <p class=" text-muted">Black Day</p>
                                            <h4 class=" text-danger">{{item.black_day}}%</h4>
                                            <hr>
                                        </div>
                                        <div class="col-md-3">
                                            <p class=" text-muted">Publicar Sorteos</p>
                                            <h4 ng-show="item.publicar_sorteo==1" class=" text-danger">SI</h4>
                                            <h4 ng-show="item.publicar_sorteo == 0" class=" text-danger">NO</h4>
                                            <hr>
                                        </div>
                                        <div class="col-md-3">
                                            <p class=" text-muted">Tarjeta de Débito</p>
                                            <h4 ng-show="item.tarjeta_debito != 0" class=" text-danger">{{item.tarjeta_debito}}%</h4>
                                            <h4 ng-show="item.tarjeta_debito == 0" class=" text-danger">GRATIS</h4>
                                            <hr>
                                        </div>
                                        <div class="col-md-3">
                                            <p class=" text-muted">Tarjeta de Asociado</p>
                                            <h4 class=" text-danger">GRATIS</h4>
                                            <hr>
                                        </div>
                                        <div class="col-md-3">
                                            <p class=" text-muted">Decal</p>
                                            <h4 class=" text-danger">{{item.decal}}</h4>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer  bg-dark">
                                    <button type="button" class="btn btn-xs btn-outline-warning"  data-target="#catalogo_membresiaModal" data-toggle="modal" ng-click="CargarDatos(item);"><span class="mr-1 ti-pencil"></span>Modificar</button>
                                    <button type="button" class="btn btn-xs btn-outline-danger" ng-click="Eliminar(item)"><span class="mr-1 ti-trash"></span>Eliminar</button>
                            </div>
                                <!-- <canvas id="order-chart" class="w-100 chartjs-render-monitor" style="display: block; width: 372px; height: 185px;" width="372" height="185"></canvas> -->
                            </div>
                        </div>
                </div>
            </div>
        </div>
    </div>
</div>


<div class="modal fade" id="catalogo_membresiaModal" tabindex="-1" membresiae="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                <form name="catalogo_membresiaForm" id="catalogo_membresiaForm">
                    <div class="modal-dialog modal-lg" membresiae="document">
                        <div class="modal-content ">
                            <div class="modal-header bg-light">
                                <h5 class="modal-title" id="exampleModalLabel">Agregar Membresía</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body container">
                                <form class="form-sample">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label for="nombre">Nombre de la MEMBRESÍA</label>
                                                <input type="hidden" class="form-control" aria-label="catalogo_membresia_id" name="catalogo_membresia_id" id="catalogo_membresia_id" ng-model="newItem.catalogo_membresia_id">
                                                <input type="text" class="form-control" aria-label="nombre" name="nombre" id="nombre" ng-model="newItem.nombre" required>
                                            </div>
                                        </div>    
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label for="descripcion">Descripción</label>
                                                <textarea class="form-control" aria-label="descripcion" name="descripcion" id="descripcion" ng-model="newItem.descripcion" required></textarea>
                                            </div>
                                        </div>    
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <h4 class="card-title text-secondary">Beneficios (descuentos y nuevas opciones)</h4>
                                            <p>Para establecer valor Ilimitado ingrese el valor "-1"</p>
                                            <hr>
                                        </div>    
                                    </div>

                                    <div class="row">
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label for="compra_mayorista">Compra Mayorista</label>
                                                <input type="text" class="form-control" aria-label="compra_mayorista" name="compra_mayorista" id="compra_mayorista" ng-model="newItem.descuento_compra_mayorista">
                                            </div>
                                        </div>    
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label for="cb_publicidad">Cash/Back Publicidad</label>
                                                <input type="text" class="form-control" aria-label="cb_publicidad" name="cb_publicidad" id="cb_publicidad" ng-model="newItem.cash_back_publicidad">
                                            </div>
                                        </div>    
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label for="cb_compras">Cash/Back Compras</label>
                                                <input type="text" class="form-control" aria-label="cb_compras" name="cb_compras" id="cb_compras" ng-model="newItem.cash_back_compras">
                                            </div>
                                        </div>    
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label for="retiro_minimo">Retiro Mínimo</label>
                                                <input type="text" class="form-control" aria-label="retiro_minimo" name="retiro_minimo" id="retiro_minimo" ng-model="newItem.retiro_minimo">
                                            </div>
                                        </div>    
                                    </div>
                                    <div class="row">
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label for="shipping_nacional">Shipping Nacional</label>
                                                <input type="text" class="form-control" aria-label="shipping_nacional" name="shipping_nacional" id="shipping_nacional" ng-model="newItem.shipping_nacional">
                                            </div>
                                        </div>    
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label for="loyalty_bonus">Loyalty Bonus</label>
                                                <input type="text" class="form-control" aria-label="loyalty_bonus" name="loyalty_bonus" id="loyalty_bonus" ng-model="newItem.loyalty_bonus">
                                            </div>
                                        </div>    
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label for="cantidad_retiros">Cantidad de Retiros</label>
                                                <input type="text" class="form-control" aria-label="cantidad_retiros" name="cantidad_retiros" id="cantidad_retiros" ng-model="newItem.cantidad_retiros">
                                            </div>
                                        </div>    
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label for="publicar_tienda">Publicación en Tienda</label>
                                                <input type="text" class="form-control" aria-label="publicar_tienda" name="publicar_tienda" id="publicar_tienda" ng-model="newItem.publicar_tienda">
                                            </div>
                                        </div>    
                                    </div>
                                    <div class="row">
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label for="trading">Trading Afiliados</label>
                                                <input type="text" class="form-control" aria-label="trading" name="trading" id="trading" ng-model="newItem.trading_afiliados">
                                            </div>
                                        </div>    
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label for="cb_viajes">Cash/Back Viajes</label>
                                                <input type="text" class="form-control" aria-label="cb_viajes" name="cb_viajes" id="cb_viajes" ng-model="newItem.cash_back_viajes">
                                            </div>
                                        </div>    
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label for="black_day">Black Day</label>
                                                <input type="text" class="form-control" aria-label="black_day" name="black_day" id="black_day" ng-model="newItem.black_day">
                                            </div>
                                        </div>    
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label for="decal">Decal</label>
                                                <input type="text" class="form-control" aria-label="decal" name="decal" id="decal" ng-model="newItem.decal">
                                            </div>
                                        </div>    
                                    </div>
                                    <div class="row">
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label for="tar_debito">Tarjeta de Débito</label>
                                                <input type="text" class="form-control" aria-label="tar_debito" name="tar_debito" id="tar_debito" ng-model="newItem.tarjeta_debito">
                                            </div>
                                        </div>    
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label for="tar_asociado">tarjeta Asociado</label>
                                                <input type="text" class="form-control" aria-label="tar_asociado" name="tar_asociado" id="tar_asociado" ng-model="newItem.tarjeta_asociado">
                                            </div>
                                        </div>    
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label></label>
                                                <div class="form-check form-check-primary">
                                                    <label class="form-check-label">
                                                    <input type="checkbox" class="form-check-input" checked="" id="publicar_sorte" name="publicar_sorteo" ng-model="newItem.publicar_sorteo">
                                                        Publicar Sorteos
                                                    <i class="input-helper"></i></label>
                                                </div>
                                            </div>
                                        </div>    
                                    </div>
                                </form>

                                </div>
                            <div class="modal-footer bg-dark">
                                <button type="button" class="btn btn-outline-light" data-dismiss="modal" ><span></span>Cancelar</button>
                                <button ng-show="transaction=='new'" type="button" class="btn  btn-outline-primary" ng-disabled="catalogo_membresiaForm.$invalid" ng-click="Guardar();" data-dismiss="modal"><span class="mr-1 ti-check"></span>Guardar</button>
                                <button ng-show="transaction=='edit'" type="button" class="btn  btn-outline-primary" ng-disabled="catalogo_membresiaForm.$invalid" ng-click="Guardar();" data-dismiss="modal"><span class="mr-1 ti-check"></span>Guardar</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>