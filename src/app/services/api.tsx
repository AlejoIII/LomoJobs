const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function login(email: string, password: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Credenciales inválidas");
  const data = await res.json();

  localStorage.setItem("token", data.token);
  localStorage.setItem("userId", data.userId); 
  localStorage.setItem("userType", data.role); 

  return data;
}

export async function registerUser(user: any) {
  const res = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error("Error al registrar usuario");
  return await res.json();
}

export async function registerCompany(company: any) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/companies/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(company),
  });
  if (!res.ok) throw new Error("Error al registrar empresa");
  return await res.json();
}

export async function getJobs() {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/jobs`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Error al obtener trabajos");
  return await res.json();
}

export async function postJob(job: any) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/jobs/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(job),
  });

  if (!res.ok) throw new Error("No se pudo publicar la oferta");
  return await res.json();
}


export async function getUsers() {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Error al obtener usuarios");
  return await res.json();
}