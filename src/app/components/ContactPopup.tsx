"use client";

import { useState } from "react";

interface ContactPopupProps {
  jobTitle: string;
  onClose: () => void;
  onSend: (message: string) => void;
}

export default function ContactPopup({ jobTitle, onClose, onSend }: ContactPopupProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() === "") {
      alert("El mensaje no puede estar vacío.");
      return;
    }
    onSend(message);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
          Enviar mensaje para: {jobTitle}
        </h2>
        <textarea
          className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
          rows={5}
          placeholder="Escribe tu mensaje aquí..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="flex justify-end gap-4 mt-4">
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition"
            onClick={handleSend}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}