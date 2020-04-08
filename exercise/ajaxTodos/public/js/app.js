// variable
let todos = [];
let navState = 'all';

// DOM selector
const $inputTodo = document.querySelector('.input-todo');
const $navState = document.querySelector('.nav');
const $todos = document.querySelector('.todos');
const $completedTodos = document.querySelector('.completed-todos');
const $activeTodos = document.querySelector('.active-todos');
const $checkAll = document.querySelector('.complete-all > .checkbox');
const $clearCompleted = document.querySelector('.clear-completed > .btn');

// ajax
const ajax = (method, url, callback, payload) => {
  const xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader('content-type', 'application/json');
  xhr.send(JSON.stringify(payload));
  xhr.onload = () => {
    if ((xhr.status === 200) || (xhr.status === 201)) {
      callback(JSON.parse(xhr.response));
    } else {
      console.error(`${xhr.status}, ${xhr.statusText}`);
    }
  };
};

// function
const render = () => {
  const copyTodos = todos.filter(({ completed }) => (navState === 'active' ? !completed : navState === 'completed' ? completed : true));
  let html = '';
  copyTodos.forEach(({ id, content, completed }) => {
    html += `<li id="${id}" class="todo-item">
      <input id="ck-${id}" class="checkbox" type="checkbox" ${completed ? 'checked' : ''}>
      <label for="ck-${id}">${content}</label>
      <i class="remove-todo far fa-times-circle"></i>
    </li>`;
  });
  $checkAll.checked = copyTodos.every(({ completed }) => completed) && copyTodos.length !== 0;
  $completedTodos.innerHTML = todos.filter(({ completed }) => completed).length;
  $activeTodos.innerHTML = todos.filter(({ completed }) => !completed).length;
  $todos.innerHTML = html;
};

const generateId = () => (todos.length ? (Math.max(...todos.map(({ id }) => id)) + 1) : 1);

const getTodos = () => {
  ajax('GET', '/todos?_sort=id&_order=desc', data => {
    todos = data;
    render();
  });
};

const post = content => {
  ajax('POST', '/todos', data => {
    todos = [data, ...todos];
    render();
  }, { id: generateId(), content, completed: false });
};

const patch = (target, id) => {
  ajax('PATCH', `/todos/${id}`, data => {
    todos = todos.map(todo => (todo.id === data.id ? data : todo));
    render();
  }, { completed: target.checked });
};

const remove = id => {
  ajax('DELETE', `todos/${id}`, () => {
    getTodos();
    render();
  });
};

// Event binding
window.onload = getTodos;

$inputTodo.addEventListener('keyup', ({ keyCode, target }) => {
  const $target = target;
  const content = $target.value.trim();
  if (keyCode !== 13 || content === '') return;
  post(content);
  $target.value = '';
});

$navState.addEventListener('click', ({ target }) => {
  if (!target.matches('.nav > li')) return;
  const { id } = target;
  [...$navState.children].map(navItem => navItem.classList.toggle('active', navItem.id === id));
  navState = id;
  render();
});

$todos.addEventListener('change', ({ target }) => patch(target, +target.parentNode.id));

$todos.addEventListener('click', ({ target }) => {
  if (!target.matches('.todos > li > i')) return;
  remove(+target.parentNode.id);
});

$checkAll.addEventListener('change', ({ target }) => todos.map(({ id }) => patch(target, id)));

$clearCompleted.addEventListener('click', () => {
  ajax('GET', '/todos?completed=true', data => data.filter(({ id }) => remove(id)));
});
