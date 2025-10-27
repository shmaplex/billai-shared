// src/constants/apiKeys.ts
var API_KEY_PREFIXES = {
  TEST: "billai_test_",
  LIVE: "billai_live_"
};

// src/constants/cookies.ts
var COOKIE_NAME = "billai-token";
var COOKIE_OPTIONS = {
  // Cookie path; '/' makes it available across the entire site
  path: "/",
  // Secure cookies should only be sent over HTTPS (set to true in production)
  secure: process.env.NODE_ENV === "production",
  // Only accessible via HTTP(S), not JavaScript (helps prevent XSS)
  httpOnly: true,
  // Cookie expiration in days
  expires: 7,
  // Optional: SameSite setting for CSRF protection
  sameSite: "lax"
};
var getAuthCookieName = () => COOKIE_NAME;

// src/constants/features.ts
var AI_FEATURES = [
  "TEXT_GENERATION",
  // for text/LLM usage
  "IMAGE_GENERATION",
  // for image diffusion or gen models
  "DATA_ANALYSIS",
  // for analytical or AI data ops
  "TOKENS",
  // tokens used for text/LLM models
  "COMPUTE_TIME",
  // time spent on CPU/GPU for tasks
  "VRAM_USAGE",
  // GPU memory consumed
  "API_CALL",
  // number of API requests
  "STORAGE",
  // optional: storage used per user/app
  "OTHER"
  // fallback for miscellaneous usage
];

// src/lib/jwt.ts
import { jwtVerify, SignJWT } from "jose";
import { z } from "zod";
var JwtPayloadSchema = z.object({
  userId: z.string().uuid(),
  role: z.string().optional(),
  organizationId: z.string().uuid().optional(),
  iat: z.number().optional(),
  // issued at
  exp: z.number().optional()
  // expiration time
});
function getSecretKey() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET environment variable is not defined");
  }
  return new TextEncoder().encode(secret);
}
async function signJwt(payload) {
  JwtPayloadSchema.parse(payload);
  const secret = getSecretKey();
  const expiresIn = process.env.JWT_EXPIRES_IN || "1h";
  const now = Math.floor(Date.now() / 1e3);
  const expSeconds = (() => {
    const unit = expiresIn.slice(-1);
    const value = Number.parseInt(expiresIn.slice(0, -1), 10);
    switch (unit) {
      case "s":
        return now + value;
      case "m":
        return now + value * 60;
      case "h":
        return now + value * 3600;
      case "d":
        return now + value * 86400;
      case "w":
        return now + value * 604800;
      case "y":
        return now + value * 31536e3;
      default:
        return now + 3600;
    }
  })();
  return await new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt(now).setExpirationTime(expSeconds).sign(secret);
}
async function verifyJwt(token) {
  const secret = getSecretKey();
  try {
    const { payload } = await jwtVerify(token, secret);
    return JwtPayloadSchema.parse(payload);
  } catch {
    return null;
  }
}

// ../../node_modules/.pnpm/jwt-decode@4.0.0/node_modules/jwt-decode/build/esm/index.js
var InvalidTokenError = class extends Error {
};
InvalidTokenError.prototype.name = "InvalidTokenError";
function b64DecodeUnicode(str) {
  return decodeURIComponent(atob(str).replace(/(.)/g, (m, p) => {
    let code = p.charCodeAt(0).toString(16).toUpperCase();
    if (code.length < 2) {
      code = "0" + code;
    }
    return "%" + code;
  }));
}
function base64UrlDecode(str) {
  let output = str.replace(/-/g, "+").replace(/_/g, "/");
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += "==";
      break;
    case 3:
      output += "=";
      break;
    default:
      throw new Error("base64 string is not of the correct length");
  }
  try {
    return b64DecodeUnicode(output);
  } catch (err) {
    return atob(output);
  }
}
function jwtDecode(token, options) {
  if (typeof token !== "string") {
    throw new InvalidTokenError("Invalid token specified: must be a string");
  }
  options || (options = {});
  const pos = options.header === true ? 0 : 1;
  const part = token.split(".")[pos];
  if (typeof part !== "string") {
    throw new InvalidTokenError(`Invalid token specified: missing part #${pos + 1}`);
  }
  let decoded;
  try {
    decoded = base64UrlDecode(part);
  } catch (e) {
    throw new InvalidTokenError(`Invalid token specified: invalid base64 for part #${pos + 1} (${e.message})`);
  }
  try {
    return JSON.parse(decoded);
  } catch (e) {
    throw new InvalidTokenError(`Invalid token specified: invalid json for part #${pos + 1} (${e.message})`);
  }
}

// src/lib/jwtDecode.ts
function decodeJwt(token) {
  try {
    const decoded = jwtDecode(token);
    const normalized = {
      ...decoded,
      iat: typeof decoded.iat === "string" ? Number.parseInt(decoded.iat, 10) : decoded.iat,
      exp: typeof decoded.exp === "string" ? Number.parseInt(decoded.exp, 10) : decoded.exp
    };
    return JwtPayloadSchema.parse(normalized);
  } catch {
    return null;
  }
}

// src/schemas/alert.schema.ts
import { z as z23 } from "zod";

// src/schemas/app.schema.ts
import { z as z22 } from "zod";

// src/schemas/organization.schema.ts
import { z as z21 } from "zod";

// src/schemas/modelUsage.schema.ts
import { z as z20 } from "zod";

// src/schemas/apiKey.schema.ts
import { z as z19 } from "zod";

// src/schemas/usageLog.schema.ts
import { z as z18 } from "zod";

// src/schemas/endUser.schema.ts
import { z as z17 } from "zod";

// src/schemas/charge.schema.ts
import { z as z16 } from "zod";

// src/schemas/invoice.schema.ts
import { z as z15 } from "zod";

