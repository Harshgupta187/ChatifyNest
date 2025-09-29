import React, { useState } from 'react'
import { IoSend } from "react-icons/io5";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from '../redux/MessageSlice.js';
import { BASE_URL } from '..';

const SendInput = () => {
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const { selectedUser } = useSelector(store => store.user);
    const { messages } = useSelector(store => store.message);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${BASE_URL}/api/v1/message/send/${selectedUser?._id}`, { message }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            dispatch(setMessages([...messages, res?.data?.newMessage]))
        } catch (error) {
            console.log(error);
        }
        setMessage("");
    }

    return (
        <form onSubmit={onSubmitHandler} className="px-4 py-3 bg-gray-800 border-t border-gray-700">
            <div className="relative w-full">
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    type="text"
                    placeholder="Send a message..."
                    className="block w-full p-3 text-sm text-white bg-gray-700 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button type="submit" className="absolute text-blue-500 transform -translate-y-1/2 right-3 top-1/2 hover:text-blue-400">
                    <IoSend size={22} />
                </button>
            </div>
        </form>
    )
}

export default SendInput
