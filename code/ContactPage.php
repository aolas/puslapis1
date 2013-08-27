<?php
class ContactPage extends Page {
    static $db = array(
        'facebook_url' => 'Text',
        'google_plus_url' => 'Text',
        'twitter_url' => 'Text',
        'telef' => 'Text',
        'el_pastas' => 'Text'
        
    );
    public function getCMSFields() {
        $fields = parent::getCMSFields();
        
        $fields->addFieldToTab('Root.Main', new TextField('facebook_url', 'Facebook adresas'), 'Content');
        $fields->addFieldToTab('Root.Main', new TextField('google_plus_url', 'Google+ adresas'), 'Content');
        $fields->addFieldToTab('Root.Main', new TextField('twitter_url', 'Twitter adresas'), 'Content');
        $fields->addFieldToTab('Root.Main', new TextField('telef', 'Telefonas'), 'Content');
        $fields->addFieldToTab('Root.Main', new TextField('el_pastas', 'Email'), 'Content');
         
        return $fields;
    }
}
class MyForm extends Form {
 
    public function __construct($controller, $name) {
        $fields = new FieldList(
            TextField::create("Vardas"),
            EmailField::create("Emailas"),
            TextField::create("Telefonas"),
            TextareaField::create("Zinute")
        );
        $actions = new FieldList(FormAction::create("doSend")->setTitle( _t("Submit")));
        parent::__construct($controller, $name, $fields, $actions);
    }
     
    public function doSend(array $data, Form $form) {
        // Do something with $data

        Controller::curr()->redirectBack();
    }
     
    public function forTemplate() {
        return $this->renderWith(array($this->class, 'Form'));
    }
}


class ContactPage_Controller extends Page_Controller {
    public static $allowed_actions = array(
        'SendForm',
        'doSend',
        
    );
    public function SendForm() { 
        error_log("You messed up real bad!", 3, "/var/tmp/my-errors.log");
        return new MyForm($this,'doSend'); 
    }
    public function doSend() { 
        error_log("You messed up!", 3, "/var/tmp/my-errors.log");
        $e = new Email();
        $e->To = "ramunas.daukas@192.168.88.254";
        $e->Subject = "Hi there";
        $e->Body = "I just really wanted to email you and say hi.";
        $e->send();
        //$this->sessionMessage('success', 'good');
        Controller::curr()->redirect("/kontaktai/");
    }

}