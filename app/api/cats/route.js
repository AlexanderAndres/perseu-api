import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    console.log("[CAT ID RECIVED]:", id);
    try {
      const cat = await prisma.cat.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      return NextResponse.json({ cat: cat });
    } catch (error) {
      return NextResponse.json({
        message: "An error had ocurred [cats.js]",
        error: error,
      });
    } finally {
      await prisma.$disconnect();
      console.log("[cats - DB Disconnect]");
    }
  } else {
    try {
      const cats = await prisma.cat.findMany();
      return NextResponse.json({ cats: cats });
    } catch (error) {
      return NextResponse.json({
        message: "An error had ocurred [cats.js]",
        error: error,
      });
    } finally {
      await prisma.$disconnect();
      console.log("[cats - DB Disconnect]");
    }
  }
}
