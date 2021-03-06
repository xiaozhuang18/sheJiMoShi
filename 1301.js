/*
Created by 14486 on 2019/9/1.
队列 (jq动画队列) 先进先出
   先进先出(同样借助于数组)
   功能:
       入队:enqueue
       出队:dequeue
       返回列首数据但不删除: first()
       清空: clear
       长度: size
*/
//基础队列类
let Queue = (function(){
    let symbol = Symbol();
    return class{
        constructor(){
            this[symbol] = [];
        }
        enqueue(ele){
            this[symbol].push(ele);
        }
        dequeue(){
            return this[symbol].shift();
        }
        first(){
            return this[symbol][0];
        }
        clear(){
            this[symbol] = [];
        }
        size(){
            return this[symbol].length;
        }
        print(){
            while (this.size())
                console.log( this.dequeue() );
        }
    }
})();
// 模仿jQuery动画队列的实现

let Aq = (function(){
    //继承Queue
    class _Queue extends Queue{
        constructor(props) {
            super(props);
            this.ifRun = false;
        }
        //遍历整个动画队列，并逐一执行
        run(){
            if( this.ifRun )return;
            //递归来完成动画队列的清空
            this.ifRun = true;
            (function r(){
                if( this.size() ){
                    new Promise(this.dequeue()).then(r.bind(this));
                }else{
                    this.ifRun = false;
                }
            }).call(this);
        }
    }
    //避免存储的对外暴露
    let dom = Symbol();
    //用来存储所有dom节点的动画队列
    let animateQueue = new Map();
    //Init类
    class Init{
        constructor(selector){
            this[dom] = document.querySelector(selector);
        }
        animate(options,time=300){
            //判断dom节点有没有注册过队列
            ( !animateQueue.has(this[dom]) )&& animateQueue.set(this[dom],new _Queue);
            //获取dom节点对应的动画队列
            let queue = animateQueue.get(this[dom]);
            //动画任务入队
            queue.enqueue((res)=>{
                this[dom].style.transition = time/1000 + "s";
                this[dom].offsetTop;
                for (let [key,value] of Object.entries(options)) {
                    this[dom].style[key] = value+'px';
                }
                setTimeout(res,time);
            });
            //动画队列调用
            queue.run();
            return this;
        }
    }
    //入口函数
    return function(selector){
        return new Init(selector);
    }
})();
Aq("#wrap")
    .animate({width:200,height:500},2000)
    .animate({height:200},1000)
    .animate({top:200},2000)
;