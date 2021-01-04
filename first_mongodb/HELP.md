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

## 三、使用 `Java` 程序连接 `MongoDB` 数据库

### 1）、获取 `MongoDB` 的数据库连接

> 在 `API` 中提供使用 `MongoClient.create()` 和 `MongoClient()` 方法进行获取一个运行的 `MongoDB`
> 连接实例.
> `MongoClient` 实例代表与数据库的连接池；即使有多个线程，您也只需要一个 `MongoClient` 类的实例。

<font size="5px" color="red">注意:</font>
> 通常情况下,你只需要给指定的 `MongoDB` 部署(如: 独立、副本集和分片集群)创建一个 `MongoClient` 实例,
> 同时在你的整个应用中使用.但是如果你需要创建多个实例:
>   1. 所有的资源限制(如: 最大连接数等),适用于每个 `MongoClient` 实例
>   2. 如果需要释放实例,使用方法 `MongoClient.close()` 释放资源

### 2）、连接单个 `MongoDB` 实例

#### Ⅰ、在新版本的 `MongoClient` API (since `3.7` )

##### (1)、通过实例化一个 `MongoClient` 对象去连接主机名为 `localhost` 端口为 `27017` 上的 `MongoDB`

- `MongoClient mongoClient = MongoClients.create();`

##### (2)、连接一个指定主机名为指定的主机名,端口为 `27017` 上的 `MongoDB`

```java
public class A {
    MongoClient mongoClient = MongoClients.create(
            MongoClientSettings.builder()
                    .applyToClusterSettings(builder ->
                            builder.hosts(Arrays.asList(new ServerAddress("hostOne"))))
                    .build()
    );
}
```

##### (3)、连接一个指定主机名和主机端口的 `MongoDB`

```java

import com.mongodb.MongoClient;
import com.mongodb.MongoClientSettings;

public class A {
    MongoClient mongoClient = MongoClients.create(
            MongoClientSettings.builder()
                    .applyToClusterSettings(builder -> 
                            builder.hosts(Arrays.asList(new ServerAddress("hostOne", 27017))))
                    .build());
}
```

##### (4)、连接一个指定连接字符串的 `MongoDB`

```java
import com.mongodb.MongoClient;
import com.mongodb.client.MongoClients;

public class A {
    MongoClient mongoClient = MongoClients.create("mongodb://hostOne:27017");
}
```

#### Ⅱ、在旧版本的 `MongoClient` API

##### (1)、通过实例化一个 `MongoClient` 对象去连接主机名为 `localhost` 端口为 `27017` 上的 `MongoDB`

```java
import com.mongodb.MongoClient;

public class A {
    MongoClient mongoClient = new MongoClient();
}
```

##### (2)、连接一个指定主机名为指定的主机名,端口为 `27017` 上的 `MongoDB`

```java
import com.mongodb.MongoClient;

public class A {
    MongoClient mongoClient = new MongoClient("hostOne");
}
```

##### (3)、连接一个指定主机名和主机端口的 `MongoDB`

```java
import com.mongodb.MongoClient;

public class A {
    MongoClient mongoClient = new MongoClient("hostOne",27017);
}
```

##### (4)、连接一个指定连接字符串的 `MongoDB`

```java
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;

public class A {
    MongoClientURI connectionStr = new MongoClientURI("mongodb://hostOne:27017,hostTwo:27017");
    MongoClient mongoClient = new MongoClient(connectionStr);
}
```

### 3）、访问数据库

>   在通过 `MongoClient` 实例连接到部署的 `MongoDB` ,使用 `MongoClient.getDatabase()` 方法去访问数据库.
> 通过指定访问的数据库名传给方法 `getDatabase()` 作为参数.如果数据库不存在,那么在你第一次向该数据库存放数据的时候 `MongoDB` 将会创建这个数据库.