// src/schemas/invoiceItem.schema.ts
import { z as z2 } from "zod";
var InvoiceItemBaseSchema = z2.object({
  id: z2.uuid(),
  invoiceId: z2.uuid(),
  description: z2.string(),
  amount: z2.number(),
  quantity: z2.number().default(1),
  createdAt: z2.date()
});
var InvoiceItemReferenceSchema = InvoiceItemBaseSchema.pick({
  id: true,
  description: true,
  amount: true,
  quantity: true
});
var InvoiceItemDetailedSchema = InvoiceItemBaseSchema.extend({
  invoice: z2.lazy(() => InvoiceReferenceSchema).optional()
});

// src/schemas/user.schema.ts
import { z as z14 } from "zod";

// src/schemas/appApiKey.schema.ts
import { z as z3 } from "zod";
var AppApiKeyBaseSchema = z3.object({
  appId: z3.string(),
  key: z3.string(),
  createdByUserId: z3.string().optional(),
  expiresAt: z3.date().optional()
});
var AppApiKeyReferenceSchema = AppApiKeyBaseSchema.extend({
  id: z3.uuid(),
  createdAt: z3.date()
});
var AppApiKeyDetailedSchema = AppApiKeyReferenceSchema.extend({
  app: z3.lazy(() => AppReferenceSchema),
  createdBy: z3.lazy(() => UserReferenceSchema).optional()
});

// src/schemas/auditLog.schema.ts
import { z as z4 } from "zod";
var AuditLogBaseSchema = z4.object({
  id: z4.uuid(),
  userId: z4.uuid(),
  action: z4.string().min(1, "Action is required."),
  details: z4.string().optional(),
  createdAt: z4.date(),
  appId: z4.uuid().optional()
});
var AuditLogReferenceSchema = AuditLogBaseSchema.pick({
  id: true,
  action: true,
  createdAt: true
});
var AuditLogDetailedSchema = AuditLogBaseSchema.extend({
  user: z4.lazy(() => UserReferenceSchema),
  app: z4.lazy(() => AppReferenceSchema).optional()
});

// src/schemas/mfa.schema.ts
import { z as z5 } from "zod";
var MFABaseSchema = z5.object({
  id: z5.uuid(),
  userId: z5.uuid(),
  type: z5.string(),
  secret: z5.string(),
  enabled: z5.boolean().default(false),
  createdAt: z5.date(),
  updatedAt: z5.date()
});
var MFAReferenceSchema = MFABaseSchema.pick({
  id: true,
  type: true,
  enabled: true
});
var MFADetailedSchema = MFABaseSchema.extend({
  user: z5.lazy(() => UserReferenceSchema).optional()
});

// src/schemas/plan.schema.ts
import { z as z8 } from "zod";

// src/schemas/organizationPlan.schema.ts
import { z as z6 } from "zod";
var OrganizationPlanBaseSchema = z6.object({
  id: z6.uuid(),
  organizationId: z6.uuid().optional(),
  planId: z6.uuid().optional(),
  startDate: z6.date(),
  endDate: z6.date().nullable().optional(),
  createdAt: z6.date(),
  updatedAt: z6.date()
});
var OrganizationPlanReferenceSchema = OrganizationPlanBaseSchema.pick({
  id: true,
  organizationId: true,
  planId: true,
  startDate: true,
  endDate: true
});
var OrganizationPlanDetailedSchema = OrganizationPlanBaseSchema.extend(
  {
    organization: z6.lazy(() => OrganizationReferenceSchema).optional(),
    plan: z6.lazy(() => PlanReferenceSchema).optional()
  }
);

// src/schemas/planFeature.schema.ts
import { z as z7 } from "zod";
var PlanFeatureBaseSchema = z7.object({
  id: z7.uuid(),
  planId: z7.uuid(),
  name: z7.string(),
  limit: z7.number().optional(),
  price: z7.number().optional(),
  metadata: z7.any().optional(),
  createdAt: z7.date()
});
var PlanFeatureReferenceSchema = PlanFeatureBaseSchema.pick({
  id: true,
  name: true
});
var PlanFeatureDetailedSchema = PlanFeatureBaseSchema.extend({
  plan: z7.lazy(() => PlanReferenceSchema).optional()
});

// src/schemas/plan.schema.ts
var PlanBaseSchema = z8.object({
  id: z8.uuid(),
  name: z8.string(),
  price: z8.number(),
  maxUsage: z8.number().optional(),
  interval: z8.string().default("monthly"),
  features: z8.string().optional(),
  createdAt: z8.date(),
  updatedAt: z8.date()
});
var PlanReferenceSchema = PlanBaseSchema.pick({
  id: true,
  name: true,
  price: true,
  maxUsage: true
});
var PlanDetailedSchema = PlanBaseSchema.extend({
  users: z8.array(z8.lazy(() => UserReferenceSchema)).optional(),
  organizationPlans: z8.array(z8.lazy(() => OrganizationPlanReferenceSchema)).optional(),
  planFeatures: z8.array(z8.lazy(() => PlanFeatureReferenceSchema)).optional()
});

// src/schemas/revenueSplit.schema.ts
import { z as z9 } from "zod";
var RevenueSplitBaseSchema = z9.object({
  id: z9.uuid(),
  appId: z9.uuid(),
  recipientId: z9.uuid().optional(),
  percent: z9.number(),
  createdAt: z9.date(),
  deletedAt: z9.date().optional()
});
var RevenueSplitReferenceSchema = RevenueSplitBaseSchema.pick({
  id: true,
  percent: true
});
var RevenueSplitDetailedSchema = RevenueSplitBaseSchema.extend({
  app: z9.lazy(() => AppReferenceSchema),
  recipient: z9.lazy(() => UserReferenceSchema).optional()
});

