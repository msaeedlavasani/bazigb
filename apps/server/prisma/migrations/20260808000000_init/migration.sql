-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "wins" INTEGER NOT NULL DEFAULT 0,
    "losses" INTEGER NOT NULL DEFAULT 0,
    "rating" INTEGER NOT NULL DEFAULT 1200,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'system',
    "title" TEXT NOT NULL,
    "body" TEXT,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rooms" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'waiting',
    "gameType" TEXT NOT NULL,
    "players" TEXT NOT NULL DEFAULT '[]',
    "currentState" TEXT,
    "winnerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "game_histories" (
    "id" TEXT NOT NULL,
    "winnerId" TEXT,
    "roomId" TEXT NOT NULL,
    "gameName" TEXT NOT NULL DEFAULT 'tic-tac-toe',
    "players" TEXT NOT NULL DEFAULT '[]',
    "data" TEXT NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "game_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tournaments" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gameType" TEXT NOT NULL DEFAULT 'tic-tac-toe',
    "status" TEXT NOT NULL DEFAULT 'registration',
    "maxPlayers" INTEGER NOT NULL DEFAULT 16,
    "bracket" TEXT,
    "winnerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tournaments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tournament_players" (
    "id" TEXT NOT NULL,
    "tournamentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "seed" INTEGER NOT NULL DEFAULT 0,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tournament_players_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tournament_matches" (
    "id" TEXT NOT NULL,
    "tournamentId" TEXT NOT NULL,
    "round" INTEGER NOT NULL DEFAULT 1,
    "bracketIndex" INTEGER NOT NULL DEFAULT 0,
    "playerAId" TEXT,
    "playerBId" TEXT,
    "winnerId" TEXT,
    "nextMatchId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "playedAt" TIMESTAMP(3),

    CONSTRAINT "tournament_matches_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE INDEX "notifications_userId_read_idx" ON "notifications"("userId", "read");

-- CreateIndex
CREATE UNIQUE INDEX "rooms_code_key" ON "rooms"("code");

-- CreateIndex
CREATE INDEX "game_histories_roomId_idx" ON "game_histories"("roomId");

-- CreateIndex
CREATE INDEX "game_histories_winnerId_idx" ON "game_histories"("winnerId");

-- CreateIndex
CREATE INDEX "tournaments_status_idx" ON "tournaments"("status");

-- CreateIndex
CREATE INDEX "tournament_players_tournamentId_idx" ON "tournament_players"("tournamentId");

-- CreateIndex
CREATE UNIQUE INDEX "tournament_players_tournamentId_userId_key" ON "tournament_players"("tournamentId", "userId");

-- CreateIndex
CREATE INDEX "tournament_matches_tournamentId_status_idx" ON "tournament_matches"("tournamentId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "tournament_matches_tournamentId_round_bracketIndex_key" ON "tournament_matches"("tournamentId", "round", "bracketIndex");

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game_histories" ADD CONSTRAINT "game_histories_winnerId_fkey" FOREIGN KEY ("winnerId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game_histories" ADD CONSTRAINT "game_histories_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tournaments" ADD CONSTRAINT "tournaments_winnerId_fkey" FOREIGN KEY ("winnerId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tournament_players" ADD CONSTRAINT "tournament_players_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "tournaments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tournament_players" ADD CONSTRAINT "tournament_players_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tournament_matches" ADD CONSTRAINT "tournament_matches_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "tournaments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tournament_matches" ADD CONSTRAINT "tournament_matches_playerAId_fkey" FOREIGN KEY ("playerAId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tournament_matches" ADD CONSTRAINT "tournament_matches_playerBId_fkey" FOREIGN KEY ("playerBId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tournament_matches" ADD CONSTRAINT "tournament_matches_winnerId_fkey" FOREIGN KEY ("winnerId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tournament_matches" ADD CONSTRAINT "tournament_matches_nextMatchId_fkey" FOREIGN KEY ("nextMatchId") REFERENCES "tournament_matches"("id") ON DELETE SET NULL ON UPDATE CASCADE;

