import { cookies } from 'next/headers';

const ADMIN_USERNAME = 'admincalitop';
const ADMIN_PASSWORD = 'admincalitop';
const AUTH_COOKIE_NAME = 'admin_auth';

export async function verifyCredentials(username: string, password: string): Promise<boolean> {
    return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

export async function setAuthCookie() {
    const cookieStore = await cookies();
    cookieStore.set(AUTH_COOKIE_NAME, 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
    });
}

export async function clearAuthCookie() {
    const cookieStore = await cookies();
    cookieStore.delete(AUTH_COOKIE_NAME);
}

export async function isAuthenticated(): Promise<boolean> {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get(AUTH_COOKIE_NAME);
    return authCookie?.value === 'authenticated';
}
