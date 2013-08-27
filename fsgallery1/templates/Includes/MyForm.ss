<form $FormAttributes>
    <% if Message %>
        <p id="{$FormName}_error" class="message $MessageType">$Message</p>
    <% else %>
        <p id="{$FormName}_error" class="message $MessageType" style="display: none"></p>
    <% end_if %>
     
    <fieldset>
        <div id="Vardas" class="field">
            <label class="left" for="{$FormName}_Vardas">Vardas</label>
            <br>
            $Fields.dataFieldByName(Vardas)
        </div>
        <div id="Emailas" class="field">
            <label class="left" for="{$FormName}_Emailas">Elektroninis paštas</label>
            <br>
            $Fields.dataFieldByName(Emailas)
        </div>
        <div id="Telefonas" class="field">
            <label class="left" for="{$FormName}_Telefonas">Telefonas</label>
            <br>
            $Fields.dataFieldByName(Telefonas)
        </div>
        <div id="Tekstas" class="field">
            <label class="left" for="{$FormName}_Zinute">Žinutė</label>
            <br>
            $Fields.dataFieldByName(Zinute)
        </div>
        $Fields.dataFieldByName(SecurityID)
    </fieldset>
     
    <% if Actions %>
    <div class="Actions">
        <% loop Actions %>$Field<% end_loop %>
    </div>
    <% end_if %>
</form>