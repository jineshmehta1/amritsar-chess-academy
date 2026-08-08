import { Buffer } from "buffer";

export async function createSessionToken(user: { id: string; username: string; role: string; name: string }) {
  const payload = {
    ...user,
    exp: Date.now() + 24 * 60 * 60 * 1000,
  };
  const encoder = new TextEncoder();
  const secretKeyData = encoder.encode(process.env.SESSION_SECRET || "genius-chess-secret-key-12345");
  const key = await crypto.subtle.importKey(
    "raw",
    secretKeyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  
  const headerStr = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
  const payloadStr = btoa(JSON.stringify(payload))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
  const data = encoder.encode(`${headerStr}.${payloadStr}`);
  const signatureBuffer = await crypto.subtle.sign("HMAC", key, data);
  const signature = btoa(String.fromCharCode(...new Uint8Array(signatureBuffer)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
    
  return `${headerStr}.${payloadStr}.${signature}`;
}

export async function decryptSessionToken(token: string) {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const [headerStr, payloadStr, signature] = parts;
    const encoder = new TextEncoder();
    const secretKeyData = encoder.encode(process.env.SESSION_SECRET || "genius-chess-secret-key-12345");
    const key = await crypto.subtle.importKey(
      "raw",
      secretKeyData,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );
    
    // Add back padding if missing
    let base64Sig = signature.replace(/-/g, "+").replace(/_/g, "/");
    while (base64Sig.length % 4) base64Sig += "=";
    
    const sigBin = atob(base64Sig);
    const sigBytes = new Uint8Array(sigBin.length);
    for (let i = 0; i < sigBin.length; i++) {
      sigBytes[i] = sigBin.charCodeAt(i);
    }
    
    const data = encoder.encode(`${headerStr}.${payloadStr}`);
    const isValid = await crypto.subtle.verify("HMAC", key, sigBytes, data);
    if (!isValid) return null;
    
    let base64Payload = payloadStr.replace(/-/g, "+").replace(/_/g, "/");
    while (base64Payload.length % 4) base64Payload += "=";
    const payload = JSON.parse(atob(base64Payload));
    if (payload.exp < Date.now()) return null;
    return payload;
  } catch (e) {
    return null;
  }
}
