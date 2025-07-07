"use client";

import AuthForm from "@/modules/home/_components/AuthForm";

export default function LoginPage() {
    return (
        <>
            <AuthForm isSignup={false} />
        </>
    );
}