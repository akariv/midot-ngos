"use strict";var app=angular.module("midotApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","times.tabletop","darthwade.dwLoading"]);app.config(["TabletopProvider",function(a){a.setTabletopOptions({key:"https://docs.google.com/spreadsheets/d/1tZL7qG6Ysbv_nB0XZR487pBKwKvGdGAv1ObaYPwqf8U/pubhtml?gid=1195003145&single=true"})}]),angular.module("midotApp").controller("MainCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("midotApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("midotApp").factory("rows",["Tabletop","$q","$window","$loading",function(a,b,c,d){return d.start("data"),b(function(b){c.localStorage&&c.localStorage.data&&c.localStorage.date+36e5>Date.now()?(d.finish("data"),b(JSON.parse(c.localStorage.data))):a.then(function(a){var e={amutot:a[0].amutot.elements.slice(1),columns:a[0].amutot.column_names,headers:a[0].amutot.elements[0],subjects:_.object(_.map(a[0].subjects.elements,function(a){return[a.subject.trim(),a.text]}))};e.headers=_.map(a[0].amutot.column_names,function(a){return e.headers[a]}),e.amutot=_.map(e.amutot,function(a){return a=_.mapObject(a,function(a){return a=a.trim(),""===a&&(a=null),"√"===a&&(a="קיים"),"X"===a&&(a="אין"),a}),a.age=parseInt(a.age),a.found_year=parseInt(a.found_year),a.reg_year=parseInt(a.reg_year),a.year=a.reg_year?a.found_year&&a.found_year<a.reg_year?a.found_year:a.reg_year:a.found_year?a.found_year:null,a}),c.localStorage&&(c.localStorage.data=JSON.stringify(e),c.localStorage.date=Date.now()),d.finish("data"),b(e)})})}]),angular.module("midotApp").controller("MainpageCtrl",["rows","$scope","$filter","$window",function(a,b,c,d){function e(a,b){var c=_.countBy(a,b),d=d3.sum(_.values(c));return c=_.sortBy(_.pairs(c),function(a){return-a[1]}),_.forEach(c,function(a,c){a[0]=a[0].replace("בין ","").replace(new RegExp(" מיליון","g"),"M"),a.push(100*a[1]/d),a.push(b),a.push(c)}),c=_.filter(c,function(a){return null!==a[0]})}function f(){var a=c("filter")(g.rows,b.query),d={};b.selectedSector&&(a=c("fieldFilter")(a,"sector",b.selectedSector.sector)),b.orgNameQuery&&b.orgNameQuery.length>0&&(a=c("fieldFilter")(a,["~name","~alias"],b.orgNameQuery)),(b.minVolume>0||b.maxVolume<75e7)&&(a=c("fieldRangeFilter")(a,"volume_2013",b.minVolume,b.maxVolume)),b.selectedLocationArea&&(a=c("fieldFilter")(a,"location_area",b.selectedLocationArea.location_area)),b.selectedOperationField&&b.selectedOperationField.length>0&&(a=c("fieldFilter")(a,["operation_field","operation_field_2"],b.selectedOperationField)),g.filteredRows=a,b.selectedSector||(d["סיווג ענפי"]=e(a,"sector")),b.selectedVolume2013Granular||(d["מחזור כספי"]=e(a,"volume_2013_granular")),b.selectedSector&&!b.selectedOperationField&&(d["תחום פעולה"]=e(a,"operation_field")),b.selectedStat&&b.selectedStat in d||(b.selectedStat=_.keys(d)[0]),g.stats=d,window.setTimeout(function(){for(var a=$($(".table tr")[2]).find("td"),b=$(".table th"),c=0;c<a.length;c++)$(b[c]).width($(a[c]).width());window.setTimeout(function(){var a=$($(".table thead tr")[0]).height();$($(".table td div")[0]).height(a-16)})},0),g.updatePie||(g.updatePie=g.drawPie()),g.updatePie(d[b.selectedStat])}var g=this;this.selectedRow=null,this.rows=[],this.updatePie=null,a.then(function(a){g.rows=a.amutot,g.columns=a.columns,g.headers=a.headers,g.rows=a.amutot,g.subjects=a.subjects,g.stats={},g.operation_fields=_.sortBy(_.union(_.map(g.rows,function(a){return a.operation_field}),_.map(g.rows,function(a){return a.operation_field_2})),function(a){return a}),g.operation_fields=_.filter(g.operation_fields,function(a){return null!==a}),f()}),b.$watchGroup(["query","selectedSector","minVolume","maxVolume","selectedLocationArea","selectedOperationField","orgNameQuery"],function(){console.log(b.selectedOperationField),f(),h()}),b.$watchGroup(["selectedStat"],function(){console.log("selectedStat changed!"),g.updatePie&&g.updatePie(g.stats[b.selectedStat])}),b.isNumber=function(a){return!isNaN(parseFloat(a))&&isFinite(a)},this.onClick=function(a){b.selectedRow=b.selectedRow===a?null:a},$(function(){$("[data-clampedwidth]").each(function(){var a=$(this),b=a.data("clampedwidth"),c=function(){var c=$(b).width();a.css("width",c)};c(),$(window).resize(c)}),g.volumeSlider=new Slider("#volume2013GranularSlider"),g.volumeSlider.on("slide",function(){var a=g.volumeSlider.getValue(),c={8:["0",0],7:["מיליון",1e6],6:["5 מיליון",5e6],5:["10 מיליון",1e7],4:["25 מיליון",25e6],3:["50 מיליון",5e7],2:["100 מיליון",1e8],1:["500 מיליון",5e8],0:["750 מיליון",75e7]};g.minVolumeLabel=c[a[1]][0],g.maxVolumeLabel=c[a[0]][0],b.minVolume=c[a[1]][1],b.maxVolume=c[a[0]][1],b.$apply()}),g.volumeSlider._trigger("slide")}),this.downloadData=function(a){var b=_.map(a,function(a){return _.map(g.columns,function(b){return a[b]})});b.unshift(g.headers);for(var c=windows1255.encode(Papa.unparse(b),{mode:"html"}),d=new ArrayBuffer(c.length),e=new Uint8Array(d),f=0,h=c.length;h>f;f++)e[f]=c.charCodeAt(f);var i=new Blob([d],{type:"text/csv"}),j=URL.createObjectURL(i),k=document.createElement("a");k.download="midot-dataset.csv",k.href=j,k.click()},this.drawPie=function(){function a(a){var b=j.selectAll("path.arc").data(h(a));b.exit().remove(),b.enter().append("path").attr("class","arc").on("mouseover",l.show).on("mouseout",l.hide),b.attr("d",f).style("fill",function(a){return e(a.data[4])});var c=k.selectAll("text.arc").data(h(a));c.exit().remove(),c.enter().append("text").attr("class","arc").style("text-anchor","middle").style("pointer-events","none"),c.attr("transform",function(a){return"translate("+g.centroid(a)+")"}).text(function(a){return a.endAngle-a.startAngle>.5?a.data[0]:""})}var b=220,c=220,d=Math.min(b,c)/2,e=d3.scale.ordinal().range(["#009bd5","#eec100","#00b8af","#89b804","#00a854","#4cb8e2","#f3d34c","#4ccdc7","#adce4f","#4cc287"]),f=d3.svg.arc().outerRadius(d-10).innerRadius(0),g=d3.svg.arc().outerRadius(d-40).innerRadius(d-40),h=d3.layout.pie().sort(null).value(function(a){return a[1]}),i=d3.select("#pieChart").append("svg").attr("width",b).attr("height",c).append("g").attr("transform","translate("+b/2+","+c/2+")"),j=i.append("g"),k=i.append("g"),l=d3.tip().attr("class","d3-tip").html(function(a){return a.data[0]+"&rlm; - "+Math.round(a.data[2])+"%"});return i.call(l),a};var h=function(){var a=$(window).width(),b=$(".left-col"),c=$(".right-col"),d=b.outerWidth(),e=c.outerWidth(),f=10,g=a-d-e-2*f;0>g&&(g=0);var h=g/2;c.css("right",h+f+"px"),b.css("right",h+f+e+f+"px"),$(".upper-text").css("right",h+f+e+f+5+"px"),$(".left-col thead").css("right",h+f+e+f+10+"px")};angular.element(d).bind("resize",h),$(h),$(function(){$("select[multiple=multiple]").multiselect({buttonWidth:"220px",nonSelectedText:"כל תחומי הפעילות",allSelectedText:"כל תחומי הפעילות",nSelectedText:"תחומים נבחרו",numberDisplayed:1})}),this.hasadna=function(){d.open("http://www.hasadna.org.il","_blank")}}]),angular.module("midotApp").filter("unique",function(){function a(a,b){var c=a[b];if("volume_2013_granular"!==b)return c;if(c.startsWith("בין")){try{c=parseInt(c.split(" ")[1])}catch(d){c=-1}isNaN(c)&&(c=-1)}else c=-1;return c}return function(b,c){return c?_.sortBy(_.uniq(b,!1,function(a){return a[c]}),function(b){return a(b,c)}):_.sortBy(_.uniq(b,!1),function(a){return a})}}),angular.module("midotApp").filter("fieldFilter",function(){function a(a,b,c){if("~"===b[0]){var d=a[b.substr(1)];return null!==d&&-1!==d.indexOf(c)}return a[b]===c}return function(b,c,d){return d?(d.constructor!==Array&&(d=[d]),c.constructor===Array?_.filter(b,function(b){return _.some(c,function(c){return _.some(d,function(d){return a(b,c,d)})})}):_.filter(b,function(b){return _.some(d,function(d){return a(b,c,d)})})):b}}),angular.module("midotApp").filter("fieldRangeFilter",function(){return function(a,b,c,d){return _.filter(a,function(a){return a[b]>=c&&a[b]<=d})}}),angular.module("midotApp").filter("characters",function(){return function(a,b,c){if(isNaN(b))return a;if(0>=b)return"";if(a&&a.length>b){if(a=a.substring(0,b),c)for(;" "===a.charAt(a.length-1);)a=a.substr(0,a.length-1);else{var d=a.lastIndexOf(" ");-1!==d&&(a=a.substr(0,d))}return a+"…"}return a}}),angular.module("midotApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/main.html",'<div class="jumbotron"> <h1>\'Allo, \'Allo!</h1> <p class="lead"> <img src="images/yeoman.png" alt="I\'m Yeoman"><br> Always a pleasure scaffolding your apps. </p> <p><a class="btn btn-lg btn-success" ng-href="#/">Splendid!<span class="glyphicon glyphicon-ok"></span></a></p> </div> <div class="row marketing"> <h4>HTML5 Boilerplate</h4> <p> HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites. </p> <h4>Angular</h4> <p> AngularJS is a toolset for building the framework most suited to your application development. </p> <h4>Karma</h4> <p>Spectacular Test Runner for JavaScript.</p> </div>')}]);