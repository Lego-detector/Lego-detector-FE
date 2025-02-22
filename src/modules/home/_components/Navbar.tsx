import Link from 'next/link'

const navList = ["Home", "Signup", "Login", "Profile", "History", "Result/1"];

export function Navbar() {
  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-64 h-screen bg-gray-400 p-6 transition-transform duration-300`}
      >
        <h1 className="text-2xl font-bold mb-6 text-white sm:hidden">MyApp</h1>
        <ul>
          {navList.map((item, index) => (
            <li key={index} className="py-2">
              <Link href={item === "Home" ? "/" : `/${item.toLowerCase()}`} className="block hover:bg-gray-700 p-2 rounded text-white">
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}