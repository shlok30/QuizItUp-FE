import { useEffect, useState } from 'react';
import Input from '../components/Input';
import Heading from '../components/Heading1';
import Button from '../components/Button';
import useForm from '../useForm';
import endpoints from '../endpoints';
import { useDispatch } from 'react-redux';
import { setLogin } from '../features/auth';
import { useNavigate } from 'react-router';

const validations = {
  username: [
    {
      name: 'Required',
      validation: (value: string) => Boolean(value.trim().length),
      error: 'Username is required!',
    },
    {
      name: 'Max Length',
      validation: (value: string) => value.length <= 32,
      error: 'Username must be at most 32 characters!',
    },
  ],
  password: [
    {
      name: 'Required',
      validation: (value: string) => Boolean(value.trim().length),
      error: 'Password is required!',
    },
    {
      name: 'Max Length',
      validation: (value: string) => value.length <= 64,
      error: 'Password must be at most 64 characters!',
    },
  ],
};

const initialValues = {
  username: { value: '', error: '' },
  password: { value: '', error: '' },
};

type LoginResponseType = {
  success: {
    message: string;
    token: string;
  };
  error: {
    error: string;
  };
};

export default function Login() {
  const {
    formValues,
    handleBlur,
    handleChange,
    handleFocus,
    validateAllFields,
  } = useForm({ initialValues, validations });

  const [loginError, setLoginError] = useState('');

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    let timeout: number;
    if (loginError) timeout = setTimeout(() => setLoginError(''), 5000);
    return () => clearTimeout(timeout);
  }, [loginError]);

  const handleSubmit = async () => {
    const errors = validateAllFields();
    if (!errors.length) {
      const {
        username: { value: username },
        password: { value: password },
      } = formValues;
      try {
        const rawResponse = await fetch(endpoints.login, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });
        if (!rawResponse.ok) {
          const { error } =
            (await rawResponse.json()) as LoginResponseType['error'];
          setLoginError(error);
          return;
        }
        const response =
          (await rawResponse.json()) as LoginResponseType['success'];
        localStorage.setItem('token', response.token);
        dispatch(setLogin());
        navigate('/create-quiz');
      } catch (e: any) {
        console.error(e);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <Heading
          level={2}
          label="Login"
          customStyle="text-2xl font-semibold text-center mb-6"
        />
        <div className="flex flex-col gap-4">
          {loginError && (
            <p className="text-red-500 text-sm mt-2">{loginError}</p>
          )}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <Input
              type="text"
              name="username"
              value={formValues.username.value}
              error={formValues.username.error}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              customStyle="w-full md:w-full lg:w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <Input
              type="password"
              name="password"
              value={formValues.password.value}
              error={formValues.password.error}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              customStyle="w-full md:w-full lg:w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"
            />
          </div>
          <Button
            label="Sign In"
            customCallback={handleSubmit}
            customStyles="w-full md:w-full lg:w-full bg-primary text-white py-2 rounded-lg hover:bg-opacity-90 transition duration-150"
          />
        </div>
      </div>
    </div>
  );
}
