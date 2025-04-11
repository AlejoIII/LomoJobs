"use client";

import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Job {
  id: string;
  title: string;
  location: string;
  level: string;
  description?: string;
  company: {
    name: string;
  };
}

interface JobRowProps {
  job: Job;
  onClick: (job: Job) => void;
}

export default function JobRow({ job, onClick }: JobRowProps) {
  return (
    <div
      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm relative cursor-pointer hover:shadow-md transition-colors"
      onClick={() => onClick(job)}
    >
      {/* Icono de favorito */}
      <div className="absolute cursor-pointer top-4 right-4">
        <FontAwesomeIcon
          icon={faHeart}
          className="size-6 text-gray-300 dark:text-gray-500 hover:text-red-500 transition"
        />
      </div>

      <div className="flex gap-4">
        {/* Logo de empresa - puedes hacerlo dinámico si lo tienes en la API */}
        <div className="content-center">
          <img
            className="size-10"
            src="./spotify.png"
            alt={`${job.company?.name} logo`}
          />
        </div>

        <div className="grow sm:flex">
          <div className="grow">
            <div className="font-bold text-gray-500 dark:text-gray-300 text-sm">
              {job.company?.name}
            </div>
            <div className="font-light text-gray-400 dark:text-gray-200 mb-1">
              {job.title}
            </div>
            <div className="font-light text-gray-400 dark:text-gray-300 text-sm">
              {job.location} · {job.level}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
