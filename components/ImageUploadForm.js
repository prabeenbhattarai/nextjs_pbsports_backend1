import axios from "axios";
import { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import Image from 'next/image';
import Spinner from "./Spinner";

export default function ImageUploadForm() {
    const [images, setImages] = useState([]);
    const [isUploading, setIsUploading] = useState(false);

    async function uploadImage(ev) {
        const files = ev.target?.files;
        if (files?.length > 0) {
            setIsUploading(true);
            const data = new FormData();
            for (const file of files) {
                data.append('file', file);
            }
            const res = await axios.post('/api/image-upload', data);
            setImages(oldImages => [...oldImages, ...res.data.links]);
            setIsUploading(false);
        }
    }

    async function deleteImage(image) {
        try {
            await axios.delete('/api/image-upload', { data: { url: image } });
            setImages(images.filter(img => img !== image));
        } catch (error) {
            console.error('Failed to delete image:', error);
        }
    }

    function updateImagesOrder(images) {
        setImages(images);
    }

    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Images
            </label>
            <div className="mb-2 flex flex-wrap gap-1">
                <ReactSortable className="flex flex-wrap gap-1" list={images} setList={updateImagesOrder}>
                    {!!images?.length && images.map(link => (
                        <div key={link} className="relative h-24">
                            <Image src={link} width={100} height={100} alt="" className="rounded-lg" />
                            <button
                                type="button"
                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 m-1"
                                onClick={() => deleteImage(link)}
                            >
                                &#10005;
                            </button>
                        </div>
                    ))}
                </ReactSortable>
                {isUploading && (
                    <div className="h-24 flex items-center">
                        <Spinner />
                    </div>
                )}
                <label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center rounded-lg bg-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25" />
                    </svg>
                    <div> Upload</div>
                    <input type="file" onChange={uploadImage} className="hidden"></input>
                </label>
                {!images?.length && (
                    <div>** Not found Any Images **</div>
                )}
            </div>
        </div>
    );
}
