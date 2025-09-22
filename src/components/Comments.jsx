import React from 'react';
import { useState } from 'react';

const CommentForm = ({ articleUrl, userId }) => {
  const [ content, setContent] = useState('');
  const [ error, setError ] = useState('');
  const [ success, setSuccess ] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`/articles/${articleUrl/comments}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },

            body: JSON.stringify({
                userId,
                content,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'failed to post comment')
        }

        setSuccess('comment posted');
        setContent('');
    } catch (err) {
        setError(err.message);
    }
  };

  // add delete comment call below

  return (
    <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder = 'leave a comment here'
        />
        <button type='submit'>post</button>
        {error && <p style={{ color: 'red'}}>{error}</p>}
        {success && <p style={{ color: 'green'}}>{success}</p>}
    </form>
  );
};

export default CommentForm;
