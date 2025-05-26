import { useSelector } from 'react-redux';

function Username() {
  const username = useSelector((state) => state.user.userName);

  if (!username) return;
  return <p className="text-sm font-semibold">{username}</p>;
}

export default Username;
