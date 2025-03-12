"use client";

import { useState } from "react";
import JobRow from "./JobRow";

interface Job {
    id: number;
    title: string;
    company: string;
    category: string;
    level: string;
    location: string;
}

const jobData: Job[] = [
    { id: 1, title: "Desarrollador Frontend", company: "Spotify", category: "Desarrollador", level: "Superior", location: "Remoto" },
    { id: 2, title: "Técnico en Redes", company: "Cisco", category: "Técnico", level: "Medio", location: "Presencial" },
    { id: 3, title: "Administrador de Sistemas", company: "Google", category: "Técnico", level: "Superior", location: "Híbrido" },
    { id: 4, title: "Diseñador UX/UI", company: "Adobe", category: "Diseño", level: "Superior", location: "Remoto" },
    { id: 5, title: "Técnico en Electrónica", company: "Tesla", category: "Técnico", level: "Medio", location: "Presencial" },
];

const categories = ["Todos", "Desarrollador", "Técnico", "Diseño"];
const levels = ["Todos", "Medio", "Superior"];

export default function Jobs() {
    const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
    const [selectedLevel, setSelectedLevel] = useState<string>("Todos");

    // Filtrar trabajos según los criterios seleccionados
    const filteredJobs = jobData.filter(job =>
        (selectedCategory === "Todos" || job.category === selectedCategory) &&
        (selectedLevel === "Todos" || job.level === selectedLevel)
    );

    return (
        <div className="bg-purple-100 py-6 mx-32 rounded-3xl">
            <div className="container">
                <h2 className="font-bold mb-4">Filtros:</h2>

                {/* Filtros */}
                <div className="flex gap-4 mb-4">
                    <select className="border p-2 rounded-md" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                    <select className="border p-2 rounded-md" value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)}>
                        {levels.map(level => <option key={level} value={level}>{level}</option>)}
                    </select>
                </div>

                {/* Lista de Trabajos */}
                <div className="flex flex-col gap-4">
                    {filteredJobs.length > 0 ? (
                        filteredJobs.map(job => <JobRow key={job.id} job={job} />)
                    ) : (
                        <p className="text-center text-gray-500">No hay ofertas disponibles.</p>
                    )}
                </div>
            </div>
        </div>
    );
}