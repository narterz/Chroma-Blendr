import { MouseEventHandler, useState, createContext } from "react";
import { SignUpModal } from "./SignUp";
import { SignInModal } from "./SignIn";
import { SignOutModal } from "./SignOut";
import { NavButtons, UserCred } from "./NavButtons";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  handleIsSignedIn: () => void;
  handleIsSignedOut: () => void;
}

export const usernameContext = createContext(false);

export function Navbar({ handleIsSignedIn, handleIsSignedOut }: NavbarProps) {
  const [openSignUp, setOpenSignUp] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openSignOut, setOpenSignOut] = useState(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [signedIn, setSignedIn] = useState(false);

  const navigate = useNavigate();

  const handleNavigate = (link: string) => {
    navigate(link);
  }

  const handleSignUp = (values: any) => {
    setUsername(values.username);
    setPassword(values.password);
    setOpenSignUp(() => !openSignUp);
    setSignedIn(true);
    handleIsSignedIn();
  }

  const handleSignIn = () => {
    setSignedIn(true);
    setOpenSignIn(false);
    handleIsSignedIn();
  }

  const handleSignOut: MouseEventHandler<HTMLButtonElement> = (e) => {
    const value = e.currentTarget.value;
    if (value === 'signOut') {
      setSignedIn(false);
      setOpenSignOut(false);
      handleIsSignedOut();
    } else {
      setOpenSignOut(false)
    }
  }

  const handleCreateAccount = () => {
    setOpenSignIn(() => !openSignIn);
    setOpenSignUp(() => !openSignUp);
  }

  const handleOpenForm: MouseEventHandler<HTMLButtonElement> = (e) => {
    const value = e.currentTarget.value;
    if (value === 'signUp') {
      setOpenSignUp(true);
    } else {
      setOpenSignIn(true);
    }
  }

  return (
    <nav className='w-full flex justify-center h-[8vh] relative'>
      <div className='yogo flex flex-row justify-between relative items-center sm:w-[97%] lg:w-[95%] xl:w-full'>
        <div className="logo sm:w-[50%] md:w-[60%]">
          <h2 className='text-primary font-exo font-bold cursor-pointer sm:text-sm md:text-md md:ml-5  lg:text-lg xl:ms-[5.2%]'
            onClick={() => handleNavigate('/')}>Chroma-Blendr</h2>
        </div>
        <div className="flex justify-evenly sm:w-[50%] md:w-[40%] lg:w-[30%] lg:justify-between xl:me-[2%] xl:w-[30%] xl:justify-between">
          {signedIn
            ? <UserCred username={username} handleSignOut={() => setOpenSignOut(!openSignOut)} />
            : <NavButtons openForm={handleOpenForm} />
          }
        </div>
      </div>
      {openSignUp && <SignUpModal
        openSignUp={openSignUp}
        onClose={() => setOpenSignUp(!openSignUp)}
        handleSignUp={handleSignUp}
        username={username}
        password={password}
      />}
      {openSignIn && <SignInModal
        openSignIn={openSignIn}
        onClose={() => setOpenSignIn(!openSignIn)}
        username={username}
        password={password}
        handleSignIn={handleSignIn}
        createAccount={handleCreateAccount}
      />}
      {openSignOut && <SignOutModal
        onClose={() => setOpenSignOut(!openSignOut)}
        openSignOut={openSignOut}
        username={username}
        handleSignOut={handleSignOut}
      />}
      <hr className="w-full border-t border-grey-200 mt-2 absolute bottom-0" />
    </nav>

  );
}


