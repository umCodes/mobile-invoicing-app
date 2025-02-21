
export function confirmModal(btn1, btn2){

    const overlay = document.createElement('div');
    const confirm = document.createElement('div');
    const body = document.createElement('div');
    const buttons = document.createElement('div');

    const button1 = document.createElement('button')
    button1.textContent = btn1;
    const button2 = document.createElement('button')
    button2.textContent = btn2;

    overlay.className = 'overlay'
    confirm.className = 'confirm'
    body.className = 'body';
    buttons.className = 'buttons';
    button1.className = 'button1';
    button2.className = 'button2';


    buttons.appendChild(button1)
    buttons.appendChild(button2)
    confirm.appendChild(body);
    confirm.appendChild(buttons);
    overlay.appendChild(confirm)


    

    return{
        bodyContent: (content) => body.innerHTML = content,
        showBtn: btn => {
            btn.addEventListener('click', ()=> {                
                overlay.classList.add('show')
            })    
            showBtn = btn
        },
        buttonsAction: (action1, action2)=> {
            button1.addEventListener('click', action1)
            button2.addEventListener('click', action2 || '')
        },
        getShowBtn: () => showBtn,
        content: cnt =>{
            const body = document.createElement('div');
            body.className = 'confirm-body';

           if(cnt instanceof HTMLElement)
                body.appendChild(cnt)
            else if (typeof cnt === 'function')
                body.appendChild(cnt())
            else if(typeof cnt === "string")
                body.innerHTML = cnt
            else if(Array.isArray(cnt))
                cnt.forEach(c => {
                    body.appendChild(c)
                })

    
            confirm.appendChild(body);
            return body;

        },
        appendIn: (parent) => parent.appendChild(confirm),
        hide:  () => overlay.classList.remove('show'),
        show:  () => overlay.classList.add('show'),
        render: () => overlay

    }
}



