--SP para crear un usuario.
CREATE PROCEDURE CRE_USER_PR

@P_Usercode nvarchar(30),
@P_Name nvarchar(50),
@P_Email nvarchar(30),
@P_Password nvarchar(50),
@P_BirthDate DateTime,
@P_Status nvarchar(10)

AS
BEGIN
    INSERT INTO TBL_User( created, UserCode, Name, Email, Password, BirthDate, Status)
	VALUES (GETDATE(),@P_UserCode,@P_Name, @P_Email, @P_Password, @P_BirthDate, @P_Status);
END
GO