```java
import com.mongodb.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;

public class A {

    MongoClient mongoClient = MongoClients.create("mongodb://hostOne:27017");
    MongoDatabase database = mongoClient.getDatabase("myDb");
}
```

### 4）、访问一个集合

>   当你有一个 `MongoDatabase` 实例时,可以通过方法 `getCollection()` 来访问数据库集合.通过传入方法 `getColletion()` 参数来指定访问的集合名称.
> 如果集合不存在的话,在第一次向该集合中存放数据时, `MongoDB` 将创建该集合.

```java
import com.mongodb.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import org.bson.Document;
public class A {
    MongoClient mongoClient = MongoClients.create();
    MongoDatabase mongoDatabase = mongoClient.getDatabase("myDb");
    MongoCollection<Document> collection = mongoDatabase.getCollection("test");
}
```

### 5）、创建一个 `Document` 对象

>   创建一个 `document` 使用 `org.bson.Document` 类
> 一个 `Document` 对象遵循一个 `JSON` 格式,实例化一个 `Document` 对象使用构造方法,传入字段名和字段值的方式,通过调用方法 `append()` 追加其他的字段名和字段值

- 示例: 如下格式的一个 `Document` 对象,创建的一个 `Document` 对象如下
```json5
{
  "name" : "MongoDB",
  "type" : "database",
  "count" : 1,
  "versions": [ "v3.2", "v3.0", "v2.6" ],
  "info" : { x : 203, y : 102 }
}
```

