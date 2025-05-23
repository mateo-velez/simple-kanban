"use client";

import { LoginForm } from "@/components/login-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/auth/utils";
import { Spinner } from "@/components/ui/spinner";

export default function Page() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    // chekc of token is valid and redirect to home
    useEffect(() => {
        const token = getToken();
        if (token) {
            router.push("/boards");
        } else {
            setIsLoading(false);
        }
    }, [router]);

    if (isLoading)
        return (
            <div className="h-screen w-screen flex items-center justify-center">
                <Spinner />
            </div>
        );

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <LoginForm />
            </div>
        </div>
    );
}
