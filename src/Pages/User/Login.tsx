/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "@/redux/authSlice";
import cover from "../../assets/img/ny.jpg";
import { AuthContext } from "@/Authentication/Providers/AuthProvides";
import { RootState } from "@/redux/store";

interface LoginInput {
  email: string;
  password: string;
}

const Login = () => {
  const axiosPublic = useAxiosPublic();
  const dispatch = useDispatch();
  const authContext = useContext(AuthContext);
  const { user } = useSelector((store: RootState) => store.auth);
  if (!authContext) {
    throw new Error("AuthContext is not available");
  }

  const { signIn } = authContext;
  const [input, setInput] = useState<LoginInput>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const loginHandler = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axiosPublic.post("/user/login", input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        await signIn(input.email, input.password);
        dispatch(setAuthUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
        setInput({
          email: "",
          password: "",
        });
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex items-center h-screen justify-center">
      <section className="min-h-screen flex items-center justify-center text-sky-900 font-itim">
        <div className="bg-feed2 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
          <div className="md:w-1/2 px-8 md:px-16">
            <h2 className="font-bold text-3xl text-[#002D74]">Login</h2>

            <form onSubmit={loginHandler} className="flex flex-col gap-4">
              <Input
                className="p-2 mt-8 rounded-xl focus-visible:ring-transparent"
                type="email"
                name="email"
                placeholder="Email"
                value={input.email}
                onChange={changeEventHandler}
                required
              />
              <div className="relative">
                <Input
                  className="p-2 rounded-xl border w-full focus-visible:ring-transparent"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={input.password}
                  onChange={changeEventHandler}
                  required
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="gray"
                  className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2"
                  viewBox="0 0 16 16"
                  aria-label="Toggle Password Visibility"
                >
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                </svg>
              </div>
              {loading ? (
                <Button className="bg-gradient-to-bl from-blue-300 to-green-300 text-sky-900 rounded-xl  py-2 hover:scale-105 duration-300">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button
                  className="bg-gradient-to-bl from-blue-300 to-green-300 text-sky-900 rounded-xl  py-2 hover:scale-105 duration-300"
                  type="submit"
                >
                  Login
                </Button>
              )}
            </form>

            <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
              <hr className="border-gray-400" />
              <p className="text-center text-sm">OR</p>
              <hr className="border-gray-400" />
            </div>

            <span className="text-center">
              Don't have an account?{" "}
              <Link to="/signup" className="text-sky-700">
                Sign up
              </Link>
            </span>
          </div>

          <div className="md:block hidden w-1/2">
            <img className="rounded-2xl" src={cover} alt="Login illustration" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
