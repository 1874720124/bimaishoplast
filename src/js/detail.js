require(["config"],()=>{
    require(["url","template","header","zoom","footer","fly"],(url,template,header)=>{
        class Detail{
            constructor(){
                // console.log(header);
                this.init();
                this.addcar();
            }
            init(){
                // 取id  比如location.href?id=41454；从下标为4取到末尾
                let id=Number(location.search.slice(4));
                this.id=id;
                $.get(url.rapBaseUrl+"detail/type",{id},res=>{
                    // console.log(res);
                    if(res.res_code===1){
                    //   添加id
                    // console.log(res.res_body);
                    // 获取到res_body里data对象
                        let {data}=res.res_body;
                        // rap2没法返回id，在返回的数据里加入id
                        data={...data,id};
                        data.id=id;
                        //购物车需要
                        this.data=data;
                        console.log(data);
                          // 渲染页面
                        this.render(data);
                    }
                })
            }
            render(data){
                $("#detail").html(template("detailTemp",{ data }));
                this.zoom();
            }
            zoom(){
                // zoom插件
                // zoom-img中图的classming
                $(".zoom-img").elevateZoom({
                    // gal1小图ul的容器
                    gallery:'gal1',
                    cursor: 'pointer',
                    galleryActiveClass: 'active',
                    borderSize:'1',    
                    borderColor:'#888'
                  });
            }
        }
        new Detail();
    })
})