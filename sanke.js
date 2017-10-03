// 属性：
// 蛇 arr
// 方法：
// 画线 drawLine
// 画蛇 drawSanke
// 移动 move
function sanke() {
    this.sence = document.querySelector('.sence');
    this.sanke = ['1_1', '2_1', '3_1'];
    this.direction = 40;
    this.flagfood = {'1_1':true,'2_1':true,'3_1':true}
    this.food=['0_0'];
}
sanke.prototype={
    //开始
    start:function () {
        this.drawLine();
        this.drawSanke();
        this.move();
        this.key();
        this.dropFood();
    },
    //画棋盘
    drawLine:function () {
        for(let i=0;i<20;i++){
            for(let j=0;j<20;j++){
                this.sence.innerHTML+=`
                <div class="box" id="${i}_${j}"></div>     
                `                                                //i是Y轴，j是X轴
            }
        }
    },
    //画蛇
    drawSanke:function () {
        // let divs=document.querySelectorAll('.sence>div')
        this.sanke.forEach((element)=>{
            document.getElementById(element).classList.add('hot');
        })
    },
    //移动
    move:function () {
         let that=this;
        this.t=setInterval(function () {
            let oldh=that.sanke[that.sanke.length-1];   //旧头的坐标
            let arr=oldh.split('_');   //转化成字符串
            let newh='';
            if(that.direction==37){

                newh=`${arr[0]*1}_${arr[1]*1-1}`;  //新头的坐标
            }
            if(that.direction==38){
                 newh=`${arr[0]*1-1}_${arr[1]*1}`;  //新头的坐标
            }
            if(that.direction==39){
                 newh=`${arr[0]*1}_${arr[1]*1+1}`;  //新头的坐标
            }
             if(that.direction==40){
                 newh=`${arr[0]*1+1}_${arr[1]*1}`;  //新头的坐标
            }
            let newarr=newh.split('_');
             //死亡   碰壁和撞身体
            if(newarr[0]<0||newarr[0]>19||newarr[1]<0||newarr[1]>19||that.flagfood[newh]){
                     clearInterval(this.t);
                     alert('游戏结束，是否退出')
            }
            //吃食物
            if(newh==that.food){
                that.sanke.push(newh);
               that.flagfood[newh]=true;
               document.getElementById(that.food).style.background='#fff';
            }else{
                that.sanke.push(newh);    //把新头的坐标加进去
                // document.getElementById(newh).classList.add('hot');
                let wei=that.sanke.shift();  //去掉旧尾的位置
                document.getElementById(wei).classList.remove('hot'); //删除旧尾的样式
                that.drawSanke();
                console.log(that.sanke)
            }
        },500)
    },
//方向
    key:function () {
        document.onkeydown= function (e) {

                if(Math.abs(e.keyCode-this.direction)==2){
                    return;
                }
            this.direction=e.keyCode;
                console.log(this.direction);
            }.bind(this)
    },
//食物
    dropFood:function () {
        let x=Math.floor(Math.random()*20);
        let y=Math.floor(Math.random()*20);
        // this.flagfood[`$[x]_$[y]`];
        do{
            this.food=`${x}_${y}`
        }while (this.flagfood[`$[x]_$[y]`]);
        document.getElementById( this.food).style.background='yellow';

    }











}