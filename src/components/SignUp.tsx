import { Formik, Field, Form, ErrorMessage, FormikHelpers} from 'formik';
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai'
import ClipLoader from 'react-spinners/ClipLoader';
/**
 * TODO: make responsive
 */

interface SignUpValues {
    email: string;
    username: string;
    password: string;
}

const initialValues: SignUpValues = {
    email: "",
    username: '',
    password: '',
}

interface SignUpModalProps {
    openSignUp: boolean;
    handleSignUp: (values: SignUpValues) => void;
    onClose: () => void;
    username?: string;
    password?: string;
}

const validateEmail = (email: string) => {
    let error;
    if (!email) {
        error = 'Email Required'
    } else if (!email.includes('@')) {
        error = 'Enter valid email'
    }
    return error
}

//email and password have the same validation
const validateOther = (value: string) => {
    let error;
    if (!value) {
        error = 'Required'
    } else if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(value)) {
        error = 'Must contain at least one number and special character'
    } else if (value.length < 8) {
        error = 'Must be at least 8 characters'
    } 
    return error
}

export const SignUpModal = ({ openSignUp, handleSignUp, onClose, username, password }: SignUpModalProps) => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = (values: SignUpValues, { setSubmitting }: FormikHelpers<SignUpValues>) => {
        setLoading(true);

        setTimeout(() => {
            handleSignUp(values);
            setSubmitting(false);
            setLoading(false);
        }, 2000);
    }
    
    return (
        <div
            className='fixed inset-0 h-full full bg-black bg-opacity-30 backdrop-blur-sm z-50'
            style={!openSignUp ? { display: 'none' } : { display: 'block' }}>
            <div className='bg-white flex flex-col justify-between relative border rounded-lg sm:h-[50%] md:h-[60%] xl:w-[25%] lg:w-[35%] md:w-[40%] sm:w-[70%]  z-50 me-auto ms-auto mt-16'>
                <div className='bg-primary border rounded-lg flex flex-row justify-between items-center h-[10%] border-b border-grey-200'>
                    <h3 className='ms-4 mt-2 mb-0 lg:text-md semibold text-white'>Sign Up</h3>
                    <AiOutlineClose size={25} className='me-4 mt-2 cursor-pointer' onClick={onClose} style={{ color: 'white' }} />
                </div>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                >
                    <Form className='h-[90%] flex flex-col justify-evenly items-center'>
                        {loading
                            ?   <>
                                    <h3 className='text-primary md:text-sm font-semibold'>Creating Account</h3>
                                    <ClipLoader loading={loading} color='#0864FC' size={50} />
                                </>
                            : <>
                                <div className='form-containers h-[25%]'>
                                    <label htmlFor="email" className='ms-4 lg:text-xsm'>Email</label>
                                    <Field
                                        className="fields border-grey-200"
                                        type="email"
                                        id="email"
                                        name="email"
                                        validate={validateEmail}
                                    />
                                    <ErrorMessage name="email" component="div" className="error-message" />
                                </div>

                                <div className='form-containers h-[25%]'>
                                    <label htmlFor="username" className='ms-4 lg:text-xsm'>Username</label>
                                    <Field
                                        className="fields border-grey-200"
                                        type="text"
                                        id="username"
                                        name="username"
                                        validate={validateOther}
                                    />
                                    <ErrorMessage name="username" component="div" className="error-message" />
                                </div>

                                <div className='form-containers h-[25%]'>
                                    <label htmlFor="password" className='ms-4 lg:text-xsm'>Password</label>
                                    <Field
                                        className="fields border-grey-200"
                                        type="password"
                                        id="password"
                                        name="password"
                                        validate={validateOther}
                                    />
                                    <ErrorMessage name="password" component="div" className="error-message" />
                                </div>
                                <button type="submit" className='bg-primary text-white xl:w-[20%] sm:w-[35%] h-[9%]'>Submit</button>
                            </>
                        }

                    </Form>
                </Formik>
            </div>
        </div>
    )
}