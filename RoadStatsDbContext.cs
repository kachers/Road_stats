using Microsoft.EntityFrameworkCore;
using Road_stats.Models;

namespace Road_stats
{
    public class RoadStatsDbContext : DbContext
    {
        public RoadStatsDbContext(DbContextOptions<RoadStatsDbContext> options) :
            base(options)
        { }
        public DbSet<RecordModel> Records { get; set; }
    }
}