// src/schemas/review.schema.ts
import { z as z10 } from "zod";
var ReviewStatusEnum = z10.enum(["PENDING", "APPROVED", "REJECTED"]);
var ReviewBaseSchema = z10.object({
  id: z10.uuid(),
  reviewerId: z10.uuid(),
  resourceType: z10.string(),
  resourceId: z10.string(),
  status: ReviewStatusEnum,
  notes: z10.string().nullable().optional(),
  createdAt: z10.date(),
  updatedAt: z10.date()
});
var ReviewReferenceSchema = ReviewBaseSchema.pick({
  id: true,
  status: true,
  resourceType: true,
  resourceId: true
});
var ReviewDetailedSchema = ReviewBaseSchema.extend({
  reviewer: z10.lazy(() => UserReferenceSchema)
});

// src/schemas/role.schema.ts
import { z as z11 } from "zod";
var RoleBaseSchema = z11.object({
  id: z11.uuid(),
  name: z11.string(),
  description: z11.string().optional(),
  permissions: z11.string().optional(),
  createdBy: z11.string().optional(),
  updatedBy: z11.string().optional()
});
var RoleReferenceSchema = RoleBaseSchema.pick({
  id: true,
  name: true
});
var RoleDetailedSchema = RoleBaseSchema.extend({
  users: z11.array(z11.lazy(() => UserReferenceSchema)).optional()
});

// src/schemas/userPreferences.schema.ts
import { z as z12 } from "zod";
var UserPreferencesBaseSchema = z12.object({
  id: z12.uuid(),
  userId: z12.uuid(),
  timezone: z12.string().optional(),
  locale: z12.string().optional(),
  language: z12.string().optional(),
  emailNotifications: z12.boolean().default(true),
  darkMode: z12.boolean().default(false),
  createdAt: z12.date(),
  updatedAt: z12.date()
});
var UserPreferencesReferenceSchema = UserPreferencesBaseSchema.pick({
  id: true,
  userId: true,
  emailNotifications: true,
  darkMode: true
});
var UserPreferencesDetailedSchema = UserPreferencesBaseSchema.extend({
  user: z12.lazy(() => UserReferenceSchema).optional()
});

// src/schemas/userSession.schema.ts
import { z as z13 } from "zod";
var UserSessionBaseSchema = z13.object({
  id: z13.uuid(),
  userId: z13.uuid(),
  expiresAt: z13.date(),
  ipAddress: z13.string().optional(),
  userAgent: z13.string().optional(),
  createdAt: z13.date(),
  updatedAt: z13.date()
});
var UserSessionReferenceSchema = UserSessionBaseSchema.pick({
  id: true,
  userId: true,
  expiresAt: true,
  createdAt: true
});
var UserSessionDetailedSchema = UserSessionBaseSchema.extend({
  user: z13.lazy(() => UserReferenceSchema).optional(),
  usageLogs: z13.array(z13.lazy(() => UsageLogReferenceSchema)).optional()
});

// src/schemas/user.schema.ts
var UserBaseSchema = z14.object({
  id: z14.uuid(),
  email: z14.email(),
  password: z14.string().optional().nullable(),
  fullName: z14.string().optional().nullable(),
  phone: z14.string().optional().nullable(),
  bio: z14.string().optional().nullable(),
  title: z14.string().optional().nullable(),
  authId: z14.string(),
  provider: z14.string(),
  isActive: z14.boolean().default(true),
  isVerified: z14.boolean().default(false),
  avatarUrl: z14.string().optional().nullable(),
  locale: z14.string().optional().nullable(),
  timezone: z14.string().optional().nullable(),
  language: z14.string().optional().nullable(),
  roleId: z14.uuid().nullable().optional(),
  organizationId: z14.uuid().nullable().optional(),
  planId: z14.uuid().nullable().optional(),
  createdAt: z14.date(),
  updatedAt: z14.date(),
  deletedAt: z14.date().optional().nullable()
});
var UserReferenceSchema = UserBaseSchema.pick({
  id: true,
  email: true,
  fullName: true,
  organizationId: true,
  roleId: true
});
var UserDetailedSchema = UserBaseSchema.extend({
  // ─────────── Relations ───────────
  role: z14.lazy(() => RoleReferenceSchema).optional().nullable(),
  organization: z14.lazy(() => OrganizationReferenceSchema).optional().nullable(),
  plan: z14.lazy(() => PlanReferenceSchema).optional().nullable(),
  // ─────────── Nested Collections ───────────
  sessions: z14.array(z14.lazy(() => UserSessionReferenceSchema)).optional(),
  invoices: z14.array(z14.lazy(() => InvoiceReferenceSchema)).optional(),
  apiKeys: z14.array(z14.lazy(() => ApiKeyReferenceSchema)).optional(),
  auditLogs: z14.array(z14.lazy(() => AuditLogReferenceSchema)).optional(),
  preferences: z14.lazy(() => UserPreferencesReferenceSchema).optional().nullable(),
  mfaSettings: z14.array(z14.lazy(() => MFAReferenceSchema)).optional(),
  reviews: z14.array(z14.lazy(() => ReviewReferenceSchema)).optional(),
  modelUsages: z14.array(z14.lazy(() => ModelUsageReferenceSchema)).optional(),
  revenueSplits: z14.array(z14.lazy(() => RevenueSplitReferenceSchema)).optional(),
  apps: z14.array(z14.lazy(() => AppReferenceSchema)).optional(),
  alerts: z14.array(z14.lazy(() => AlertReferenceSchema)).optional(),
  appApiKeys: z14.array(z14.lazy(() => AppApiKeyReferenceSchema)).optional(),
  usageLogs: z14.array(z14.lazy(() => UsageLogReferenceSchema)).optional()
});

