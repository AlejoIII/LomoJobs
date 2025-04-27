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

  if (data.companyId) {
    localStorage.setItem("companyId", data.companyId);
  } else if (data.role === "EMPRESA") {
    const companyData = {
      name: "Mi empresa",
      industry: "Sin especificar",
      location: "Sin especificar",
    };

    try {
      const newCompany = await registerCompany(companyData);
      localStorage.setItem("companyId", newCompany.id);
    } catch (error) {
      console.error("Error al registrar empresa automáticamente:", error);
    }
  }

  if (data.role === "ESTUDIANTE") {
    try {
      const profile = await getProfile();
      localStorage.setItem("studentName", profile.name);
      localStorage.setItem("studentEmail", profile.email);
    } catch (error) {
      console.error("Error al obtener perfil del estudiante:", error);
    }
  }

  return data;
}


export async function updateProfile(profile: FormData) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/users/me`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: profile,
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Respuesta del servidor:", errorText);
    throw new Error("No se pudo actualizar el perfil");
  }

  return await res.json();
}

export async function getProfile() {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("No se pudo obtener el perfil");
  return await res.json();
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

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Error al registrar empresa:", errorText);
    throw new Error("Error al registrar empresa");
  }

  const data = await res.json();

  console.log("Empresa registrada correctamente:", data); 

  localStorage.setItem("companyId", data.id);

  return data;
}


export async function getJobs() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/jobs`, {
    headers: {
      "Authorization": `Bearer ${token}`, 
    },
  });

  if (!res.ok) throw new Error("Error al obtener trabajos");
  return await res.json();
}

export async function postJob(job: any, companyId: string) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/companies/${companyId}/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(job),
  });

  if (!res.ok) {
    const error = await res.text();
    console.error("Error del servidor:", error);
    throw new Error("No se pudo publicar la oferta");
  }

  return await res.json();
}

export async function updateJob(jobId: string, updatedJob: any) {
  const token = localStorage.getItem("token");
  const companyId = localStorage.getItem("companyId"); 

  if (!token) throw new Error("No hay token de autenticación");
  if (!companyId) throw new Error("No se encontró el ID de la empresa");

  const res = await fetch(`${API_URL}/companies/${companyId}/jobs/${jobId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedJob),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Error al actualizar la oferta:", errorText);
    throw new Error(`No se pudo actualizar la oferta: ${errorText}`);
  }

  return await res.json();
}


export async function deleteJob(jobId: string) {
  const token = localStorage.getItem("token"); 
  const companyId = localStorage.getItem("companyId");

  if (!token) throw new Error("No hay token de autenticación");
  if (!companyId) throw new Error("No se encontró el ID de la empresa");

  const res = await fetch(`${API_URL}/companies/${companyId}/jobs/${jobId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Error al eliminar la oferta:", errorText);
    throw new Error("No se pudo eliminar la oferta");
  }

  return true;
}


export async function getUsers() {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("No se pudo obtener los usuarios");
  return await res.json();
}


export async function sendContactMessage(contact: {
  empresaEmail: string;
  nombre: string;
  email: string;
  mensaje: string;
}) {
  const res = await fetch(`${API_URL}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contact),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Error al enviar el contacto:", errorText);
    throw new Error("Error al enviar el contacto");
  }

  return await res.text(); 
}
