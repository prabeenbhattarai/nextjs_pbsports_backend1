import Layout from "@/components/layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Gallery() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        axios.get('/api/images').then(response => {
            setImages(response.data);
        });
    }, []);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://kit.fontawesome.com/a076d05399.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const deleteImage = async (imageUrl) => {
        if (confirm('Are you sure you want to delete this image?')) {
            try {
                await axios.delete('/api/images', { data: { url: imageUrl } });
                setImages(images.filter(image => image !== imageUrl));
            } catch (error) {
                console.error('Failed to delete image:', error);
            }
        }
    };

    return (
        <Layout>
            <div className="grid grid-cols-5 gap-4 p-4">
                {images.map((image, index) => (
                    <div key={index} className="relative overflow-hidden">
                        <img src={image} alt="Image" className="w-full h-auto object-cover" />
                        <button 
                            onClick={() => deleteImage(image)}
                            className="absolute top-2 right-2 text-gray-600 hover:text-red-600 transition"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
        </Layout>
    );
}