// src/schemas/invoice.schema.ts
var InvoiceBaseSchema = z15.object({
  id: z15.uuid(),
  userId: z15.uuid(),
  appId: z15.uuid().optional(),
  endUserId: z15.uuid().optional(),
  amount: z15.number(),
  currency: z15.string(),
  paid: z15.boolean(),
  createdAt: z15.date(),
  updatedAt: z15.date(),
  dueDate: z15.date().optional(),
  paidAt: z15.date().optional(),
  deletedAt: z15.date().optional()
});
var InvoiceReferenceSchema = InvoiceBaseSchema.pick({
  id: true,
  amount: true,
  currency: true,
  paid: true,
  createdAt: true
});
var InvoiceDetailedSchema = InvoiceBaseSchema.extend({
  user: z15.lazy(() => UserReferenceSchema).optional(),
  app: z15.lazy(() => AppReferenceSchema).optional(),
  endUser: z15.lazy(() => EndUserReferenceSchema).optional(),
  items: z15.array(z15.lazy(() => InvoiceItemReferenceSchema)).optional(),
  charges: z15.array(z15.lazy(() => ChargeReferenceSchema)).optional()
});

// src/schemas/charge.schema.ts
var ChargeBaseSchema = z16.object({
  id: z16.uuid(),
  invoiceId: z16.uuid().optional(),
  endUserId: z16.uuid().optional(),
  appId: z16.uuid(),
  amount: z16.number().nonnegative(),
  status: z16.enum(["PENDING", "PAID", "FAILED", "REFUNDED"]),
  createdAt: z16.date(),
  paidAt: z16.date().optional(),
  deletedAt: z16.date().optional()
});
var ChargeReferenceSchema = ChargeBaseSchema.pick({
  id: true,
  appId: true,
  amount: true,
  status: true,
  createdAt: true
});
var ChargeDetailedSchema = ChargeBaseSchema.extend({
  invoice: z16.lazy(() => InvoiceReferenceSchema).optional(),
  endUser: z16.lazy(() => EndUserReferenceSchema).optional(),
  app: z16.lazy(() => AppReferenceSchema)
});

// src/schemas/endUser.schema.ts
var EndUserBaseSchema = z17.object({
  id: z17.uuid(),
  appId: z17.uuid(),
  externalId: z17.string(),
  email: z17.email().optional(),
  createdAt: z17.date(),
  updatedAt: z17.date(),
  deletedAt: z17.date().optional()
});
var EndUserReferenceSchema = EndUserBaseSchema.pick({
  id: true,
  appId: true,
  externalId: true,
  email: true
});
var EndUserDetailedSchema = EndUserBaseSchema.extend({
  app: z17.lazy(() => AppReferenceSchema).optional(),
  invoices: z17.array(z17.lazy(() => InvoiceReferenceSchema)).optional(),
  charges: z17.array(z17.lazy(() => ChargeReferenceSchema)).optional(),
  usageLogs: z17.array(z17.any()).optional(),
  // replace with UsageLogReferenceSchema when available
  eventLogs: z17.array(z17.any()).optional(),
  // replace with EventLogReferenceSchema
  usageLimits: z17.array(z17.any()).optional(),
  // replace with UsageLimitReferenceSchema
  sdkLogs: z17.array(z17.any()).optional()
  // replace with SdkLogReferenceSchema
});

// src/schemas/usageLog.schema.ts
var FeatureEnum = z18.enum(AI_FEATURES);
var UsageLogBaseSchema = z18.object({
  id: z18.uuid(),
  userId: z18.string().nullable().optional(),
  organizationId: z18.string().nullable().optional(),
  appId: z18.string().nullable().optional(),
  endUserId: z18.string().nullable().optional(),
  apiKeyId: z18.string().nullable().optional(),
  feature: FeatureEnum.default("OTHER"),
  usage: z18.number(),
  unitCost: z18.number().nullable().optional(),
  billed: z18.boolean().default(false),
  sessionId: z18.string().nullable().optional(),
  createdAt: z18.date(),
  openMeterReported: z18.boolean().nullable().optional(),
  openMeterId: z18.string().nullable().optional(),
  deletedAt: z18.date().nullable().optional(),
  metadata: z18.record(z18.string(), z18.any()).optional()
});
var UsageLogReferenceSchema = UsageLogBaseSchema.pick({
  id: true,
  feature: true,
  usage: true,
  billed: true,
  createdAt: true,
  sessionId: true,
  appId: true,
  organizationId: true
});
var UsageLogDetailedSchema = UsageLogBaseSchema.extend({
  user: z18.lazy(() => UserReferenceSchema).nullable().optional(),
  organization: z18.lazy(() => OrganizationReferenceSchema).nullable().optional(),
  apiKey: z18.lazy(() => ApiKeyReferenceSchema).nullable().optional(),
  app: z18.lazy(() => AppReferenceSchema).nullable().optional(),
  endUser: z18.lazy(() => EndUserReferenceSchema).nullable().optional(),
  session: z18.lazy(() => UserSessionReferenceSchema).nullable().optional()
});

// src/schemas/apiKey.schema.ts
var API_KEY_ENVIRONMENTS = {
  LIVE: "live",
  TEST: "test"
};
var ApiKeyBaseSchema = z19.object({
  id: z19.uuid(),
  userId: z19.uuid().nullable().optional(),
  keyPrefix: z19.string(),
  hashedKey: z19.string(),
  name: z19.string().nullable().optional(),
  environment: z19.string().default("live"),
  revoked: z19.boolean().default(false),
  createdAt: z19.date(),
  updatedAt: z19.date()
});
var ApiKeyReferenceSchema = ApiKeyBaseSchema.pick({
  id: true,
  userId: true,
  keyPrefix: true,
  hashedKey: true,
  name: true,
  environment: true,
  revoked: true,
  createdAt: true,
  updatedAt: true
});
var ApiKeyDetailedSchema = ApiKeyBaseSchema.extend({
  scopes: z19.string().nullable().optional(),
  expiresAt: z19.date().nullable().optional(),
  lastUsedAt: z19.date().nullable().optional(),
  user: z19.lazy(() => UserReferenceSchema).optional().nullable(),
  usageLogs: z19.array(z19.lazy(() => UsageLogReferenceSchema)).optional(),
  modelUsages: z19.array(z19.lazy(() => ModelUsageReferenceSchema)).optional()
});
var CreateApiKeyInputSchema = z19.object({
  userId: z19.uuid(),
  name: z19.string().optional(),
  scopes: z19.array(z19.string()).optional(),
  environment: z19.enum(["test", "live"]).default("live")
});

