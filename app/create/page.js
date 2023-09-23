"use client"
import React, { useState } from 'react';
import Link from 'next/link';

function CreateProduct() {
    const [isProductCreated, setIsProductCreated] = useState(false);

    const [product, setProduct] = useState({
        name: '',
        price: '',
        discount: '',
        is_available: false,
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setProduct({ ...product, [name]: newValue });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${process.env.REACT_BACKEND_URL}/create-product`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });

            if (response.ok) {
                <h1>Done!</h1>
                setProduct({
                    name: '',
                    price: '',
                    discount: '',
                    is_available: false,
                })
                setIsProductCreated(true);

            } else {
                // Handle error response, if needed
                console.error('Failed to create product');
            }
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold mb-4">Create Product</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col">
                        <label className="mb-2">Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={product.name}
                            onChange={handleInputChange}
                            className="rounded-md border-gray-300 border p-2"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-2">Price:</label>
                        <input
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={handleInputChange}
                            className="rounded-md border-gray-300 border p-2"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-2">Discount (%):</label>
                        <input
                            type="number"
                            name="discount"
                            value={product.discount}
                            onChange={handleInputChange}
                            className="rounded-md border-gray-300 border p-2"
                        />
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name="is_available"
                            checked={product.is_available}
                            onChange={handleInputChange}
                            className="mr-2"
                        />
                        <label>Available</label>
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
                        Create Product
                    </button>
                </form>
                <div className="mt-4">
                    <Link href="/products" className="text-blue-500 hover:underline">Go Back to Products
                    </Link>
                </div>
                {isProductCreated && (
                    <div className="bg-green-100 text-green-600 p-2 rounded-md mb-4">
                        Product created successfully!
                    </div>
                )}
            </div>
        </div>
    );
}


export default CreateProduct;
