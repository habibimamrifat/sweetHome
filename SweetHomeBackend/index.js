import express, { json, response } from "express";
const app = express();
const port = process.env.Port || 5000;
import cors from "cors";
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";

// for file reading
import fs from "fs";

// middleWare
app.use(cors());
app.use(express.json());

//fake data ....................

const allCakeDataFake =[
  {
    "shop_id": "shop123",
    "shop_owner_id": "owner456",
    "cake_id": "cake789",
    "price": 25.99,
    "cake_Name": "Chocolate Cake",
    "cake_pic": "https://st4.depositphotos.com/10614052/25239/i/450/depositphotos_252391082-stock-photo-sweet-chocolate-cake-on-wooden.jpg",
    "cakeDetail": "Delicious and moist chocolate cake with rich chocolate ganache.",
    "deliveryWithin": "1.5 hours",
    "ratings": 4.8
  },
  {
    "shop_id": "shop124",
    "shop_owner_id": "owner457",
    "cake_id": "cake790",
    "price": 30.99,
    "cake_Name": "Vanilla Cake",
    "cake_pic": "https://www.fnp.com/images/pr/l/v20221205202048/black-forest-cake-half-kg_1.jpg",
    "cakeDetail": "Classic vanilla cake with creamy vanilla buttercream.",
    "deliveryWithin": "2 hours",
    "ratings": 4.6
  },
  {
    "shop_id": "shop125",
    "shop_owner_id": "owner458",
    "cake_id": "cake791",
    "price": 28.99,
    "cake_Name": "Red Velvet Cake",
    "cake_pic": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw8_T3omRjWs38MXCleGxN1BeNHmZLBBFI-Q&s",
    "cakeDetail": "Soft and moist red velvet cake with cream cheese frosting.",
    "deliveryWithin": "3 hours",
    "ratings": 4.7
  },
  {
    "shop_id": "shop126",
    "shop_owner_id": "owner459",
    "cake_id": "cake792",
    "price": 32.99,
    "cake_Name": "Cheesecake",
    "cake_pic": "https://sugarspunrun.com/wp-content/uploads/2022/03/Carrot-Cake-Cheesecake-1-of-7.jpg",
    "cakeDetail": "Creamy cheesecake with a graham cracker crust.",
    "deliveryWithin": "4 hours",
    "ratings": 4.9
  },
  {
    "shop_id": "shop127",
    "shop_owner_id": "owner460",
    "cake_id": "cake793",
    "price": 27.99,
    "cake_Name": "Carrot Cake",
    "cake_pic": "https://static01.nyt.com/images/2020/11/01/dining/Carrot-Cake-textless/Carrot-Cake-textless-threeByTwoMediumAt2X.jpg",
    "cakeDetail": "Moist carrot cake with cream cheese frosting and a hint of cinnamon.",
    "deliveryWithin": "2.5 hours",
    "ratings": 4.7
  }
]

