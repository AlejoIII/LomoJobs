import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        const { name, email, password, role } = await req.json();
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: { name, email, password: hashedPassword, role },
        });

        return NextResponse.json({ message: "Usuario registrado", user }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Error al registrar" }, { status: 500 });
    }
}
