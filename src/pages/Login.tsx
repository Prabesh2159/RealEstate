import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import { login, checkAdmin, setTokens, setAdminUser } from "@/back/auth";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Login and get tokens
      const { access, refresh } = await login({
        username: formData.username,
        password: formData.password
      });

      // Store tokens
      setTokens(access, refresh);

      // Check if user is admin
      const adminCheck = await checkAdmin(access);

      if (!adminCheck.is_admin) {
        toast({
          title: "Access Denied",
          description: "You are not authorized as an admin. Only superusers can access the admin dashboard.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Store admin user info
      setAdminUser({
        username: adminCheck.username,
        loginTime: new Date().toISOString(),
        is_staff: adminCheck.is_staff
      });

      toast({
        title: "Login Successful!",
        description: `Welcome to the admin dashboard, ${adminCheck.username}.`,
      });

      navigate("/admin", { replace: true });

    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message || "Invalid username or password.",
        variant: "destructive",
      });
      console.error("Login error:", error);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-md mx-auto px-4 py-16">
        <Card className="shadow-xl animate-fade-in">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-800">Admin Login</CardTitle>
            <p className="text-gray-600">Access the admin dashboard</p>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="username" className="text-sm font-medium">Username</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Enter your username"
                    required
                    className="pl-10 pr-10 border !border-[#006d4e] hover:!border-[#006d4e] focus:!border-[#006d4e] focus:ring-1 focus:ring-[#006d4e] focus:outline-none transition-colors duration-200"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    required
                    className="pl-10 pr-10 border !border-[#006d4e] hover:!border-[#006d4e] focus:!border-[#006d4e] focus:ring-1 focus:ring-[#006d4e] focus:outline-none transition-colors duration-200"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#006d4e] hover:bg-[#005a3f] text-lg py-3 transition-all duration-200 hover:scale-105 transform disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login to Admin Dashboard"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
