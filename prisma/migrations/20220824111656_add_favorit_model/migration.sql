-- CreateTable
CREATE TABLE "Favorit" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "iklanId" TEXT,

    CONSTRAINT "Favorit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Favorit_id_key" ON "Favorit"("id");

-- AddForeignKey
ALTER TABLE "Favorit" ADD CONSTRAINT "Favorit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
