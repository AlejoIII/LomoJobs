import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Job {
    id: number;
    title: string;
    company: string;
    category: string;
    level: string;
    location: string;
}

export default function JobRow({ job }: { job: Job }) {
    return (
        <div className="bg-white p-4 rounded-lg shadow-sm relative">
            <div className="absolute cursor-pointer top-4 right-4">
                <FontAwesomeIcon icon={faHeart} className="size-6 text-gray-200" />
            </div>
            <div className="flex gap-4">
                <div className="content-center">
                    <img className="size-10" src="./spotify.png" alt="logo" />
                </div>
                <div className="grow sm:flex">
                    <div className="grow">
                        <div className="font-bold text-gray-500 text-sm">{job.company}</div>
                        <div className="font-light text-gray-400 mb-1">{job.title}</div>
                        <div className="font-light text-gray-400 text-sm">
                            {job.location} · {job.level}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
