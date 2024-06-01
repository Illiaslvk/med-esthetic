# Use an official OpenJDK runtime as a parent image
FROM openjdk:17

# Set the working directory inside the container
WORKDIR /app

# Add the project's JAR file to the container
COPY target/med-esthetic-0.0.1-SNAPSHOT.jar /app/med-esthetic.jar

# Make port 8080 available to the world outside this container
EXPOSE 8080

# Run the JAR file
ENTRYPOINT ["java", "-jar", "/app/med-esthetic.jar"]
