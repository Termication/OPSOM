import Link from "next/link";
import { Shredder } from 'lucide-react';
import { Button } from "../ui/button";

export default function Header() {

    const isLoggedIn = true;

    return <nav className="no-underline container flex items-center justify-between py-4 lg:px-8 px-2 mx-auto">
        
        <div className="flex lg:flex-1">
            <Link href="/" className="no-underline flex items-center gap-2 text-xl font-bold text-gray-900">
            <Shredder className="w-5 h-5 lg:w-8 lg:h-8
            text-gray-900 hover:rotate-12
            transition duration-200 ease-in-out" />
            <span className="font-extrabold lg:text-xl text-gray-900">Opsom</span>
            </Link>
        </div>

        <div className="flex lg:justify-center gap-4 lg:gap-12 lg:items-center">
            <Link href="/#pricing" className="no-underline">Pricing</Link>
            {isLoggedIn && <Link href="/#dashboard" className="no-underline">Your Summaries</Link>}
        </div>

        <div className="flex lg:justify-end  lg:flex-1"> 
            {isLoggedIn ? (<div className="flex gap-2 items-center">
                <Link href="/upload" className="no-underline">Upload PDF</Link>
                <div className="">Pro</div>
                <Button>Sign Out</Button>
            </div> ) : (
            <div>
            <Link href="/#sign-in" className="no-underline">Sign In</Link>
            </div>)}
        </div>
    </nav>;
}