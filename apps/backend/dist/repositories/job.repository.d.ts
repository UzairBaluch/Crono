type InsertJobData = {
    user_id: string;
    name: string;
    url: string;
    schedule: string;
    method?: string;
    headers?: object;
    body?: string | null;
    timezone?: string;
    retry_count?: number;
};
type UpdateJobData = Partial<Omit<InsertJobData, "user_id">> & {
    status?: string;
};
export declare const jobRepository: {
    findManyByUserId: (_userId: string) => Promise<{
        status: string;
        name: string;
        id: string;
        created_at: Date;
        body: string | null;
        url: string;
        user_id: string;
        schedule: string;
        method: string;
        headers: import("@prisma/client/runtime/library").JsonValue;
        timezone: string;
        retry_count: number;
        bull_job_id: string | null;
        updated_at: Date;
    }[]>;
    countByUserId: (_userId: string) => Promise<number>;
    findByIdAndUserId: (_id: string, _userId: string) => Promise<{
        status: string;
        name: string;
        id: string;
        created_at: Date;
        body: string | null;
        url: string;
        user_id: string;
        schedule: string;
        method: string;
        headers: import("@prisma/client/runtime/library").JsonValue;
        timezone: string;
        retry_count: number;
        bull_job_id: string | null;
        updated_at: Date;
    } | null>;
    insertJob: (_data: InsertJobData) => Promise<{
        status: string;
        name: string;
        id: string;
        created_at: Date;
        body: string | null;
        url: string;
        user_id: string;
        schedule: string;
        method: string;
        headers: import("@prisma/client/runtime/library").JsonValue;
        timezone: string;
        retry_count: number;
        bull_job_id: string | null;
        updated_at: Date;
    }>;
    updateByIdAndUserId: (_id: string, _userId: string, _data: UpdateJobData) => Promise<{
        status: string;
        name: string;
        id: string;
        created_at: Date;
        body: string | null;
        url: string;
        user_id: string;
        schedule: string;
        method: string;
        headers: import("@prisma/client/runtime/library").JsonValue;
        timezone: string;
        retry_count: number;
        bull_job_id: string | null;
        updated_at: Date;
    }>;
    deleteByIdAndUserId: (_id: string, _userId: string) => Promise<{
        status: string;
        name: string;
        id: string;
        created_at: Date;
        body: string | null;
        url: string;
        user_id: string;
        schedule: string;
        method: string;
        headers: import("@prisma/client/runtime/library").JsonValue;
        timezone: string;
        retry_count: number;
        bull_job_id: string | null;
        updated_at: Date;
    }>;
};
export {};
//# sourceMappingURL=job.repository.d.ts.map