// src/schemas/modelUsage.schema.ts
var SessionMetricsSchema = z20.object({
  count: z20.number().nonnegative().default(0),
  avgLatencyMs: z20.number().nonnegative().default(0),
  p50LatencyMs: z20.number().nonnegative().default(0),
  p90LatencyMs: z20.number().nonnegative().default(0),
  p99LatencyMs: z20.number().nonnegative().default(0)
});
var CountMetricsSchema = z20.object({
  successCount: z20.number().int().nonnegative().default(0),
  failureCount: z20.number().int().nonnegative().default(0)
});
var ModelUsageBaseSchema = z20.object({
  id: z20.uuid(),
  userId: z20.uuid().optional(),
  organizationId: z20.uuid().optional(),
  apiKeyId: z20.uuid().optional(),
  appId: z20.uuid().optional(),
  model: z20.string(),
  vendor: z20.string(),
  modelVersion: z20.string().optional(),
  requestType: z20.string(),
  usageCount: z20.number().default(1),
  success: z20.boolean().default(true),
  successCount: z20.number().default(0),
  failureCount: z20.number().default(0),
  avgLatencyMs: z20.number().optional(),
  p50LatencyMs: z20.number().optional(),
  p90LatencyMs: z20.number().optional(),
  p99LatencyMs: z20.number().optional(),
  latencyMs: z20.number().optional(),
  throughput: z20.number().optional(),
  queueTimeMs: z20.number().optional(),
  errorType: z20.string().optional(),
  retryCount: z20.number().optional(),
  region: z20.string().optional(),
  promptLengthTokens: z20.number().optional(),
  responseLengthTokens: z20.number().optional(),
  unitCost: z20.number().optional(),
  totalCost: z20.number().optional(),
  billed: z20.boolean().default(false),
  discountApplied: z20.number().optional(),
  planTier: z20.string().optional(),
  temperature: z20.number().optional(),
  maxTokens: z20.number().optional(),
  totalTokens: z20.number().optional(),
  topP: z20.number().optional(),
  stopSequences: z20.array(z20.string()).optional(),
  embeddingDimension: z20.number().optional(),
  imageResolution: z20.string().optional(),
  sdkVersion: z20.string().optional(),
  userAgent: z20.string().optional(),
  language: z20.string().optional(),
  sessionId: z20.string().optional(),
  promptCategory: z20.string().optional(),
  responseQualityScore: z20.number().optional(),
  resourceConsumption: z20.number().optional(),
  concurrentRequests: z20.number().optional(),
  createdAt: z20.date(),
  updatedAt: z20.date(),
  deletedAt: z20.date().nullable().optional()
});
var ModelUsageInputSchema = ModelUsageBaseSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true
});
var ModelUsageReferenceSchema = ModelUsageBaseSchema.pick({
  id: true,
  model: true,
  vendor: true,
  requestType: true,
  createdAt: true,
  updatedAt: true
});
var ModelUsageDetailedSchema = ModelUsageBaseSchema.extend({
  user: z20.lazy(() => UserReferenceSchema).optional(),
  organization: z20.lazy(() => OrganizationReferenceSchema).optional(),
  apiKey: z20.lazy(() => ApiKeyReferenceSchema).optional(),
  app: z20.lazy(() => AppReferenceSchema).optional()
});

// src/schemas/organization.schema.ts
var OrganizationBaseSchema = z21.object({
  id: z21.uuid(),
  name: z21.string(),
  domain: z21.string().nullable().optional(),
  createdAt: z21.date(),
  updatedAt: z21.date()
});
var OrganizationReferenceSchema = OrganizationBaseSchema.pick({
  id: true,
  name: true,
  domain: true
});
var OrganizationDetailedSchema = OrganizationBaseSchema.extend({
  users: z21.array(z21.lazy(() => UserReferenceSchema)).optional(),
  apps: z21.array(z21.lazy(() => AppReferenceSchema)).optional(),
  modelUsages: z21.array(z21.lazy(() => ModelUsageReferenceSchema)).optional()
});
var CreateOrganizationInputSchema = z21.object({
  name: z21.string().min(1),
  domain: z21.string().optional()
});
var UpdateOrganizationInputSchema = z21.object({
  name: z21.string().min(1).optional(),
  domain: z21.string().optional()
});

// src/schemas/app.schema.ts
var AppBaseSchema = z22.object({
  id: z22.uuid(),
  name: z22.string(),
  description: z22.string().optional(),
  ownerId: z22.string().optional(),
  organizationId: z22.string().optional(),
  createdAt: z22.date(),
  updatedAt: z22.date(),
  deletedAt: z22.date().optional(),
  isActive: z22.boolean().default(true)
});
var AppReferenceSchema = AppBaseSchema.extend({
  owner: z22.lazy(() => UserReferenceSchema).optional(),
  organization: z22.lazy(() => OrganizationReferenceSchema).optional()
});
var AppDetailedSchema = AppBaseSchema.extend({
  owner: z22.lazy(() => UserDetailedSchema).optional(),
  organization: z22.lazy(() => OrganizationDetailedSchema).optional()
});

// src/schemas/alert.schema.ts
var AlertBaseSchema = z23.object({
  id: z23.uuid(),
  userId: z23.uuid(),
  appId: z23.uuid().optional().nullable(),
  type: z23.string(),
  message: z23.string(),
  triggeredAt: z23.date(),
  isRead: z23.boolean().default(false)
});
var AlertReferenceSchema = AlertBaseSchema.pick({
  id: true,
  userId: true,
  appId: true,
  type: true,
  message: true,
  triggeredAt: true,
  isRead: true
});
var AlertDetailedSchema = AlertBaseSchema.extend({
  user: z23.lazy(() => UserReferenceSchema),
  app: z23.lazy(() => AppReferenceSchema).optional().nullable()
});

