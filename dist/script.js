document.getElementById('todoForm').addEventListener('submit', function (event) {
    event.preventDefault();
    addTodo();
});

function addTodo() {
    const todoInput = document.getElementById('todoInput');
    const todoText = todoInput.value.trim();

    if (todoText === '') return;

    const li = document.createElement('li');
    li.className = 'flex justify-between items-center bg-gray-100 px-4 py-2 rounded-md shadow';

    const span = document.createElement('span');
    span.textContent = todoText;

    const updateButton = document.createElement('button');
    updateButton.textContent = 'Update';
    updateButton.className = 'ml-4 bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600';
    updateButton.addEventListener('click', function () {
        updateTodoItem(span, updateButton);
    });

    li.appendChild(span);
    li.appendChild(updateButton);
    document.getElementById('todoList').appendChild(li);

    todoInput.value = '';
}

function updateTodoItem(span, updateButton) {
    const currentText = span.textContent;

    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentText;
    input.className = 'block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm';

    updateButton.textContent = 'Save';
    updateButton.className = 'ml-4 bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600';
    updateButton.removeEventListener('click', updateTodoItem);
    updateButton.addEventListener('click', function () {
        saveUpdatedTodoItem(input, span, updateButton);
    });

    span.replaceWith(input);
}

function saveUpdatedTodoItem(input, span, updateButton) {
    const updatedText = input.value.trim();

    if (updatedText === '') return;

    span.textContent = updatedText;

    updateButton.textContent = 'Update';
    updateButton.className = 'ml-4 bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600';
    updateButton.removeEventListener('click', saveUpdatedTodoItem);
    updateButton.addEventListener('click', function () {
        updateTodoItem(span, updateButton);
    });

    input.replaceWith(span);
}