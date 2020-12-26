# 项目说明文档
[TOC]

## 一、项目功能
> 此项目是第一个对 MongoDB 和 Java 的集合

## 二、项目有关结构说明
> 此项目仅仅使用 `maven` 搭建项目管理,不用 `Spring Boot` 搭建环境,在搭建时需注意如下几点: 
>   1. 需要导入 `MongoDB` 的 `jar` 包依赖
>       ```xml
>      <dependencies>
>            <!-- https://mvnrepository.com/artifact/org.mongodb/mongodb-driver-sync -->
>            <dependency>
>                <groupId>org.mongodb</groupId>
>                <artifactId>mongodb-driver-sync</artifactId>
>                <version>4.2.0-beta1</version>
>            </dependency>
>            <!-- https://mvnrepository.com/artifact/org.mongodb/mongodb-driver-legacy -->
>            <dependency>
>                <groupId>org.mongodb</groupId>
>                <artifactId>mongodb-driver-legacy</artifactId>
>                <version>4.2.0-beta1</version>
>            </dependency>
>      </dependencies>
>       ```
>   2. 项目中有使用到 `lombok` 故需要引入 `lombok` 的 `jar` 包依赖,同时需要在开发工具中增加 `lombok` 的插件
>       ```xml
>      <dependencies>
>           <!-- https://mvnrepository.com/artifact/org.projectlombok/lombok -->
>           <dependency>
>               <groupId>org.projectlombok</groupId>
>               <artifactId>lombok</artifactId>
>               <version>1.18.16</version>
>           </dependency>
>      </dependencies>
>       ```
>   3. 项目中的因没有依赖其他 `jar` 包和父依赖,同时项目中可能用到日志的有关 `lombok` 注解,所以需要引入有关日志的依赖 `jar` 包
>       ```xml
>       <dependencies>
>               
>           <!-- 使用 @Slf4j 注解时使用此 log jar包   https://mvnrepository.com/artifact/ch.qos.logback/logback-classic -->
>           <dependency>
>               <groupId>ch.qos.logback</groupId>
>               <artifactId>logback-classic</artifactId>
>               <version>1.3.0-alpha5</version>
>           </dependency>
>           <!--使用 @Log4j2 注解时使用此 log jar 包  https://mvnrepository.com/artifact/org.apache.logging.log4j/log4j-core -->
>           <!--<dependency>
>               <groupId>org.apache.logging.log4j</groupId>
>               <artifactId>log4j-core</artifactId>
>               <version>2.14.0</version>
>           </dependency>-->
>       </dependencies>
>       ```
>  4. 涉及测试类中可能存在单元测试,同时需要引入单元测试 `jar` 包依赖
>       ```xml
>       <dependencies>
>           <!-- https://mvnrepository.com/artifact/org.junit.jupiter/junit-jupiter-api -->
>           <dependency>
>               <groupId>org.junit.jupiter</groupId>
>               <artifactId>junit-jupiter-api</artifactId>
>               <version>5.7.0</version>
>               <scope>test</scope> <!-- 当需要在正式代码中使用单元测试,则取消单元测试的作用域 -->
>           </dependency>
>       </dependencies>
>       ```
