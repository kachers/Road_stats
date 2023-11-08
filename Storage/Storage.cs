using Road_stats.Models;

namespace Road_stats.Storage
{
    public class Storage
    {
        private readonly List<Record> _storage;

        public List<Record> GetBySpeed(List<Record> recordList, int? speed)
        {
            return recordList.Where(r => r.speed >= speed).ToList();
        }

        public List<Record> GetFromDate(List<Record> recordList, string? date)
        {
            return recordList.Where(r => r.date.Date.CompareTo(date) >= 0).ToList();
        }

        public List<Record> GetBeforeDate(List<Record> recordList, string? date)
        {
            return recordList.Where(r=> r.date.Date.CompareTo(date) <= 0).ToList();
        }

        public List<Record> FilterRecords(int? speed, string? fromDate, string? beforeDate)
        {
            var filteredRecordList = GetBySpeed(_storage, speed);
            filteredRecordList = GetFromDate(filteredRecordList, fromDate);
            return GetBeforeDate(filteredRecordList, beforeDate);
        }
    }
}
