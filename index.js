// Compile regexes once, not on every loop iteration
const FORMATS = {
  email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  phone: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
  date:  /^(?:19|20)\d\d-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1\d|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)$/,
};

/**
 * Resolve the error message for a field, respecting custom message overrides.
 * @param {object} options   - The options/defaults object (d)
 * @param {string} field     - The field name being validated
 * @param {string} rule      - The rule key (e.g. 'required', 'email')
 * @param {string} fallback  - Default message if no override found
 */
function resolveMessage(options, field, rule, fallback) {
  const custom = options.message?.[field];
  if (!custom) return fallback;
  // Custom message can be a plain string or a map of rule → message
  if (typeof custom === "string") return custom;
  return custom[rule] ?? fallback;
}

/**
 * Build a standard error response object.
 */
function buildErrorResponse(options, message) {
  return {
    status_code: options.statusCode ?? 400,   // number, not string
    status:      options.status      ?? false,
    message,
  };
}

/**
 * Validate req.body fields against a rules schema.
 *
 * @param {object} req      - Express-style request object
 * @param {object} rules    - Validation rules per field
 * @param {object} options  - Optional config: statusCode, status, message, errors
 * @returns {false | object | string[]} 
 *   - false          → all fields valid
 *   - error object   → first error found (default mode)
 *   - string[]       → all error messages (when options.errors === true)
 */
function validator(req, rules, options = {}) {
  const body   = req.body ?? {};
  const errors = [];
  let   firstError = null;

  for (const field of Object.keys(rules)) {
    const rule  = rules[field];
    const value = body[field];

    const isRequired =
      rule === "required" || rule?.required === true;

    // ── Required check ──────────────────────────────────────────────────────
    if (isEmpty(value) && isRequired) {
      const msg = resolveMessage(
        options, field, "required", `${field} is required!`
      );
      errors.push(msg);
      if (!firstError) firstError = buildErrorResponse(options, msg);
      continue; // skip further checks for this field
    }

    // ── Format & constraint checks (only when value is present) ─────────────
    if (!isEmpty(value) && typeof rule === "object") {
      const strVal = value.toString();

      const checks = [
        rule.email && !FORMATS.email.test(strVal) &&
          resolveMessage(options, field, "email", `Invalid ${field}.`),

        rule.phone && !FORMATS.phone.test(strVal) &&
          resolveMessage(options, field, "phone", `Invalid ${field}.`),

        rule.date && !FORMATS.date.test(strVal) &&
          resolveMessage(options, field, "date", `Invalid ${field}.`),

        rule.max !== undefined && strVal.length > rule.max &&
          resolveMessage(options, field, "max", `Max length is ${rule.max}.`),

        rule.min !== undefined && strVal.length < rule.min &&
          resolveMessage(options, field, "min", `Min length is ${rule.min}.`),

        rule.type && typeof value !== rule.type &&
          resolveMessage(options, field, "type", `${field} must be of type ${rule.type}.`),

        rule.regex && !strVal.match(rule.regex) &&
          resolveMessage(options, field, "regex", `Invalid ${field}.`),
      ].filter(Boolean); // keep only truthy (failed) messages

      for (const msg of checks) {
        errors.push(msg);
        if (!firstError) firstError = buildErrorResponse(options, msg);
      }
    }
  }

  // Return all errors as an array, or the first error object, or false
  if (options.errors) return errors.length ? errors : false;
  return firstError ?? false;
}

// ── Utility helpers ──────────────────────────────────────────────────────────

/** Returns true if value is null, undefined, or empty string. */
function isEmpty(value) {
  return value === undefined || value === null || value === "";
}

/** Returns true if value is not null, undefined, or empty string. */
function isNotEmpty(value) {
  return !isEmpty(value);
}

/** Returns true if value is a non-null object or function. */
function isObject(value) {
  return value !== null && (typeof value === "object" || typeof value === "function");
}

/** Returns true if value is NOT a non-null object or function. */
function isNotObject(value) {
  return !isObject(value);
}

module.exports = { validator, isEmpty, isNotEmpty, isObject, isNotObject };
