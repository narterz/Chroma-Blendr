
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai'
import ClipLoader from 'react-spinners/ClipLoader';

/**
 * TODO: make responsive
 */

interface SignInCredentials {
    username: string;
    password: string;
}

const initialValues: SignInCredentials = {
    username: "",
    password: ""
}

interface SignInProps {
    openSignIn: boolean;
    onClose: () => void;
    username: string;
    password: string;
    handleSignIn: () => void;
    createAccount: () => void;
}

export const SignInModal = ({ openSignIn, onClose, handleSignIn, username, password, createAccount }: SignInProps) => {
    const [loading, setLoading] = useState(false);

    const validateUsername = (value: string) => {
        let error;
        if (!value) {
            error = 'Must enter a username';
        } else if (value !== username) {
            error = "Username does not match try again"
        }
        return error
    }

    const validataPassword = (value: string) => {
        let error;
        if (!value) {
            error = "Must enter a password"
        } else if (value !== password) {
            error = "Passwords must match try again"
        }

        return error
    }

    const handleSubmit = (values: SignInCredentials, { setSubmitting }: FormikHelpers<SignInCredentials>) => {
        setLoading(true);

        setTimeout(() => {
            handleSignIn();
            setSubmitting(false);
            setLoading(false);
        }, 2000);
    }

    return (
        <div
            className='fixed inset-0 h-full full bg-black bg-opacity-30 backdrop-blur-sm z-50'
            style={!openSignIn ? { display: 'none' } : { display: 'block' }}>
            <div className='bg-white flex flex-col justify-between relative border rounded-lg sm:h-[50%] md:h-[60%] xl:w-[25%] lg:w-[35%] md:w-[40%] sm:w-[70%] z-50 me-auto ms-auto mt-16'>
                <div className='bg-primary border rounded-lg flex flex-row justify-between items-center h-[10%] border-b border-grey-200'>
                    <h3 className='ms-4 mt-2 mb-0 lg:text-md semibold text-white'>Sign In</h3>
                    <AiOutlineClose className='me-4 mt-2 cursor-pointer' size={25} onClick={onClose} style={{ color: 'white' }} />
                </div>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                >
                    <Form className='h-[90%] flex flex-col justify-evenly items-center'>
                        {loading
                            ?   <>
                                    <h3 className='text-primary md:text-sm font-semibold'>Signing In</h3>
                                    <ClipLoader loading={loading} color='#0864FC' size={50} />
                                </>
                            :   <>
                                    <div className='w-full flex flex-col justify-evenly h-[30%]'>
                                        <label htmlFor="username" className='ms-4'>Username</label>
                                        <Field
                                            className="fields border border-grey-200 rounded-xl me-4 ms-4 outline-none indent-3 text-sm"
                                            type="text"
                                            id="username"
                                            name="username"
                                            validate={validateUsername} />
                                        <ErrorMessage name="username" component="div" className="error-message" />
                                    </div>

                                    <div className='w-full flex flex-col justify-evenly h-[30%]'>
                                        <label htmlFor="password" className='ms-4'>Password</label>
                                        <Field
                                            className="border border-grey-200 rounded-xl me-4 ms-4 outline-none indent-3 text-sm"
                                            type="password"
                                            id="password"
                                            name="password"
                                            validate={validataPassword}
                                        />
                                        <ErrorMessage name="password" component="div" className="error-message" />
                                    </div>
                                    <div className='flex flex-col items-center justify-between h-[15%] w-full'>
                                        <button type='submit' className='bg-primary text-white w-[30%] sm:h-[50%] md:h-[40%]'>Sign In</button>
                                        <p>Dont have an account? <button onClick={createAccount} className='cursor-pointer text-primary border-none'>Create account</button></p>
                                    </div>
                                </>
                        }
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

