import { useEffect } from 'react';

export default function Notification({ message, type, onClose }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000); // Hide notification after 3 seconds

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`fixed top-5 right-5 p-4 rounded-lg shadow-md text-white ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
            {message}
        </div>
    );
}
