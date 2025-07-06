
import { RegisterForm } from "@/components/Auth/RegisterForm";

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">💰 CatatUang</h1>
          <p className="text-muted-foreground">
            Kelola keuangan Anda dengan mudah
          </p>
        </div>
        
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
