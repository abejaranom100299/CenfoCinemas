using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.DAO
{
    /*
     * Clase u objeto que se encarga de la comunicacion con la base de datos
     * solo ejecuta Store Procedures
     * 
     * Esta Clase implemeta el patron del singleton
     * para asegurar la existencia de una unica instancia de este objeto
     * 
     */
    public class SqlDao
    {
        //Paso 1: Crear una instancia privada de la misma clase
        private static SqlDao instance;

        private string _connectionString;

        //Paso 2: Redefinir el constructor default y convertirlo en privado
        private SqlDao()
        {
            _connectionString = @"Data Source=srv-sqldatabase-abejarano.database.windows.net;Initial Catalog=cenfocinemas-db;User ID=Sysman;Password=Cenfotec123!;Trust Server Certificate=True";
        }
        //Paso 3: Definir el metodo que expone la instancia
        public static SqlDao GetInstance()
        {
            if (instance == null)
            {
                instance = new SqlDao();
            }
            return instance;
        }
        //Metodo que permite ejectura un store procedure en la base de datos
        // no genera retorno, solo en caso de excepciones retorna exception

        public void ExecuteProcedure(SqlOperation sqlOperation)
        {
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

        //Metodo para la ejecucion de SP con retorno de data
        public List<Dictionary<string, object>> ExecuteQueryProcedure(SqlOperation operation)
        {

            //Conectarse a la base de datos
            //Ejecutar el SP´
            //Capturar el resultado
            //Convertirlo en DTOs

            var list = new List<Dictionary<string, object>>();
            return list;

        }
    }
}
