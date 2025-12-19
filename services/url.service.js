import { nanoid } from "nanoid";
import { eq } from "drizzle-orm";
import db from "../db/index.js";
import { urlsTable } from "../models/url.model.js";

/**
 * Fetch a URL record by its shortCode
 * @param {string} shortCode
 * @returns {Promise<Object|null>} url object or null if not found
 */
export async function getExistingURLByShortCode(shortCode) {
  if (!shortCode) return null;

  const [url] = await db
    .select({
      id: urlsTable.id,
      shortCode: urlsTable.shortCode,
      targetURL: urlsTable.targetURL,
      userId: urlsTable.userId,
    })
    .from(urlsTable)
    .where(eq(urlsTable.shortCode, shortCode));

  return url ?? null;
}

export async function createURL({ url, shortCode, userId }) {
  const finalCode = shortCode || nanoid(6);

  const [result] = await db
    .insert(urlsTable)
    .values({
      shortCode: finalCode,
      targetURL: url,
      userId,
    })
    .returning({
      id: urlsTable.id,
      shortCode: urlsTable.shortCode,
      targetURL: urlsTable.targetURL,
    });

  return result;
}
