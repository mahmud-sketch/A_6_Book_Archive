// start searching on search book button click
const search_book = () => {
    // empties number_of_books_found area from previous search
    document.getElementById('number_of_books_found').innerText = '';

    // empties cards from previous search
    document.getElementById('display_book').innerText = '';

    //gets search text and calls API and calls display books in card form 
    const search_text = document.getElementById('book_name').value;
    // empties serach input area
    document.getElementById('book_name').value = '';
    const url = `https://openlibrary.org/search.json?q=${search_text}`;
    console.log(url);

    fetch(url)
        .then(res => res.json())
        .then(data => display_book(data))
}


//display books
const display_book = books => {

    // shows how many book found
    let number_of_books_found;

    if (books.numFound === 0) {
        number_of_books_found = 'no books found on this topic'

    } else {
        number_of_books_found = `found ${books.numFound} books. showing first ${books.docs.length}.`;
    }
    document.getElementById('number_of_books_found').innerText = number_of_books_found;

    console.log(books);

    const display_book = document.getElementById('display_book');

    //using forEach loop to append books in card form in the display book div
    books.docs.forEach(book => {

        /*chechk if title, author_name, first_publish_year, publisher, cover_image undefined*/

        let title, author_name, first_publish_year, publisher, cover_image;

        //chechk if title undefined
        if (book.title !== undefined) {
            title = book.title;
        } else {
            title = "Informaton not avilable"
        }

        //chechk if author_name undefined
        if (book.author_name !== undefined) {
            author_name = book.author_name[0];
        } else {
            author_name = "Informaton not avilable"
        }

        //chechk if first_publish_year undefined
        if (book.first_publish_year !== undefined) {
            first_publish_year = book.first_publish_year;
        } else {
            first_publish_year = "Informaton not avilable"
        }

        //chechk if publisher undefined
        if (book.publisher !== undefined) {
            publisher = book.publisher;
        } else {
            publisher = "Informaton not avilable"
        }

        //chechk if cover_image undefined
        if (book.cover_i !== undefined) {
            cover_image = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
        } else {
            cover_image = `images/no_image.jpg`
        }


        // create cards from API data
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card mx-1 p-2" style="height: 500px; overflow:hidden; background-color:#ece5eb;">
                <img src="${cover_image}" style="height: 200px; width:150px;" class="card-img-top mx-auto" alt="...">
                <div class="card-body">
                    <h3 class="card-title text-primary">${title}</h3>                   
                    <p class="fs-4 text-success">by ${author_name}</p>                    
                    <p class='text-info'>publisher: ${publisher}</p>                    
                    <p class="card-text">First published in ${first_publish_year}</p>
                </div>
            </div>    
        `

        display_book.appendChild(div);

    });


}


// event handler for search book button
document.getElementById('search_book').addEventListener('click', search_book);