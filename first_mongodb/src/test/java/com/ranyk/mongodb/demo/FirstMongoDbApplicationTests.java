package com.ranyk.mongodb.demo;

import com.mongodb.MongoClientSettings;
import com.mongodb.ServerAddress;
import com.mongodb.client.*;
import lombok.extern.slf4j.Slf4j;
import org.bson.Document;
import org.junit.jupiter.api.Test;

import java.util.Arrays;

@Slf4j
class FirstMongoDbApplicationTests {

    /**
     * MongoDB 连接单元测试
     */
    @Test
    void mongoDBTest() {
        //1. 获取连接客户端
        MongoClient mongoClient = MongoClients.create(
                MongoClientSettings.builder().applyToClusterSettings(builder -> builder.hosts(Arrays.asList(new ServerAddress("localhost", 27017)))).build()
        );
        //2. 获得操作的数据库
        MongoDatabase test = mongoClient.getDatabase("test");
        //3. 获得操作的集合
        MongoCollection<Document> user = test.getCollection("user");
        //4. 执行对集合的有关操作,如查询数据
        FindIterable<Document> documents = user.find();
        //5. 对查询结果进行处理
        for (Document document : documents) {
            log.error(document.toJson());
        }
        //6. 关闭连接,释放资源
        mongoClient.close();

    }

}
