import PhotosUploader from "../PhotosUploader";
import Perks from "../Perks";
import { useState } from "react";
import axios from "axios";
export default function PlacesFormPage() {
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
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

    async function addNewPlace(ev) {
        ev.preventDefault();
        await axios.post('/places', {
            title, address, addedPhotos,
            description, perks, extraInfo,
            checkIn, checkout, maxGuest
        });
    }

    return (
        <div>
            <form onSubmit={addNewPlace}>
                {preInput('Title', 'Title for your place. Should be short and catchy ad in advertisement')}
                <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title" />
                {preInput('Address', 'Address to this place')}
                <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="address" />
                {preInput('Photos', 'More to better')}
                <div>
                    <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
                </div>

                {preInput('Description', 'Description of the place')}
                <textarea value={description} onChange={ev => setDescription(ev.target.value)} />
                {preInput('Perks', 'Select all the perks')}
                <div className="grid mt-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
                    <Perks selected={perks} onChange={setPerks} />
                </div>
                <h2 className="text-2xl mt-4">Extra info</h2>F
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
    );
}