// src/schemas/allowedOrigin.schema.ts
import { z as z24 } from "zod";
var AllowedOriginBaseSchema = z24.object({
  id: z24.uuid(),
  organizationId: z24.uuid(),
  origin: z24.string(),
  createdAt: z24.date()
});
var AllowedOriginReferenceSchema = AllowedOriginBaseSchema.pick({
  id: true,
  organizationId: true,
  origin: true,
  createdAt: true
});
var AllowedOriginDetailedSchema = AllowedOriginBaseSchema.extend({
  organization: z24.lazy(() => OrganizationReferenceSchema).optional().nullable()
});
var AddAllowedOriginInputSchema = z24.object({
  organizationId: z24.uuid(),
  origin: z24.string().min(1)
});
var RemoveAllowedOriginInputSchema = z24.object({
  organizationId: z24.uuid(),
  origin: z24.string().min(1)
});

// src/schemas/appMetric.schema.ts
import { z as z25 } from "zod";
var AppMetricBaseSchema = z25.object({
  appId: z25.string(),
  metric: z25.string(),
  // e.g., "tokens", "vCPU-hours", "VRAM-MB"
  value: z25.number(),
  recordedAt: z25.date().optional()
  // optional if you want to default to now
});
var AppMetricReferenceSchema = AppMetricBaseSchema.extend({
  id: z25.uuid(),
  recordedAt: z25.date()
  // ensure timestamp exists in reference schema
});
var AppMetricDetailedSchema = AppMetricReferenceSchema.extend({
  app: z25.lazy(() => AppReferenceSchema)
});

// src/schemas/auth.schema.ts
import { z as z26 } from "zod";
var AuthResponseSchema = z26.object({
  user: z26.lazy(() => UserDetailedSchema),
  token: z26.string()
});
var UserRegisterInputSchema = z26.object({
  email: z26.email(),
  password: z26.string(),
  name: z26.string().optional(),
  origin: z26.string().optional(),
  organizationId: z26.uuid().optional()
});
var UserLoginInputSchema = z26.object({
  email: z26.email(),
  password: z26.string(),
  origin: z26.string().optional(),
  organizationId: z26.uuid().optional()
});
var VerifiedTokenResultSchema = z26.object({
  userId: z26.string(),
  organizationId: z26.string().nullable(),
  planId: z26.string().nullable(),
  exp: z26.number().optional()
});

// src/schemas/changeLog.schema.ts
import { z as z27 } from "zod";
var ChangeLogBaseSchema = z27.object({
  id: z27.uuid(),
  tableName: z27.string().min(1, "Table name is required."),
  recordId: z27.string().min(1, "Record ID is required."),
  appId: z27.uuid().optional(),
  action: z27.string().min(1, "Action is required."),
  changedBy: z27.uuid().optional(),
  before: z27.any().optional(),
  after: z27.any().optional(),
  createdAt: z27.date()
});
var ChangeLogReferenceSchema = ChangeLogBaseSchema.pick({
  id: true,
  tableName: true,
  recordId: true,
  action: true,
  createdAt: true
});
var ChangeLogDetailedSchema = ChangeLogBaseSchema.extend({
  app: AppReferenceSchema.optional()
});

// src/schemas/eventLog.schema.ts
import { z as z28 } from "zod";
var EventLogBaseSchema = z28.object({
  id: z28.uuid(),
  appId: z28.uuid(),
  endUserId: z28.uuid().optional(),
  type: z28.string(),
  payload: z28.any(),
  createdAt: z28.date()
});
var EventLogReferenceSchema = EventLogBaseSchema.pick({
  id: true,
  appId: true,
  endUserId: true,
  type: true,
  createdAt: true
});
var EventLogDetailedSchema = EventLogBaseSchema.extend({
  app: z28.lazy(() => AppReferenceSchema),
  endUser: z28.lazy(() => EndUserReferenceSchema).optional()
});

// src/schemas/featureFlag.schema.ts
import { z as z29 } from "zod";
var FeatureFlagBaseSchema = z29.object({
  id: z29.uuid(),
  name: z29.string(),
  description: z29.string().optional(),
  isActive: z29.boolean(),
  createdAt: z29.date(),
  updatedAt: z29.date(),
  appId: z29.uuid().optional()
});
var FeatureFlagReferenceSchema = FeatureFlagBaseSchema.pick({
  id: true,
  name: true,
  isActive: true,
  appId: true
});
var FeatureFlagDetailedSchema = FeatureFlagBaseSchema.extend({
  app: z29.lazy(() => AppReferenceSchema).optional()
});

// src/schemas/forecast.schema.ts
import { z as z30 } from "zod";
var ForecastBaseSchema = z30.object({
  id: z30.uuid(),
  appId: z30.uuid(),
  metric: z30.string(),
  predicted: z30.number(),
  startDate: z30.date(),
  endDate: z30.date(),
  createdAt: z30.date()
});
var ForecastReferenceSchema = ForecastBaseSchema.pick({
  id: true,
  metric: true,
  predicted: true,
  startDate: true,
  endDate: true
});
var ForecastDetailedSchema = ForecastBaseSchema.extend({
  app: z30.lazy(() => AppReferenceSchema)
});

// src/schemas/globalAllowedOrigin.schema.ts
import { z as z31 } from "zod";
var GlobalAllowedOriginSchema = z31.object({
  id: z31.uuid(),
  origin: z31.url().or(z31.string().regex(/^https?:\/\/[a-zA-Z0-9.-]+(:[0-9]+)?$/)),
  // allow localhost or custom domains
  createdAt: z31.date()
});
var GlobalAllowedOriginDetailedSchema = GlobalAllowedOriginSchema.extend({
  referencedBy: z31.array(
    z31.object({
      organizationId: z31.uuid().nullable(),
      organizationName: z31.string().nullable()
    })
  ).optional()
});

