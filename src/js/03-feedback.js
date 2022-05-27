import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const formData = {};
const form = document.querySelector('.feedback-form');

form.addEventListener('input', throttle(onTextareaInput, 500));
form.addEventListener('submit', onFormSubmit);

populateTextarea();
function onTextareaInput(evt) {
  const { name, value } = evt.target;
  formData[name] = value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  console.log(formData);
}

function onFormSubmit(evt) {
  evt.preventDefault();

  const { email, message } = evt.target;

  const userEmail = email.value.trim();
  const userMessage = message.value.trim();

  if (!userEmail || !userMessage) {
    alert('Please fill in all fields');
    return;
  }

  console.log('Отправляем форму');
  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));

  const formFieldNames = {
    email: userEmail,
    message: userMessage,
  };
  // console.log(formFieldNames.email);
  form.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function populateTextarea() {
  const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedMessage) {
    form.email.value = savedMessage.email;
    form.message.value = savedMessage.message;
  }
  // console.log(savedMessage);
}
