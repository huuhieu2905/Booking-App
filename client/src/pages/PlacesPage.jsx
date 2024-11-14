import { useState } from "react";
import { Link, useParams } from "react-router-dom"
import Perks from "../Perks";
import axios from 'axios';

export default function PlacesPage() {
    const { action } = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhoto, setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('');
    const [perks, setPerks] = useState([]);
    const [description, setDescription] = useState('');
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkout, setCheckOut] = useState('');
    const [maxGuest, setMaxGuest] = useState(1);
    function inputHeader(text) {
        return (
            <h2 className="text-2xl mt-4">{text}</h2>
        );
    }
    function inputDescription(text) {
        return (
            <p className="text-gray-500 text-sm">{text}</p>
        );
    }
    function preInput(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        );
    }

    async function addPhotoByLink(ev) {
        ev.preventDefault();
        const { data: filename } = await axios.post('/upload-by-link', { link: photoLink });
        console.log(photoLink);
        setAddedPhotos(prev => {
            return [...prev, filename];
        });
    }

    function uploadPhoto(ev) {
        const files = ev.target.files;
        console.log({files});
        const data = new FormData();
        for(let i = 0; i < files.length; i++){
            data.append('photos', files[i]);
        }
        axios.post('/upload', data, {
            headers: {'Content-Type': 'multipart/form-data'}
        }).then(response => {
            const {data: filenames} = response;
            setAddedPhotos(prev => {
                return [...prev, ...filenames];
            });
        });
    }

    return (
        <div>
            {action !== 'new' && (
                <div className="text-center">
                    <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/account/places/new'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add new places
                    </Link>
                </div>
            )}
            {action === 'new' && (
                <div>
                    <form>
                        {preInput('Title', 'Title for your place. Should be short and catchy ad in advertisement')}
                        <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title" />
                        {preInput('Address', 'Address to this place')}
                        <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="address" />
                        {preInput('Photos', 'More to better')}
                        <div className="flex gap-2">
                            <input value={photoLink}
                                onChange={ev => setPhotoLink(ev.target.value)}
                                type="text" placeholder="Add using a link .... jpg" />
                            <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl">Add&nbsp;photo</button>
                        </div>

                        <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                            {addedPhoto.length > 0 && addedPhoto.map(link => (
                                <div className="h-32 flex">
                                    <img className="rounded-2xl w-full object-cover " src={'http://localhost:4000/uploads/' + link} alt="" />
                                </div>
                            ))}
                            <label className="h-32 cursor-pointer flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-8 text-2xl text-gray-600">
                                <input type="file" multiple className="hidden" onChange={uploadPhoto} />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                                </svg>
                                Upload
                            </label>
                        </div>
                        {preInput('Description', 'Description of the place')}
                        <textarea value={description} onChange={ev => setDescription(ev.target.value)} />
                        {preInput('Perks', 'Select all the perks')}
                        <div className="grid mt-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
                            <Perks selected={perks} onChange={setPerks} />
                        </div>
                        <h2 className="text-2xl mt-4">Extra info</h2>
                        <p className="text-gray-500 text-sm">house rules, etc</p>
                        <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />
                        <h2 className="text-2xl mt-4">Check in&out times, max guests</h2>
                        <p className="text-gray-500 text-sm">add check in and out time window for cleaning the room bewtween guests</p>
                        <div className="grid gap-2 sm:grid-cols-3">
                            <div>
                                <h3 className="mt-2 -mb-1">Check in time</h3>
                                <input type="text" value={checkIn} onChange={ev => setCheckIn(ev.target.value)}
                                    placeholder="14" />
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">Check out time</h3>
                                <input type="text" value={checkout} onChange={ev => setCheckOut(ev.target.value)}
                                    placeholder="11" />
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">Max number of guests</h3>
                                <input type="number" value={maxGuest} onChange={ev => setMaxGuest(ev.target.value)} />
                            </div>
                        </div>
                        <button className="primary my-4">Save</button>
                    </form>
                </div>
            )}
        </div>
    )
}