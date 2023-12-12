import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/GoogleAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <div className='container pb-8 sm:pb-0'>
       <p className='grid grid-cols-1 sm:grid-cols-2'></p>
      <h1 className={'text-4xl text-center font-bold font-poppins mt-40 mb-10'}>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col md:flex-row items-center md:items-start gap-8'>
      <img src="./images/register.svg" alt="" className='w-full md:w-1/2 max-w-full mx-auto' />
      <div className="w-full md:w-1/2 mt-20">
        <input
          type='text'
          placeholder='username'
          className='border font-poppins p-4 w-full rounded-lg mt-6'
          id='username'
          onChange={handleChange}
        />
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
          className='bg-black text-white p-4 rounded-lg uppercase hover:opacity-50 disabled:opacity-80 mt-6 my-4 w-full'
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        <OAuth/>
        <div className='flex gap-4 mt-8 justify-center'>
        <p>Have an account?</p>
        <Link to={'/sign-in'}>
          <span className='text-yellow-700 underline'>Sign in</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-8'>{error}</p>}
        </div>
      </form>
    </div>
  );
}
