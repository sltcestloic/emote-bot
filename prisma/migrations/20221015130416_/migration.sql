-- CreateTable
CREATE TABLE "Emojis" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "author" VARCHAR(255) NOT NULL,

    CONSTRAINT "Emojis_pkey" PRIMARY KEY ("id")
);
