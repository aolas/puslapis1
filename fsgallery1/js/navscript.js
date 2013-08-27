$outer_container_left=$("#outer_container_left");
$ScrollBoxLeft=$("#ScrollBoxLeft");
$meniu_tip=$("#meniu_tip");

//Sliding meniu 
  $holder = $('label.holder.s16');
//contact form textarea
  $textarea=$('textarea');
 
$(window).load(function() {
	$outer_container_left.css("padding-right",$(window).width()*0.1);
	$ScrollBoxLeft.height($(window).height())
});

$(window).resize(function() {
	$outer_container_left.css("padding-right",$(window).width()*0.1);
	$ScrollBoxLeft.height($(window).height())
});

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
$(document).ready(function() {
   //sliding meniu
   $holder.each(function( index ) {
    $(this).click(function () {
        $(this).next().slideToggle("slow", function () {
        });
        });
    });
    //$textarea.focus(function() { $(this).css("background", "none") });
    //$('input[type="text"], textarea').live('keyup focusout', function (e) {    alert(this.tagName);});
    $textarea.focusin(function() {
        $textarea.addClass('aktyvus');
    }).focusout(function() {
        $textarea.removeClass('aktyvus');
    });
});