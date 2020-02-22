class MultiEmailsInput {
	constructor(inputEl) {
		this.data = inputEl.value === '' ? []: inputEl.value.split(',');
		this.required = inputEl.required;
		this.__inputEl = inputEl;
		this.__dataInputEl = document.createElement('input');
		this.__errorLabelEl = document.createElement('label');
		this.__wrapperEl = document.createElement('div');	
		this.__isOneline = this.__inputEl.getAttribute('data-role') === 'multi-emails-input--oneline' ? true : false;
		this.__init();		
	}

	__init() {	
		this.__setUpWrapperEl();
		this.__setUpDataInputEl();
		this.__setUpInputEl();
		if(this.required) this.__setUpErrorLabelEl();			
		this.data.forEach((email) => {
			this.__inputEl.before(this.__createEmailTag(email));
		});			
	}

	__setUpWrapperEl() {
		// wrap input in multi-email-container
		this.__inputEl.before(this.__wrapperEl);
		this.__wrapperEl.classList.add('sd_multi-emails_container', 'form-control');
		if (this.__isOneline) 
			this.__wrapperEl.classList.add('sd_multi-emails_container--oneline');
		
		this.__wrapperEl.addEventListener('click', () => this.__inputEl.focus());
	}

	__setUpDataInputEl() {
		this.__dataInputEl.setAttribute('type', 'text');
		this.__dataInputEl.style.display = 'none';
		this.__dataInputEl.value = this.data.join(',');
		this.__dataInputEl.name = this.__inputEl.name;
		this.__dataInputEl.id = this.__inputEl.id;
		this.__wrapperEl.append(this.__dataInputEl);			
	}

	__setUpErrorLabelEl() {		
			this.__errorLabelEl.classList.add('error');
			this.__errorLabelEl.style.display = 'none';
			this.__errorLabelEl.innerText = 'This field is required.'
		  this.__wrapperEl.after(this.__errorLabelEl);
					
			this.__errorLabelEl.closest('form').addEventListener('submit', (e)=>{
				if((!this.data.length)) {
					e.preventDefault();					
					this.__errorLabelEl.style.display = 'block';	
				} 						
			});			
	}

	__setUpInputEl() {
		//reset input value for correct display
		this.__inputEl.value = '';
		this.__inputEl.removeAttribute('required');
		this.__inputEl.removeAttribute('class');
		this.__inputEl.removeAttribute('value');
		this.__inputEl.removeAttribute('name');
		this.__inputEl.removeAttribute('id');	
		this.__wrapperEl.append(this.__inputEl);

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
		this.data.length === 1? this.__errorLabelEl.style = 'display:none': true;
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