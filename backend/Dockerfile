FROM eclipse-temurin:17-jdk AS build
WORKDIR /app
COPY . .
# 실행 권한 부여 추가
RUN chmod +x ./gradlew

# 이후 빌드 실행
RUN ./gradlew bootJar --no-daemon

FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
