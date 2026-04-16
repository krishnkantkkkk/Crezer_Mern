import bcrypt from 'bcrypt';
const HashGenerator = async (plainTextPassword)=>{
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(plainTextPassword, salt);
    return hash;
}

export default HashGenerator;