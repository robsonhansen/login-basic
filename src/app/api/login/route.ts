import { NextResponse } from "next/server";
import { loginSchema } from "@/lib/loginSchema";
import { error } from "console";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  const validation = loginSchema.safeParse({ username, password });
  if (!validation.success) {
    return NextResponse.json({ message: "Dados de login inválidos", error: validation.error.flatten().fieldErrors }, { status: 400 });
  }

  const { users } = await import("../../../db/seed.json");
  const user = users.find((user) => user.username === username && user.password === password);

  if (!user) {
    return NextResponse.json({ message: "Credenciais inválidas" }, { status: 401 });
  }
  

  return NextResponse.json({ message: "Login bem-sucedido" }, { status: 200 });
}
