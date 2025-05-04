const CreateUserTableQuery = 
`
CREATE TABLE Users (
    UserId INT IDENTITY(1,1) PRIMARY KEY,
    Username VARCHAR(50) NOT NULL UNIQUE,
    Password VARCHAR(64) NOT NULL
);
`
const CreateAdminTableQuery =
`
CREATE TABLE Admins (
    AdminId INT IDENTITY(1,1) PRIMARY KEY,
    Username VARCHAR(50) NOT NULL UNIQUE,
    Password VARCHAR(64) NOT NULL
);
`
const CheckAdminCredentialsQuery =
`
SELECT AdminId 
FROM Admins 
WHERE Username = @user
AND Password = @pass;
`
const CreatePieTableQuery =
`
CREATE TABLE Pies (
    PieId INT IDENTITY(1,1) PRIMARY KEY,
    PieName VARCHAR(100) NOT NULL,
    PieImage VARCHAR(MAX) NULL,
    UserId INT,
    FOREIGN KEY (UserId) REFERENCES Users(UserId)
);
`
const CreateVotesTableQuery =
`
CREATE TABLE Votes (
    UserId INT NOT NULL,
    PieId INT NOT NULL,
    Vote FLOAT NOT NULL CHECK (Vote >= 0 AND Vote <= 10),
    PRIMARY KEY (UserID, PieID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN Key (PieID) REFERENCES Pies(PieID)
);
`

const CreateSuperlativesTableQuery =
`
CREATE TABLE Superlatives (
    SuperlativeId INT IDENTITY(1,1) PRIMARY KEY,
    Title VARCHAR(100) NOT NULL,
    Description VARCHAR(255) NOT NULL
);
`

const CreateSuperlativeVotesTableQuery =
`
CREATE TABLE SuperlativeVotes (
    UserId INT NOT NULL,
    PieId INT NOT NULL,
    SuperlativeId INT NOT NULL,
    PRIMARY KEY (UserID, SuperlativeId),
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (PieID) REFERENCES Pies(PieID),
    FOREIGN KEY (SuperlativeId) REFERENCES Superlatives(SuperlativeId)
);

`

const GetAllPiesQuery = 
`
SELECT * FROM Pies;
`

const VoteForPieQuery = 
`INSERT INTO Votes (UserId, PieId, Vote) VALUES (@userId, @pieId, @vote);`

const GetAllVotesForUserQuery = 
`SELECT * FROM Votes WHERE UserId = @userId;`

const CheckForExistingVoteQuery = 
`SELECT * FROM Votes WHERE UserId = @userId AND PieId = @pieId;`

const UpdateVoteQuery = 
`UPDATE Votes SET Vote = @vote WHERE UserId = @userId AND PieId = @pieId;`

const BakePieQuery = 
 `DECLARE @existingPieId INT;

-- Check if user already has a pie
SELECT @existingPieId = PieId 
FROM Pies 
WHERE UserId = @userId;

IF @existingPieId IS NOT NULL
BEGIN
    -- User already has a pie, update it
    UPDATE Pies 
    SET PieName = @name, PieImage = @image 
    WHERE PieId = @existingPieId;
    
    SELECT @existingPieId AS pieId;
END
ELSE
BEGIN
    -- New pie for this user
    INSERT INTO Pies (PieName, PieImage, UserId) 
    VALUES (@name, @image, @userId);
    
    SELECT SCOPE_IDENTITY() AS pieId;
END
`;

const GetUserQuery = 
`SELECT * FROM USERS where Username = @username;`

const VerifyUserQuery =
`SELECT * FROM USERS where Username = @username and Password = @password;`

const AddUserQuery = 
`INSERT INTO Users (Username, Password) VALUES (@username, @password);`

const GetPieQuery = 
`SELECT * FROM Pies WHERE PieId = @pieId;` 

const AddPieImage = 
`UPDATE Pies SET PieImage = @image WHERE PieId = @pieId;`

const GetVotesQuery = 
`SELECT TOP (@limit)
    PieId,
    AVG(Vote) AS AverageVote
FROM 
    Votes
GROUP BY 
    PieId
ORDER BY 
    AverageVote DESC;`

const GetSuperlativesQuery =
`
SELECT * FROM Superlatives;
`

const GetSuperlativeVotesByUserQuery =
`
SELECT
    SuperlativeVotes.UserId,
    SuperlativeVotes.SuperlativeId,
    SuperlativeVotes.PieId,
WHERE
    SuperlativeVotes.UserId = @userId;
`

const GetSuperlativeVotesQuery =
`
SELECT
    SuperlativeVotes.PieId,
WHERE
    SuperlativeVotes.UserId = @userId
    AND SuperlativeVotes.SuperlativeId = @superlativeId;
`

const InsertSuperlativeVoteQuery =
`
INSERT INTO SuperlativeVotes (UserId, PieId, SuperlativeId)
VALUES (@userId, @pieId, @superlativeId);
`

const UpdateSuperlativeVoteQuery =
`
UPDATE SuperlativeVotes
SET PieId = @pieId
WHERE UserId = @userId AND SuperlativeId = @superlativeId;
`


module.exports = {
    AddPieImage,
    CreateUserTableQuery,
    CreateAdminTableQuery,
    CreatePieTableQuery,
    CreateVotesTableQuery,
    CreateSuperlativesTableQuery,
    CreateSuperlativeVotesTableQuery,
    CheckAdminCredentialsQuery,
    GetAllPiesQuery,
    VoteForPieQuery,
    BakePieQuery,
    AddUserQuery,
    GetPieQuery,
    GetVotesQuery,
    GetUserQuery,
    VerifyUserQuery,
    CheckForExistingVoteQuery,
    UpdateVoteQuery,
    GetAllVotesForUserQuery,
    GetSuperlativesQuery,
    GetSuperlativeVotesQuery,
    GetSuperlativeVotesByUserQuery,
    InsertSuperlativeVoteQuery,
    UpdateSuperlativeVoteQuery,
}
