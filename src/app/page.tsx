"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [files, setFiles] = useState<{ filename: string; path: string }[]>([]);

  useEffect(() => {
    fetch("/api/get-files")
      .then((res) => res.json())
      .then((data) => setFiles(data.files))
      .catch((error) => console.error(error));
  }, []);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        setFiles((prev) => [...prev, { filename: file.name, path: `/uploads/${file.name}` }]);
      } else {
        alert("File upload failed.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("An error occurred.");
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-semibold">File Upload </h1>

      {/* Upload Section */}
      <div className="my-4">
        <input type="file" onChange={handleFileUpload} className="border p-2" />
      </div>

      {/* Display Uploaded Files */}
      <h2 className="text-xl font-semibold mt-4">Uploaded Files</h2>
      <ul className="list-disc ml-5 mt-2">
        {files.map((file, index) => (
          <li key={index}>
            <a href={file.path} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
              {file.filename}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
