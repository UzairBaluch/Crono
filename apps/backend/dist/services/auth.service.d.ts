import type { RegisterInput, LoginInput } from "../validations/auth.validation.js";
export declare const authService: {
    register(input: RegisterInput): Promise<{
        token: string;
        user: Omit<{
            id: string;
            email: string;
            password_hash: string;
            plan: string;
            stripe_customer_id: string | null;
            stripe_subscription_id: string | null;
            api_key: string;
            created_at: Date;
        }, "password_hash">;
    }>;
    login(input: LoginInput): Promise<{
        token: string;
        user: Omit<{
            id: string;
            email: string;
            password_hash: string;
            plan: string;
            stripe_customer_id: string | null;
            stripe_subscription_id: string | null;
            api_key: string;
            created_at: Date;
        }, "password_hash">;
    }>;
    getMe(userId: string): Promise<Omit<{
        id: string;
        email: string;
        password_hash: string;
        plan: string;
        stripe_customer_id: string | null;
        stripe_subscription_id: string | null;
        api_key: string;
        created_at: Date;
    }, "password_hash">>;
};
//# sourceMappingURL=auth.service.d.ts.map