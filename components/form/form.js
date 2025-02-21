export class Form {
    constructor(data, ID) {
        this.form = this.createElement('div', 'form', ID || 'form');
        this.cancel = this.createButton('Cancel', 'cancel', this.handleCancel.bind(this));
        this.save = this.createButton('Save', 'save');
        this.body = this.createElement('div', 'form-body');
        this.data = data;

        const div = this.createElement('div', 'formDiv saveOrCancel');
        div.append(this.cancel, this.save);
        this.form.appendChild(div);
    }



    setCancelListenter(action){
        this.cancel.addEventListener('click', action);
    }

    createElement(tag, className, id) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (id) element.id = id;
        return element;
    }

    createButton(text, className, onClick) {
        const button = this.createElement('button', className);
        button.innerHTML = text;
        if (onClick) button.addEventListener('click', onClick);
        
        return button;
    }

    button(text, className, onClick) {
        const button = this.createElement('button', className);
        button.innerHTML = text;
        if (onClick) button.addEventListener('click', onClick);
        
        this.body.appendChild(button);
        return button;
    }

    handleCancel(event) {
        event.preventDefault();
        this.clearInputs();
        this.form.classList.remove('show');
    }

    clearInputs() {
        this.body.querySelectorAll('input, textarea').forEach(input => input.value = '');
    }

    showBtn(showBtn) {
        showBtn.addEventListener('click', () => {
            this.form.classList.add('show');
        });
    }
    showBtnPlus(showBtn, more) {
        showBtn.addEventListener('click', () => {
            this.form.classList.add('show');
            more();
        });
    }

    setData(data) {
        this.data = data;
    }

    getData() {
        return this.data;
    }

    input(ID, type, label, required) {
        const input = this.createElement('div', 'formDiv input');
        const labelElement = this.createLabel(ID, label, required);
        const inputElement = this.createInput(ID, type, required);

        input.append(labelElement, inputElement);
        this.body.appendChild(input);
        return inputElement;
    }

    createLabel(forID, text, required) {
        const label = this.createElement('label');
        label.setAttribute('for', forID);
        if (required) label.classList.add('required');
        label.innerHTML = text;
        return label;
    }

    createInput(id, type, required) {
        const input = this.createElement('input');
        input.setAttribute('type', type);
        input.setAttribute('id', id);
        input.setAttribute('placeholder', 'Tap To Enter');
        if (required) input.setAttribute('required', '');
        return input;
    }


    textarea(ID, label) {
        const input = this.createElement('div', 'formDiv textarea');
        const labelElement = this.createLabel(ID, label); 
        const textareaElement = this.createElement('textarea');
        textareaElement.setAttribute('name', ID);
        textareaElement.setAttribute('id', ID);
        textareaElement.setAttribute('rows', 6);
        textareaElement.style.fontSize = '1em';

        input.append(labelElement, textareaElement);
        this.body.appendChild(input);
        return textareaElement;
    }

    options(ID, label, options) {
        const container = this.createElement('div', 'formDiv options');
        const select = this.createElement('select');
        const selectLabel = this.createLabel(ID, label);

        select.id = ID;
        options.forEach((opt, i) => {
            const option = this.createElement('option');
            option.value = opt;
            option.textContent = opt;
            if (i === 0) option.selected = true;
            select.appendChild(option);
        });

        container.append(selectLabel, select);
        this.body.appendChild(container);
        return container;
    }

    saveAction(saveAction) {
        this.save.addEventListener('click', saveAction);
    }
 
    render() {
        this.form.appendChild(this.body);
        return this.form;
    }
}
