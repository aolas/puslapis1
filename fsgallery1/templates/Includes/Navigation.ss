
<div id="outer_container_left">
	<img id="logo" src="themes/fsgallery1/images/logo6.png"/>
   <div id="ScrollBoxLeft">
      <!-- Menu Tabs -->
		<ul id="nav">
			<li class="lineRight"></li>
			<% control Menu(1) %>	  
  				<li class="border">
                    <% if RecordClassName = "GalleryHolder" %> 
                        <label class="holder s16">$MenuTitle</label>
                        <ul class="$LinkingMode">
                            <% control Children %>    
                                <li><a href="$Link" title="Go to the $Title.XML page" class="holder s16">$MenuTitle</a></li>
                            <% end_control %>
                        </ul>
                    <% else %>
                        <a href="$Link" title="Go to the $Title.XML page" class="holder s16">$MenuTitle</a>
                    <% end_if %>
				</li>
   	 	    <% end_control %>	
		</ul>	
   </div>
</div>
