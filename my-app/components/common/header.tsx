
import { Shredder } from 'lucide-react';
import { Button } from "../ui/button";
import NavLink from "./nav-link";

export default function Header() {

    const isLoggedIn = false;

    return <nav className="no-underline container flex items-center justify-between py-4 lg:px-8 px-2 mx-auto">
        
        <div className="flex lg:flex-1">
            <NavLink href="/" className="no-underline flex items-center gap-2 text-xl font-bold text-gray-900">
            <Shredder className="w-5 h-5 lg:w-8 lg:h-8
            text-gray-900 hover:rotate-12
            transition duration-200 ease-in-out" />
            <span className="font-extrabold lg:text-xl text-gray-900">Opsom</span>
            </NavLink>
        </div>

        <div className="flex lg:justify-center gap-4 lg:gap-12 lg:items-center">
            <NavLink href="/#pricing" className="no-underline">Pricing</NavLink>
            {isLoggedIn && <NavLink href="/#dashboard" className="no-underline">Your Summaries</NavLink>}
        </div>

        <div className="flex lg:justify-end  lg:flex-1"> 
            {isLoggedIn ? (<div className="flex gap-2 items-center">
                <NavLink href="/upload" className="no-underline">Upload PDF</NavLink>
                <div className="">Pro</div>
                <Button>Sign Out</Button>
            </div> ) : (
            <div>
            <NavLink href="/#sign-in" className="no-underline">Sign In</NavLink>
            </div>)}
        </div>
    </nav>;
}