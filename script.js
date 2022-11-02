const container = document.getElementById('container');
const addButton = document.getElementById('addbutton');
const form = document.getElementById('form');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const pagesInput = document.getElementById('pages');
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

titleInput.addEventListener('input', () => {
    if (titleInput.validity.tooShort) {
      titleInput.setCustomValidity("Title too short");
      titleInput.reportValidity();
    } else if (titleInput.validity.tooLong) {
      titleInput.setCustomValidity("Title too long");
      titleInput.reportValidity();
    } else if (titleInput.validity.valueMissing) {
      titleInput.setCustomValidity("Title is required");
      titleInput.reportValidity();
    } else {
      titleInput.setCustomValidity("");
    }
});

authorInput.addEventListener('input', () => {

    if (authorInput.validity.tooShort) {
        authorInput.setCustomValidity("Author's name too short");
        authorInput.reportValidity();
    } else if (authorInput.validity.tooLong) {
        authorInput.setCustomValidity("Author's name too long");
        authorInput.reportValidity();
    } else if (authorInput.validity.valueMissing) {
        authorInput.setCustomValidity("Author's name is required");
        authorInput.reportValidity();
    } else {
        authorInput.setCustomValidity("");
    }
});

pagesInput.addEventListener('input', () => {
    if (pagesInput.validity.rangeUnderflow) {
        pagesInput.setCustomValidity("It must have at least 1 page to be a book"); 
        pagesInput.reportValidity();
    } else if (pagesInput.validity.rangeOverflow) {
        pagesInput.setCustomValidity("Are you actually planning to read a book that long?\n (must be less than 10 000)");
        pagesInput.reportValidity();
    } else if (pagesInput.validity.valueMissing) {
        pagesInput.setCustomValidity("Number of pages is required");
        pagesInput.reportValidity();
    } else {
        pagesInput.setCustomValidity("");
    }
});

document.addEventListener('click', function(e) {
    if (e.target && e.target.className == 'readbutton') {
        toggleReadStatus(e.target.getAttribute('bookIndex'), e.target);
    }
});

document.addEventListener('click', function(e) {
    if (e.target && e.target.className == 'deletebutton') {
        deleteBook(e.target.getAttribute('bookIndex'));
    }
});

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    myLibrary.push(new Book(title, author, pages, false));
    container.innerHTML = '';
    displayLibrary(myLibrary);
    e.target.reset();
});

function addToLibrary(book) {
    myLibrary.push(book);
}

function addReadButton(element, index) {
    const readButton = document.createElement('button');
    readButton.classList.add('readbutton');
    const isRead = myLibrary[index].isRead
    readButton.textContent = isRead ? 'Already read' : 'Not read yet' ;
    readButton.style.backgroundColor = isRead ? 'var(--read)' : 'var(--not-read)' ;
    readButton.style.border = isRead ? '1px solid var(--read)' : '1px solid var(--not-read)' ;
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

function toggleReadStatus(index, button) {
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
        const bookCard = document.createElement('p');
        const bookName = document.createElement('p');
        const bookAuthor = document.createElement('p');
        const bookPages = document.createElement('p');
        bookCard.classList.add('bookcard');
        bookCard.setAttribute('bookIndex', index);
        bookName.innerHTML = `<span class="light">Title:</span> ${book.name}`;
        bookAuthor.innerHTML = `<span class="light">Author:</span> ${book.author}`;
        bookPages.innerHTML = `<span class="light">Pages:</span> ${book.pages}`;
        bookCard.appendChild(bookName);
        bookCard.appendChild(bookAuthor);
        bookCard.appendChild(bookPages);
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