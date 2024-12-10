import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';

export default function PhotosUploader({addedPhotos, onChange}){
    const [photoLink,setPhotoLink] = useState('');

    async function uploadPhoto(ev){
        // const files = ev.target.files;
        // const data = new FormData();
        // for (let i = 0; i < files.length; i++){
        //     data.append('photos', files[i]);
        // } 
        // axios.post('/upload', data, {
        //     headers: {'Content-type':'multipart/form-data'}
        // }).then(response => {
        //     const {data:filenames} = response;
        //     onChange(prev =>{
        //         return [...prev, ...filenames];
        //     });
        // });

        const files = ev.target.files;
    const uploadedUrls = [];

    // Upload each file to /cloudinary-upload endpoint
    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append('file', files[i]);

      try {
        const response = await axios.post('/cloudinary-upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        uploadedUrls.push(response.data.secure_url); // Store uploaded image URLs
      } catch (error) {
        console.error(`Failed to upload file: ${files[i].name}`, error);
      }
    }

    // Update state with new photo URLs
    onChange((prev) => {
      return [...prev, ...uploadedUrls];
    });
    }
    function removePhoto(ev, filename){
        ev.preventDefault();
        onChange([...addedPhotos.filter(photo => photo !== filename)]);
    }
    function selectAsMainPhoto(ev, filename){
        ev.preventDefault();
        onChange([filename,...addedPhotos.filter(photo => photo !== filename)]);
    }
    return(
        <>
    
        <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {addedPhotos.length > 0 && addedPhotos.map(link => (
                <div className="h-32 flex relative" key={link}>
                    <img className="rounded-2xl w-full object-cover" src={link} alt=""/>
                    <button onClick={ev => removePhoto(ev, link)} className="cursor-pointer absolute bottom-1 right-1 text-white bg-black bg-opacity-50 rounded-2xl p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>
                    <button onClick={ev => selectAsMainPhoto(ev, link)} className="cursor-pointer absolute bottom-1 left-1 text-white bg-black bg-opacity-50 rounded-2xl p-1">
                        {link === addedPhotos[0] && (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                                <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clipRule="evenodd" />
                            </svg>
                        )}
                        {link !== addedPhotos[0] && (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                            </svg>
                        )}
                        
                    </button>
                </div>
            ))}
            <label className="h-32 cursor-pointer flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
                <input type="file" multiple className="hidden" onChange={uploadPhoto}/>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                </svg>
                Upload
            </label>
        </div>
        </>
    )
}