require(['config'],()=>{
    require(["url", "template","swiper",'header',"footer"],(url,template,Swiper)=>{
        // swiper不依赖jquery，满足AMD规范
        class Index {
            constructor () {
                this.getData();
                this.move();
                this. banner();
            }
            // banner上个区的文字移动
            move(){
             
                $("#wordsMove").show("slow",function(){
           
                });
           
             
            }
            banner () {
                // console.log(Swiper);
                var mySwiper = new Swiper ('.swiper-container', {
                    // 默认水平方向
                    // direction: 'vertical', // 垂直切换选项
                    loop: true, // 循环模式选项
                    autoplay: true,//可选选项，自动滑动
                    clickable:true,//分页器可点击
                    // 如果需要分页器
                    pagination: {
                      el: '.swiper-pagination',
                    },
                    
                    // 如果需要前进后退按钮
                    navigation: {
                      nextEl: '.swiper-button-next',
                      prevEl: '.swiper-button-prev',
                    },
                    
                  },
                 )        
            }
           getData(){
            $.get(url.rapBaseUrl+"index/list",data=>{
                if(data.res_code===1){
                    this.render(data.res_body);
                }
            })
            }
            // 请求的三张图片渲染主页
            render(list){
               $("#container1-temp").html(template('container1', { list }));
            }
        }
        new Index();
    })
})