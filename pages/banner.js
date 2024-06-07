import axios from 'axios';
import { useEffect, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import Image from 'next/image';
import Layout from "@/components/layout";

export default function Banner() {
  const [images, setImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const res = await axios.get('/api/banner');
    setImages(res.data);
  };

  const uploadImage = async (ev) => {
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
  };

  const deleteImage = async (url) => {
    await axios.delete('/api/banner', { data: { url } });
    setImages(images.filter(image => image !== url));
  };

  const updateImagesOrder = (images) => {
    setImages(images);
  };

  return (
      <Layout>
    <div>
      <h1>Upload and Manage Banners</h1>
      <div className="mb-2 flex flex-wrap gap-1">
        <ReactSortable className="flex flex-wrap gap-1" list={images} setList={updateImagesOrder}>
          {images.map(link => (
            <div key={link} className="relative h-24 w-24">
              <Image src={link} alt="" layout="fill" className="rounded-lg object-cover" />
              <button
                onClick={() => deleteImage(link)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1">
                Delete
              </button>
            </div>
          ))}
        </ReactSortable>
        {isUploading && (
          <div className="h-24 flex items-center">
            <span>Uploading...</span>
          </div>
        )}
        <label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center rounded-lg bg-gray-200">
          <input type="file" onChange={uploadImage} className="hidden" />
          <span>Upload</span>
        </label>
        {!images.length && (
          <div>No images found.</div>
        )}
      </div>
    </div>
  );
}

             
