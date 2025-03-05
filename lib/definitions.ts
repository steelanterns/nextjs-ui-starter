export type CreateUserState = {
  errors?: {
    firstName?: string[]
    lastName?: string[]
    username?: string[]
    email?: string[]
    password?: string[]
  }
  message?: string
  inputs?: {
    firstName?: string
    lastName?: string
    username?: string
    email?: string
    password?: string
  }
}