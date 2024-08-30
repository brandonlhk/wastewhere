const LoadingModal = ({ isVisible }) => {
    if (!isVisible) return null
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
        <div className="bg-white p-8 rounded shadow-lg flex flex-col items-center">
          <svg className="animate-ping h-12 w-12 text-blue-500 mb-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 1 1 16 0 8 8 0 0 1-16 0z"></path>
          </svg>
          <p className="text-gray-700">Checking if this is recyclable...</p>
        </div>
      </div>
    );
  };
  
  export default LoadingModal;