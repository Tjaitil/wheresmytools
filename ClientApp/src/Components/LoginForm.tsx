import {
  Form,
  Input,
  Button,
  TextField,
  Label,
  toast,
  FieldError,
  Surface,
} from "@heroui/react";
import { useState } from "react";
import useLoggedInUserContext from "@/Context/LoggedInUserContext.ts";

export interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const { refreshUser } = useLoggedInUserContext();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | undefined>(undefined);

  const onSubmit = async (
    ev: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    ev.preventDefault();

    try {
      const response = await fetch("/api/login?useCookies=true", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        setError("Invalid username or password");
        return;
      }

      const user = await refreshUser();
      if (!user) {
        toast("Failed to load your account. Please try again later");
      }
    } catch {
      toast("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <Surface
      variant="default"
      className="flex flex-col lg:col-span-3 lg:col-start-5 md:col-start-5 md:col-span-4 col-span-full gap-y-4 items-center justify-center p-6 rounded-sm"
    >
      <h1 className="text-left text-xl w-full">Login</h1>
      <Form onSubmit={onSubmit} className="w-full">
        <div className="flex flex-col gap-4 w-full">
          <TextField isRequired>
            <Label>Email</Label>
            <Input
              type="text"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <FieldError>{error}</FieldError>
          </TextField>
          <TextField isRequired>
            <Label>Password</Label>
            <Input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <FieldError>{error}</FieldError>
          </TextField>
          <p className="text-danger">{error}</p>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </div>
      </Form>
    </Surface>
  );
}
