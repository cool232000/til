let todos = [
  { id: 1, content: 'HTML', completed: true },
  { id: 2, content: 'CSS', completed: true },
  { id: 3, content: 'Javascript', completed: false },
];

const $todos = document.querySelector('.todos');

function render() {
  let html = '';
  $todos.innerHTML = '<span>로딩중...</span>';
  setTimeout(() => {
    todos.forEach(({ id, content, completed }) => {
      html += `<li id="${id}" class="todo-item"><label><input class="custom-checkbox" type="checkbox"${
        completed ? 'checked' : ''
      } id="ck-${id}">${content} </label><span class="remove-todo">X</span></li>`;
    });
    $todos.innerHTML = html;
  }, 700);
}

render();
