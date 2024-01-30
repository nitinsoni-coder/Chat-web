export interface UserSchema extends Document {
  avatar: {
    publicUrl: string;
  };
  username: string;
  email: string;
  role: string;
  password?: string;
  refreshToken?: string;
  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}
