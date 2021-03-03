'use strict';

let btnSubmit = document.querySelector('form');
let inputName = document.getElementById('name');
let inputPhone = document.getElementById('telephone');
let inputEmail = document.getElementById('email');
let alertMessage = document.querySelector('.incorrect_action');

console.log(btnSubmit);
console.log(inputName);
console.log(inputPhone);
console.log(inputEmail);
console.log(alertMessage);

btnSubmit.addEventListener('submit', (event) => {
	let isValidName = /[a-zA-ZА-Яа-яЁё]/gm.test(inputName.value);
	let isValidPhone = /\d/gm.test(inputPhone.value); //Телефон имеет вид +7(000)000-0000
	let isValidEmail = /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/gm.test(inputEmail.value);
	
	if(!isValidName) {
        inputName.style.border = "2px solid red";
		alertMessage.innerText = 'Нужно вписать имя';
		alertMessage.style.display = 'block';
        event.preventDefault();
	} else if(!isValidPhone) {
        inputPhone.style.border = "2px solid red";
		alertMessage.innerText = 'Нужно вписать номер телефона';
		alertMessage.style.display = 'block';
        event.preventDefault();
	} else if(!isValidEmail) {
        inputEmail.style.border = "2px solid red";
		alertMessage.innerText = 'Нужно вписать e-mail';
		alertMessage.style.display = 'block';
        event.preventDefault();
	}
});