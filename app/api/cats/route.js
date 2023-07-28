import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  let response;
  let status;

  try {
    if (id) {
      console.log("[CAT ID RECEIVED]:", id);
      const cat = await prisma.cat.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      response = { cat: cat };
      status = { status: 200 };
    } else {
      const cats = await prisma.cat.findMany({
        include: {
          owner: true,
        },
      });
      response = { cats: cats };
    }
    await prisma.$disconnect();
    console.log("[cats - DB Disconnect]");
  } catch (error) {
    response = { message: "An error occurred", error };
    status = { status: 500 };
  }
  return NextResponse.json(response, status);
}

export async function POST(request) {
  const req = await request.json();
  try {
    const insertCat = await prisma.cat.create({
      data: {
        name: req.name,
        age: req.age,
        ownerId: req.ownerId,
      },
    });
    return NextResponse.json({ nuevoGato: insertCat }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
  
}
