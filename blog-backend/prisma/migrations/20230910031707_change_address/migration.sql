/*
  Warnings:

  - A unique constraint covering the columns `[address]` on the table `MailAddress` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `MailAddress` MODIFY `address` VARCHAR(256) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `MailAddress_address_key` ON `MailAddress`(`address`);

-- CreateIndex
CREATE INDEX `MailAddress_address_idx` ON `MailAddress`(`address`);
