/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Emojis` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Emojis_name_key" ON "Emojis"("name");
