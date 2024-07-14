export default interface UserData {
  user: User;
  token: string;
}

interface User {
  email: string;
  fullname: string;
  avatar: string;
  id: string;
}
