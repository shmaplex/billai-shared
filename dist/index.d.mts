import { z } from 'zod';
import superjson from 'superjson';
import { AppRouter as AppRouter$1 } from '@billai/api/src/router/_export-types';

declare const API_KEY_PREFIXES: {
    readonly TEST: "billai_test_";
    readonly LIVE: "billai_live_";
};

/**
 * Name of the authentication token cookie.
 * Used for storing the JWT in the browser/server.
 */
declare const COOKIE_NAME = "billai-token";
/**
 * Default cookie options to use whenever setting/removing the auth cookie.
 * You can use these with libraries like js-cookie or Next.js cookies.
 */
declare const COOKIE_OPTIONS: {
    path: string;
    secure: boolean;
    httpOnly: boolean;
    expires: number;
    sameSite: "lax";
};
/**
 * Helper function to get the auth cookie name
 */
declare const getAuthCookieName: () => string;

/** Billable AI usage metrics/features */
declare const AI_FEATURES: readonly ["TEXT_GENERATION", "IMAGE_GENERATION", "DATA_ANALYSIS", "TOKENS", "COMPUTE_TIME", "VRAM_USAGE", "API_CALL", "STORAGE", "OTHER"];

/**
 * Zod schema for the payload stored inside a JWT.
 * Uses UUIDs for userId and organizationId to match Prisma models.
 */
