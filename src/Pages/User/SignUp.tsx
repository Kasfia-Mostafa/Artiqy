/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { useSelector } from 'react-redux';
import { Loader2 } from 'lucide-react';
import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'sonner';
// import { RootState } from '@/store'; 

interface SignUpInput {
    username: string;
    email: string;
    password: string;
}

const SignUp = () => {
    const [input, setInput] = useState<SignUpInput>({
        username: '',
        email: '',
        password: '',
    });

    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    // const { user } = useSelector((store: RootState) => store.auth);

    const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const signUpHandler = async (e: FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post('http://localhost:5000/api/user/register', input, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate('/');
                toast.success(res.data.message);
                setInput({
                    username: '',
                    email: '',
                    password: '',
                });
            }
        } catch (error: any) {
            console.log(error);
            toast.error(error.response?.data?.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center h-screen justify-center">
            <form onSubmit={signUpHandler} className="shadow-lg flex flex-col gap-5 p-8">
                <div className="my-4">
                    <h1 className="text-center font-bold text-xl">LOGO</h1>
                    <p className="text-sm text-center">SignUp to see photos & videos from your friends</p>
                </div>
                <div>
                    <span className="font-medium">Username</span>
                    <Input
                        type="text"
                        name="username"
                        value={input.username}
                        onChange={changeEventHandler}
                        className="focus-visible:ring-transparent my-2"
                        required
                    />
                </div>
                <div>
                    <span className="font-medium">Email</span>
                    <Input
                        type="email"
                        name="email"
                        value={input.email}
                        onChange={changeEventHandler}
                        className="focus-visible:ring-transparent my-2"
                        required
                    />
                </div>
                <div>
                    <span className="font-medium">Password</span>
                    <Input
                        type="password"
                        name="password"
                        value={input.password}
                        onChange={changeEventHandler}
                        className="focus-visible:ring-transparent my-2"
                        required
                    />
                </div>
                {loading ? (
                    <Button>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                    </Button>
                ) : (
                    <Button type="submit">Sign Up</Button>
                )}
                <span className="text-center">
                    Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
                </span>
            </form>
        </div>
    );
};

export default SignUp;
