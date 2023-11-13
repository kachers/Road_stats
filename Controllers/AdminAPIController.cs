using Microsoft.AspNetCore.Mvc;
using Road_stats.Models;

namespace Road_stats.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AdminAPIController : ControllerBase
    {
        private static readonly object AddLock = new();

        private readonly Storage.Storage _storage;

        public AdminAPIController(Storage.Storage storage)
        {
            _storage = storage;
        }

    }
}