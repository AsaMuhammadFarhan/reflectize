export function generateRandomPassword() {
  const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";

  let password = "";
  // Generate 5 random alphabets
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    password += alphabet[randomIndex];
  }
  // Generate 3 random numbers
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * numbers.length);
    password += numbers[randomIndex];
  }
  // Shuffle the characters in the password
  password = password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
  return password;
}
