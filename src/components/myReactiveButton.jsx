import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

function MyReactiveButton({ onClick, children, variant = "outline-secondary", ...props }) {
  const [loading, setLoading] = useState(false);

  const handleClick = async (e) => {
    if (loading) return;
    setLoading(true);
    try {
      await onClick(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant={variant}
      onClick={handleClick}
      disabled={loading}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </Button>
  );
}

export default MyReactiveButton;
