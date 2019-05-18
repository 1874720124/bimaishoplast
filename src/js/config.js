require.config({
    baseUrl:"/",
    paths:{
        "jquery":"libs/jquery/jquery-3.2.1",
        "header":"js/module/header",
        "footer":"js/module/footer",
        "url":"js/module/url",
        "template":"libs/art-template/template-web",
        "cookie":"libs/jquery-plugins/jquery.cookie",
        // "bootstrap":"libs/bootstrap/js/bootstrap.min"
        "zoom":"libs/jquery-plugins/jquery.elevateZoom-3.0.8.min",
        "swiper":"libs/swiper/js/swiper",
        "fly":"libs/jquery-plugins/jquery.fly"
    },
    // 给不满足AMd规范的插件安装垫片
    shim:{
       "cookie":{
           deps:["jquery"]
       },
       "zoom":{
        deps:["jquery"]
    },
    "fly":{
    deps:["jquery"]
    }
    }
})