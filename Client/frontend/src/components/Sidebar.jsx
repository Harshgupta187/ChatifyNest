import { useSelector, useDispatch } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

const OtherUsers = () => {
  const { otherUsers } = useSelector(store => store.user);
  const dispatch = useDispatch();

  if (!otherUsers || otherUsers.length === 0) {
    return <p className="p-4 text-gray-400">No users found.</p>;
  }

  return (
    <div>
      {otherUsers.map(user => (
        <div
          key={user._id}
          onClick={() => dispatch(setSelectedUser(user))}
          className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-700"
        >
          <div className="flex items-center justify-center w-10 h-10 font-bold text-white bg-blue-500 rounded-full">
            {user.fullName.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-white">{user.fullName}</p>
            <p className="text-sm text-gray-400">{user.email}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OtherUsers;
