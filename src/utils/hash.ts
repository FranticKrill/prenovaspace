import { compare, hash } from 'bcryptjs';

export async function isPasswordValid(
  password: string,
  hashedPassword: string
) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}