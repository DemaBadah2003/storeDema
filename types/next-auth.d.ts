import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      avatar?: string | null;
      roleId?: string;
      roleName?: string | null;
      roleSlug?: string | null;
      status?: string;
      emailVerifiedAt?: string | null;
    };
  }

  interface User {
    id: string;
    roleId?: string;
    roleName?: string | null;
    roleSlug?: string | null;
    status?: string;
    avatar?: string | null;
    emailVerifiedAt?: string | null;
    rememberMe?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    roleId?: string;
    roleName?: string | null;
    roleSlug?: string | null;
    status?: string;
    avatar?: string | null;
    emailVerifiedAt?: string | null;
    rememberMe?: boolean;
  }
}