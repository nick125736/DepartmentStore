using DepartmentStore.Contracts;
using DepartmentStore.Repositories;
using DepartmentStore.Utilities;
using System.Globalization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options => 
{ 
    options.AddPolicy(name: "AllowAny",
        policy => 
        { 
            policy.WithOrigins("https://localhost:7205","http://localhost:5249")
            .AllowAnyOrigin();
        });
});

builder.Services.AddSingleton<DbContext>();
builder.Services.AddScoped<IMember, MemberRepository>();
builder.Services.AddScoped<ICounter, CounterRepository>();
builder.Services.AddScoped<ICross, CrossRepository>();
var app = builder.Build();



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseCors("AllowAny");

app.Run();
