import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import Perks from '../Perks';
import axios from 'axios';

export default function PlacesPage() {
    const { action } = useParams();

    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);

    function inputHeader(text) {
        return (
            <h2 className='text-2xl mt-4'>{text}</h2>
        );
    }

    async function addPhotoByLink(ev) {
        ev.preventDefault();

        if (!photoLink) {
            alert('Please enter a valid photo link.');
            return;
        }

        const { data: filename } = await axios.post('/upload-by-link', { link: photoLink });
        setAddedPhotos(prev => {
            return [...prev, filename];
        });
        setPhotoLink('');
    }

    function uploadPhoto(ev) {
        const files = ev.target.files;
        console.log({ files });
    }

    return (
        <div>
            {action !== 'new' && (
                <div className="text-center">
                    <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/account/places/new'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add new place
                    </Link>
                </div>
            )}

            {action === 'new' && (
                <div>
                    <form action="">
                        {inputHeader('Title')}
                        <input type="text" placeholder='title, ex: My lovely apt' value={title} onChange={ev => setTitle(ev.target.value)} />

                        {inputHeader('Address')}
                        <input type="text" placeholder='address' value={address} onChange={ev => setAddress(ev.target.value)} />

                        {inputHeader('Photos')}
                        <div className='flex gap-2'>
                            <input type="text" placeholder='Add using a link ......jpg' value={photoLink} onChange={ev => setPhotoLink(ev.target.value)} />
                            <button onClick={addPhotoByLink} className='bg-gray-200 px-4 rounded-2xl'>Add&nbsp;photos</button>
                        </div>
                        <div className='mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
                            {addedPhotos.length > 0 && addedPhotos.map(link => (
                                <div>
                                    <img className='rounded-2xl' src={"http://localhost:4000/uploads/" + link} alt="" />
                                </div>
                            ))}
                            <label className='cursor-pointer flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600'>
                                <input type="file" className='hidden' onChange={uploadPhoto} />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                                </svg>
                                Upload
                            </label>
                        </div>

                        {inputHeader('Description')}
                        <textarea value={description} onChange={ev => setDescription(ev.target.value)} />

                        {inputHeader('Perks')}
                        <Perks selected={perks} onChange={setPerks} />

                        {inputHeader('Extra info')}
                        <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />

                        {inputHeader('Check in&out times')}
                        <div className='grid sm:grid-cols-3 gap-2' >
                            <div>
                                <h3 className='my-2 -mb-1'>Check in time</h3>
                                <input type="text" placeholder='14' value={checkIn} onChange={ev => setCheckIn(ev.target.value)} />
                            </div>
                            <div>
                                <h3 className='my-2 -mb-1'>Check out time</h3>
                                <input type="text" placeholder='11' value={checkOut} onChange={ev => setCheckOut(ev.target.value)} />
                            </div>
                            <div>
                                <h3 className='my-2 -mb-1'>Max guests</h3>
                                <input type="number" value={maxGuests} onChange={ev => setMaxGuests(ev.target.value)} />
                            </div>
                        </div>

                        <div>
                            <button className='primary my-4'>Save</button>
                        </div>
                    </form>
                </div>
            )}
            My Places......
        </div>
    );
}