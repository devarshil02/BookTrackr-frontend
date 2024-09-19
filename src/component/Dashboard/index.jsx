import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddBook from "./AddBook";
import DeleteBook from "./delete";

const books = [
    {
        "title": "To Kill a Mockingbird",
        "author": "Harper Lee",
        "publicationDate": "1960-07-11",
        "genres": ["Fiction", "Classics"],
        "description": "A novel about the serious issues of rape and racial inequality.",
        "numberOfPages": 281,
        "publisher": "J.B. Lippincott & Co.",
        "language": "English",
        "coverImage": "https://i.postimg.cc/RF05B0Hd/images-1.jpg",
        "price": 15.99,
        "availableCopies": 50
    },
    {
        "title": "1984",
        "author": "George Orwell",
        "publicationDate": "1949-06-08",
        "genres": ["Dystopian", "Political Fiction"],
        "description": "A chilling dystopia that explores surveillance and totalitarianism.",
        "numberOfPages": 328,
        "publisher": "Secker & Warburg",
        "language": "English",
        "coverImage": "https://i.postimg.cc/mZQq5MJ4/download-4.jpg",
        "price": 12.99,
        "availableCopies": 100
    },
    {
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "publicationDate": "1925-04-10",
        "genres": ["Classics", "Fiction"],
        "description": "A critique of the American Dream set in the Jazz Age.",
        "numberOfPages": 180,
        "publisher": "Charles Scribner's Sons",
        "language": "English",
        "coverImage": "https://i.postimg.cc/dQp14bbp/download-3.jpg",
        "price": 10.99,
        "availableCopies": 70
    },
    {
        "title": "The Catcher in the Rye",
        "author": "J.D. Salinger",
        "publicationDate": "1951-07-16",
        "genres": ["Fiction", "Classics"],
        "description": "The struggles of teenage rebellion and alienation.",
        "numberOfPages": 214,
        "publisher": "Little, Brown and Company",
        "language": "English",
        "coverImage": "https://i.postimg.cc/xCWXJBYw/download-2.jpg",
        "price": 14.99,
        "availableCopies": 85
    },
    {
        "title": "Moby-Dick",
        "author": "Herman Melville",
        "publicationDate": "1851-10-18",
        "genres": ["Adventure", "Classics"],
        "description": "A seafaring tale of obsession and revenge.",
        "numberOfPages": 585,
        "publisher": "Harper & Brothers",
        "language": "English",
        "coverImage": "https://i.postimg.cc/2jQk71xb/download-1.jpg",
        "price": 18.99,
        "availableCopies": 40
    },
    {
        "title": "Pride and Prejudice",
        "author": "Jane Austen",
        "publicationDate": "1813-01-28",
        "genres": ["Romance", "Classics"],
        "description": "A witty comedy of manners centered on love and society.",
        "numberOfPages": 279,
        "publisher": "T. Egerton, Whitehall",
        "language": "English",
        "coverImage": "https://i.postimg.cc/PrJ7rcNX/download.jpg",
        "price": 11.99,
        "availableCopies": 95
    },
    {
        "title": "The Hobbit",
        "author": "J.R.R. Tolkien",
        "publicationDate": "1937-09-21",
        "genres": ["Fantasy", "Adventure"],
        "description": "A journey of Bilbo Baggins to reclaim a lost kingdom.",
        "numberOfPages": 310,
        "publisher": "George Allen & Unwin",
        "language": "English",
        "coverImage": "https://m.media-amazon.com/images/I/91b0C2YNSrL.jpg",
        "price": 13.99,
        "availableCopies": 60
    },
    {
        "title": "The Alchemist",
        "author": "Paulo Coelho",
        "publicationDate": "1988-11-01",
        "genres": ["Philosophy", "Adventure"],
        "description": "A story about pursuing your dreams.",
        "numberOfPages": 208,
        "publisher": "HarperOne",
        "language": "English",
        "coverImage": "https://m.media-amazon.com/images/I/51Z0nLAfLmL.jpg",
        "price": 16.99,
        "availableCopies": 120
    }
];

const index = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [bookToDelete, setBookToDelete] = useState('');

    const navigate = useNavigate();

    const handleLogout = (event) => {
        event.preventDefault();
        console.log("Logging out...");
        localStorage.clear();
        navigate('/');
    };

    const handleAddOrEditBook = (book) => {
        // Implement your logic to add or edit the book in your backend
        // For example:
        if (selectedBook) {
            // Update existing book
            console.log("Updating book:", book);
        } else {
            // Add new book
            console.log("Adding new book:", book);
        }
    };

    const openAddBookModal = () => {
        setSelectedBook(null);
        setModalOpen(true);
    };

    const openEditBookModal = (book) => {
        setSelectedBook(book);
        setModalOpen(true);
    };


    const handleDelete = (bookTitle) => {
        setBookToDelete(bookTitle);
        setIsDeleteOpen(true);
    };

    const confirmDelete = () => {
        // Add your deletion logic here (e.g., API call)
        console.log(`Book ${bookToDelete} deleted.`);
        setBookToDelete(''); // Clear the book title
        // Refresh your books list here if necessary
    };

    return (
        <>
            <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
                <div className="flex lg:flex-1">
                    <a href="#" className="-m-1.5 p-1.5">
                        <span className="sr-only">Your Company</span>
                        <img
                            alt=""
                            src="https://i.postimg.cc/3J5Y6GZF/b-1-removebg-preview.png"
                            className="h-20 w-auto"
                        />
                    </a>
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end" onClick={handleLogout} style={{ zIndex: "999" }}>
                    <span className="text-sm font-semibold leading-6 text-gray-900 cursor-pointer">
                        Log Out <span aria-hidden="true">&rarr;</span>
                    </span>
                </div>
            </nav>
            <div className="relative isolate pt-14">
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                >
                    <div
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    />
                </div>
                <div className="mx-auto">
                    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Manage Customer Purchases</h2>
                            <button onClick={openAddBookModal} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow">
                                Add More
                            </button>
                        </div>
                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                            {books.map((book, index) => (
                                <div key={index} className="group relative">
                                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 p-2">
                                        <img
                                            alt={book.title}
                                            src={book.coverImage}
                                            className="h-full w-full object-cover rounded-lg object-center lg:h-full lg:w-full"
                                        />
                                    </div>
                                    <div className="mt-4 flex justify-between">
                                        <div>
                                            <h3 className="text-sm text-gray-700">
                                                <span aria-hidden="true" className="absolute inset-0" />
                                                {book.title}
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-500">{book.author}</p>
                                        </div>

                                        <div className="flex items-center flex-col">
                                            <p className="text-sm font-medium text-gray-900">${book.price.toFixed(2)}</p>
                                            <div className="flex items-center flex-row space-x-2 mt-1" style={{ zIndex: "999" }}>
                                                <button
                                                    onClick={() => openEditBookModal(book)}
                                                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-0 px-2 border border-blue-500 hover:border-transparent rounded text-sm cursor-pointer"
                                                >
                                                    Edit
                                                </button>
                                                <button onClick={() => handleDelete(book.title)} 
                                                    className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-0 px-1 border border-red-500 hover:border-transparent rounded text-sm cursor-pointer"
                                                >
                                                    Delete
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                >
                    <div
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                        className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                    />
                </div>
            </div>

            <AddBook
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                book={selectedBook}
                onSave={handleAddOrEditBook}
            />
             <DeleteBook
                open={isDeleteOpen}
                setOpen={setIsDeleteOpen}
                bookTitle={bookToDelete}
                onDelete={confirmDelete}
            />
        </>
    )
}

export default index