
define(['jquery',"url","cookie"], ($,url) => {
    function Header () {
      this.container = $("#header-container");
      this.load()
      .then(() => {
        this.typedropdown();
        this.search();
        this.loginBtn();
        this.registerBtn();
        this.Islogin();
        this.calcNum();
        
      })
    }
    $.extend(Header.prototype, {
      load () {
        return new Promise(resolve => {
          this.container.load('/html/module/header.html', () => {
            // load异步执行结束
            resolve();
          });
        })
      },
    //  头部分类下拉
      typedropdown(){
        $(".typeDropDown").on("mouseenter",()=>{
          $("#goodstypes").show();
        })
        $("#goodstypes").on("mouseleave",()=>{
          $("#goodstypes").hide();
        })
      },
      // 搜索
      search () {
        $("#searchBtn").on("click",()=>{
          $("#searchBtn").hide();
          $("#searchInput").show("slow");
        })
        $("#searchInput").on("keyup",function(){
          let keywords=$(this).val();
          // 请求百度jsonp接口
          $.getJSON("https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?cb=?&wd="+keywords,data=>{
            console.log(data);
          })
        })

      },
      loginBtn(){
        let div=$("<div>");
        div.addClass("shadow");
        $("#login-btn").on("click", function(){
          $(document.body).append(div);
          $("#modalWarp").show("slow",function(){
            $("#close-btn1").on("click",function(){
              $("#modalWarp").hide("slow");
              div.remove();
            })
         
          });

          });
          this.login();
       
      },
      registerBtn(){
        let div=$("<div>");
        div.addClass("shadow");
        $("#register-btn").on("click", function(){
          $(document.body).append(div);
          $("#register-modal").show("slow",function(){
          $("#close-btn2").on("click",function(){
            $("#register-modal").hide("slow");
            div.remove();
          })
          });
          });
          this.register();
       
      },
      // 注册：取数据传后端
      register(){
       $("#re-btn").on("click",()=>{
        let username=$("#register-usename").val();
        let password=$("#register-pwd").val();
        // console.log(url.phpUrl);
        $.post(url.phpUrl+"bmaiuser/register.php",
         {username,password},
         (data)=>{
          if(data.res_code===1){
            // // 注册成功，弹框提示成功，需要注册框消失,出现登录框
            console.log(data);
            $("#register-modal").hide("fast");
             alert(data.res_message+",去登录吧");
             $(".shadow").remove();
            //  div.remove();
            // this.loginBtn();
            setTimeout( $("#login-btn").click(),1000);
          }
        },
        "json"
        )

      })

      },
      // 登录获取数据,跳转页面
      login(){
        $("#modal-login").on("click",()=>{
          // 取值
          let username_log=$("#username").val();
          let password_log=$("#pwd").val();
          console.log(username_log)
          // 传后端
          $.post(url.phpUrl+"bmaiuser/login.php",
          {username_log,password_log},
          (data)=>{
            // console.log(data)
           if(data.res_code===1){
            $(".shadow").remove();
             // 登录成功
            this.logSuccess(data,username_log);

         }
         else{
           alert(data.res_message);
         }
        },
         "json"
         )
          })
      },
      logSuccess(data,usename){
        // console.log(123);
      // 存cookie
      let expires=$("#remberme").prop("checked")?{expires:7}:{};
      expires=Object.assign({path:"/"},expires);
      $.cookie("username",username,expires);
      alert(data.res_message+"即将跳转首页")
      $("#modalWarp").hide("fast");
      window.open("/");
     },
     Islogin(){
       this.unlogin=$("#unlogin");
       this.havelogined=$("#havelogined");
       this.mydrapdown=$("#mydrapdown");
       this.username=$.cookie("username");
      //  cookie还在时效内，显示登录状态
       if(this.username){
        //  console.log(12);
        this.unlogin.hide();
        this.havelogined.show();
        this.havelogined.on("mouseenter",()=>{
          this.mydrapdown.css("opacity","1");
        }).on("mouseleave",()=>{
          this.mydrapdown.css("opacity","0");
        });
        // 退出登录状态
       $("#drapdownExit").on("click",()=>{
         if(confirm("确定要退出吗？")){
          // console.log(13);
          this.unlogin.show();
          this.havelogined.hide();
          $.removeCookie("username",{path:"/"})
         }
        })
       }else{

        this.unlogin.show();
        // console.log(11);
        this.havelogined.hide();
       }
     },
    //  计算购物车数量，总数量等于每条商品的num的和
     calcNum(){
       cart =localStorage.getItem("cart");
       if(cart){
         cart=JSON.parse(cart);
         let num=0;
         cart.forEach((shop,item)=>{
          num+=shop.num;
         })
         $("#carNum").html(num);
       }

     }
    })
    return new Header();
  });