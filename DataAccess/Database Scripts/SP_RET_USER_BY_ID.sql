CREATE PROCEDURE [dbo].[RET_ALL_USERS_BY_PR]
@P_ID INT
AS
BEGIN
    SELECT Id, Created,Updated,UserCode,Name,Email,Password, BirthDate, Status
	FROM TBL_User
	WHERE ID=@P_ID;
END
