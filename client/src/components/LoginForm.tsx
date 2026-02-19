import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useLoginUserMutation } from "../api/api";
import { loginSchema } from "../utils/validationSchemas";
import { useAppDispatch } from "../redux/hooks";
import { setCredentials } from "../redux/slices/authSlice";
import type { Login } from "../utils/validationSchemas";
import type { ServerResponseError } from "../types/types";

export default function LoginForm() {
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const navigator = useNavigate();

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: Login) => {
    try {
      setError("");

      const user = await loginUser(data).unwrap();

      if (!user) {
        throw new Error();
      }
      dispatch(setCredentials(user));

      navigator("/");
    } catch (err) {
      setError((err as ServerResponseError).data.msg);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center bg-gray-200 rounded-xl p-4 gap-2"
        noValidate
      >
        <h1 className="font-semibold text-xl flex justify-center">Login</h1>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="email" className="font-semibold">
            Email
          </label>
          <input
            type="email"
            placeholder="example@examp.io"
            {...register("email")}
            className="px-1 border rounded-sm"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="font-semibold">
            Password
          </label>
          <div className="flex flex-col gap-1 w-full">
            <div className="flex justify-baseline gap-2">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Password"
                {...register("password")}
                className="px-1 border rounded-sm"
              />
              <button
                type="button"
                onClick={() => setShowPass((prev) => !prev)}
              >
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-blue-900 rounded-sm py-1 px-2 text-white font-semibold"
          disabled={isLoading}
        >
          {isLoading ? "Logging..." : "Log In"}
        </button>
        <Link to="/registration" className="text-blue-500 underline flex justify-center">Sign up</Link>
      </form>
    </div>
  );
}
