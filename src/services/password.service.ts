import bcrypt from 'bcrypt';

export const passwordEncrypter = async (password: string) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};

// export const passwordChecker = async (password:string, passwordDB: string) => {
//   const match = await bcrypt.compare(password, passwordDB) 

//   if (!match) {
//     const error = new Error('Username or password invalid');
//     error.name = 'UnauthorizedError';
//     throw error;
//   }
// };

export const passwordChecker = async (password:string, passwordDB: string) => {
  const match = password === passwordDB;

  if (!match) {
    const error = new Error('Username or password invalid');
    error.name = 'UnauthorizedError';
    throw error;
  }
};
