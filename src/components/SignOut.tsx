import { MouseEventHandler } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

interface SignOutProps {
    onClose: () => void;
    openSignOut: boolean
    username: string;
    handleSignOut: MouseEventHandler<HTMLButtonElement>;
}

export const SignOutModal = ({ onClose, openSignOut, username, handleSignOut }: SignOutProps) => {
    return (
        <div
            className='blur-container'
            style={!openSignOut ? { display: 'none' } : { display: 'block' }}
        >
            <div className='bg-white h-[20%] w-[40%] me-auto ms-auto mt-5 flex flex-col justify-between'>

                <div className='flex flex-row justify-between bg-primary'>
                    <h3 className='ms-4 mt-2 mb-0 lg:text-md semibold text-white'>Sign Up</h3>
                    <AiOutlineClose size={25} className='me-4 mt-2 cursor-pointer' onClick={onClose} style={{ color: 'white' }} />
                </div>
                <div>
                    <h3 className='lg:text-sm text-center'>Are you sure you want to sign out of {username}</h3>
                </div>
                <div className='flex flex-row justify-between mb-3 ms-5 me-5'>
                    <button
                        className='bg-primary text-white w-[15%]'
                        value='signOut'
                        onClick={handleSignOut}>Yes

                    </button>
                    <button
                        className='bg-secondary w-[15%]'
                        value='stay'
                        onClick={handleSignOut}>Stay signed in
                    </button>
                </div>
            </div>
        </div>
    )

}