import React from 'react';

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-4">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-300"></div>
    </div>
  );
}

export default LoadingSpinner;