const allShopCollectionFake = [
  {
    "shop_id": "shop123",
    "shop_owner_id": "owner456",
    "shop_name": "Sweet Delights Bakery",
    "shop_address": "123 Cake Street, Bakersville, CA 94016",
    "shop_contact": "+1-234-567-8901",
    "shop_email": "contact@sweetdelights.com",
    "shop_description": "A family-owned bakery offering a wide variety of delicious cakes and pastries made from the finest ingredients.",
    "shop_rating": 4.8,
    "shop_banner": "https://picsum.photos/id/1011/800/300",
    "shop_logo": "https://picsum.photos/id/1011/200/200"
  },
  {
    "shop_id": "shop124",
    "shop_owner_id": "owner457",
    "shop_name": "Heavenly Cakes",
    "shop_address": "456 Dessert Lane, Sweet City, TX 75001",
    "shop_contact": "+1-345-678-9012",
    "shop_email": "info@heavenlycakes.com",
    "shop_description": "Heavenly Cakes specializes in creating beautiful and delicious custom cakes for all occasions.",
    "shop_rating": 4.7,
    "shop_banner": "https://picsum.photos/id/1012/800/300",
    "shop_logo": "https://picsum.photos/id/1012/200/200"
  },
  {
    "shop_id": "shop125",
    "shop_owner_id": "owner458",
    "shop_name": "Cake Emporium",
    "shop_address": "789 Frosting Avenue, Cupcake Town, FL 33101",
    "shop_contact": "+1-456-789-0123",
    "shop_email": "order@cakeemporium.com",
    "shop_description": "At Cake Emporium, we offer a wide range of cakes, from classic flavors to innovative creations.",
    "shop_rating": 4.6,
    "shop_banner": "https://picsum.photos/id/1013/800/300",
    "shop_logo": "https://picsum.photos/id/1013/200/200"
  },
  {
    "shop_id": "shop126",
    "shop_owner_id": "owner459",
    "shop_name": "The Cake Factory",
    "shop_address": "101 Cupcake Boulevard, Frost City, NY 10001",
    "shop_contact": "+1-567-890-1234",
    "shop_email": "support@thecakefactory.com",
    "shop_description": "The Cake Factory is known for its high-quality ingredients and a wide range of delicious cakes and desserts.",
    "shop_rating": 4.9,
    "shop_banner": "https://picsum.photos/id/1014/800/300",
    "shop_logo": "https://picsum.photos/id/1014/200/200"
  },
  {
    "shop_id": "shop127",
    "shop_owner_id": "owner460",
    "shop_name": "Gourmet Bakes",
    "shop_address": "202 Confectionery Drive, Baker City, IL 60601",
    "shop_contact": "+1-678-901-2345",
    "shop_email": "contact@gourmetbakes.com",
    "shop_description": "Gourmet Bakes offers a wide selection of gourmet cakes and desserts that are perfect for any occasion.",
    "shop_rating": 4.7,
    "shop_banner": "https://picsum.photos/id/1015/800/300",
    "shop_logo": "https://picsum.photos/id/1015/200/200"
  }
]

//fake data ....................



//*************************************************** */

const uri =
  "mongodb+srv://habibrifatx21:ioyWWVgEzeH8GfNc@sweethome.gfjhoj6.mongodb.net/?retryWrites=true&w=majority&appName=SweetHome";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});



const dataInjection = async (collectionName) => {
  try {
    const injectCakeData = JSON.parse(
      fs.readFileSync("./Data/OrderData.json", "utf8")
    );

    const result = await collectionName.insertMany(injectCakeData);
    console.log("this is the result", result);
  } catch (error) {
    console.log("functional error", error);
  }
};



