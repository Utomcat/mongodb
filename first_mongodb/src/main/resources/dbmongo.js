//Mongodb ??

//???????????
//show dbs
//???????
//use test
//??????????????
//show tables
//??????????????
//show collections

//????
// 1. ? inventory ?????????
db.inventory.insertMany([
    { _id:"1", item: "journal", qty: 25, size: { h: 14, w: 21, uom: "cm" }, status: "A" },
    { _id:"2", item: "notebook", qty: 50, size: { h: 8.5, w: 11, uom: "in" }, status: "A" },
    { _id:"3", item: "paper", qty: 100, size: { h: 8.5, w: 11, uom: "in" }, status: "D" },
    { _id:"4", item: "planner", qty: 75, size: { h: 22.85, w: 30, uom: "cm" }, status: "D" },
    { _id:"5", item: "postcard", qty: 45, size: { h: 10, w: 15.25, uom: "cm" }, status: "A" }
]);
// 2. ? inventory ?????????
db.inventory.insertOne(
    {_id:"6",item: "paper towel", qty: 45, size: { h: 10, w: 15.25, uom: "cm" }, status: "B"}
);
// 3. ? inventory ??????????????????,
db.inventory.updateOne(
    {_id:"7"},
    {$set:{item: "pen", qty: 45, size: { h: 10, w: 15.25, uom: "cm" }, status: "C"}},
    {upsert:true}
);
db.inventory.updateMany(
    {_id:"8"},
    {$set:{item: "pen", qty: 45, size: { h: 10, w: 15.25, uom: "cm" }, status: "C"}},
    {upsert:true}
);
db.inventory.replaceOne(
    {_id:"10"},
    {item: "pen", qty: 45, size: { h: 10, w: 15.25, uom: "cm" }, status: "C"},
    {upsert:true}
);
// update ???????
db.inventory.update(
    {_id:"9"},
    {$set:{item: "pen", qty: 45, size: { h: 10, w: 15.25, uom: "cm" }, status: "C"}},
    {upsert:true}
);

//????
//?????????
db.inventory.insertMany([
    { _id:"1", item: "journal", qty: 25, size: { h: 14, w: 21, uom: "cm" }, status: "A" },
    { _id:"2", item: "notebook", qty: 50, size: { h: 8.5, w: 11, uom: "in" }, status: "A" },
    { _id:"3", item: "paper", qty: 100, size: { h: 8.5, w: 11, uom: "in" }, status: "D" },
    { _id:"4", item: "planner", qty: 75, size: { h: 22.85, w: 30, uom: "cm" }, status: "D" },
    { _id:"5", item: "postcard", qty: 45, size: { h: 10, w: 15.25, uom: "cm" }, status: "A" }
]);
// 1. ?? inventory ??
db.inventory.drop();
// 2. ?? inventory ?????? documents
db.inventory.deleteMany({});
// 3. ?? inventory ?????????? documents
db.inventory.deleteMany({status:"A"});
// 4. ?? inventory ??????????? document: ??????????????????????document;??????,????????????document;
db.inventory.deleteOne({status:"D"});
db.inventory.deleteOne({});
// 5. ?? inventory ?????????? documents,??? deleteMany() ,???????
db.inventory.remove({status:"D"});


//????
//?????????
db.inventory.insertMany( [
    { _id:"1", item: "canvas", qty: 100, size: { h: 28, w: 35.5, uom: "cm" }, status: "A" },
    { _id:"2", item: "journal", qty: 25, size: { h: 14, w: 21, uom: "cm" }, status: "A" },
    { _id:"3", item: "mat", qty: 85, size: { h: 27.9, w: 35.5, uom: "cm" }, status: "A" },
    { _id:"4", item: "mousepad", qty: 25, size: { h: 19, w: 22.85, uom: "cm" }, status: "P" },
    { _id:"5", item: "notebook", qty: 50, size: { h: 8.5, w: 11, uom: "in" }, status: "P" },
    { _id:"6", item: "paper", qty: 100, size: { h: 8.5, w: 11, uom: "in" }, status: "D" },
    { _id:"7", item: "planner", qty: 75, size: { h: 22.85, w: 30, uom: "cm" }, status: "D" },
    { _id:"8", item: "postcard", qty: 45, size: { h: 10, w: 15.25, uom: "cm" }, status: "A" },
    { _id:"9", item: "sketchbook", qty: 80, size: { h: 14, w: 21, uom: "cm" }, status: "A" },
    { _id:"10", item: "sketch pad", qty: 95, size: { h: 22.85, w: 30.5, uom: "cm" }, status: "A" }
] );
// 1. ??????????? document
db.inventory.updateOne(
    {item:"paper"},
    {
        $set:{"size.uom":"cm",status:"P"}, // ?????document??????
        $currentDate:{lastModified:true,createModified:true} // ????????????
    }
);
// 2. ?????????? documents
db.inventory.updateMany(
    {"qty":{$lt:50}},
    {
        $set:{"size.uom":"in",status:"P"},
        $currentDate:{lastModified:true}
    }
);
// 3. ??????? document,??????????????,?????,??????????????,?????????????????????,
// ??????????????;???? item ????: paper ? document ??????? qyt?size?status???,?? replace ???,
// ????????????
db.inventory.replaceOne(
    {item:"paper"},
    {item:"paper",instock:[{warehouse:"A",qty:60},{warehouse:"8",qty:40}]}
);
// 4. ?????????? document
db.inventory.update(
    {item:"paper"},
    {$set:{qty:100,size:{h:8.5,w:11,uom:"in"},status:"D"}}
);

