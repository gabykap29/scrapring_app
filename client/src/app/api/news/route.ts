import { NextResponse } from "next/server";

export async function GET() {
    try {
        const res = await fetch("http://10.0.37.208:3002/api/scraping", {
            method: "GET",
        });

    if (!res.ok) {
      return NextResponse.json(
        { message: "Error al obtener los datos." },
        { status: res.status },
      );
    }

    const data = await res.json();
    console.log(data);
    return NextResponse.json(data[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error al obtener los datos." },
      { status: 500 },
    );
  }
}
