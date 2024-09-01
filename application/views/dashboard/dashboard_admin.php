<div class="container" >
	<div class="row">
            <div class="col-md-12 grid-margin">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <h4 class="font-weight-bold mb-0">Dashboard</h4>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
			      <div class="col-md-4  grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <div class="form-group">
                    <p class="card-title text-md-center text-xl-left">Balance Día</p>
				            <div class="input-group">
                      <input id="fecha" name="fecha" class="form-control"  type="date" ng-model="fecha"   value="{{fecha}}" placeholder="" >
                      <div class="input-group-append">
                        <button id="calendarBtn" class="btn">
                          <i class="icon-calendar"></i>     
                        </button>
                      </div>
                    </div>
					<hr>
                  </div>
                  <div class="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
                    <h3 class="mb-0 mb-md-2 mb-xl-0 order-md-1 order-xl-0">{{(balanceInversionDia) | number:9}}</h3>
                    <i class="fab fa-ethereum i"></i>
                  </div>  
                  <hr>
                  <p class="mb-0 mt-2 text-danger">{{balanceInversionDia * 1 | number:9}}<i class="fab fa-ethereum i"></i><span class="text-black ml-1"><small>(Bal. Inversiones)</small></span>  <span class="badge badge-primary float-right">{{balanceInversionDia_usd | number:2}} USD</span></p>
                  <hr>
                  <p class="mb-0 mt-2 text-danger">{{(parcialPlanInvDia) * 1 | number:9}}<i class="fab fa-ethereum i"></i><span class="text-black ml-1"><small> (Inv / Planes) </small></span> <span class="badge badge-primary float-right">{{parcialPlanInvDia_usd | number:2}} USD</span></p>
                  <p class="mb-0 mt-2 text-danger">{{(parcialPartInvDia) * 1 | number:9}}<i class="fab fa-ethereum i"></i><span class="text-black ml-1"><small> (Inv / Participaciones) </small></span> <span class="badge badge-primary float-right">{{parcialPartInvDia_usd | number:2}} USD</span></p>
                </div>
              </div>
            </div>
            <div class="col-md-8 grid-margin stretch-card">
                    <div class="card">
                      <div class="card-body">
                        <p class="card-title text-md-center text-xl-left">Balance Periodo</p>
                        <div class="input-group">
                        <label class="pt-3">Desde</label>
                          <input id="dpfechaInicio" name="dpfechaInicio" class="form-control"  type="date" ng-model="fechaInicio"   value="{{fechaInicio}}" placeholder="" >
                          
                          <label class="pt-3">Hasta</label>
                          <input id="dpfechaFin" name="dpfechaFin" class="form-control" type="date" ng-model="fechaFin"   value="{{fechaFin}}" placeholder="" >
                          <div class="">
                            <button id="calendarBtn" class="ml-2 btn btn-primary btn-md" ng-click="Filtrar();">
                              <i class="ti-filter"></i>     
                            </button>
                          </div>
                        </div>
                        <hr>
                        <div class="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
                          <h3 class="mb-0 mb-md-2 mb-xl-0 order-md-1 order-xl-0">{{balanceInversionRango | number:9}}</h3>
                          <i class="fab fa-ethereum i"></i>
                        </div>  
					<hr>
					<p class="mb-0 mt-2 text-danger">{{(parcialPlanInvRango) * 1 | number:9}}<i class="fab fa-ethereum i"></i><span class="text-black ml-1"><small>(Inv / Planes)</small></span> <span class="badge badge-primary float-right">{{parcialPlanInvRango_usd | number:2}} USD</span></p>
					<p class="mb-0 mt-2 text-danger">{{(parcialPartInvRango) * 1 | number:9}}<i class="fab fa-ethereum i"></i><span class="text-black ml-1"><small>(Inv / Participaciones)</small></span> <span class="badge badge-primary float-right">{{parcialPartInvRango_usd | number:2}} USD</span></p>
				</div>
              </div>
            </div>
          </div>

    <div class="row">
            <!--div class="col-md-3 mx-auto grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <p class="card-title text-md-center text-xl-left">Balance Empresa</p>
                  <div class="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
                    <h3 class="mb-0 mb-md-2 mb-xl-0 order-md-1 order-xl-0">{{balanceEmpresa | number:9 }}</h3>
                    <i class="fab fa-ethereum i"></i>
                  </div>  <hr>
                  <p class="mb-0 mt-2 text-danger">{{parcialPart | number:9}}<i class="fab fa-ethereum i"></i><span class="text-black ml-1"><small>(Participaciones)</small></span></p>
                  <p class="mb-0 mt-2 text-danger">{{parcialPlan | number:9}}<i class="fab fa-ethereum i"></i><span class="text-black ml-1"><small>(Planes)</small></span></p>
                </div>
              </div>
            </div-->
            <!-- <div class="col-md-4 mx-auto grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <p class="card-title text-md-center text-xl-left">Balance Inversiones</p>
                  <div class="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
                    <h3 class="mb-0 mb-md-2 mb-xl-0 order-md-1 order-xl-0">{{balanceInversion | number:9}}</h3>
                    <i class="fab fa-ethereum i"></i>
                  </div>  <hr>
                </div>
              </div>
            </div> -->
			<!-- <div class="col-md-4 mx-auto grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <p class="card-title text-md-center text-xl-left">Inversión - Participaciones.</p>
                  <div class="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
                    <h3 class="mb-0 mb-md-2 mb-xl-0 order-md-1 order-xl-0">{{(parcialPart + parcialPartInv) |number:9}}</h3>
                    <i class="fab fa-ethereum i"></i>
                  </div><hr>  
                </div>
              </div>
            </div>
            <div class="col-md-4 mx-auto grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <p class="card-title text-md-center text-xl-left">inversión - Planes</p>
                  <div class="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
                    <h3 class="mb-0 mb-md-2 mb-xl-0 order-md-1 order-xl-0">{{(parcialPlan + parcialPlanInv) | number:9}}</h3>
                    <i class="fab fa-ethereum i"></i>
                  </div>  
				  <hr>
                </div>
              </div>
            </div> -->
			<!--div class="col-md-3 mx-auto grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <p class="card-title text-md-center text-xl-left">Balance Bruto Total</p>
                  <div class="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
                    <h3 class="mb-0 mb-md-2 mb-xl-0 order-md-1 order-xl-0">{{balanceInversion + balanceEmpresa | number:9}}</h3>
                    <i class="fab fa-ethereum i"></i>
                  </div>  
                 <hr>
                </div>
              </div>
            </div-->
          </div>
		  
		<div class="row">
            
          </div>

</div>
