//1.在每个span后面添加close节点
var myNodelist=document.getElementsByTagName("li")
 
for (var i=0;i<myNodelist.length;i++)
{
  var span=document.createElement("span");
 
  var txt=document.createTextNode("\u00D7");
 
  span.className="close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
 
}
 
//2.处理删除事件
var close=document.getElementsByClassName("close")
for (var i=0;i<close.length;i++)
{
  close[i].onclick=function () {
    //parentElement表示返回当前节点的父元素节点
    var div=this.parentElement
    div.style.display="none"
  }
}
 
//3.处理任务完成事件
var list=document.querySelector("ul")
console.log(list)
list.addEventListener('click',function (ev) {
//event.target属性可以用来实现事件委托，例如将事件绑定在ul上，但是点击li时可以被触发
  //tagName是获取元素的标签名
  if (ev.target.tagName === 'LI')
{
  //toggle方法在被选元素上进行hide（）和show（）之间的切换
  //classList对元素的class继续操作
  ev.target.classList.toggle('check')
}
},false);
 
//4.处理点击add按钮，列表中添加一个待办事项
 
function addElement(){
  var things=document.getElementById('things').value
 
 // alert(localStorage.setItem("mutodolist",JSON.stringify(things)))
 
  var li=document.createElement('li')
 
  var t=document.createTextNode(things)
 
  if (things == '')
  {
    alert("请输入待办事件")
  }
  else
  {
    list.appendChild(li)
    li.appendChild(t)
  }
 
  var span=document.createElement('span')
  var txt=document.createTextNode('\u00D7')
 
  span.className='close'
  span.appendChild(txt)
  li.appendChild(span)
 
  for (var i=0;i<close.length;i++)
  {
    close[i].onclick=function () {
      var div=this.parentElement
      div.style.display="none"
    }
  }
}
 