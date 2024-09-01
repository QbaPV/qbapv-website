/* JS Document */

/******************************

[Table of Contents]

1. Vars and Inits
2. Init Home Slider
3. Init Search
4. Init Menu
5. Init Services Slider
6. Init SVG


******************************/

$(document).ready(function()
{
	"use strict";

	/* 

	1. Vars and Inits

	*/

	var header = $('.header');
	var menuActive = false;

	setHeader();

	$(window).on('resize', function()
	{
		setHeader();
	});

	$(document).on('scroll', function()
	{
		setHeader();
	});

	initHomeSlider();
	initSearch();
	initMenu();
	initServicesSlider();
	initSvg();

	/* 

	2. Set Header

	*/

	function setHeader()
	{
		if(window.innerWidth < 992)
		{
			if($(window).scrollTop() > 100)
			{
				header.addClass('scrolled');
			}
			else
			{
				header.removeClass('scrolled');
			}
		}
		else
		{
			if($(window).scrollTop() > 100)
			{
				header.addClass('scrolled');
			}
			else
			{
				header.removeClass('scrolled');
			}
		}
		if(window.innerWidth > 767 && menuActive)
		{
			closeMenu();
		}
	}

	/* 

	2. Init Home Slider

	*/

	function initHomeSlider()
	{
		if($('.home_slider').length)
		{
			var homeSlider = $('.home_slider');

			homeSlider.owlCarousel(
			{
				items:1,
				loop:true,
				smartSpeed:1200,
				autoplay:true,
				dots:true,
				nav:false,
				responsive:
				{
					0:{dots:false},
					575:{dots:true}
				}
			});

			if($('.home_slider_prev').length)
			{
				var prev = $('.home_slider_prev');
				prev.on('click', function()
				{
					homeSlider.trigger('prev.owl.carousel');
				});
			}

			if($('.home_slider_next').length)
			{
				var next = $('.home_slider_next');
				next.on('click', function()
				{
					homeSlider.trigger('next.owl.carousel');
				});
			}
		}
	}

	/* 

	3. Init Search

	*/

	function initSearch()
	{
		if($("#searchBtn").length)
		{
			var search = $('#searchBtn');
			var searchInput = $('.main_menu_search_content');
			search.on('click', function()
			{
				searchInput.toggleClass('active');
			});
		}
	}

	/* 

	4. Init Menu

	*/

	function initMenu()
	{
		if($('.menu').length)
		{
			var menu = $('.menu');
			var hamb = $('.burger');

			hamb.on('click', function()
			{
				if(menuActive)
				{
					closeMenu();
				}
				else
				{
					openMenu();
				}
			});
		}
	}

	function closeMenu()
	{
		var menu = $('.menu');
		menu.removeClass('active');
		menuActive = false;
		menu.css('max-height', "0px");
	}

	function openMenu()
	{
		var menu = $('.menu');
		menu.addClass('active');
		menuActive = true;
		menu.css('max-height', menu.prop('scrollHeight') + "px");
	}

	/* 

	5. Init Services Slider

	*/

	function initServicesSlider()
	{
		if($('.services_slider').length)
		{
			var servicesSlider = $('.services_slider');

			servicesSlider.owlCarousel(
			{
				loop:true,
				nav:false,
				dots:false,
				autoplay:true,
				smartSpeed:1200,
				margin:30,
				responsive:
				{
					0:{items:1},
					480:{items:1},
					768:{items:2},
					992:{items:3}
				}
			});

			if($('.services_prev').length)
			{
				$('.services_prev').on('click', function()
				{
					servicesSlider.trigger('prev.owl.carousel');
				});
			}

			if($('.services_next').length)
			{
				$('.services_next').on('click', function()
				{
					servicesSlider.trigger('next.owl.carousel');
				});
			}
		}
	}

	/* 

	6. Init SVG

	*/

	function initSvg()
	{
		jQuery('img.svg').each(function()
		{
			var $img = jQuery(this);
			var imgID = $img.attr('id');
			var imgClass = $img.attr('class');
			var imgURL = $img.attr('src');

			jQuery.get(imgURL, function(data)
			{
				// Get the SVG tag, ignore the rest
				var $svg = jQuery(data).find('svg');

				// Add replaced image's ID to the new SVG
				if(typeof imgID !== 'undefined') {
				$svg = $svg.attr('id', imgID);
				}
				// Add replaced image's classes to the new SVG
				if(typeof imgClass !== 'undefined') {
				$svg = $svg.attr('class', imgClass+' replaced-svg');
				}

				// Remove any invalid XML tags as per http://validator.w3.org
				$svg = $svg.removeAttr('xmlns:a');

				// Replace image with new SVG
				$img.replaceWith($svg);
			}, 'xml');
		});
	}
	
	//Social networks instance
	$('#share-bar').share();
	
	//MAPS
	// When the user clicks on <div>, open the popup
	function ShowPopup(tagId) {
		var popup = document.getElementById(tagId);
			popup.classList.toggle("show");
		}
	
	  var mymap = L.map('mapid').setView([ 25.0657005, 55.1712799], 2);
  
	  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		  maxZoom: 18,
		  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			  '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			  'Imagery � <a href="https://www.mapbox.com/">Mapbox</a>',
		  id: 'mapbox.streets'
	  }).addTo(mymap);
  
	//   var markers = [
	// 	["Dubai", 25.0657005, 55.1712799],
	// 	["Brazil",-15.7801,  -47.9292],
	// 	["EEUU", 37.9886894, -84.4777222]
	//   ];
	//   var zoom = 6;
	 
	//   for (var i = 0; i < markers.length; i++) {
	// 	marker = new L.marker([markers[i][1],markers[i][2]])
	// 	  .bindPopup(markers[i][0]).openPopup()
	// 	  .addTo(mymap);
	//   }

	  L.marker([25.0657005, 55.1712799]).addTo(mymap)
		  .bindPopup("DUBAI").openPopup();
	
	  L.marker([ -15.7801,  -47.9292]).addTo(mymap)
		  .bindPopup("BRASIL").openPopup();
  
		  	
	  L.marker([ 37.9886894, -84.4777222]).addTo(mymap)
	  .bindPopup("EEUU").openPopup();

	  L.circle([25.0657005, 55.1712799], 500, {
		  color: 'red',
		  fillColor: '#f03',
		  fillOpacity: 0.5
	  }).addTo(mymap).bindPopup("");
	  
	//   L.circle([25.0657005, 55.1712799], 500, {
	// 	color: 'red',
	// 	fillColor: '#f03',
	// 	fillOpacity: 0.5
	// }).addTo(mymap).bindPopup("");
  
	  

	  var popup = L.popup();
  
	  function onMapClick(e) {
		  popup
			  .setLatLng(e.latlng)
			  .setContent("Coordenadas del click " + e.latlng.toString())
			  .openOn(mymap);
	  }
	  mymap.on('click', onMapClick);
});