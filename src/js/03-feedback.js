// import throttle from 'lodash.throttle';
const throttle = require('lodash.throttle');

const STORAGE_KEY = 'feedback-form-state';
const formData = {};

const refs = {
  form: document.querySelector('.feedback-form'),
  emailInput: document.querySelector('.feedback-form  input'),
  messageTextarea: document.querySelector('.feedback-form  textarea'),
};

// 1.  4.
refs.form.addEventListener('input', throttle(onTextareaInput, 500));
// 3.
refs.form.addEventListener('submit', onFormSubmit);

populateTextarea();

// 1.
function onTextareaInput(evt) {
  //   console.log(evt.target.name); // name
  //   console.log(evt.target.value); // message
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));

  console.log(formData);
}
//2.
// function populateTextarea() {
//   try {
//     const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));

//     refs.emailInput.value = savedMessage.email;
//     refs.messageTextarea.value = savedMessage.message;
//   } catch (error) {
//     console.log(error.name); // "SyntaxError"
//     console.log(error.message); // "Unexpected token u in JSON at position 1"
//   }
// }
//--------------------------------------------
function populateTextarea() {
  const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedMessage) {
    refs.emailInput.value = savedMessage.email;
    refs.messageTextarea.value = savedMessage.message;
  }
}

function onFormSubmit(evt) {
  evt.preventDefault();
  if (refs.emailInput.value === '' || refs.messageTextarea.value === '') {
    return alert('Все поля должны быть заполнены');
  }
  console.log('Отправляем форму');
  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));

  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}
