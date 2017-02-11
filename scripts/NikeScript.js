//Varaiable used to hold the browser width so as to run mobile or desktop sepcific functions//
var browserWidth;
var isMobile;

function getBrowserWidth(){
    browserWidth = $( window ).width();
    if (browserWidth <= 767){
        isMobile = true;
    }else{
        isMobile = false;
    }
}



//Handles the search box animation on desktop//
$("#search-box").focus(function(){
    getBrowserWidth();
    if (browserWidth > 906 ){
        $(this).css("width", "150px");
        $(this).css("margin-left", "0px");
        $(this).css("border-color", "black");
        $(".fa-search").css("left", "17px")
    }
    
});

$("#search-box").focusout(function(){
    getBrowserWidth();
        if (browserWidth > 906 ){
        $(this).css("width", "120px");
        $(this).css("margin-left", "30px");
        $(this).css("border-color", "#E5E5E5");
        $(".fa-search").css("left", "47px")
    }
});





//Handles the mobile search modal overlay show/hide functationality//
$("#search-mobile").click(function(){
    $("#search-modal-container").addClass("modal-active");
    freezeBackground(); 
})

$("#search-modal-close").click(function(){
    $("#search-modal-container").removeClass("modal-active");
    unFreezeBackground();
})





/*The following will show/hide the 'clear' button. On each key up, it will check to see if there if any text entered in the input, if so then the clear button will be displayed, if not it wont*/
$("#search-modal-input").keyup(function(){
    var searchText = $("#search-modal-input").val();
    
    if (searchText != ""){
        $("#search-modal-clear").css("display", "block")
    }else{

        $("#search-modal-clear").css("display", "none");
    }   
});

//Gives the clear button its functationality//
$("#search-modal-clear").click(function(){
    $("#search-modal-input").val('');
    $("#search-modal-clear").css("display", "none");
})









// Below handles the functationality for the mobile 'hamburger' menu button.//

//Open the mobile menu//
$("#mobile-button").click(function(){
    
    freezeBackground();
    mobileMenuOpen();
    
})


function mobileMenuOpen(){
    /*Add classes to ensure the mobile navigation menu is displayed. A short time delay is used to ensure the open animation will play*/
    $("#mobile-mega-menu-container").css("display", "block");
    
    setTimeout(function(){
        $("#mobile-mega-menu-container").addClass("modal-active expanded-panel");
        $("#mega-close-container").addClass("expanded-panel");
        $("#navitagion-panel-container").addClass("expanded-panel");
    }, 10);
}




/*The following hides the mobile navigation menu. It does the same as the above, just in reverse. Also resets the position of the menu to the top*/
$("#mega-close").click(function(){
    $("#mobile-mega-menu-container").removeClass("modal-active");
    $("#mega-close-container").removeClass("modal-active expanded-panel");
    $("#navitagion-panel-container").removeClass("expanded-panel");
    
    setTimeout(function(){
        $("#mobile-mega-menu-container").css("display", "none");
    }, 400);
    
    unFreezeBackground();
    closeSubPanel();
    closePanel();
    
    $("#navitagion-panel-container").scrollTop(0);
})














//The following provides the open/close functationality to the mobile sub-navitagion panels//

//Variable that stores which navigation panel is open//
var openPanel = "";
var openSubPanel = "";



//Functions//

//Freezes the main page content in place to avoid it scrolling in the background when the mobile navigation or search modal are open. Also solves a bug where the background would be scrollable after the mobile address bar dissapeared and the window resized.//
function freezeBackground(){
    $('body,html').css('overflow-y','hidden');
    $("html, body, #page-wrapper").css({
        height: $(window).height()
    }); 
}

//Unfreezes the background and makes it scrollable//
function unFreezeBackground(){
    $('body,html').css('overflow-y','');
    $("html, body, #wrapper").css("height", "")
}

//Uses the id saved in the openPanel variable to close down an active mobile menu//
function closePanel(){
     $(openPanel).removeClass("expanded-panel");
    
    setTimeout(function(){
        $(openPanel).css("display", "none");
    }, 400);
    
    $(openPanel).scrollTop(0);
    
    openPanel = "";
}

//Uses the id saved in the openSubPanel variable to close down an active mobile catagory menu//
function closeSubPanel(){
     $(openSubPanel).removeClass("expanded-panel");
    
    setTimeout(function(){
        $(openSubPanel).css("display", "none");
    }, 400);
    
    $(openSubPanel).scrollTop(0);
    
    openSubPanel = "";
}




/*Provides the 'open' functionality when a user clicks on a mobile menu navigation panel. It retrives the data attibute "link" (locted in the html) that is attached to the relevent clicked on object. The data attribute contiains the id of the sub-panel that will need to be opened. This id is stored in the clickedNavData variable and also sent to the global openPanel variable so it can be used later when the user wants to close the sub-panel. Using the saved id, functions will run to display the relevent panel*/
$(".nav-item").click(function(){
   
    var clickedNav = (this.id);
    
    var clickedNavData = $("#"+clickedNav).data("link");
    
    openPanel = clickedNavData;
    
    $(clickedNavData).css("display", "block");
    
    setTimeout(function(){
        $(clickedNavData).addClass("expanded-panel");
    }, 10);
})




