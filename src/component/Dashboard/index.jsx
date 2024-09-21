import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddBook from "./AddBook";
import DeleteBook from "./delete";
import axios from "axios";
import { toast } from "react-toastify";

const index = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [bookToDelete, setBookToDelete] = useState('');
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const fetchBooks = async () => {
        try {
            setLoading(true); 
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/books/get`,
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            setBooks(response?.data?.data); 

        } catch (error) {
            console.error("Error fetching books:", error);
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        fetchBooks();
    }, [token]);

    const handleLogout = (event) => {
        event.preventDefault();
        localStorage.clear();
        window.location.reload()
        navigate('/');
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

    const confirmDelete = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/books/delete`,
                { bookId: bookToDelete?._id },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            if (response.status === 200) {
                setBooks(books.filter((book) => book._id !== bookToDelete._id));
                setIsDeleteOpen(false); 
                toast.success(`Book deleted successfully!`);
            } else {
                toast.error("Failed to delete the book. Please try again.");
                console.error("Error deleting book:", response.data.message);
            }

        } catch (error) {
            console.error("Error deleting book:", error);
        } finally {
            setBookToDelete(null); 
        }
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
                        {
                            loading ?
                                (
                                    <>
                                        <div className="flex justify-center w-full mt-14">
                                            <svg
                                                className="animate-spin h-9 w-9 mr-3 text-gray-600"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                                ></path>
                                            </svg>
                                        </div>
                                    </>
                                ) :
                                (
                                    <>
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
                                                                <button onClick={() => handleDelete(book)}
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
                                    </>
                                )
                        }
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
                fetchBooks={fetchBooks}
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