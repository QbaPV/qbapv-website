'use strict';
//----------------------------------------------------------
//               COMPARAR DIRECTIVE
//----------------------------------------------------------
AdminApp.directive('compareTo', function () {
  return {
    require: 'ngModel',
    controller: 'adicionarUsuarioCtrl',
    scope: {
      confirmPassword: '=compareTo'
    },
    link: function (scope, element, attributes, modelVal) {
      modelVal.$validators.compareTo = function (val) {
        return val == scope.confirmPassword;
      };
      scope.$watch('confirmPassword', function () {
        modelVal.$validate();
      });
    }
  };
});

'use strict'
AdminApp.directive("matchPassword", function() {
  return {
      require: "ngModel",
      scope: {
          otherModelValue: "=matchPassword"
      },
      link: function(scope, element, attributes, ngModel) {
          ngModel.$validators.matchPassword = function(modelValue) {
              return modelValue == scope.otherModelValue;
          };

          scope.$watch("otherModelValue", function() {
              ngModel.$validate();
          });
      }
  };
});

'use strict'
AdminApp.directive('copyToClipboard', function () {
  return {
      restrict: 'A',
      link: function (scope, elem, attrs) {
          elem.click(function () {
              if (attrs.copyToClipboard) {
                  var $temp_input = $("<input>");
                  $("body").append($temp_input);
                  $temp_input.val(attrs.copyToClipboard).select();
                  document.execCommand("copy");
                  $temp_input.remove();
              }
          });
      }
  };
});

'use strict';
AdminApp.directive('ngRepeatOwlCarousel', function() {
  return {
      restrict: 'A',
      scope: {
          carouselInit: '&'
      },
      link: function(scope, element, attrs) {
          if ((scope.$parent != null) && scope.$parent.$last) {
              console.log(scope.$parent.$last);
              return scope.carouselInit()();
          }
      }
  };
});

'use strict';
//----------------------------------------------------------
//               STARTRATING DIRECTIVE
//----------------------------------------------------------
AdminApp.directive('starRating', function () {
  return {
    restrict: 'A',
    controller: 'shopCtrl',
    template: '<ul class="rating">' +
    '<li ng-repeat="star in stars" ng-class="star">' +
    '\u2605' +
    '</li>' +
    '</ul>',
    scope: {
      ratingValue: '=',
      max: '='
    },
    link: function (scope, elem, attrs) {
      scope.stars = [];
      for (var i = 0; i < scope.max; i++) {
        scope.stars.push({
          filled: i < scope.ratingValue
        });
      }
    }
  }
});


// AdminApp.directive('starRating',function() {
//   return {
//       //This template is used to display the star UX in repeted form.
//       template: '<ul class="rating">' + '   <li ng-repeat="star in stars" ng-class="star" ng-click="toggleFunck($index)">' + '\u2605' + '</li>' + '</ul>',
//       scope: {
//         ratingValue: '=',
//         max: '=',
//         onStarRating: '&'
//       },
//       link: function(scope, elem, attrs) {
//         //This method is used to update the rating run time.
//         var updateRating = function() {
//           //This is global level collection.
//           scope.stars = [];
//           //Loop called with the help of data-max directive input and push the stars count.
//           for (var i = 0; i < scope.max; i++) {
//             scope.stars.push({
//               filled: i < scope.ratingValue
//             });
//           }
//         };
//         //This is used to toggle the rating stars.
//         scope.toggleFunck = function(index) {
//           //This is used to count the default start rating and sum the number of imput index.
//           scope.ratingValue = index + 1;
//           scope.onStarRating({
//             rating: index + 1
//           });
//         };

//         //This is used to watch activity on scope, if any changes on star rating is call autometically and update the stars.
//         scope.$watch('ratingValue', function(oldV, newV) {
//             if (newV) {
//               updateRating();
//             }
//           }
//         );
//       }
//     };
//   }
// );

