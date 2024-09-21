
// const books = [
//   {
//     "title": "To Kill a Mockingbird",
//     "author": "Harper Lee",
//     "publicationDate": "1960-07-11",
//     "genres": ["Fiction", "Classics"],
//     "description": "A novel about the serious issues of rape and racial inequality.",
//     "numberOfPages": 281,
//     "publisher": "J.B. Lippincott & Co.",
//     "language": "English",
//     "coverImage": "https://i.postimg.cc/RF05B0Hd/images-1.jpg",
//     "price": 15.99,
//     "availableCopies": 50
//   },
//   {
//     "title": "1984",
//     "author": "George Orwell",
//     "publicationDate": "1949-06-08",
//     "genres": ["Dystopian", "Political Fiction"],
//     "description": "A chilling dystopia that explores surveillance and totalitarianism.",
//     "numberOfPages": 328,
//     "publisher": "Secker & Warburg",
//     "language": "English",
//     "coverImage": "https://i.postimg.cc/mZQq5MJ4/download-4.jpg",
//     "price": 12.99,
//     "availableCopies": 100
//   },
//   {
//     "title": "The Great Gatsby",
//     "author": "F. Scott Fitzgerald",
//     "publicationDate": "1925-04-10",
//     "genres": ["Classics", "Fiction"],
//     "description": "A critique of the American Dream set in the Jazz Age.",
//     "numberOfPages": 180,
//     "publisher": "Charles Scribner's Sons",
//     "language": "English",
//     "coverImage": "https://i.postimg.cc/dQp14bbp/download-3.jpg",
//     "price": 10.99,
//     "availableCopies": 70
//   },
//   {
//     "title": "The Catcher in the Rye",
//     "author": "J.D. Salinger",
//     "publicationDate": "1951-07-16",
//     "genres": ["Fiction", "Classics"],
//     "description": "The struggles of teenage rebellion and alienation.",
//     "numberOfPages": 214,
//     "publisher": "Little, Brown and Company",
//     "language": "English",
//     "coverImage": "https://i.postimg.cc/xCWXJBYw/download-2.jpg",
//     "price": 14.99,
//     "availableCopies": 85
//   },
//   {
//     "title": "Moby-Dick",
//     "author": "Herman Melville",
//     "publicationDate": "1851-10-18",
//     "genres": ["Adventure", "Classics"],
//     "description": "A seafaring tale of obsession and revenge.",
//     "numberOfPages": 585,
//     "publisher": "Harper & Brothers",
//     "language": "English",
//     "coverImage": "https://i.postimg.cc/2jQk71xb/download-1.jpg",
//     "price": 18.99,
//     "availableCopies": 40
//   },
//   {
//     "title": "Pride and Prejudice",
//     "author": "Jane Austen",
//     "publicationDate": "1813-01-28",
//     "genres": ["Romance", "Classics"],
//     "description": "A witty comedy of manners centered on love and society.",
//     "numberOfPages": 279,
//     "publisher": "T. Egerton, Whitehall",
//     "language": "English",
//     "coverImage": "https://i.postimg.cc/PrJ7rcNX/download.jpg",
//     "price": 11.99,
//     "availableCopies": 95
//   },
//   {
//     "title": "The Hobbit",
//     "author": "J.R.R. Tolkien",
//     "publicationDate": "1937-09-21",
//     "genres": ["Fantasy", "Adventure"],
//     "description": "A journey of Bilbo Baggins to reclaim a lost kingdom.",
//     "numberOfPages": 310,
//     "publisher": "George Allen & Unwin",
//     "language": "English",
//     "coverImage": "https://m.media-amazon.com/images/I/91b0C2YNSrL.jpg",
//     "price": 13.99,
//     "availableCopies": 60
//   },
//   {
//     "title": "The Alchemist",
//     "author": "Paulo Coelho",
//     "publicationDate": "1988-11-01",
//     "genres": ["Philosophy", "Adventure"],
//     "description": "A story about pursuing your dreams.",
//     "numberOfPages": 208,
//     "publisher": "HarperOne",
//     "language": "English",
//     "coverImage": "https://m.media-amazon.com/images/I/51Z0nLAfLmL.jpg",
//     "price": 16.99,
//     "availableCopies": 120
//   }
// ];

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const Index = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate(); // Initialize useNavigate for routing

  const fetchBooks = async () => {
    try {
      setLoading(true); // Start loader
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
      setBooks(response?.data?.data); // Assuming response.data contains the books array
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false); // Stop loader
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [token]);

  // Function to handle book click and navigation
  const handleBookClick = (book) => {
    if (!token) {
      navigate("/login");
    } else {
      navigate(`/book/${book._id}`);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>



      {
        loading ? (
          <>
            <div className="flex justify-center w-full mt-10">
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
        ) : (
          <>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {books.map((book, index) => (
                <div
                  key={index}
                  className="group relative"
                  onClick={() => handleBookClick(book)} // Handle click event
                  style={{ cursor: "pointer" }} // Optional: Change cursor to pointer on hover
                >
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
                    <p className="text-sm font-medium text-gray-900">${book.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )
      }
    </div>

  );
};

export default Index;
