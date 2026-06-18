import LoginForm from "@/Components/LoginForm.tsx";
import PageContainer from "@/Components/Layout/PageContainer.tsx";

export default function LoginPage() {
  return (
    <PageContainer className={"items-center h-screen"}>
      <LoginForm />
    </PageContainer>
  );
}
