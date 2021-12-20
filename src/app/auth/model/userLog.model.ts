export interface userLog {
  id?: number;
  fullName?: string;
  address?: string;
  email: string;
  password: string;
  rol: {
    id: number;
  };
}
