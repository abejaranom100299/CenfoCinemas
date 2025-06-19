using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.DAO

{
    /*
     * Clase u objeto que se encarga de la comunicación con la base de datos.
     * Solo ejecutan Store Procedures
     * Esta clase implementa el Patron del Singleton.
     * Para asegurar la existencia de una unica instancia de este objeto.
     */

   
   public class SqlDao
    {
        //Paso 1: Crear una instancia privada de la misma clase
        private static SqlDao _instance;

        private string _connectionString;

        //Paso 2: Redefinir el constructor default y convertirlo en privado
        
        private SqlDao() 
        {
            _connectionString = @"Data Source=srv-sqldatabase-abejarano.database.windows.net;Initial Catalog=""Cenfocinemas - db"";Persist Security Info=True;User ID=sysman;Password=Cenfotec123!;Trust Server Certificate=True";
        }
        //Paso 3: Definir el método que expone la instancia
        public static SqlDao GetInstance() {

            if (_instance == null)
            {
                _instance = new SqlDao();
            }
            return _instance;
        }
        //Metodo para la ejecucion de SP sin retorno
        public void ExecuteProcedure(SqlOperation sqlOperation) {
            //Conectarse a la base de datos
            //Ejecutar el SP
            using (var conn = new SqlConnection(_connectionString))
            {
                using (var command = new SqlCommand(sqlOperation.ProcedureName, conn)
                {
                    CommandType = System.Data.CommandType.StoredProcedure
                })
                {
                    //Set de los parametros
                    foreach (var param in sqlOperation.Parameters)
                    {
                        command.Parameters.Add(param);
                    }
                    //Ejectura el SP
                    conn.Open();
                    command.ExecuteNonQuery();
                }

            }
        }
        // procedimiento para ejectura SP Que retornan un set de datos
        public List<Dictionary<string, object>> ExecuteQueryProcedure(SqlOperation sqlOperation)
        {

            var lstResults = new List<Dictionary<string, object>>();

            using (var conn = new SqlConnection(_connectionString))

            {
                using (var command = new SqlCommand(sqlOperation.ProcedureName, conn)
                {
                    CommandType = System.Data.CommandType.StoredProcedure
                })
                {
                    //Set de los parametros
                    foreach (var param in sqlOperation.Parameters)
                    {
                        command.Parameters.Add(param);
                    }
                    //Ejectura el SP
                    conn.Open();

                    //de aca en adelante la implementacion es distinta con respecto al procedure anterior
                    // sentencia que ejectua el SP y captura el resultado
                    var reader = command.ExecuteReader();

                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {

                            var rowDict = new Dictionary<string, object>();

                            for (var index = 0; index < reader.FieldCount; index++)
                            {
                                var key = reader.GetName(index);
                                var value = reader.GetValue(index);
                                //aca agregamos los valores al diccionario de esta fila
                                rowDict[key] = value;
                            }
                            lstResults.Add(rowDict);
                        }
                    }

                }
            }

            return lstResults;
        }
    }
}