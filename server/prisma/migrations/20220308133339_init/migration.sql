-- CreateTable
CREATE TABLE "City" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Weather" (
    "id" SERIAL NOT NULL,
    "temp" DOUBLE PRECISION NOT NULL,
    "humidity" INTEGER NOT NULL,
    "time" INTEGER NOT NULL,
    "cityId" INTEGER NOT NULL,

    CONSTRAINT "Weather_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wind" (
    "id" SERIAL NOT NULL,
    "speed" DOUBLE PRECISION NOT NULL,
    "deg" INTEGER NOT NULL,
    "weatherId" INTEGER NOT NULL,

    CONSTRAINT "Wind_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "City_name_key" ON "City"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Weather_cityId_key" ON "Weather"("cityId");

-- CreateIndex
CREATE UNIQUE INDEX "Wind_weatherId_key" ON "Wind"("weatherId");

-- AddForeignKey
ALTER TABLE "Weather" ADD CONSTRAINT "Weather_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wind" ADD CONSTRAINT "Wind_weatherId_fkey" FOREIGN KEY ("weatherId") REFERENCES "Weather"("id") ON DELETE CASCADE ON UPDATE CASCADE;
