import { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './index.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';

const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    author: Yup.string().required('Author is required'),
    publicationDate: Yup.date().required('Publication Date is required').nullable(),
    genres: Yup.string().required('Genres are required'),
    description: Yup.string(),
    numberOfPages: Yup.number().required('Number of Pages is required'),
    publisher: Yup.string(),
    language: Yup.string(),
    coverImage: Yup.string().nullable(),
    price: Yup.number().required('Price is required'),
    availableCopies: Yup.number().required('Available Copies are required'),
});

const AddBook = ({ isOpen, onClose, book, fetchBooks }) => {
    const initialFormData = {
        title: '',
        author: '',
        publicationDate: '',
        genres: '',
        description: '',
        numberOfPages: '',
        publisher: '',
        language: '',
        coverImage: '',
        price: '',
        availableCopies: '',
    };

    const [initialValues, setInitialValues] = useState(initialFormData);
    const [selectedFile, setSelectedFile] = useState(null);
    const [sanitizedFilePath, setSanitizedFilePath] = useState('');
    useEffect(() => {
        if (book) {
            setInitialValues({
                ...book,
                genres: book.genres?.join(','),
                publicationDate: moment(book.publicationDate, 'DD-MM-YYYY').format('YYYY-MM-DD'), 
            });
        } else {
            
            setInitialValues(initialFormData);
        }
    }, [book, isOpen]);

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        let formattedData;
        if (book) {
            const { _id, updatedAt, createdAt, ...rest } = values; 
            formattedData = {
                ...rest,
                id: book._id, 
                coverImage: sanitizedFilePath ? sanitizedFilePath : book?.coverImage,
                genres: values.genres.split(',').map(genre => genre.trim()), 
                publicationDate: values.publicationDate
                    ? moment(values.publicationDate).format('DD-MM-YYYY')
                    : null, 
            };
        } else {
            formattedData = {
                ...values,
                coverImage: sanitizedFilePath || null,
                genres: values.genres.split(',').map(genre => genre.trim()), 
                publicationDate: values.publicationDate
                    ? moment(values.publicationDate).format('DD-MM-YYYY')
                    : null,
            };
        }
        const token = localStorage.getItem('token'); 

        setSubmitting(true);

        try {
            let response;
            if (book) {
                response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/books/update`,
                    formattedData, 
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            } else {
                response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/books/add`,
                    formattedData,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            }

            if (response.status === 200 || response.status === 201) {
                toast.success(book ? 'Book updated successfully!' : 'Book added successfully!'); 
                fetchBooks();
                resetForm(); 
                setSelectedFile(null); 
                setSanitizedFilePath(''); 
                onClose(); 
            } else {
               
                toast.error('Failed to save the book');
            }
        } catch (error) {
            console.error('Error saving the book:', error);
            toast.error('An error occurred while saving the book'); 
        } finally {
            setSubmitting(false);
        }
    };


    useEffect(() => {
        const uploadFile = async () => {
            if (!selectedFile) return; 
            const formData = new FormData();
            formData.append('image', selectedFile);

            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/upload`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    }
                );

                if (response.status >= 200 && response.status < 300) {
                    setSanitizedFilePath(`https://booktrackr.onrender.com/${response.data.filename}`);
                } else {
                    toast.error('Failed to upload file');
                }
            } catch (error) {
                console.error('Error uploading file:', error);
                toast.error('An error occurred while uploading the file');
            }
        };

        uploadFile(); // Call the upload function
    }, [selectedFile]);


    return (
        <Dialog open={isOpen} onClose={onClose}>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <Dialog.Panel className="bg-white p-6 rounded shadow-lg max-w-md mx-auto w-full m-5">
                    <Dialog.Title className="text-xl font-bold mb-4">
                        {book ? 'Edit Book' : 'Add Book'}
                    </Dialog.Title>
                    <Formik
                        initialValues={initialValues}
                        enableReinitialize
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                        className="mb-3 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <div className="mb-3">
                                    <Field
                                        name="title"
                                        placeholder="Title"
                                        className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                    />
                                    <ErrorMessage name="title" component="div" className="text-red-500" />
                                </div>

                                <div className="mb-3">
                                    <Field
                                        name="author"
                                        placeholder="Author"
                                        className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                    />
                                    <ErrorMessage name="author" component="div" className="text-red-500" />
                                </div>

                                <div className="mb-3">
                                    <Field
                                        name="publicationDate"
                                        type="date"
                                        className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                    />
                                    <ErrorMessage name="publicationDate" component="div" className="text-red-500" />
                                </div>

                                <div className="mb-3">
                                    <Field
                                        name="genres"
                                        placeholder="Genres (comma separated)"
                                        className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                    />
                                    <ErrorMessage name="genres" component="div" className="text-red-500" />
                                </div>

                                <div className="mb-3">
                                    <Field
                                        as="textarea"
                                        name="description"
                                        placeholder="Description"
                                        className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                    />
                                </div>

                                <div className="mb-3">
                                    <Field
                                        type="number"
                                        name="numberOfPages"
                                        placeholder="Number of Pages"
                                        className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                    />
                                    <ErrorMessage name="numberOfPages" component="div" className="text-red-500" />
                                </div>

                                <div className="mb-3">
                                    <Field
                                        name="publisher"
                                        placeholder="Publisher"
                                        className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                    />
                                </div>

                                <div className="mb-3">
                                    <Field
                                        name="language"
                                        placeholder="Language"
                                        className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                    />
                                </div>

                                <div className="mb-3">
                                    <input
                                        type="file"
                                        onChange={(event) => setSelectedFile(event.currentTarget.files[0])}
                                        className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                    />
                                    <ErrorMessage name="coverImage" component="div" className="text-red-500" />
                                </div>

                                <div className="mb-3">
                                    <Field
                                        type="number"
                                        name="price"
                                        placeholder="Price"
                                        className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                    />
                                    <ErrorMessage name="price" component="div" className="text-red-500" />
                                </div>

                                <div className="mb-3">
                                    <Field
                                        type="number"
                                        name="availableCopies"
                                        placeholder="Available Copies"
                                        className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                    />
                                    <ErrorMessage name="availableCopies" component="div" className="text-red-500" />
                                </div>

                                <div className="flex justify-end mt-4">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                                    >
                                        {isSubmitting && (
                                            <svg
                                                className="animate-spin h-5 w-5 mr-3 text-white"
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
                                        )}
                                        {isSubmitting ? '' : 'Save'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="ml-2 bg-gray-300 py-2 px-4 rounded hover:bg-gray-400 transition"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};

export default AddBook;