declare const JwtPayloadSchema: z.ZodObject<{
    userId: z.ZodString;
    role: z.ZodOptional<z.ZodString>;
    organizationId: z.ZodOptional<z.ZodString>;
    iat: z.ZodOptional<z.ZodNumber>;
    exp: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
/**
 * Type inferred from JwtPayloadSchema.
 */
type JwtPayload = z.infer<typeof JwtPayloadSchema>;
/**
 * Signs a JWT (JSON Web Token) for a given payload using JOSE.
 *
 * Reads `JWT_SECRET` and optional `JWT_EXPIRES_IN` from environment variables.
 * Defaults `JWT_EXPIRES_IN` to "1h" if not set.
 *
 * @param {JwtPayload} payload - The data to encode in the token.
 * @returns {Promise<string>} A signed JWT string.
 *
 * @example
 * const token = await signJwt({ userId: "uuid", role: "USER" });
 */
declare function signJwt(payload: JwtPayload): Promise<string>;
/**
 * Verifies a JWT and returns its payload.
 *
 * Returns the decoded `JwtPayload` if valid, or `null` if invalid.
 *
 * @param {string} token - The JWT string to verify.
 * @returns {Promise<JwtPayload | null>} Decoded payload or `null` if invalid.
 *
 * @example
 * const payload = await verifyJwt(token);
 * if (payload) console.log(payload.userId, payload.role);
 */
declare function verifyJwt(token: string): Promise<JwtPayload | null>;

/**
 * Lightweight JWT decoder for Edge/Browser-safe environments.
 * ❗ Does NOT verify the signature — use only for client-side checks
 * or route guarding, not for secure authentication.
 *
 * @param token - JWT string to decode
 * @returns Parsed JWT payload if valid, otherwise `null`
 *
 * @example
 * const payload = decodeJwt(token);
 * if (payload?.userId) {
 *   // Allow route access
 * }
 */
declare function decodeJwt(token: string): JwtPayload | null;

/**
 * Base schema — core fields for Alert
 */
declare const AlertBaseSchema: z.ZodObject<{
    id: z.ZodUUID;
    userId: z.ZodUUID;
    appId: z.ZodNullable<z.ZodOptional<z.ZodUUID>>;
    type: z.ZodString;
    message: z.ZodString;
    triggeredAt: z.ZodDate;
    isRead: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>;
/**
 * Reference schema — minimal for embedding in other models
 */
declare const AlertReferenceSchema: z.ZodObject<{
    type: z.ZodString;
    message: z.ZodString;
    userId: z.ZodUUID;
    id: z.ZodUUID;
    appId: z.ZodNullable<z.ZodOptional<z.ZodUUID>>;
    triggeredAt: z.ZodDate;
    isRead: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>;
/**
 * Detailed schema — includes nested relationships
 */
declare const AlertDetailedSchema: z.ZodObject<{
    id: z.ZodUUID;
    userId: z.ZodUUID;
    appId: z.ZodNullable<z.ZodOptional<z.ZodUUID>>;
    type: z.ZodString;
    message: z.ZodString;
    triggeredAt: z.ZodDate;
    isRead: z.ZodDefault<z.ZodBoolean>;
    user: z.ZodLazy<z.ZodObject<{
        organizationId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
        id: z.ZodUUID;
        email: z.ZodEmail;
        fullName: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        roleId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
    }, z.core.$strip>>;
    app: z.ZodNullable<z.ZodOptional<z.ZodLazy<z.ZodObject<{
        id: z.ZodUUID;
        name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        ownerId: z.ZodOptional<z.ZodString>;
        organizationId: z.ZodOptional<z.ZodString>;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
        deletedAt: z.ZodOptional<z.ZodDate>;
        isActive: z.ZodDefault<z.ZodBoolean>;
        owner: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            organizationId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
            id: z.ZodUUID;
            email: z.ZodEmail;
            fullName: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            roleId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
        }, z.core.$strip>>>;
        organization: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            id: z.ZodUUID;
            name: z.ZodString;
            domain: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, z.core.$strip>>>;
    }, z.core.$strip>>>>;
}, z.core.$strip>;
type AlertBase = z.infer<typeof AlertBaseSchema>;
type AlertReference = z.infer<typeof AlertReferenceSchema>;
type AlertDetailed = z.infer<typeof AlertDetailedSchema>;

/**
 * Base schema — core fields for AllowedOrigin
 */
declare const AllowedOriginBaseSchema: z.ZodObject<{
    id: z.ZodUUID;
    organizationId: z.ZodUUID;
    origin: z.ZodString;
    createdAt: z.ZodDate;
}, z.core.$strip>;
/**
 * Reference schema — minimal for embedding in other models
 */
declare const AllowedOriginReferenceSchema: z.ZodObject<{
    organizationId: z.ZodUUID;
    id: z.ZodUUID;
    createdAt: z.ZodDate;
    origin: z.ZodString;
}, z.core.$strip>;
/**
 * Detailed schema — includes nested organization
 */
declare const AllowedOriginDetailedSchema: z.ZodObject<{
    id: z.ZodUUID;
    organizationId: z.ZodUUID;
    origin: z.ZodString;
    createdAt: z.ZodDate;
    organization: z.ZodNullable<z.ZodOptional<z.ZodLazy<z.ZodObject<{
        id: z.ZodUUID;
        name: z.ZodString;
        domain: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>>>>;
}, z.core.$strip>;
type AllowedOriginBase = z.infer<typeof AllowedOriginBaseSchema>;
type AllowedOriginReference = z.infer<typeof AllowedOriginReferenceSchema>;
type AllowedOriginDetailed = z.infer<typeof AllowedOriginDetailedSchema>;
/**
 * Input schemas
 */
declare const AddAllowedOriginInputSchema: z.ZodObject<{
    organizationId: z.ZodUUID;
    origin: z.ZodString;
}, z.core.$strip>;
type AddAllowedOriginInput = z.infer<typeof AddAllowedOriginInputSchema>;
declare const RemoveAllowedOriginInputSchema: z.ZodObject<{
    organizationId: z.ZodUUID;
    origin: z.ZodString;
}, z.core.$strip>;
type RemoveAllowedOriginInput = z.infer<typeof RemoveAllowedOriginInputSchema>;

declare const API_KEY_ENVIRONMENTS: {
    readonly LIVE: "live";
    readonly TEST: "test";
};
type ApiKeyEnvironment = (typeof API_KEY_ENVIRONMENTS)[keyof typeof API_KEY_ENVIRONMENTS];
/**
 * Base schema — core fields for ApiKey
 */
declare const ApiKeyBaseSchema: z.ZodObject<{
    id: z.ZodUUID;
    userId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
    keyPrefix: z.ZodString;
    hashedKey: z.ZodString;
    name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    environment: z.ZodDefault<z.ZodString>;
    revoked: z.ZodDefault<z.ZodBoolean>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, z.core.$strip>;
/**
 * Reference schema — minimal for embedding
 */
declare const ApiKeyReferenceSchema: z.ZodObject<{
    userId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
    id: z.ZodUUID;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    keyPrefix: z.ZodString;
    hashedKey: z.ZodString;
    environment: z.ZodDefault<z.ZodString>;
    revoked: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>;
/**
 * Detailed schema — includes nested relations
 */
declare const ApiKeyDetailedSchema: z.ZodObject<{
    id: z.ZodUUID;
    userId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
    keyPrefix: z.ZodString;
    hashedKey: z.ZodString;
    name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    environment: z.ZodDefault<z.ZodString>;
    revoked: z.ZodDefault<z.ZodBoolean>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    scopes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    expiresAt: z.ZodOptional<z.ZodNullable<z.ZodDate>>;
    lastUsedAt: z.ZodOptional<z.ZodNullable<z.ZodDate>>;
    user: z.ZodNullable<z.ZodOptional<z.ZodLazy<z.ZodObject<{
        organizationId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
        id: z.ZodUUID;
        email: z.ZodEmail;
        fullName: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        roleId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
    }, z.core.$strip>>>>;
    usageLogs: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodObject<{
        organizationId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        id: z.ZodUUID;
        createdAt: z.ZodDate;
        appId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        feature: z.ZodDefault<z.ZodEnum<{
            TEXT_GENERATION: "TEXT_GENERATION";
            IMAGE_GENERATION: "IMAGE_GENERATION";
            DATA_ANALYSIS: "DATA_ANALYSIS";
            TOKENS: "TOKENS";
            COMPUTE_TIME: "COMPUTE_TIME";
            VRAM_USAGE: "VRAM_USAGE";
            API_CALL: "API_CALL";
            STORAGE: "STORAGE";
            OTHER: "OTHER";
        }>>;
        usage: z.ZodNumber;
        billed: z.ZodDefault<z.ZodBoolean>;
        sessionId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>>>>;
    modelUsages: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodObject<{
        id: z.ZodUUID;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
        model: z.ZodString;
        vendor: z.ZodString;
        requestType: z.ZodString;
    }, z.core.$strip>>>>;
}, z.core.$strip>;
type ApiKeyBase = z.infer<typeof ApiKeyBaseSchema>;
type ApiKeyReference = z.infer<typeof ApiKeyReferenceSchema>;
type ApiKeyDetailed = z.infer<typeof ApiKeyDetailedSchema>;
type ApiKeyPrefix = (typeof API_KEY_PREFIXES)[keyof typeof API_KEY_PREFIXES];
declare const CreateApiKeyInputSchema: z.ZodObject<{
    userId: z.ZodUUID;
    name: z.ZodOptional<z.ZodString>;
    scopes: z.ZodOptional<z.ZodArray<z.ZodString>>;
    environment: z.ZodDefault<z.ZodEnum<{
        live: "live";
        test: "test";
    }>>;
}, z.core.$strip>;
type CreateApiKeyInput = z.infer<typeof CreateApiKeyInputSchema>;

/**
 * Base schema — core fields for App
 */
declare const AppBaseSchema: z.ZodObject<{
    id: z.ZodUUID;
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    ownerId: z.ZodOptional<z.ZodString>;
    organizationId: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    deletedAt: z.ZodOptional<z.ZodDate>;
    isActive: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>;
/**
 * Reference schema — minimal embedding of App
 */
declare const AppReferenceSchema: z.ZodObject<{
    id: z.ZodUUID;
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    ownerId: z.ZodOptional<z.ZodString>;
    organizationId: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    deletedAt: z.ZodOptional<z.ZodDate>;
    isActive: z.ZodDefault<z.ZodBoolean>;
    owner: z.ZodOptional<z.ZodLazy<z.ZodObject<{
        organizationId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
        id: z.ZodUUID;
        email: z.ZodEmail;
        fullName: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        roleId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
    }, z.core.$strip>>>;
    organization: z.ZodOptional<z.ZodLazy<z.ZodObject<{
        id: z.ZodUUID;
        name: z.ZodString;
        domain: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
/**
 * Detailed schema — includes nested full objects
 */
declare const AppDetailedSchema: z.ZodObject<{
    id: z.ZodUUID;
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    ownerId: z.ZodOptional<z.ZodString>;
    organizationId: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    deletedAt: z.ZodOptional<z.ZodDate>;
    isActive: z.ZodDefault<z.ZodBoolean>;
    owner: z.ZodOptional<z.ZodLazy<z.ZodObject<{
        id: z.ZodUUID;
        email: z.ZodEmail;
        password: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        fullName: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        phone: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        bio: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        title: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        authId: z.ZodString;
        provider: z.ZodString;
        isActive: z.ZodDefault<z.ZodBoolean>;
        isVerified: z.ZodDefault<z.ZodBoolean>;
        avatarUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        locale: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        timezone: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        language: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        roleId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
        organizationId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
        planId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
        deletedAt: z.ZodNullable<z.ZodOptional<z.ZodDate>>;
        role: z.ZodNullable<z.ZodOptional<z.ZodLazy<z.ZodObject<{
            id: z.ZodUUID;
            name: z.ZodString;
        }, z.core.$strip>>>>;
        organization: z.ZodNullable<z.ZodOptional<z.ZodLazy<z.ZodObject<{
            id: z.ZodUUID;
            name: z.ZodString;
            domain: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, z.core.$strip>>>>;
        plan: z.ZodNullable<z.ZodOptional<z.ZodLazy<z.ZodObject<{
            id: z.ZodUUID;
            name: z.ZodString;
            price: z.ZodNumber;
            maxUsage: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>>>>;
        sessions: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodObject<{
            userId: z.ZodUUID;
            id: z.ZodUUID;
            createdAt: z.ZodDate;
            expiresAt: z.ZodDate;
        }, z.core.$strip>>>>;
        invoices: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodObject<{
            id: z.ZodUUID;
            amount: z.ZodNumber;
            createdAt: z.ZodDate;
            currency: z.ZodString;
            paid: z.ZodBoolean;
        }, z.core.$strip>>>>;
        apiKeys: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodObject<{
            userId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
            id: z.ZodUUID;
            createdAt: z.ZodDate;
            updatedAt: z.ZodDate;
            name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            keyPrefix: z.ZodString;
            hashedKey: z.ZodString;
            environment: z.ZodDefault<z.ZodString>;
            revoked: z.ZodDefault<z.ZodBoolean>;
        }, z.core.$strip>>>>;
        auditLogs: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodObject<{
            id: z.ZodUUID;
            createdAt: z.ZodDate;
            action: z.ZodString;
        }, z.core.$strip>>>>;
        preferences: z.ZodNullable<z.ZodOptional<z.ZodLazy<z.ZodObject<{
            userId: z.ZodUUID;
            id: z.ZodUUID;
            emailNotifications: z.ZodDefault<z.ZodBoolean>;
            darkMode: z.ZodDefault<z.ZodBoolean>;
        }, z.core.$strip>>>>;
        mfaSettings: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodObject<{
            type: z.ZodString;
            id: z.ZodUUID;
            enabled: z.ZodDefault<z.ZodBoolean>;
        }, z.core.$strip>>>>;
        reviews: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodObject<{
            id: z.ZodUUID;
            status: z.ZodEnum<{
                PENDING: "PENDING";
                APPROVED: "APPROVED";
                REJECTED: "REJECTED";
            }>;
            resourceType: z.ZodString;
            resourceId: z.ZodString;
        }, z.core.$strip>>>>;
        modelUsages: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodObject<{
            id: z.ZodUUID;
            createdAt: z.ZodDate;
            updatedAt: z.ZodDate;
            model: z.ZodString;
            vendor: z.ZodString;
            requestType: z.ZodString;
        }, z.core.$strip>>>>;
        revenueSplits: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodObject<{
            id: z.ZodUUID;
            percent: z.ZodNumber;
        }, z.core.$strip>>>>;
        apps: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodObject<{
            id: z.ZodUUID;
            name: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            ownerId: z.ZodOptional<z.ZodString>;
            organizationId: z.ZodOptional<z.ZodString>;
            createdAt: z.ZodDate;
            updatedAt: z.ZodDate;
            deletedAt: z.ZodOptional<z.ZodDate>;
            isActive: z.ZodDefault<z.ZodBoolean>;
            owner: z.ZodOptional<z.ZodLazy<z.ZodObject<{
                organizationId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
                id: z.ZodUUID;
                email: z.ZodEmail;
                fullName: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                roleId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
            }, z.core.$strip>>>;
            organization: z.ZodOptional<z.ZodLazy<z.ZodObject<{
                id: z.ZodUUID;
                name: z.ZodString;
                domain: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            }, z.core.$strip>>>;
        }, z.core.$strip>>>>;
        alerts: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodObject<{
            type: z.ZodString;
            message: z.ZodString;
            userId: z.ZodUUID;
            id: z.ZodUUID;
            appId: z.ZodNullable<z.ZodOptional<z.ZodUUID>>;
            triggeredAt: z.ZodDate;
            isRead: z.ZodDefault<z.ZodBoolean>;
        }, z.core.$strip>>>>;
        appApiKeys: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodObject<{
            appId: z.ZodString;
            key: z.ZodString;
            createdByUserId: z.ZodOptional<z.ZodString>;
            expiresAt: z.ZodOptional<z.ZodDate>;
            id: z.ZodUUID;
            createdAt: z.ZodDate;
        }, z.core.$strip>>>>;
        usageLogs: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodObject<{
            organizationId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            id: z.ZodUUID;
            createdAt: z.ZodDate;
            appId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            feature: z.ZodDefault<z.ZodEnum<{
                TEXT_GENERATION: "TEXT_GENERATION";
                IMAGE_GENERATION: "IMAGE_GENERATION";
                DATA_ANALYSIS: "DATA_ANALYSIS";
                TOKENS: "TOKENS";
                COMPUTE_TIME: "COMPUTE_TIME";
                VRAM_USAGE: "VRAM_USAGE";
                API_CALL: "API_CALL";
                STORAGE: "STORAGE";
                OTHER: "OTHER";
            }>>;
            usage: z.ZodNumber;
            billed: z.ZodDefault<z.ZodBoolean>;
            sessionId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, z.core.$strip>>>>;
    }, z.core.$strip>>>;
    organization: z.ZodOptional<z.ZodLazy<z.ZodObject<{
        id: z.ZodUUID;
        name: z.ZodString;
        domain: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
        users: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodObject<{
            organizationId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
            id: z.ZodUUID;
            email: z.ZodEmail;
            fullName: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            roleId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
        }, z.core.$strip>>>>;
        apps: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodObject<{
            id: z.ZodUUID;
            name: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            ownerId: z.ZodOptional<z.ZodString>;
            organizationId: z.ZodOptional<z.ZodString>;
            createdAt: z.ZodDate;
            updatedAt: z.ZodDate;
            deletedAt: z.ZodOptional<z.ZodDate>;
            isActive: z.ZodDefault<z.ZodBoolean>;
            owner: z.ZodOptional<z.ZodLazy<z.ZodObject<{
                organizationId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
                id: z.ZodUUID;
                email: z.ZodEmail;
                fullName: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                roleId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
            }, z.core.$strip>>>;
            organization: z.ZodOptional<z.ZodLazy<z.ZodObject<{
                id: z.ZodUUID;
                name: z.ZodString;
                domain: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            }, z.core.$strip>>>;
        }, z.core.$strip>>>>;
        modelUsages: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodObject<{
            id: z.ZodUUID;
            createdAt: z.ZodDate;
            updatedAt: z.ZodDate;
            model: z.ZodString;
            vendor: z.ZodString;
            requestType: z.ZodString;
        }, z.core.$strip>>>>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
type AppBase = z.infer<typeof AppBaseSchema>;
type AppReference = z.infer<typeof AppReferenceSchema>;
type AppDetailed = z.infer<typeof AppDetailedSchema>;

/**
 * Base schema for AppApiKey
 * Contains the core fields for creation / updates
 */
declare const AppApiKeyBaseSchema: z.ZodObject<{
    appId: z.ZodString;
    key: z.ZodString;
    createdByUserId: z.ZodOptional<z.ZodString>;
    expiresAt: z.ZodOptional<z.ZodDate>;
}, z.core.$strip>;
type AppApiKeyBase = z.infer<typeof AppApiKeyBaseSchema>;
/**
 * Minimal / Reference schema for AppApiKey
 * Includes unique identifiers and timestamps
 */
declare const AppApiKeyReferenceSchema: z.ZodObject<{
    appId: z.ZodString;
    key: z.ZodString;
    createdByUserId: z.ZodOptional<z.ZodString>;
    expiresAt: z.ZodOptional<z.ZodDate>;
    id: z.ZodUUID;
    createdAt: z.ZodDate;
}, z.core.$strip>;
type AppApiKeyReference = z.infer<typeof AppApiKeyReferenceSchema>;
/**
 * Full / Detailed schema for AppApiKey
 * Includes nested references to related models
 */
declare const AppApiKeyDetailedSchema: z.ZodObject<{
    appId: z.ZodString;
    key: z.ZodString;
    createdByUserId: z.ZodOptional<z.ZodString>;
    expiresAt: z.ZodOptional<z.ZodDate>;
    id: z.ZodUUID;
    createdAt: z.ZodDate;
    app: z.ZodLazy<z.ZodObject<{
        id: z.ZodUUID;
        name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        ownerId: z.ZodOptional<z.ZodString>;
        organizationId: z.ZodOptional<z.ZodString>;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
        deletedAt: z.ZodOptional<z.ZodDate>;
        isActive: z.ZodDefault<z.ZodBoolean>;
        owner: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            organizationId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
            id: z.ZodUUID;
            email: z.ZodEmail;
            fullName: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            roleId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
        }, z.core.$strip>>>;
        organization: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            id: z.ZodUUID;
            name: z.ZodString;
            domain: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, z.core.$strip>>>;
    }, z.core.$strip>>;
    createdBy: z.ZodOptional<z.ZodLazy<z.ZodObject<{
        organizationId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
        id: z.ZodUUID;
        email: z.ZodEmail;
        fullName: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        roleId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
type AppApiKeyDetailed = z.infer<typeof AppApiKeyDetailedSchema>;

/**
 * Base schema for AppMetric
 * Contains the core fields for creation / updates
 */
declare const AppMetricBaseSchema: z.ZodObject<{
    appId: z.ZodString;
    metric: z.ZodString;
    value: z.ZodNumber;
    recordedAt: z.ZodOptional<z.ZodDate>;
}, z.core.$strip>;
type AppMetricBase = z.infer<typeof AppMetricBaseSchema>;
/**
 * Minimal / Reference schema for AppMetric
 * Includes unique identifiers
 */
declare const AppMetricReferenceSchema: z.ZodObject<{
    appId: z.ZodString;
    metric: z.ZodString;
    value: z.ZodNumber;
    id: z.ZodUUID;
    recordedAt: z.ZodDate;
}, z.core.$strip>;
type AppMetricReference = z.infer<typeof AppMetricReferenceSchema>;
/**
 * Full / Detailed schema for AppMetric
 * Includes nested app reference
 */
declare const AppMetricDetailedSchema: z.ZodObject<{
    appId: z.ZodString;
    metric: z.ZodString;
    value: z.ZodNumber;
    id: z.ZodUUID;
    recordedAt: z.ZodDate;
    app: z.ZodLazy<z.ZodObject<{
        id: z.ZodUUID;
        name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        ownerId: z.ZodOptional<z.ZodString>;
        organizationId: z.ZodOptional<z.ZodString>;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
        deletedAt: z.ZodOptional<z.ZodDate>;
        isActive: z.ZodDefault<z.ZodBoolean>;
        owner: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            organizationId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
            id: z.ZodUUID;
            email: z.ZodEmail;
            fullName: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            roleId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
        }, z.core.$strip>>>;
        organization: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            id: z.ZodUUID;
            name: z.ZodString;
            domain: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, z.core.$strip>>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
type AppMetricDetailed = z.infer<typeof AppMetricDetailedSchema>;

/**
 * Base Audit Log Schema — the core DB-level model.
 */
declare const AuditLogBaseSchema: z.ZodObject<{
    id: z.ZodUUID;
    userId: z.ZodUUID;
    action: z.ZodString;
    details: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodDate;
    appId: z.ZodOptional<z.ZodUUID>;
}, z.core.$strip>;
/**
 * Reference version — minimal fields for relational linking.
 * Used when embedding AuditLog references in other schemas.
 */
declare const AuditLogReferenceSchema: z.ZodObject<{
    id: z.ZodUUID;
    createdAt: z.ZodDate;
    action: z.ZodString;
}, z.core.$strip>;
/**
 * Populated (detailed) version — includes expanded relations.
 * Useful for API responses or admin dashboard views.
 */
declare const AuditLogDetailedSchema: z.ZodObject<{
    id: z.ZodUUID;
    userId: z.ZodUUID;
    action: z.ZodString;
    details: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodDate;
    appId: z.ZodOptional<z.ZodUUID>;
    user: z.ZodLazy<z.ZodObject<{
        organizationId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
        id: z.ZodUUID;
        email: z.ZodEmail;
        fullName: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        roleId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
    }, z.core.$strip>>;
    app: z.ZodOptional<z.ZodLazy<z.ZodObject<{
        id: z.ZodUUID;
        name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        ownerId: z.ZodOptional<z.ZodString>;
        organizationId: z.ZodOptional<z.ZodString>;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
        deletedAt: z.ZodOptional<z.ZodDate>;
        isActive: z.ZodDefault<z.ZodBoolean>;
        owner: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            organizationId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
            id: z.ZodUUID;
            email: z.ZodEmail;
            fullName: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            roleId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
        }, z.core.$strip>>>;
        organization: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            id: z.ZodUUID;
            name: z.ZodString;
            domain: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, z.core.$strip>>>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
type AuditLogBase = z.infer<typeof AuditLogBaseSchema>;
type AuditLogReference = z.infer<typeof AuditLogReferenceSchema>;
type AuditLogDetailed = z.infer<typeof AuditLogDetailedSchema>;

/** Auth response */
declare const AuthResponseSchema: z.ZodObject<{
    user: z.ZodLazy<z.ZodObject<{
        id: z.ZodUUID;
        email: z.ZodEmail;
        password: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        fullName: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        phone: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        bio: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        title: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        authId: z.ZodString;
        provider: z.ZodString;
        isActive: z.ZodDefault<z.ZodBoolean>;
        isVerified: z.ZodDefault<z.ZodBoolean>;
        avatarUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        locale: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        timezone: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        language: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        roleId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
        organizationId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
        planId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
        deletedAt: z.ZodNullable<z.ZodOptional<z.ZodDate>>;
        role: z.ZodNullable<z.ZodOptional<z.ZodLazy<z.ZodObject<{
            id: z.ZodUUID;
            name: z.ZodString;
        }, z.core.$strip>>>>;
        organization: z.ZodNullable<z.ZodOptional<z.ZodLazy<z.ZodObject<{
            id: z.ZodUUID;
            name: z.ZodString;
            domain: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, z.core.$strip>>>>;
        plan: z.ZodNullable<z.ZodOptional<z.ZodLazy<z.ZodObject<{
            id: z.ZodUUID;
            name: z.ZodString;
            price: z.ZodNumber;
            maxUsage: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>>>>;
        sessions: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodObject<{
            userId: z.ZodUUID;
            id: z.ZodUUID;
            createdAt: z.ZodDate;
            expiresAt: z.ZodDate;
        }, z.core.$strip>>>>;
        invoices: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodObject<{
            id: z.ZodUUID;
            amount: z.ZodNumber;
            createdAt: z.ZodDate;
            currency: z.ZodString;
            paid: z.ZodBoolean;
        }, z.core.$strip>>>>;
        apiKeys: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodObject<{
            userId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
            id: z.ZodUUID;
            createdAt: z.ZodDate;
            updatedAt: z.ZodDate;
            name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            keyPrefix: z.ZodString;
            hashedKey: z.ZodString;
            environment: z.ZodDefault<z.ZodString>;
            revoked: z.ZodDefault<z.ZodBoolean>;
        }, z.core.$strip>>>>;
        auditLogs: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodObject<{
            id: z.ZodUUID;
            createdAt: z.ZodDate;
            action: z.ZodString;
        }, z.core.$strip>>>>;
        preferences: z.ZodNullable<z.ZodOptional<z.ZodLazy<z.ZodObject<{
            userId: z.ZodUUID;
            id: z.ZodUUID;
            emailNotifications: z.ZodDefault<z.ZodBoolean>;
            darkMode: z.ZodDefault<z.ZodBoolean>;
        }, z.core.$strip>>>>;
        mfaSettings: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodObject<{
            type: z.ZodString;
            id: z.ZodUUID;
            enabled: z.ZodDefault<z.ZodBoolean>;
        }, z.core.$strip>>>>;
        reviews: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodObject<{
            id: z.ZodUUID;
            status: z.ZodEnum<{
                PENDING: "PENDING";
                APPROVED: "APPROVED";
                REJECTED: "REJECTED";
            }>;
            resourceType: z.ZodString;
            resourceId: z.ZodString;
        }, z.core.$strip>>>>;
        modelUsages: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodObject<{
            id: z.ZodUUID;
            createdAt: z.ZodDate;
            updatedAt: z.ZodDate;
            model: z.ZodString;
            vendor: z.ZodString;
            requestType: z.ZodString;
        }, z.core.$strip>>>>;
        revenueSplits: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodObject<{
            id: z.ZodUUID;
            percent: z.ZodNumber;
        }, z.core.$strip>>>>;
        apps: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodObject<{
            id: z.ZodUUID;
            name: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            ownerId: z.ZodOptional<z.ZodString>;
            organizationId: z.ZodOptional<z.ZodString>;
            createdAt: z.ZodDate;
            updatedAt: z.ZodDate;
            deletedAt: z.ZodOptional<z.ZodDate>;
            isActive: z.ZodDefault<z.ZodBoolean>;
            owner: z.ZodOptional<z.ZodLazy<z.ZodObject<{
                organizationId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
                id: z.ZodUUID;
                email: z.ZodEmail;
                fullName: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                roleId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
            }, z.core.$strip>>>;
            organization: z.ZodOptional<z.ZodLazy<z.ZodObject<{
                id: z.ZodUUID;
                name: z.ZodString;
                domain: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            }, z.core.$strip>>>;
        }, z.core.$strip>>>>;
        alerts: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodObject<{
            type: z.ZodString;
            message: z.ZodString;
            userId: z.ZodUUID;
            id: z.ZodUUID;
            appId: z.ZodNullable<z.ZodOptional<z.ZodUUID>>;
            triggeredAt: z.ZodDate;
            isRead: z.ZodDefault<z.ZodBoolean>;
        }, z.core.$strip>>>>;
        appApiKeys: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodObject<{
            appId: z.ZodString;
            key: z.ZodString;
            createdByUserId: z.ZodOptional<z.ZodString>;
            expiresAt: z.ZodOptional<z.ZodDate>;
            id: z.ZodUUID;
            createdAt: z.ZodDate;
        }, z.core.$strip>>>>;
        usageLogs: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodObject<{
            organizationId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            id: z.ZodUUID;
            createdAt: z.ZodDate;
            appId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            feature: z.ZodDefault<z.ZodEnum<{
                TEXT_GENERATION: "TEXT_GENERATION";
                IMAGE_GENERATION: "IMAGE_GENERATION";
                DATA_ANALYSIS: "DATA_ANALYSIS";
                TOKENS: "TOKENS";
                COMPUTE_TIME: "COMPUTE_TIME";
                VRAM_USAGE: "VRAM_USAGE";
                API_CALL: "API_CALL";
                STORAGE: "STORAGE";
                OTHER: "OTHER";
            }>>;
            usage: z.ZodNumber;
            billed: z.ZodDefault<z.ZodBoolean>;
            sessionId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, z.core.$strip>>>>;
    }, z.core.$strip>>;
    token: z.ZodString;
}, z.core.$strip>;
/** Input schema for user registration */
declare const UserRegisterInputSchema: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
    origin: z.ZodOptional<z.ZodString>;
    organizationId: z.ZodOptional<z.ZodUUID>;
}, z.core.$strip>;
/** Input schema for user registration */
declare const UserLoginInputSchema: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
    origin: z.ZodOptional<z.ZodString>;
    organizationId: z.ZodOptional<z.ZodUUID>;
}, z.core.$strip>;
/** Schema for the result of a verified JWT token */
declare const VerifiedTokenResultSchema: z.ZodObject<{
    userId: z.ZodString;
    organizationId: z.ZodNullable<z.ZodString>;
    planId: z.ZodNullable<z.ZodString>;
    exp: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
type VerifiedTokenResult = z.infer<typeof VerifiedTokenResultSchema>;
type UserRegisterInput = z.infer<typeof UserRegisterInputSchema>;
type UserLoginInput = z.infer<typeof UserLoginInputSchema>;
type AuthResponse = z.infer<typeof AuthResponseSchema>;

/**
 * Base ChangeLog Schema — represents the core DB record.
 */
declare const ChangeLogBaseSchema: z.ZodObject<{
    id: z.ZodUUID;
    tableName: z.ZodString;
    recordId: z.ZodString;
    appId: z.ZodOptional<z.ZodUUID>;
    action: z.ZodString;
    changedBy: z.ZodOptional<z.ZodUUID>;
    before: z.ZodOptional<z.ZodAny>;
    after: z.ZodOptional<z.ZodAny>;
    createdAt: z.ZodDate;
}, z.core.$strip>;
/**
 * Reference version — minimal fields for relational linking.
 * Used when embedding ChangeLog summaries in other entities.
 */
declare const ChangeLogReferenceSchema: z.ZodObject<{
    id: z.ZodUUID;
    createdAt: z.ZodDate;
    action: z.ZodString;
    tableName: z.ZodString;
    recordId: z.ZodString;
}, z.core.$strip>;
/**
 * Detailed version — includes expanded relations and full change diff.
 * Used for API responses or admin log inspection views.
 */
declare const ChangeLogDetailedSchema: z.ZodObject<{
    id: z.ZodUUID;
    tableName: z.ZodString;
    recordId: z.ZodString;
    appId: z.ZodOptional<z.ZodUUID>;
    action: z.ZodString;
    changedBy: z.ZodOptional<z.ZodUUID>;
    before: z.ZodOptional<z.ZodAny>;
    after: z.ZodOptional<z.ZodAny>;
    createdAt: z.ZodDate;
    app: z.ZodOptional<z.ZodObject<{
        id: z.ZodUUID;
        name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        ownerId: z.ZodOptional<z.ZodString>;
        organizationId: z.ZodOptional<z.ZodString>;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
        deletedAt: z.ZodOptional<z.ZodDate>;
        isActive: z.ZodDefault<z.ZodBoolean>;
        owner: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            organizationId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
            id: z.ZodUUID;
            email: z.ZodEmail;
            fullName: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            roleId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
        }, z.core.$strip>>>;
        organization: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            id: z.ZodUUID;
            name: z.ZodString;
            domain: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, z.core.$strip>>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
type ChangeLogBase = z.infer<typeof ChangeLogBaseSchema>;
type ChangeLogReference = z.infer<typeof ChangeLogReferenceSchema>;
type ChangeLogDetailed = z.infer<typeof ChangeLogDetailedSchema>;

/**
 * Base Charge Schema — represents the core persisted entity.
 */
declare const ChargeBaseSchema: z.ZodObject<{
    id: z.ZodUUID;
    invoiceId: z.ZodOptional<z.ZodUUID>;
    endUserId: z.ZodOptional<z.ZodUUID>;
    appId: z.ZodUUID;
    amount: z.ZodNumber;
    status: z.ZodEnum<{
        PENDING: "PENDING";
        PAID: "PAID";
        FAILED: "FAILED";
        REFUNDED: "REFUNDED";
    }>;
    createdAt: z.ZodDate;
    paidAt: z.ZodOptional<z.ZodDate>;
    deletedAt: z.ZodOptional<z.ZodDate>;
}, z.core.$strip>;
/**
 * Reference version — minimal for nested use in related entities.
 */
declare const ChargeReferenceSchema: z.ZodObject<{
    id: z.ZodUUID;
    amount: z.ZodNumber;
    createdAt: z.ZodDate;
    appId: z.ZodUUID;
    status: z.ZodEnum<{
        PENDING: "PENDING";
        PAID: "PAID";
        FAILED: "FAILED";
        REFUNDED: "REFUNDED";
    }>;
}, z.core.$strip>;
/**
 * Detailed version — full entity with expanded relational references.
 */
declare const ChargeDetailedSchema: z.ZodObject<{
    id: z.ZodUUID;
    invoiceId: z.ZodOptional<z.ZodUUID>;
    endUserId: z.ZodOptional<z.ZodUUID>;
    appId: z.ZodUUID;
    amount: z.ZodNumber;
    status: z.ZodEnum<{
        PENDING: "PENDING";
        PAID: "PAID";
        FAILED: "FAILED";
        REFUNDED: "REFUNDED";
    }>;
    createdAt: z.ZodDate;
    paidAt: z.ZodOptional<z.ZodDate>;
    deletedAt: z.ZodOptional<z.ZodDate>;
    invoice: z.ZodOptional<z.ZodLazy<z.ZodObject<{
        id: z.ZodUUID;
        amount: z.ZodNumber;
        createdAt: z.ZodDate;
        currency: z.ZodString;
        paid: z.ZodBoolean;
    }, z.core.$strip>>>;
    endUser: z.ZodOptional<z.ZodLazy<z.ZodObject<{
        id: z.ZodUUID;
        appId: z.ZodUUID;
        email: z.ZodOptional<z.ZodEmail>;
        externalId: z.ZodString;
    }, z.core.$strip>>>;
    app: z.ZodLazy<z.ZodObject<{
        id: z.ZodUUID;
        name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        ownerId: z.ZodOptional<z.ZodString>;
        organizationId: z.ZodOptional<z.ZodString>;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
        deletedAt: z.ZodOptional<z.ZodDate>;
        isActive: z.ZodDefault<z.ZodBoolean>;
        owner: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            organizationId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
            id: z.ZodUUID;
            email: z.ZodEmail;
            fullName: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            roleId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
        }, z.core.$strip>>>;
        organization: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            id: z.ZodUUID;
            name: z.ZodString;
            domain: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, z.core.$strip>>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
type ChargeBase = z.infer<typeof ChargeBaseSchema>;
type ChargeReference = z.infer<typeof ChargeReferenceSchema>;
type ChargeDetailed = z.infer<typeof ChargeDetailedSchema>;

/**
 * Base EndUser Schema — core database representation.
 */
declare const EndUserBaseSchema: z.ZodObject<{
    id: z.ZodUUID;
    appId: z.ZodUUID;
    externalId: z.ZodString;
    email: z.ZodOptional<z.ZodEmail>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    deletedAt: z.ZodOptional<z.ZodDate>;
}, z.core.$strip>;
/**
 * Reference version — for lightweight embedding.
 */
declare const EndUserReferenceSchema: z.ZodObject<{
    id: z.ZodUUID;
    appId: z.ZodUUID;
    email: z.ZodOptional<z.ZodEmail>;
    externalId: z.ZodString;
}, z.core.$strip>;
/**
 * Detailed version — includes relational references.
 */
declare const EndUserDetailedSchema: z.ZodObject<{
    id: z.ZodUUID;
    appId: z.ZodUUID;
    externalId: z.ZodString;
    email: z.ZodOptional<z.ZodEmail>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    deletedAt: z.ZodOptional<z.ZodDate>;
    app: z.ZodOptional<z.ZodLazy<z.ZodObject<{
        id: z.ZodUUID;
        name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        ownerId: z.ZodOptional<z.ZodString>;
        organizationId: z.ZodOptional<z.ZodString>;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
        deletedAt: z.ZodOptional<z.ZodDate>;
        isActive: z.ZodDefault<z.ZodBoolean>;
        owner: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            organizationId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
            id: z.ZodUUID;
            email: z.ZodEmail;
            fullName: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            roleId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
        }, z.core.$strip>>>;
        organization: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            id: z.ZodUUID;
            name: z.ZodString;
            domain: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, z.core.$strip>>>;
    }, z.core.$strip>>>;
    invoices: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodObject<{
        id: z.ZodUUID;
        amount: z.ZodNumber;
        createdAt: z.ZodDate;
        currency: z.ZodString;
        paid: z.ZodBoolean;
    }, z.core.$strip>>>>;
    charges: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodObject<{
        id: z.ZodUUID;
        amount: z.ZodNumber;
        createdAt: z.ZodDate;
        appId: z.ZodUUID;
        status: z.ZodEnum<{
            PENDING: "PENDING";
            PAID: "PAID";
            FAILED: "FAILED";
            REFUNDED: "REFUNDED";
        }>;
    }, z.core.$strip>>>>;
    usageLogs: z.ZodOptional<z.ZodArray<z.ZodAny>>;
    eventLogs: z.ZodOptional<z.ZodArray<z.ZodAny>>;
    usageLimits: z.ZodOptional<z.ZodArray<z.ZodAny>>;
    sdkLogs: z.ZodOptional<z.ZodArray<z.ZodAny>>;
}, z.core.$strip>;
type EndUserBase = z.infer<typeof EndUserBaseSchema>;
type EndUserReference = z.infer<typeof EndUserReferenceSchema>;
type EndUserDetailed = z.infer<typeof EndUserDetailedSchema>;

/**
 * Base EventLog Schema — core database structure.
 */
declare const EventLogBaseSchema: z.ZodObject<{
    id: z.ZodUUID;
    appId: z.ZodUUID;
    endUserId: z.ZodOptional<z.ZodUUID>;
    type: z.ZodString;
    payload: z.ZodAny;
    createdAt: z.ZodDate;
}, z.core.$strip>;
/**
 * Reference version — for lightweight embedding in other entities.
 */
declare const EventLogReferenceSchema: z.ZodObject<{
    type: z.ZodString;
    id: z.ZodUUID;
    createdAt: z.ZodDate;
    appId: z.ZodUUID;
    endUserId: z.ZodOptional<z.ZodUUID>;
}, z.core.$strip>;
/**
 * Detailed version — includes relational references.
 */
declare const EventLogDetailedSchema: z.ZodObject<{
    id: z.ZodUUID;
    appId: z.ZodUUID;
    endUserId: z.ZodOptional<z.ZodUUID>;
    type: z.ZodString;
    payload: z.ZodAny;
    createdAt: z.ZodDate;
    app: z.ZodLazy<z.ZodObject<{
        id: z.ZodUUID;
        name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        ownerId: z.ZodOptional<z.ZodString>;
        organizationId: z.ZodOptional<z.ZodString>;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
        deletedAt: z.ZodOptional<z.ZodDate>;
        isActive: z.ZodDefault<z.ZodBoolean>;
        owner: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            organizationId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
            id: z.ZodUUID;
            email: z.ZodEmail;
            fullName: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            roleId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
        }, z.core.$strip>>>;
        organization: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            id: z.ZodUUID;
            name: z.ZodString;
            domain: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, z.core.$strip>>>;
    }, z.core.$strip>>;
    endUser: z.ZodOptional<z.ZodLazy<z.ZodObject<{
        id: z.ZodUUID;
        appId: z.ZodUUID;
        email: z.ZodOptional<z.ZodEmail>;
        externalId: z.ZodString;
    }, z.core.$strip>>>;
}, z.core.$strip>;
type EventLogBase = z.infer<typeof EventLogBaseSchema>;
type EventLogReference = z.infer<typeof EventLogReferenceSchema>;
type EventLogDetailed = z.infer<typeof EventLogDetailedSchema>;

/**
 * Base FeatureFlag schema — defines the core data structure.
 */
declare const FeatureFlagBaseSchema: z.ZodObject<{
    id: z.ZodUUID;
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    isActive: z.ZodBoolean;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    appId: z.ZodOptional<z.ZodUUID>;
}, z.core.$strip>;
/**
 * Reference schema — lightweight version for embedding.
 */
declare const FeatureFlagReferenceSchema: z.ZodObject<{
    id: z.ZodUUID;
    appId: z.ZodOptional<z.ZodUUID>;
    name: z.ZodString;
    isActive: z.ZodBoolean;
}, z.core.$strip>;
/**
 * Detailed schema — includes full relations.
 */
declare const FeatureFlagDetailedSchema: z.ZodObject<{
    id: z.ZodUUID;
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    isActive: z.ZodBoolean;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    appId: z.ZodOptional<z.ZodUUID>;
    app: z.ZodOptional<z.ZodLazy<z.ZodObject<{
        id: z.ZodUUID;
        name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        ownerId: z.ZodOptional<z.ZodString>;
        organizationId: z.ZodOptional<z.ZodString>;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
        deletedAt: z.ZodOptional<z.ZodDate>;
        isActive: z.ZodDefault<z.ZodBoolean>;
        owner: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            organizationId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
            id: z.ZodUUID;
            email: z.ZodEmail;
            fullName: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            roleId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
        }, z.core.$strip>>>;
        organization: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            id: z.ZodUUID;
            name: z.ZodString;
            domain: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, z.core.$strip>>>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
type FeatureFlagBase = z.infer<typeof FeatureFlagBaseSchema>;
type FeatureFlagReference = z.infer<typeof FeatureFlagReferenceSchema>;
type FeatureFlagDetailed = z.infer<typeof FeatureFlagDetailedSchema>;

/**
 * Base Forecast schema — defines core structure.
 */
declare const ForecastBaseSchema: z.ZodObject<{
    id: z.ZodUUID;
    appId: z.ZodUUID;
    metric: z.ZodString;
    predicted: z.ZodNumber;
    startDate: z.ZodDate;
    endDate: z.ZodDate;
    createdAt: z.ZodDate;
}, z.core.$strip>;
/**
 * Reference schema — lightweight version for embedding in other models.
 */
declare const ForecastReferenceSchema: z.ZodObject<{
    id: z.ZodUUID;
    startDate: z.ZodDate;
    endDate: z.ZodDate;
    metric: z.ZodString;
    predicted: z.ZodNumber;
}, z.core.$strip>;
/**
 * Detailed schema — includes relations.
 */
declare const ForecastDetailedSchema: z.ZodObject<{
    id: z.ZodUUID;
    appId: z.ZodUUID;
    metric: z.ZodString;
    predicted: z.ZodNumber;
    startDate: z.ZodDate;
    endDate: z.ZodDate;
    createdAt: z.ZodDate;
    app: z.ZodLazy<z.ZodObject<{
        id: z.ZodUUID;
        name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        ownerId: z.ZodOptional<z.ZodString>;
        organizationId: z.ZodOptional<z.ZodString>;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
        deletedAt: z.ZodOptional<z.ZodDate>;
        isActive: z.ZodDefault<z.ZodBoolean>;
        owner: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            organizationId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
            id: z.ZodUUID;
            email: z.ZodEmail;
            fullName: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            roleId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
        }, z.core.$strip>>>;
        organization: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            id: z.ZodUUID;
            name: z.ZodString;
            domain: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, z.core.$strip>>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
type ForecastBase = z.infer<typeof ForecastBaseSchema>;
type ForecastReference = z.infer<typeof ForecastReferenceSchema>;
type ForecastDetailed = z.infer<typeof ForecastDetailedSchema>;

/**
 * Represents a globally allowed CORS origin for the Bill AI platform.
 * These origins apply across all organizations and apps.
 */
declare const GlobalAllowedOriginSchema: z.ZodObject<{
    id: z.ZodUUID;
    origin: z.ZodUnion<[z.ZodURL, z.ZodString]>;
    createdAt: z.ZodDate;
}, z.core.$strip>;
/**
 * A more detailed version used internally with computed or relational data.
 */
declare const GlobalAllowedOriginDetailedSchema: z.ZodObject<{
    id: z.ZodUUID;
    origin: z.ZodUnion<[z.ZodURL, z.ZodString]>;
    createdAt: z.ZodDate;
    referencedBy: z.ZodOptional<z.ZodArray<z.ZodObject<{
        organizationId: z.ZodNullable<z.ZodUUID>;
        organizationName: z.ZodNullable<z.ZodString>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
type GlobalAllowedOrigin = z.infer<typeof GlobalAllowedOriginSchema>;
type GlobalAllowedOriginDetailed = z.infer<typeof GlobalAllowedOriginDetailedSchema>;

/**
 * Base Integration schema — defines core structure.
 */
declare const IntegrationBaseSchema: z.ZodObject<{
    id: z.ZodUUID;
    appId: z.ZodUUID;
    type: z.ZodString;
    config: z.ZodAny;
    createdAt: z.ZodDate;
}, z.core.$strip>;
/**
 * Reference schema — lightweight version for embedding in other models.
 */
declare const IntegrationReferenceSchema: z.ZodObject<{
    type: z.ZodString;
    id: z.ZodUUID;
}, z.core.$strip>;
/**
 * Detailed schema — includes relations.
 */
declare const IntegrationDetailedSchema: z.ZodObject<{
    id: z.ZodUUID;
    appId: z.ZodUUID;
    type: z.ZodString;
    config: z.ZodAny;
    createdAt: z.ZodDate;
    app: z.ZodLazy<z.ZodObject<{
        id: z.ZodUUID;
        name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        ownerId: z.ZodOptional<z.ZodString>;
        organizationId: z.ZodOptional<z.ZodString>;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
        deletedAt: z.ZodOptional<z.ZodDate>;
        isActive: z.ZodDefault<z.ZodBoolean>;
        owner: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            organizationId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
            id: z.ZodUUID;
            email: z.ZodEmail;
            fullName: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            roleId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
        }, z.core.$strip>>>;
        organization: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            id: z.ZodUUID;
            name: z.ZodString;
            domain: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, z.core.$strip>>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
type IntegrationBase = z.infer<typeof IntegrationBaseSchema>;
type IntegrationReference = z.infer<typeof IntegrationReferenceSchema>;
type IntegrationDetailed = z.infer<typeof IntegrationDetailedSchema>;

/**
 * Base Invoice schema — defines core structure.
 */
declare const InvoiceBaseSchema: z.ZodObject<{
    id: z.ZodUUID;
    userId: z.ZodUUID;
    appId: z.ZodOptional<z.ZodUUID>;
    endUserId: z.ZodOptional<z.ZodUUID>;
    amount: z.ZodNumber;
    currency: z.ZodString;
    paid: z.ZodBoolean;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    dueDate: z.ZodOptional<z.ZodDate>;
    paidAt: z.ZodOptional<z.ZodDate>;
    deletedAt: z.ZodOptional<z.ZodDate>;
}, z.core.$strip>;
/**
 * Reference schema — lightweight version for embedding in other models.
 */
declare const InvoiceReferenceSchema: z.ZodObject<{
    id: z.ZodUUID;
    amount: z.ZodNumber;
    createdAt: z.ZodDate;
    currency: z.ZodString;
    paid: z.ZodBoolean;
}, z.core.$strip>;
/**
 * Detailed schema — includes relations.
 */
declare const InvoiceDetailedSchema: z.ZodObject<{
    id: z.ZodUUID;
    userId: z.ZodUUID;
    appId: z.ZodOptional<z.ZodUUID>;
    endUserId: z.ZodOptional<z.ZodUUID>;
    amount: z.ZodNumber;
    currency: z.ZodString;
    paid: z.ZodBoolean;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    dueDate: z.ZodOptional<z.ZodDate>;
    paidAt: z.ZodOptional<z.ZodDate>;
    deletedAt: z.ZodOptional<z.ZodDate>;
    user: z.ZodOptional<z.ZodLazy<z.ZodObject<{
        organizationId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
        id: z.ZodUUID;
        email: z.ZodEmail;
        fullName: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        roleId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
    }, z.core.$strip>>>;
    app: z.ZodOptional<z.ZodLazy<z.ZodObject<{
        id: z.ZodUUID;
        name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        ownerId: z.ZodOptional<z.ZodString>;
        organizationId: z.ZodOptional<z.ZodString>;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
        deletedAt: z.ZodOptional<z.ZodDate>;
        isActive: z.ZodDefault<z.ZodBoolean>;
        owner: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            organizationId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
            id: z.ZodUUID;
            email: z.ZodEmail;
            fullName: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            roleId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
        }, z.core.$strip>>>;
        organization: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            id: z.ZodUUID;
            name: z.ZodString;
            domain: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, z.core.$strip>>>;
    }, z.core.$strip>>>;
    endUser: z.ZodOptional<z.ZodLazy<z.ZodObject<{
        id: z.ZodUUID;
        appId: z.ZodUUID;
        email: z.ZodOptional<z.ZodEmail>;
        externalId: z.ZodString;
    }, z.core.$strip>>>;
    items: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodObject<{
        id: z.ZodUUID;
        description: z.ZodString;
        amount: z.ZodNumber;
        quantity: z.ZodDefault<z.ZodNumber>;
    }, z.core.$strip>>>>;
    charges: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodObject<{
        id: z.ZodUUID;
        amount: z.ZodNumber;
        createdAt: z.ZodDate;
        appId: z.ZodUUID;
        status: z.ZodEnum<{
            PENDING: "PENDING";
            PAID: "PAID";
            FAILED: "FAILED";
            REFUNDED: "REFUNDED";
        }>;
    }, z.core.$strip>>>>;
}, z.core.$strip>;
type InvoiceBase = z.infer<typeof InvoiceBaseSchema>;
type InvoiceReference = z.infer<typeof InvoiceReferenceSchema>;
type InvoiceDetailed = z.infer<typeof InvoiceDetailedSchema>;

/**
 * Base InvoiceItem schema — core fields
 */
declare const InvoiceItemBaseSchema: z.ZodObject<{
    id: z.ZodUUID;
    invoiceId: z.ZodUUID;
    description: z.ZodString;
    amount: z.ZodNumber;
    quantity: z.ZodDefault<z.ZodNumber>;
    createdAt: z.ZodDate;
}, z.core.$strip>;
/**
 * Reference schema — lightweight version for embedding in other models
 */
declare const InvoiceItemReferenceSchema: z.ZodObject<{
    id: z.ZodUUID;
    description: z.ZodString;
    amount: z.ZodNumber;
    quantity: z.ZodDefault<z.ZodNumber>;
}, z.core.$strip>;
/**
 * Detailed schema — includes relations
 */
declare const InvoiceItemDetailedSchema: z.ZodObject<{
    id: z.ZodUUID;
    invoiceId: z.ZodUUID;
    description: z.ZodString;
    amount: z.ZodNumber;
    quantity: z.ZodDefault<z.ZodNumber>;
    createdAt: z.ZodDate;
    invoice: z.ZodOptional<z.ZodLazy<z.ZodObject<{
        id: z.ZodUUID;
        amount: z.ZodNumber;
        createdAt: z.ZodDate;
        currency: z.ZodString;
        paid: z.ZodBoolean;
    }, z.core.$strip>>>;
}, z.core.$strip>;
type InvoiceItemBase = z.infer<typeof InvoiceItemBaseSchema>;
type InvoiceItemReference = z.infer<typeof InvoiceItemReferenceSchema>;
type InvoiceItemDetailed = z.infer<typeof InvoiceItemDetailedSchema>;

/**
 * Base MFA schema — core fields
 */
declare const MFABaseSchema: z.ZodObject<{
    id: z.ZodUUID;
    userId: z.ZodUUID;
    type: z.ZodString;
    secret: z.ZodString;
    enabled: z.ZodDefault<z.ZodBoolean>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, z.core.$strip>;
/**
 * Reference schema — lightweight version for embedding
 */
declare const MFAReferenceSchema: z.ZodObject<{
    type: z.ZodString;
    id: z.ZodUUID;
    enabled: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>;
/**
 * Detailed schema — includes relations
 */
declare const MFADetailedSchema: z.ZodObject<{
    id: z.ZodUUID;
    userId: z.ZodUUID;
    type: z.ZodString;
    secret: z.ZodString;
    enabled: z.ZodDefault<z.ZodBoolean>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    user: z.ZodOptional<z.ZodLazy<z.ZodObject<{
        organizationId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
        id: z.ZodUUID;
        email: z.ZodEmail;
        fullName: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        roleId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
type MFABase = z.infer<typeof MFABaseSchema>;
type MFAReference = z.infer<typeof MFAReferenceSchema>;
type MFADetailed = z.infer<typeof MFADetailedSchema>;

/**
 * SessionMetrics — latency metrics for a model usage session
 */
declare const SessionMetricsSchema: z.ZodObject<{
    count: z.ZodDefault<z.ZodNumber>;
    avgLatencyMs: z.ZodDefault<z.ZodNumber>;
    p50LatencyMs: z.ZodDefault<z.ZodNumber>;
    p90LatencyMs: z.ZodDefault<z.ZodNumber>;
    p99LatencyMs: z.ZodDefault<z.ZodNumber>;
}, z.core.$strip>;
type SessionMetrics = z.infer<typeof SessionMetricsSchema>;
/**
 * CountMetrics — success/failure count tracking
 */
declare const CountMetricsSchema: z.ZodObject<{
    successCount: z.ZodDefault<z.ZodNumber>;
    failureCount: z.ZodDefault<z.ZodNumber>;
}, z.core.$strip>;
type CountMetrics = z.infer<typeof CountMetricsSchema>;
/**
 * Base schema — core fields for ModelUsage
 */
declare const ModelUsageBaseSchema: z.ZodObject<{
    id: z.ZodUUID;
    userId: z.ZodOptional<z.ZodUUID>;
    organizationId: z.ZodOptional<z.ZodUUID>;
    apiKeyId: z.ZodOptional<z.ZodUUID>;
    appId: z.ZodOptional<z.ZodUUID>;
    model: z.ZodString;
    vendor: z.ZodString;
    modelVersion: z.ZodOptional<z.ZodString>;
    requestType: z.ZodString;
    usageCount: z.ZodDefault<z.ZodNumber>;
    success: z.ZodDefault<z.ZodBoolean>;
    successCount: z.ZodDefault<z.ZodNumber>;
    failureCount: z.ZodDefault<z.ZodNumber>;
    avgLatencyMs: z.ZodOptional<z.ZodNumber>;
    p50LatencyMs: z.ZodOptional<z.ZodNumber>;
    p90LatencyMs: z.ZodOptional<z.ZodNumber>;
    p99LatencyMs: z.ZodOptional<z.ZodNumber>;
    latencyMs: z.ZodOptional<z.ZodNumber>;
    throughput: z.ZodOptional<z.ZodNumber>;
    queueTimeMs: z.ZodOptional<z.ZodNumber>;
    errorType: z.ZodOptional<z.ZodString>;
    retryCount: z.ZodOptional<z.ZodNumber>;
    region: z.ZodOptional<z.ZodString>;
    promptLengthTokens: z.ZodOptional<z.ZodNumber>;
    responseLengthTokens: z.ZodOptional<z.ZodNumber>;
    unitCost: z.ZodOptional<z.ZodNumber>;
    totalCost: z.ZodOptional<z.ZodNumber>;
    billed: z.ZodDefault<z.ZodBoolean>;
    discountApplied: z.ZodOptional<z.ZodNumber>;
    planTier: z.ZodOptional<z.ZodString>;
    temperature: z.ZodOptional<z.ZodNumber>;
    maxTokens: z.ZodOptional<z.ZodNumber>;
    totalTokens: z.ZodOptional<z.ZodNumber>;
    topP: z.ZodOptional<z.ZodNumber>;
    stopSequences: z.ZodOptional<z.ZodArray<z.ZodString>>;
    embeddingDimension: z.ZodOptional<z.ZodNumber>;
    imageResolution: z.ZodOptional<z.ZodString>;
    sdkVersion: z.ZodOptional<z.ZodString>;
    userAgent: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    sessionId: z.ZodOptional<z.ZodString>;
    promptCategory: z.ZodOptional<z.ZodString>;
    responseQualityScore: z.ZodOptional<z.ZodNumber>;
    resourceConsumption: z.ZodOptional<z.ZodNumber>;
    concurrentRequests: z.ZodOptional<z.ZodNumber>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    deletedAt: z.ZodOptional<z.ZodNullable<z.ZodDate>>;
}, z.core.$strip>;
/**
 * Input schema — used when creating a new model usage record
 */
declare const ModelUsageInputSchema: z.ZodObject<{
    userId: z.ZodOptional<z.ZodUUID>;
    organizationId: z.ZodOptional<z.ZodUUID>;
    appId: z.ZodOptional<z.ZodUUID>;
    success: z.ZodDefault<z.ZodBoolean>;
    language: z.ZodOptional<z.ZodString>;
    userAgent: z.ZodOptional<z.ZodString>;
    apiKeyId: z.ZodOptional<z.ZodUUID>;
    unitCost: z.ZodOptional<z.ZodNumber>;
    billed: z.ZodDefault<z.ZodBoolean>;
    sessionId: z.ZodOptional<z.ZodString>;
    model: z.ZodString;
    vendor: z.ZodString;
    modelVersion: z.ZodOptional<z.ZodString>;
    requestType: z.ZodString;
    usageCount: z.ZodDefault<z.ZodNumber>;
    successCount: z.ZodDefault<z.ZodNumber>;
    failureCount: z.ZodDefault<z.ZodNumber>;
    avgLatencyMs: z.ZodOptional<z.ZodNumber>;
    p50LatencyMs: z.ZodOptional<z.ZodNumber>;
    p90LatencyMs: z.ZodOptional<z.ZodNumber>;
    p99LatencyMs: z.ZodOptional<z.ZodNumber>;
    latencyMs: z.ZodOptional<z.ZodNumber>;
    throughput: z.ZodOptional<z.ZodNumber>;
    queueTimeMs: z.ZodOptional<z.ZodNumber>;
    errorType: z.ZodOptional<z.ZodString>;
    retryCount: z.ZodOptional<z.ZodNumber>;
    region: z.ZodOptional<z.ZodString>;
    promptLengthTokens: z.ZodOptional<z.ZodNumber>;
    responseLengthTokens: z.ZodOptional<z.ZodNumber>;
    totalCost: z.ZodOptional<z.ZodNumber>;
    discountApplied: z.ZodOptional<z.ZodNumber>;
    planTier: z.ZodOptional<z.ZodString>;
    temperature: z.ZodOptional<z.ZodNumber>;
    maxTokens: z.ZodOptional<z.ZodNumber>;
    totalTokens: z.ZodOptional<z.ZodNumber>;
    topP: z.ZodOptional<z.ZodNumber>;
    stopSequences: z.ZodOptional<z.ZodArray<z.ZodString>>;
    embeddingDimension: z.ZodOptional<z.ZodNumber>;
    imageResolution: z.ZodOptional<z.ZodString>;
    sdkVersion: z.ZodOptional<z.ZodString>;
    promptCategory: z.ZodOptional<z.ZodString>;
    responseQualityScore: z.ZodOptional<z.ZodNumber>;
    resourceConsumption: z.ZodOptional<z.ZodNumber>;
    concurrentRequests: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
type ModelUsageInput = z.infer<typeof ModelUsageInputSchema>;
/**
 * Reference schema — lightweight version for embedding in other models
 */
declare const ModelUsageReferenceSchema: z.ZodObject<{
    id: z.ZodUUID;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    model: z.ZodString;
    vendor: z.ZodString;
    requestType: z.ZodString;
}, z.core.$strip>;
/**
 * Detailed schema — includes relations
 */
declare const ModelUsageDetailedSchema: z.ZodObject<{
    id: z.ZodUUID;
    userId: z.ZodOptional<z.ZodUUID>;
    organizationId: z.ZodOptional<z.ZodUUID>;
    apiKeyId: z.ZodOptional<z.ZodUUID>;
    appId: z.ZodOptional<z.ZodUUID>;
    model: z.ZodString;
    vendor: z.ZodString;
    modelVersion: z.ZodOptional<z.ZodString>;
    requestType: z.ZodString;
    usageCount: z.ZodDefault<z.ZodNumber>;
    success: z.ZodDefault<z.ZodBoolean>;
    successCount: z.ZodDefault<z.ZodNumber>;
    failureCount: z.ZodDefault<z.ZodNumber>;
    avgLatencyMs: z.ZodOptional<z.ZodNumber>;
    p50LatencyMs: z.ZodOptional<z.ZodNumber>;
    p90LatencyMs: z.ZodOptional<z.ZodNumber>;
    p99LatencyMs: z.ZodOptional<z.ZodNumber>;
    latencyMs: z.ZodOptional<z.ZodNumber>;
    throughput: z.ZodOptional<z.ZodNumber>;
    queueTimeMs: z.ZodOptional<z.ZodNumber>;
    errorType: z.ZodOptional<z.ZodString>;
    retryCount: z.ZodOptional<z.ZodNumber>;
    region: z.ZodOptional<z.ZodString>;
    promptLengthTokens: z.ZodOptional<z.ZodNumber>;
    responseLengthTokens: z.ZodOptional<z.ZodNumber>;
    unitCost: z.ZodOptional<z.ZodNumber>;
    totalCost: z.ZodOptional<z.ZodNumber>;
    billed: z.ZodDefault<z.ZodBoolean>;
    discountApplied: z.ZodOptional<z.ZodNumber>;
    planTier: z.ZodOptional<z.ZodString>;
    temperature: z.ZodOptional<z.ZodNumber>;
    maxTokens: z.ZodOptional<z.ZodNumber>;
    totalTokens: z.ZodOptional<z.ZodNumber>;
    topP: z.ZodOptional<z.ZodNumber>;
    stopSequences: z.ZodOptional<z.ZodArray<z.ZodString>>;
    embeddingDimension: z.ZodOptional<z.ZodNumber>;
    imageResolution: z.ZodOptional<z.ZodString>;
    sdkVersion: z.ZodOptional<z.ZodString>;
    userAgent: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    sessionId: z.ZodOptional<z.ZodString>;
    promptCategory: z.ZodOptional<z.ZodString>;
    responseQualityScore: z.ZodOptional<z.ZodNumber>;
    resourceConsumption: z.ZodOptional<z.ZodNumber>;
    concurrentRequests: z.ZodOptional<z.ZodNumber>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    deletedAt: z.ZodOptional<z.ZodNullable<z.ZodDate>>;
    user: z.ZodOptional<z.ZodLazy<z.ZodObject<{
        organizationId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
        id: z.ZodUUID;
        email: z.ZodEmail;
        fullName: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        roleId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
    }, z.core.$strip>>>;
    organization: z.ZodOptional<z.ZodLazy<z.ZodObject<{
        id: z.ZodUUID;
        name: z.ZodString;
        domain: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>>>;
    apiKey: z.ZodOptional<z.ZodLazy<z.ZodObject<{
        userId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
        id: z.ZodUUID;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        keyPrefix: z.ZodString;
        hashedKey: z.ZodString;
        environment: z.ZodDefault<z.ZodString>;
        revoked: z.ZodDefault<z.ZodBoolean>;
    }, z.core.$strip>>>;
    app: z.ZodOptional<z.ZodLazy<z.ZodObject<{
        id: z.ZodUUID;
        name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        ownerId: z.ZodOptional<z.ZodString>;
        organizationId: z.ZodOptional<z.ZodString>;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
        deletedAt: z.ZodOptional<z.ZodDate>;
        isActive: z.ZodDefault<z.ZodBoolean>;
        owner: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            organizationId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
            id: z.ZodUUID;
            email: z.ZodEmail;
            fullName: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            roleId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
        }, z.core.$strip>>>;
        organization: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            id: z.ZodUUID;
            name: z.ZodString;
            domain: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, z.core.$strip>>>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
type ModelUsageBase = z.infer<typeof ModelUsageBaseSchema>;
type ModelUsageReference = z.infer<typeof ModelUsageReferenceSchema>;
type ModelUsageDetailed = z.infer<typeof ModelUsageDetailedSchema>;

/**
 * Minimal schema for sending usage to OpenMeter.
 * Only includes fields needed for feature-level tracking.
 */
declare const OpenMeterUsageEntrySchema: z.ZodObject<{
    userId: z.ZodUUID;
    feature: z.ZodString;
    usage: z.ZodNumber;
    organizationId: z.ZodOptional<z.ZodUUID>;
    apiKeyId: z.ZodOptional<z.ZodUUID>;
    sessionId: z.ZodOptional<z.ZodUUID>;
    createdAt: z.ZodOptional<z.ZodDate>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, z.core.$strip>;
type OpenMeterUsageEntry = z.infer<typeof OpenMeterUsageEntrySchema>;

/**
 * Base schema — core fields for Organization
 */
declare const OrganizationBaseSchema: z.ZodObject<{
    id: z.ZodUUID;
    name: z.ZodString;
    domain: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, z.core.$strip>;
/**
 * Reference schema — minimal fields for embedding elsewhere
 */
declare const OrganizationReferenceSchema: z.ZodObject<{
    id: z.ZodUUID;
    name: z.ZodString;
    domain: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
/**
 * Detailed schema — includes nested relations
 */
declare const OrganizationDetailedSchema: z.ZodObject<{
    id: z.ZodUUID;
    name: z.ZodString;
    domain: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    users: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodObject<{
        organizationId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
        id: z.ZodUUID;
        email: z.ZodEmail;
        fullName: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        roleId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
    }, z.core.$strip>>>>;
    apps: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodObject<{
        id: z.ZodUUID;
        name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        ownerId: z.ZodOptional<z.ZodString>;
        organizationId: z.ZodOptional<z.ZodString>;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
        deletedAt: z.ZodOptional<z.ZodDate>;
        isActive: z.ZodDefault<z.ZodBoolean>;
        owner: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            organizationId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
            id: z.ZodUUID;
            email: z.ZodEmail;
            fullName: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            roleId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
        }, z.core.$strip>>>;
        organization: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            id: z.ZodUUID;
            name: z.ZodString;
            domain: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, z.core.$strip>>>;
    }, z.core.$strip>>>>;
    modelUsages: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodObject<{
        id: z.ZodUUID;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
        model: z.ZodString;
        vendor: z.ZodString;
        requestType: z.ZodString;
    }, z.core.$strip>>>>;
}, z.core.$strip>;
type OrganizationBase = z.infer<typeof OrganizationBaseSchema>;
type OrganizationReference = z.infer<typeof OrganizationReferenceSchema>;
type OrganizationDetailed = z.infer<typeof OrganizationDetailedSchema>;
/**
 * Input schemas
 */
declare const CreateOrganizationInputSchema: z.ZodObject<{
    name: z.ZodString;
    domain: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
type CreateOrganizationInput = z.infer<typeof CreateOrganizationInputSchema>;
declare const UpdateOrganizationInputSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    domain: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
type UpdateOrganizationInput = z.infer<typeof UpdateOrganizationInputSchema>;

/**
 * Base schema — core fields for OrganizationPlan
 */
declare const OrganizationPlanBaseSchema: z.ZodObject<{
    id: z.ZodUUID;
    organizationId: z.ZodOptional<z.ZodUUID>;
    planId: z.ZodOptional<z.ZodUUID>;
    startDate: z.ZodDate;
    endDate: z.ZodOptional<z.ZodNullable<z.ZodDate>>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, z.core.$strip>;
/**
 * Reference schema — minimal fields for embedding elsewhere
 */
declare const OrganizationPlanReferenceSchema: z.ZodObject<{
    organizationId: z.ZodOptional<z.ZodUUID>;
    id: z.ZodUUID;
    planId: z.ZodOptional<z.ZodUUID>;
    startDate: z.ZodDate;
    endDate: z.ZodOptional<z.ZodNullable<z.ZodDate>>;
}, z.core.$strip>;
/**
 * Detailed schema — includes nested relations
 */
declare const OrganizationPlanDetailedSchema: z.ZodObject<{
    id: z.ZodUUID;
    organizationId: z.ZodOptional<z.ZodUUID>;
    planId: z.ZodOptional<z.ZodUUID>;
    startDate: z.ZodDate;
    endDate: z.ZodOptional<z.ZodNullable<z.ZodDate>>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    organization: z.ZodOptional<z.ZodLazy<z.ZodObject<{
        id: z.ZodUUID;
        name: z.ZodString;
        domain: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>>>;
    plan: z.ZodOptional<z.ZodLazy<z.ZodObject<{
        id: z.ZodUUID;
        name: z.ZodString;
        price: z.ZodNumber;
        maxUsage: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
type OrganizationPlanBase = z.infer<typeof OrganizationPlanBaseSchema>;
type OrganizationPlanReference = z.infer<typeof OrganizationPlanReferenceSchema>;
type OrganizationPlanDetailed = z.infer<typeof OrganizationPlanDetailedSchema>;

/**
 * Base schema — core Plan fields
 */
declare const PlanBaseSchema: z.ZodObject<{
    id: z.ZodUUID;
    name: z.ZodString;
    price: z.ZodNumber;
    maxUsage: z.ZodOptional<z.ZodNumber>;
    interval: z.ZodDefault<z.ZodString>;
    features: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, z.core.$strip>;
/**
 * Reference schema — minimal fields for embedding elsewhere
 */
declare const PlanReferenceSchema: z.ZodObject<{
    id: z.ZodUUID;
    name: z.ZodString;
    price: z.ZodNumber;
    maxUsage: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
/**
 * Detailed schema — includes nested relations
 */
declare const PlanDetailedSchema: z.ZodObject<{
    id: z.ZodUUID;
    name: z.ZodString;
    price: z.ZodNumber;
    maxUsage: z.ZodOptional<z.ZodNumber>;
    interval: z.ZodDefault<z.ZodString>;
    features: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    users: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodObject<{
        organizationId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
        id: z.ZodUUID;
        email: z.ZodEmail;
        fullName: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        roleId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
    }, z.core.$strip>>>>;
    organizationPlans: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodObject<{
        organizationId: z.ZodOptional<z.ZodUUID>;
        id: z.ZodUUID;
        planId: z.ZodOptional<z.ZodUUID>;
        startDate: z.ZodDate;
        endDate: z.ZodOptional<z.ZodNullable<z.ZodDate>>;
    }, z.core.$strip>>>>;
    planFeatures: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodObject<{
        id: z.ZodUUID;
        name: z.ZodString;
    }, z.core.$strip>>>>;
}, z.core.$strip>;
type PlanBase = z.infer<typeof PlanBaseSchema>;
type PlanReference = z.infer<typeof PlanReferenceSchema>;
type PlanDetailed = z.infer<typeof PlanDetailedSchema>;

/**
 * Base schema — core PlanFeature fields
 */
declare const PlanFeatureBaseSchema: z.ZodObject<{
    id: z.ZodUUID;
    planId: z.ZodUUID;
    name: z.ZodString;
    limit: z.ZodOptional<z.ZodNumber>;
    price: z.ZodOptional<z.ZodNumber>;
    metadata: z.ZodOptional<z.ZodAny>;
    createdAt: z.ZodDate;
}, z.core.$strip>;
/**
 * Reference schema — minimal fields for embedding elsewhere
 */
declare const PlanFeatureReferenceSchema: z.ZodObject<{
    id: z.ZodUUID;
    name: z.ZodString;
}, z.core.$strip>;
/**
 * Detailed schema — includes nested relations
 */
declare const PlanFeatureDetailedSchema: z.ZodObject<{
    id: z.ZodUUID;
    planId: z.ZodUUID;
    name: z.ZodString;
    limit: z.ZodOptional<z.ZodNumber>;
    price: z.ZodOptional<z.ZodNumber>;
    metadata: z.ZodOptional<z.ZodAny>;
    createdAt: z.ZodDate;
    plan: z.ZodOptional<z.ZodLazy<z.ZodObject<{
        id: z.ZodUUID;
        name: z.ZodString;
        price: z.ZodNumber;
        maxUsage: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
type PlanFeatureBase = z.infer<typeof PlanFeatureBaseSchema>;
type PlanFeatureReference = z.infer<typeof PlanFeatureReferenceSchema>;
type PlanFeatureDetailed = z.infer<typeof PlanFeatureDetailedSchema>;

/**
 * Base schema — core RevenueSplit fields
 */
declare const RevenueSplitBaseSchema: z.ZodObject<{
    id: z.ZodUUID;
    appId: z.ZodUUID;
    recipientId: z.ZodOptional<z.ZodUUID>;
    percent: z.ZodNumber;
    createdAt: z.ZodDate;
    deletedAt: z.ZodOptional<z.ZodDate>;
}, z.core.$strip>;
/**
 * Reference schema — minimal fields for embedding elsewhere
 */
declare const RevenueSplitReferenceSchema: z.ZodObject<{
    id: z.ZodUUID;
    percent: z.ZodNumber;
}, z.core.$strip>;
/**
 * Detailed schema — includes nested relations
 */
declare const RevenueSplitDetailedSchema: z.ZodObject<{
    id: z.ZodUUID;
    appId: z.ZodUUID;
    recipientId: z.ZodOptional<z.ZodUUID>;
    percent: z.ZodNumber;
    createdAt: z.ZodDate;
    deletedAt: z.ZodOptional<z.ZodDate>;
    app: z.ZodLazy<z.ZodObject<{
        id: z.ZodUUID;
        name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        ownerId: z.ZodOptional<z.ZodString>;
        organizationId: z.ZodOptional<z.ZodString>;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
        deletedAt: z.ZodOptional<z.ZodDate>;
        isActive: z.ZodDefault<z.ZodBoolean>;
        owner: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            organizationId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
            id: z.ZodUUID;
            email: z.ZodEmail;
            fullName: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            roleId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
        }, z.core.$strip>>>;
        organization: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            id: z.ZodUUID;
            name: z.ZodString;
            domain: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, z.core.$strip>>>;
    }, z.core.$strip>>;
    recipient: z.ZodOptional<z.ZodLazy<z.ZodObject<{
        organizationId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
        id: z.ZodUUID;
        email: z.ZodEmail;
        fullName: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        roleId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
type RevenueSplitBase = z.infer<typeof RevenueSplitBaseSchema>;
type RevenueSplitReference = z.infer<typeof RevenueSplitReferenceSchema>;
type RevenueSplitDetailed = z.infer<typeof RevenueSplitDetailedSchema>;

/**
 * Review status enum
 */
declare const ReviewStatusEnum: z.ZodEnum<{
    PENDING: "PENDING";
    APPROVED: "APPROVED";
    REJECTED: "REJECTED";
}>;
/**
 * Base schema — core Review fields
 */
declare const ReviewBaseSchema: z.ZodObject<{
    id: z.ZodUUID;
    reviewerId: z.ZodUUID;
    resourceType: z.ZodString;
    resourceId: z.ZodString;
    status: z.ZodEnum<{
        PENDING: "PENDING";
        APPROVED: "APPROVED";
        REJECTED: "REJECTED";
    }>;
    notes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, z.core.$strip>;
/**
 * Reference schema — minimal fields for embedding elsewhere
 */
declare const ReviewReferenceSchema: z.ZodObject<{
    id: z.ZodUUID;
    status: z.ZodEnum<{
        PENDING: "PENDING";
        APPROVED: "APPROVED";
        REJECTED: "REJECTED";
    }>;
    resourceType: z.ZodString;
    resourceId: z.ZodString;
}, z.core.$strip>;
/**
 * Detailed schema — includes nested relations
 */
declare const ReviewDetailedSchema: z.ZodObject<{
    id: z.ZodUUID;
    reviewerId: z.ZodUUID;
    resourceType: z.ZodString;
    resourceId: z.ZodString;
    status: z.ZodEnum<{
        PENDING: "PENDING";
        APPROVED: "APPROVED";
        REJECTED: "REJECTED";
    }>;
    notes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    reviewer: z.ZodLazy<z.ZodObject<{
        organizationId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
        id: z.ZodUUID;
        email: z.ZodEmail;
        fullName: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        roleId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
type ReviewBase = z.infer<typeof ReviewBaseSchema>;
type ReviewReference = z.infer<typeof ReviewReferenceSchema>;
type ReviewDetailed = z.infer<typeof ReviewDetailedSchema>;

/**
 * Base schema — core Role fields
 */
declare const RoleBaseSchema: z.ZodObject<{
    id: z.ZodUUID;
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    permissions: z.ZodOptional<z.ZodString>;
    createdBy: z.ZodOptional<z.ZodString>;
    updatedBy: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/**
 * Reference schema — minimal Role info for embedding elsewhere
 */
declare const RoleReferenceSchema: z.ZodObject<{
    id: z.ZodUUID;
    name: z.ZodString;
}, z.core.$strip>;
/**
 * Detailed schema — includes nested relations
 */
declare const RoleDetailedSchema: z.ZodObject<{
    id: z.ZodUUID;
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    permissions: z.ZodOptional<z.ZodString>;
    createdBy: z.ZodOptional<z.ZodString>;
    updatedBy: z.ZodOptional<z.ZodString>;
    users: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodObject<{
        organizationId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
        id: z.ZodUUID;
        email: z.ZodEmail;
        fullName: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        roleId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
    }, z.core.$strip>>>>;
}, z.core.$strip>;
type RoleBase = z.infer<typeof RoleBaseSchema>;
type RoleReference = z.infer<typeof RoleReferenceSchema>;
type RoleDetailed = z.infer<typeof RoleDetailedSchema>;

/**
 * Base schema — core SDK log fields
 */
declare const SdkLogBaseSchema: z.ZodObject<{
    id: z.ZodUUID;
    appId: z.ZodString;
    endUserId: z.ZodOptional<z.ZodString>;
    method: z.ZodString;
    payload: z.ZodAny;
    createdAt: z.ZodDate;
}, z.core.$strip>;
/**
 * Reference schema — minimal info for embedding elsewhere
 */
declare const SdkLogReferenceSchema: z.ZodObject<{
    id: z.ZodUUID;
    createdAt: z.ZodDate;
    method: z.ZodString;
}, z.core.$strip>;
/**
 * Detailed schema — includes nested relations
 */
declare const SdkLogDetailedSchema: z.ZodObject<{
    id: z.ZodUUID;
    appId: z.ZodString;
    endUserId: z.ZodOptional<z.ZodString>;
    method: z.ZodString;
    payload: z.ZodAny;
    createdAt: z.ZodDate;
    app: z.ZodLazy<z.ZodObject<{
        id: z.ZodUUID;
        name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        ownerId: z.ZodOptional<z.ZodString>;
        organizationId: z.ZodOptional<z.ZodString>;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
        deletedAt: z.ZodOptional<z.ZodDate>;
        isActive: z.ZodDefault<z.ZodBoolean>;
        owner: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            organizationId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
            id: z.ZodUUID;
            email: z.ZodEmail;
            fullName: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            roleId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
        }, z.core.$strip>>>;
        organization: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            id: z.ZodUUID;
            name: z.ZodString;
            domain: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, z.core.$strip>>>;
    }, z.core.$strip>>;
    endUser: z.ZodOptional<z.ZodLazy<z.ZodObject<{
        id: z.ZodUUID;
        appId: z.ZodUUID;
        email: z.ZodOptional<z.ZodEmail>;
        externalId: z.ZodString;
    }, z.core.$strip>>>;
}, z.core.$strip>;
type SdkLogBase = z.infer<typeof SdkLogBaseSchema>;
type SdkLogReference = z.infer<typeof SdkLogReferenceSchema>;
type SdkLogDetailed = z.infer<typeof SdkLogDetailedSchema>;

declare const UsageByFeatureSchema: z.ZodObject<{
    feature: z.ZodEnum<{
        TEXT_GENERATION: "TEXT_GENERATION";
        IMAGE_GENERATION: "IMAGE_GENERATION";
        DATA_ANALYSIS: "DATA_ANALYSIS";
        TOKENS: "TOKENS";
        COMPUTE_TIME: "COMPUTE_TIME";
        VRAM_USAGE: "VRAM_USAGE";
        API_CALL: "API_CALL";
        STORAGE: "STORAGE";
        OTHER: "OTHER";
    }>;
    usage: z.ZodNumber;
}, z.core.$strip>;
declare const MonthlyUsageSchema: z.ZodObject<{
    month: z.ZodString;
    usage: z.ZodNumber;
    totalCost: z.ZodOptional<z.ZodNumber>;
    breakdown: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
    logs: z.ZodOptional<z.ZodArray<z.ZodObject<{
        organizationId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        id: z.ZodUUID;
        createdAt: z.ZodDate;
        appId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        feature: z.ZodDefault<z.ZodEnum<{
            TEXT_GENERATION: "TEXT_GENERATION";
            IMAGE_GENERATION: "IMAGE_GENERATION";
            DATA_ANALYSIS: "DATA_ANALYSIS";
            TOKENS: "TOKENS";
            COMPUTE_TIME: "COMPUTE_TIME";
            VRAM_USAGE: "VRAM_USAGE";
            API_CALL: "API_CALL";
            STORAGE: "STORAGE";
            OTHER: "OTHER";
        }>>;
        usage: z.ZodNumber;
        billed: z.ZodDefault<z.ZodBoolean>;
        sessionId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
declare const UsageSummarySchema: z.ZodObject<{
    currentUsage: z.ZodNumber;
    usageLimit: z.ZodOptional<z.ZodNumber>;
    periodStart: z.ZodString;
    periodEnd: z.ZodString;
    isOverLimit: z.ZodBoolean;
    history: z.ZodOptional<z.ZodArray<z.ZodObject<{
        month: z.ZodString;
        usage: z.ZodNumber;
        totalCost: z.ZodOptional<z.ZodNumber>;
        breakdown: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
        logs: z.ZodOptional<z.ZodArray<z.ZodObject<{
            organizationId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            id: z.ZodUUID;
            createdAt: z.ZodDate;
            appId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            feature: z.ZodDefault<z.ZodEnum<{
                TEXT_GENERATION: "TEXT_GENERATION";
                IMAGE_GENERATION: "IMAGE_GENERATION";
                DATA_ANALYSIS: "DATA_ANALYSIS";
                TOKENS: "TOKENS";
                COMPUTE_TIME: "COMPUTE_TIME";
                VRAM_USAGE: "VRAM_USAGE";
                API_CALL: "API_CALL";
                STORAGE: "STORAGE";
                OTHER: "OTHER";
            }>>;
            usage: z.ZodNumber;
            billed: z.ZodDefault<z.ZodBoolean>;
            sessionId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, z.core.$strip>>>;
    }, z.core.$strip>>>;
    estimatedCost: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
declare const UsageSummaryChartSchema: z.ZodObject<{
    totalUsage: z.ZodNumber;
    currentMonthUsage: z.ZodNumber;
    monthlyHistory: z.ZodArray<z.ZodObject<{
        month: z.ZodString;
        usage: z.ZodNumber;
        totalCost: z.ZodOptional<z.ZodNumber>;
        breakdown: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
        logs: z.ZodOptional<z.ZodArray<z.ZodObject<{
            organizationId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            id: z.ZodUUID;
            createdAt: z.ZodDate;
            appId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            feature: z.ZodDefault<z.ZodEnum<{
                TEXT_GENERATION: "TEXT_GENERATION";
                IMAGE_GENERATION: "IMAGE_GENERATION";
                DATA_ANALYSIS: "DATA_ANALYSIS";
                TOKENS: "TOKENS";
                COMPUTE_TIME: "COMPUTE_TIME";
                VRAM_USAGE: "VRAM_USAGE";
                API_CALL: "API_CALL";
                STORAGE: "STORAGE";
                OTHER: "OTHER";
            }>>;
            usage: z.ZodNumber;
            billed: z.ZodDefault<z.ZodBoolean>;
            sessionId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, z.core.$strip>>>;
    }, z.core.$strip>>;
    byFeature: z.ZodArray<z.ZodObject<{
        feature: z.ZodEnum<{
            TEXT_GENERATION: "TEXT_GENERATION";
            IMAGE_GENERATION: "IMAGE_GENERATION";
            DATA_ANALYSIS: "DATA_ANALYSIS";
            TOKENS: "TOKENS";
            COMPUTE_TIME: "COMPUTE_TIME";
            VRAM_USAGE: "VRAM_USAGE";
            API_CALL: "API_CALL";
            STORAGE: "STORAGE";
            OTHER: "OTHER";
        }>;
        usage: z.ZodNumber;
    }, z.core.$strip>>;
    planLimit: z.ZodOptional<z.ZodNumber>;
    percentUsed: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
declare const RecordUsageInputSchema: z.ZodObject<{
    userId: z.ZodNumber;
    feature: z.ZodEnum<{
        TEXT_GENERATION: "TEXT_GENERATION";
        IMAGE_GENERATION: "IMAGE_GENERATION";
        DATA_ANALYSIS: "DATA_ANALYSIS";
        TOKENS: "TOKENS";
        COMPUTE_TIME: "COMPUTE_TIME";
        VRAM_USAGE: "VRAM_USAGE";
        API_CALL: "API_CALL";
        STORAGE: "STORAGE";
        OTHER: "OTHER";
    }>;
    usage: z.ZodNumber;
    sessionId: z.ZodOptional<z.ZodString>;
    unitCost: z.ZodOptional<z.ZodNumber>;
    organizationId: z.ZodOptional<z.ZodNumber>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    billed: z.ZodOptional<z.ZodBoolean>;
    timestamp: z.ZodPipe<z.ZodTransform<Date | undefined, unknown>, z.ZodOptional<z.ZodDate>>;
}, z.core.$strip>;
declare const UsageThresholdAlertSchema: z.ZodObject<{
    userId: z.ZodNumber;
    used: z.ZodNumber;
    max: z.ZodNumber;
}, z.core.$strip>;
declare const UsageLogWithUserSchema: z.ZodObject<{
    organizationId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    id: z.ZodUUID;
    createdAt: z.ZodDate;
    appId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    feature: z.ZodDefault<z.ZodEnum<{
        TEXT_GENERATION: "TEXT_GENERATION";
        IMAGE_GENERATION: "IMAGE_GENERATION";
        DATA_ANALYSIS: "DATA_ANALYSIS";
        TOKENS: "TOKENS";
        COMPUTE_TIME: "COMPUTE_TIME";
        VRAM_USAGE: "VRAM_USAGE";
        API_CALL: "API_CALL";
        STORAGE: "STORAGE";
        OTHER: "OTHER";
    }>>;
    usage: z.ZodNumber;
    billed: z.ZodDefault<z.ZodBoolean>;
    sessionId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    user: z.ZodOptional<z.ZodObject<{
        organizationId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
        id: z.ZodUUID;
        email: z.ZodEmail;
        fullName: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        roleId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const UsageLogsTableSchema: z.ZodObject<{
    logs: z.ZodArray<z.ZodObject<{
        organizationId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        id: z.ZodUUID;
        createdAt: z.ZodDate;
        appId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        feature: z.ZodDefault<z.ZodEnum<{
            TEXT_GENERATION: "TEXT_GENERATION";
            IMAGE_GENERATION: "IMAGE_GENERATION";
            DATA_ANALYSIS: "DATA_ANALYSIS";
            TOKENS: "TOKENS";
            COMPUTE_TIME: "COMPUTE_TIME";
            VRAM_USAGE: "VRAM_USAGE";
            API_CALL: "API_CALL";
            STORAGE: "STORAGE";
            OTHER: "OTHER";
        }>>;
        usage: z.ZodNumber;
        billed: z.ZodDefault<z.ZodBoolean>;
        sessionId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        user: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
            id: z.ZodUUID;
            email: z.ZodEmail;
            fullName: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            roleId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
    totalCount: z.ZodNumber;
}, z.core.$strip>;
declare const UsageSummaryItemSchema: z.ZodObject<{
    feature: z.ZodEnum<{
        TEXT_GENERATION: "TEXT_GENERATION";
        IMAGE_GENERATION: "IMAGE_GENERATION";
        DATA_ANALYSIS: "DATA_ANALYSIS";
        TOKENS: "TOKENS";
        COMPUTE_TIME: "COMPUTE_TIME";
        VRAM_USAGE: "VRAM_USAGE";
        API_CALL: "API_CALL";
        STORAGE: "STORAGE";
        OTHER: "OTHER";
    }>;
    totalUsage: z.ZodNumber;
}, z.core.$strip>;
declare const OrgUsageSummaryItemSchema: z.ZodObject<{
    feature: z.ZodEnum<{
        TEXT_GENERATION: "TEXT_GENERATION";
        IMAGE_GENERATION: "IMAGE_GENERATION";
        DATA_ANALYSIS: "DATA_ANALYSIS";
        TOKENS: "TOKENS";
        COMPUTE_TIME: "COMPUTE_TIME";
        VRAM_USAGE: "VRAM_USAGE";
        API_CALL: "API_CALL";
        STORAGE: "STORAGE";
        OTHER: "OTHER";
    }>;
    _sum: z.ZodObject<{
        usage: z.ZodNullable<z.ZodNumber>;
    }, z.core.$strip>;
}, z.core.$strip>;
declare const OrgUsageSummarySchema: z.ZodArray<z.ZodObject<{
    feature: z.ZodEnum<{
        TEXT_GENERATION: "TEXT_GENERATION";
        IMAGE_GENERATION: "IMAGE_GENERATION";
        DATA_ANALYSIS: "DATA_ANALYSIS";
        TOKENS: "TOKENS";
        COMPUTE_TIME: "COMPUTE_TIME";
        VRAM_USAGE: "VRAM_USAGE";
        API_CALL: "API_CALL";
        STORAGE: "STORAGE";
        OTHER: "OTHER";
    }>;
    _sum: z.ZodObject<{
        usage: z.ZodNullable<z.ZodNumber>;
    }, z.core.$strip>;
}, z.core.$strip>>;
/** Type for usage summary per feature */
type FeatureUsageSummary = {
    feature: string;
    totalUsage: number;
};
/** Type for usage per month */
type MonthlyUsage = {
    month: string;
    usage: number;
};
/** Type for the returned data from getUsageForDateRange */
type UsageForDateRangeResult = {
    logs: UsageLogWithUser[];
    totalCount: number;
    summary: FeatureUsageSummary[];
    monthly: MonthlyUsage[];
};
type RecordUsageInput = z.infer<typeof RecordUsageInputSchema>;
type UsageByFeature = z.infer<typeof UsageByFeatureSchema>;
type UsageSummary = z.infer<typeof UsageSummarySchema>;
type UsageSummaryChart = z.infer<typeof UsageSummaryChartSchema>;
type UsageThresholdAlert = z.infer<typeof UsageThresholdAlertSchema>;
type UsageLogWithUser = z.infer<typeof UsageLogWithUserSchema>;
type UsageLogsTable = z.infer<typeof UsageLogsTableSchema>;
type UsageSummaryItem = z.infer<typeof UsageSummaryItemSchema>;
type OrgUsageSummaryItem = z.infer<typeof OrgUsageSummaryItemSchema>;
type OrgUsageSummary = z.infer<typeof OrgUsageSummarySchema>;

/**
 * Base schema — core usage limit fields
 */
declare const UsageLimitBaseSchema: z.ZodObject<{
    id: z.ZodUUID;
    appId: z.ZodString;
    endUserId: z.ZodOptional<z.ZodString>;
    metric: z.ZodString;
    limit: z.ZodNumber;
    period: z.ZodEnum<{
        monthly: "monthly";
        daily: "daily";
        weekly: "weekly";
        yearly: "yearly";
        lifetime: "lifetime";
    }>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    resetAt: z.ZodOptional<z.ZodDate>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodOptional<z.ZodDate>;
}, z.core.$strip>;
/**
 * Reference schema — minimal info for embedding elsewhere
 */
declare const UsageLimitReferenceSchema: z.ZodObject<{
    id: z.ZodUUID;
    createdAt: z.ZodDate;
    limit: z.ZodNumber;
    metric: z.ZodString;
    period: z.ZodEnum<{
        monthly: "monthly";
        daily: "daily";
        weekly: "weekly";
        yearly: "yearly";
        lifetime: "lifetime";
    }>;
}, z.core.$strip>;
/**
 * Detailed schema — includes nested relations
 */
declare const UsageLimitDetailedSchema: z.ZodObject<{
    id: z.ZodUUID;
    appId: z.ZodString;
    endUserId: z.ZodOptional<z.ZodString>;
    metric: z.ZodString;
    limit: z.ZodNumber;
    period: z.ZodEnum<{
        monthly: "monthly";
        daily: "daily";
        weekly: "weekly";
        yearly: "yearly";
        lifetime: "lifetime";
    }>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    resetAt: z.ZodOptional<z.ZodDate>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodOptional<z.ZodDate>;
    app: z.ZodLazy<z.ZodObject<{
        id: z.ZodUUID;
        name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        ownerId: z.ZodOptional<z.ZodString>;
        organizationId: z.ZodOptional<z.ZodString>;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
        deletedAt: z.ZodOptional<z.ZodDate>;
        isActive: z.ZodDefault<z.ZodBoolean>;
        owner: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            organizationId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
            id: z.ZodUUID;
            email: z.ZodEmail;
            fullName: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            roleId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
        }, z.core.$strip>>>;
        organization: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            id: z.ZodUUID;
            name: z.ZodString;
            domain: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, z.core.$strip>>>;
    }, z.core.$strip>>;
    endUser: z.ZodOptional<z.ZodLazy<z.ZodObject<{
        id: z.ZodUUID;
        appId: z.ZodUUID;
        email: z.ZodOptional<z.ZodEmail>;
        externalId: z.ZodString;
    }, z.core.$strip>>>;
}, z.core.$strip>;
type UsageLimitBase = z.infer<typeof UsageLimitBaseSchema>;
type UsageLimitReference = z.infer<typeof UsageLimitReferenceSchema>;
type UsageLimitDetailed = z.infer<typeof UsageLimitDetailedSchema>;

/**
 * Features enum placeholder
 */
declare const FeatureEnum: z.ZodEnum<{
    TEXT_GENERATION: "TEXT_GENERATION";
    IMAGE_GENERATION: "IMAGE_GENERATION";
    DATA_ANALYSIS: "DATA_ANALYSIS";
    TOKENS: "TOKENS";
    COMPUTE_TIME: "COMPUTE_TIME";
    VRAM_USAGE: "VRAM_USAGE";
    API_CALL: "API_CALL";
    STORAGE: "STORAGE";
    OTHER: "OTHER";
}>;
type FeatureType = z.infer<typeof FeatureEnum>;
type Feature = z.infer<typeof FeatureEnum>;
/**
 * Base schema — core fields for a usage log event
 */
declare const UsageLogBaseSchema: z.ZodObject<{
    id: z.ZodUUID;
    userId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    organizationId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    appId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    endUserId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    apiKeyId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    feature: z.ZodDefault<z.ZodEnum<{
        TEXT_GENERATION: "TEXT_GENERATION";
        IMAGE_GENERATION: "IMAGE_GENERATION";
        DATA_ANALYSIS: "DATA_ANALYSIS";
        TOKENS: "TOKENS";
        COMPUTE_TIME: "COMPUTE_TIME";
        VRAM_USAGE: "VRAM_USAGE";
        API_CALL: "API_CALL";
        STORAGE: "STORAGE";
        OTHER: "OTHER";
    }>>;
    usage: z.ZodNumber;
    unitCost: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    billed: z.ZodDefault<z.ZodBoolean>;
    sessionId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    createdAt: z.ZodDate;
    openMeterReported: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    openMeterId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    deletedAt: z.ZodOptional<z.ZodNullable<z.ZodDate>>;
    metadata: z.ZodOptional<z.ZodNullable<z.ZodAny>>;
}, z.core.$strip>;
/**
 * Reference schema — minimal version for lightweight embedding
 */
declare const UsageLogReferenceSchema: z.ZodObject<{
    organizationId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    id: z.ZodUUID;
    createdAt: z.ZodDate;
    appId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    feature: z.ZodDefault<z.ZodEnum<{
        TEXT_GENERATION: "TEXT_GENERATION";
        IMAGE_GENERATION: "IMAGE_GENERATION";
        DATA_ANALYSIS: "DATA_ANALYSIS";
        TOKENS: "TOKENS";
        COMPUTE_TIME: "COMPUTE_TIME";
        VRAM_USAGE: "VRAM_USAGE";
        API_CALL: "API_CALL";
        STORAGE: "STORAGE";
        OTHER: "OTHER";
    }>>;
    usage: z.ZodNumber;
    billed: z.ZodDefault<z.ZodBoolean>;
    sessionId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
/**
 * Detailed schema — includes nested relational references
 */
declare const UsageLogDetailedSchema: z.ZodObject<{
    id: z.ZodUUID;
    userId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    organizationId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    appId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    endUserId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    apiKeyId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    feature: z.ZodDefault<z.ZodEnum<{
        TEXT_GENERATION: "TEXT_GENERATION";
        IMAGE_GENERATION: "IMAGE_GENERATION";
        DATA_ANALYSIS: "DATA_ANALYSIS";
        TOKENS: "TOKENS";
        COMPUTE_TIME: "COMPUTE_TIME";
        VRAM_USAGE: "VRAM_USAGE";
        API_CALL: "API_CALL";
        STORAGE: "STORAGE";
        OTHER: "OTHER";
    }>>;
    usage: z.ZodNumber;
    unitCost: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    billed: z.ZodDefault<z.ZodBoolean>;
    sessionId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    createdAt: z.ZodDate;
    openMeterReported: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    openMeterId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    deletedAt: z.ZodOptional<z.ZodNullable<z.ZodDate>>;
    metadata: z.ZodOptional<z.ZodNullable<z.ZodAny>>;
    user: z.ZodOptional<z.ZodNullable<z.ZodLazy<z.ZodObject<{
        organizationId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
        id: z.ZodUUID;
        email: z.ZodEmail;
        fullName: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        roleId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
    }, z.core.$strip>>>>;
    organization: z.ZodOptional<z.ZodNullable<z.ZodLazy<z.ZodObject<{
        id: z.ZodUUID;
        name: z.ZodString;
        domain: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>>>>;
    apiKey: z.ZodOptional<z.ZodNullable<z.ZodLazy<z.ZodObject<{
        userId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
        id: z.ZodUUID;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        keyPrefix: z.ZodString;
        hashedKey: z.ZodString;
        environment: z.ZodDefault<z.ZodString>;
        revoked: z.ZodDefault<z.ZodBoolean>;
    }, z.core.$strip>>>>;
    app: z.ZodOptional<z.ZodNullable<z.ZodLazy<z.ZodObject<{
        id: z.ZodUUID;
        name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        ownerId: z.ZodOptional<z.ZodString>;
        organizationId: z.ZodOptional<z.ZodString>;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
        deletedAt: z.ZodOptional<z.ZodDate>;
        isActive: z.ZodDefault<z.ZodBoolean>;
        owner: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            organizationId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
            id: z.ZodUUID;
            email: z.ZodEmail;
            fullName: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            roleId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
        }, z.core.$strip>>>;
        organization: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            id: z.ZodUUID;
            name: z.ZodString;
            domain: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, z.core.$strip>>>;
    }, z.core.$strip>>>>;
    endUser: z.ZodOptional<z.ZodNullable<z.ZodLazy<z.ZodObject<{
        id: z.ZodUUID;
        appId: z.ZodUUID;
        email: z.ZodOptional<z.ZodEmail>;
        externalId: z.ZodString;
    }, z.core.$strip>>>>;
    session: z.ZodOptional<z.ZodNullable<z.ZodLazy<z.ZodObject<{
        userId: z.ZodUUID;
        id: z.ZodUUID;
        createdAt: z.ZodDate;
        expiresAt: z.ZodDate;
    }, z.core.$strip>>>>;
}, z.core.$strip>;
type UsageLogBase = z.infer<typeof UsageLogBaseSchema>;
type UsageLogReference = z.infer<typeof UsageLogReferenceSchema>;
type UsageLogDetailed = z.infer<typeof UsageLogDetailedSchema>;

/**
 * Schema for what the SDK or external clients send
 * when reporting usage events to BillAI.
 */
declare const UsagePayloadSchema: z.ZodObject<{
    feature: z.ZodEnum<{
        TEXT_GENERATION: "TEXT_GENERATION";
        IMAGE_GENERATION: "IMAGE_GENERATION";
        DATA_ANALYSIS: "DATA_ANALYSIS";
        TOKENS: "TOKENS";
        COMPUTE_TIME: "COMPUTE_TIME";
        VRAM_USAGE: "VRAM_USAGE";
        API_CALL: "API_CALL";
        STORAGE: "STORAGE";
        OTHER: "OTHER";
    }>;
    usage: z.ZodNumber;
    sessionId: z.ZodOptional<z.ZodUUID>;
    appId: z.ZodOptional<z.ZodString>;
    endUserId: z.ZodOptional<z.ZodString>;
    organizationId: z.ZodOptional<z.ZodString>;
    ipAddress: z.ZodOptional<z.ZodString>;
    userAgent: z.ZodOptional<z.ZodString>;
    modelUsage: z.ZodOptional<z.ZodObject<{
        userId: z.ZodOptional<z.ZodOptional<z.ZodUUID>>;
        organizationId: z.ZodOptional<z.ZodOptional<z.ZodUUID>>;
        appId: z.ZodOptional<z.ZodOptional<z.ZodUUID>>;
        success: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        language: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        userAgent: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        apiKeyId: z.ZodOptional<z.ZodOptional<z.ZodUUID>>;
        unitCost: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        billed: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        sessionId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        model: z.ZodOptional<z.ZodString>;
        vendor: z.ZodOptional<z.ZodString>;
        modelVersion: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        requestType: z.ZodOptional<z.ZodString>;
        usageCount: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
        successCount: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
        failureCount: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
        avgLatencyMs: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        p50LatencyMs: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        p90LatencyMs: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        p99LatencyMs: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        latencyMs: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        throughput: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        queueTimeMs: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        errorType: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        retryCount: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        region: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        promptLengthTokens: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        responseLengthTokens: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        totalCost: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        discountApplied: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        planTier: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        temperature: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        maxTokens: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        totalTokens: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        topP: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        stopSequences: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString>>>;
        embeddingDimension: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        imageResolution: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        sdkVersion: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        promptCategory: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        responseQualityScore: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        resourceConsumption: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        concurrentRequests: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    }, z.core.$strip>>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, z.core.$strip>;
/**
 * Type used by the npm SDK and API endpoints for usage reporting.
 */
type UsagePayload = z.infer<typeof UsagePayloadSchema>;

/**
 * Base schema — defines the core fields for usage-based pricing
 */
declare const UsagePricingBaseSchema: z.ZodObject<{
    id: z.ZodUUID;
    appId: z.ZodUUID;
    metric: z.ZodString;
    pricePerUnit: z.ZodNumber;
    currency: z.ZodDefault<z.ZodString>;
    unitName: z.ZodOptional<z.ZodString>;
    billingCycle: z.ZodDefault<z.ZodEnum<{
        monthly: "monthly";
        yearly: "yearly";
    }>>;
    tiered: z.ZodOptional<z.ZodBoolean>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodOptional<z.ZodDate>;
}, z.core.$strip>;
/**
 * Reference schema — minimal fields for lightweight embedding
 */
declare const UsagePricingReferenceSchema: z.ZodObject<{
    id: z.ZodUUID;
    currency: z.ZodDefault<z.ZodString>;
    metric: z.ZodString;
    pricePerUnit: z.ZodNumber;
    unitName: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/**
 * Detailed schema — includes relations for full context
 */
declare const UsagePricingDetailedSchema: z.ZodObject<{
    id: z.ZodUUID;
    appId: z.ZodUUID;
    metric: z.ZodString;
    pricePerUnit: z.ZodNumber;
    currency: z.ZodDefault<z.ZodString>;
    unitName: z.ZodOptional<z.ZodString>;
    billingCycle: z.ZodDefault<z.ZodEnum<{
        monthly: "monthly";
        yearly: "yearly";
    }>>;
    tiered: z.ZodOptional<z.ZodBoolean>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodOptional<z.ZodDate>;
    app: z.ZodLazy<z.ZodObject<{
        id: z.ZodUUID;
        name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        ownerId: z.ZodOptional<z.ZodString>;
        organizationId: z.ZodOptional<z.ZodString>;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
        deletedAt: z.ZodOptional<z.ZodDate>;
        isActive: z.ZodDefault<z.ZodBoolean>;
        owner: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            organizationId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
            id: z.ZodUUID;
            email: z.ZodEmail;
            fullName: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            roleId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
        }, z.core.$strip>>>;
        organization: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            id: z.ZodUUID;
            name: z.ZodString;
            domain: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, z.core.$strip>>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
type UsagePricingBase = z.infer<typeof UsagePricingBaseSchema>;
type UsagePricingReference = z.infer<typeof UsagePricingReferenceSchema>;
type UsagePricingDetailed = z.infer<typeof UsagePricingDetailedSchema>;

/**
 * Base schema for User (minimal flat structure)
 * Used internally for creation, validation, or lightweight fetches.
 */
declare const UserBaseSchema: z.ZodObject<{
    id: z.ZodUUID;
    email: z.ZodEmail;
    password: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    fullName: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    phone: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    bio: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    title: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    authId: z.ZodString;
    provider: z.ZodString;
    isActive: z.ZodDefault<z.ZodBoolean>;
    isVerified: z.ZodDefault<z.ZodBoolean>;
    avatarUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    locale: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    timezone: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    language: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    roleId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
    organizationId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
    planId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    deletedAt: z.ZodNullable<z.ZodOptional<z.ZodDate>>;
}, z.core.$strip>;
/**
 * Reference schema — used to embed user info inside other models.
 * Lightweight, no deep nesting, avoids circular dependencies.
 */
declare const UserReferenceSchema: z.ZodObject<{
    organizationId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
    id: z.ZodUUID;
    email: z.ZodEmail;
    fullName: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    roleId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
}, z.core.$strip>;
/**
 * Detailed schema — full user with nested relations and metadata.
 */
declare const UserDetailedSchema: z.ZodObject<{
    id: z.ZodUUID;
    email: z.ZodEmail;
    password: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    fullName: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    phone: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    bio: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    title: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    authId: z.ZodString;
    provider: z.ZodString;
    isActive: z.ZodDefault<z.ZodBoolean>;
    isVerified: z.ZodDefault<z.ZodBoolean>;
    avatarUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    locale: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    timezone: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    language: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    roleId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
    organizationId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
    planId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    deletedAt: z.ZodNullable<z.ZodOptional<z.ZodDate>>;
    role: z.ZodNullable<z.ZodOptional<z.ZodLazy<z.ZodObject<{
        id: z.ZodUUID;
        name: z.ZodString;
    }, z.core.$strip>>>>;
    organization: z.ZodNullable<z.ZodOptional<z.ZodLazy<z.ZodObject<{
        id: z.ZodUUID;
        name: z.ZodString;
        domain: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>>>>;
    plan: z.ZodNullable<z.ZodOptional<z.ZodLazy<z.ZodObject<{
        id: z.ZodUUID;
        name: z.ZodString;
        price: z.ZodNumber;
        maxUsage: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>>>;
    sessions: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodObject<{
        userId: z.ZodUUID;
        id: z.ZodUUID;
        createdAt: z.ZodDate;
        expiresAt: z.ZodDate;
    }, z.core.$strip>>>>;
    invoices: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodObject<{
        id: z.ZodUUID;
        amount: z.ZodNumber;
        createdAt: z.ZodDate;
        currency: z.ZodString;
        paid: z.ZodBoolean;
    }, z.core.$strip>>>>;
    apiKeys: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodObject<{
        userId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
        id: z.ZodUUID;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        keyPrefix: z.ZodString;
        hashedKey: z.ZodString;
        environment: z.ZodDefault<z.ZodString>;
        revoked: z.ZodDefault<z.ZodBoolean>;
    }, z.core.$strip>>>>;
    auditLogs: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodObject<{
        id: z.ZodUUID;
        createdAt: z.ZodDate;
        action: z.ZodString;
    }, z.core.$strip>>>>;
    preferences: z.ZodNullable<z.ZodOptional<z.ZodLazy<z.ZodObject<{
        userId: z.ZodUUID;
        id: z.ZodUUID;
        emailNotifications: z.ZodDefault<z.ZodBoolean>;
        darkMode: z.ZodDefault<z.ZodBoolean>;
    }, z.core.$strip>>>>;
    mfaSettings: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodObject<{
        type: z.ZodString;
        id: z.ZodUUID;
        enabled: z.ZodDefault<z.ZodBoolean>;
    }, z.core.$strip>>>>;
    reviews: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodObject<{
        id: z.ZodUUID;
        status: z.ZodEnum<{
            PENDING: "PENDING";
            APPROVED: "APPROVED";
            REJECTED: "REJECTED";
        }>;
        resourceType: z.ZodString;
        resourceId: z.ZodString;
    }, z.core.$strip>>>>;
    modelUsages: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodObject<{
        id: z.ZodUUID;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
        model: z.ZodString;
        vendor: z.ZodString;
        requestType: z.ZodString;
    }, z.core.$strip>>>>;
    revenueSplits: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodObject<{
        id: z.ZodUUID;
        percent: z.ZodNumber;
    }, z.core.$strip>>>>;
    apps: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodObject<{
        id: z.ZodUUID;
        name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        ownerId: z.ZodOptional<z.ZodString>;
        organizationId: z.ZodOptional<z.ZodString>;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
        deletedAt: z.ZodOptional<z.ZodDate>;
        isActive: z.ZodDefault<z.ZodBoolean>;
        owner: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            organizationId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
            id: z.ZodUUID;
            email: z.ZodEmail;
            fullName: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            roleId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
        }, z.core.$strip>>>;
        organization: z.ZodOptional<z.ZodLazy<z.ZodObject<{
            id: z.ZodUUID;
            name: z.ZodString;
            domain: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, z.core.$strip>>>;
    }, z.core.$strip>>>>;
    alerts: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodObject<{
        type: z.ZodString;
        message: z.ZodString;
        userId: z.ZodUUID;
        id: z.ZodUUID;
        appId: z.ZodNullable<z.ZodOptional<z.ZodUUID>>;
        triggeredAt: z.ZodDate;
        isRead: z.ZodDefault<z.ZodBoolean>;
    }, z.core.$strip>>>>;
    appApiKeys: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodObject<{
        appId: z.ZodString;
        key: z.ZodString;
        createdByUserId: z.ZodOptional<z.ZodString>;
        expiresAt: z.ZodOptional<z.ZodDate>;
        id: z.ZodUUID;
        createdAt: z.ZodDate;
    }, z.core.$strip>>>>;
    usageLogs: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodObject<{
        organizationId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        id: z.ZodUUID;
        createdAt: z.ZodDate;
        appId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        feature: z.ZodDefault<z.ZodEnum<{
            TEXT_GENERATION: "TEXT_GENERATION";
            IMAGE_GENERATION: "IMAGE_GENERATION";
            DATA_ANALYSIS: "DATA_ANALYSIS";
            TOKENS: "TOKENS";
            COMPUTE_TIME: "COMPUTE_TIME";
            VRAM_USAGE: "VRAM_USAGE";
            API_CALL: "API_CALL";
            STORAGE: "STORAGE";
            OTHER: "OTHER";
        }>>;
        usage: z.ZodNumber;
        billed: z.ZodDefault<z.ZodBoolean>;
        sessionId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>>>>;
}, z.core.$strip>;
type UserBase = z.infer<typeof UserBaseSchema>;
type UserReference = z.infer<typeof UserReferenceSchema>;
type UserDetailed = z.infer<typeof UserDetailedSchema>;

/**
 * Base schema — core fields
 */
declare const UserPreferencesBaseSchema: z.ZodObject<{
    id: z.ZodUUID;
    userId: z.ZodUUID;
    timezone: z.ZodOptional<z.ZodString>;
    locale: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    emailNotifications: z.ZodDefault<z.ZodBoolean>;
    darkMode: z.ZodDefault<z.ZodBoolean>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, z.core.$strip>;
/**
 * Reference schema — minimal info for embedding elsewhere
 */
declare const UserPreferencesReferenceSchema: z.ZodObject<{
    userId: z.ZodUUID;
    id: z.ZodUUID;
    emailNotifications: z.ZodDefault<z.ZodBoolean>;
    darkMode: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>;
/**
 * Detailed schema — includes nested relations
 */
declare const UserPreferencesDetailedSchema: z.ZodObject<{
    id: z.ZodUUID;
    userId: z.ZodUUID;
    timezone: z.ZodOptional<z.ZodString>;
    locale: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    emailNotifications: z.ZodDefault<z.ZodBoolean>;
    darkMode: z.ZodDefault<z.ZodBoolean>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    user: z.ZodOptional<z.ZodLazy<z.ZodObject<{
        organizationId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
        id: z.ZodUUID;
        email: z.ZodEmail;
        fullName: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        roleId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
type UserPreferencesBase = z.infer<typeof UserPreferencesBaseSchema>;
type UserPreferencesReference = z.infer<typeof UserPreferencesReferenceSchema>;
type UserPreferencesDetailed = z.infer<typeof UserPreferencesDetailedSchema>;

/**
 * Base schema — core session fields
 */
declare const UserSessionBaseSchema: z.ZodObject<{
    id: z.ZodUUID;
    userId: z.ZodUUID;
    expiresAt: z.ZodDate;
    ipAddress: z.ZodOptional<z.ZodString>;
    userAgent: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, z.core.$strip>;
/**
 * Reference schema — minimal info for embedding elsewhere
 */
declare const UserSessionReferenceSchema: z.ZodObject<{
    userId: z.ZodUUID;
    id: z.ZodUUID;
    createdAt: z.ZodDate;
    expiresAt: z.ZodDate;
}, z.core.$strip>;
/**
 * Detailed schema — includes nested relations
 */
declare const UserSessionDetailedSchema: z.ZodObject<{
    id: z.ZodUUID;
    userId: z.ZodUUID;
    expiresAt: z.ZodDate;
    ipAddress: z.ZodOptional<z.ZodString>;
    userAgent: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    user: z.ZodOptional<z.ZodLazy<z.ZodObject<{
        organizationId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
        id: z.ZodUUID;
        email: z.ZodEmail;
        fullName: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        roleId: z.ZodOptional<z.ZodNullable<z.ZodUUID>>;
    }, z.core.$strip>>>;
    usageLogs: z.ZodOptional<z.ZodArray<z.ZodLazy<z.ZodObject<{
        organizationId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        id: z.ZodUUID;
        createdAt: z.ZodDate;
        appId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        feature: z.ZodDefault<z.ZodEnum<{
            TEXT_GENERATION: "TEXT_GENERATION";
            IMAGE_GENERATION: "IMAGE_GENERATION";
            DATA_ANALYSIS: "DATA_ANALYSIS";
            TOKENS: "TOKENS";
            COMPUTE_TIME: "COMPUTE_TIME";
            VRAM_USAGE: "VRAM_USAGE";
            API_CALL: "API_CALL";
            STORAGE: "STORAGE";
            OTHER: "OTHER";
        }>>;
        usage: z.ZodNumber;
        billed: z.ZodDefault<z.ZodBoolean>;
        sessionId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>>>>;
}, z.core.$strip>;
type UserSessionBase = z.infer<typeof UserSessionBaseSchema>;
type UserSessionReference = z.infer<typeof UserSessionReferenceSchema>;
type UserSessionDetailed = z.infer<typeof UserSessionDetailedSchema>;

/**
 * Base schema — core WaitlistSignup fields
 */
declare const WaitlistBaseSchema: z.ZodObject<{
    id: z.ZodUUID;
    email: z.ZodEmail;
    name: z.ZodOptional<z.ZodString>;
    company: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodString>;
    interest: z.ZodOptional<z.ZodString>;
    importance: z.ZodDefault<z.ZodNumber>;
    source: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodDate;
}, z.core.$strip>;
/**
 * Reference schema — minimal info for embedding elsewhere
 */
declare const WaitlistReferenceSchema: z.ZodObject<{
    id: z.ZodUUID;
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodEmail;
    importance: z.ZodDefault<z.ZodNumber>;
}, z.core.$strip>;
/**
 * Create schema — for public submissions
 */
declare const WaitlistCreateSchema: z.ZodObject<{
    email: z.ZodEmail;
    name: z.ZodOptional<z.ZodString>;
    company: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodString>;
    interest: z.ZodOptional<z.ZodString>;
    source: z.ZodOptional<z.ZodString>;
    importance: z.ZodOptional<z.ZodNumber>;
    notes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/**
 * Detailed schema — internal use only (admin views)
 */
declare const WaitlistDetailedSchema: z.ZodObject<{
    id: z.ZodUUID;
    email: z.ZodEmail;
    name: z.ZodOptional<z.ZodString>;
    company: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodString>;
    interest: z.ZodOptional<z.ZodString>;
    importance: z.ZodDefault<z.ZodNumber>;
    source: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodOptional<z.ZodDate>;
}, z.core.$strip>;
type WaitlistBase = z.infer<typeof WaitlistBaseSchema>;
type WaitlistReference = z.infer<typeof WaitlistReferenceSchema>;
type WaitlistCreate = z.infer<typeof WaitlistCreateSchema>;
type WaitlistDetailed = z.infer<typeof WaitlistDetailedSchema>;

/**
 * Shared SuperJSON transformer for tRPC.
 *
 * @remarks
 * Ensures consistent serialization between server and client
 * for complex data types such as Date, Map, and Set.
 */
declare const transformer: typeof superjson;

// packages/shared/src/types/router.ts


type AppRouter = AppRouter$1;

export { AI_FEATURES, API_KEY_ENVIRONMENTS, API_KEY_PREFIXES, type AddAllowedOriginInput, AddAllowedOriginInputSchema, type AlertBase, AlertBaseSchema, type AlertDetailed, AlertDetailedSchema, type AlertReference, AlertReferenceSchema, type AllowedOriginBase, AllowedOriginBaseSchema, type AllowedOriginDetailed, AllowedOriginDetailedSchema, type AllowedOriginReference, AllowedOriginReferenceSchema, type ApiKeyBase, ApiKeyBaseSchema, type ApiKeyDetailed, ApiKeyDetailedSchema, type ApiKeyEnvironment, type ApiKeyPrefix, type ApiKeyReference, ApiKeyReferenceSchema, type AppApiKeyBase, AppApiKeyBaseSchema, type AppApiKeyDetailed, AppApiKeyDetailedSchema, type AppApiKeyReference, AppApiKeyReferenceSchema, type AppBase, AppBaseSchema, type AppDetailed, AppDetailedSchema, type AppMetricBase, AppMetricBaseSchema, type AppMetricDetailed, AppMetricDetailedSchema, type AppMetricReference, AppMetricReferenceSchema, type AppReference, AppReferenceSchema, type AppRouter, type AuditLogBase, AuditLogBaseSchema, type AuditLogDetailed, AuditLogDetailedSchema, type AuditLogReference, AuditLogReferenceSchema, type AuthResponse, AuthResponseSchema, COOKIE_NAME, COOKIE_OPTIONS, type ChangeLogBase, ChangeLogBaseSchema, type ChangeLogDetailed, ChangeLogDetailedSchema, type ChangeLogReference, ChangeLogReferenceSchema, type ChargeBase, ChargeBaseSchema, type ChargeDetailed, ChargeDetailedSchema, type ChargeReference, ChargeReferenceSchema, type CountMetrics, CountMetricsSchema, type CreateApiKeyInput, CreateApiKeyInputSchema, type CreateOrganizationInput, CreateOrganizationInputSchema, type EndUserBase, EndUserBaseSchema, type EndUserDetailed, EndUserDetailedSchema, type EndUserReference, EndUserReferenceSchema, type EventLogBase, EventLogBaseSchema, type EventLogDetailed, EventLogDetailedSchema, type EventLogReference, EventLogReferenceSchema, type Feature, FeatureEnum, type FeatureFlagBase, FeatureFlagBaseSchema, type FeatureFlagDetailed, FeatureFlagDetailedSchema, type FeatureFlagReference, FeatureFlagReferenceSchema, type FeatureType, type FeatureUsageSummary, type ForecastBase, ForecastBaseSchema, type ForecastDetailed, ForecastDetailedSchema, type ForecastReference, ForecastReferenceSchema, type GlobalAllowedOrigin, type GlobalAllowedOriginDetailed, GlobalAllowedOriginDetailedSchema, GlobalAllowedOriginSchema, type IntegrationBase, IntegrationBaseSchema, type IntegrationDetailed, IntegrationDetailedSchema, type IntegrationReference, IntegrationReferenceSchema, type InvoiceBase, InvoiceBaseSchema, type InvoiceDetailed, InvoiceDetailedSchema, type InvoiceItemBase, InvoiceItemBaseSchema, type InvoiceItemDetailed, InvoiceItemDetailedSchema, type InvoiceItemReference, InvoiceItemReferenceSchema, type InvoiceReference, InvoiceReferenceSchema, type JwtPayload, JwtPayloadSchema, type MFABase, MFABaseSchema, type MFADetailed, MFADetailedSchema, type MFAReference, MFAReferenceSchema, type ModelUsageBase, ModelUsageBaseSchema, type ModelUsageDetailed, ModelUsageDetailedSchema, type ModelUsageInput, ModelUsageInputSchema, type ModelUsageReference, ModelUsageReferenceSchema, type MonthlyUsage, MonthlyUsageSchema, type OpenMeterUsageEntry, OpenMeterUsageEntrySchema, type OrgUsageSummary, type OrgUsageSummaryItem, OrgUsageSummaryItemSchema, OrgUsageSummarySchema, type OrganizationBase, OrganizationBaseSchema, type OrganizationDetailed, OrganizationDetailedSchema, type OrganizationPlanBase, OrganizationPlanBaseSchema, type OrganizationPlanDetailed, OrganizationPlanDetailedSchema, type OrganizationPlanReference, OrganizationPlanReferenceSchema, type OrganizationReference, OrganizationReferenceSchema, type PlanBase, PlanBaseSchema, type PlanDetailed, PlanDetailedSchema, type PlanFeatureBase, PlanFeatureBaseSchema, type PlanFeatureDetailed, PlanFeatureDetailedSchema, type PlanFeatureReference, PlanFeatureReferenceSchema, type PlanReference, PlanReferenceSchema, type RecordUsageInput, RecordUsageInputSchema, type RemoveAllowedOriginInput, RemoveAllowedOriginInputSchema, type RevenueSplitBase, RevenueSplitBaseSchema, type RevenueSplitDetailed, RevenueSplitDetailedSchema, type RevenueSplitReference, RevenueSplitReferenceSchema, type ReviewBase, ReviewBaseSchema, type ReviewDetailed, ReviewDetailedSchema, type ReviewReference, ReviewReferenceSchema, ReviewStatusEnum, type RoleBase, RoleBaseSchema, type RoleDetailed, RoleDetailedSchema, type RoleReference, RoleReferenceSchema, type SdkLogBase, SdkLogBaseSchema, type SdkLogDetailed, SdkLogDetailedSchema, type SdkLogReference, SdkLogReferenceSchema, type SessionMetrics, SessionMetricsSchema, type UpdateOrganizationInput, UpdateOrganizationInputSchema, type UsageByFeature, UsageByFeatureSchema, type UsageForDateRangeResult, type UsageLimitBase, UsageLimitBaseSchema, type UsageLimitDetailed, UsageLimitDetailedSchema, type UsageLimitReference, UsageLimitReferenceSchema, type UsageLogBase, UsageLogBaseSchema, type UsageLogDetailed, UsageLogDetailedSchema, type UsageLogReference, UsageLogReferenceSchema, type UsageLogWithUser, UsageLogWithUserSchema, type UsageLogsTable, UsageLogsTableSchema, type UsagePayload, UsagePayloadSchema, type UsagePricingBase, UsagePricingBaseSchema, type UsagePricingDetailed, UsagePricingDetailedSchema, type UsagePricingReference, UsagePricingReferenceSchema, type UsageSummary, type UsageSummaryChart, UsageSummaryChartSchema, type UsageSummaryItem, UsageSummaryItemSchema, UsageSummarySchema, type UsageThresholdAlert, UsageThresholdAlertSchema, type UserBase, UserBaseSchema, type UserDetailed, UserDetailedSchema, type UserLoginInput, UserLoginInputSchema, type UserPreferencesBase, UserPreferencesBaseSchema, type UserPreferencesDetailed, UserPreferencesDetailedSchema, type UserPreferencesReference, UserPreferencesReferenceSchema, type UserReference, UserReferenceSchema, type UserRegisterInput, UserRegisterInputSchema, type UserSessionBase, UserSessionBaseSchema, type UserSessionDetailed, UserSessionDetailedSchema, type UserSessionReference, UserSessionReferenceSchema, type VerifiedTokenResult, VerifiedTokenResultSchema, type WaitlistBase, WaitlistBaseSchema, type WaitlistCreate, WaitlistCreateSchema, type WaitlistDetailed, WaitlistDetailedSchema, type WaitlistReference, WaitlistReferenceSchema, decodeJwt, getAuthCookieName, signJwt, transformer, verifyJwt };
