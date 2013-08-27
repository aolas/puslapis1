//set default view mode
  $defaultViewMode="fit"; //full (fullscreen background), fit (fit to window), original (no scale)
  //cache vars
  $bg=$("#bg");
  $bgimg=$("#bg #bgimg");
  $preloader=$("#preloader");
  $outer_container_right=$("#outer_container_right");
  $outer_container_left=$("#outer_container_left");
  $outer_container_right_a=$("#outer_container_right a.thumb_link");
  $toolbar=$("<div/>");
  $thumbs_tip=$("#thumbs_tip");
  $meniu_tip=$("#meniu_tip"); 
  $nextimg = $("#bgsectorForward");
  $previmg = $("#bgSectorBackward");
  $customScrollBox=$("#customScrollBox");
  //my mod 4 sliding panel right
  $ScrollBoxLeft=$("#ScrollBoxLeft");
  $customScrollBox_container=$("#customScrollBox .container");
  $navlineright = $('.lineRight');
  //meniu 2 lvl holder 
  $holder = $('label.holder.s16');
  var cont = false,yPos,visibleHeight=$(window).height(),criBottom,
   noWheelScroll=true,movePerScroll = 20;
  
$(window).load(function() {
  $toolbar.data("imageViewMode",$defaultViewMode); //default view mode
  ImageViewMode($toolbar.data("imageViewMode"));
  //cache vars


  $dragger=$("#dragger");
  CustomScroller();
     //scroll box left height 
   var height = $(window).height();
    $ScrollBoxLeft.height(height);
    $customScrollBox.height(height);
    //pading 4 pannels left-right depending on resolution    
    $outer_container_left.css("padding-right",$(window).width()*0.1);
    $outer_container_right.css("padding-left",$(window).width()*0.1);
  
  SlidePanels("close"); //close the left pane
  SlidePanelLeft("close"); 
  function CustomScroller(){
    outerMargin=0;
    innerMargin=20;
    

    visibleHeight=$(window).height()-outerMargin;
    visibleHeight12 = visibleHeight*0.25;
    visibleHeight23 = visibleHeight*0.5;
    visibleHeight34 = Math.round(visibleHeight*0.75);
    topContainer = parseFloat($customScrollBox_container.css('top'));  
    if ($customScrollBox_container.height()>visibleHeight){    
     
      criBottom  = visibleHeight - $customScrollBox_container.height()-20;

      }
    else {criBottom=0;}
	//nav meniu border right
	//var cheight = $navlineright.height();
	//var theight = $ScrollBoxLeft.height();
	//var nheight = $('#nav').height()
	//$navlineright.height(theight -(nheight - cheight)-10)
      //thumbs center
  $outer_container_right_a.each(function() {
     var height = $(this).height(), width = $(this).width(), skirtumas, $img = $(this).children().filter("img");
     var picHeight = $img.height() / $img.width();
     var picWidth = $img.width() / $img.height();
     if ((height / width) > picHeight){
         $img.css("width",width).css("height",picHeight*width);
         $img.css("margin-top", (height - $img.height())/2);
      }
     else{
         $img.css("height",height).css("width",picWidth*height);      
         $img.css("margin-left", (width - $img.width())/2);
      }
      
   });
      


   
}

  //resize browser window functions
  $(window).resize(function() {
    FullScreenBackground("#bgimg"); //scale bg image
    $dragger.css("top",0); //reset content scroll
    $customScrollBox_container.css("top",0);
    $customScrollBox.unbind("mousewheel");
    //scroll box left height 
    $ScrollBoxLeft.height($(window).height()-outerMargin);
    //pading 4 pannels left-right depending on resolution    
    $outer_container_left.css("padding-right",$(window).width()*0.1);
    $outer_container_right.css("padding-left",$(window).width()*0.1);

    CustomScroller();
  });
  
  //preloader with events
(function () {
    var $container = $('#prelauderCpntainer');
    var $links = $('#prelauderCpntainer li');
    var ilgis = $links.length;
    var $pirma = $links.first(),
        $paskutine = $links.last();
    if (ilgis > 0) {
        $container.append($("<img>").attr('src', $pirma.html()).load(function () {
            kraunam();
            ilgis -= 1;
        }));
    }

    function kraunam() {
        var $links = $('#prelauderCpntainer li');
        var $pirma = $links.first(),
            $paskutine = $links.last();
        var ilgis = $links.length;
        if (ilgis == 1) {
            $container.append($("<img>").attr('src', $pirma.html()));
            $pirma.remove();
        } else if ( ilgis >0) {
            
            $container.append($("<img>").attr('src', $pirma.html()).load(function () {
                if (ilgis > 1) {
                    kraunam();
                }
            }));
            $container.append($("<img>").attr('src', $paskutine.html()).load(function () {
                if (ilgis > 1) {
                    kraunam();
                }
            }));
            
            $pirma.remove();
            $paskutine.remove();
        }


    }

})();
  
  
  
});
  
  //loading bg image
  $bgimg.load(function() {
  //    debugger;
    LargeImageLoad($(this));
//debugger;
  });
  
  function LargeImageLoad($this){
    $preloader.fadeOut("fast"); //hide preloader
    $this.removeAttr("width").removeAttr("height").css({ width: "", height: "" }); //lose all previous dimensions in order to rescale new image data
    $bg.data("originalImageWidth",$this.width()).data("originalImageHeight",$this.height());
    if($bg.data("newTitle")){
      $this.attr("title",$bg.data("newTitle")); //set new image title attribute
    }
    FullScreenBackground($this); //scale new image
    $bg.data("nextImage",$($outer_container_right.data("selectedThumb")).next().attr("href")); //get and store next image
    $bg.data("prevImage",$($outer_container_right.data("selectedThumb")).prev().attr("href")); //get and store previos image
    if(typeof itemIndex!="undefined"){
      if(itemIndex==lastItemIndex){ //check if it is the last image
        $bg.data("lastImageReached","Y");
        $bg.data("firstImageReached","N");
        $bg.data("nextImage",$outer_container_right_a.first().attr("href")); //get and store next image
        $bg.data("prevImage",$outer_container_right_a.prev().attr("href")); //get and store prev image
        
      }
      else if(itemIndex==0){
        $bg.data("firstImageReached","Y");
        $bg.data("lastImageReached","N");
        $bg.data("nextImage",$outer_container_right_a.next().attr("href")); //get and store next image
        $bg.data("prevImage",$outer_container_right_a.last().attr("href")); //get and store prev image
      } 
      else {
        $bg.data("firstImageReached","N");
        $bg.data("lastImageReached","N");
      }
    } 
      else {
         $bg.data("firstImageReached","N");
         $bg.data("lastImageReached","N");
    }
    //console.log("Prev img link: " + $bg.data("prevImage") );
    //console.log("Current img link: " + $($outer_container_right.data("selectedThumb")).attr("href") );
    //console.log("Next img link: " + $bg.data("nextImage") );
    $this.fadeIn("slow"); //fadein background image
    if($bg.data("nextImage") || $bg.data("prevImage") || $bg.data("lastImageReached")=="Y"){ //don't close thumbs pane on 1st load
      SlidePanels("close"); //close the right pane
      //SlidePanelLeft("close"); 
    }
    //NextImageTip();
  }

  //slide in/out right panel
  $outer_container_right.hover(
    function(){ //mouse over
       var height = $(window).height();
      SlidePanels("open");
      $thumbs_tip.css("display",'none');
      cont = true;
      if (visibleHeight < $customScrollBox_container.height()){
            scroll();
         }      
      //Anomally fix customScrollBox aukstis 
      if ($customScrollBox.height() < height)
          $customScrollBox.height(height);
    },
    function(){ //mouse out
      SlidePanels("close");
      $thumbs_tip.css("display",'inline');
      cont=false;
    }
  );
  //slide in/out left pane
  $outer_container_left.hover(
    function(){ //mouse over
      SlidePanelLeft("open");
    $meniu_tip.css("display",'none');
    },
    function(){ //mouse out
      SlidePanelLeft("close");
      $meniu_tip.css("display",'inline');
    }
  );
  
  //Clicking on thumbnail changes the background image
  $outer_container_right_a.click(function(event){
    event.preventDefault();
    var $this=this;
    $bgimg.css("display","none");
    $preloader.fadeIn("fast"); //show preloader
    //style clicked thumbnail
    $outer_container_right_a.each(function() {
        $(this).children(".selected").css("display","none");
      });
    $(this).children(".selected").css("display","block");
    //get and store next image and selected thumb 
    $outer_container_right.data("selectedThumb",$this); 
    $bg.data("nextImage",$(this).next().attr("href")); 
    $bg.data("prevImage",$(this).prev().attr("href"));  
    $bg.data("newTitle",$(this).children("img").attr("title")); //get and store new image title attribute
    itemIndex=getIndex($this); //get clicked item index
    lastItemIndex=($outer_container_right_a.length)-1; //get last item index
    $bgimg.attr("src", "").attr("src", $this); //switch image
  }); 

  //clicking on $nextimg image loads the next one
  $nextimg.click(function(event){

   
    if($bg.data("nextImage")){ //if next image data is stored
      $bgimg.css("display","none");
      $preloader.fadeIn("fast"); //show preloader
      $($outer_container_right.data("selectedThumb")).children(".selected").css("display","none"); //deselect thumb
      if($bg.data("lastImageReached")!="Y"){
        $($outer_container_right.data("selectedThumb")).next().children(".selected").css("display","block"); //select new thumb
      } else {
        $outer_container_right_a.first().children(".selected").css("display","block"); //select new thumb - first
      }
      
      //store new selected thumb
      var selThumb=$outer_container_right.data("selectedThumb");
      if($bg.data("lastImageReached")!="Y"){
        $outer_container_right.data("selectedThumb",$(selThumb).next()); 
      } else {
        $outer_container_right.data("selectedThumb",$outer_container_right_a.first()); 
      }

      $bg.data("newTitle",$($outer_container_right.data("selectedThumb")).children("img").attr("title")); //get and store new image title attribute

      if($bg.data("lastImageReached")!="Y"){
        itemIndex++;
      } else {
        itemIndex=0;
      }
      //debugger;
      $bgimg.attr("src", "").attr("src", $bg.data("nextImage")); //switch image
     
    }

  });
   //clicking on $previmg image loads the previos image 
  $previmg.click(function(event){
    if($bg.data("prevImage")){ //if next image data is stored
      $bgimg.css("display","none");
      $preloader.fadeIn("fast"); //show preloader
      $($outer_container_right.data("selectedThumb")).children(".selected").css("display","none"); //deselect thumb
      if($bg.data("firstImageReached")!="Y"){
        $($outer_container_right.data("selectedThumb")).prev().children(".selected").css("display","block"); //select new thumb
      } else {
        $outer_container_right_a.last().children(".selected").css("display","block"); //select new thumb - first
      }
      
      //store new selected thumb
      var selThumb=$outer_container_right.data("selectedThumb");
      if($bg.data("firstImageReached")!="Y"){
        $outer_container_right.data("selectedThumb",$(selThumb).prev()); 
      } else {
        $outer_container_right.data("selectedThumb",$outer_container_right_a.last()); 
      }

      $bg.data("newTitle",$($outer_container_right.data("selectedThumb")).children("img").attr("title")); //get and store new image title attribute

      if($bg.data("firstImageReached")!="Y"){
        itemIndex--;
      } else {
        itemIndex=lastItemIndex;
      }
      //debugger;
      $bgimg.attr("src", "").attr("src", $bg.data("prevImage")); //switch image
     
    }

  });
  
  //function to get element index (fuck you IE!)
  function getIndex(theItem){
    for ( var i = 0, length = $outer_container_right_a.length; i < length; i++ ) {
      if ( $outer_container_right_a[i] === theItem ) {
        return i;
      }
    }
  }
  
  //toolbar (image view mode button) hover
  $toolbar.hover(
    function(){ //mouse over
      $(this).stop().fadeTo("fast",1);
    },
    function(){ //mouse out
      $(this).stop().fadeTo("fast",0.8);
    }
  ); 
  $toolbar.stop().fadeTo("fast",0.8); //set its original state
  
  //Clicking on toolbar changes the image view mode
  $toolbar.click(function(event){
    if($toolbar.data("imageViewMode")=="full"){
      ImageViewMode("fit");
    } else if($toolbar.data("imageViewMode")=="fit") {
      ImageViewMode("original");
    } else if($toolbar.data("imageViewMode")=="original"){
      ImageViewMode("full");
    }
  });