async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    const SweetHomeDB = client.db("SweetHome");

    // all the collection of the data base down

    const allCakeCollection = SweetHomeDB.collection("allCakeCollection");
    const allCustomerCollection = SweetHomeDB.collection("allCustomerCollection");
    const allBakerCollection = SweetHomeDB.collection("allBakerCollection");
    const allShopCollection = SweetHomeDB.collection("allShopCollection")
    const allOrderCollection=SweetHomeDB.collection("allOrderCollection")

    // all the collection of the data base up

    // await dataInjection(allOrderCollection)



    // all cake collection for market place down
    app.get("/", async (req, res) => {
      const result = await allCakeCollection.find().toArray();
      res.send(result);
    });
    // all cake collection for market place up

    // all shop collection for market place down
    app.get("/allShopCollection", async (req, res) => {
      const result = await allShopCollection.find().toArray();
      res.send(result);
    });
    // all shop collection for market place up



    //all customer related apis are here down............
    // create a customer 
    app.post("/signUpPage/customerSignUp", async(req,res)=>{
      const customer=req.body
      const result = await allCustomerCollection.insertOne(customer)
      res.send(result)
    })

    //login A customer
    app.get("/customerSignIn/:email/:password", async (req,res)=>{
      const {email,password}= req.params;
      try {
        const result = await allCustomerCollection.findOne({
            email: email,
            password: password
        });
        
        console.log(result);

        if (result) {
           res.send(result)
        } else {
            // Log and respond if no user is found
            console.log("User not found");
            res.send({ message: "User not found" });
        }
    } catch (error) {
        console.error("Error occurred:", error);
        res.send({ message: "Internal server error", error });
    }
    })
    //all customer related apis are here up..............


    // all baker related apis are here down............

    // create a bacer****
    app.post("/signUpPage/bakerSignUp", async(req,res)=>{
      const baker =req.body
      const result = await allBakerCollection.insertOne(baker)
      res.send(result)
    })

    //create a shop***
    app.post("/signUpPage/bakerSignUp/createShop",async(req,res)=>{
        const shop = req.body
        const result = await allShopCollection.insertOne(shop)
        res.send(result)
    })

    //log in a baker
    app.get("/bakerSignIn/:email/:password",async (req,res)=>{
      const {email , password}=req.params
      console.log("server", email,password)
      try {
        const result = await allBakerCollection.findOne({
            email: email,
            password: password
        });
        
        console.log(result);

        if (result) {
          
          const ownerId = result._id.toString()
          const findShopId = await allShopCollection.findOne({shopOwnerId: ownerId})
          // console.log("foundShop",findShopId)

          const bakerDataWithShopId = {...result, shopId:findShopId._id}
          // console.log( "final output",bakerDataWithShopId)

           res.send(bakerDataWithShopId)
        } else {
            // Log and respond if no user is found
            console.log("User not found");
            res.send({ message: "User not found" });
        }
    } catch (error) {
        console.error("Error occurred:", error);
        res.send({ message: "Internal server error", error });
    }
    })

    //Gather Allcake of the Baker
    app.get("/bakerAllCakeCollection/:shopId",async(req,res)=>{
      const {shopId} = req.params
      // console.log("i am the shio pi",shopId)

      try{
        const result = await allCakeCollection.find({shop_id:shopId}).toArray()
      res.send(result)
      }
      catch(error)
      {
        console.log("error occared at cke fetching",error)
        res.send({message:"server error cake collection fetching", error})
      }
    })

    // add new cake from the baker
    app.post("/baker/addnewcake",async(req,res)=>{
      const cakeData = req.body
      // console.log(cakeData)
      try{
        const result = await allCakeCollection.insertOne(cakeData)
        res.send(result)  
      }catch(error)
      {
        res.send({message:"failed to insert in cake colletion",error})
      }
    })

    //Gather All Order of the Baker
    app.get("/bakerAllOrderCollection/:shopId",async(req,res)=>{
      const {shopId} = req.params
      // console.log("i am the shio pi",shopId)

      try{
        const result = await allOrderCollection.find({shop_id:shopId}).toArray()
      res.send(result)
      }
      catch(error)
      {
        console.log("error occared at cke fetching",error)
        res.send({message:"server error cake collection fetching", error})
      }
    })

    // find single order of the baker
    app.get("/bakerFindSingleOrder/:orderId",async(req,res)=>{
      const {orderId} = req.params
      // console.log("i am the shio pi",orderId)

      try{
        const result = await allOrderCollection.findOne({_id:new ObjectId(orderId)})

        console.log(result)
      res.send(result)
      }
      catch(error)
      {
        console.log("error occared at cke fetching",error)
        res.send({message:"server error cake collection fetching", error})
      }
    })

    // update order state
    app.put("/baker/updateOrderState/:orderId",async(req,res)=>{
        const {orderId} = req.params
        const newData = req.body
        console.log(orderId,newData)
  
        try{
          const request = await allOrderCollection.updateOne(
            {_id: new ObjectId(orderId)},
            {
              "$set":{
                "status":newData
              }
            },
            {upsert:true}
        )
        // console.log(request)
        res.send(request)
        }
        catch(error)
        {
          // console.log("somwthing went wrong to update orderState")
          res.send({message:"failed to update the state =>server",error})
        }
    })

    // all baker related apis are here up...........


  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// 66afc7bd3ca5334221ad5bbf
// 66afc7bd3ca5334221ad5bbf

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// ioyWWVgEzeH8GfNc
