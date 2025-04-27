"use client";

import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

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
  onContact: (job: Job) => void;
}

export default function JobRow({ job, onClick, onContact }: JobRowProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isStudent, setIsStudent] = useState(false);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
    setIsFavorited(favorites.includes(job.id));

    const userType = localStorage.getItem("userType");
    setIsStudent(userType === "usuario");
  }, [job.id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    const storedFavorites = localStorage.getItem("favorites");
    let favorites: string[] = storedFavorites ? JSON.parse(storedFavorites) : [];

    if (isFavorited) {
      favorites = favorites.filter((id) => id !== job.id);
    } else {
      favorites.push(job.id);
      saveToApplications(job);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorited(!isFavorited);
  };

  const saveToApplications = (job: Job) => {
    const storedApplications = localStorage.getItem("applications");
    let applications: Job[] = storedApplications ? JSON.parse(storedApplications) : [];

    if (!applications.some((application) => application.id === job.id)) {
      applications.push(job);
      localStorage.setItem("applications", JSON.stringify(applications));
    }
  };

  return (
    <div
      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm relative cursor-pointer hover:shadow-md hover:scale-[1.01] transition-all duration-200"
      onClick={() => onClick(job)} 
    >
      {isStudent && (
        <div className="absolute cursor-pointer top-4 right-4 flex gap-2">
          <FontAwesomeIcon
            icon={isFavorited ? solidHeart : regularHeart}
            className={`size-6 ${
              isFavorited
                ? "text-red-500"
                : "text-gray-300 dark:text-gray-500 hover:text-red-500"
            } transition`}
            onClick={(e) => toggleFavorite(e)}
          />
        </div>
      )}

      <div className="flex gap-4">
        <div className="content-center">
          <img
            className="size-10 rounded-full object-cover"
            src="./spotify.png"
            alt={`${job.company?.name} logo`}
            onError={(e) => (e.currentTarget.src = "/default-company-logo.png")}
          />
        </div>

        <div className="grow sm:flex">
          <div className="grow">
            <div className="font-bold text-gray-500 dark:text-gray-300 text-sm">
              {job.company?.name}
            </div>
            <div className="font-light text-gray-400 dark:text-gray-200 mb-1 text-lg">
              {job.title}
            </div>
            <div className="font-light text-gray-400 dark:text-gray-300 text-sm">
              {job.location} · {job.level}
            </div>
            {job.description && (
              <div className="text-gray-400 dark:text-gray-400 text-xs mt-1 line-clamp-2">
                {job.description}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}