
const date = document.getElementById('date');
const add = document.getElementById('add')
const list = document.getElementById('list');
const btnEnter = document.getElementById('enter');


let id;

const check = 'fa-circle-check';
const uncheck = 'fa-circle';
const lineThrough = 'line-through';
let LIST;

const navToggle = document.getElementById('open'),
      navClose = document.getElementById('close');
      navMenu = document.getElementById('nav-menu'); 

if(navToggle){
  navToggle.addEventListener('click', () =>{
    navMenu.classList.add('show-menu')
  } );
}

if(navClose){
  navClose.addEventListener('click', () =>{
    navMenu.classList.remove('show-menu')
  })
}
//crear fecha
const DATE = new Date();
date.innerHTML = DATE.toLocaleDateString('es-CO', {weekday:'long', month:'short',day:'numeric'})
//agregar tarea
function addTask (task, id, performed, deleted){
    if(deleted){return};

    const PERFORMED = performed ? check : uncheck;
    const LINE = performed ? lineThrough : '';

    const element = `
                    <li id = 'element'>
                    <i class= "far ${PERFORMED}" data ="realizado" id=${id}></i>
                    <p class="text ${LINE}">${task}</p>
                    <i class="fas fa-trash de" data ="eliminado" id=${id}></i>
                    </li>`;

    list.insertAdjacentHTML('beforeend', element);
    
}
//fución para eliminar tarea
function deleteTask (element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].deleted = true;
}

//fución de tarea realizada
function performedTask (element){
    element.classList.toggle(check)
    element.classList.toggle(uncheck)
    element.parentNode.querySelector('.text').classList.toggle(lineThrough)
    LIST[element.id].performed = LIST[element.id].performed ? false: true
}

// Evento click para agregar tarea
btnEnter.addEventListener('click', () => {
    const task = add.value;
    if(task){
        addTask(task,  id, false, false) 
        LIST.push({
            nombre: task,
            id:id,
            performed: false,
            deleted: false
        })
    }
    localStorage.setItem('TODO', JSON.stringify(LIST));
    add.value = ''
    id ++;
    

})

// Evento enter para agregar tarea
document.addEventListener('keyup', (event) => {
    if(event.key == 'Enter'){
        const task = add.value;
        if(task){
            addTask(task,  id, false, false) 
            LIST.push({
                nombre: task,
                id:id,
                performed: false,
                deleted: false
            })
        }
        localStorage.setItem('TODO', JSON.stringify(LIST));
        add.value = ''
        id ++;
        
    }    
})

list.addEventListener('click', function(event){
    const newElement = event.target;
    const elementData = newElement.attributes.data.value; 
    if(elementData == 'realizado'){
        performedTask(newElement);

    }else if (elementData == 'eliminado'){ 
        deleteTask(newElement);
    }
    localStorage.setItem('TODO', JSON.stringify(LIST));
})

//local storage get items
let data = localStorage.getItem('TODO')
if(data){
    LIST =JSON.parse(data)
    id = LIST.length;
    loadList(LIST)
}else{
    LIST = [];
    id = 0;
}
function loadList(DATA){
    DATA.forEach(i => {
        addTask(i.nombre, i.id, i.performed, i.deleted)
    });
}
