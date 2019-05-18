require(["config"],()=>{
    require(["url","template","header","footer"],(url,template)=>{
    //    console.log(template);
    // list页面的逻辑
    class List{
        constructor(){
            this.getData();   
        }
        // 请求商品的数据信息
        getData(){
        $.get(url.rapBaseUrl+"list/good",data=>{
            if(data.res_code===1){
                console.log(data);
                this.render(data.res_body.list);
            }
        })
        }
        // 利用请求的数据渲染页面
        render(list){
            $("#list-box").html(template('listpage-temp', { list }));
        }
    }
    new List();
    })
})