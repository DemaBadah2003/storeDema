import { useSession } from "next-auth/react";

export function useUserRole() {
  const { data: session } = useSession();
  const role = session?.user?.roleSlug; // ← كان role?.slug والصح roleSlug

  return {
    isAdmin: role === "admin",
    isUser: role === "customer",
    roleSlug: role,
    roleName: session?.user?.roleName,
  };
}