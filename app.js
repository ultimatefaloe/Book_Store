class Book{
    constructor(title, author, isbn){
        this.title = title,
        this.author = author,
        this.isbn = isbn
    };
};

class UI{
    addBokToLists(book){
        const list = document.getElementById('book-lists');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href='#' class="delete">X</a></td>
        `;
        list.appendChild(row)
    };

    showAlert(msg, className){
        const div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(msg));

        const subCon = document.querySelector('.sub-con');
        const addBook = document.querySelector('.add-book');

        subCon.insertBefore(div, addBook)

        setTimeout(()=>{
            document.querySelector('.alert').remove()
        }, 2000)
    };

    deleteBook(target){
        if(target.className === "delete") {
            target.parentElement.parentElement.remove();
        }
    };

    clearInputField(){
        title.value = ''
        author.value = ''
        isbn.value = ''
    };
};

class StoreLS{
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    };

    static displayBook(){
        const books = StoreLS.getBooks()

        books.forEach((book)=>{
            const ui = new UI();

            ui.addBokToLists(book);
        })
    };

    static addBookToLS(book){
        const books = StoreLS.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    };

    static removeFromLS(isbn){
        const books = StoreLS.getBooks();
        console.log(isbn)
        books.forEach((book, index)=>{
            if(book.isbn === isbn){
                books.splice(index, 1);
            };

            localStorage.setItem('books', JSON.stringify(books))
        });
    };
};

document.addEventListener('DOMContentLoaded', StoreLS.displayBook);

document.getElementById('book-form').addEventListener('submit', (e)=>{
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

    const book = new Book(title, author, isbn);

    const ui = new UI()

    if(title === '' || author === '' || isbn === ''){
        ui.showAlert('Please enter the details of the book you want to add.', 'error')
    }else{
        ui.addBokToLists(book);

        ui.clearInputField(title, author, isbn);

        StoreLS.addBookToLS(book)

        ui.showAlert('Book Added!.', 'success');
    }
    e.preventDefault();
});

document.getElementById('book-lists').addEventListener('click', (e)=>{

    const ui = new UI();

    StoreLS.removeFromLS(e.target.parentElement.previousElementSibling.textContent);

    ui.deleteBook(e.target);

    ui.showAlert('Book Deleted. Successful!', 'success');

    e.preventDefault()
})