import { createContext, useContext, useState } from "react";

interface AdminContextType {
  isPasswordVerified: boolean;
  setIsPasswordVerified: (v: boolean) => void;
}

const AdminContext = createContext<AdminContextType>({
  isPasswordVerified: false,
  setIsPasswordVerified: () => {},
});

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);
  return (
    <AdminContext.Provider
      value={{ isPasswordVerified, setIsPasswordVerified }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdminContext() {
  return useContext(AdminContext);
}