'use strict';
//----------------------------------------------------------
//               TOUCHSTAR DIRECTIVE
//----------------------------------------------------------
AdminApp.directive('myTouchstar', [function () {
  return function (scope, elem, attrs) {
    elem.on("touchstart mouseover", function (e) {

      scope.$eval(attrs.myTouchstar);
    });
  }
}]);

'use strict';
//----------------------------------------------------------
//               TOUCHCLICK DIRECTIVE
//----------------------------------------------------------
AdminApp.directive('myTouchclick', [function () {
  return function (scope, elem, attrs) {
    elem.on("touchstart click", function (e) {

      scope.$eval(attrs.myTouchclick);
    });
  }
}]);

'use strict';
//----------------------------------------------------------
//               RED DIRECTIVE
//----------------------------------------------------------
// AdminApp.directive('redExpand', function ($http, $compile) {
//   return {
//     scope: {
//       id: '='
//     },
//     link: function (scope, elem, attrs) {
//       elem.bind("click", function (e) {
//         scope.whith = "";
//         scope.w = 0;
//         console.log(e.target);              
//         var x = angular.element($('#'+e.target.offsetParent.id)).offset().left;
//         scope.l = x-8;  
//         scope.w = angular.element($('.container')).innerWidth()/2;
//         console.log(scope.w);
//         if(scope.l<scope.w){
//         scope.whith = (scope.w-scope.l)+60;
//         }else{
//           scope.whith = -(scope.w-scope.l)-60;
//         }
//         if (angular.element($('.binary-genealogy-tree')).hasClass('binary_tree_extended')) {
//           angular.element($('.binary_tree_extended')).remove();
//         } else {
//           scope.subhijos = [];
//           var request = $http.get('./classes/controllers/controller_usuarios.php?func=ConsultarHijos&idusuario=' + scope.id);
//           request.then(function (response) {
//             scope.subhijos = response.data;
//             if(scope.subhijos.length > 0) {
//             angular.element(document.getElementById('block-system-main')).append($compile("<div class='binary-genealogy-tree stright-line binary_tree_extended'><span class='line_logic hr_class binar-hr-line-right' style='width: {{whith}}px; margin-left:{{l}}px;'></span>" +
//               "<div class='binary-genealogy-level-0 clearfix' style='overflow: hidden;'><div class='parent-wrapper new_wrapper clearfix'><div class='node-centere-item binary-level-width-100'><div class='scroll_class parent-wrapper clearfix' style='width: auto; padding-bottom: 65px;'>" +
//               "<div class='node-item-uid-569 node-left-item binary-level-width-50 node-item-uid-0' ng-repeat='hijochild in subhijos'> <span class='binary-hr-line binar-hr-line-left binary-hr-line-width-25'></span><div class='node-item-1-child-left  node-child-root'>" +
//               " <div id='user_block_{{hijochild.id}}' class='binary-node-single-item user-block'> <div class='images_wrapper'><img ng-src='{{hijochild.imagen}}' class='profile-rounded-image-small alt='' ></div> <span class='wrap_content'><a href=''>{{hijochild.nombre}}</a>"+
//               "</span><div class='last_level_user' red-expand  id='hijo.id'><span class='add-genealogy-button'><i class='fa fa-plus fa-2x'></i></span></div> </div></div></div></div></div></div></div></div>")(scope));
//            }else{
//              Notificacion("No tiene hijos");
//             }
//             });            
//         }
        
//       });
//     }
//   }
// });


'use strict';
//----------------------------------------------------------
//               DATEINPUT DIRECTIVE
//----------------------------------------------------------
AdminApp.directive('dateInput', function(dateFilter) {
    return {
      require: 'ngModel',
      restrict: 'A',
      link: function(scope, element, attributes, ngModelCtrl) {
        element.datepicker({
          dateFormat: 'dd/mm/yy',
          onSelect: function(date){
            var ar = date.split("/");
            date= new Date(ar[2]+"-"+ar[1]+"-"+ar[0]);
            ngModelCtrl.$setViewValue(date.getTime());
            scope.$apply();
          }
        });
        ngModelCtrl.$formatters.unshift(function(modelVal){
            return $filter('date')(modelVal,'dd/MM/yyyy');
        });
      }
    };
  });

  'use strict';
