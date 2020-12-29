package com.ranyk.mongodb.demo.connection;

import com.mongodb.MongoClientSettings;
import com.mongodb.ServerAddress;
import com.mongodb.client.*;
import lombok.extern.slf4j.Slf4j;
import org.bson.Document;
import org.junit.jupiter.api.Test;

import java.util.Collections;

/**
 * ClassName:ManualConnectionDemoTest<br/>
 * Description:手动连接MongoDB
 *
 * @author ranyi
 * @date 2020-12-25 20:43
 * Version: V1.0
 */
@Slf4j
public class ManualConnectionDemoTest {

    /**
     * 手动连接 MongoDB 测试方法
     */
    @Test
    public void manualContest() {
        //1. 获取连接客户端
        MongoClient mongoClient = MongoClients.create(
                MongoClientSettings.builder().applyToClusterSettings(builder -> builder.hosts(Collections.singletonList(new ServerAddress("localhost", 27017)))).build()
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
        //6. 释放本次使用的连接资源
        mongoClient.close();
    }

    @Test
    void testMethod0() {
        log.error("单元测试....");
    }

}
