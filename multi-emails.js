class MultiEmailsInput {
	constructor(inputEl) {
		this.data = inputEl.value === '' ? []: inputEl.value.split(',');
		this.__inputEl = inputEl;
		this.__dataInputEl = document.createElement('input');	
		this.__errorLable = inputEl.nextElementSibling.classList.contains('error') ? inputEl.nextElementSibling : null;
		this.__isOneline = this.__inputEl.getAttribute('data-role') === 'multi-emails-input--oneline' ? true : false;
		this.__init();		
	}

	__init() {	
		this.__setUpDataInputEl();
		this.__setUpInputEl();
		this.__setUpErrorLableEl();	
		this.__setUpWrapperEl();
		
		this.data.forEach((email) => {
			this.__inputEl.before(this.__createEmailTag(email));
		});			
	}

	__setUpDataInputEl() {
		this.__dataInputEl.setAttribute('type', 'text');
		this.__dataInputEl.setAttribute('required', this.__inputEl.required);
		this.__dataInputEl.style.display = 'none';
		// console.log(this.data.join(','));	
		this.__dataInputEl.value = this.data.join(',');
		this.__dataInputEl.name = this.__inputEl.name;
		this.__dataInputEl.id = this.__inputEl.id;	
	}

	__setUpErrorLableEl() {		
		if(this.__errorLable) {
			this.__errorLable.style.display = 'none';
			this.__dataInputEl.addEventListener('invalid', (e)=>{
				console.log('test')
				e.preventDefault();
				this.__errorLable.style.display = 'block';			
			});
		}		
	}

	__setUpInputEl() {
		//reset input value for correct display		 
		this.__inputEl.value = '';
		this.__inputEl.removeAttribute('required');
		this.__inputEl.removeAttribute('class');
		this.__inputEl.removeAttribute('value');
		this.__inputEl.removeAttribute('name');
		this.__inputEl.removeAttribute('id');	

		this.__inputEl.addEventListener('keydown', (e) => {
			if (this.__inputEl.classList.contains('sd_text--red'))
				this.__inputEl.classList.remove('sd_text--red');

			if (e.key !== 'Enter') return;

			const emailValue = this.__inputEl.value;

			if (this.__validateEmail(emailValue)) {
				this.__addEmail(emailValue);				
			} else {
				this.__inputEl.classList.add('sd_text--red');
			}
		});

		this.__inputEl.addEventListener('focusout', (e) => {
			e.target.parentElement.classList.toggle('sd_multi-emails_container--onfocus');			

			const emailValue = this.__inputEl.value;

			if (this.__validateEmail(emailValue)) {
				this.__addEmail(emailValue);
			} else {
				this.__inputEl.value = '';
			}
		});

		this.__inputEl.addEventListener('focus', (e) => {
			e.target.parentElement.classList.toggle('sd_multi-emails_container--onfocus');
		});
	}

	__setUpWrapperEl() {
		// wrap input in multi-email-container
		const wrapperEl = document.createElement('div');
		wrapperEl.classList.add('sd_multi-emails_container', 'form-control');

		if (this.__isOneline) wrapperEl.classList.add('sd_multi-emails_container--oneline');
		
		this.__inputEl.parentElement.insertBefore(wrapperEl, this.__inputEl);
		wrapperEl.appendChild(this.__inputEl);		
		this.__inputEl.parentElement.insertBefore(this.__dataInputEl, this.__inputEl);		

		wrapperEl.parentElement.addEventListener('click', () => this.__inputEl.focus());
	}

	__createEmailTag(email) {
		const newEmailEl = document.createElement('div');
		newEmailEl.classList.add('sd_email-box');

		if (this.__isOneline)
			newEmailEl.classList.add('sd_email-box--oneline');

		newEmailEl.innerHTML = `
			<i class="sd_email-box_btn fa fa-close"></i>
			<div>${email}</div>`;

		// Register deleteEmail handler for delete btn;
		newEmailEl.querySelector('.sd_email-box_btn').addEventListener('click', () => {
			const emailIndex = this.data.indexOf(email);
			this.data.splice(emailIndex, 1);
			this.__dataInputEl.value = this.data.join(',');
			newEmailEl.remove();
		});

		return newEmailEl;		
	}

	__addEmail(email) {
		this.__inputEl.value = '';
		this.data.push(email);
		this.__dataInputEl.value = this.data.join(',');
		// Mount newEmailEl into DOM
		this.__inputEl.before(this.__createEmailTag(email));
		this.data.length === 1? this.__errorLable.style = 'display:none': true;
	}

	__validateEmail(email) {
		const pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return pattern.test(email);
	}
}

class MultiEmailsManager {
	constructor() {
		this.multiEmailsList = [];
		this.__init();
	}

	__init() {
		const inputEls = document.querySelectorAll('input[data-role*="multi-emails-input"]');

		inputEls.forEach(inputEl => {
			this.multiEmailsList.push(new MultiEmailsInput(inputEl));
		});
	}
}

new MultiEmailsManager();