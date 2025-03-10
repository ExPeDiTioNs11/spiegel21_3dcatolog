import React, { createContext, useContext, useState } from 'react';

// Ürün verilerini tanımlıyoruz
const initialProducts = {
    mirrors: [
        {
            id: 'Bolnuevo',
            modelName: 'Bolnuevo',
            name: 'Bolnuevo',
            description: 'Modern tasarımlı şık ayna',
            price: 299,
            thumbnail: '/images/Bolnuevo.jpg',
            features: ['ledLighting', 'antiFog', 'smartSensor']
        },
        {
            id: 'm01l2v',
            modelName: 'm01l2v',
            name: 'Classic',
            description: 'Klasik tasarım, modern teknoloji',
            price: 349,
            thumbnail: '/images/M01L2V.jpg',
            features: ['ledLighting', 'antiFog', 'bluetoothSpeaker']
        },
        {
            id: 'SimpleMirror',
            modelName: 'SimpleMirror',
            name: 'Simple',
            description: 'Sade ve şık tasarım',
            price: 249,
            thumbnail: '/images/Aurora.jpg',
            features: ['ledLighting', 'minimalDesign', 'easyMount']
        }
    ]
};

// Context'i oluşturuyoruz
const ProductContext = createContext();

// Context Provider bileşeni
export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState(initialProducts);

    // Ürünleri kategori bazında getiren fonksiyon
    const getProductsByCategory = (category) => {
        return products[category] || [];
    };

    // Tek bir ürünü ID'ye göre getiren fonksiyon
    const getProductById = (productId) => {
        for (const category in products) {
            const product = products[category].find(p => p.id === productId);
            if (product) return product;
        }
        return null;
    };

    // Yeni ürün ekleme fonksiyonu
    const addProduct = (category, product) => {
        setProducts(prev => ({
            ...prev,
            [category]: [...(prev[category] || []), product]
        }));
    };

    // Ürün güncelleme fonksiyonu
    const updateProduct = (category, productId, updatedProduct) => {
        setProducts(prev => ({
            ...prev,
            [category]: prev[category].map(p => 
                p.id === productId ? { ...p, ...updatedProduct } : p
            )
        }));
    };

    // Ürün silme fonksiyonu
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