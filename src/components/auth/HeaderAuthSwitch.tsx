import Link from "next/link";
import { getAuthUser } from "@/lib/auth"; // uses await cookies() inside

export default async function HeaderAuthSwitch() {
  const user = await getAuthUser(); // marks the route dynamic and cookie-aware

  if (!user) {
    return (
      <div style={{ display: "flex", gap: 12 }}>
        <Link href="/sign-in" className="btn btn-outline">Login</Link>
        <Link href="/sign-up" className="btn btn-primary">Register</Link>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <span>Hi, {user.email}</span>
      <Link href="/student-dashboard" className="btn btn-outline">Dashboard</Link>
      {/* Client button to clear cookie */}
      {/* You can style this to match your header */}
      <form action="/api/auth/logout" method="post">
        {/* If you prefer fetch(), use the client button below instead */}
        <button type="submit" className="btn btn-secondary">Logout</button>
      </form>
    </div>
  );
}