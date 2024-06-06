import { useState, useEffect } from 'react';
import axios from 'axios';
import ImageUploadForm from '../components/ImageUploadForm';
import Image from 'next/image';

export default function BannerPage() {
    const [images, setImages] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        // Fetch the list of uploaded images
        async function fetchImages() {
            const res = await axios.get('/api/banner');
            setImages(res.data);
        }
        fetchImages();
    }, []);

    async function deleteImage(image) {
        try {
            await axios.delete('/api/image-upload', { data: { url: image } });
            setImages(images.filter(img => img !== image));
        } catch (error) {
            console.error('Failed to delete image:', error);
        }
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Banner Management</h1>
            <button 
                onClick={() => setShowForm(!showForm)}
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
            >
                {showForm ? 'Close Upload Form' : 'Upload New Image'}
            </button>
            {showForm && <ImageUploadForm />}
            <div className="mt-4">
                <h2 className="text-xl font-bold mb-2">Uploaded Images</h2>
                <div className="flex flex-wrap gap-4">
                    {images.map((image, index) => (
                        <div key={index} className="relative">
                            <Image src={image} alt={`Banner ${index}`} width={200} height={200} className="rounded-lg" />
                            <button
                                onClick={() => deleteImage(image)}
                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 m-1"
                            >
                                &#10005;
                            </button>
                        </div>
                    ))}
                </div>
                {!images.length && <div>No images found</div>}
            </div>
        </div>
    );
}
