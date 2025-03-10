import React, { createContext, useContext, useState } from 'react';

// Defining product data
const initialProducts = {
    mirrors: [
        {
            id: 'Bolnuevo',
            modelName: 'Bolnuevo',
            name: 'Bolnuevo',
            description: 'Modern designed elegant mirror',
            price: 299,
            thumbnail: '/images/Bolnuevo.jpg',
            features: ['ledLighting', 'antiFog', 'smartSensor']
        },
        {
            id: 'm01l2v',
            modelName: 'm01l2v',
            name: 'Classic',
            description: 'Classic design with modern technology',
            price: 349,
            thumbnail: '/images/M01L2V.jpg',
            features: ['ledLighting', 'antiFog', 'bluetoothSpeaker']
        },
        {
            id: 'SimpleMirror',
            modelName: 'SimpleMirror',
            name: 'Simple',
            description: 'Simple and elegant design',
            price: 249,
            thumbnail: '/images/Aurora.jpg',
            features: ['ledLighting', 'minimalDesign', 'easyMount']
        }
    ]
};

// Creating the context
const ProductContext = createContext();

// Context Provider component
export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState(initialProducts);

    // Function to get products by category
    const getProductsByCategory = (category) => {
        return products[category] || [];
    };

    // Function to get a single product by ID
    const getProductById = (productId) => {
        for (const category in products) {
            const product = products[category].find(p => p.id === productId);
            if (product) return product;
        }
        return null;
    };

    // Function to add new product
    const addProduct = (category, product) => {
        setProducts(prev => ({
            ...prev,
            [category]: [...(prev[category] || []), product]
        }));
    };

    // Function to update product
    const updateProduct = (category, productId, updatedProduct) => {
        setProducts(prev => ({
            ...prev,
            [category]: prev[category].map(p => 
                p.id === productId ? { ...p, ...updatedProduct } : p
            )
        }));
    };

    // Function to delete product
    const deleteProduct = (category, productId) => {
        setProducts(prev => ({
            ...prev,
            [category]: prev[category].filter(p => p.id !== productId)
        }));
    };

    const value = {
        products,
        getProductsByCategory,
        getProductById,
        addProduct,
        updateProduct,
        deleteProduct
    };

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
};

// Custom hook for using the product context
export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
}; 