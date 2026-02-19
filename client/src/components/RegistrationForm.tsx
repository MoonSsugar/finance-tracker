import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router";
import { regSchema } from "../utils/validationSchemas";
import { useAddUserMutation, useLoginUserMutation } from "../api/api";
import { useAppDispatch } from "../redux/hooks";
import { setCredentials } from "../redux/slices/authSlice";
import { Eye, EyeOff } from "lucide-react";
import type { Registration } from "../utils/validationSchemas";
import type { ServerResponseError } from "../types/types";

export default function RegistrationForm() {
  const navigator = useNavigate();
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const [addUser, { isLoading }] = useAddUserMutation();
  const [loginUser] = useLoginUserMutation();

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Registration>({
    resolver: zodResolver(regSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: Registration) => {
    try {
      setError("");

      const user = await addUser(data);

      if (user.error) {
        throw user.error
      }

      const loggedUser = await loginUser({
        email: data.email,
        password: data.password,
      }).unwrap();

      if (!loggedUser) {
        throw new Error();
      }

      dispatch(setCredentials(loggedUser));

      navigator("/");
    } catch (err) {
      setError((err as ServerResponseError).data.msg);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center bg-gray-200 rounded-xl p-4 gap-2"
      >
        <h1 className="font-semibold text-xl flex justify-center">Sign up</h1>
        <div className="flex flex-col gap-1">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Alex Smith"
            {...register("name")}
            className="border rounded-sm px-2 py-1"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="example@examp.io"
            {...register("email")}
            className="border rounded-sm px-2 py-1"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password">Password</label>
          <div className="flex items-baseline gap-2">
            <input
              type={showPass ? "text" : "password"}
              {...register("password")}
              className="border rounded-sm px-2 py-1"
            />
            <button type="button" onClick={() => setShowPass(prev => !prev)}>
              {showPass ? <Eye size={15} /> : <EyeOff size={15} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit">
          Sign up
        </button>
        <Link
          to="/login"
          className="flex justify-center underline text-blue-500"
        >
          {isLoading ? "Signing up" : "Sign up"}
        </Link>
      </form>
    </div>
  );
}
