import Layout from "@/components/layout";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from 'styled-components';

// Styled components
const GalleryGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    padding: 16px;
`;

const ImageWrapper = styled.div`
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Image = styled.img`
    width: 100%;
    height: auto;
    display: block;
`;

const DeleteButton = styled.button`
    position: absolute;
    top: 8px;
    right: 8px;
    background: rgba(255, 0, 0, 0.8);
    color: white;
    border: none;
    padding: 8px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 16px;
    line-height: 1;
    transition: background 0.3s;

    &:hover {
        background: rgba(255, 0, 0, 1);
    }
`;

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
            <GalleryGrid>
                {images.map((image, index) => (
                    <ImageWrapper key={index}>
                        <Image src={image} alt="Image" />
                        <DeleteButton onClick={() => deleteImage(image)}>
                            &times;
                        </DeleteButton>
                    </ImageWrapper>
                ))}
            </GalleryGrid>
        </Layout>
    );
}
