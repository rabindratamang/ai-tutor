import React from 'react';

import AiResponse from './AiTutorResponse';


interface ResponseDisplayProps {
  response: string;
}

const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ response }) => {
  if (!response) return null;

  return (
    <div className="mt-6 w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Response:</h2>
      <span className="text-gray-700 whitespace-pre-wrap"><AiResponse content={response}/></span>
    </div>
  );
};

export default ResponseDisplay;