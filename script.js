const search_book = () => {
    const search_text = document.getElementById('book_name').value;
    document.getElementById('book_name').value = '';
    console.log(search_text);

    const url = `https://openlibrary.org/search.json?q=${search_text}`;
    console.log(url);

    fetch(url)
        .then(res => res.json())
        .then(data => display_book(data))
}

const display_book = books => {

    console.log(books);
    const display_book = document.getElementById('display_book');
    display_book.innerText = '';

    books.docs.forEach(book => {
        let title, author_name, first_publish_year;
        if (book.title !== undefined) {
            title = book.title;
        } else {
            title = "Informaton not avilable"
        }

        if (book.author_name !== undefined) {
            author_name = book.author_name[0];
        } else {
            author_name = "Informaton not avilable"
        }

        if (book.first_publish_year !== undefined) {
            first_publish_year = book.first_publish_year;
        } else {
            first_publish_year = "Informaton not avilable"
        }

        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card mx-1">
                <img src="..." class="card-img-top" alt="...">
                <div class="card-body">
                    <h3 class="card-title">${title}</h3>                   
                    <p class="fs-4">by ${author_name}</p>                    
                    <p class="card-text">First published in ${first_publish_year}</p>
                </div>
            </div>    
        `

        display_book.appendChild(div);

    });


}


document.getElementById('search_book').addEventListener('click', search_book);