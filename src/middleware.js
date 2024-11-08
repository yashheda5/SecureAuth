import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export function middleware(req) {
    const path = req.nextUrl.pathname;
    const checkPublicPath = path === '/sign-in' || path === '/sign-up';
    const getCookies = cookies();
    const token = getCookies.get('token')?.value || "";
    if (checkPublicPath && token != "") {
        return NextResponse.redirect(new URL('/', req.nextUrl))
    }
    if (!checkPublicPath && token != "") {
        return NextResponse.redirect(new URL('/sign-in', req.nextUrl))
    }
}

export const config={
    matcher : ['/sign-in','/sign-up']
}