import throttle from 'lodash.throttle';

const formRef = document.querySelector('.feedback-form');
const emailInputRef = document.querySelector("input[type='email']");
const messageInputRef = document.querySelector("textarea[name='message']");
const formData = {};
const LOCAL_STORAGE_KEY = 'feedback-form-state';

formRef.addEventListener('input', throttle(onFormChange, 500));
formRef.addEventListener('submit', onFormSubmit)

function onFormChange(evt) {
  const key = evt.target.name;
  const value = evt.target.value;
  formData[key] = value;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
}

const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
if (savedData) {
  const parsedData = JSON.parse(savedData);
  emailInputRef.value = parsedData.email;
  messageInputRef.value = parsedData.message;
}

function onFormSubmit() {
  
}