const tareas = []

const taskInput = document.querySelector('#taskInput')
const btnAgregar = document.querySelector('#btnAgregar')
const tbodyTareas = document.querySelector('#taskList')
const spanTotal = document.querySelector('#totalTasks')
const spanRealizadas = document.querySelector('#completedTasks')

function renderTareas () {
  const items = []

  for (const tarea of tareas) {
    const claseTexto = tarea.completado ? 'completed-text' : ''
    const checkMarcado = tarea.completado ? 'checked' : ''

    items.push(`
      <li>
        <span>[${tarea.id}]</span>
        <span class="${claseTexto}">${tarea.descripcion}</span>
        <input type="checkbox" onchange="cambiarEstado(${tarea.id})" ${checkMarcado}>
        <button class="btn-delete" onclick="borrarTarea(${tarea.id})">X</button>
      </li>`)
  }

  tbodyTareas.innerHTML = items.join('')
  actualizarContadores()
}

function actualizarContadores () {
  spanTotal.textContent = tareas.length

  const tareasRealizadas = tareas.filter(tarea => tarea.completado === true)
  spanRealizadas.textContent = tareasRealizadas.length
}

btnAgregar.addEventListener('click', () => {
  const descripcionNueva = taskInput.value.trim()

  const nuevaTarea = {
    id: Date.now() % 1000,
    descripcion: descripcionNueva,
    completado: false
  }

  tareas.push(nuevaTarea)
  taskInput.value = ''
  renderTareas()
})

function borrarTarea (id) {
  const index = tareas.findIndex((tarea) => tarea.id === id)
  if (index !== -1) {
    tareas.splice(index, 1)
    renderTareas()
  }
}

function cambiarEstado (id) {
  const index = tareas.findIndex((tarea) => tarea.id === id)
  if (index !== -1) {
    tareas[index].completado = !tareas[index].completado
    renderTareas()
  }
}

renderTareas()
