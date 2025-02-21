export function Modal() {
    const modal = document.createElement('div');
    modal.className = 'modal';

    const cancel = document.createElement('button');
    cancel.className = 'cancel';
    cancel.textContent = 'Cancel';

    const div = document.createElement('div');
    div.className = 'modalHeader';

    const addItem = document.createElement('div');
    const addItemInput = document.createElement('input');
    const addItemBtn = document.createElement('button');

    addItem.className = 'add-item';
    addItemInput.placeholder = 'Enter';
    addItemBtn.textContent = 'add';
    addItemBtn.className = 'add-to-list';

    cancel.addEventListener('click', (event) => {
        event.preventDefault();
        modal.classList.remove('show');
    });


    div.appendChild(cancel);
    modal.appendChild(div);

    addItem.appendChild(addItemInput);
    addItem.appendChild(addItemBtn);
    modal.appendChild(addItem)

    let showBtn;
    let body;

    return {
        showBtn: btn => {
            btn.addEventListener('click', () => {
                modal.classList.add('show');
            });
            showBtn = btn;
        }, 
        getShowBtn: () => showBtn,
        content: cnt => {
            body = document.createElement('div');
            body.className = 'modal-body';

            if (cnt instanceof HTMLElement)
                body.appendChild(cnt);
            else if (typeof cnt === 'function')
                body.appendChild(cnt());
            else if (typeof cnt === "string")
                body.innerHTML = cnt;
            else if (Array.isArray(cnt))
                cnt.forEach(c => {
                    body.appendChild(c);
                });

            modal.appendChild(body);
            return body;
        },
        removeContent: () => {
            if (body) {
                modal.removeChild(body);
                body = null;
            }
        },
        addItemInput: addItemInput,
        addItemBtn: addItemBtn,
        showAddItem: () => {
            addItem.style.display = 'block';
        },
        removeAddItem: () => {
            addItem.style.display = 'none';
        },
        show: () => modal.classList.add('show'),
        hide: () => modal.classList.remove('show'),
        render: () => modal
    };
}
