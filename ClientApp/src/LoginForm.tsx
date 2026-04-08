import {
  Form,
  Input,
  Button,
  TextField,
  Label,
  FieldError,
} from "@heroui/react";
import { useState } from "react";
import zod from "zod";
import useLoggedInUserContext from "@/Context/LoggedInUserContext";
import type { AppUser } from "@/types/AppUser";

export interface LoginFormData {
  username: string;
  password: string;
}

const jwtResponseSchema = zod.object({
  accessToken: zod.string(),
  expiresAtUtc: zod.coerce.date(),
  user: zod.object({
    id: zod.string(),
    username: zod.string(),
    role: zod.string(),
    createdAtUtc: zod.string(),
  }),
});

export default function LoginForm() {
  const { login } = useLoggedInUserContext();

  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<LoginFormData>>({});

  const [generalError, setGeneralError] = useState<string | null>(null);

  const validatePassword = (value: string | null | undefined) => {
    if ((value?.match(/[^a-z]/gi) || []).length < 1) {
      setErrors((prev) => ({
        ...prev,
        password: "Password needs at least 1 symbol",
      }));
    }

    return null;
  };
  const onSubmit = async (
    ev: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    ev.preventDefault();
    setGeneralError(null);

    validatePassword(formData.password);

    try {
      const response = await fetch("/api/auth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        setGeneralError("Invalid username or password.");
        return;
      }

      const data = await response.json();
      const parsedData = jwtResponseSchema.safeParse(data);
      if (!parsedData.success) {
        throw new Error("Invalid response from server");
      }

      login({
        accessToken: parsedData.data.accessToken,
        user: parsedData.data.user as AppUser,
      });
    } catch (error) {
      console.log(error);
      setGeneralError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <section className="flex flex-col lg:col-span-3 lg:col-start-5 md:col-start-5 md:col-span-4 col-span-full gap-y-4 items-center h-screen justify-center">
      <h1 className="text-left text-xl w-full">Login</h1>
      <Form onSubmit={onSubmit} className="w-full">
        <div className="flex flex-col gap-4 w-full">
          <TextField isRequired isInvalid={!!errors.username}>
            <Label>Username</Label>
            <Input
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
            <FieldError>{errors.username}</FieldError>
          </TextField>
          <TextField isRequired isInvalid={!!errors.password}>
            <Label>Password</Label>
            <Input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <FieldError>{errors.password}</FieldError>
          </TextField>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </div>
      </Form>
      {generalError && <div className="text-red-500">{generalError}</div>}
    </section>
  );
}
