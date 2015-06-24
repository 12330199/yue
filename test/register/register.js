temp=new Meteor.Collection("testMail");
if (Meteor.isClient) {
  
  UI.body.events({

    'click #fasongyanzheng':function() {
      var mail=document.getElementById("email").value;
      if(mail=="") {
        alert("邮箱不能为空");
      }
      else if (/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(mail) == false) {
         alert('邮箱格式不正确，请重新输入');
         document.getElementById("email").value="";
         
      }
      else {
        var num = Math.random()*10000 ;
        num = parseInt(num, 10);
        var sign=num.toString();
        var id=temp.find().count()+1;
        temp.insert({Mail:mail,Sign:sign,ID:id});
        var sign1='验证码是：'+sign;
       
        Meteor.call('sendEmail',
            mail,
            'yue_admin@163.com',
            'Hello from Meteor!',
            sign1);
        alert("验证码已发至您的邮箱，请稍作等待。");
      } 
     
    }
  });
 
  UI.body.events({

    'click #blogin': function () {
      var mail=document.getElementById("email").value;
      var pass=document.getElementById("password").value;
      var pp=document.getElementById("pp").value;
      
      if(mail=="") {
        alert("邮箱不能为空");
      }
      else if (/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(mail) == false) {
         alert('邮箱格式不正确，请重新输入');
         document.getElementById("email").value="";
         
       }
      else {
        if(User.find({Mail:mail}).count()>20)
        {
          alert("邮箱已经注册过了，请用其他邮箱注册");
          document.getElementById("email").value="";
          document.getElementById("password").value="";
          document.getElementById("pp").value="";
        }
        else if(pass=="")
        {
          alert("密码不能为空");
        }
        else if(pass!=pp) 
        {
          alert("两次输入密码不一致，请重新输入");
          document.getElementById("password").value="";
          document.getElementById("pp").value="";
        }
        else {
          var ss=document.getElementById("yanzhengma").value;
          
         
          if(ss=="")
          {
            alert("验证码不能为空");
          }

          else {
            
            var aa=temp.find({Mail:mail});  
            var count=0;
            aa.forEach(function(bb){
              if(ss==bb.Sign) {
                   count=1;
                   User.insert({Mail:mail,Pass:pass});
                   Meteor.call('sendEmail',
                     mail,
                    'yue_admin@163.com',
                    'Hello from Meteor!',
                    'Congratulations, the registration is successful!');
                  

                  Session.set("currentUrl", {login: "active", page: "", reg: "",sendMail:"",setting:""});
                  Router.redirect("/");
                
                }
                
                   
            
            });
            if(count==0)
              alert("验证码错误");

           
          }          


        }
      
      }
    }
  });
  
  
}

if(Meteor.isServer) {

Meteor.startup(function () {

        //get value from browser  
      


  process.env.MAIL_URL = 'smtp://postmaster@sandboxbd0b40909f0e4e149dbdf704b4d0a886.mailgun.org:62f9e10e8fba10ff401cefa94548fb29@smtp.mailgun.org';
});


Meteor.methods({
  "sendEmail": function (to, from, subject, text) {
    check([to, from, subject, text], [String]);
    
    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();

    Email.send({
      to: to,
      from: from,
      subject: subject,
      text: text
    });
    return true;
  }

});

  


  
}
