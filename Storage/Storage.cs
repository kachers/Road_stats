using Road_stats.Models;

namespace Road_stats.Storage
{
    public class Storage
    {
        private readonly RoadStatsDbContext _context;

        public Storage(RoadStatsDbContext context)
        {
            _context = context;
        }

        public List<RecordModel> GetStats()
        {
            return _context.Records.ToList();
        }

        public List<AverageSpeedByHour> CalculateHourlyAverageSpeed(string date)
        {
            var dateConverted = date.Split("-");
            DateTime targetDate = new DateTime(
                int.Parse(dateConverted[0]),
                int.Parse(dateConverted[1]),
                int.Parse(dateConverted[2]));

            var filteredRecords = _context.Records.Where(record => record.Date.Date == targetDate.Date).ToList();

            // Group records by hour
            var recordsByHour = filteredRecords.GroupBy(record => record.Date.Hour);

            // Calculate average speed for each hour
            var hourlyAverageSpeeds = recordsByHour.Select(group =>
                new AverageSpeedByHour
                {
                    Hour = group.Key,
                    AverageSpeed = (int)Math.Round(group.Average(record => record.Speed))
                }).ToList();

            return hourlyAverageSpeeds;

            /*var dateConverted = date.Split("-");
            DateTime dateTimeDate = new DateTime(
                int.Parse(dateConverted[0]),
                int.Parse(dateConverted[1]),
                int.Parse(dateConverted[2]));

            return _context.Records.Where(r => r.Date.Date == dateTimeDate).ToList();*/
        }

        public List<RecordModel> GetBySpeed(int? speed)
        {
            return _context.Records.Where(r => r.Speed >= speed).ToList();
        }

        public List<RecordModel> GetFromDate(List<RecordModel> recordList, string? date)
        {
            var dateConverted = date.Split("-");
            DateTime dateFrom = new DateTime(
                int.Parse(dateConverted[0]), 
                int.Parse(dateConverted[1]),
                int.Parse(dateConverted[2]));

            return recordList.Where(r => r.Date.Date.CompareTo(dateFrom) >= 0).ToList();
        }

        public List<RecordModel> GetToDate(List<RecordModel> recordList, string? date)
        {
            var dateConverted = date.Split("-");
            DateTime dateTo = new DateTime(
                int.Parse(dateConverted[0]),
                int.Parse(dateConverted[1]),
                int.Parse(dateConverted[2]));
            return recordList.Where(r=> r.Date.Date.CompareTo(dateTo) <= 0).ToList();
        }

        public List<RecordModel> FilterRecords(int? speed, string? fromDate, string? toDate)
        {
            var filteredRecordList = GetBySpeed(speed);
            filteredRecordList = GetFromDate(filteredRecordList, fromDate);
            return GetToDate(filteredRecordList, toDate);
        }

        public void AddRecords(List<RecordModel> records)
        {
            _context.Records.AddRange(records);
            _context.SaveChanges();
        }

        public void Clear()
        {
            _context.Records.RemoveRange(_context.Records);
            _context.SaveChanges();
        }
    }
}
