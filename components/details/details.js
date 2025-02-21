export function DetailSection() {
    let data;

    const details = document.createElement('div');
    details.className = 'detail-section';

    const heading = document.createElement('div');
    heading.className = 'detail-heading';

    const backButton = document.createElement('button');
    backButton.className = 'detail-back-btn';
    backButton.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
    backButton.addEventListener('click', () => {
        details.classList.remove('show');
    });

    const header = document.createElement('h2');
    header.className = 'detail-header-text';
    header.textContent = 'Header';

    const content = document.createElement('div');
    content.className = 'detail-content';

    heading.appendChild(backButton);
    heading.appendChild(header);
    details.appendChild(heading);
    details.appendChild(content);

    const showDetails = () => details.classList.add('show');

    const attachShowEvent = (btn) => {
        btn.addEventListener('click', showDetails);
    };

    const setHeader = (text) => {
        header.textContent = text;
    };

    const addContent = (element) => {
        content.appendChild(element);
    };

    const getContent = () => content;


    const setData = (d) =>{
        data = d;
    }
    const getData = () => data;

    const render = () => {
        document.querySelector('body').appendChild(details);
        return details;
    };

    const hideDetails = () => details.classList.remove('show');

    const getBackButton = () => backButton;

    return {
        showDetails,
        getBackButton,
        attachShowEvent,
        setHeader,
        addContent,
        getContent,
        setData,
        getData,
        hideDetails,
        render
    };
}

