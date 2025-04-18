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
    PieImage VARCHAR(MAX) NULL
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
`INSERT INTO Pies (PieName, PieImage) VALUES (@name, @image);`

const GetUserQuery = 
`SELECT * FROM USERS where Username = @username;`

const VerifyUserQuery =
`SELECT * FROM USERS where Username = @username and Password = @password;`

const AddUserQuery = 
`INSERT INTO Users (Username, Password) VALUES (@username, @password);`

const GetPieQuery = 
`SELECT * FROM Pies WHERE PieId = @pieId;` 

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

module.exports = {
    CreateUserTableQuery,
    CreateAdminTableQuery,
    CreatePieTableQuery,
    CreateVotesTableQuery,
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
    GetAllVotesForUserQuery
}