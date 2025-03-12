import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/register/[...nextauth]/route";

declare module "next-auth" {
    interface User {
        role?: string;
    }

    interface Session {
        user: {
            name?: string | null;
            email?: string | null;
            image?: string | null;
            role?: string;
        };
    }
}
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.role) {
        return NextResponse.json({ error: "No autorizado" }, { status: 403 });
    }

    if (session.user.role !== "empresa") {
        return NextResponse.json({ error: "Solo empresas pueden crear ofertas" }, { status: 403 });
    }

    const { title, company, category, level, location } = await req.json();

    const job = await prisma.job.create({
        data: {
            title,
            company,
            category,
            level,
            location,
            createdBy: session.user.email,
        },
    });

    return NextResponse.json({ message: "Oferta creada", job }, { status: 201 });
}
