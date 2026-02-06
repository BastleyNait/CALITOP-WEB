'use server';

import { verifyCredentials, setAuthCookie, clearAuthCookie } from '@/lib/auth';
import { redirect } from 'next/navigation';

export async function loginAction(formData: FormData) {
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    if (!username || !password) {
        return { success: false, error: 'Usuario y contraseña son requeridos' };
    }

    const isValid = await verifyCredentials(username, password);

    if (!isValid) {
        return { success: false, error: 'Credenciales incorrectas' };
    }

    await setAuthCookie();
    redirect('/admin/products');
}

export async function logoutAction() {
    await clearAuthCookie();
    redirect('/login');
}
