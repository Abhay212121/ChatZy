import { Form } from "./Form";

export function Signup() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-sky-900 to-purple-800">
      <Form isSignUp={true} />
    </div>
  );
}
