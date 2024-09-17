// Referencias a elementos del DOM
const contactNameInput = document.getElementById('contactName');
const addContactButton = document.getElementById('addContact');
const sortContactButton = document.getElementById('sortContacts');//orden de Nombres
const contactList = document.getElementById('contactList');
const contacCount = document.getElementById('contacCount');//Contar N de Nombres

// Cargar los contactos desde localStorage (si existen)
let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

// Función para validar si un contacto es válido
function isValidContact(name) {
  if (name === '') {
    alert('El nombre no puede estar vacío.');
    return false;
  }
  if (contacts.includes(name)) {
    alert('Este contacto ya existe.');
    return false;
  }
  return true;
}

// Función para actualizar el contador de contactos
function updateContactCount() {
  contactCount.textContent = contacts.length;
}

// Función para guardar los contactos en localStorage
function saveContacts() {
  localStorage.setItem('contacts', JSON.stringify(contacts));
}

// Función para crear el elemento visual de un contacto
function createContactElement(name) {
  const li = document.createElement('li');
  const contactNameText = document.createElement('span');
  contactNameText.textContent = name;

  const editButton = document.createElement('button');
  editButton.textContent = 'Editar';
  editButton.addEventListener('click', () => editContact(contactNameText, editButton));

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Eliminar';
  deleteButton.addEventListener('click', () => removeContact(li, name));

  li.appendChild(contactNameText);
  li.appendChild(editButton);
  li.appendChild(deleteButton);

  return li;
}

// Función para agregar un contacto
function addContact() {
  const contactName = contactNameInput.value.trim();

  if (isValidContact(contactName)) {
    contacts.push(contactName);
    renderContacts();
    contactNameInput.value = '';  // Limpiar el input
    saveContacts();               // Guardar en localStorage
  }
}

// Función para eliminar un contacto
function removeContact(contactElement, name) {
  contactList.removeChild(contactElement);
  contacts = contacts.filter(contact => contact !== name);
  updateContactCount();            // Actualizar el contador
  saveContacts();                  // Guardar los cambios en localStorage
}

// Función para editar un contacto
function editContact(contactNameText, editButton) {
  const originalName = contactNameText.textContent;
  const input = document.createElement('input');
  input.type = 'text';
  input.value = originalName;

  const saveButton = document.createElement('button');
  saveButton.textContent = 'Guardar';
  saveButton.addEventListener('click', () => saveContact(contactNameText, input, saveButton, editButton, originalName));

  contactNameText.replaceWith(input);
  editButton.replaceWith(saveButton);
}

// Función para guardar los cambios del contacto editado
function saveContact(contactNameText, input, saveButton, editButton, originalName) {
  const newName = input.value.trim();

  if (isValidContact(newName)) {
    contacts = contacts.map(contact => contact === originalName ? newName : contact);
    contactNameText.textContent = newName;
    input.replaceWith(contactNameText);
    saveButton.replaceWith(editButton);
    saveContacts();  // Guardar los cambios en localStorage
  }
}

// Función para renderizar la lista de contactos en el DOM
function renderContacts() {
  contactList.innerHTML = '';  // Limpiar la lista

  // Ordenar los contactos alfabéticamente
  contacts.sort();

  // Crear los elementos visuales de los contactos
  contacts.forEach(contact => {
    const contactElement = createContactElement(contact);
    contactList.appendChild(contactElement);
  });

  updateContactCount(); // Actualizar el contador
}

// Función para ordenar contactos alfabéticamente
function sortContacts() {
  contacts.sort();       // Ordenar la lista de contactos
  renderContacts();      // Volver a renderizar
  saveContacts();        // Guardar el orden en localStorage
}

// Asignar eventos a los botones
addContactButton.addEventListener('click', addContact);
sortContactsButton.addEventListener('click', sortContacts);

contactNameInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addContact();
  }
});

// Renderizar los contactos al cargar la página
renderContacts();
