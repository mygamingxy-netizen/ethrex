import { Link } from 'react-router-dom'
import { RiAccountCircleFill } from 'react-icons/ri'
import { AiFillHome } from 'react-icons/ai';
import { MdMovie } from 'react-icons/md'
import { BiCameraMovie } from 'react-icons/bi'
import { MdLiveTv } from 'react-icons/md'
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function BottomNav() {
    const location = useLocation();
    const current = location.pathname.startsWith('/live') || location.pathname.startsWith('/channel') ? 'live'
        : location.pathname.startsWith('/movies') ? 'movies'
            : location.pathname.startsWith('/shows') ? 'shows'
                : location.pathname === '/profile' || location.pathname === '/login' ? 'profile' : 'home';
    const [activeLink, setActiveLink] = useState<string>('home');

    return (
        <div className="base-flex bottom-nav">
            <div className="base-flex bottom-nav-link-holder">
                <Link onClick={() => setActiveLink("home")} to={{ pathname: "/" }} className={`base-flex bottom-nav-links ${current === "home" || activeLink === "home" ? "activeLink" : ""}`}> <AiFillHome size={25} color={current === "home" ? "white" : "grey"} /></Link>
                <Link onClick={() => setActiveLink("movies")} to={{ pathname: "/movies" }} className={`base-flex bottom-nav-links ${current === "movies" ? "activeLink" : ""}`}> <MdMovie size={25} color={current === "movies" ? "white" : "grey"} /></Link>
                <Link onClick={() => setActiveLink("shows")} to={{ pathname: "/shows" }} className={`base-flex bottom-nav-links ${current === "shows" ? "activeLink" : ""}`}> <BiCameraMovie size={25} color={current === "shows" ? "white" : "grey"} /></Link>
                <Link onClick={() => setActiveLink("live")} to={{ pathname: "/live" }} className={`base-flex bottom-nav-links ${current === "live" ? "activeLink" : ""}`}> <MdLiveTv size={25} color={current === "live" ? "white" : "grey"} /></Link>
                <Link onClick={() => setActiveLink("profile")} to={{ pathname: "/profile" }} className={`base-flex bottom-nav-links ${current === "profile" ? "activeLink" : ""}`}> <RiAccountCircleFill size={26} color={current === "profile" ? "white" : "grey"} /></Link>
            </div >
        </div >
    )
}