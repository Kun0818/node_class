import bcrypt from 'bcryptjs';

const h = await bcrypt.hash('123456',10);
console.log(h)