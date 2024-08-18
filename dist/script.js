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

    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'flex space-x-2';

    const updateButton = document.createElement('button');
    updateButton.textContent = 'Update';
    updateButton.className = 'bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600';
    updateButton.addEventListener('click', function () {
        updateTodoItem(span, updateButton, deleteButton);
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'bg-gray-500 text-white px-2 py-1 rounded-md hover:bg-gray-600';
    deleteButton.addEventListener('click', function () {
        li.remove();
    });

    buttonContainer.appendChild(updateButton);
    buttonContainer.appendChild(deleteButton);

    li.appendChild(span);
    li.appendChild(buttonContainer);
    document.getElementById('todoList').appendChild(li);

    todoInput.value = '';
}

function updateTodoItem(span, updateButton, deleteButton) {
    const currentText = span.textContent;

    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentText;
    input.className = 'block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm';

    updateButton.textContent = 'Save';
    updateButton.className = 'bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600';
    updateButton.removeEventListener('click', updateTodoItem);
    updateButton.addEventListener('click', function () {
        saveUpdatedTodoItem(input, span, updateButton, deleteButton);
    });

    span.replaceWith(input);
}

function saveUpdatedTodoItem(input, span, updateButton, deleteButton) {
    const updatedText = input.value.trim();

    if (updatedText === '') return;

    span.textContent = updatedText;

    updateButton.textContent = 'Update';
    updateButton.className = 'bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600';
    updateButton.removeEventListener('click', saveUpdatedTodoItem);
    updateButton.addEventListener('click', function () {
        updateTodoItem(span, updateButton, deleteButton);
    });

    input.replaceWith(span);
}