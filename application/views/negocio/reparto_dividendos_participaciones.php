<div class="">
	<div class="row">
		<div class="col-lg-4">
			<div class="card">
				<div class="card-header">
					<h4 class="card-title">Reparto de Dividendos</h4>	
				</div>
				<div class="card-body">
					<div class="form-group">
						<div class="input-group">
						  <input type="text" class="form-control" placeholder="USD  a repartir" aria-label="" ng-model="monto_distrib">
						  <div class="input-group-append">
							<button class="btn btn-sm btn-primary" type="button" ng-disabled="(monto_distrib) <= 0 || ultimaDistro['estado']==0" ng-click="Distribuir(monto_distrib);">Repartir</button>
						  </div>
						</div>
						
					</div>
					<div class="form-group" ng-show="0">
						<div class="input-group">
						  <input type="text" class="form-control" placeholder="ETH a repartir" aria-label="" ng-model="monto_distrib / cryptos[1].current_price | number: 9" disabled>
						  <div class="input-group-append">
							<button class="btn btn-sm btn-primary" type="button" ng-disabled="(monto_distrib / cryptos[1].current_price) <= 0 || ultimaDistro['estado']==0" ng-click="Distribuir(monto_distrib);">Repartir</button>
						  </div>
						</div>
					</div>

					<div class="card p-2 text-primary text-center">
						<span>Última distribución: ${{ultimaDistro['monto_usd'] | number:2}}  <i ng-show="ultimaDistro['estado']==1" class="ti-check-box"></i><i ng-show="ultimaDistro['estado']==0" class="ti-na"></i></span>
					</div>
				</div>
			</div>
		</div>
		
		<div class="col-lg-8">
			<div class="card">
				<div class="card-header">
					<h4 class="card-title">Historial</h4>	
				</div>
				<div class="card-body">
					<div class="table-responsive">
					<table class="table table-striped table-condensed">
					<thead>
						<tr>
						<th>
							Fecha
						</th>
						<th class="text-right">
							Monto USD
						</th>
						<th class="text-center">
							Total Repartido ETH
						</th>
						<th class="text-center">
							Reparto x Participacion
						</th>
						<th class="text-right">
							Cantidad Particip.
						</th>
						<th class="text-right">
							Distribuido
						</th>
						</tr>
					</thead>
					<tbody>
						<tr ng-repeat="item in distribuciones">
						<td class="py-1 text-center">
							{{item.fecha}}
						</td>
						<td class="text-center">
							${{item.monto_usd | number:2}}
						</td>
						<td class="text-center">
							<div class="badge badge-primary rounded">
								{{item.monto_total | number:9}}	
							</div>
						</td>
						<td class="text-center">
							{{item.monto | number:9}}
						</td>
						
						<td class="text-right">
							<div class="badge badge-primary rounded">
								{{item.cant_participaciones}}	
							</div>
						</td>
						<td class="text-right">
							<div class="badge badge-primary" ng-show="item.estado == 0">NO</div>
							<div class="badge badge-success" ng-show="item.estado == 1">SI</div>
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