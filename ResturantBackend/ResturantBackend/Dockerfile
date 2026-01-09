# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build

WORKDIR /app

# Copy only csproj first for caching
COPY ResturantBackend.csproj ./

RUN dotnet restore

# Copy everything else
COPY . ./

# Build and publish
RUN dotnet publish -c Release -o /app/out

# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime

WORKDIR /app
COPY --from=build /app/out ./

EXPOSE 5141
ENV ASPNETCORE_URLS=http://+:5141

ENTRYPOINT ["dotnet", "ResturantBackend.dll"]
