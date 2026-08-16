-- Alter orders.courseId from TEXT to INTEGER
ALTER TABLE "orders"
ALTER COLUMN "courseId" TYPE INTEGER
USING "courseId"::integer;
