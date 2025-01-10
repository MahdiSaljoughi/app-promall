import FormAuth from "@/components/Auth/FormAuth";
import Container from "@/components/Container";

export default function Page() {
  return (
    <Container>
      <div className="h-screen flex items-center justify-center">
        <FormAuth />
      </div>
    </Container>
  );
}