//----------------------------------------------------------
//               CARGANDO DIRECTIVE
//----------------------------------------------------------
AdminApp.directive('loading', function() {
    return {
      restrict: 'A',
      template: "<div style='margin-left:40%;'>  <i class='fas fa-spinner fa-pulse'></i></div>"
    };
});


'use strict'
AdminApp.directive("ngDatepicker",["$document",function(a){var b=function(d,c){d.format=c.format||"YYYY-MM-DD";d.viewFormat=c.viewFormat||"Do MMMM YYYY";d.locale=c.locale||"en";d.firstWeekDaySunday=d.$eval(c.firstWeekDaySunday)||false;d.placeholder=c.placeholder||""};return{restrict:"EA",require:"?ngModel",scope:{},link:function(g,e,d,j){b(g,d);g.calendarOpened=false;g.days=[];g.dayNames=[];g.viewValue=null;g.dateValue=null;moment.locale(g.locale);var c=moment();var f=function(l){var k=l.endOf("month").date(),q=l.month(),p=l.year(),r=1;var o=g.firstWeekDaySunday===true?l.set("date",2).day():l.set("date",1).day();if(o!==1){r-=o-1}g.dateValue=l.format("MMMM YYYY");g.days=[];for(var m=r;m<=k;m+=1){if(m>0){g.days.push({day:m,month:q+1,year:p,enabled:true})}else{g.days.push({day:null,month:null,year:null,enabled:false})}}};var h=function(){var k=g.firstWeekDaySunday===true?moment("2015-06-07"):moment("2015-06-01");for(var l=0;l<7;l+=1){g.dayNames.push(k.format("ddd"));k.add("1","d")}};h();g.showCalendar=function(){g.calendarOpened=true;f(c)};g.closeCalendar=function(){g.calendarOpened=false};g.prevYear=function(){c.subtract(1,"Y");f(c)};g.prevMonth=function(){c.subtract(1,"M");f(c)};g.nextMonth=function(){c.add(1,"M");f(c)};g.nextYear=function(){c.add(1,"Y");f(c)};g.selectDate=function(m,k){m.preventDefault();var l=moment(k.day+"."+k.month+"."+k.year,"DD.MM.YYYY");j.$setViewValue(l.format(g.format));g.viewValue=l.format(g.viewFormat);g.closeCalendar()};var i=["ng-datepicker","ng-datepicker-input"];if(d.id!==undefined){i.push(d.id)}a.on("click",function(m){if(!g.calendarOpened){return}var l=0,k;if(!m.target){return}for(k=m.target;k;k=k.parentNode){var o=k.id;var n=k.className;if(o!==undefined){for(l=0;l<i.length;l+=1){if(o.indexOf(i[l])>-1||n.indexOf(i[l])>-1){return}}}}g.closeCalendar();g.$apply()});j.$render=function(){var k=j.$viewValue;if(k!==undefined){g.viewValue=moment(k).format(d.viewFormat);g.dateValue=k}}},template:'<div><input type="text" ng-focus="showCalendar()" ng-value="viewValue" class="ng-datepicker-input" placeholder="{{ placeholder }}"></div><div class="ng-datepicker" ng-show="calendarOpened">  <div class="controls">    <div class="left">      <i class="fa fa-backward prev-year-btn" ng-click="prevYear()"></i>      <i class="fa fa-angle-left prev-month-btn" ng-click="prevMonth()"></i>    </div>    <span class="date" ng-bind="dateValue"></span>    <div class="right">      <i class="fa fa-angle-right next-month-btn" ng-click="nextMonth()"></i>      <i class="fa fa-forward next-year-btn" ng-click="nextYear()"></i>    </div>  </div>  <div class="day-names">    <span ng-repeat="dn in dayNames">      <span>{{ dn }}</span>    </span>  </div>  <div class="calendar">    <span ng-repeat="d in days">      <span class="day" ng-click="selectDate($event, d)" ng-class="{disabled: !d.enabled}">{{ d.day }}</span>    </span>  </div></div>'}}]);