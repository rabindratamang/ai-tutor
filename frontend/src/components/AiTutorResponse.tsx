import React from 'react';
import ReactMarkdown from "react-markdown";

interface AiResponseProps {
  content: string;
}

const AiTutorResponse: React.FC<AiResponseProps> = ({ content }) => {
  if (!content) return null;

  return (
      <ReactMarkdown>{content}</ReactMarkdown>
  );
};

export default AiTutorResponse;