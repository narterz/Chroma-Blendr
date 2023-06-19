import { MouseEventHandler, FC } from "react";
import { FaUser } from 'react-icons/fa';

interface ButtonOnClick {
    openForm: MouseEventHandler<HTMLButtonElement>;
}

interface UserCredsProps {
    username: string;
    handleSignOut: () => void;
}

export const NavButtons: FC<ButtonOnClick> = ({ openForm }) => {

    return (
        <>
            <button
                value="signUp"
                onClick={openForm}
                className='nav__btns bg-secondary text-black text-xsm sm:w-[40%] sm:h-7 md:w-[30%] md:h-10 lg:w-[40%] lg:h-10 xl:w-[30%] xl:ms-[20%] sm:text-xxsm md:text-xsm'>Sign Up
            </button>
            <button
                value="signIn"
                onClick={openForm}
                className='nav__btns bg-primary text-white text-xsm sm:w-[40%] sm:h-7 md:w-[30%] md:h-10 lg:w-[40%] lg:h-10 xl:w-[30%] sm:text-xxsm md:text-xsm'>Sign In
            </button>
        </>
    )
}

export const UserCred: FC<UserCredsProps> = ({ username, handleSignOut }) => {
    return (
        <>
            <div className="flex flex-row justify-evenly items-center w-[30%]">
                <FaUser size={30} style={{ color: "#0864FC" }} />
                <h4 className="text-xsm">{username}</h4>
            </div>
            <button
                onClick={handleSignOut}
                className="nav__btns bg-primary text-white text-xsm lg:me-12 sm:w-[40%] sm:h-7 md:w-[30%] md:h-10 lg:w-[40%] lg:h-10 xl:w-[30%] sm:text-xxsm md:text-xsm">
                Sign Out
            </button>
        </>
    )
}
