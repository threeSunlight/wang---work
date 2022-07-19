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
function circulationHtml(date) {
  // 清空原来的元素
  ul.innerHTML = ''
   date.forEach((item) => {
    let li = document.createElement("li");
     li.className = "li-style";
     li.id = item.id
     li.innerHTML = ` 
      <div class="li-style-div">
        <input type="checkbox" class="checkbox" id=${item.id} ${
          item.checked ? "checked" : null
        } onchange="changeCheckboxDate(this)"></input>
        <p class="li-style-div-content">${item.value}</p>
      </div>
     <button class="button-close" id=${item.id}  onclick=deleteDate(this)>X</button>
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
    circulationHtml(todoArray)
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
}

/**
 * 已完成
 */

 function completed() {
    let result = todoArray.filter(item => item.checked )
    circulationHtml(result)
}

/**
 * 清空所有
 */

function clearAll() {
    todoArray=[]
    ul.innerHTML = ''
    document.getElementById('item-current').innerText = '无事项'
}

/**
 * 查看所有
 */
function viewAllInfo() {
    circulationHtml(todoArray)
}
