import { makeAutoObservable, runInAction } from "mobx";
import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "../../api/base";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password?: string; // Optional for post/patch
  profileImage: string;
  is_confirmed: boolean;
  is_notify: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface UserRegisterResponse extends User {
  otp: string;
  token: string;
}
class UserViewModel {
  users: User[] = [];
  loading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  private async fetchData(
    url: string,
    method: "get" | "post" | "patch" | "delete",
    data: any = null
  ) {
    this.loading = true;
    this.error = null;
    try {
      const response: AxiosResponse<User | User[] | UserRegisterResponse> =
        await axios({
          url: `${BASE_URL}${url}`,
          method,
          data,
        });
      return response;
    } catch (err: any) {
      this.error = err.message || "An error occurred.";
      return null;
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }
  async fetchUsers() {
    const response = await this.fetchData("users", "get");

    if (response && response.data) {
      runInAction(() => {
        this.users = response.data as User[];
      });
    }
  }

  async createUser(userData: Omit<User, "id" | "createdAt" | "updatedAt">) {
    const response = await this.fetchData("users", "post", userData);

    if (response && response.data) {
      runInAction(() => {
        this.users.push(response.data as User);
      });
      return true;
    }
    return false;
  }

  async updateUser(
    id: number,
    userData: Partial<Omit<User, "id" | "createdAt" | "updatedAt">>
  ) {
    const response = await this.fetchData(`users/${id}`, "patch", userData);

    if (response && response.data) {
      runInAction(() => {
        this.users = this.users.map((user) =>
          user.id === id ? { ...user, ...response.data } : user
        );
      });
      return true;
    }
    return false;
  }

  async deleteUser(id: number) {
    const response = await this.fetchData(`users/${id}`, "delete");
    if (response && response.status === 200) {
      runInAction(() => {
        this.users = this.users.filter((user) => user.id !== id);
      });
      return true;
    }
    return false;
  }
}

export default UserViewModel;
