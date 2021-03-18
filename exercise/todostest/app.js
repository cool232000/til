let todos = [
  { id: 1, content: 'HTML', completed: true },
  { id: 2, content: 'CSS', completed: true },
  { id: 3, content: 'Javascript', completed: false },
];

const $todos = document.querySelector('.todos');
const $inputTodo = document.querySelector('.input-todo');

const render = () => {
  let html = '';
  todos.forEach(({ id, content, completed }) => {
    html += `<li id="${id}" class="todo-item"><input class="custom-checkbox" type="checkbox"${
      completed ? 'checked' : ''
    } id="${id}"><label for=${id}>${content} </label><span class="remove-todo">X</span></li>`;
  });
  $todos.innerHTML = html;
};

const generateId = () => (todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1);

$inputTodo.addEventListener('keyup', e => {
  const content = $inputTodo.value.trim();
  if (content === '' || e.keyCode !== 13) return;
  $inputTodo.value = '';
  todos = [...todos, { id: generateId(), content, completed: false }];
  render();
});

$todos.addEventListener('change', ({ target }) => {
  const id = +target.parentNode.id;
  todos = todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  render();
});

$todos.addEventListener('click', ({ target }) => {
  if (!target.classList.contains('remove-todo')) return;
  todos = todos.filter(todo => todo.id !== +target.parentNode.id);
  render();
});

window.addEventListener('load', () => {
  $todos.innerHTML = '<span>로딩중...</span>';
  setTimeout(() => {
    render();
  }, 700);
});
