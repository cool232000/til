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
const ajax = (() => {
  const requset = (method, url, callback, payload) => {
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
  return {
    get(url, callback) {
      requset('GET', url, callback);
    },
    post(url, payload, callback) {
      requset('POST', url, callback, payload);
    },
    patch(url, payload, callback) {
      requset('PATCH', url, callback, payload);
    },
    delete(url, callback) {
      requset('DELETE', url, callback);
    },
  };
})();

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
  ajax.get('/todos?_sort=id&_order=desc', res => {
    todos = res;
    render();
  });
};

// Event binding
window.onload = getTodos;

$inputTodo.addEventListener('keyup', ({ keyCode, target }) => {
  const $target = target;
  const content = $target.value.trim();
  if (keyCode !== 13 || content === '') return;
  ajax.post('/todos', { id: generateId(), content, completed: false }, res => {
    todos = [res, ...todos];
    render();
  });
  $target.value = '';
});

$navState.addEventListener('click', ({ target }) => {
  if (!target.matches('.nav > li')) return;
  const { id } = target;
  [...$navState.children].map(navItem => navItem.classList.toggle('active', navItem.id === id));
  navState = id;
  render();
});

$todos.addEventListener('change', ({ target }) => {
  const { id } = target.parentNode;
  const completed = target.checked;
  ajax.patch(`/todos/${id}`, { completed }, res => {
    todos = todos.map(todo => (todo.id === +id ? res : todo));
    render();
  });
});

$todos.addEventListener('click', ({ target }) => {
  const targetId = target.parentNode.id;
  if (!target.matches('.todos > li > i')) return;
  ajax.delete(`todos/${targetId}`, () => {
    todos = todos.filter(({ id }) => id !== +targetId);
    render();
  });
});

$checkAll.addEventListener('click', ({ target }) => {
  const completed = target.checked;
  ajax.get('/todos', res => {
    res.map(({ id }) => ajax.patch(`/todos/${id}`, { completed }, data => {
      todos = todos.map(todo => (todo.id === id ? data : todo));
      render();
    }));
  });
});

$clearCompleted.addEventListener('click', () => {
  ajax.get('/todos?completed=true', res => {
    res.filter(({ id }) => ajax.delete(`todos/${id}`, () => {
      todos = todos.filter(todo => todo.id !== id);
      render();
    }));
  });
});
