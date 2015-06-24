User = new Meteor.Collection("user");//global variable
//route have problems
post=new Meteor.Collection("bbb");


if (Meteor.isClient) {

Template.container.created=function(){
Session.setDefault("currentUrl", {login: "", page: "", reg: "",sendMail:"active",setting:""});


var urlRouter = Backbone.Router.extend({
  routes: {
    "": "login",
    "page": "page",
    "reg": "reg",
    "sendMail":"sendMail"
  },
  login: function () {
    Session.set("currentUrl", {login: "active", page: "", reg: "",sendMail:"",setting:""});
  },
  page: function () {
   
    Session.set("currentUrl", {login: "", page: "active", reg: "",sendMail:"",setting:""});
  },
  reg: function () {
    
    Session.set("currentUrl", {login: "", page: "", reg: "active",sendMail:"",setting:""});
  },
  sendMail: function () {
    
    Session.set("currentUrl", {login: "", page: "", reg: "",sendMail:"active",setting:""});
  },
  
  redirect: function (url) {
    this.navigate(url, true);
  }
  
});

Router = new urlRouter;

Meteor.startup(function () {
  Backbone.history.start({pushState: true});
});
}

Template.container.currentUrl = function () {
  return Session.get("currentUrl");
};
}
