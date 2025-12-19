import express from "express";
import db from "../db/index.js";
import { urlsTable } from "../models/url.model.js";
import { eq } from "drizzle-orm";
import { shortenPostRequestBodySchema } from "../validation/request.validation.js";
import { ensureAuthenticated } from "../middlewares/auth.middleware.js";
import {
  createURL,
  getExistingURLByShortCode,
} from "../services/url.service.js";

const router = express.Router();

router.post("/shorten", ensureAuthenticated, async function (req, res) {
  const validationResult = await shortenPostRequestBodySchema.safeParseAsync(
    req.body,
  );

  if (validationResult.error)
    return res.status(400).json({ error: validationResult.error.format() });

  const { url, code } = validationResult.data;

  if (code) {
    const exists = await getExistingURLByShortCode(code);

    if (exists) {
      return res.status(409).json({
        error: "Short code already exists",
      });
    }
  }

  const result = await createURL({
    url,
    shortCode: code,
    userId: req.user.id,
  });

  return res.status(201).json({
    id: result.id,
    shortCode: result.shortCode,
    targetURL: result.targetURL,
  });
});

router.get("/:shortcode", async function (req, res) {
  const code = req.params.shortcode;
  const result = await getExistingURLByShortCode(code);

  if (!result) {
    return res.status(404).json({ error: "Invalid URL" });
  }

  return res.redirect(result.targetURL);
});

export default router;
