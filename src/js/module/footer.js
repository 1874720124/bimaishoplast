
define(["jquery"],$=>{
    function Footer(){
    this.container=$("#footer-container");
    // console.log(this.container)
    this.load();
    }
    Footer.prototype.load=function(){
    return new Promise(resolve=>{
         // jquery的load方法
        this.container.load('/html/module/footer.html', () => {
                resolve();
              })
    })
    }
    return new Footer();
})