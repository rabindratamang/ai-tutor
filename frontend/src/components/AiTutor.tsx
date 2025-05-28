"use client";

import React, { useState } from "react";
import axios from "axios";
import InputField from "./InputField";
import SelectField from "./SelectField";
import Button from "./Button";

const AiTutor: React.FC = () => {
  const [topic, setTopic] = useState<string>("");
  const [queryType, setQueryType] = useState<string>("explanation");
  const [customQuestion, setCustomQuestion] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!topic) {
      alert("Please enter a topic");
      return;
    }

    setLoading(true);
    setResponse("");

    try {
      const result = await axios.post("http://127.0.0.1:8000/ai_tutor/", {
        topic,
        query_type: queryType,
        custom_question: customQuestion,
      });

      setResponse(result.data.result);
    } catch (error) {
      console.error(error);
      alert("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">AI Tutor</h1>
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 space-y-4">
        <InputField label="Enter Topic" value={topic} onChange={setTopic} />
        <SelectField
          value={queryType}
          onChange={setQueryType}
          options={[
            { value: "explanation", label: "Explanation" },
            { value: "study_notes", label: "Study Notes" },
            { value: "quiz", label: "Quiz" },
            { value: "hands_on", label: "Hands-on Exercises" },
            { value: "learning_path", label: "Learning Path" },
            { value: "custom_question", label: "Custom Question" },
          ]}
        />
        {queryType === "custom_question" && (
          <InputField
            label="Custom Question"
            value={customQuestion}
            onChange={setCustomQuestion}
          />
        )}
        <Button onClick={handleSubmit}  disabled={loading} loading={loading} />
      </div>
      <div className="mt-6 w-full max-w-md bg-gray-50 p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Response</h2>
        <p className="text-gray-600 mb-4">
          {loading ? "Loading..." : ""}
        </p>

        <p className="text-gray-700">{response || "No response yet"}</p>
      </div>
    </div>
  );
};

export default AiTutor;
