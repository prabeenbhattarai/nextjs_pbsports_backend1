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

    const deleteImage = async (imageUrl) => {
        if (confirm('Are you sure you want to delete this image?')) {
            await axios.delete(`/api/images`, { data: { url: imageUrl } });
            setImages(images.filter(image => image !== imageUrl));
        }
    };

    return (
        <Layout>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {images.map((image, index) => (
                    <div key={index} className="relative overflow-hidden rounded-lg shadow-md">
                        <img src={image} alt="Image" className="w-full h-auto" />
                        <button 
                            onClick={() => deleteImage(image)}
                            className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full text-lg font-bold hover:bg-red-700 transition"
                        >
                            &times;
                        </button>
                    </div>
                ))}
            </div>
        </Layout>
    );
}
