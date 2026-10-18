import {useEffect, useState} from "react";
import {Button, Label, TextInput} from "flowbite-react";
import {Link} from "react-router-dom";


export default function Login() {
    const [csrfToken, setCsrfToken] = useState("");

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
                    Log in or create account
                </h3>

                <form method="POST" className="mt-6 space-y-4">
                    {/* CSRF token from Django */}
                    <input
                        type="hidden"
                        name="csrfmiddlewaretoken"
                        value={csrfToken}
                    />

                    <div>
                        <Label htmlFor="username" value="Username">Username</Label>
                        <TextInput
                            type="text"
                            id="username"
                            name="username"
                            autoComplete="username"
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
                            autoComplete="current-password"
                            placeholder="password"
                            className="mt-2"
                            required
                        />
                    </div>


                    <Button type="submit" color="default" className="w-full">
                        Sign In
                    </Button>
                </form>

                <p className="mt-4 text-xs text-muted-foreground text-center">
                    By signing in, you agree to our{" "}
                    <Link
                        to="/privacy-policy/"
                        className="underline underline-offset-4 hover:text-foreground transition-colors"
                    >
                        Terms and Privacy Policy
                    </Link>
                    .
                </p>
                <p className="mt-4 text-xs text-muted-foreground text-center">
                    if you don't have account {" "}
                    <Link
                      to="/signup/"
                      className="underline underline-offset-4 hover:text-foreground transition-colors"
                    >
                        Signup
                    </Link>
                    .
                </p>
            </div>
        </div>
    );
}
