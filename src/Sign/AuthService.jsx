// AuthService.js

const users = [
  { name: "Raj", email: "raj@gmail.com", pass: "123" },
  { name: "Sam", email: "sam@gmail.com", pass: "456" },
  { name: "Ram", email: "ram@gmail.com", pass: "789" },
];

export const authenticateUser = (email, password) => {
  const user = users.find(
    (user) => user.email === email && user.pass === password
  );
  return user;
};
