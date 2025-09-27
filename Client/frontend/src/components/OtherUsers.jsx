
import OtherUser from './OtherUser';
import useGetOtherUsers from '../hooks/useGetOtherUsers.jsx';
import {useSelector} from "react-redux";


const OtherUsers = () => {
    // my custom hook
    useGetOtherUsers();
    const {otherUsers} = useSelector(store=>store.user);
    if (!otherUsers) return; // early return in react
     
    return (
        <div className='flex-1 overflow-auto'>
            {
                otherUsers?.map((user)=>{
                    return (
                        <OtherUser key={user._id} user={user}/>
                    )
                })
            }
            
        </div>
    )
}

export default OtherUsers