import "dotenv/config";
import crypto from "node:crypto";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

const COOKIE_NAME = "anex_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 12;

function secret() {
  return process.env.SESSION_SECRET || "development-only-change-this-secret";
}

function sign(value: string) {
  return crypto.createHmac("sha256", secret()).update(value).digest("base64url");
}

function encodeSession(email: string) {
  const payload = Buffer.from(JSON.stringify({ email, exp: Date.now() + SESSION_MAX_AGE * 1000 })).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

function decodeSession(value: string) {
  const [payload, signature] = value.split(".");
  if (!payload || !signature) return null;
  const expected = sign(payload);
  if (signature.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;
  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as { email?: string; exp?: number };
    return parsed.email && parsed.exp && parsed.exp > Date.now() ? parsed.email : null;
  } catch {
    return null;
  }
}

export async function getAdminSession() {
  const store = await cookies();
  const value = store.get(COOKIE_NAME)?.value;
  if (!value) return null;
  const email = decodeSession(value);
  if (!email) return null;
  const user = await prisma.user.findUnique({ where: { email } });
  return user?.role === "ADMIN" ? user : null;
}

export async function requireAdmin() {
  const user = await getAdminSession();
  if (!user) throw new Error("UNAUTHORIZED");
  return user;
}

export async function authenticateAdmin(email: string, password: string) {
  const configuredEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const configuredPassword = process.env.ADMIN_PASSWORD;
  if (!configuredEmail || !configuredPassword) return null;
  if (email.trim().toLowerCase() !== configuredEmail || password !== configuredPassword) return null;

  return prisma.user.upsert({
    where: { email: configuredEmail },
    update: { role: "ADMIN" },
    create: { email: configuredEmail, name: "ANEX Administrator", role: "ADMIN" },
  });
}

export async function createAdminSession(email: string) {
  const store = await cookies();
  store.set(COOKIE_NAME, encodeSession(email), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

export async function clearAdminSession() {
  const store = await cookies();
  store.set(COOKIE_NAME, "", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 0 });
}
