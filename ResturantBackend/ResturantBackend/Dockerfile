# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /app

# Copy all files from current folder (where Dockerfile is)
COPY . .

# Restore and publish without specifying the path
RUN dotnet restore
RUN dotnet publish -c Release -o /app/out

# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime

WORKDIR /app
COPY --from=build /app/out .

EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080

ENTRYPOINT ["dotnet", "ResturantBackend.dll"]
