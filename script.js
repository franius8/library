const container = document.getElementById('container');
const addButton = document.getElementById('addbutton');
const readButtonAry = [];

let myLibrary = [];

class Book {
    constructor(name, author, pages, isRead) {
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }
    toggleReadStatus = function() {
        this.isRead = this.isRead ? false : true;
    }
}

document.addEventListener('click', function(e) {
    if (e.target && e.target.className == 'readbutton') {
        toggleReadStatus(e.target.getAttribute('bookIndex'))
    }
});

document.addEventListener('click', function(e) {
    if (e.target && e.target.className == 'deletebutton') {
        deleteBook(e.target.getAttribute('bookIndex'))
    }
});

addButton.addEventListener('click', function() {
    console.log('a');
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    myLibrary.push(new Book(title, author, pages, false));
    container.innerHTML = '';
    displayLibrary(myLibrary);
});

function addToLibrary(book) {
    myLibrary.push(book);
}

function addReadButton(element, index) {
    const readButton = document.createElement('button');
    readButton.classList.add('readbutton');
    readButton.textContent = 'Change read status';
    readButton.setAttribute('bookIndex', index);
    element.appendChild(readButton);
}

function addDeleteButton(element, index) {
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('deletebutton');
    deleteButton.textContent = 'Delete';
    deleteButton.setAttribute('bookIndex', index);
    element.appendChild(deleteButton);
}

function toggleReadStatus(index) {
    myLibrary[index].toggleReadStatus();
    container.innerHTML = '';
    displayLibrary(myLibrary);
}

function deleteBook(index) {
    myLibrary.splice(index, 1);
    container.innerHTML = '';
    displayLibrary(myLibrary);
}

function displayLibrary(library) {
    library.forEach((book, index) => {
        const bookCard = document.createElement('div');
        const bookName = document.createElement('div');
        const bookAuthor = document.createElement('div');
        const bookPages = document.createElement('div');
        const isRead = document.createElement('div');
        bookCard.classList.add('bookcard');
        bookCard.setAttribute('bookIndex', index);
        bookName.innerHTML = `<span class="light">Title:</span> ${book.name}`;
        bookAuthor.innerHTML = `<span class="light">Author:</span> ${book.author}`;
        bookPages.innerHTML = `<span class="light">Pages:</span> ${book.pages}`;
        isRead.innerHTML = '<span class="light">Read status:</span> ' + 
            (book.isRead ? 'Already read' : '<span class="redspan">Not read yet</span>');
        bookCard.appendChild(bookName);
        bookCard.appendChild(bookAuthor);
        bookCard.appendChild(bookPages);
        bookCard.appendChild(isRead);
        addReadButton(bookCard, index);
        addDeleteButton(bookCard,index);
        container.appendChild(bookCard);
    });
}

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295', false);
const prideAndPrejudice = new Book('Pride and Prejudice', 'Jane Austen', '495', false);
addToLibrary(theHobbit);
addToLibrary(prideAndPrejudice);
displayLibrary(myLibrary);