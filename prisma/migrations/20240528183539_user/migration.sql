-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "phone_number" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "image" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);