$(".nav-item-footer").click(function(){
    
    $('body,html').css('overflow','hidden');
    
    mobileMenuOpen();
    
    var clickedNav = (this.id);
    
    var clickedNavData = $("#"+clickedNav).data("link");
    
    openPanel = clickedNavData;
    
    $(clickedNavData).css("display", "block");
    
    setTimeout(function(){
        $(clickedNavData).addClass("expanded-panel");
    }, 10);
    

})


//Similar to the above, but handles the catagory-navigation panel//
$(".nav-sub-item").click(function(){
   
    var clickedSubNav = (this.id);
    
    var clickedSubNavData = $("#"+clickedSubNav).data("link");
    
    openSubPanel = clickedSubNavData;
    
    $(clickedSubNavData).css("display", "block");
    
    setTimeout(function(){
        $(clickedSubNavData).addClass("expanded-panel");
    }, 10);
})


//Closes the navigation panel//
$(".nav-back").click(function(){
    
    closePanel();
})

//Closes the catagory-navigation panel//
$(".nav-catagory-back").click(function(){
    
    closeSubPanel();
})


//Mobile Menu functationality ends/





//Begining of Slider functationality//

var visableSlide = "delivery";      //Varable that keeps track of which slider is displayed//


//The following functions will be run when either the left of right slider arrows are clicked
$("#slider-arrow-left").click(function(){
    resetTimer();
    updateSlideTracker();
    slideLeft();
})


$("#slider-arrow-right").click(function(){
    resetTimer();
    updateSlideTracker();
    slideRight();
})


/*The looping slider works by using 3 slides, with the middle one (slide 2) showing the visable content. The other 2 slides (slides 1 & 2) hold the content for the next slide. When either slider 1 or 2 have slid into position and stop, everything is reset. This is done by using clones and positioning. First the transition time is set to 0ms so the user wont see any animationor changes take place. Next the newly visable slide(1 or 3) is clonded and replicated in slide 2. Then slide 2 is brought back into position as the visable slide. Slides 1 and 3 will then also have their content updated to whatever the next slide should be. Then finally the transition is reset back to 1 secound (1000ms) ready for everything to start again */

function slideLeft(){
    $("#slider-container").css("transform", "translate3d(-1310px, 0px,0px)");
    $("#slider-container").css("-moz-transform", "translate3d(-1310px, 0px,0px)");
    $("#slider-container").css("-o-transform", "translate3d(-1310px, 0px,0px)");
    $("#slider-container").css("-webkit-transform", "translate3d(-1310px, 0px,0px)");
    
    setTimeout(function(){
        $("#slider-container").css("transition", "transform 0ms ease");
        visableSlideClone();
        $("#slider-container").css("-moz-transform", "translate3d(-653px, 0px,0px)");
        $("#slider-container").css("-o-transform", "translate3d(-653px, 0px,0px)");
        $("#slider-container").css("-webkit-transform", "translate3d(-653px, 0px,0px)");
        
        nextSlideClone();
        
        setTimeout(function(){
            $("#slider-container").css("transition", "transform 1000ms ease");
        }, 50);
    }, 1000);
};


function slideRight(){
    $("#slider-container").css("transform", "translate3d(0px, 0px,0px)");
    $("#slider-container").css("-moz-transform", "translate3d(0px, 0px,0px)");
    $("#slider-container").css("-o-transform", "translate3d(0px, 0px,0px)");
    $("#slider-container").css("-webkit-transform", "translate3d(0px, 0px,0px)");
    
    setTimeout(function(){
        $("#slider-container").css("transition", "transform 0ms ease");
        visableSlideClone();
        $("#slider-container").css("transform", "translate3d(-656px, 0px,0px)");
        $("#slider-container").css("-moz-transform", "translate3d(-656px, 0px,0px)");
        $("#slider-container").css("-o-transform", "translate3d(-656px, 0px,0px)");
        $("#slider-container").css("-webkit-transform", "translate3d(-656px, 0px,0px)");
        nextSlideClone();
        
        setTimeout(function(){
            $("#slider-container").css("transition", "transform 1000ms ease");
        }, 50);
    }, 1000);
};

//Function to run if a user swipes left when the screen width is less than 930px//
function swipeLeft(){
    $("#slider-container").css("transform", "translate3d(-1482px, 0px,0px)");
    $("#slider-container").css("-o-transform", "translate3d(-1482px, 0px,0px)");
    $("#slider-container").css("-moz-transform", "translate3d(-1482px, 0px,0px)");
    $("#slider-container").css("-webkit-transform", "translate3d(-1482px, 0px,0px)");
    
    setTimeout(function(){
        $("#slider-container").css("transition", "transform 0ms ease");
        visableSlideClone();
        $("#slider-container").css("transform", "translate3d(-825px, 0px,0px)");
        $("#slider-container").css("-o-transform", "translate3d(-825px, 0px,0px)");
        $("#slider-container").css("-moz-transform", "translate3d(-825px, 0px,0px)");
        $("#slider-container").css("-webkit-transform", "translate3d(-825px, 0px,0px)");
        nextSlideClone();
        
        setTimeout(function(){
            $("#slider-container").css("transition", "transform 1000ms ease");
        }, 50);
    }, 1000);
};

