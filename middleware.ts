import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

function isUserRole(role: string | undefined | unknown): role is "user" | "admin" {
    return role === "user" || role === "admin";
}

export default withAuth(
    function middleware(req) {
        console.log('Called middleware');
        console.log(req.nextauth.token?.role)
        if (req.nextUrl.pathname.startsWith("/admin") && req.nextauth.token?.role !== "admin")
            return NextResponse.rewrite(
                new URL("/login", req.url)
            );
        if (req.nextUrl.pathname.startsWith("/dashboard") && !isUserRole(req.nextauth.token?.role))
            return NextResponse.rewrite(
                new URL("/login", req.url)
            );
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
);

export const config = {
    matcher: ["/admin/:path*", "/dashboard/:path*"],
};