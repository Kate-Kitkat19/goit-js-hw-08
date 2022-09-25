import throttle from 'lodash.throttle';
import { save, load, remove } from './locstorage';

const formRef = document.querySelector('.feedback-form');
const LOCAL_STORAGE_KEY = 'feedback-form-state';

checkLocalStorage();

formRef.addEventListener('input', throttle(onFormChange, 500));
formRef.addEventListener('submit', onFormSubmit);

function onFormChange(evt) {
  const { name, value } = evt.target;
  let formData = load(LOCAL_STORAGE_KEY);
  formData = formData ? formData : {};
  formData[name] = value;
  save(LOCAL_STORAGE_KEY, formData);
}

function onFormSubmit(evt) {
  evt.preventDefault();
  evt.currentTarget.reset();
  console.log(load(LOCAL_STORAGE_KEY));
  remove(LOCAL_STORAGE_KEY);
}

function checkLocalStorage() {
  const savedData = load(LOCAL_STORAGE_KEY);

  if (!savedData) {
    return;
  }
  for (const [key, value] of Object.entries(savedData)) {
    formRef.elements[key].value = value;
  }
}