```java
import org.bson.Document;

import java.util.Arrays;

public class A {
    Document document = new Document("name", "MongoDB")
            .append("type", "database")
            .append("count", 1)
            .append("versions", Arrays.asList("v3.2","v3.0","v2.6"))
            .append("info",new Document("x",203).append("y",102));
}
```
>   `BSON` 类型的数组对应着 `JAVA` 的 `java.util.List` 类型,更多的 `BSON` 和 `JAVA` 类型对应关系,参见  [Document](https://mongodb.github.io/mongo-java-driver/4.2/bson/documents/#document)

### 6）、新增 `Document` 

#### Ⅰ、 增加一个 `Document` 

>   使用 `insertOne()` 方法

```java
import com.mongodb.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

public class A {
    MongoClient mongoClient = MongoClients.create();
    MongoDatabase database = mongoClient.getDatabase("myDb");
    MongoCollection<Document> collection = database.getCollection("test");
    Document document =  new Document("name", "MongoDB")
            .append("type", "database")
            .append("count", 1)
            .append("versions", Arrays.asList("v3.2","v3.0","v2.6"))
            .append("info",new Document("x",203).append("y",102));
    InsertOneResult sum = collection.insertOne(document);
}
```

#### Ⅱ、增加多个 `Document` 

>   将需要新增的多个 `Document` 放进一个 `List` 中,然后调用 `insertMany()` 方法,将需要新增的 `List<Document>` 作为参数传入

```java
import com.mongodb.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.result.InsertManyResult;
import lombok.extern.slf4j.Slf4j;
import org.bson.Document;

import java.util.ArrayList;
import java.util.List;

@Slf4j
public class A {
    MongoClient client = MongoClients.create();
    MongoDatabase database = client.getDatabase("myDb");
    MongoCollection<Document> collection = database.getCollection("test");
    List<Document> documents = new ArrayList<>(16);

    public void insertMany() {
        for (int i = 0; i < 100; i++) {
            documents.add(new Document("i", i));
        }
        InsertManyResult result = collection.insertMany(documents);
        log.error(result.toString());
    }
}
```

> <font size="5px" color="red">注意: </font>
> - 对于没有指定 `_id` 字段的 `document` 对象,在新增的时候会自动增加一个 `ObjectId` 数据类型的 `_id` 字段.如果指定了,则使用指定的字段值.

### 7）、统计一个 `Collection` 中的 `Document` 数量

> 统计一个集合的 `Document` 数量使用, `collection` 的 `countDocuments()` 方法.

```java
import org.bson.Document;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class A {
    MongoClient client = MongoClients.create();
    MongoDatabase database = client.getDatabase("myDb");
    MongoCollection<Document> collection = database.getCollection("test");

    public void countDocument() {
        log.error(collection.countDocuments());
    }
}
```

### 8）、集合的查询

>   查询集合,可以使用集合的 `find()` 方法.你可以调用这个方法,不使用条件的查询这个集合的所有 `documents`,或者使用条件去查询满足这个条件的 `documents`

#### Ⅰ、查询一个集合的第一个 `document` 

>   使用集合的不带任何参数的 `find()` 方法后调用 `first()` 方法,将返回这个集合的第一个 `document` 
> 如果这个集合是一个空集合,那么这个操作将返回 `null`.

```java
import com.mongodb.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import lombok.extern.slf4j.Slf4j;
import org.bson.Document;

@Slf4j
public class A {
    MongoClient client = MongoClients.create();
    MongoDatabase database = client.getDatabase("myDb");
    MongoCollection<Document> collection = database.getCollection("test");

    public void queryFirst() {
        Document document = collection.find().first();
        log.error(document.toJson());
    }
}
```

#### Ⅱ、查询一个集合的所有 `documents`

>   使用一个集合的无参的 `find()` 方法去查询这个集合的所有的 `documents` 
> 然后使用 `find()` 的链式方法 `iterator()` 去遍历结果.

- 遍历一个集合的所有 `collection` ,方式一(`while`/`fori`)
```java
import com.mongodb.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import lombok.extern.slf4j.Slf4j;
import org.bson.Document;

@Slf4j
public class A {
    MongoClient client = MongoClients.create();
    MongoDatabase database = client.getDatabase("myDb");
    MongoCollection<Document> collection = database.getCollection("test");

    public void queryAllDocument() {
        MongoCursor<Document> cursor = collection.find().iterator();
        while (cursor.hasNext()){
            log.error(cursor.next().toJson());
        }
        cursor.close();
    }
}
```

- 遍历一个集合的所有 `collection` ,方式二(foreach)
```java
import com.mongodb.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import lombok.extern.slf4j.Slf4j;
import org.bson.Document;

@Slf4j
public class A {
    MongoClient client = MongoClients.create();
    MongoDatabase database = client.getDatabase("myDb");
    MongoCollection<Document> collection = database.getCollection("test");

    public void queryAllDocument() {
        for (Document cur : collection.find()) {
            log.error(cur.toJson());
        }
    }
}
```

#### Ⅲ、指定一个查询条件过滤对象的集合查询

>   要查询符合特定条件的 `document` ,请将过滤器对象( `filter` )传递给 `find()` 方法。
> 为了方便创建过滤器对象,Java驱动程序提供了 [`Filters`](https://mongodb.github.io/mongo-java-driver/4.2/apidocs/mongodb-driver-core/com/mongodb/client/model/Filters.html) 助手。

##### (1)、查询匹配过滤器的单个 `document` 

>   通过向集合的 `find()` 方法中传递一个 `filter` 对象,然后只取返回的第一个结果.

- 示例,查询集合中字段 `i` 的值是 `71` 的第一个 `document` ,通过 `eq()` 过滤器对象指定相关的 `eq` 条件:

```java
import com.mongodb.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import lombok.extern.slf4j.Slf4j;

import static com.mongodb.client.model.Filters.*;

import org.bson.Document;

@Slf4j
public class A {
    MongoClient client = MongoClients.create();
    MongoDatabase database = client.getDatabase("myDb");
    MongoCollection<Document> collection = database.getCollection("test");

    public void queryFirstByFilter() {
        Document document = collection.find(eq("i", 71)).first();
        log.error(document.toJson());
    }
}
```

##### (2)、查询匹配过滤器的所有 `document` 

- 示例: 查询集合中字段 `i` 的值大于 `50` 的所有 `documents`

```java
import com.mongodb.*;
import com.mongodb.MongoClient;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import lombok.extern.slf4j.Slf4j;

import static com.mongodb.client.model.Filters.*;

import org.bson.Document;

@Slf4j
public class A {
    MongoClient client = MongoClients.create();
    MongoDatabase database = client.getDatabase("myDb");
    MongoCollection<Document> collection = database.getCollection("test");

    public void queryFirstByFilter() {

        Block<Document> block = new Block<>() {
            /**
             * Apply some logic to the value.
             *
             * @param document the value to apply to
             */
            @Override
            public void apply(Document document) {
                log.error(document.toJson());
            }
        };
        collection.find(gt("i", 50)).forEach(block);
    }
}
```

- 示例: 查询指定 `filter` 的表达式 `50 < i <= 100` ,可以使用 `and` 
```java
import com.mongodb.*;
import com.mongodb.MongoClient;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import lombok.extern.slf4j.Slf4j;

import static com.mongodb.client.model.Filters.*;

import org.bson.Document;

@Slf4j
public class A {
    MongoClient client = MongoClients.create();
    MongoDatabase database = client.getDatabase("myDb");
    MongoCollection<Document> collection = database.getCollection("test");

    public void queryFirstByFilter() {

        Block<Document> block = new Block<>() {
            /**
             * Apply some logic to the value.
             *
             * @param document the value to apply to
             */
            @Override
            public void apply(Document document) {
                log.error(document.toJson());
            }
        };
        collection.find(and(gt("i", 50),lte("i",100))).forEach(block);
    }
}
```

### 9）、更新 `Document` 

>   使用 `updateOne()` 和 `updateMany()` 方法,去更新集合中的 `documents` 
> 通过这个方法: 
>   - 确定要更新的一个或多个文档的筛选器对象.为了方便创建过滤器对象,Java驱动程序提供了 [`Filters`](https://mongodb.github.io/mongo-java-driver/4.2/apidocs/mongodb-driver-core/com/mongodb/client/model/Filters.html) 助手.要指定空筛选器（即匹配集合中的所有文档）,请使用空文档对象.
>   - 指定修改的更新文档.有关可用运算符的列表,请参见更新运算符. 
> 
>   这个方法返回一个包含本次更新操作的修改的 `documents` 数量的 `UpdateResult` 对象.

#### Ⅰ、更新一个 `Document` 

>   更新一个 `document` 对象时用 `updateOne()` 方法

```java
import com.mongodb.*;
import com.mongodb.MongoClient;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.result.UpdateResult;
import lombok.extern.slf4j.Slf4j;

import static com.mongodb.client.model.Filters.*;
import static com.mongodb.client.model.Updates.*;

import org.bson.Document;

@Slf4j
public class A {
    MongoClient client = MongoClients.create();
    MongoDatabase database = client.getDatabase("myDb");
    MongoCollection<Document> collection = database.getCollection("test");

    public void updateOne() {
        UpdateResult updateResult = collection.updateOne(eq("i", 10), set("i", 110));
        log.error(updateResult.getModifiedCount());
    }
}
```

#### Ⅱ、更新多个 `Documents` 

>   更新多个 `document` 对象时用 `updateMany()` 方法
```java
import com.mongodb.*;
import com.mongodb.MongoClient;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.result.UpdateResult;
import lombok.extern.slf4j.Slf4j;

import static com.mongodb.client.model.Filters.*;
import static com.mongodb.client.model.Updates.*;

import org.bson.Document;

@Slf4j
public class A {
    MongoClient client = MongoClients.create();
    MongoDatabase database = client.getDatabase("myDb");
    MongoCollection<Document> collection = database.getCollection("test");

    public void updateMany() {
        UpdateResult updateResult = collection.updateOne(lt("i", 100), inc("i", 100));
        log.error(updateResult.getModifiedCount());
    }
}
```

### 10）、删除 `Document` 

>   从一个集合中删除一个 `document` ,使用集合的 `deleteOne()` and `deleteMany()` 方法
> 通过向方法中传入一个 `filter` 对象去确定需要删除的 `document` 或 `documents` .为了方便创建 `filter` 对象, Java 驱动程序提供了 [`Filters`](https://mongodb.github.io/mongo-java-driver/4.2/apidocs/mongodb-driver-core/com/mongodb/client/model/Filters.html) 助手.要指定空筛选器（即匹配集合中的所有文档）,请使用空文档对象.
> 这个方法返回一个 `DeleteResult` 对象,该对象提供了删除操作删除的数据数量信息

#### Ⅰ、通过匹配 `Filter` 删除一个 `document`

>   最多删除一个 `document` ,使用 `deleteOne()` 方法

```java
import com.mongodb.*;
import com.mongodb.MongoClient;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;
import lombok.extern.slf4j.Slf4j;

import static com.mongodb.client.model.Filters.*;
import static com.mongodb.client.model.Updates.*;

import org.bson.Document;

@Slf4j
public class A {
    MongoClient client = MongoClients.create();
    MongoDatabase database = client.getDatabase("myDb");
    MongoCollection<Document> collection = database.getCollection("test");

    public void deleteOne() {
        DeleteResult result = collection.deleteOne(eq("i", 110));
        log.error(result.getDeletedCount());
    }
}
```

#### Ⅱ、删除所有通过 `Filter` 匹配到的 `documents` 

>   删除所有匹配到的 `documents` ,使用 `deleteMany()` 方法

```java
import com.mongodb.*;
import com.mongodb.MongoClient;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;
import lombok.extern.slf4j.Slf4j;

import static com.mongodb.client.model.Filters.*;
import static com.mongodb.client.model.Updates.*;

import org.bson.Document;

@Slf4j
public class A {
    MongoClient client = MongoClients.create();
    MongoDatabase database = client.getDatabase("myDb");
    MongoCollection<Document> collection = database.getCollection("test");

    public void deleteMany() {
        DeleteResult result = collection.deleteMany(gte("i", 100));
        log.error(result.getDeletedCount());
    }
}
```

### 11）、创建索引

>   要在一个或多个字段上创建索引,则需要将索引所规范的 `document` 对象传递给 `createIndex()` 方法.
> 索引规范的 `document` 对象包含索引的字段和该字段的索引类型. `document` 示例: 
>  `new Document(<field1>,<type1>).append(<field2>,<type2>)` 
>   - 对于一个升序的索引类型,需要指定 <type> 为 `1`
>   - 对于一个降序的索引类型,需要指定 <type> 为 `-1`

```java
import com.mongodb.*;
import com.mongodb.MongoClient;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;
import lombok.extern.slf4j.Slf4j;

import static com.mongodb.client.model.Filters.*;
import static com.mongodb.client.model.Updates.*;

import org.bson.Document;

@Slf4j
public class A {
    MongoClient client = MongoClients.create();
    MongoDatabase database = client.getDatabase("myDb");
    MongoCollection<Document> collection = database.getCollection("test");

    public void deleteMany() {
        String index = collection.createIndex(new Document("i", 1));
        log.error(index);
    }
}
```

> 对于索引类型列表,参见 [Create Indexes](https://mongodb.github.io/mongo-java-driver/4.2/driver/tutorials/indexes/)

### 12）、附加信息

> 有关在 `Pojo` 中使用 `MongoDB` 的其他教程, 参见 [`Pojos Quick Start`](https://mongodb.github.io/mongo-java-driver/4.2/driver/getting-started/quick-start-pojo/) <br/>
> 对于其他教程(比如: 聚合框架、指定写入连接...等),参见 [`Java Driver Tutorials`](https://mongodb.github.io/mongo-java-driver/4.2/driver/tutorials/)