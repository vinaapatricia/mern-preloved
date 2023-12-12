import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import OAuth from '../components/GoogleAuth';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className='container pb-8 sm:pb-0'> 
    <p className='grid grid-cols-1 sm:grid-cols-2'></p>
    <h1 className={'text-4xl text-center font-bold font-poppins mt-40 mb-10'}>Sign In</h1>
    <form onSubmit={handleSubmit} className='flex flex-col md:flex-row items-center md:items-start gap-8'>
        <img src="./images/login.svg" alt="" className='w-full md:w-1/2  mx-auto' /> {/* Increase max-width */}
        <div className="w-full md:w-1/2 mt-20">
            <input
                type='email'
                placeholder='email'
                className='border font-poppins p-4 w-full rounded-lg mt-6' 
                id='email'
                onChange={handleChange}
            />
            <input
                type='password'
                placeholder='password'
                className='border font-poppins p-4 w-full rounded-lg mt-6' 
                id='password'
                onChange={handleChange}
            />

            <button
                disabled={loading}
                className='bg-black text-white p-4 font-poppins rounded-lg uppercase hover:opacity-50 disabled:opacity-80 mt-6 my-4 w-full'
            >
                {loading ? 'Loading...' : 'Sign In'}
            </button>
            <OAuth  />
            <div className='flex gap-4 font-poppins mt-8 mx-24  justify-center'> 
        <p>Dont have an account?</p>
        <Link to={'/sign-up'}>
            <span className='text-yellow-700 font-poppins underline'>Sign up</span>
        </Link>
        {error && <p className='text-red-500 mt-8'>{error}</p>} 
      </div>
        </div>
    </form>
</div>

  );
}
