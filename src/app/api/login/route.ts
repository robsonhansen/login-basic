import { NextResponse } from "next/server";
import { loginSchema } from "@/lib/loginSchema";
import {sign} from "jsonwebtoken";
import { serialize } from "cookie";


export async function POST(request: Request) {
  const body  = await request.json();
  const JWT_SECRET = process.env.JWT_SECRET || "default";

  

  const validation = loginSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json({ message: "Dados de login inválidos", error: validation.error.flatten().fieldErrors }, { status: 400 });
  }

  const {username, password} = validation.data;

  const { users } = await import("../../../db/seed.json");
  const user = users.find((user) => user.username === username && user.password === password);

  if (!user) {
    return NextResponse.json({ message: "Usuário não encontrado" }, { status: 401 });
  }

  const payload = { id: user.id, username: user.username };

  const token = sign(payload, JWT_SECRET, { expiresIn: "1h" });
  const cookie = serialize("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 3600,
  });

  return NextResponse.json({ message: "Login bem-sucedido", user }, { status: 200, headers: { "Set-Cookie": cookie } });
}
