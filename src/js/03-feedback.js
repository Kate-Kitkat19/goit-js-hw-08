import throttle from 'lodash.throttle';

const formRef = document.querySelector('.feedback-form');
const formData = {};
const LOCAL_STORAGE_KEY = 'feedback-form-state';

formRef.addEventListener('input', throttle(onFormChange, 500));

function onFormChange(evt) {
  const key = evt.target.name;
  const value = evt.target.value;
  formData[key] = value;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
}

