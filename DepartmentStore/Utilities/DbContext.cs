using Microsoft.Data.SqlClient;
using System.Data;

namespace DepartmentStore.Utilities
{
    public class DbContext
    {
        // 用於儲存 DI（Dependency Injection） 的 IConfiguration 實例
        private readonly IConfiguration _configuration;
        // 用來儲存資料庫連接字串
        private readonly string _connectionString;
        public DbContext(IConfiguration configuration)
        {
            _configuration = configuration;
            // 讀取名稱為 CalendarContext 的連接字串
            // 將其儲存在 _connectionString 變數中
            _connectionString = _configuration.GetConnectionString("DepartmentContext");
        }
        // 此方法可用於建立與資料庫的連線
        // 定義一個名為 CreateConnection 的公共方法
        // 透過 _connectionString 建立一個新的 SqlConnection 實例
        public IDbConnection CreateConnection()
        => new SqlConnection(_connectionString);
    }
}
