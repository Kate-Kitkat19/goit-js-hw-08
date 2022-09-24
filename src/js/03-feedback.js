import throttle from 'lodash.throttle';

const formRef = document.querySelector('.feedback-form');
const emailInputRef = document.querySelector("input[type='email']");
const messageInputRef = document.querySelector("textarea[name='message']");
const formData = {};
const LOCAL_STORAGE_KEY = 'feedback-form-state';

checkLocalStorage();

formRef.addEventListener('input', throttle(onFormChange, 500));
formRef.addEventListener('submit', onFormSubmit);

function onFormChange(evt) {
  const key = evt.target.name;
  const value = evt.target.value;
  formData[key] = value;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(evt) {
  evt.preventDefault();
  console.log(formData);
  formRef.reset();
  messageInputRef.textContent = '';
  localStorage.removeItem(LOCAL_STORAGE_KEY);
}

function checkLocalStorage() {
  const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (savedData) {
    const parsedData = JSON.parse(savedData);
    emailInputRef.value = parsedData.email || '';
    messageInputRef.textContent = parsedData.message || '';
  }
}
