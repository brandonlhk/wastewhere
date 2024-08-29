import React from 'react';

const Toast = ({ message, show, onClose, color }) => {
  if (!show) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="toast toast-end" onClick={onClose}>
        <div className={`alert shadow-lg ${color === 'error' ? 'alert-error' : 'alert-success'}`}>
          <div>
            <span>{message}</span> Click to close.
          </div>

        </div>
      </div>
    </div>
  );
};

export default Toast;
