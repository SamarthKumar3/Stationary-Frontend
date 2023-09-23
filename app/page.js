import React from 'react';
import Link from 'next/link';

import './globals.css';

function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold mb-6">Welcome to Stationary</h1>

        <div className="space-y-4">
          <Link href="/products"className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md text-center">
              View Products
          </Link>

          <Link href="/create" className="block bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-md text-center">
              Create New Product
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
