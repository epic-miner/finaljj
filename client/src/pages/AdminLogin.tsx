import { useState } from "react";
import { useLocation } from "wouter";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const { login } = useAdminAuth();
  const [_, navigate] = useLocation();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(password);
    
    if (success) {
      toast({
        title: "Success",
        description: "Logged in as admin",
      });
      navigate("/admin");
    } else {
      toast({
        variant: "destructive",
        title: "Authentication Failed",
        description: "Incorrect password",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-6">
          <i className="fas fa-user-shield text-[#3949ab] text-3xl mb-3"></i>
          <h1 className="text-2xl font-bold text-slate-800">Admin Login</h1>
          <p className="text-slate-500 mt-2">
            Please enter the admin password to access the dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1"
              required
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-[#3949ab] hover:bg-[#2e399c]"
          >
            Login
          </Button>
        </form>

        <div className="mt-6 text-center">
          <a href="/" className="text-[#3949ab] text-sm hover:underline">
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}