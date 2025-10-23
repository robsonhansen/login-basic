import { NextResponse} from 'next/server';
import type { NextRequest } from 'next/server';


export function middleware(request: NextRequest) {
    // Pega o token de autenticação dos cookies
    const token = request.cookies.get('auth_token')?.value;
    // Pega a url requisitada
    const { pathname } = request.nextUrl;

    // Proteger rotas que começam com /dashboard
    //Se o usuario tentar acessar uma rota protegida 
    if(!token && pathname.startsWith('/dashboard')){
        //Ele é redirecionado para a pagina de login
        const loginUrl = new URL('/login', request.url);
        return NextResponse.redirect(loginUrl);
    }

    //Se o usuario estiver logado e tentar acessar a pagina de login
    if(token && pathname === '/login'){
        //Ele é redirecionado para a pagina do dashboard
        const dashboardUrl = new URL('/dashboard', request.url);
        return NextResponse.redirect(dashboardUrl);
    }

    //Se nenhuma das condições acima for atendida, a requisição prossegue normalmente
    return NextResponse.next();
}

export const config = {
    /*
     * Roda o middleware em todas as rotas, exceto as que começam com:
     * - api (rotas de API)
     * - _next/static (arquivos estáticos)
     * - _next/image (arquivos de otimização de imagem)
     * - favicon.ico (ícone)
     */
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}