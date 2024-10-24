// document.addEventListener('DOMContentLoaded', function() {
//     const todoList = document.getElementById('todo-list');
//     const inProgressList = document.getElementById('in-progress-list');
//     const completedList = document.getElementById('completed-list');

//     const taskForm = document.getElementById('task-form');
//     const taskTitle = document.getElementById('task-title');
//     const taskDescription = document.getElementById('task-description');
//     const taskDifficulty = document.getElementById('task-difficulty');

//     // Handle form submission
//     taskForm.addEventListener('submit', function(e) {
//         e.preventDefault();

//         const title = taskTitle.value;
//         const description = taskDescription.value;
//         const difficulty = taskDifficulty.value;

//         if (title && description) {
//             const taskElement = createTaskElement(title, description, difficulty);
//             todoList.appendChild(taskElement);
//             taskForm.reset();
//         }
//     });

//     // Create Task Element
//     function createTaskElement(title, description, difficulty) {
//         const task = document.createElement('div');
//         task.classList.add('task', difficulty);

//         task.draggable = true;

//         task.innerHTML = `
//             <strong>${title}</strong>
//             <p>${description}</p>
//             <span>${difficulty}</span>
//         `;

//         task.addEventListener('dragstart', dragStart);
//         task.addEventListener('dragend', dragEnd);

//         return task;
//     }

//     // Drag and Drop Events
//     function dragStart(event) {
//         event.dataTransfer.setData('text', event.target.id);
//         event.target.classList.add('dragging');
//     }

//     function dragEnd(event) {
//         event.target.classList.remove('dragging');
//     }

//     [todoList, inProgressList, completedList].forEach(list => {
//         list.addEventListener('dragover', event => {
//             event.preventDefault();
//             const dragging = document.querySelector('.dragging');
//             list.appendChild(dragging);
//         });
//     });
// });