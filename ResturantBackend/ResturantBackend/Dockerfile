# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# Set working directory inside container
WORKDIR /app

# Copy everything from the inner ResturantBackend folder
COPY . .

# Restore and publish explicitly using the project file
RUN dotnet restore ResturantBackend.csproj
RUN dotnet publish ResturantBackend.csproj -c Release -o /app/out

# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/out .

EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080

ENTRYPOINT ["dotnet", "ResturantBackend.dll"]