ImageViewMode("original");
  //next image balloon tip
  function NextImageTip(){
    if($bg.data("nextImage")){ //check if this is the first image 
      $thumbs_tip.stop().css("right",0).fadeIn("fast").fadeOut(2000,"easeInExpo",function(){$thumbs_tip.css("right",$(window).width());});
      $meniu_tip.stop().css("left",0).fadeIn("fast").fadeOut(2000,"easeInExpo",function(){$meniu_tip.css("left",20);});
    }
  }
//scroll 


  function scroll(){
       // top pozicija 
      
      var tid = setInterval(moveContainer, 30); //timerid
      function moveContainer(){
         
         if (yPos < visibleHeight12 && topContainer < 0){
            topContainer=topContainer+7;
         }
         else if (yPos > visibleHeight12 && yPos < visibleHeight23 && topContainer < 0){
            topContainer=topContainer+1;         
         }
         else if (yPos > visibleHeight23 && yPos < visibleHeight34 && topContainer > criBottom){
            topContainer=topContainer-1;
         }
         else if (yPos > visibleHeight34 && topContainer > criBottom){
            topContainer=topContainer-7;
         }
         $customScrollBox_container.css('top',topContainer);
         //$customScrollBox_container.stop().animate({top: topContainer}, speed,easing);
         //console.log(topContainer);
         if (cont=== false){
            abortTimer();
         }
      }
      function abortTimer() { // to be called when you want to stop the timer
         clearInterval(tid);
         }
   }
  //slide in/out left pane function
  function SlidePanels(action){
    var speed=900;
    var easing="easeInOutExpo";
    if(action=="open"){
     // $("#arrow_indicator").fadeTo("fast",0);
      $outer_container_right.stop().animate({right: 0}, speed,easing);
      //$bg.stop().animate({right: 585}, speed,easing);

    } else {
      $outer_container_right.stop().animate({right: -510}, speed,easing);
      //$bg.stop().animate({right: 0}, speed,easing,function(){$("#arrow_indicator").fadeTo("fast",1);});
    }
  }
 function SlidePanelLeft(action){
    var speed=900;
    var easing="easeInOutExpo";
    if(action=="open"){
      //$("#arrow_indicator").fadeTo("fast",0);
      $outer_container_left.stop().animate({left: 0}, speed,easing);
      //$bg.stop().animate({left: 285}, speed,easing);
    } else {
      $outer_container_left.stop().animate({left: -300}, speed,easing);
      //$bg.stop().animate({left: 0}, speed,easing,function(){$("#arrow_indicator").fadeTo("fast",1);});
    }
  }

