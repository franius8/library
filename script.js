const container = document.getElementById('container');
const readButtonAry = [];

let myLibrary = [];

class Book {
    constructor(name, author, pages, isRead) {
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;

    }
    toggleReadStatus() {
        this.isRead = 'Already read';
    }
}

document.addEventListener('click', function(e) {
    if (e.target && e.target.className == 'readbutton') {
        toggleReadStatus(e.target.getAttribute('bookIndex'))
    }
});

function addToLibrary(Book) {
    myLibrary.push(Book);
}

function addReadButton(element, index) {
    const readButton = document.createElement('button');
    readButton.classList.add('readbutton');
    readButton.textContent = 'Mark as read';
    readButton.setAttribute('bookIndex', index);
    element.appendChild(readButton);
}

function toggleReadStatus(index) {
    myLibrary[index].isRead = 'Not read yet' ? 'Already read' : 'aaa';
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
        isRead.innerHTML = `<span class="light">Read status:</span> ${book.isRead}`;
        bookCard.appendChild(bookName);
        bookCard.appendChild(bookAuthor);
        bookCard.appendChild(bookPages);
        bookCard.appendChild(isRead);
        addReadButton(bookCard, index)
        container.appendChild(bookCard);
    });
}

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295', 'Not read yet');
const prideAndPrejudice = new Book('Pride and Prejudice', 'Jane Austen', '495', 'Not read yet');
addToLibrary(theHobbit);
addToLibrary(prideAndPrejudice);
displayLibrary(myLibrary);