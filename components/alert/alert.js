
const alertIcons = {
    success: 'fas fa-check-circle',
    error: 'fa-solid fa-circle-exclamation',
    warning: 'fa-solid fa-triangle-exclamation',
    info: 'fas fa-info-circle',
    delete: 'fa-solid fa-trash', 
};
 
// Alert component
export const alertMessage = (message, icon) => {
    const alert = document.createElement('div');
    alert.className = `alert ${icon}`; 
    alert.innerHTML = `
        <i class="${alertIcons[icon]}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(alert);
    
    setTimeout(() => {
        alert.classList.add('show');
    }, 1000);  

    alert.addEventListener('click', () => {
        alert.remove();
    });

    setTimeout(() => {
        alert.remove();
    }, 4000);    
}