//Image scale function
function FullScreenBackground(theItem){
  var winWidth=$(window).width();
  var winHeight=$(window).height();
  var imageWidth=$(theItem).width();
  var imageHeight=$(theItem).height();
  if($toolbar.data("imageViewMode")!="original"){ //scale
    $(theItem).removeClass("with_border").removeClass("with_shadow"); //remove extra styles of orininal view mode
    var picHeight = imageHeight / imageWidth;
    var picWidth = imageWidth / imageHeight;
    if($toolbar.data("imageViewMode")!="fit"){ //image view mode: full
      if ((winHeight / winWidth) < picHeight) {
        $(theItem).css("width",winWidth).css("height",picHeight*winWidth);
      } else {
        $(theItem).css("height",winHeight).css("width",picWidth*winHeight);
      };
    } else { //image view mode: fit
      if ((winHeight / winWidth) > picHeight) {
        $(theItem).css("width",winWidth*0.91).css("height",picHeight*winWidth*0.91);
      } else {
        $(theItem).css("height",winHeight*0.91).css("width",picWidth*winHeight*0.91);
      };
    }
    //center it
    $(theItem).css("margin-left",((winWidth - $(theItem).width())/2)).css("margin-top",((winHeight - $(theItem).height())/2));
  } else { //no scale
    //add extra styles for orininal view mode
    $(theItem).addClass("with_border").addClass("with_shadow");
    //set original dimensions
    $(theItem).css("width",$bg.data("originalImageWidth")).css("height",$bg.data("originalImageHeight"));
    //center it
    $(theItem).css("margin-left",((winWidth-$(theItem).outerWidth())/2)).css("margin-top",((winHeight-$(theItem).outerHeight())/2));
  }
}

