export function Nav(navBtns){

    const heading = document.getElementById('heading')
    
    
    let selectedButton = document.querySelector(`.${navBtns[0].classList[1]}`);
    heading.textContent = selectedButton.textContent;
    navBtns.forEach(btn => {
        btn.addEventListener('click', (event) => {
    
    
            heading.textContent = btn.textContent
            if (selectedButton) selectedButton.classList.remove('selected');
            btn.classList.add('selected');
            selectedButton = btn; 
    
            let title = btn.classList[1].split('-')[0];
            document.querySelector(`.${title}-section`).scrollIntoView({
              behavior: 'instant', 
              block: 'start'
            });
          }); 
    });
}