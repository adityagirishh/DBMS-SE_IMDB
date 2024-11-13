import React from 'react';

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    window.location.href = '/auth/google'; // Redirect to Google OAuth flow
  };

  return (
    <button onClick={handleGoogleLogin}>
      Login with Google
    </button>
  );
};

export default GoogleLoginButton;