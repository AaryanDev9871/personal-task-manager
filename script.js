function addTask() {
  const desc = document.getElementById('taskDescription').value.trim();
  const diff = document.getElementById('taskDifficulty').value;
  const date = document.getElementById('taskDueDate').value;
  const tags = document.getElementById('taskTags').value.split(',');

  if (!desc) return alert('Please enter a task.');

  const list = document.getElementById('taskList');
  const task = createTaskElement(desc, diff, date, tags);
  list.appendChild(task);
  clearInputs(['taskDescription', 'taskDueDate', 'taskTags']);
}

function addDaily() {
  const desc = document.getElementById('dailyDescription').value.trim();
  const diff = document.getElementById('dailyDifficulty').value;
  const tags = document.getElementById('dailyTags').value.split(',');

  if (!desc) return alert('Please enter a daily task.');

  const list = document.getElementById('dailyList');
  const task = createTaskElement(desc, diff, '', tags);
  list.appendChild(task);
  clearInputs(['dailyDescription', 'dailyTags']);
}

function createTaskElement(desc, diff, date, tags) {
  const li = document.createElement('li');
  li.className = 'task';
  li.innerHTML = `
    <div class="details" onclick="toggleComplete(this.parentElement)">
      <span><strong>${desc}</strong> [${diff}]</span>
      <span>${date ? "📅 " + date : ""}</span>
    </div>
    <div>Tags: ${tags.map(t => `<span class="tag">${t.trim()}</span>`).join(' ')}</div>
    <div class="checklist">
      <input type="text" placeholder="Add sub-task" onkeypress="addSubTask(event, this)">
    </div>
    <button class="delete-button" onclick="deleteTask(this)">✖</button>
  `;
  return li;
}

function addSubTask(e, input) {
  if (e.key === 'Enter') {
    const text = input.value.trim();
    if (!text) return;
    const div = document.createElement('div');
    div.innerHTML = `<label><input type="checkbox"> ${text}</label>`;
    input.parentElement.insertBefore(div, input);
    input.value = '';
  }
}

function deleteTask(btn) {
  btn.parentElement.remove();
}

function toggleComplete(el) {
  el.classList.toggle('completed');
}

function clearAllTasks(id) {
  if (confirm('Clear all tasks?')) document.getElementById(id).innerHTML = '';
}

function toggleTheme() {
  document.body.classList.toggle('dark');
  const btn = document.getElementById('themeToggle');
  btn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
}

function clearInputs(ids) {
  ids.forEach(id => document.getElementById(id).value = '');
}

// 🕒 Show live date & time
function updateDateTime() {
  const now = new Date();
  const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
  const date = now.toLocaleDateString(undefined, options);
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  document.getElementById('dateTime').textContent = `${date} | ${time}`;
}

setInterval(updateDateTime, 1000);
updateDateTime();
