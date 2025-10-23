// src/app/api/logout/route.ts
import { serialize } from 'cookie';
import { NextResponse } from 'next/server';

export async function POST() {
  // Nome do cookie que queremos limpar
  const COOKIE_NAME = 'auth_token';

  // O "truque" para apagar um cookie é serializá-lo com
  // um valor vazio e maxAge: -1 (ou 0).
  const serialized = serialize(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: -1, // Diz ao navegador para expirar o cookie imediatamente
    path: '/',  // IMPORTANTE: O path deve ser o mesmo do cookie de login
  });

  // Retorna a resposta de sucesso com o cabeçalho 'Set-Cookie'
  return NextResponse.json(
    { message: 'Logout bem-sucedido' },
    {
      status: 200,
      headers: {
        'Set-Cookie': serialized,
      },
    }
  );
}