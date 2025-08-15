// ----------------- Recursive tree generation -----------------
function createTree(container, obj, path = '') {
    const ul = document.createElement('ul');

    for (const key in obj) {
        const li = document.createElement('li');

        // Handle folders with "files" array
        if (obj[key].files && Array.isArray(obj[key].files)) {
            const folderSpan = document.createElement('span');
            folderSpan.textContent = '▶ ' + key;
            folderSpan.className = 'folder';
            li.appendChild(folderSpan);

            const childUl = document.createElement('ul');
            childUl.style.display = 'none';

            // Add files
            obj[key].files.forEach(file => {
                const fileLi = document.createElement('li');
                const fileLink = document.createElement('a');
                fileLink.href = `files/${path}${key}/${file}`;
                fileLink.target = "_blank";
                fileLink.textContent = file;
                fileLi.appendChild(fileLink);
                childUl.appendChild(fileLi);
            });

            li.appendChild(childUl);

            folderSpan.addEventListener('click', () => {
                const isHidden = childUl.style.display === 'none';
                childUl.style.display = isHidden ? 'block' : 'none';
                folderSpan.textContent = (isHidden ? '▼ ' : '▶ ') + key;
            });

        } else if (typeof obj[key] === 'object') {
            // Nested folder without "files"
            const folderSpan = document.createElement('span');
            folderSpan.textContent = '▶ ' + key;
            folderSpan.className = 'folder';
            li.appendChild(folderSpan);

            const childUl = createTree(li, obj[key], `${path}${key}/`);
            childUl.style.display = 'none';
            li.appendChild(childUl);

            folderSpan.addEventListener('click', () => {
                const isHidden = childUl.style.display === 'none';
                childUl.style.display = isHidden ? 'block' : 'none';
                folderSpan.textContent = (isHidden ? '▼ ' : '▶ ') + key;
            });
        }

        ul.appendChild(li);
    }

    container.appendChild(ul);
    return ul;
}

// ----------------- Render the tree -----------------
document.addEventListener("DOMContentLoaded", () => {
    createTree(document.getElementById('fileTree'), fileStructure);
});
