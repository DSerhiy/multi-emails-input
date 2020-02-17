class MultiEmailsInput {
	constructor(inputEl) {
		this.data = inputEl.getAttribute('data-value').split(',');
		this.__inputEl = inputEl;
		this.__isOneline = this.__inputEl.getAttribute('data-role') === 'multi-emails-input--oneline' ? true : false;
		this.__init();
	}

	__init() {
		// wrap input in multi-email-container
		const wrapperEl = document.createElement('div');
		wrapperEl.classList.add('sd_multi-emails_container', 'form-control');

		if (this.__isOneline)
			wrapperEl.classList.add('sd_multi-emails_container--oneline');

		this.__inputEl.removeAttribute('class');
		this.__inputEl.parentElement.insertBefore(wrapperEl, this.__inputEl);
		wrapperEl.appendChild(this.__inputEl);

		this.data.forEach((email) => {
			this.__createNewEmail(email);
		});

		//reset input value for correct display
		this.__inputEl.value = '';

		this.__inputEl.addEventListener('keydown', (e) => {
			if (this.__inputEl.classList.contains('sd_text--red'))
				this.__inputEl.classList.remove('sd_text--red');

			if (e.key !== 'Enter') return;

			const emailValue = e.currentTarget.value;

			if (this.__validateEmail(emailValue)) {
				e.currentTarget.value = '';
				this.data.push(emailValue);
				this.__inputEl.setAttribute('value', this.data.join(','));
				this.__createNewEmail(emailValue);
			} else {
				this.__inputEl.classList.add('sd_text--red');
			}
		});

		this.__inputEl.parentElement.addEventListener('click', () => this.__inputEl.focus());

		this.__inputEl.addEventListener('focus', (e) => {
			e.target.parentElement.classList.toggle('sd_multi-emails_container--onfocus');
		});

		this.__inputEl.addEventListener('focusout', (e) => {
			e.target.parentElement.classList.toggle('sd_multi-emails_container--onfocus');
		});
	}

	__createNewEmail(email) {
		const newEmailEl = document.createElement('div');
		newEmailEl.classList.add('sd_email-box');

		if (this.__isOneline)
			newEmailEl.classList.add('sd_email-box--oneline');

		newEmailEl.innerHTML = `
			<div class="sd_email-box_btn">✕</div>
			<div>${email}</div>`;

		// Register deleteEmail handler for delete btn;
		newEmailEl.querySelector('.sd_email-box_btn').addEventListener('click', () => {
			const emailIndex = this.data.indexOf(email);
			this.data.splice(emailIndex, 1);
			this.__inputEl.setAttribute('value', this.data.join(','));
			newEmailEl.remove();
		});

		// Mount newEmailEl into DOM
		this.__inputEl.before(newEmailEl);
	}

	__validateEmail(email) {
		const pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return pattern.test(email);
	}

	getData() {
		return this.data;
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