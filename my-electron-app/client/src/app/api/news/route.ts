import { NextResponse } from "next/server";

export async function GET() {
    try {
        const res = await fetch("http://localhost:4000/api/scraping", {
            method: "GET",
        });

        if (!res.ok) {
            return NextResponse.json({ message: "Error al obtener los datos." }, { status: res.status });
        }

        const data = await res.json();

        // Configurar encabezados para evitar caché
        const response = NextResponse.json(data[0]);
        response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
        response.headers.set("Pragma", "no-cache");
        response.headers.set("Expires", "0");
        return response;

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error al obtener los datos." }, { status: 500 });
    }
}
