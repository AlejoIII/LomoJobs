import Link from "next/link";
import JobRow from "./JobRow";

export default function Jobs() {
    return (
        <div className="bg-purple-100 py-6  mx-32 rounded-3xl">
            <div className="container">
                <h2 className="font-bold mb-4">Filtros: </h2>
                <div className="flex flex-col gap-4">
                    <JobRow />
                    <JobRow />
                    <JobRow />
                    <JobRow />
                    <JobRow />
                    <JobRow />
                    <JobRow />
                </div>
            </div>
        </div>
    );
}