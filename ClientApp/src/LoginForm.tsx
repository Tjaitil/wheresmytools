import { Form, Input, Button } from "@heroui/react";
import { useState } from "react";
import zod from "zod";

export interface LoginFormData {
  username: string;
  password: string;
}

const jwtResponseSchema = zod.object({
  accessToken: zod.string(),
  expiresAtUtc: zod.coerce.date(),
});

export default function LoginForm({
  onLoginSuccess,
}: {
  onLoginSuccess: (jwtToken: string) => void;
}) {
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
        const errorData = await response.json();
        setErrors(errorData.errors || {});
        setGeneralError(
          errorData.message ||
            "An unexpected error occurred. Please try again.",
        );
        return;
      }

      const data = await response.json();

      console.log("Received response from server:", data);
      const parsedData = jwtResponseSchema.safeParse(data);
      if (!parsedData.success) {
        throw new Error("Invalid response from server");
      }

      onLoginSuccess(parsedData.data.accessToken);
    } catch (error) {
      console.log(error);
      setGeneralError("An unexpected error occurred. Please try again.");
      return;
    }
  };

  return (
    <section className="flex flex-col lg:col-span-3 lg:col-start-5 md:col-start-5 md:col-span-4 col-span-full gap-y-4 items-center h-screen justify-center">
      <h1 className="text-left text-xl w-full">Login</h1>
      <Form onSubmit={onSubmit} className="w-full">
        <div className="flex flex-col gap-4 w-full">
          <Input
            size="lg"
            name="username"
            type="text"
            isRequired
            label="Username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            errorMessage={errors.username}
          />
          <Input
            name="password"
            type="password"
            isRequired
            label="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            errorMessage={errors.password}
          />
          <Button color="primary" type="submit">
            Login
          </Button>
        </div>
      </Form>
      {generalError && <div className="text-red-500">{generalError}</div>}
    </section>
  );
}
