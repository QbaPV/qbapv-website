<div class=""ng-controller-="participacionesCtrl">
	<div class="row">
		<div class="col-lg-12">
            <div class="card">
				<div class="card-body">
				<h4 class="card-title">Participaciones</h4>
				<div class="table-responsive">
						<table class="table table-striped table-condensed">
							<thead>
							<tr>
							<td colspan="2">
							  <small ng-show="ParticipacionesAll.length > itemsPerPage">
								  <ul  class="d-flex justify-content-center" uib-pagination total-items="ParticipacionesAll.length" items-per-page="itemsPerPage" ng-model="currentPage" max-size="5" boundary-link-numbers="3"></ul>
							  </small>
							</td>
							<td colspan="3">
							  <div class="col-lg-12 col-xs-10 form-group" style="font-size:10pt;">
								<input type="search" name="buscador" id="buscador" class="form-control" placeholder="buscar" ng-model="buscar">
							  </div>
							</td>
						</tr>
								<tr>
									<th>
										Nombre y Apellidos
									</th>
									<th>
										Fecha Compra
									</th>
									<th class="text-center">
										Cantidad
									</th>
									<th class="text-right">
										Precio
									</th>
									<th class="text-right">
										Importe
									</th>
									<th class="text-right">
										Origen
									</th>																
								</tr>
							</thead>
							<tbody>
								<tr ng-repeat="item in ListUser = (ParticipacionesAll | filter:buscar:strict) | limitTo:itemsPerPage:itemsPerPage*(currentPage-1) ">
									<td>
										{{item.nombre}} {{item.apellidos}}
									</td>
									<td>
										{{item.fecha_solicitud}}
									</td>
									
									<td class="text-right">
										<div class="badge badge-primary rounded">
											{{item.cantidad | number:0}} 	
										</div>
									</td>
									<td class="text-right">
										{{item.precio | number: 9}}	<i class="fab fa-ethereum"></i>
									</td>
									<td class="text-right">
										{{item.cantidad * item.precio | number:9}}	<i class="fab fa-ethereum"></i>
									</td>
									<td class="text-right">
										<span ng-show="item.transaction_hash == '0x0'">REGALO</span>
										<span ng-show="item.transaction_hash == '0x000CPn'">BAL. PLANES</span>
										<span ng-show="item.transaction_hash == '0x0000CPt'">BAL. PARTICIPACIONES</span>
										<span ng-show="item.transaction_hash == '0x0000Com'">BAL. COMISIONES</span>
										<a ng-show="(item.transaction_hash != '0x0' && item.transaction_hash != '0x000CPn' && item.transaction_hash != '0x0000CPt' && item.transaction_hash != '0x0000Com') " href="http://www.etherscan.io/tx/{{item.transaction_hash}}" target="blank"><img class="w-50" src="lib/images/logo-ether.png"></a>
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
