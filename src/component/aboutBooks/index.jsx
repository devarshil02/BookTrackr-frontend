import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function AboutBook() {
  const { id } = useParams(); // Get the id from the URL params
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch the book by ID
  const fetchBookById = async () => {
    const token = localStorage.getItem("token");

    try {
      setLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/books/getById`, { bookId: id }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBook(response.data.data);
    } catch (error) {
      console.error("Error fetching book:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchBookById();
    }
  }, [id]);

  return (
    <>
      <div className="relative isolate">
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
          <div className=" shadow-sm sticky top-0">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-1 md:py-4">
              <div className="flex items-center justify-between md:justify-start">
                <Link to="/">
                  <img
                    alt="Your Company"
                    src="https://i.postimg.cc/3J5Y6GZF/b-1-removebg-preview.png"
                    className=" h-14 w-auto"
                  />
                </Link>
              </div>
            </div>
          </div>

          <div className="py-6 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row -mx-4">
                {/* Image Section */}
                <div className="md:flex-1 px-4 ">
                  <div className="overflow-hidden rounded-lg  lg:aspect-none group-hover:opacity-75 h-64 md:h-80  mb-4 flex items-center justify-center bg-gray-100 p-2">
                    <img src={book?.coverImage} alt={book?.title} className="h-full w-full object-contain" />
                  </div>
                </div> 

                {/* Product Details */}
                <div className="md:flex-1 px-4">
                  <h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">{book?.title}</h2>
                  <p className="text-gray-500 text-sm">By <a className="text-indigo-600 ">{book?.author}</a></p>
                  <p className="text-gray-500 text-sm">Published on: {book?.publicationDate}</p>

                  <div className="flex items-center space-x-4 my-4">
                    <div>
                      <div className="rounded-lg flex py-2 px-3">
                        <span className="text-indigo-400 mr-1 mt-1">$</span>
                        <span className="font-bold text-indigo-600 text-3xl">{book?.price}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-green-500 text-xl font-semibold">Save 12%</p>
                      <p className="text-gray-400 text-sm">Inclusive of all Taxes.</p>
                    </div>
                    {
                      book?.availableCopies > 0 ? (
                        <button type="button" className="h-5 p-3 flex items-center text-xs font-semibold  rounded-xl bg-green-700 hover:bg-green-800 text-white">
                          Available
                        </button>
                      ) : (
                        <button type="button" className="h-5 p-3 flex items-center text-xs font-semibold  rounded-xl bg-red-500 hover:bg-red-600 text-white">
                          Sold Out
                        </button>
                      )
                    }
                  </div>

                  <p className="text-gray-500 mb-4">{book?.description}</p>

                  <p className="text-gray-500 mb-4"><strong>Genres:</strong> {book?.genres?.join(", ")}</p>
                  <p className="text-gray-500 mb-4"><strong>Number of Pages:</strong> {book?.numberOfPages}</p>
                  <p className="text-gray-500 mb-4"><strong>Publisher:</strong> {book?.publisher}</p>
                  <p className="text-gray-500 mb-4"><strong>Language:</strong> {book?.language}</p>
                </div>
              </div>
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
    </>
  );
}
