// app/components/Navbar.tsx
import { cookies } from "next/headers";
import { NavbarClient } from "./NavbarClient";

export async function Navbar() {
  const cookieStore = await cookies(); 
  const isLoggedIn = !!cookieStore.get("user_session")?.value;

  return <NavbarClient isLoggedIn={isLoggedIn} />;
}
