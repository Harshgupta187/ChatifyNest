import SendInput from './SendInput'
import Messages from './Messages';
import { useSelector } from "react-redux";

const MessageContainer = () => {
    const { selectedUser, authUser, onlineUsers } = useSelector(store => store.user);
    const isOnline = onlineUsers?.includes(selectedUser?._id);

    return (
        <>
            {
                selectedUser !== null ? (
                    <div className="md:min-w-[550px] flex flex-col bg-gray-700/40 rounded-r-2xl">
                        <div className="flex items-center gap-3 px-4 py-3 text-white border-b bg-zinc-800 border-zinc-700">
                            <div className={`avatar ${isOnline ? 'online' : ''}`}>
                                <div className="w-12 h-12 rounded-full ring-2 ring-gray-600">
                                    <img src={selectedUser?.profilePhoto} alt="user-profile" />
                                </div>
                            </div>
                            <div className="flex flex-col flex-1">
                                <p className="font-semibold">{selectedUser?.fullName}</p>
                                <span className="text-xs text-gray-400">{isOnline ? "Online" : "Offline"}</span>
                            </div>
                        </div>
                        <Messages />
                        <SendInput />
                    </div>
                ) : (
                    <div className="md:min-w-[550px] flex flex-col justify-center items-center text-center bg-gray-700/40 rounded-r-2xl">
                        <h1 className="text-3xl font-bold text-white">Hi, {authUser?.fullName}</h1>
                        <p className="mt-2 text-lg text-gray-300">Start a conversation by selecting a user</p>
                    </div>
                )
            }
        </>
    )
}

export default MessageContainer;
