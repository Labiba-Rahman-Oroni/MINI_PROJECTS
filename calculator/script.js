(function(){
  var cur="0", prev=null, op=null, fresh=false;
  var sym={"+":"+","-":"−","*":"×","/":"÷"};
  var vEl=document.getElementById("value"), eEl=document.getElementById("expr");

  function fmt(s){
    if(s==="Error")return s;
    var n=parseFloat(s); if(!isFinite(n))return "Error";
    if(s.indexOf(".")>-1&&s.charAt(s.length-1)==="."||/\.\d*0$/.test(s)&&s.indexOf("e")<0)return s;
    return String(parseFloat(n.toPrecision(12)));
  }
  function render(){
    vEl.textContent=cur;
    eEl.textContent=op?(fmt(String(prev))+" "+sym[op]+(fresh?"":" "+cur)):"";
  }
  function calc(a,b,o){
    a=parseFloat(a);b=parseFloat(b);
    if(o==="+")return a+b; if(o==="-")return a-b; if(o==="*")return a*b;
    if(o==="/")return b===0?NaN:a/b;
    return b;
  }
  function out(n){return isFinite(n)?String(parseFloat(n.toPrecision(12))):"Error";}

  function num(d){
    if(cur==="Error"||fresh||cur==="0"){cur=d;} else if(cur.replace(/[-.]/g,"").length<12){cur+=d;}
    fresh=false;
  }
  function dot(){
    if(cur==="Error"||fresh){cur="0.";fresh=false;return;}
    if(cur.indexOf(".")<0)cur+=".";
  }
  function setOp(o){
    if(cur==="Error")return;
    if(op&&!fresh){var r=out(calc(prev,cur,op));prev=r;cur=r;if(r==="Error"){op=null;return;}}
    else if(!op){prev=cur;}
    op=o;fresh=true;
  }
  function equals(){
    if(!op||cur==="Error")return;
    var r=out(calc(prev,cur,op));
    eEl.textContent=fmt(String(prev))+" "+sym[op]+" "+cur+" =";
    cur=r;op=null;prev=null;fresh=true;
    vEl.textContent=cur;
  }
  function clear(){cur="0";prev=null;op=null;fresh=false;}
  function back(){
    if(fresh||cur==="Error"){return;}
    cur=cur.length>1?cur.slice(0,-1):"0";
    if(cur==="-")cur="0";
  }
  function percent(){
    if(cur==="Error")return;
    cur=out(parseFloat(cur)/100);
  }

  function handle(el){
    if(el.dataset.num!==undefined)num(el.dataset.num);
    else if(el.dataset.op)setOp(el.dataset.op);
    else{
      var a=el.dataset.act;
      if(a==="dot")dot(); else if(a==="equals"){equals();return;}
      else if(a==="clear")clear(); else if(a==="back")back(); else if(a==="percent")percent();
    }
    render();
  }
  document.getElementById("keys").addEventListener("click",function(e){
    var b=e.target.closest("button"); if(b)handle(b);
  });
  document.addEventListener("keydown",function(e){
    var k=e.key,sel=null;
    if(/^[0-9]$/.test(k))sel='[data-num="'+k+'"]';
    else if("+-*/".indexOf(k)>-1)sel='[data-op="'+k+'"]';
    else if(k==="."||k===",")sel='[data-act="dot"]';
    else if(k==="Enter"||k==="="){e.preventDefault();sel='[data-act="equals"]';}
    else if(k==="Backspace")sel='[data-act="back"]';
    else if(k==="Escape"||k==="Delete")sel='[data-act="clear"]';
    else if(k==="%")sel='[data-act="percent"]';
    if(sel){var b=document.querySelector(sel);if(b)handle(b);}
  });
  render();
})();
