import { formSubmit } from './formSubmit.js';
import { nameInput, validateNameLength } from './validateName.js';
import { emailInput, validateEmailFormat } from './validateEmail.js';

document.querySelector('form').addEventListener('submit', formSubmit);
nameInput.addEventListener('change', validateNameLength);
emailInput.addEventListener('change', validateEmailFormat);