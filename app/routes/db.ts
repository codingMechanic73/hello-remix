type UserType = {
  email: string,
  userId: number,
  password: {
    hash: string,
    salt: string
  }
}


export const db: UserType[] = [];