//Function to run if a user swipes right when the screen width is less than 930px//
function swipeRight(){
    $("#slider-container").css("transform", "translate3d(-168px, 0px,0px)");
    $("#slider-container").css("-moz-transform", "translate3d(-168px, 0px,0px)");
    $("#slider-container").css("-o-transform", "translate3d(-168px, 0px,0px)");
    $("#slider-container").css("-webkit-transform", "translate3d(-168px, 0px,0px)");
    
    setTimeout(function(){
        $("#slider-container").css("transition", "transform 0ms ease");
        visableSlideClone();
        $("#slider-container").css("transform", "translate3d(-825px, 0px,0px)");
        $("#slider-container").css("-moz-transform", "translate3d(-825px, 0px,0px)");
        $("#slider-container").css("-o-transform", "translate3d(-825px, 0px,0px)");
        $("#slider-container").css("-webkit-transform", "translate3d(-825px, 0px,0px)");
        nextSlideClone();
        
        setTimeout(function(){
            $("#slider-container").css("transition", "transform 1000ms ease");
        }, 50);
    }, 1000);
};


//Handles the tracking of which slider content is visable//
function updateSlideTracker(){
    if (visableSlide == "delivery"){
            visableSlide = "signup";
    }else{
            visableSlide = "delivery";
    }
}


//Clones the currently active (visable) slide//
function visableSlideClone(){
    
    var clonedVisableSlide;
    
    if (visableSlide == "signup"){
        
        clonedVisableSlide = $("#signup").clone();
        $("#slide2").html(clonedVisableSlide);
    }else{
        clonedVisableSlide = $("#delivery").clone();
        $("#slide2").html(clonedVisableSlide);    
    }
}


//Clones the currently inactive (next) slides//
function nextSlideClone(){
    
    var clonedNextSlide;
    
    if (visableSlide == "signup"){
                
        clonedNextSlide = $("#delivery").clone();
        $("#slide1").html(clonedNextSlide);
        clonedNextSlide = $("#delivery").clone();
        $("#slide3").html(clonedNextSlide);   
    }
    
    if  (visableSlide == "delivery"){
        
        clonedNextSlide = $("#signup").clone();
        $("#slide1").html(clonedNextSlide);
        clonedNextSlide = $("#signup").clone();
        $("#slide3").html(clonedNextSlide);    
    }
}


//Function that handles the automatic slider functationality//
function autoSlider(){ 
    updateSlideTracker();
    slideLeft();
    resetTimer();
}

function autoSliderMobile(){
    updateSlideTracker();
    swipeLeft();
    resetTimer();
}

//Variable that contains the time interval until the next slider is displayed//
var timer;

//Function that starts a 5 secound timer that will count down to 0. When the timer reaches 0 the autoSlider function will run which will move the slider on to the next slide//
function sliderTimer(){
    getBrowserWidth()
    if (browserWidth <= 767){
        timer = window.setInterval(autoSliderMobile,5000);
    }else{
        timer = window.setInterval(autoSlider,5000);
    }
}

//A function that resets the timer//
function resetTimer() {
    window.clearInterval(timer);
    sliderTimer();
}

sliderTimer(); //Starts the initial slider timer when the user vists the page.

//Handles touch controls for laptop touch screens and mobile/tablet - swipe left and right. Depending on if the user is looking at the mobile site (less than or equal to 930px) or the desktop, a specific releven function will run. Uses Hammer.js plugin to detect the swipe//

var sliderElement = document.getElementById('slider-bar');
var slider = new Hammer(sliderElement);

slider.on("swipeleft", function(ev) {
    resetTimer();
    updateSlideTracker();
    getBrowserWidth()
    
    if (browserWidth <= 767){
        swipeLeft();
    }else{
        slideLeft();
    }
});

slider.on("swiperight", function(ev) {
    resetTimer();
    updateSlideTracker();
    getBrowserWidth()
    
    if (browserWidth <= 767){
        swipeRight();
    }else{
        slideRight();
    }
});


//End of Slider functationality//



//Provides the mouseover functationality to the "Shop Now" button found on the hero image//
$("#hero-shop-now").mouseover(function(){
    $(".hero-sub-button").css("display","block");
    $("#shop-now-arrow").addClass("rotate");
})

$("#hero-shop-now").mouseout(function(){
    $(".hero-sub-button").css("display","none");
    $("#shop-now-arrow").removeClass("rotate");
})

$(".hero-sub-button").mouseover(function(){
    $(".hero-sub-button").css("display","block");
    $("#shop-now-arrow").addClass("rotate");
})

$(".hero-sub-button").mouseout(function(){
    $(".hero-sub-button").css("display","none");
    $("#shop-now-arrow").removeClass("rotate");
})










