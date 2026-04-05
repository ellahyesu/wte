FROM eclipse-temurin:17-jdk AS build
WORKDIR /app
COPY . .

# 파일이 있는지 확인하고 권한 부여 (실패 방지를 위해 if문 사용 가능)
RUN if [ -f "./gradlew" ]; then chmod +x ./gradlew; else echo "gradlew not found"; exit 1; fi

# 빌드 실행
RUN ./gradlew bootJar --no-daemon

# 2단계: 실행 환경
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]