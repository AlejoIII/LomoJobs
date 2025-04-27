"use client";

import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import Jobs from "./components/Jobs";
import { getJobs } from "./services/api";

export default function Home() {
  const [jobData, setJobData] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  function handleSearch(query: string): void {
    setSearchQuery(query);
  }

  useEffect(() => {
    async function fetchJobs() {
      try {
        const jobs = await getJobs();
        setJobData(jobs);
      } catch (err) {
        console.error("Error al cargar las ofertas:", err);
      }
    }
    fetchJobs();
  }, []);

  return (
    <>
      <Hero
        title="Ofertas de Empleo"
        subtitle="Encuentra empleos para demostrar tu potencial."
        placeholder="Buscar Ofertas..."
        buttonText="Buscar"
        onSearch={handleSearch}
      />
      <Jobs jobs={jobData} searchQuery={searchQuery} />
    </>
  );
}
