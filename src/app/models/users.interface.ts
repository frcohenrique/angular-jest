export interface Users extends createUsers {
    id: string;
}

export interface createUsers {

    name: string,
    surname: string,
    country: string,
    state: string,
    email: string
}
