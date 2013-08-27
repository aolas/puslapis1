<?php
 
class CustomSiteConfig extends DataExtension {
     
    static $db = array(
        'facebook_url' => 'Text',
        'google_plus_url' => 'Text',
        'pranesimas' => 'Text'
        
    );
    static $has_one = array(
        'logo' => 'Image',
    );
 
    public function updateCMSFields(FieldList $fields) {
        $fields->addFieldToTab('Root.Main', new TextField('facebook_url', 'Facebook adresas'));
        $fields->addFieldToTab('Root.Main', new TextField('google_plus_url', 'Google+ adresas'));
        $fields->addFieldToTab('Root.Main', new TextField('twitter_url', 'Twitter adresas'));
        $fields->addFieldToTab('Root.Main', new TextField('pranesimas', 'Pranesimas'));
        $fields->addFieldToTab("Root.Main", new UploadField('logo'));

    }
}
