const newBook = document.querySelector('#new-book');
const bookName = document.querySelector('#book-name');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const date = document.querySelector('#date');
const serialNumber = document.querySelector('#serial');
const submit = document.querySelector('#submit');
const inputs = document.getElementsByTagName('input');
const books = document.querySelector('.books');
const form = document.querySelector('form');
const status = document.querySelector('#status');
const content = document.querySelector('.container');
const close = document.querySelector('#close');
let info = ['Title', 'Author', 'Pages', 'Published', 'Serial #', 'Status'];

class createBook {
  constructor(title, writer, page, date, serialNumber, status) {
    this.title = title;
    this.writer = writer;
    this.page = page;
    this.date = date;
    this.serialNumber = serialNumber;
    this.status = status;
  }
}

// Check book list 
class UI {
  static bookLoad() {
    let getData = JSON.parse(localStorage.getItem('book'));
      if (getData == null || getData.length < 1) {
        Collection.addBook({ title: 'Do Androids Dream of Electric Sheep?', writer: 'Philip K. Dick', page: '210', date: '1968', serialNumber: '1', status: true });
      } else {
        UI.displayBooks();
      }
  }

  // Add new book
  static addBookHandler(parseBook) {
    const data = document.createElement('div');
    data.setAttribute('class', 'book-card');
    books.appendChild(data);
    let j = 0;
    for (let book in parseBook) {
      if (book.includes('status')) {
        const readStatus = this.statusHandler(parseBook);
        data.appendChild(readStatus);
        j++;
        continue;
      }
      const h3 = document.createElement('h3');
      h3.textContent = `${info[j]}: ${parseBook[book]}`;
      data.appendChild(h3);
      j++;
    }
    const removeBook = document.createElement('button');
    removeBook.textContent = 'Remove';
    removeBook.setAttribute('class', 'remove-book');
    data.appendChild(removeBook);
  }

  // Set read status
  static statusHandler(statusBook) {
    const readStatus = document.createElement('button');
    const checkRead = statusBook.status ? 'Read' : 'Not Read'
    const checkReadClass = statusBook.status ? 'read' : 'notread';
    readStatus.setAttribute('class', checkReadClass)
    readStatus.textContent = `Status: ${checkRead}`;
    readStatus.onclick = (e) => {
      const content = readStatus.textContent;
      const textContent = content === 'Status: Read' ? 'Status: Not Read' : 'Status: Read';
      const classContent = content === 'Status: Read' ? 'notread' : 'read';
      readStatus.textContent = textContent;
      readStatus.classList.remove();
      readStatus.setAttribute('class', classContent);
    }
    return readStatus;
  }

  static removeBook(target) {
    if (target.textContent === 'Remove') {
      const removeItem = target.parentElement;
      books.removeChild(removeItem);
    }
  }

  static displayBooks() {
    const book = JSON.parse(localStorage.getItem('book'));
    book.forEach((book) => {
      this.addBookHandler(book);
    });
  }
}

class Collection {
  static getBook() {
    let book;
      if (localStorage.getItem('book') === null) {
        book = [];
      } else {
        book = JSON.parse(localStorage.getItem('book'));
      }
      return book;
  }

  static addBook(book) {
    UI.addBookHandler(book);
    const booksArray = this.getBook();
    booksArray.push(book);
    localStorage.setItem('book', JSON.stringify(booksArray));
  }

  static removeBook(serial) {
    const booksArray = this.getBook();
    booksArray.forEach((book, index) => {
      if (book.serialNumber == serial) {
        booksArray.splice(index, 1);
      }
    });

    localStorage.setItem('book', JSON.stringify(booksArray))
  }
}

// Ini
UI.bookLoad();

submit.addEventListener('click', () => {
  if (!bookName.value) {
    alert('Add a book name please');
  }
  if (!pages.valueAsNumber) {
    alert('Add amount of Pages');
  }
  else {
    const book2 = new createBook(bookName.value, author.value, pages.valueAsNumber, date.value, serialNumber.valueAsNumber, status.checked);
    Collection.addBook(book2)
    form.reset();
  }
});

newBook.addEventListener('click', () => {
  content.style.display = 'block';
});

content.onclick = function (event) {
  if (event.target.className === 'container') {
    content.style.display = 'none';
  }
}

close.addEventListener('click', () => {
  content.style.display = 'none';
});

books.addEventListener('click', (e) => {
  UI.removeBook(e.target);
  Collection.removeBook(e.target.parentElement.childNodes[3].textContent.split(' ')[1])
});