//?????????
// ??????????????
db.students.insertMany([
    { _id: 1, test1: 95, test2: 92, test3: 90, modified: new Date("2020-05-01") },
    { _id: 2, test1: 98, test2: 100, test3: 102, modified: new Date("2020-05-01") },
    { _id: 3, test1: 95, test2: 110, modified: new Date("2020-04-01") }
]);
db.students2.insertMany([
    { "_id" : 1, quiz1: 8, test2: 100, quiz2: 9, modified: new Date("2020-05-01") },
    { "_id" : 2, quiz2: 5, test1: 80, test2: 89, modified: new Date("2020-05-01") },
]);
db.students3.insert([
    { "_id" : 1, "tests" : [ 95, 92, 90 ], "modified" : ISODate("2019-01-01T00:00:00Z") },
    { "_id" : 2, "tests" : [ 94, 88, 90 ], "modified" : ISODate("2019-01-01T00:00:00Z") },
    { "_id" : 3, "tests" : [ 70, 75, 82 ], "modified" : ISODate("2019-01-01T00:00:00Z") }
]);
db.students4.insertMany([
    { "_id" : 1, "quizzes" : [ 4, 6, 7 ] },
    { "_id" : 2, "quizzes" : [ 5 ] },
    { "_id" : 3, "quizzes" : [ 10, 10, 10 ] }
]);
db.temperatures.insertMany([
    { "_id" : 1, "date" : ISODate("2019-06-23"), "tempsC" : [ 4, 12, 17 ] },
    { "_id" : 2, "date" : ISODate("2019-07-07"), "tempsC" : [ 14, 24, 11 ] },
    { "_id" : 3, "date" : ISODate("2019-10-30"), "tempsC" : [ 18, 6, 8 ] }
]);
//????
db.students.find().pretty();
db.students2.find().pretty();
db.students3.find().pretty();
db.students4.find().pretty();
db.temperatures.find().pretty();
// 1. ?????? $set ??
db.students.updateOne(
    {_id:3},
    [{$set:{test3:100,modified:"$$NOW"}}]
);
// 2. ?????? $set ?? modified ???, $mergeObjects ? $replaceRoot ????????????
db.students2.updateMany(
    {},
    [
        {$replaceRoot:{newRoot:{$mergeObjects:[{quiz1:0,quiz2:0,test1:0,test2:0},"$$ROOT"]}}},
        {$set:{modified:"$$NOW"}}
    ]
);
// 3. ?????? ?????,???????????????
db.students3.updateMany(
    {},
    [
        {$set:{
                grade:{
                    $switch:{
                        branches:[
                            {case:{$gte:["$average",90]},then:"A"},
                            {case:{$gte:["$average",80]},then:"B"},
                            {case:{$gte:["$average",70]},then:"C"},
                            {case:{$gte:["$average",60]},then:"D"}
                        ],
                        default:"F"
                    }
                }
            }
        },
        {$set:{average:{$trunc:[{$avg:"$tests"},0]},modified:"$$NOW"}}
    ]
);
// 4. ?????? ????????????
db.students4.updateOne(
    {_id:2},
    [{$set:{quizzes:{$concatArrays:["$quizzes",[8,6]]}}}]
);
//5. ???????????????? X 1.5 + 32 ??
db.temperatures.updateMany(
    {},
    [
        {$addFields:{
                "tempsF":{
                    $map:{
                        input:"$tempsC",
                        as:"celsius",
                        in:{$add:[{$multiply:["$$celsius",9/5]},32]}
                    }
                }
            }
        }
    ]
);

//????
// 1. ?? inventory ?????? documents
db.inventory.find();