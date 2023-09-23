"use client";
import React, { useEffect, useState } from 'react';
import Loader from '@/Utils/Loader';

import axios from "axios";


const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_BACKEND_URL}/get-products`);
                const res = await response.data;
                setProducts(res);
                setLoading(false);
            }
            catch (err) {
                console.log(err);
                setLoading(false);
            }
        };
        fetchProducts();
    }
        , [])

    const handleDeleteProduct = (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            axios
                .delete(`${process.env.REACT_BACKEND_URL}/delete-product/${productId}`)
                .then((response) => {
                    if (response.status === 200) {
                        console.log("deleted!");
                    } else {
                        console.error('Failed to delete product');
                    }
                })
                .catch((error) => {
                    console.error('Error deleting product:', error);
                });
        }
    }

    return (
        <div className="flex flex-col text-center py-5">
            <h1 className="text-3xl font-semibold mb-5">Products</h1>
            {loading ? (<Loader />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products.map((product) => (
                        <div key={product.id} className="bg-white shadow-lg rounded-lg p-4">
                            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                            <p className="text-gray-600">Price: ₹{product.price}</p>
                            <p className="text-gray-600">Availability: {product.is_available ? 'Yes' : 'No'}</p>
                            <p className="text-gray-600">Discount: {product.discount}%</p>
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mt-2 rounded-full"
                                onClick={() => handleDeleteProduct(product.id)}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Products;