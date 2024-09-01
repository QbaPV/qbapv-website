	<div class="row">
            <div class="col-md-12 grid-margin">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <h4 class="font-weight-bold mb-0">Bono Retroactivo</h4>
                </div>
              </div>
            </div>
    </div>

<div class="">
	<div class="row">
		<div class="col-lg-3">
			<div class="card">
				<div class="card-header">
					<h4 class="card-title">Agregar Monto al Bono Retroactivo</h4>	
				</div>
				<div class="card-body">
					<div class="form-group">
						<div class="input-group">
						
						  <input type="number" class="form-control" style="font-size:14pt; color:#aa02ff;" placeholder="Monto a agregar" aria-label="" ng-model="monto">
						  <div class="input-group-append">
							<button class="btn btn-sm btn-primary" type="button" ng-disabled="monto <= 0" ng-click="Agregar(monto);">Agregar</button>
						  </div>
						</div>
						
					</div>				
				</div>
			</div>
		<div class="card mt-3">
				<div class="card-header">
					<h4 class="card-title">Bono Retroactivo (Saldo Total)</h4>	
				</div>
				<div class="card-body">
					<div class="form-group">
						<div class="input-group ">
						  <span style="font-size:16pt; font-weight:bold; color:brown;"class="float-right text-right">{{monto_total}} <i class="fab fa-ethereum"></i></span>
						</div>
					</div>				
				</div>
			</div>
		</div>
		<div class="col-lg-6">
            <div class="card">
				<div class="card-body">
				<h4 class="card-title">Valores parciales</h4>
				<div class="table-responsive">
					<table class="table table-striped table-condensed">
					<thead>
						<tr>
							<td colspan="3">
								  <small ng-show="List.length > itemsPerPage">
									  <ul  class="d-flex justify-content-center" uib-pagination total-items="List.length" items-per-page="itemsPerPage" ng-model="currentPage" max-size="5" boundary-link-numbers="3"></ul>
								  </small>
							</td>
						</tr>
						<tr>
							<th>
								Fecha
							</th>
							<th class="text-center">
								Monto
							</th>
							<th class="text-right">
								Origen
							</th>						
						</tr>
					</thead>
					<tbody>
						<tr ng-repeat="item in List = (List | filter:buscar:strict) | limitTo:itemsPerPage:itemsPerPage*(currentPage-1) ">
						<td>
							{{item.fecha}} 
						</td>
						<td class="text-center">
							<div class="badge badge-primary rounded">
								{{item.monto}}	
							</div>
						</td>
						<td class="text-right">
							{{item.origen}}
						</td>
						</tr>
					</tbody>
					</table>
				</div>
                </div>
              </div>
        </div>
	
		
	</div>
	
</div>