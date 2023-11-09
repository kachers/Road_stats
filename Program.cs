using Microsoft.EntityFrameworkCore;

namespace Road_stats
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddScoped<Storage.Storage>();
            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddDbContext<RoadStatsDbContext>(options => options.UseSqlite(builder.Configuration.GetConnectionString("RoadStats")));
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("ReactAppPolicy",
                    builder => builder.WithOrigins("http://localhost:3000") // Add your frontend URL
                        .AllowAnyMethod()
                        .AllowAnyHeader());
            });
            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            app.UseCors("ReactAppPolicy");
            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}