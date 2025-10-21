import Image from "next/image";
import Link from "next/link";


export  function LogoDashboard() {
  return (
    <Link href="/" className="flex items-center border-b h-20 cursor-pointer min-h-20 gap-2 px-6">
        <Image src="/logo.svg" alt="Logo" width={30} height={30} priority />
        <h1 className="text-xl font-bold">Hight Motors</h1>
    </Link>
  )
}
