const mongoose = require("mongoose");

const uri = "mongodb+srv://ShadowWizard:rFBiWdZ4jFRW6RMI@onlycars.rcvamax.mongodb.net/OnlyCars?retryWrites=true&w=majority";

const postSchema = new mongoose.Schema({
    postId: Number,
    author: Number,
    content: String,
    img: String,
    likes: Number,
    comments: Number,
    shares: Number,
});
const Post = mongoose.model("Post", postSchema);
const dbName = 'OnlyCars'

const posts = [
    {
        "postId": "00000001",
        "userId": "00000001",
        "carId": "00000001",
        "date": "15/01/2023",
        "description": "Unleashed the beast today! The legendary Nissan Skyline GT-R, an icon of speed and precision.Tag a friend who'd love to take a spin in this masterpiece! #Nissan #SkylineGTR #NeedForSpeed #Speedster #CarEnthusiast #AutomotiveArt #JDM #RacingBeast #LegendaryCars #TurboTuesday #FastandFurious #CarLove",
        "images": ["car02.jpg", "car02.jpg"],
        "likes": 8,
        "comments": 2
    },
    {
        "postId": "00000002",
        "userId": "00000002",
        "carId": "00000065",
        "date": "20/03/2023",
        "description": "My BMW M3 still runs like a dream even after 5 years. Truly a masterpiece!. If you're a fan of the ultimate driving experience, this beast should be on your bucket list. #BMW #M3 #UltimateDrivingMachine",
        "images": ["car05.jpg"],
        "likes": 7,
        "comments": 4
    },
    {
        "postId": "00000003",
        "userId": "00000003",
        "carId": "00000009",
        "date": "10/04/2023",
        "description": "Electric dreams brought to life Today, I had the pleasure of taking the Tesla Model S for a spin, and I'm in awe of the future, Who else is ready to go electric and join the sustainable journey? #Tesla #ModelS #ElectricRevolution",
        "images": ["car09.jpg", "car09.jpg", "car09.jpg"],
        "likes": 4,
        "comments": 3
    },
    {
        "postId": "00000004",
        "userId": "00000004",
        "carId": "00000012",
        "date": "25/05/2023",
        "description": "The Maserati GranTurismo this isn't just a car it's a work of art on wheels. Every curve and every detail is meticulously crafted, and the performance is exhilarating. It's a symphony of style and power.Who else has a soft spot for Italian automotive craftsmanship? #Maserati #GranTurismo #ItalianElegance",
        "images": ["car02.jpg", "car02.jpg"],
        "likes": 9,
        "comments": 6
    },
    {
        "postId": "00000005",
        "userId": "00000005",
        "carId": "00000005",
        "date": "12/06/2023",
        "description": "Took the Bugatti Chiron to the track today. The speed is just mind-blowing!Who else dreams of the day they can experience the Bugatti Chiron's extraordinary performance? #Bugatti #Chiron #Hypercar #EngineeringMasterpiece #NeedForSpeed #SupercarSunday #LuxuryLifestyle #SpeedDemon #DreamCar #FastLife #AutomotiveArt #SpeedAndLuxury",
        "images": ["car07.jpg", "car07.jpg", "car07.jpg", "car07.jpg"],
        "likes": 10,
        "comments": 7
    },
    {
        "postId": "00000006",
        "userId": "00000006",
        "carId": "00000018",
        "date": "05/07/2023",
        "description": "My GTI may not be a supercar, but it's super to me.#Volkswagen #GolfGTI #HotHatch #Turbocharged #CarEnthusiast #PerformanceCar #SportyRide #GolfMk7 #VWLove #VWFamily #GTILove #TurboTuesday #CarCulture #CompactCar #CarLifestyle #EverydayRacer #PowerAndStyle #CarGoals #GermanEngineering #FastAndFurious #PocketRocket #AutomotiveExcellence",
        "images": ["car08.jpg"],
        "likes": 3,
        "comments": 1
    },
    {
        "postId": "00000007",
        "userId": "00000007",
        "carId": "00000024",
        "date": "22/08/2023",
        "description": "The Toyota 86 is a joy to drive. Perfect for the streets of Canberra. It may not have the monstrous power of some supercars, but it's the kind of car that connects you to the road, making every twist and turn an adventure. Plus, it's affordable, making it an attainable dream for those who crave the thrill of the open road.Who else appreciates the purity of driving offered by the Toyota 86? #Toyota #86 #SportsCar #DrivingJoy #CarEnthusiast #OpenRoad #SportyRide #Agility #PerformanceCar #Toyota86 #PureDriving #RoadTrip #CarLove #Automotive #Speedster #CarCulture #WeekendDrive #DrivingAdventures #SportsCoupe #CarLifestyle #SpiritedDrive",
        "images": ["car04.jpg", "car04.jpg", "car04.jpg"],
        "likes": 6,
        "comments": 2
    },
    {
        "postId": "00000008",
        "userId": "00000008",
        "carId": "00000030",
        "date": "15/09/2023",
        "description": "Off-roading in my Ford Bronco is the perfect weekend activity.Who else feels the urge to explore new horizons with the Ford Bronco? ##FordBronco #OffroadAdventures #OutdoorExploration #BroncoLife #4x4OffRoading #WildRides #BuiltFordTough #ExploreTheWild #AdventureAwaits #OffTheBeatenPath #OffroadWarrior",
        "images": ["car10.jpg", "car10.jpg"],
        "likes": 6,
        "comments": 4
    },
    {
        "postId": "00000009",
        "userId": "00000009",
        "carId": "00000064",
        "date": "03/10/2023",
        "description": "Unleashing the Audi RS3 a pocket rocket with style and substance! The RS3 is a fierce performer in a compact package. From the growl of the turbocharged engine to the sharp handling, it's the embodiment of dynamic driving. Speed meets sophistication in this sporty masterpiece.Who else is ready to feel the rush behind the wheel of the Audi RS3? #TurbochargedThrills #QuattroPower #LuxuryPerformance #SpeedDemon #CompactBeast #PerformancePerfection",
        "images": [
            "car09.jpg",
            "car09.jpg",
            "car09.jpg",
            "car09.jpg",
            "car09.jpg"
        ],
        "likes": 9,
        "comments": 4
    },
    {
        "postId": "00000010",
        "userId": "00000005",
        "carId": "00000063",
        "date": "12/06/2023",
        "description": "Rediscovering luxury in every detail with the Lexus IS 250.Who else enjoys the serene and luxurious ride of the Lexus IS 250? #LexusIS250 #LuxuryRide #EleganceOnWheels #LexusLifestyle #PowerAndGrace",
        "images": ["car07.jpg", "car07.jpg", "car07.jpg", "car07.jpg"],
        "likes": 7,
        "comments": 4
    },
    {
        "postId": "00000011",
        "userId": "00000006",
        "carId": "00000062",
        "date": "05/07/2023",
        "description": "The Swift Sport is the embodiment of fun and performance in a compact package. It's like a pocket-sized rocket, zipping through the streets with a sporty heart and nimble agility.Who else has a soft spot for this spirited little dynamo? ##SuzukiSwift #SwiftSport #CompactPower #FunOnWheels #SportyVibes #PerformanceDriving #CityCruiser #WeekendAdventures #CarEnthusiast #CompactCars #DrivingJoy #OpenRoads #DrivingExcitement",
        "images": ["car08.jpg"],
        "likes": 8,
        "comments": 4
    },
    {
        "postId": "00000012",
        "userId": "00000007",
        "carId": "00000061",
        "date": "22/08/2023",
        "description": "Simplicity and efficiency at its finest with the Toyota Yaris. The Yaris is proof that good things come in small packages. With its compact design and fuel efficiency, it's the ideal companion for city dwellers and those who appreciate a no-nonsense approach to driving. Who else finds beauty in the simplicity and reliability of the Toyota Yaris? #ToyotaYaris #Efficiency #CompactCar #CityLife #EcoFriendly #UrbanExplorer #FuelEfficient #SmartFeatures #DriveWithStyle #ToyotaNation #CompactButMighty",
        "images": ["car04.jpg", "car04.jpg", "car04.jpg"],
        "likes": 7,
        "comments": 3
    },
    {
        "postId": "00000013",
        "userId": "00000008",
        "carId": "00000060",
        "date": "15/09/2023",
        "description": "Diving into the realm of Italian excellence with the Lamborghini Huracán. This car doesn't just get you from A to B; it catapults you into a world of exhilaration. The intoxicating blend of performance and luxury is a testament to Lamborghini's legacy of creating automotive masterpieces.Who else is mesmerised by the allure of the Lamborghini Huracán #Lamborghini #Huracan #RagingBull #Supercar #V10Power #ExoticCars #ItalianStyle #PureAdrenaline #CarEnthusiast #NeedForSpeed #PrecisionEngineering #AutomotiveArt #DreamMachine #SpeedDemon #PerformanceCar #LuxuryLifestyle #OpenRoadTherapy #CarObsession",
        "images": ["car10.jpg", "car10.jpg"],
        "likes": 9,
        "comments": 7
    },
    {
        "postId": "00000014",
        "userId": "00000009",
        "carId": "00000059",
        "date": "03/10/2023",
        "description": "Chasing the skyline with the R33 GTST, pure Japanese performance at its best.The R33 GTST is a legend among enthusiasts, and today I had the privilege of experiencing this iconic machine. With its sleek design and turbocharged engine, it's a thrill to drive on both the street and the track.Who else has a soft spot for the R33 GTST's unique blend of style and performance #NissanR33 #GTST #SkylineLove #RB25DET #TurboPower #JDMDreams #Speedster #CarEnthusiast #HorsepowerHaven #RacingHeritage #StreetLegalRocket #SkylineNation #BoostedBeast #PerformanceDriven #AutomotiveArt #R33Gang #SkylineLegend",
        "images": [
            "car09.jpg",
            "car09.jpg",
            "car09.jpg",
            "car09.jpg",
            "car09.jpg"
        ],
        "likes": 8,
        "comments": 2
    },
    {
        "postId": "00000015",
        "userId": "00000005",
        "carId": "00000022",
        "date": "12/06/2023",
        "description": "Unveiling the rotary symphony the Mazda RX-7. Every drive in the RX-7 is an ode to precision, with the engine's unique sound echoing the heart of this machine. It's a statement of Mazda's dedication to innovation and performance, and it's a reminder that some cars are destined to be legendary.Who else is captivated by the Mazda RX-7's charisma and performance #MazdaRX7 #RotaryPower #DrivingEnthusiast #SportsCarLife #CarLovers #JDM #ClassicCars #PurePerformance #RotaryEngine #DrivingExperience #TurboTuesday #CarEnthusiast",
        "images": ["car07.jpg", "car07.jpg", "car07.jpg", "car07.jpg"],
        "likes": 3,
        "comments": 2
    },
    {
        "postId": "00000016",
        "userId": "00000006",
        "carId": "00000058",
        "date": "05/07/2023",
        "description": "the Range Rover Sport SVR. With its commanding presence and supercharged V8 engine, the SVR is the embodiment of power and luxury. This isn't just an SUV; it's an adventure waiting to happen.Who else feels the call of the wild and the allure of luxury with the Range Rover Sport SVR #RangeRover #SportSVR #LuxuryOffRoad #Supercharged #V8Power #AdventureAwaits #LuxurySUV #Performance #NatureDrive #SUVGoals #ExoticCars #OnTheRoadAgain",
        "images": ["car08.jpg"],
        "likes": 8,
        "comments": 5
    },
    {
        "postId": "00000017",
        "userId": "00000007",
        "carId": "00000057",
        "date": "22/08/2023",
        "description": "Built tough and ready for adventure the Toyota Hilux. Today, I took this reliable workhorse off the beaten path and it performed like a champ. Whether you're conquering rugged terrain or tackling everyday tasks, the Hilux is your trusty sidekick.#Toyota #Hilux #OffRoadAdventure #ReliableRide #ToughTruck #AdventureAwaits #4x4Life #OutdoorExplorer #UtilityVehicle #TruckLife #AllTerrainBeast #BuiltToLast",
        "images": ["car04.jpg", "car04.jpg", "car04.jpg"],
        "likes": 8,
        "comments": 5
    },
    {
        "postId": "00000018",
        "userId": "00000008",
        "carId": "00000056",
        "date": "15/09/2023",
        "description": "thunderous power of the Holden GTSR.This Australian legend is a true force on the road, delivering sheer performance and a roar that can be heard for miles. The GTSR represents the best of Holden, and it's a thrill to experience. Who else has a soft spot for this Aussie powerhouse.#Holden #GTSR #AussieMuscle #V8Power #PerformanceCars #AustralianEngineering #MuscleCarMadness #CarEnthusiast #AutomotiveLegends #PowerAndPrecision #HoldenPride #HighPerformance",
        "images": ["car10.jpg", "car10.jpg"],
        "likes": 6,
        "comments": 0
    },
    {
        "postId": "00000019",
        "userId": "00000009",
        "carId": "00000055",
        "date": "03/10/2023",
        "description": "Vintage vibes with the iconic Ford Falcon Cruising down memory lane in this classic beauty, the Falcon has a special place in automotive history. The design, the power, and the sheer nostalgia make every ride unforgettable.#FordFalcon #ClassicCar #AmericanMuscle #NostalgicRides #VintageVibes #CarEnthusiast #ClassicDesign #VintageCar #TimelessBeauty #AutomotiveHistory #MuscleCar #RetroRides",
        "images": [
            "car09.jpg",
            "car09.jpg",
            "car09.jpg",
            "car09.jpg",
            "car09.jpg"
        ],
        "likes": 3,
        "comments": 0
    },
    {
        "postId": "00000020",
        "userId": "00000005",
        "carId": "00000054",
        "date": "12/06/2023",
        "description": "Zooming through the day with the stylish Mazda SP25, This sleek and sporty ride offers the perfect blend of performance and design. From city streets to winding roads, the SP25 is a true joy to drive. Let's share our love for this fantastic car. #Mazda #SP25 #ZoomZoom #SleekDesign #SportyRides #CarEnthusiast #DrivingPleasure #StylishCars #MazdaLove #CityCruiser #EverydayAdventure #DrivingJoy",
        "images": ["car07.jpg", "car07.jpg", "car07.jpg", "car07.jpg"],
        "likes": 3,
        "comments": 1
    },
    {
        "postId": "00000021",
        "userId": "00000006",
        "carId": "00000053",
        "date": "05/07/2023",
        "description": "Unleashing the beast: the Mercedes C63 S.With a handcrafted AMG engine under the hood, this car combines power and luxury in a thrilling harmony. From the roaring exhaust notes to the sophisticated interior, it's the epitome of performance and elegance.Who else is in awe of this German masterpiece? #Mercedes #C63S #AMG #LuxuryPerformance #SpeedDemon #CarEnthusiast #GermanEngineering #ExquisiteDesign #MuscleCar #HighOctaneThrills #DrivingElegance #AMGMagic",
        "images": ["car08.jpg"],
        "likes": 5,
        "comments": 2
    },
    {
        "postId": "00000022",
        "userId": "00000007",
        "carId": "00000052",
        "date": "22/08/2023",
        "description": "Conquering the wild with the mighty Ford Raptor.This off-road beast is built to handle anything Mother Nature throws its way. From sand dunes to rocky trails, it's your ultimate adventure companion. Who's up for some off-road excitement? Let's share our Raptor love. #Ford #Raptor #OffRoadBeast #AdventureReady #TruckLife #OffRoading #4x4Adventures #NatureExplorer #BuiltTough #OutdoorEnthusiast #Trailblazer #FordTrucks",
        "images": ["car04.jpg", "car04.jpg", "car04.jpg"],
        "likes": 9,
        "comments": 4
    },
    {
        "postId": "00000023",
        "userId": "00000008",
        "carId": "00000051",
        "date": "15/09/2023",
        "description": "the Ford Mustang Hoonicorn. With mind-bending power and the signature Ken Block style, the Hoonicorn is a tire-slaying monster. It's not just a car; it's an automotive legend.Who's revved up for some Hoonicorn action? Let's share the love for this high-octane spectacle!#Ford #MustangHoonicorn #KenBlock #TireSlayer #Hoonigan #AutomotiveLegend #CarEnthusiast #DriftKing #FireBreather #RacingBeast #RallyCar #SpeedDemons",
        "images": ["car10.jpg", "car10.jpg"],
        "likes": 7,
        "comments": 4
    },
    {
        "postId": "00000024",
        "userId": "00000009",
        "carId": "00000050",
        "date": "03/10/2023",
        "description": "Elevating everyday drives with the Ford Focus RS. This compact rocket delivers a punch with its turbocharged engine and precision handling. It's the perfect blend of performance and practicality for those who demand excitement behind the wheel.Who's in love with the Focus RS? Let's share the enthusiasm!#Ford #FocusRS #TurbochargedFun #HotHatch #CarEnthusiast #CompactRocket #PerformanceCar #EverydayAdventures #DrivingJoy #SportyRides #SpeedySaturday #TurboPower #PocketRocket",
        "images": [
            "car09.jpg",
            "car09.jpg",
            "car09.jpg",
            "car09.jpg",
            "car09.jpg"
        ],
        "likes": 6,
        "comments": 2
    }
];

async function insertPosts() {
    try {
        mongoose
        .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch((error) => {
            console.log("Error connecting to MongoDB:", error.message);
        });
        const db = mongoose.connection;

        for (const post of posts) {
            const newPost = new Post(post);
            await newPost.save()
            console.log(`Inserted user: ${post.postId}`);
        }

    } catch (err) {
        console.error('Error inserting posts:', err);
    } finally {
        mongoose.connection.close();
    }
}

// insertPosts();