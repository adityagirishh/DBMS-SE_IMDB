import React from 'react';

const MicrosoftLoginButton = () => {
  const handleMicrosoftLogin = () => {
    window.location.href = '/auth/microsoft'; // Redirect to Microsoft OAuth flow
  };

  return (
    <button onClick={handleMicrosoftLogin}>
      Login with Microsoft
    </button>
  );
};

export default MicrosoftLoginButton;