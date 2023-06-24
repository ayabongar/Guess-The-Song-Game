import crypto from 'crypto'

export const hash = (value) => {
    const sha256Hash = crypto.createHash("sha256");
    const hashedValue = sha256Hash.update(value, 'utf-8');
    return hashedValue.digest('hex');
}

export const uniqueId = () => {
    return crypto.randomBytes(16).toString("hex");
}