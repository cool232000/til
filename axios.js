let todos = [];
let navState = 'all';

const $todos = document.querySelector('.todos');
const $inputTodo = document.querySelector('.input-todo');
const $navState = document.querySelector('.nav');
const $checkAll = document.querySelector('.complete-all > .checkbox');
const $removeCompleted = document.querySelector('.clear-completed > .btn');
const $completedTodos = document.querySelector('.completed-todos');
const $activeTodos = document.querySelector('.active-todos');

const render = () => {
  const copyTodos = todos.filter(({ completed }) =>
    navState === 'active' ? !completed : navState === 'completed' ? completed : true,
  );
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

const getTodos = async () => {
  try {
    const { data } = await axios.get('/todos');
    todos = data;
    render();
  } catch (err) {
    console.log(err);
  }
};

const generateId = () => (todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1);

window.onload = getTodos;

$inputTodo.addEventListener('keyup', async ({ keyCode, target }) => {
  const content = target.value.trim();
  if (keyCode !== 13 || content === '') return;
  try {
    const { data } = await axios.post('/todos', { id: generateId(), content, completed: false });
    todos = data;
    render();
  } catch (err) {
    console.log(err);
  }
  target.value = '';
});

$navState.addEventListener('click', ({ target }) => {
  if (!target.matches('.nav > li')) return;
  const { id } = target;
  [...$navState.children].map(navItem => navItem.classList.toggle('active', navItem.id === id));
  navState = id;
  render();
});

$todos.addEventListener('change', async ({ target }) => {
  const { id } = target.parentNode;
  const completed = target.checked;
  try {
    const { data } = await axios.patch(`/todos/${id}`, { completed });
    todos = data;
    render();
  } catch (err) {
    console.log(err);
  }
});

$todos.addEventListener('click', async ({ target }) => {
  const { id } = target.parentNode;
  if (!target.matches('.todos > li > i')) return;
  try {
    const { data } = await axios.delete(`/todos/${id}`);
    todos = data;
    render();
  } catch (err) {
    console.log(err);
  }
});

$checkAll.addEventListener('change', async ({ target }) => {
  const completed = target.checked;
  try {
    const { data } = await axios.patch('/todos', { completed });
    todos = data;
    render();
  } catch (err) {
    console.log(err);
  }
});

$removeCompleted.addEventListener('click', async () => {
  try {
    const { data } = await axios.delete('/todos/completed');
    todos = data;
    render();
  } catch (err) {
    console.log(err);
  }
});