//image view mode function - full or fit
function ImageViewMode(theMode){
  $toolbar.data("imageViewMode", theMode); //store new mode
  FullScreenBackground($bgimg); //scale bg image
  //re-style button
  if(theMode=="full"){
    $toolbar.html("<span class='lightgrey'>IMAGE VIEW MODE &rsaquo;</span> FULL");
  } else if(theMode=="fit") {
    $toolbar.html("<span class='lightgrey'>IMAGE VIEW MODE &rsaquo;</span> FIT");
  } else {
    $toolbar.html("<span class='lightgrey'>IMAGE VIEW MODE &rsaquo;</span> ORIGINAL");
  }
}

//preload script images
var images=["themes/fsgallery1/images/ajax-loader_dark.gif","themes/fsgallery1/images/round_custom_scrollbar_bg_over.png"];
$.each(images, function(i) {
  images[i] = new Image();
  images[i].src = this;
});
//center thumbs 
$(document).ready(function() {
  

	
   $ScrollBoxLeft=$("#ScrollBoxLeft");
  $customScrollBox=$("#customScrollBox");
    //meniu 2 lvl holder 
    $holder.each(function( index ) {
    $(this).click(function () {
        $(this).next().slideToggle("slow", function () {
        });
        });
    });
   	//nav meniu border right
	//var cheight = $navlineright.height();
	//var theight = $(window).height();
	//var nheight = $('#nav').height()
	//$navlineright.height(theight -(nheight - cheight)-10)
   //scroll position
    $outer_container_right.bind('mousemove',function(e){yPos=e.pageY;});
   $outer_container_right_a.first().trigger('click'); 
   //mouse wheeel
   skaicius=0;
   jQuery(function($) {
    $($outer_container_right)
        .bind('mousewheel', function(event, delta) {
            var vel = Math.abs(delta),dir = delta > 0 ? topContainer=topContainer+movePerScroll*vel : topContainer=topContainer - movePerScroll*vel;
            if (topContainer > 0) topContainer = 0;
            else if (topContainer < criBottom) topContainer =criBottom;
            return false;
        });
});
});





