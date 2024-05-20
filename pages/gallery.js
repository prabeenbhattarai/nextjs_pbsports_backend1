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
            <div className="p-4">
                {images.map((image, index) => (
                    <div key={index} className="inline-block relative mr-4 mb-4">
                        <img 
                            src={image} 
                            alt="Image" 
                            className="w-40 h-40 object-cover rounded-lg"
                        />
                        <button 
                            onClick={() => deleteImage(image)}
                            className="absolute top-2 right-2 text-gray-600 hover:text-red-600 transition"
                        >
                            <svg viewBox="0 0 1024 1024" className="w-6 h-6" fill="#000000">
                                <path d="M724.3 198H296.1l54.1-146.6h320z" fill="#FAFCFB"></path>
                                <path d="M724.3 216.5H296.1c-6.1 0-11.7-3-15.2-7.9-3.5-5-4.3-11.3-2.2-17L332.8 45c2.7-7.3 9.6-12.1 17.4-12.1h320c7.7 0 14.7 4.8 17.4 12.1l54.1 146.6c2.1 5.7 1.3 12-2.2 17-3.5 4.9-9.2 7.9-15.2 7.9z m-401.6-37h375.1L657.3 69.9H363.1l-40.4 109.6z" fill="#0F0F0F"></path>
                                <path d="M664.3 981.6H339.7c-54.2 0-98.5-43.3-99.6-97.5L223.7 235h572.9l-32.8 651.4c-2.3 53.2-46.1 95.2-99.5 95.2z" fill="#9DC6AF"></path>
                                <path d="M664.3 995H339.7c-29.7 0-57.8-11.4-79-32.2-21.2-20.8-33.3-48.6-34-78.3L210 221.6h600.7L777.2 887c-2.6 60.5-52.2 108-112.9 108zM237.4 248.3l16 635.5c0.5 22.7 9.7 44 25.9 59.8 16.2 15.9 37.7 24.6 60.4 24.6h324.6c46.3 0 84.2-36.2 86.2-82.5l32.1-637.4H237.4z" fill="#191919"></path>
                                <path d="M827.1 239.5H193.3c-22.2 0-40.4-18.2-40.4-40.4v-2.2c0-22.2 18.2-40.4 40.4-40.4h633.8c22.2 0 40.4 18.2 40.4 40.4v2.2c0 22.2-18.2 40.4-40.4 40.4z" fill="#D39E33"></path>
                                <path d="M826 252.9H194.4c-30.3 0-54.9-24.6-54.9-54.9 0-30.3 24.6-54.9 54.9-54.9H826c30.3 0 54.9 24.6 54.9 54.9s-24.7 54.9-54.9 54.9z m-631.6-83.1c-15.5 0-28.2 12.6-28.2 28.2s12.6 28.2 28.2 28.2H826c15.5 0 28.2-12.6 28.2-28.2 0-15.5-12.6-28.2-28.2-28.2H194.4z" fill="#111111"></path>
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
        </Layout>
    );
}
