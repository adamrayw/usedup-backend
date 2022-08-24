-- AddForeignKey
ALTER TABLE "Favorit" ADD CONSTRAINT "Favorit_iklanId_fkey" FOREIGN KEY ("iklanId") REFERENCES "Iklan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