// src/schemas/integration.schema.ts
import { z as z32 } from "zod";
var IntegrationBaseSchema = z32.object({
  id: z32.uuid(),
  appId: z32.uuid(),
  type: z32.string(),
  config: z32.any(),
  createdAt: z32.date()
});
var IntegrationReferenceSchema = IntegrationBaseSchema.pick({
  id: true,
  type: true
});
var IntegrationDetailedSchema = IntegrationBaseSchema.extend({
  app: z32.lazy(() => AppReferenceSchema)
});

// src/schemas/openmeter.shema.ts
import { z as z33 } from "zod";
var OpenMeterUsageEntrySchema = z33.object({
  userId: z33.uuid(),
  feature: z33.string(),
  // Could also use FeatureEnum
  usage: z33.number().nonnegative(),
  organizationId: z33.uuid().optional(),
  apiKeyId: z33.uuid().optional(),
  sessionId: z33.uuid().optional(),
  createdAt: z33.date().optional(),
  metadata: z33.record(z33.string(), z33.any()).optional()
});

// src/schemas/sdkLog.schema.ts
import { z as z34 } from "zod";
var SdkLogBaseSchema = z34.object({
  id: z34.uuid(),
  appId: z34.string(),
  endUserId: z34.string().optional(),
  method: z34.string(),
  payload: z34.any(),
  createdAt: z34.date()
});
var SdkLogReferenceSchema = SdkLogBaseSchema.pick({
  id: true,
  method: true,
  createdAt: true
});
var SdkLogDetailedSchema = SdkLogBaseSchema.extend({
  app: z34.lazy(() => AppReferenceSchema),
  endUser: z34.lazy(() => EndUserReferenceSchema).optional()
});

// src/schemas/usage.schema.ts
import { z as z35 } from "zod";
var UsageByFeatureSchema = z35.object({
  feature: FeatureEnum,
  usage: z35.number()
});
var MonthlyUsageSchema = z35.object({
  month: z35.string(),
  // e.g., "2025-10"
  usage: z35.number(),
  totalCost: z35.number().optional(),
  breakdown: z35.record(z35.string(), z35.number()).optional(),
  logs: z35.array(UsageLogReferenceSchema).optional()
});
var UsageSummarySchema = z35.object({
  currentUsage: z35.number(),
  usageLimit: z35.number().optional(),
  periodStart: z35.string(),
  periodEnd: z35.string(),
  isOverLimit: z35.boolean(),
  history: z35.array(MonthlyUsageSchema).optional(),
  estimatedCost: z35.number().optional()
});
var UsageSummaryChartSchema = z35.object({
  totalUsage: z35.number(),
  currentMonthUsage: z35.number(),
  monthlyHistory: z35.array(MonthlyUsageSchema),
  byFeature: z35.array(UsageByFeatureSchema),
  planLimit: z35.number().optional(),
  percentUsed: z35.number().optional()
});
var RecordUsageInputSchema = z35.object({
  userId: z35.number(),
  feature: FeatureEnum,
  usage: z35.number(),
  sessionId: z35.string().optional(),
  unitCost: z35.number().optional(),
  organizationId: z35.number().optional(),
  metadata: z35.record(z35.string(), z35.any()).optional(),
  billed: z35.boolean().optional(),
  timestamp: z35.preprocess(
    (arg) => arg ? new Date(arg) : void 0,
    z35.date().optional()
  )
});
var UsageThresholdAlertSchema = z35.object({
  userId: z35.number(),
  used: z35.number(),
  max: z35.number()
});
var UsageLogWithUserSchema = UsageLogReferenceSchema.extend({
  user: UserReferenceSchema.optional()
});
var UsageLogsTableSchema = z35.object({
  logs: z35.array(UsageLogWithUserSchema),
  totalCount: z35.number()
});
var UsageSummaryItemSchema = z35.object({
  feature: FeatureEnum,
  totalUsage: z35.number()
});
var OrgUsageSummaryItemSchema = z35.object({
  feature: FeatureEnum,
  _sum: z35.object({
    usage: z35.number().nullable()
  })
});
var OrgUsageSummarySchema = z35.array(OrgUsageSummaryItemSchema);

// src/schemas/usageLimit.schema.ts
import { z as z36 } from "zod";
var UsageLimitBaseSchema = z36.object({
  id: z36.uuid(),
  appId: z36.string(),
  endUserId: z36.string().optional(),
  metric: z36.string(),
  limit: z36.number(),
  period: z36.enum(["daily", "weekly", "monthly", "yearly", "lifetime"]),
  metadata: z36.record(z36.string(), z36.any()).optional(),
  resetAt: z36.date().optional(),
  createdAt: z36.date(),
  updatedAt: z36.date().optional()
});
var UsageLimitReferenceSchema = UsageLimitBaseSchema.pick({
  id: true,
  metric: true,
  limit: true,
  period: true,
  createdAt: true
});
var UsageLimitDetailedSchema = UsageLimitBaseSchema.extend({
  app: z36.lazy(() => AppReferenceSchema),
  endUser: z36.lazy(() => EndUserReferenceSchema).optional()
});

// src/schemas/usagePayload.schema.ts
import { z as z37 } from "zod";
var UsagePayloadSchema = z37.object({
  feature: z37.enum(AI_FEATURES),
  usage: z37.number().min(0),
  sessionId: z37.uuid().optional(),
  appId: z37.string().optional(),
  endUserId: z37.string().optional(),
  organizationId: z37.string().optional(),
  ipAddress: z37.string().optional(),
  userAgent: z37.string().optional(),
  modelUsage: ModelUsageInputSchema.partial().optional(),
  metadata: z37.record(z37.string(), z37.any()).optional()
});

