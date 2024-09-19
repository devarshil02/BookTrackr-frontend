import React, { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';

const AddBook = ({ isOpen, onClose, book, onSave }) => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        publicationDate: '',
        genres: [],
        description: '',
        numberOfPages: '',
        publisher: '',
        language: '',
        coverImage: '',
        price: '',
        availableCopies: '',
    });

    useEffect(() => {
        if (book) {
            setFormData(book);
        } else {
            resetForm();
        }
    }, [book, isOpen]);

    const resetForm = () => {
        setFormData({
            title: '',
            author: '',
            publicationDate: '',
            genres: [],
            description: '',
            numberOfPages: '',
            publisher: '',
            language: '',
            coverImage: '',
            price: '',
            availableCopies: '',
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <Dialog.Panel className="bg-white p-6 rounded shadow-lg max-w-md mx-auto">
                    <Dialog.Title className="text-xl font-bold mb-4">
                        {book ? 'Edit Book' : 'Add Book'}
                    </Dialog.Title>
                    <form onSubmit={handleSubmit}>
                        <input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Title"
                            required
                            className="mb-3 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                        />
                        <input
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            placeholder="Author"
                            required
                            className="mb-3 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                        />
                        <input
                            name="publicationDate"
                            value={formData.publicationDate}
                            onChange={handleChange}
                            placeholder="Publication Date"
                            required
                            className="mb-3 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                        />
                        <input
                            name="genres"
                            value={formData.genres.join(',')}
                            onChange={(e) => handleChange({ target: { name: 'genres', value: e.target.value.split(',') } })}
                            placeholder="Genres (comma separated)"
                            className="mb-3 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                        />
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Description"
                            className="mb-3 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                        />
                        <input
                            type="number"
                            name="numberOfPages"
                            value={formData.numberOfPages}
                            onChange={handleChange}
                            placeholder="Number of Pages"
                            className="mb-3 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                        />
                        <input
                            name="publisher"
                            value={formData.publisher}
                            onChange={handleChange}
                            placeholder="Publisher"
                            className="mb-3 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                        />
                        <input
                            name="language"
                            value={formData.language}
                            onChange={handleChange}
                            placeholder="Language"
                            className="mb-3 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                        />
                        <input
                            name="coverImage"
                            value={formData.coverImage}
                            onChange={handleChange}
                            placeholder="Cover Image URL"
                            className="mb-3 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                        />
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="Price"
                            required
                            className="mb-3 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                        />
                        <input
                            type="number"
                            name="availableCopies"
                            value={formData.availableCopies}
                            onChange={handleChange}
                            placeholder="Available Copies"
                            required
                            className="mb-3 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                        />
                        <div className="flex justify-end mt-4">
                            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
                                Save
                            </button>
                            <button type="button" onClick={onClose} className="ml-2 bg-gray-300 py-2 px-4 rounded hover:bg-gray-400 transition">
                                Cancel
                            </button>
                        </div>
                    </form>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};

export default AddBook;
