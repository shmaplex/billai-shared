"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  AI_FEATURES: () => AI_FEATURES,
  API_KEY_ENVIRONMENTS: () => API_KEY_ENVIRONMENTS,
  API_KEY_PREFIXES: () => API_KEY_PREFIXES,
  AddAllowedOriginInputSchema: () => AddAllowedOriginInputSchema,
  AlertBaseSchema: () => AlertBaseSchema,
  AlertDetailedSchema: () => AlertDetailedSchema,
  AlertReferenceSchema: () => AlertReferenceSchema,
  AllowedOriginBaseSchema: () => AllowedOriginBaseSchema,
  AllowedOriginDetailedSchema: () => AllowedOriginDetailedSchema,
  AllowedOriginReferenceSchema: () => AllowedOriginReferenceSchema,
  ApiKeyBaseSchema: () => ApiKeyBaseSchema,
  ApiKeyDetailedSchema: () => ApiKeyDetailedSchema,
  ApiKeyReferenceSchema: () => ApiKeyReferenceSchema,
  AppApiKeyBaseSchema: () => AppApiKeyBaseSchema,
  AppApiKeyDetailedSchema: () => AppApiKeyDetailedSchema,
  AppApiKeyReferenceSchema: () => AppApiKeyReferenceSchema,
  AppBaseSchema: () => AppBaseSchema,
  AppDetailedSchema: () => AppDetailedSchema,
  AppMetricBaseSchema: () => AppMetricBaseSchema,
  AppMetricDetailedSchema: () => AppMetricDetailedSchema,
  AppMetricReferenceSchema: () => AppMetricReferenceSchema,
  AppReferenceSchema: () => AppReferenceSchema,
  AuditLogBaseSchema: () => AuditLogBaseSchema,
  AuditLogDetailedSchema: () => AuditLogDetailedSchema,
  AuditLogReferenceSchema: () => AuditLogReferenceSchema,
  AuthResponseSchema: () => AuthResponseSchema,
  COOKIE_NAME: () => COOKIE_NAME,
  COOKIE_OPTIONS: () => COOKIE_OPTIONS,
  ChangeLogBaseSchema: () => ChangeLogBaseSchema,
  ChangeLogDetailedSchema: () => ChangeLogDetailedSchema,
  ChangeLogReferenceSchema: () => ChangeLogReferenceSchema,
  ChargeBaseSchema: () => ChargeBaseSchema,
  ChargeDetailedSchema: () => ChargeDetailedSchema,
  ChargeReferenceSchema: () => ChargeReferenceSchema,
  CountMetricsSchema: () => CountMetricsSchema,
  CreateApiKeyInputSchema: () => CreateApiKeyInputSchema,
  CreateOrganizationInputSchema: () => CreateOrganizationInputSchema,
  EndUserBaseSchema: () => EndUserBaseSchema,
  EndUserDetailedSchema: () => EndUserDetailedSchema,
  EndUserReferenceSchema: () => EndUserReferenceSchema,
  EventLogBaseSchema: () => EventLogBaseSchema,
  EventLogDetailedSchema: () => EventLogDetailedSchema,
  EventLogReferenceSchema: () => EventLogReferenceSchema,
  FeatureEnum: () => FeatureEnum,
  FeatureFlagBaseSchema: () => FeatureFlagBaseSchema,
  FeatureFlagDetailedSchema: () => FeatureFlagDetailedSchema,
  FeatureFlagReferenceSchema: () => FeatureFlagReferenceSchema,
  ForecastBaseSchema: () => ForecastBaseSchema,
  ForecastDetailedSchema: () => ForecastDetailedSchema,
  ForecastReferenceSchema: () => ForecastReferenceSchema,
  GlobalAllowedOriginDetailedSchema: () => GlobalAllowedOriginDetailedSchema,
  GlobalAllowedOriginSchema: () => GlobalAllowedOriginSchema,
  IntegrationBaseSchema: () => IntegrationBaseSchema,
  IntegrationDetailedSchema: () => IntegrationDetailedSchema,
  IntegrationReferenceSchema: () => IntegrationReferenceSchema,
  InvoiceBaseSchema: () => InvoiceBaseSchema,
  InvoiceDetailedSchema: () => InvoiceDetailedSchema,
  InvoiceItemBaseSchema: () => InvoiceItemBaseSchema,
  InvoiceItemDetailedSchema: () => InvoiceItemDetailedSchema,
  InvoiceItemReferenceSchema: () => InvoiceItemReferenceSchema,
  InvoiceReferenceSchema: () => InvoiceReferenceSchema,
  JwtPayloadSchema: () => JwtPayloadSchema,
  MFABaseSchema: () => MFABaseSchema,
  MFADetailedSchema: () => MFADetailedSchema,
  MFAReferenceSchema: () => MFAReferenceSchema,
  ModelUsageBaseSchema: () => ModelUsageBaseSchema,
  ModelUsageDetailedSchema: () => ModelUsageDetailedSchema,
  ModelUsageInputSchema: () => ModelUsageInputSchema,
  ModelUsageReferenceSchema: () => ModelUsageReferenceSchema,
  MonthlyUsageSchema: () => MonthlyUsageSchema,
  OpenMeterUsageEntrySchema: () => OpenMeterUsageEntrySchema,
  OrgUsageSummaryItemSchema: () => OrgUsageSummaryItemSchema,
  OrgUsageSummarySchema: () => OrgUsageSummarySchema,
  OrganizationBaseSchema: () => OrganizationBaseSchema,
  OrganizationDetailedSchema: () => OrganizationDetailedSchema,
  OrganizationPlanBaseSchema: () => OrganizationPlanBaseSchema,
  OrganizationPlanDetailedSchema: () => OrganizationPlanDetailedSchema,
  OrganizationPlanReferenceSchema: () => OrganizationPlanReferenceSchema,
  OrganizationReferenceSchema: () => OrganizationReferenceSchema,
  PlanBaseSchema: () => PlanBaseSchema,
  PlanDetailedSchema: () => PlanDetailedSchema,
  PlanFeatureBaseSchema: () => PlanFeatureBaseSchema,
  PlanFeatureDetailedSchema: () => PlanFeatureDetailedSchema,
  PlanFeatureReferenceSchema: () => PlanFeatureReferenceSchema,
  PlanReferenceSchema: () => PlanReferenceSchema,
  RecordUsageInputSchema: () => RecordUsageInputSchema,
  RemoveAllowedOriginInputSchema: () => RemoveAllowedOriginInputSchema,
  RevenueSplitBaseSchema: () => RevenueSplitBaseSchema,
  RevenueSplitDetailedSchema: () => RevenueSplitDetailedSchema,
  RevenueSplitReferenceSchema: () => RevenueSplitReferenceSchema,
  ReviewBaseSchema: () => ReviewBaseSchema,
  ReviewDetailedSchema: () => ReviewDetailedSchema,
  ReviewReferenceSchema: () => ReviewReferenceSchema,
  ReviewStatusEnum: () => ReviewStatusEnum,
  RoleBaseSchema: () => RoleBaseSchema,
  RoleDetailedSchema: () => RoleDetailedSchema,
  RoleReferenceSchema: () => RoleReferenceSchema,
  SdkLogBaseSchema: () => SdkLogBaseSchema,
  SdkLogDetailedSchema: () => SdkLogDetailedSchema,
  SdkLogReferenceSchema: () => SdkLogReferenceSchema,
  SessionMetricsSchema: () => SessionMetricsSchema,
  UpdateOrganizationInputSchema: () => UpdateOrganizationInputSchema,
  UsageByFeatureSchema: () => UsageByFeatureSchema,
  UsageLimitBaseSchema: () => UsageLimitBaseSchema,
  UsageLimitDetailedSchema: () => UsageLimitDetailedSchema,
  UsageLimitReferenceSchema: () => UsageLimitReferenceSchema,
  UsageLogBaseSchema: () => UsageLogBaseSchema,
  UsageLogDetailedSchema: () => UsageLogDetailedSchema,
  UsageLogReferenceSchema: () => UsageLogReferenceSchema,
  UsageLogWithUserSchema: () => UsageLogWithUserSchema,
  UsageLogsTableSchema: () => UsageLogsTableSchema,
  UsagePayloadSchema: () => UsagePayloadSchema,
  UsagePricingBaseSchema: () => UsagePricingBaseSchema,
  UsagePricingDetailedSchema: () => UsagePricingDetailedSchema,
  UsagePricingReferenceSchema: () => UsagePricingReferenceSchema,
  UsageSummaryChartSchema: () => UsageSummaryChartSchema,
  UsageSummaryItemSchema: () => UsageSummaryItemSchema,
  UsageSummarySchema: () => UsageSummarySchema,
  UsageThresholdAlertSchema: () => UsageThresholdAlertSchema,
  UserBaseSchema: () => UserBaseSchema,
  UserDetailedSchema: () => UserDetailedSchema,
  UserLoginInputSchema: () => UserLoginInputSchema,
  UserPreferencesBaseSchema: () => UserPreferencesBaseSchema,
  UserPreferencesDetailedSchema: () => UserPreferencesDetailedSchema,
  UserPreferencesReferenceSchema: () => UserPreferencesReferenceSchema,
  UserReferenceSchema: () => UserReferenceSchema,
  UserRegisterInputSchema: () => UserRegisterInputSchema,
  UserSessionBaseSchema: () => UserSessionBaseSchema,
  UserSessionDetailedSchema: () => UserSessionDetailedSchema,
  UserSessionReferenceSchema: () => UserSessionReferenceSchema,
  VerifiedTokenResultSchema: () => VerifiedTokenResultSchema,
  decodeJwt: () => decodeJwt,
  getAuthCookieName: () => getAuthCookieName,
  signJwt: () => signJwt,
  transformer: () => transformer,
  verifyJwt: () => verifyJwt
});
module.exports = __toCommonJS(index_exports);

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
var import_jose = require("jose");
var import_zod = require("zod");
var JwtPayloadSchema = import_zod.z.object({
  userId: import_zod.z.string().uuid(),
  role: import_zod.z.string().optional(),
  organizationId: import_zod.z.string().uuid().optional(),
  iat: import_zod.z.number().optional(),
  // issued at
  exp: import_zod.z.number().optional()
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
  return await new import_jose.SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt(now).setExpirationTime(expSeconds).sign(secret);
}
async function verifyJwt(token) {
  const secret = getSecretKey();
  try {
    const { payload } = await (0, import_jose.jwtVerify)(token, secret);
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
var import_zod23 = require("zod");

// src/schemas/app.schema.ts
var import_zod22 = require("zod");

// src/schemas/organization.schema.ts
var import_zod21 = require("zod");

// src/schemas/modelUsage.schema.ts
var import_zod20 = require("zod");

// src/schemas/apiKey.schema.ts
var import_zod19 = require("zod");

// src/schemas/usageLog.schema.ts
var import_zod18 = require("zod");

// src/schemas/endUser.schema.ts
var import_zod17 = require("zod");

// src/schemas/charge.schema.ts
var import_zod16 = require("zod");

// src/schemas/invoice.schema.ts
var import_zod15 = require("zod");

// src/schemas/invoiceItem.schema.ts
var import_zod2 = require("zod");
var InvoiceItemBaseSchema = import_zod2.z.object({
  id: import_zod2.z.uuid(),
  invoiceId: import_zod2.z.uuid(),
  description: import_zod2.z.string(),
  amount: import_zod2.z.number(),
  quantity: import_zod2.z.number().default(1),
  createdAt: import_zod2.z.date()
});
var InvoiceItemReferenceSchema = InvoiceItemBaseSchema.pick({
  id: true,
  description: true,
  amount: true,
  quantity: true
});
var InvoiceItemDetailedSchema = InvoiceItemBaseSchema.extend({
  invoice: import_zod2.z.lazy(() => InvoiceReferenceSchema).optional()
});

// src/schemas/user.schema.ts
var import_zod14 = require("zod");

// src/schemas/appApiKey.schema.ts
var import_zod3 = require("zod");
var AppApiKeyBaseSchema = import_zod3.z.object({
  appId: import_zod3.z.string(),
  key: import_zod3.z.string(),
  createdByUserId: import_zod3.z.string().optional(),
  expiresAt: import_zod3.z.date().optional()
});
var AppApiKeyReferenceSchema = AppApiKeyBaseSchema.extend({
  id: import_zod3.z.uuid(),
  createdAt: import_zod3.z.date()
});
var AppApiKeyDetailedSchema = AppApiKeyReferenceSchema.extend({
  app: import_zod3.z.lazy(() => AppReferenceSchema),
  createdBy: import_zod3.z.lazy(() => UserReferenceSchema).optional()
});

// src/schemas/auditLog.schema.ts
var import_zod4 = require("zod");
var AuditLogBaseSchema = import_zod4.z.object({
  id: import_zod4.z.uuid(),
  userId: import_zod4.z.uuid(),
  action: import_zod4.z.string().min(1, "Action is required."),
  details: import_zod4.z.string().optional(),
  createdAt: import_zod4.z.date(),
  appId: import_zod4.z.uuid().optional()
});
var AuditLogReferenceSchema = AuditLogBaseSchema.pick({
  id: true,
  action: true,
  createdAt: true
});
var AuditLogDetailedSchema = AuditLogBaseSchema.extend({
  user: import_zod4.z.lazy(() => UserReferenceSchema),
  app: import_zod4.z.lazy(() => AppReferenceSchema).optional()
});

// src/schemas/mfa.schema.ts
var import_zod5 = require("zod");
var MFABaseSchema = import_zod5.z.object({
  id: import_zod5.z.uuid(),
  userId: import_zod5.z.uuid(),
  type: import_zod5.z.string(),
  secret: import_zod5.z.string(),
  enabled: import_zod5.z.boolean().default(false),
  createdAt: import_zod5.z.date(),
  updatedAt: import_zod5.z.date()
});
var MFAReferenceSchema = MFABaseSchema.pick({
  id: true,
  type: true,
  enabled: true
});
var MFADetailedSchema = MFABaseSchema.extend({
  user: import_zod5.z.lazy(() => UserReferenceSchema).optional()
});

// src/schemas/plan.schema.ts
var import_zod8 = require("zod");

// src/schemas/organizationPlan.schema.ts
var import_zod6 = require("zod");
var OrganizationPlanBaseSchema = import_zod6.z.object({
  id: import_zod6.z.uuid(),
  organizationId: import_zod6.z.uuid().optional(),
  planId: import_zod6.z.uuid().optional(),
  startDate: import_zod6.z.date(),
  endDate: import_zod6.z.date().nullable().optional(),
  createdAt: import_zod6.z.date(),
  updatedAt: import_zod6.z.date()
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
    organization: import_zod6.z.lazy(() => OrganizationReferenceSchema).optional(),
    plan: import_zod6.z.lazy(() => PlanReferenceSchema).optional()
  }
);

// src/schemas/planFeature.schema.ts
var import_zod7 = require("zod");
var PlanFeatureBaseSchema = import_zod7.z.object({
  id: import_zod7.z.uuid(),
  planId: import_zod7.z.uuid(),
  name: import_zod7.z.string(),
  limit: import_zod7.z.number().optional(),
  price: import_zod7.z.number().optional(),
  metadata: import_zod7.z.any().optional(),
  createdAt: import_zod7.z.date()
});
var PlanFeatureReferenceSchema = PlanFeatureBaseSchema.pick({
  id: true,
  name: true
});
var PlanFeatureDetailedSchema = PlanFeatureBaseSchema.extend({
  plan: import_zod7.z.lazy(() => PlanReferenceSchema).optional()
});

// src/schemas/plan.schema.ts
var PlanBaseSchema = import_zod8.z.object({
  id: import_zod8.z.uuid(),
  name: import_zod8.z.string(),
  price: import_zod8.z.number(),
  maxUsage: import_zod8.z.number().optional(),
  interval: import_zod8.z.string().default("monthly"),
  features: import_zod8.z.string().optional(),
  createdAt: import_zod8.z.date(),
  updatedAt: import_zod8.z.date()
});
var PlanReferenceSchema = PlanBaseSchema.pick({
  id: true,
  name: true,
  price: true,
  maxUsage: true
});
var PlanDetailedSchema = PlanBaseSchema.extend({
  users: import_zod8.z.array(import_zod8.z.lazy(() => UserReferenceSchema)).optional(),
  organizationPlans: import_zod8.z.array(import_zod8.z.lazy(() => OrganizationPlanReferenceSchema)).optional(),
  planFeatures: import_zod8.z.array(import_zod8.z.lazy(() => PlanFeatureReferenceSchema)).optional()
});

// src/schemas/revenueSplit.schema.ts
var import_zod9 = require("zod");
var RevenueSplitBaseSchema = import_zod9.z.object({
  id: import_zod9.z.uuid(),
  appId: import_zod9.z.uuid(),
  recipientId: import_zod9.z.uuid().optional(),
  percent: import_zod9.z.number(),
  createdAt: import_zod9.z.date(),
  deletedAt: import_zod9.z.date().optional()
});
var RevenueSplitReferenceSchema = RevenueSplitBaseSchema.pick({
  id: true,
  percent: true
});
var RevenueSplitDetailedSchema = RevenueSplitBaseSchema.extend({
  app: import_zod9.z.lazy(() => AppReferenceSchema),
  recipient: import_zod9.z.lazy(() => UserReferenceSchema).optional()
});

// src/schemas/review.schema.ts
var import_zod10 = require("zod");
var ReviewStatusEnum = import_zod10.z.enum(["PENDING", "APPROVED", "REJECTED"]);
var ReviewBaseSchema = import_zod10.z.object({
  id: import_zod10.z.uuid(),
  reviewerId: import_zod10.z.uuid(),
  resourceType: import_zod10.z.string(),
  resourceId: import_zod10.z.string(),
  status: ReviewStatusEnum,
  notes: import_zod10.z.string().nullable().optional(),
  createdAt: import_zod10.z.date(),
  updatedAt: import_zod10.z.date()
});
var ReviewReferenceSchema = ReviewBaseSchema.pick({
  id: true,
  status: true,
  resourceType: true,
  resourceId: true
});
var ReviewDetailedSchema = ReviewBaseSchema.extend({
  reviewer: import_zod10.z.lazy(() => UserReferenceSchema)
});

// src/schemas/role.schema.ts
var import_zod11 = require("zod");
var RoleBaseSchema = import_zod11.z.object({
  id: import_zod11.z.uuid(),
  name: import_zod11.z.string(),
  description: import_zod11.z.string().optional(),
  permissions: import_zod11.z.string().optional(),
  createdBy: import_zod11.z.string().optional(),
  updatedBy: import_zod11.z.string().optional()
});
var RoleReferenceSchema = RoleBaseSchema.pick({
  id: true,
  name: true
});
var RoleDetailedSchema = RoleBaseSchema.extend({
  users: import_zod11.z.array(import_zod11.z.lazy(() => UserReferenceSchema)).optional()
});

// src/schemas/userPreferences.schema.ts
var import_zod12 = require("zod");
var UserPreferencesBaseSchema = import_zod12.z.object({
  id: import_zod12.z.uuid(),
  userId: import_zod12.z.uuid(),
  timezone: import_zod12.z.string().optional(),
  locale: import_zod12.z.string().optional(),
  language: import_zod12.z.string().optional(),
  emailNotifications: import_zod12.z.boolean().default(true),
  darkMode: import_zod12.z.boolean().default(false),
  createdAt: import_zod12.z.date(),
  updatedAt: import_zod12.z.date()
});
var UserPreferencesReferenceSchema = UserPreferencesBaseSchema.pick({
  id: true,
  userId: true,
  emailNotifications: true,
  darkMode: true
});
var UserPreferencesDetailedSchema = UserPreferencesBaseSchema.extend({
  user: import_zod12.z.lazy(() => UserReferenceSchema).optional()
});

// src/schemas/userSession.schema.ts
var import_zod13 = require("zod");
var UserSessionBaseSchema = import_zod13.z.object({
  id: import_zod13.z.uuid(),
  userId: import_zod13.z.uuid(),
  expiresAt: import_zod13.z.date(),
  ipAddress: import_zod13.z.string().optional(),
  userAgent: import_zod13.z.string().optional(),
  createdAt: import_zod13.z.date(),
  updatedAt: import_zod13.z.date()
});
var UserSessionReferenceSchema = UserSessionBaseSchema.pick({
  id: true,
  userId: true,
  expiresAt: true,
  createdAt: true
});
var UserSessionDetailedSchema = UserSessionBaseSchema.extend({
  user: import_zod13.z.lazy(() => UserReferenceSchema).optional(),
  usageLogs: import_zod13.z.array(import_zod13.z.lazy(() => UsageLogReferenceSchema)).optional()
});

// src/schemas/user.schema.ts
var UserBaseSchema = import_zod14.z.object({
  id: import_zod14.z.uuid(),
  email: import_zod14.z.email(),
  password: import_zod14.z.string().optional().nullable(),
  fullName: import_zod14.z.string().optional().nullable(),
  phone: import_zod14.z.string().optional().nullable(),
  bio: import_zod14.z.string().optional().nullable(),
  title: import_zod14.z.string().optional().nullable(),
  authId: import_zod14.z.string(),
  provider: import_zod14.z.string(),
  isActive: import_zod14.z.boolean().default(true),
  isVerified: import_zod14.z.boolean().default(false),
  avatarUrl: import_zod14.z.string().optional().nullable(),
  locale: import_zod14.z.string().optional().nullable(),
  timezone: import_zod14.z.string().optional().nullable(),
  language: import_zod14.z.string().optional().nullable(),
  roleId: import_zod14.z.uuid().nullable().optional(),
  organizationId: import_zod14.z.uuid().nullable().optional(),
  planId: import_zod14.z.uuid().nullable().optional(),
  createdAt: import_zod14.z.date(),
  updatedAt: import_zod14.z.date(),
  deletedAt: import_zod14.z.date().optional().nullable()
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
  role: import_zod14.z.lazy(() => RoleReferenceSchema).optional().nullable(),
  organization: import_zod14.z.lazy(() => OrganizationReferenceSchema).optional().nullable(),
  plan: import_zod14.z.lazy(() => PlanReferenceSchema).optional().nullable(),
  // ─────────── Nested Collections ───────────
  sessions: import_zod14.z.array(import_zod14.z.lazy(() => UserSessionReferenceSchema)).optional(),
  invoices: import_zod14.z.array(import_zod14.z.lazy(() => InvoiceReferenceSchema)).optional(),
  apiKeys: import_zod14.z.array(import_zod14.z.lazy(() => ApiKeyReferenceSchema)).optional(),
  auditLogs: import_zod14.z.array(import_zod14.z.lazy(() => AuditLogReferenceSchema)).optional(),
  preferences: import_zod14.z.lazy(() => UserPreferencesReferenceSchema).optional().nullable(),
  mfaSettings: import_zod14.z.array(import_zod14.z.lazy(() => MFAReferenceSchema)).optional(),
  reviews: import_zod14.z.array(import_zod14.z.lazy(() => ReviewReferenceSchema)).optional(),
  modelUsages: import_zod14.z.array(import_zod14.z.lazy(() => ModelUsageReferenceSchema)).optional(),
  revenueSplits: import_zod14.z.array(import_zod14.z.lazy(() => RevenueSplitReferenceSchema)).optional(),
  apps: import_zod14.z.array(import_zod14.z.lazy(() => AppReferenceSchema)).optional(),
  alerts: import_zod14.z.array(import_zod14.z.lazy(() => AlertReferenceSchema)).optional(),
  appApiKeys: import_zod14.z.array(import_zod14.z.lazy(() => AppApiKeyReferenceSchema)).optional(),
  usageLogs: import_zod14.z.array(import_zod14.z.lazy(() => UsageLogReferenceSchema)).optional()
});

// src/schemas/invoice.schema.ts
var InvoiceBaseSchema = import_zod15.z.object({
  id: import_zod15.z.uuid(),
  userId: import_zod15.z.uuid(),
  appId: import_zod15.z.uuid().optional(),
  endUserId: import_zod15.z.uuid().optional(),
  amount: import_zod15.z.number(),
  currency: import_zod15.z.string(),
  paid: import_zod15.z.boolean(),
  createdAt: import_zod15.z.date(),
  updatedAt: import_zod15.z.date(),
  dueDate: import_zod15.z.date().optional(),
  paidAt: import_zod15.z.date().optional(),
  deletedAt: import_zod15.z.date().optional()
});
var InvoiceReferenceSchema = InvoiceBaseSchema.pick({
  id: true,
  amount: true,
  currency: true,
  paid: true,
  createdAt: true
});
var InvoiceDetailedSchema = InvoiceBaseSchema.extend({
  user: import_zod15.z.lazy(() => UserReferenceSchema).optional(),
  app: import_zod15.z.lazy(() => AppReferenceSchema).optional(),
  endUser: import_zod15.z.lazy(() => EndUserReferenceSchema).optional(),
  items: import_zod15.z.array(import_zod15.z.lazy(() => InvoiceItemReferenceSchema)).optional(),
  charges: import_zod15.z.array(import_zod15.z.lazy(() => ChargeReferenceSchema)).optional()
});

// src/schemas/charge.schema.ts
var ChargeBaseSchema = import_zod16.z.object({
  id: import_zod16.z.uuid(),
  invoiceId: import_zod16.z.uuid().optional(),
  endUserId: import_zod16.z.uuid().optional(),
  appId: import_zod16.z.uuid(),
  amount: import_zod16.z.number().nonnegative(),
  status: import_zod16.z.enum(["PENDING", "PAID", "FAILED", "REFUNDED"]),
  createdAt: import_zod16.z.date(),
  paidAt: import_zod16.z.date().optional(),
  deletedAt: import_zod16.z.date().optional()
});
var ChargeReferenceSchema = ChargeBaseSchema.pick({
  id: true,
  appId: true,
  amount: true,
  status: true,
  createdAt: true
});
var ChargeDetailedSchema = ChargeBaseSchema.extend({
  invoice: import_zod16.z.lazy(() => InvoiceReferenceSchema).optional(),
  endUser: import_zod16.z.lazy(() => EndUserReferenceSchema).optional(),
  app: import_zod16.z.lazy(() => AppReferenceSchema)
});

// src/schemas/endUser.schema.ts
var EndUserBaseSchema = import_zod17.z.object({
  id: import_zod17.z.uuid(),
  appId: import_zod17.z.uuid(),
  externalId: import_zod17.z.string(),
  email: import_zod17.z.email().optional(),
  createdAt: import_zod17.z.date(),
  updatedAt: import_zod17.z.date(),
  deletedAt: import_zod17.z.date().optional()
});
var EndUserReferenceSchema = EndUserBaseSchema.pick({
  id: true,
  appId: true,
  externalId: true,
  email: true
});
var EndUserDetailedSchema = EndUserBaseSchema.extend({
  app: import_zod17.z.lazy(() => AppReferenceSchema).optional(),
  invoices: import_zod17.z.array(import_zod17.z.lazy(() => InvoiceReferenceSchema)).optional(),
  charges: import_zod17.z.array(import_zod17.z.lazy(() => ChargeReferenceSchema)).optional(),
  usageLogs: import_zod17.z.array(import_zod17.z.any()).optional(),
  // replace with UsageLogReferenceSchema when available
  eventLogs: import_zod17.z.array(import_zod17.z.any()).optional(),
  // replace with EventLogReferenceSchema
  usageLimits: import_zod17.z.array(import_zod17.z.any()).optional(),
  // replace with UsageLimitReferenceSchema
  sdkLogs: import_zod17.z.array(import_zod17.z.any()).optional()
  // replace with SdkLogReferenceSchema
});

// src/schemas/usageLog.schema.ts
var FeatureEnum = import_zod18.z.enum(AI_FEATURES);
var UsageLogBaseSchema = import_zod18.z.object({
  id: import_zod18.z.uuid(),
  userId: import_zod18.z.string().nullable().optional(),
  organizationId: import_zod18.z.string().nullable().optional(),
  appId: import_zod18.z.string().nullable().optional(),
  endUserId: import_zod18.z.string().nullable().optional(),
  apiKeyId: import_zod18.z.string().nullable().optional(),
  feature: FeatureEnum.default("OTHER"),
  usage: import_zod18.z.number(),
  unitCost: import_zod18.z.number().nullable().optional(),
  billed: import_zod18.z.boolean().default(false),
  sessionId: import_zod18.z.string().nullable().optional(),
  createdAt: import_zod18.z.date(),
  openMeterReported: import_zod18.z.boolean().nullable().optional(),
  openMeterId: import_zod18.z.string().nullable().optional(),
  deletedAt: import_zod18.z.date().nullable().optional(),
  metadata: import_zod18.z.record(import_zod18.z.string(), import_zod18.z.any()).optional()
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
  user: import_zod18.z.lazy(() => UserReferenceSchema).nullable().optional(),
  organization: import_zod18.z.lazy(() => OrganizationReferenceSchema).nullable().optional(),
  apiKey: import_zod18.z.lazy(() => ApiKeyReferenceSchema).nullable().optional(),
  app: import_zod18.z.lazy(() => AppReferenceSchema).nullable().optional(),
  endUser: import_zod18.z.lazy(() => EndUserReferenceSchema).nullable().optional(),
  session: import_zod18.z.lazy(() => UserSessionReferenceSchema).nullable().optional()
});

// src/schemas/apiKey.schema.ts
var API_KEY_ENVIRONMENTS = {
  LIVE: "live",
  TEST: "test"
};
var ApiKeyBaseSchema = import_zod19.z.object({
  id: import_zod19.z.uuid(),
  userId: import_zod19.z.uuid().nullable().optional(),
  keyPrefix: import_zod19.z.string(),
  hashedKey: import_zod19.z.string(),
  name: import_zod19.z.string().nullable().optional(),
  environment: import_zod19.z.string().default("live"),
  revoked: import_zod19.z.boolean().default(false),
  createdAt: import_zod19.z.date(),
  updatedAt: import_zod19.z.date()
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
  scopes: import_zod19.z.string().nullable().optional(),
  expiresAt: import_zod19.z.date().nullable().optional(),
  lastUsedAt: import_zod19.z.date().nullable().optional(),
  user: import_zod19.z.lazy(() => UserReferenceSchema).optional().nullable(),
  usageLogs: import_zod19.z.array(import_zod19.z.lazy(() => UsageLogReferenceSchema)).optional(),
  modelUsages: import_zod19.z.array(import_zod19.z.lazy(() => ModelUsageReferenceSchema)).optional()
});
var CreateApiKeyInputSchema = import_zod19.z.object({
  userId: import_zod19.z.uuid(),
  name: import_zod19.z.string().optional(),
  scopes: import_zod19.z.array(import_zod19.z.string()).optional(),
  environment: import_zod19.z.enum(["test", "live"]).default("live")
});

// src/schemas/modelUsage.schema.ts
var SessionMetricsSchema = import_zod20.z.object({
  count: import_zod20.z.number().nonnegative().default(0),
  avgLatencyMs: import_zod20.z.number().nonnegative().default(0),
  p50LatencyMs: import_zod20.z.number().nonnegative().default(0),
  p90LatencyMs: import_zod20.z.number().nonnegative().default(0),
  p99LatencyMs: import_zod20.z.number().nonnegative().default(0)
});
var CountMetricsSchema = import_zod20.z.object({
  successCount: import_zod20.z.number().int().nonnegative().default(0),
  failureCount: import_zod20.z.number().int().nonnegative().default(0)
});
var ModelUsageBaseSchema = import_zod20.z.object({
  id: import_zod20.z.uuid(),
  userId: import_zod20.z.uuid().optional(),
  organizationId: import_zod20.z.uuid().optional(),
  apiKeyId: import_zod20.z.uuid().optional(),
  appId: import_zod20.z.uuid().optional(),
  model: import_zod20.z.string(),
  vendor: import_zod20.z.string(),
  modelVersion: import_zod20.z.string().optional(),
  requestType: import_zod20.z.string(),
  usageCount: import_zod20.z.number().default(1),
  success: import_zod20.z.boolean().default(true),
  successCount: import_zod20.z.number().default(0),
  failureCount: import_zod20.z.number().default(0),
  avgLatencyMs: import_zod20.z.number().optional(),
  p50LatencyMs: import_zod20.z.number().optional(),
  p90LatencyMs: import_zod20.z.number().optional(),
  p99LatencyMs: import_zod20.z.number().optional(),
  latencyMs: import_zod20.z.number().optional(),
  throughput: import_zod20.z.number().optional(),
  queueTimeMs: import_zod20.z.number().optional(),
  errorType: import_zod20.z.string().optional(),
  retryCount: import_zod20.z.number().optional(),
  region: import_zod20.z.string().optional(),
  promptLengthTokens: import_zod20.z.number().optional(),
  responseLengthTokens: import_zod20.z.number().optional(),
  unitCost: import_zod20.z.number().optional(),
  totalCost: import_zod20.z.number().optional(),
  billed: import_zod20.z.boolean().default(false),
  discountApplied: import_zod20.z.number().optional(),
  planTier: import_zod20.z.string().optional(),
  temperature: import_zod20.z.number().optional(),
  maxTokens: import_zod20.z.number().optional(),
  totalTokens: import_zod20.z.number().optional(),
  topP: import_zod20.z.number().optional(),
  stopSequences: import_zod20.z.array(import_zod20.z.string()).optional(),
  embeddingDimension: import_zod20.z.number().optional(),
  imageResolution: import_zod20.z.string().optional(),
  sdkVersion: import_zod20.z.string().optional(),
  userAgent: import_zod20.z.string().optional(),
  language: import_zod20.z.string().optional(),
  sessionId: import_zod20.z.string().optional(),
  promptCategory: import_zod20.z.string().optional(),
  responseQualityScore: import_zod20.z.number().optional(),
  resourceConsumption: import_zod20.z.number().optional(),
  concurrentRequests: import_zod20.z.number().optional(),
  createdAt: import_zod20.z.date(),
  updatedAt: import_zod20.z.date(),
  deletedAt: import_zod20.z.date().nullable().optional()
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
  user: import_zod20.z.lazy(() => UserReferenceSchema).optional(),
  organization: import_zod20.z.lazy(() => OrganizationReferenceSchema).optional(),
  apiKey: import_zod20.z.lazy(() => ApiKeyReferenceSchema).optional(),
  app: import_zod20.z.lazy(() => AppReferenceSchema).optional()
});

// src/schemas/organization.schema.ts
var OrganizationBaseSchema = import_zod21.z.object({
  id: import_zod21.z.uuid(),
  name: import_zod21.z.string(),
  domain: import_zod21.z.string().nullable().optional(),
  createdAt: import_zod21.z.date(),
  updatedAt: import_zod21.z.date()
});
var OrganizationReferenceSchema = OrganizationBaseSchema.pick({
  id: true,
  name: true,
  domain: true
});
var OrganizationDetailedSchema = OrganizationBaseSchema.extend({
  users: import_zod21.z.array(import_zod21.z.lazy(() => UserReferenceSchema)).optional(),
  apps: import_zod21.z.array(import_zod21.z.lazy(() => AppReferenceSchema)).optional(),
  modelUsages: import_zod21.z.array(import_zod21.z.lazy(() => ModelUsageReferenceSchema)).optional()
});
var CreateOrganizationInputSchema = import_zod21.z.object({
  name: import_zod21.z.string().min(1),
  domain: import_zod21.z.string().optional()
});
var UpdateOrganizationInputSchema = import_zod21.z.object({
  name: import_zod21.z.string().min(1).optional(),
  domain: import_zod21.z.string().optional()
});

// src/schemas/app.schema.ts
var AppBaseSchema = import_zod22.z.object({
  id: import_zod22.z.uuid(),
  name: import_zod22.z.string(),
  description: import_zod22.z.string().optional(),
  ownerId: import_zod22.z.string().optional(),
  organizationId: import_zod22.z.string().optional(),
  createdAt: import_zod22.z.date(),
  updatedAt: import_zod22.z.date(),
  deletedAt: import_zod22.z.date().optional(),
  isActive: import_zod22.z.boolean().default(true)
});
var AppReferenceSchema = AppBaseSchema.extend({
  owner: import_zod22.z.lazy(() => UserReferenceSchema).optional(),
  organization: import_zod22.z.lazy(() => OrganizationReferenceSchema).optional()
});
var AppDetailedSchema = AppBaseSchema.extend({
  owner: import_zod22.z.lazy(() => UserDetailedSchema).optional(),
  organization: import_zod22.z.lazy(() => OrganizationDetailedSchema).optional()
});

// src/schemas/alert.schema.ts
var AlertBaseSchema = import_zod23.z.object({
  id: import_zod23.z.uuid(),
  userId: import_zod23.z.uuid(),
  appId: import_zod23.z.uuid().optional().nullable(),
  type: import_zod23.z.string(),
  message: import_zod23.z.string(),
  triggeredAt: import_zod23.z.date(),
  isRead: import_zod23.z.boolean().default(false)
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
  user: import_zod23.z.lazy(() => UserReferenceSchema),
  app: import_zod23.z.lazy(() => AppReferenceSchema).optional().nullable()
});

// src/schemas/allowedOrigin.schema.ts
var import_zod24 = require("zod");
var AllowedOriginBaseSchema = import_zod24.z.object({
  id: import_zod24.z.uuid(),
  organizationId: import_zod24.z.uuid(),
  origin: import_zod24.z.string(),
  createdAt: import_zod24.z.date()
});
var AllowedOriginReferenceSchema = AllowedOriginBaseSchema.pick({
  id: true,
  organizationId: true,
  origin: true,
  createdAt: true
});
var AllowedOriginDetailedSchema = AllowedOriginBaseSchema.extend({
  organization: import_zod24.z.lazy(() => OrganizationReferenceSchema).optional().nullable()
});
var AddAllowedOriginInputSchema = import_zod24.z.object({
  organizationId: import_zod24.z.uuid(),
  origin: import_zod24.z.string().min(1)
});
var RemoveAllowedOriginInputSchema = import_zod24.z.object({
  organizationId: import_zod24.z.uuid(),
  origin: import_zod24.z.string().min(1)
});

// src/schemas/appMetric.schema.ts
var import_zod25 = require("zod");
var AppMetricBaseSchema = import_zod25.z.object({
  appId: import_zod25.z.string(),
  metric: import_zod25.z.string(),
  // e.g., "tokens", "vCPU-hours", "VRAM-MB"
  value: import_zod25.z.number(),
  recordedAt: import_zod25.z.date().optional()
  // optional if you want to default to now
});
var AppMetricReferenceSchema = AppMetricBaseSchema.extend({
  id: import_zod25.z.uuid(),
  recordedAt: import_zod25.z.date()
  // ensure timestamp exists in reference schema
});
var AppMetricDetailedSchema = AppMetricReferenceSchema.extend({
  app: import_zod25.z.lazy(() => AppReferenceSchema)
});

// src/schemas/auth.schema.ts
var import_zod26 = require("zod");
var AuthResponseSchema = import_zod26.z.object({
  user: import_zod26.z.lazy(() => UserDetailedSchema),
  token: import_zod26.z.string()
});
var UserRegisterInputSchema = import_zod26.z.object({
  email: import_zod26.z.email(),
  password: import_zod26.z.string(),
  name: import_zod26.z.string().optional(),
  origin: import_zod26.z.string().optional(),
  organizationId: import_zod26.z.uuid().optional()
});
var UserLoginInputSchema = import_zod26.z.object({
  email: import_zod26.z.email(),
  password: import_zod26.z.string(),
  origin: import_zod26.z.string().optional(),
  organizationId: import_zod26.z.uuid().optional()
});
var VerifiedTokenResultSchema = import_zod26.z.object({
  userId: import_zod26.z.string(),
  organizationId: import_zod26.z.string().nullable(),
  planId: import_zod26.z.string().nullable(),
  exp: import_zod26.z.number().optional()
});

// src/schemas/changeLog.schema.ts
var import_zod27 = require("zod");
var ChangeLogBaseSchema = import_zod27.z.object({
  id: import_zod27.z.uuid(),
  tableName: import_zod27.z.string().min(1, "Table name is required."),
  recordId: import_zod27.z.string().min(1, "Record ID is required."),
  appId: import_zod27.z.uuid().optional(),
  action: import_zod27.z.string().min(1, "Action is required."),
  changedBy: import_zod27.z.uuid().optional(),
  before: import_zod27.z.any().optional(),
  after: import_zod27.z.any().optional(),
  createdAt: import_zod27.z.date()
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
var import_zod28 = require("zod");
var EventLogBaseSchema = import_zod28.z.object({
  id: import_zod28.z.uuid(),
  appId: import_zod28.z.uuid(),
  endUserId: import_zod28.z.uuid().optional(),
  type: import_zod28.z.string(),
  payload: import_zod28.z.any(),
  createdAt: import_zod28.z.date()
});
var EventLogReferenceSchema = EventLogBaseSchema.pick({
  id: true,
  appId: true,
  endUserId: true,
  type: true,
  createdAt: true
});
var EventLogDetailedSchema = EventLogBaseSchema.extend({
  app: import_zod28.z.lazy(() => AppReferenceSchema),
  endUser: import_zod28.z.lazy(() => EndUserReferenceSchema).optional()
});

// src/schemas/featureFlag.schema.ts
var import_zod29 = require("zod");
var FeatureFlagBaseSchema = import_zod29.z.object({
  id: import_zod29.z.uuid(),
  name: import_zod29.z.string(),
  description: import_zod29.z.string().optional(),
  isActive: import_zod29.z.boolean(),
  createdAt: import_zod29.z.date(),
  updatedAt: import_zod29.z.date(),
  appId: import_zod29.z.uuid().optional()
});
var FeatureFlagReferenceSchema = FeatureFlagBaseSchema.pick({
  id: true,
  name: true,
  isActive: true,
  appId: true
});
var FeatureFlagDetailedSchema = FeatureFlagBaseSchema.extend({
  app: import_zod29.z.lazy(() => AppReferenceSchema).optional()
});

// src/schemas/forecast.schema.ts
var import_zod30 = require("zod");
var ForecastBaseSchema = import_zod30.z.object({
  id: import_zod30.z.uuid(),
  appId: import_zod30.z.uuid(),
  metric: import_zod30.z.string(),
  predicted: import_zod30.z.number(),
  startDate: import_zod30.z.date(),
  endDate: import_zod30.z.date(),
  createdAt: import_zod30.z.date()
});
var ForecastReferenceSchema = ForecastBaseSchema.pick({
  id: true,
  metric: true,
  predicted: true,
  startDate: true,
  endDate: true
});
var ForecastDetailedSchema = ForecastBaseSchema.extend({
  app: import_zod30.z.lazy(() => AppReferenceSchema)
});

// src/schemas/globalAllowedOrigin.schema.ts
var import_zod31 = require("zod");
var GlobalAllowedOriginSchema = import_zod31.z.object({
  id: import_zod31.z.uuid(),
  origin: import_zod31.z.url().or(import_zod31.z.string().regex(/^https?:\/\/[a-zA-Z0-9.-]+(:[0-9]+)?$/)),
  // allow localhost or custom domains
  createdAt: import_zod31.z.date()
});
var GlobalAllowedOriginDetailedSchema = GlobalAllowedOriginSchema.extend({
  referencedBy: import_zod31.z.array(
    import_zod31.z.object({
      organizationId: import_zod31.z.uuid().nullable(),
      organizationName: import_zod31.z.string().nullable()
    })
  ).optional()
});

// src/schemas/integration.schema.ts
var import_zod32 = require("zod");
var IntegrationBaseSchema = import_zod32.z.object({
  id: import_zod32.z.uuid(),
  appId: import_zod32.z.uuid(),
  type: import_zod32.z.string(),
  config: import_zod32.z.any(),
  createdAt: import_zod32.z.date()
});
var IntegrationReferenceSchema = IntegrationBaseSchema.pick({
  id: true,
  type: true
});
var IntegrationDetailedSchema = IntegrationBaseSchema.extend({
  app: import_zod32.z.lazy(() => AppReferenceSchema)
});

// src/schemas/openmeter.shema.ts
var import_zod33 = require("zod");
var OpenMeterUsageEntrySchema = import_zod33.z.object({
  userId: import_zod33.z.uuid(),
  feature: import_zod33.z.string(),
  // Could also use FeatureEnum
  usage: import_zod33.z.number().nonnegative(),
  organizationId: import_zod33.z.uuid().optional(),
  apiKeyId: import_zod33.z.uuid().optional(),
  sessionId: import_zod33.z.uuid().optional(),
  createdAt: import_zod33.z.date().optional(),
  metadata: import_zod33.z.record(import_zod33.z.string(), import_zod33.z.any()).optional()
});

// src/schemas/sdkLog.schema.ts
var import_zod34 = require("zod");
var SdkLogBaseSchema = import_zod34.z.object({
  id: import_zod34.z.uuid(),
  appId: import_zod34.z.string(),
  endUserId: import_zod34.z.string().optional(),
  method: import_zod34.z.string(),
  payload: import_zod34.z.any(),
  createdAt: import_zod34.z.date()
});
var SdkLogReferenceSchema = SdkLogBaseSchema.pick({
  id: true,
  method: true,
  createdAt: true
});
var SdkLogDetailedSchema = SdkLogBaseSchema.extend({
  app: import_zod34.z.lazy(() => AppReferenceSchema),
  endUser: import_zod34.z.lazy(() => EndUserReferenceSchema).optional()
});

// src/schemas/usage.schema.ts
var import_zod35 = require("zod");
var UsageByFeatureSchema = import_zod35.z.object({
  feature: FeatureEnum,
  usage: import_zod35.z.number()
});
var MonthlyUsageSchema = import_zod35.z.object({
  month: import_zod35.z.string(),
  // e.g., "2025-10"
  usage: import_zod35.z.number(),
  totalCost: import_zod35.z.number().optional(),
  breakdown: import_zod35.z.record(import_zod35.z.string(), import_zod35.z.number()).optional(),
  logs: import_zod35.z.array(UsageLogReferenceSchema).optional()
});
var UsageSummarySchema = import_zod35.z.object({
  currentUsage: import_zod35.z.number(),
  usageLimit: import_zod35.z.number().optional(),
  periodStart: import_zod35.z.string(),
  periodEnd: import_zod35.z.string(),
  isOverLimit: import_zod35.z.boolean(),
  history: import_zod35.z.array(MonthlyUsageSchema).optional(),
  estimatedCost: import_zod35.z.number().optional()
});
var UsageSummaryChartSchema = import_zod35.z.object({
  totalUsage: import_zod35.z.number(),
  currentMonthUsage: import_zod35.z.number(),
  monthlyHistory: import_zod35.z.array(MonthlyUsageSchema),
  byFeature: import_zod35.z.array(UsageByFeatureSchema),
  planLimit: import_zod35.z.number().optional(),
  percentUsed: import_zod35.z.number().optional()
});
var RecordUsageInputSchema = import_zod35.z.object({
  userId: import_zod35.z.number(),
  feature: FeatureEnum,
  usage: import_zod35.z.number(),
  sessionId: import_zod35.z.string().optional(),
  unitCost: import_zod35.z.number().optional(),
  organizationId: import_zod35.z.number().optional(),
  metadata: import_zod35.z.record(import_zod35.z.string(), import_zod35.z.any()).optional(),
  billed: import_zod35.z.boolean().optional(),
  timestamp: import_zod35.z.preprocess(
    (arg) => arg ? new Date(arg) : void 0,
    import_zod35.z.date().optional()
  )
});
var UsageThresholdAlertSchema = import_zod35.z.object({
  userId: import_zod35.z.number(),
  used: import_zod35.z.number(),
  max: import_zod35.z.number()
});
var UsageLogWithUserSchema = UsageLogReferenceSchema.extend({
  user: UserReferenceSchema.optional()
});
var UsageLogsTableSchema = import_zod35.z.object({
  logs: import_zod35.z.array(UsageLogWithUserSchema),
  totalCount: import_zod35.z.number()
});
var UsageSummaryItemSchema = import_zod35.z.object({
  feature: FeatureEnum,
  totalUsage: import_zod35.z.number()
});
var OrgUsageSummaryItemSchema = import_zod35.z.object({
  feature: FeatureEnum,
  _sum: import_zod35.z.object({
    usage: import_zod35.z.number().nullable()
  })
});
var OrgUsageSummarySchema = import_zod35.z.array(OrgUsageSummaryItemSchema);

// src/schemas/usageLimit.schema.ts
var import_zod36 = require("zod");
var UsageLimitBaseSchema = import_zod36.z.object({
  id: import_zod36.z.uuid(),
  appId: import_zod36.z.string(),
  endUserId: import_zod36.z.string().optional(),
  metric: import_zod36.z.string(),
  limit: import_zod36.z.number(),
  period: import_zod36.z.enum(["daily", "weekly", "monthly", "yearly", "lifetime"]),
  metadata: import_zod36.z.record(import_zod36.z.string(), import_zod36.z.any()).optional(),
  resetAt: import_zod36.z.date().optional(),
  createdAt: import_zod36.z.date(),
  updatedAt: import_zod36.z.date().optional()
});
var UsageLimitReferenceSchema = UsageLimitBaseSchema.pick({
  id: true,
  metric: true,
  limit: true,
  period: true,
  createdAt: true
});
var UsageLimitDetailedSchema = UsageLimitBaseSchema.extend({
  app: import_zod36.z.lazy(() => AppReferenceSchema),
  endUser: import_zod36.z.lazy(() => EndUserReferenceSchema).optional()
});

// src/schemas/usagePayload.schema.ts
var import_zod37 = require("zod");
var UsagePayloadSchema = import_zod37.z.object({
  feature: import_zod37.z.enum(AI_FEATURES),
  usage: import_zod37.z.number().min(0),
  sessionId: import_zod37.z.uuid().optional(),
  appId: import_zod37.z.string().optional(),
  endUserId: import_zod37.z.string().optional(),
  organizationId: import_zod37.z.string().optional(),
  ipAddress: import_zod37.z.string().optional(),
  userAgent: import_zod37.z.string().optional(),
  modelUsage: ModelUsageInputSchema.partial().optional(),
  metadata: import_zod37.z.record(import_zod37.z.string(), import_zod37.z.any()).optional()
});

// src/schemas/usagePricing.schema.ts
var import_zod38 = require("zod");
var UsagePricingBaseSchema = import_zod38.z.object({
  id: import_zod38.z.uuid(),
  appId: import_zod38.z.uuid(),
  metric: import_zod38.z.string(),
  pricePerUnit: import_zod38.z.number(),
  currency: import_zod38.z.string().default("usd"),
  unitName: import_zod38.z.string().optional(),
  // e.g., "tokens", "requests"
  billingCycle: import_zod38.z.enum(["monthly", "yearly"]).default("monthly"),
  tiered: import_zod38.z.boolean().optional(),
  // future support for tiered pricing
  metadata: import_zod38.z.record(import_zod38.z.string(), import_zod38.z.any()).optional(),
  createdAt: import_zod38.z.date(),
  updatedAt: import_zod38.z.date().optional()
});
var UsagePricingReferenceSchema = UsagePricingBaseSchema.pick({
  id: true,
  metric: true,
  pricePerUnit: true,
  currency: true,
  unitName: true
});
var UsagePricingDetailedSchema = UsagePricingBaseSchema.extend({
  app: import_zod38.z.lazy(() => AppReferenceSchema)
});

// src/transformer.ts
var import_superjson = __toESM(require("superjson"), 1);
var transformer = import_superjson.default;
//# sourceMappingURL=index.cjs.map