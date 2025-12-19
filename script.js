const btnAddLink = document.querySelector('.btn-add-link');
const listaLinks = document.querySelector('.lista-links')

btnAddLink.addEventListener('click', () => {
    const linkURL = prompt('Qual URL do link que você gostaria de adicionar?');
    const linkName = prompt('Qual nome você gostaria de dar para o seu link?');
    if(!linkURL || !linkName) return
    
    const listItem = document.createElement('li');
    listItem.classList.add('lista-links-item');

    const link = document.createElement('a');
    link.setAttribute("href", linkURL);
    link.setAttribute("target", '_blank');
    link.setAttribute("rel", 'external');
    link.textContent = linkName;
    link.classList.add('link');

    listItem.appendChild(link);
    listaLinks.appendChild(listItem);
})

