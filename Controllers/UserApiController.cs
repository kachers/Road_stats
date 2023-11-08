using Microsoft.AspNetCore.Mvc;
using Road_stats.Models;

namespace Road_stats.Controllers
{
    [Route("user/upload")]
    [ApiController]
    public class UserApiController : ControllerBase
    {
        private static readonly object AddLock = new();
        private readonly Storage.Storage _storage;

        public UserApiController(Storage.Storage storage)
        {
            _storage = storage;
        }

        [HttpPost]
        public IActionResult UploadFile([FromForm] FileUploadModel model)
        {
            if (model?.File == null)
            {
                return BadRequest("No file uploaded.");
            }

            try
            {
                if (!Path.GetExtension(model.File.FileName).Equals(".txt", StringComparison.OrdinalIgnoreCase))
                {
                    return BadRequest("Only .txt files are allowed.");
                }

                using (var streamReader = new StreamReader(model.File.OpenReadStream()))
                {
                    List<RecordModel> records = new List<RecordModel>();

                    while (!streamReader.EndOfStream)
                    {
                        string line = streamReader.ReadLine();
                        string[] parts = line.Split('\t');

                        if (parts.Length == 3)
                        {
                            if (DateTime.TryParse(parts[0], out DateTime date)
                                && int.TryParse(parts[1], out int speed))
                            {
                                records.Add(new RecordModel
                                {
                                    Date = date,
                                    Speed = speed,
                                    CarId = parts[2]
                                });
                            }
                        }
                    }
                    _storage.AddRecords(records);
                    
                    // For example, you can save them to a database, process the data, etc.
                    return Ok($"File contents processed successfully.\n{string.Join("\n", records)}");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

    }
}