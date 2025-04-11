"use client";

interface Job {
  id: string;
  title: string;
  category: string;
  level: string;
  location: string;
}

interface ListJobsPopupProps {
  jobs: Job[];
  onClose: () => void;
}

export default function ListJobsPopup({ jobs, onClose }: ListJobsPopupProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Mis ofertas publicadas</h2>
          <button onClick={onClose} className="text-red-500 font-bold text-lg">✖</button>
        </div>
        {jobs.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-300">No tienes ofertas publicadas.</p>
        ) : (
          <ul className="divide-y divide-gray-300 dark:divide-gray-600">
            {jobs.map((job) => (
              <li key={job.id} className="py-2">
                <h3 className="font-semibold">{job.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-300">{job.category} - {job.level}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{job.location}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
