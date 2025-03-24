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
Create TABLE Pies (
    PieId INT IDENTITY(1,1) PRIMARY KEY,
    PieName VARCHAR(100) NOT NULL
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

const BakePieQuery = 
`INSERT INTO Pies (PieName) VALUES (@name);`

const AddUserQuery = 
`INSERT INTO Users (Username, Password) VALUES (@username, @password);`

const GetPieQuery = 
`SELECT * FROM Pies WHERE PieId = @pieId;` 

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
    GetPieQuery
}