import bcrypt from 'bcrypt';
const VerifyPassword = async (plainTextPassword, hash) => {
    const result = await bcrypt.compare(plainTextPassword, hash);
    return result;
}
export default VerifyPassword;