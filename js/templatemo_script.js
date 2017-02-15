

var menuDisabled = false;

jQuery(function($) {

    $(window).load(function() { 
      
        $('#carousel').flexslider({
            animation: "slide",
            controlNav: false,
            animationLoop: false,
            slideshow: false,
            itemWidth: 170,
            itemMargin: 5,
            asNavFor: '#slider'
        });

        $('#slider').flexslider({
            animation: "slide",
            controlNav: false,
            animationLoop: false,
            slideshow: false,
            sync: "#carousel",
            start: function(slider){
                $('#status').fadeOut(); 
                $('#preloader').delay(350).fadeOut('slow'); 
                $('#main-wrapper').delay(350).css({'overflow':'visible'});
            }
        });
    });
    
    $(document).ready( function() {        

        if($(window).width() > 767) {
           var navWidth = $('.navbar .navbar-nav').width();

            $('hgroup').css("maxWidth",navWidth + "px");
            $('.templatemo-content').css("maxWidth",navWidth + "px");
            $('.footer-wrapper').css("maxWidth",navWidth + "px");
        }

        $('.site-name').click(function(){
            location.reload();
        });   
		
		
        var defaultImgSrc = $('img.main-img').attr('src');
        $.backstretch(defaultImgSrc, {speed: 400});

        $(".nav a").on('click',function(e){
            if( $(this).hasClass("external") ) {
                return;
            }
            e.preventDefault();
            if (menuDisabled == false) 
            {
                menuDisabled = true; 
                
                var name = $(this).attr('href');
                $('.nav li').removeClass('active');

                var menuClass = $(this).parent('li'); 
                $(menuClass).addClass('active');
                
         
                var imgSrc = $("img"+name+"-img").attr('src');
                $.backstretch(imgSrc, {speed: 400}); 
                
       
                $("section.active").animate({left:-$("section.active").outerWidth()}, 300,function(){
                    $(this).removeClass("active");
                    $(this).hide();
                    $(name+"-text").removeClass("inactive");
                    $(name+"-text").css({left:'703px', top:'0px'});
                    $(name+"-text").show();
                    $(name+"-text").animate({left:'0px'}, 300,function(){
                        $(this).addClass("active");
                        
                        google.maps.event.trigger(map, 'resize'); 
                        $.backstretch("resize");
                        $(window).resize();
                        
                        menuDisabled = false;
                    });
                });                
            }
            return;
        });

        loadGoogleMap();

    }); 

});

var map = '';

function initialize() {
    var mapOptions = {
      zoom: 14,
      center: new google.maps.LatLng(16.8496189,96.1288854)
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),  mapOptions);
}

function loadGoogleMap(){
   
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&' +
    'callback=initialize';
    document.body.appendChild(script);
}