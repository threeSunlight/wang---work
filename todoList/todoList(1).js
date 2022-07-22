/**
 * 思路:
 * 1. content: ul,li 渲染是通过数组渲染的, []
 * 2. 数组中内容分析: 选中: 状态,checked,(true,false)
 *                  删除+样式翻转: id
 *                  内容: value
 *             最终数组的样子:  [{checked: boolean, id:number, value: string}]    
 * 3. 新增:     {checked: boolean, id:number, value: string}   通过第4个方法push
 *              3.1 id如何实现自增: nextId:1 ,
 *               判断一下数组长度是不是为空,新增, 
 *                  > 0, 我们id就需要自增了, nextId++
 * 4. 获取新增的内容: e.target.value     
 * 5. 删除:   获取当前li标签的id , --- this  
 *              5.1 Button按钮吧id传回来,this,我们要在button上添加id属性,(this)
 *              5.2 fliter,
 * 6. fotter: 左边:未完成: []中删选出checked为false的数组,获取长度,  调用页面渲染方法
 *            all: 渲染[],调用页面渲染方法
 *            active:     []中删选出checked为false的数组,获取长度,调用页面渲染方法
 *            actived: !和上面逻辑是相反的,调用页面渲染方法
 *             清空所有: 清空,数组,并且清空html,减少dom操作,提高性能,不调用页面渲染方法
 * 
 * 7. 封装渲染html---函数
 *      7.1 ul --- 我们获取到页面的ul标签即可
 *      7.2 数组循环渲染li标签生成内容的
 *      7.3 li ---   
 *              createElement('li')
 *              li.id = 
 *              li.className = 'item.checked'
 *          <li id="item.id">
 *              <div>
 *                  <input type="checkbox" id=""  oncang.....></input>  
 *                  <p></p>           
 *              </div>
 *              <button onclick="" id="item.id">X</button>
 *          </li>
 * 
 * 数据->视图 
 */

/**获取ul标签 */
let ul = document.getElementsByTagName("ul")[0];

/**todolist的data数据
 * checked 是否选中
 * value input框输入的值
 * id 唯一性id
 */
let todoArray = [];


/**定义唯一id */
let nextId = 1

/**
 * 获取新增数据内容
 */
function addTodoList(event) {
    if(!event || event.keyCode === 13) {
        // 首先获取input框的输入内容
        let inputValue = document.getElementsByClassName("input-todoList")[0].value;
        if(inputValue){
            circulation(inputValue);
            document.getElementsByClassName("input-todoList")[0].value = ''
        }
    }
}

/**
 * 新增数据,并且保证数据id的唯一性
 */
function circulation(inputValue) {
  // 首先获取ul标签
  // 存储数据,li标签的循环
  if(todoArray.length === 0) {
    // 如果数组的长度为0,表示为新增的唯一数据
    addOnce  = {
        checked: false, // true表示选中,false表示未选中
        value: inputValue,
        id: nextId,
      };
  } else {
       // 这里表示数组不是唯一的,id必须进行新增
    nextId ++
    addOnce = {
        checked: false, // true表示选中,false表示未选中
        value: inputValue,
        id: nextId,
      };
  }
  todoArray.push(addOnce);
  circulationHtml(todoArray);
}

/**
 * 根据数据的变化进行生成html
 */
function circulationHtml(date, checkId) {
  // 清空原来的元素
  ul.innerHTML = ''
   date.forEach((item) => {
    // 创建li标签
     let li = document.createElement("li");
     li.className = item.id == checkId &&  item.checked ? ' completed ' : item.checked ? "need-completed" : ''
     li.id = item.id
     li.innerHTML = ` 
        <div class="li-style-div">
            <input type="checkbox" class="checkbox" id=${item.id} ${
            item.checked ? "checked" : null
            } onchange="changeCheckboxDate(this)"></input>
            <p class="li-style-div-content">${item.value}</p>
        </div>
        <button class= ${item.id == checkId &&  item.checked ? ' completed ' : item.checked? "need-completed button-close " : "button-close"}  id=${item.id}  onclick=deleteDate(this)>X</button>
      `;
   ul.append(li)
  });
  changeLeftItem(date)
}

/**
 * 删除
 */
function deleteDate(ele) {
    todoArray = todoArray.filter(item => item.id != ele.id)
    circulationHtml(todoArray)
}

/**
 * 选中的时候改变数据结构,并且添加样式
 */
function changeCheckboxDate(ele) {
    todoArray.forEach(item => {
        if(item.id == ele.id) {
            item.checked = !item.checked
        }
    })
    circulationHtml(todoArray, ele.id)
}


/**
 * 左下角条数的变化
 */
function changeLeftItem(data) {
    document.getElementById('item-current').innerText = data.length <= 0 ? '无事项' :  data.length + '事项'
}

/**
 * 待完成的事项
 * 获取待办事件,并且更新视图
 */
function toBeCompleted() {
    let result = todoArray.filter(item => !item.checked )
    circulationHtml(result)
    document.getElementById("completed_order").classList.remove('clickButton');
    document.getElementById("allinfo").classList.remove('clickButton');
    document.getElementById("completed_todo").classList.add('clickButton');
    document.getElementById("clear_completed").classList.remove('clickButton');
}

/**
 * 已完成
 */

 function completed() {
    let result = todoArray.filter(item => item.checked )
    circulationHtml(result)
    document.getElementById("completed_order").classList.add('clickButton');
    document.getElementById("allinfo").classList.remove('clickButton');
    document.getElementById("completed_todo").classList.remove('clickButton');
    document.getElementById("clear_completed").classList.remove('clickButton');
}

/**
 * 清空所有
 */

function clearAll() {
    todoArray=[]
    ul.innerHTML = ''
   
    document.getElementById('item-current').innerText = '无事项'
    document.getElementById("completed_order").classList.remove('clickButton');
    document.getElementById("allinfo").classList.remove('clickButton');
    document.getElementById("completed_todo").classList.remove('clickButton');
    document.getElementById("clear_completed").classList.add('clickButton');
}

/**
 * 查看所有
 */
function viewAllInfo() {
   
    circulationHtml(todoArray)
    document.getElementById("completed_order").classList.remove('clickButton');
    document.getElementById("allinfo").classList.add('clickButton');
    document.getElementById("completed_todo").classList.remove('clickButton');
    document.getElementById("clear_completed").classList.remove('clickButton');
}

