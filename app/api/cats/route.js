import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  let response;
  try {
    if (id) {
      console.log("[CAT ID RECEIVED]:", id);
      const cat = await prisma.cat.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      response = { cat: cat };
    } else {
      const cats = await prisma.cat.findMany();
      response = { cats: cats };
    }
    await prisma.$disconnect();
    console.log("[cats - DB Disconnect]");
  } catch (error) {
    (response = { message: "An error occurred", error: error }),
      { status: 500 };
  }
  return NextResponse.json(response);
}
