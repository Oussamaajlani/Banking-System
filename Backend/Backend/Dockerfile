# Stage 1: Build the application
FROM maven:3.9-amazoncorretto-17 AS build

WORKDIR /app

# Copy Maven wrapper and configuration
COPY pom.xml mvnw ./
RUN chmod +x mvnw
COPY .mvn .mvn
RUN ./mvnw dependency:resolve

# Copy source code and package the application
COPY src src
RUN ./mvnw package -Dmaven.test.skip

# Stage 2: Create the runtime image
FROM amazoncorretto:17-alpine

WORKDIR /app

# Copy the built JAR file from the build stage
COPY --from=build /app/target/backend.jar /app/backend.jar

# Expose port (optional, depending on your application's needs)
EXPOSE 8080

# Define the entry point for the container
ENTRYPOINT ["java", "-jar", "/app/backend.jar"]
