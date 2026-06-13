type InsertUserData = {
    email: string;
    password_hash: string;
    api_key: string;
    plan?: string;
};
export declare const userRepository: {
    findByEmail: (email: string) => Promise<{
        id: string;
        email: string;
        password_hash: string;
        plan: string;
        stripe_customer_id: string | null;
        stripe_subscription_id: string | null;
        api_key: string;
        created_at: Date;
    } | null>;
    findById: (id: string) => Promise<{
        id: string;
        email: string;
        password_hash: string;
        plan: string;
        stripe_customer_id: string | null;
        stripe_subscription_id: string | null;
        api_key: string;
        created_at: Date;
    } | null>;
    findByApiKey: (apiKey: string) => Promise<{
        id: string;
        email: string;
        password_hash: string;
        plan: string;
        stripe_customer_id: string | null;
        stripe_subscription_id: string | null;
        api_key: string;
        created_at: Date;
    } | null>;
    insertUser: (data: InsertUserData) => Promise<{
        id: string;
        email: string;
        password_hash: string;
        plan: string;
        stripe_customer_id: string | null;
        stripe_subscription_id: string | null;
        api_key: string;
        created_at: Date;
    }>;
};
export {};
//# sourceMappingURL=user.repository.d.ts.map