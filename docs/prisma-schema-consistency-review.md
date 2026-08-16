# Prisma Schema Consistency Review

## Checked file
- `prisma/schema.prisma`

## Findings

1. **Mismatched course identifier types between `Order` and `Course`**
   - `Order.courseId` is `String`, while `Course.id` is `Int`.
   - This prevents a direct Prisma relation between orders and courses and can create type mismatch bugs in joins/filtering.

2. **`Order.userId` exists without a `User` relation**
   - `Order` includes `userId Int?` and an index, but no relation field such as `user User? @relation(...)`.
   - This can lead to orphaned user references and inconsistent query patterns vs other models.

3. **`RefundRequest.processedBy` has no relation to `User`**
   - `processedBy Int?` likely points to an admin user, but there is no relation or FK.
   - That allows invalid IDs and blocks relational querying for processors.

4. **Mixed naming convention in `User.role_id`**
   - Most schema fields are camelCase, but `role_id` uses snake_case.
   - Not invalid, but inconsistent with the broader schema style and generated client ergonomics.

5. **Potentially inconsistent table naming strategy**
   - `User` maps to `"User"` (capitalized singular), while most other tables map to lowercase/plural names like `courses`, `orders`, etc.
   - This is valid, but can be a maintenance inconsistency if not intentionally legacy.

## Validation result
- Schema syntax and relation declarations are valid via `npx prisma validate`.

## Suggested next steps
- If you want strict consistency, consider:
  - changing `Order.courseId` to `Int` and adding a relation to `Course`;
  - adding a relation from `Order.userId` to `User.id`;
  - adding a relation from `RefundRequest.processedBy` to `User.id` (e.g., `processor User?` with a named relation);
  - renaming `role_id` to `roleId` with `@map("role_id")` if DB column preservation is needed;
  - documenting or normalizing table naming conventions.
