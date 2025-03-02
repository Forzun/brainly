import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "./ui/skeleton";

export function LoginForm({
  className,
  setData,
  skeletion,
  submitHandler,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submitHandler}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  onChange={(e) =>
                    setData((prv) => ({ ...prv, username: e.target.value }))
                  }
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  onChange={(e) =>
                    setData((prv) => ({ ...prv, password: e.target.value }))
                  }
                  id="password"
                  type="password"
                  required
                />
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-3">
                  {!skeletion && (
                    <Skeleton className="h-9 rounded-md gap-1.5 px-3 cursor-not-allowed" />
                  )}
                </div>
                {skeletion && (
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                )}
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="/signin" className="underline underline-offset-4">
                sign in
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
