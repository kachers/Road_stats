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

        public List<RecordModel> GetBySpeed(int? speed)
        {
            return _context.Records.Where(r => r.Speed >= speed).ToList();
        }

        public List<RecordModel> GetFromDate(List<RecordModel> recordList, string? date)
        {
            return recordList.Where(r => r.Date.Date.CompareTo(date) >= 0).ToList();
        }

        public List<RecordModel> GetBeforeDate(List<RecordModel> recordList, string? date)
        {
            return recordList.Where(r=> r.Date.Date.CompareTo(date) <= 0).ToList();
        }

        public List<RecordModel> FilterRecords(int? speed, string? fromDate, string? beforeDate)
        {
            var filteredRecordList = GetBySpeed(speed);
            filteredRecordList = GetFromDate(filteredRecordList, fromDate);
            return GetBeforeDate(filteredRecordList, beforeDate);
        }

        public void AddRecords(List<RecordModel> records)
        {
            _context.Records.AddRange(records);
            _context.SaveChanges();
        }
    }
}
