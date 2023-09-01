import { useEffect, useState } from "react";
import Logo from '../components/ui/Logo'

export default function Home() {
  const [user, setUser] = useState({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user = localStorage?.getItem('user');
      setUser(JSON?.parse(user));
    }
  }, []);

  return (
    <>
      <div className="max-w-6xl mx-auto p-4 flex justify-between">
        <Logo />
        <button className=" bg-orange-500 text-white py-2 px-4 rounded-sm text-sm">
          Logout
        </button>
      </div>
      <main className="max-w-6xl mx-auto p-4">
        <p>{user?.role === 'user' ? 'User' : 'Admin'}</p>
      </main>
    </>
  )
}
