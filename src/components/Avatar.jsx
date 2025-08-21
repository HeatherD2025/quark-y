import React from "react"; 
import { useState } from "react";

const loadAvatar = async (req, res) => {
  const [ error, setError ] = useState('');
  const [ success, setSuccess ] = useState('');

await fetch('/api/avatar/me', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({ avatarId: 'avatar2.png' }),
});

await fetch('/api/avatar/me', {
  method: 'DELETE',
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

}

export default loadAvatar