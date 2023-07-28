import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const req = await request.json();
    
    const owner = await prisma.owner.create({
      data: {
        name: req.ownerName,
      },
    });
    
    return NextResponse.json({ message: "New owner added", owner });
  } catch (error) {
    return NextResponse.json({ error: error });
  } finally {
    prisma.$disconnect();
    console.log("BD - disconnect");
  }
}

export async function GET() {
  try {
    const ownerWhitCats = await prisma.owner.findMany({
      include: {
        cat: true,
      },
    });
    console.log("Owner and cats:", ownerWhitCats);
    return NextResponse.json({ message: "owners", ownerWhitCats });
  } catch (error) {
    return NextResponse.json({ error: error });
  } finally {
    prisma.$disconnect();
    console.log("BD - disconnect");
  }
}
