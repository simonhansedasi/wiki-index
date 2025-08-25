// generate file tree
function createTree(container, obj, path = '') {
    const ul = document.createElement('ul');

    // iterate over folders first
    for (const key in obj) {
        if (key === 'files') continue; // skip files for now

        if (typeof obj[key] === 'object') {
            const li = document.createElement('li');
            const folderSpan = document.createElement('span');
            folderSpan.textContent = '▶ ' + key;
            folderSpan.className = 'folder';
            li.appendChild(folderSpan);

            // build subtree
            const childUl = createTree(document.createElement('div'), obj[key], path + key + '/');

//             const childUl = createTree(document.createElement('div'), obj[key], `${path}${key}/`);
            childUl.style.display = 'none';
            li.appendChild(childUl);

            // toggle open/close
            folderSpan.addEventListener('click', () => {
                const isHidden = childUl.style.display === 'none';
                childUl.style.display = isHidden ? 'block' : 'none';
                folderSpan.textContent = (isHidden ? '▼ ' : '▶ ') + key;
            });

            ul.appendChild(li);
        }
    }

    // iterate over files now
    if (obj.files && Array.isArray(obj.files)) {
        obj.files.forEach(file => {
            const fileLi = document.createElement('li');
            const fileLink = document.createElement('a');
            fileLink.href = `viewer.html?file=${encodeURIComponent(path + file)}`;
            fileLink.target = "_blank";
            fileLink.textContent = file;
            fileLi.appendChild(fileLink);
            ul.appendChild(fileLi);
        });
    }

    container.appendChild(ul);
    return ul;
}




// initialize tree
document.addEventListener("DOMContentLoaded", () => {
    createTree(document.getElementById('fileTree'), fileStructure);
});


folderSpan.addEventListener('click', () => {
    const isHidden = childUl.style.display === 'none';
    childUl.style.display = isHidden ? 'block' : 'none';
    folderSpan.classList.toggle('open', isHidden);
});
