import { Link, NavLink } from "react-router-dom";
import { AiOutlineHome, AiFillHome  } from "react-icons/ai";
import { MdOutlineExplore, MdExplore } from "react-icons/md";
import {  FaSignOutAlt } from "react-icons/fa";
import React from "react";
export const AsideLeft = () => {
        const [user,setUser] = React.useState<People>()
        interface People{
            followers: any[];
            likes: any[];
            following: any[];
            events: any[];
            _id: string;
            userName: string;
            email: string;
            password: string;
            __v: number;
        }
    React.useEffect(() => {
        const fetchData = async () => {
            try {
            const response = await fetch(`http://localhost:2014/checkuser/${localStorage.getItem('loginUser')}`, {
                method: 'GET',
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data[0]);
            } else {
                console.log('cool')
            }
            } catch (error) {
            console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleLogout = async () => {
        localStorage.clear()
        window.location.href = "/"
    }
    return (
        <aside className=" sticky top-0 bg-white hidden sm:block basis-1/6 lg:basis-1/5">


            <header className="flex font-bold text-blue-600 mx-5 my-4 text-xl xl:text-2xl header-aside">
                <Link to="/" className="text-purple-600"> MelodyMingle </Link>
            </header>


            <nav>
                <ul className="px-2 mr-1">
                    <li >
                        <NavLink to="/" className="flex py-4 gap-3 px-3 cursor-pointer hover:bg-slate-200 rounded-[15rem] active:bg-slate-100">
                            {({ isActive }) => 
                                isActive ? (
                                    <>
                                        <AiFillHome className="text-[1.6rem] font-bold"/>  
                                        <h2 className="text-xl px-1 hidden xl:block font-bold"> Trending </h2>
                                    </>
                                ) : (
                                    <>
                                        <AiOutlineHome className="text-[1.6rem]"/>
                                        <h2 className="text-xl px-1 hidden xl:block"> Trending </h2>
                                    </>
                                )}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/explore" className="flex py-4 gap-3 px-3 cursor-pointer hover:bg-slate-200 rounded-[15rem] active:bg-slate-100">
                            {({ isActive }) => 
                                isActive ? (
                                    <>
                                        <MdExplore className="text-[1.6rem] font-bold"/> 
                                        <h2 className="text-xl px-1 hidden xl:block font-bold"> Explore </h2>
                                    </>
                                ) : (
                                    <>
                                        <MdOutlineExplore className="text-[1.6rem]"/>
                                        <h2 className="text-xl px-1 hidden xl:block"> Explore </h2>
                                    </>
                                )}
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    )
};
// i have no idea wha tim doing