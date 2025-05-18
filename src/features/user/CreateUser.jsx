import { useState } from 'react';
import Button from '../../ui/Button';
function CreateUser() {
  const [username, setUsername] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>👋 Welcome! Please start by telling us your name:</p>

      <input
        type="text"
        className="input mt-8 w-72"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {username !== '' && (
        <div>
          <Button to="/menu">Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
