import { Button, Label, TextInput } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Signup() {
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    if (window.CSRF_TOKEN) {
      setCsrfToken(window.CSRF_TOKEN);
    }
  }, []);
  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-4 py-10 lg:px-6">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="image-wrapper flex w-full justify-center mb-4">
          <img
            src="/logo.png"
            alt="brand logo"
            className="h-auto w-24"
          />
        </div>

        <h3 className="text-center text-xl font-semibold text-foreground">
          Create your account
        </h3>

        <form method="POST" className="mt-6 space-y-4">
          <input
            type="hidden"
            name="csrfmiddlewaretoken"
            value={csrfToken}
          />
          <div>
            <Label htmlFor="email" value="Email">Email</Label>
            <TextInput
              type="text"
              id="username"
              name="username"
              maxlength="20"
              placeholder="username"
              className="mt-2"
              required
            />
          </div>

          <div>
            <Label htmlFor="password" value="Password">Password</Label>
            <TextInput
              type="password"
              id="password"
              name="password"
              autoComplete="new-password"
              placeholder="password"
              className="mt-2"
              required
            />
          </div>

          <div>
            <Label htmlFor="confirm-password" value="Confirm Password" >Confirm Password</Label>
            <TextInput
              type="password"
              id="confirm-password"
              name="confirm_password"
              autoComplete="new-password"
              placeholder="confirm password"
              className="mt-2"
              required
            />
          </div>

          <Button type="submit" className="mt-4 w-full">
            Sign up
          </Button>
        </form>
        <p className="mt-4 text-xs text-muted-foreground text-center">
          if you have an account {' '}
          <Link
            to="/login/"
            className="underline underline-offset-4 hover:text-foreground transition-colors"
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
