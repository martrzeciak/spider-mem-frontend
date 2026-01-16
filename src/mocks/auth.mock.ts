import type { User } from '@/models/user'

const users: User[] = []

export async function registerMock(
    username: string,
    email: string,
    password: string
): Promise<User> {
    const exists = users.find(u => u.email === email)
    if (exists) {
        throw new Error('Email already exists')
    }

    const user: User = {
        id: crypto.randomUUID(),
        username,
        email,
        password
    }

    users.push(user)
    return user
}

export async function loginMock(
    email: string,
    password: string
): Promise<User> {
    const user = users.find(
        u => u.email === email && u.password === password
    )

    if (!user) {
        throw new Error('Invalid email or password')
    }

    return user
}
