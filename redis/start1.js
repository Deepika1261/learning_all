const redis = require("redis");
const redisclient = redis.createClient();
  
(async () => {
    await redisclient.connect();
})();
redisclient.on("connect", function(err){
    console.log("connection established");
});

(async ()=>{
    let reply = await redisclient.set("car", "honda");
    console.log(reply)
})();




  
