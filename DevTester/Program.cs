

using DataAccess.DAO;
using Microsoft.Data.SqlClient;

public class Program{

    public static void Main(string[] args)
    {
        var sqlOperation = new SqlOperation();
        sqlOperation.ProcedureName = "CRE_USER_PR";

        sqlOperation.ProcedureName = "CRE_USER_PR";

        sqlOperation.AddStringParameter("P_UserCode", "abejarano");
        sqlOperation.AddStringParameter("P_Name", "Ana");
        sqlOperation.AddStringParameter("P_Email", "abejarano@ucenfotec.ac.cr");
        sqlOperation.AddStringParameter("P_Password", "Ana123!");
        sqlOperation.AddStringParameter("P_Status", "AC");
        sqlOperation.AddDateTimeParam("P_BirthDate", DateTime.Now);

        var sqlDao = SqlDao.GetInstance();

        sqlDao.ExecuteProcedure(sqlOperation);
    }
}

    


