type User = {
    email: string,
    first_name: string,
    last_name: string,
    password: string,
    user_id?: number,
    token?: string|null
}

export default User