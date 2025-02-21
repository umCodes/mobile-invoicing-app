

export function ListItem(parent, content){
    const div = document.createElement('div');
    div.className = 'list-item';

    if(Array.isArray(content))
        div.append(...content)
    else
        div.innerHTML = content;

        parent.appendChild(div);

    return div
}