// src/schemas/usagePricing.schema.ts
import { z as z38 } from "zod";
var UsagePricingBaseSchema = z38.object({
  id: z38.uuid(),
  appId: z38.uuid(),
  metric: z38.string(),
  pricePerUnit: z38.number(),
  currency: z38.string().default("usd"),
  unitName: z38.string().optional(),
  // e.g., "tokens", "requests"
  billingCycle: z38.enum(["monthly", "yearly"]).default("monthly"),
  tiered: z38.boolean().optional(),
  // future support for tiered pricing
  metadata: z38.record(z38.string(), z38.any()).optional(),
  createdAt: z38.date(),
  updatedAt: z38.date().optional()
});
var UsagePricingReferenceSchema = UsagePricingBaseSchema.pick({
  id: true,
  metric: true,
  pricePerUnit: true,
  currency: true,
  unitName: true
});
var UsagePricingDetailedSchema = UsagePricingBaseSchema.extend({
  app: z38.lazy(() => AppReferenceSchema)
});

// src/transformer.ts
import superjson from "superjson";
var transformer = superjson;
export {
  AI_FEATURES,
  API_KEY_ENVIRONMENTS,
  API_KEY_PREFIXES,
  AddAllowedOriginInputSchema,
  AlertBaseSchema,
  AlertDetailedSchema,
  AlertReferenceSchema,
  AllowedOriginBaseSchema,
  AllowedOriginDetailedSchema,
  AllowedOriginReferenceSchema,
  ApiKeyBaseSchema,
  ApiKeyDetailedSchema,
  ApiKeyReferenceSchema,
  AppApiKeyBaseSchema,
  AppApiKeyDetailedSchema,
  AppApiKeyReferenceSchema,
  AppBaseSchema,
  AppDetailedSchema,
  AppMetricBaseSchema,
  AppMetricDetailedSchema,
  AppMetricReferenceSchema,
  AppReferenceSchema,
  AuditLogBaseSchema,
  AuditLogDetailedSchema,
  AuditLogReferenceSchema,
  AuthResponseSchema,
  COOKIE_NAME,
  COOKIE_OPTIONS,
  ChangeLogBaseSchema,
  ChangeLogDetailedSchema,
  ChangeLogReferenceSchema,
  ChargeBaseSchema,
  ChargeDetailedSchema,
  ChargeReferenceSchema,
  CountMetricsSchema,
  CreateApiKeyInputSchema,
  CreateOrganizationInputSchema,
  EndUserBaseSchema,
  EndUserDetailedSchema,
  EndUserReferenceSchema,
  EventLogBaseSchema,
  EventLogDetailedSchema,
  EventLogReferenceSchema,
  FeatureEnum,
  FeatureFlagBaseSchema,
  FeatureFlagDetailedSchema,
  FeatureFlagReferenceSchema,
  ForecastBaseSchema,
  ForecastDetailedSchema,
  ForecastReferenceSchema,
  GlobalAllowedOriginDetailedSchema,
  GlobalAllowedOriginSchema,
  IntegrationBaseSchema,
  IntegrationDetailedSchema,
  IntegrationReferenceSchema,
  InvoiceBaseSchema,
  InvoiceDetailedSchema,
  InvoiceItemBaseSchema,
  InvoiceItemDetailedSchema,
  InvoiceItemReferenceSchema,
  InvoiceReferenceSchema,
  JwtPayloadSchema,
  MFABaseSchema,
  MFADetailedSchema,
  MFAReferenceSchema,
  ModelUsageBaseSchema,
  ModelUsageDetailedSchema,
  ModelUsageInputSchema,
  ModelUsageReferenceSchema,
  MonthlyUsageSchema,
  OpenMeterUsageEntrySchema,
  OrgUsageSummaryItemSchema,
  OrgUsageSummarySchema,
  OrganizationBaseSchema,
  OrganizationDetailedSchema,
  OrganizationPlanBaseSchema,
  OrganizationPlanDetailedSchema,
  OrganizationPlanReferenceSchema,
  OrganizationReferenceSchema,
  PlanBaseSchema,
  PlanDetailedSchema,
  PlanFeatureBaseSchema,
  PlanFeatureDetailedSchema,
  PlanFeatureReferenceSchema,
  PlanReferenceSchema,
  RecordUsageInputSchema,
  RemoveAllowedOriginInputSchema,
  RevenueSplitBaseSchema,
  RevenueSplitDetailedSchema,
  RevenueSplitReferenceSchema,
  ReviewBaseSchema,
  ReviewDetailedSchema,
  ReviewReferenceSchema,
  ReviewStatusEnum,
  RoleBaseSchema,
  RoleDetailedSchema,
  RoleReferenceSchema,
  SdkLogBaseSchema,
  SdkLogDetailedSchema,
  SdkLogReferenceSchema,
  SessionMetricsSchema,
  UpdateOrganizationInputSchema,
  UsageByFeatureSchema,
  UsageLimitBaseSchema,
  UsageLimitDetailedSchema,
  UsageLimitReferenceSchema,
  UsageLogBaseSchema,
  UsageLogDetailedSchema,
  UsageLogReferenceSchema,
  UsageLogWithUserSchema,
  UsageLogsTableSchema,
  UsagePayloadSchema,
  UsagePricingBaseSchema,
  UsagePricingDetailedSchema,
  UsagePricingReferenceSchema,
  UsageSummaryChartSchema,
  UsageSummaryItemSchema,
  UsageSummarySchema,
  UsageThresholdAlertSchema,
  UserBaseSchema,
  UserDetailedSchema,
  UserLoginInputSchema,
  UserPreferencesBaseSchema,
  UserPreferencesDetailedSchema,
  UserPreferencesReferenceSchema,
  UserReferenceSchema,
  UserRegisterInputSchema,
  UserSessionBaseSchema,
  UserSessionDetailedSchema,
  UserSessionReferenceSchema,
  VerifiedTokenResultSchema,
  decodeJwt,
  getAuthCookieName,
  signJwt,
  transformer,
  verifyJwt
};
//# sourceMappingURL=index.js.map