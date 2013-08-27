
<% require javascript(themes/fsgallery1/js/lib/jquery-1.8.2.min.js) %>
<% require javascript(themes/fsgallery1/js/lib/jquery-ui.min.js) %>
<% require javascript(themes/fsgallery1/js/lib/jquery.easing.1.3.js) %>
<% require javascript(themes/fsgallery1/js/lib/jquery.mousewheel.min.js) %>

<% require javascript(themes/fsgallery1/js/script.js) %>
<% base_tag %> 


<div id="bg">

<% control Gallerys.First %> <img src="$URL" id="bgimg" /> <% end_control %>

  <div id="preloader"><img src="themes/fsgallery1/images/ajax-loader_dark.gif" width="32" height="32" align="absmiddle" />LOADING...</div>
    <div id="arrow_indicator"><img src="themes/fsgallery1/images/sw_arrow_indicator.png" width="50" height="50"  /></div>
    <div id="meniu_tip">Meniu</div>
    <div id="thumbs_tip">Thumbnails</div>
    <div id ="bgSectorBackward"></div>
    <div id ="bgsectorForward"></div>
</div>

<div id="outer_container_right">
   <div id="customScrollBox">
      <div class="container">

         <div class="content">
             
            <div class="clear"></div>
				<% control getGalleryImages %>          
					<a href="$Image.URL" title="$Title" class="thumb_link"><span class="selected"></span>$Image.SetHeight(80)</a>
				<% end_control %>
            <p class="clear"></p>
         </div>
      </div>
    
</div>

</div>

<div id="prelauderCpntainer">
<ul>
<% control getGalleryImages %>     
<li>$Image.URL</li>
<% end_control %>
</ul>
</div>
