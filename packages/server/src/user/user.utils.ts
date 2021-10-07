const bcrypt = require('bcrypt');

export const comparePassword = async (userPassword: string, currentPassword: string) => {
  console.log(bcrypt.compare);
  return await bcrypt.compare(currentPassword, userPassword);
};
