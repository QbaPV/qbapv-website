<style>
.has-search .form-control {
    padding-left: 2.375rem;
}

.has-search .form-control-feedback {
    position: absolute;
    z-index: 2;
    display: block;
    width: 2.375rem;
    height: 2.375rem;
    line-height: 2.375rem;
    text-align: center;
    pointer-events: none;
    color: gray;
}
#chart {
    position: relative;
    display: inline-block;
    top: 10px;
    left: 10px;
    height: auto;
    width: 92%;
    border: 0px dashed #aaa;
    border-radius: 5px;
    overflow: hidden;
    text-align: center;
    }

.orgchart .node.matched { background-color: rgba(238, 217, 54, 0.5); }
</style>


<div    class="form-group has-search col-lg-4 col-md-6 col-sm-12 col-xs-12">
        <span class="icon-search form-control-feedback bg-transparent"></span>
        <input type="text" class="form-control text-primary" id="key-word" ng-model="searchFilter" placeholder="escriba un criterio y presione 'Enter'">
</div>    
<div class="chart" id="chart" >   
</div>