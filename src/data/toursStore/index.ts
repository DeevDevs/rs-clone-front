import { ContinentNames } from '../../enums';

const toursStore = [
  {
    name: ContinentNames.Asia,
    data: [
      {
        header: 'Vietnam Express Southbound',
        info: `Discover the essence of captivating Vietnam on this ten-day tour through backstreets, 
      villages, cities and waterways. Trace the east coast on this fast-paced adventure and take 
      in World Heritage-listed landscapes and towns, feel the buzz of bustling cities and fuel 
      yourself with banh mi and condensed milk coffee. As lively as it is lovely, Vietnam can seem 
      an intimidating place to travel, but our local leaders will guide you to the best street food 
      (and tell you how to order it), introduce you to fishermen on the Mekong Delta and give you 
      the inside scoop on the best tailors in Hoi An. This is an adventure full of life, colour and 
      flavour that introduces you to the highlights of this fascinating nation.`,
        img: 'https://www.intrepidtravel.com/sites/intrepid/files/styles/480w/public/elements/product/hero/TVSF_halong-bay_vietnam_kayaks_pax.jpg',
        rating: 7,
      },
      {
        header: 'Beautiful Bali',
        info: `Travel to Bali and discover Indonesia's beautiful island escape. Dotted with small, 
      character-filled villages, smouldering volcanoes rising out of lush rich fields, idyllic 
      beaches and colourful reefs, Bali is the perfect island getaway. Conquer the slopes of 
      simmering Mt Batur, explore an underwater world in Bali Barat National Park, feast on delicious 
      Balinese cuisine and enjoy moments of absolute peace in Pura Ulun Danu Bratan, a Hindu–Buddhist 
      lake temple dedicated to the goddess of the waters. Fall in love with the warmth of the people, 
      the ornate customs and welcoming culture that are synonymous with beautiful Bali.`,
        img: 'https://www.intrepidtravel.com/sites/intrepid/files/styles/480w/public/elements/product/hero/ubud_rice-fields_shutterstock_390855292.jpg',
        rating: 8,
      },
      {
        header: 'Sri Lanka in Depth',
        info: `Encounter a country that radiates warmth – from its glorious sunshine to its scorching 
      cuisine and incredibly kind people. This 14-day Premium adventure through Sri Lanka will take 
      you straight to the heart of the country’s wealth of cultural riches. Explore the ancient ruins 
      of past civilizations, search for rare and beautiful animals, relax on palm-fringed beaches and 
      receive a welcoming embrace from the locals. A shining gem in the Indian ocean, the teardrop 
      isle will bring nothing but smiles.`,
        img: 'https://www.intrepidtravel.com/sites/intrepid/files/styles/480w/public/elements/product/hero/sigiriya_ancient_rock_fortress.jpg',
        rating: 9,
      },
      {
        header: 'Everest Base Camp Trek',
        info: `Base Camp. Two little syllables that conjure up dreams as immense and powerful as the 
      Himalayan Mountains themselves. This 15-day trekking tour is your chance to make these dreams 
      come true, to challenge yourself and discover both the majesty of the mountains and your own 
      potential. Walk among giants of nature and revel in the sense of freedom that comes from leaving 
      Wi-Fi and Netflix behind for card games in tiny teahouses, learning about Sherpa life and watching 
      the sunrise over Everest. Plus, our commitment to the rights and fair treatment of porters and 
      trekking guides means you can rest assured knowing you’re doing the trek of a lifetime the ethical way.`,
        img: 'https://www.intrepidtravel.com/sites/intrepid/files/styles/480w/public/elements/product/hero/nepal-everest-base-camp-day-07-dingboche-0670.jpg',
        rating: 10,
      },
      {
        header: 'Premium India',
        info: `From magnificent forts to wild forests and energetic cities, Rajasthan has plenty to entice those 
      in search of an adventure. This 14-day Premium journey through the north of India reveals the region’s 
      best culture, landscapes and cuisine with the guidance of an experienced local leader. The fabled cities 
      of Agra, Udaipur and Jaipur will impress with their grandeur, while Mumbai and Delhi provide a true 
      snapshot of modern life. Search for tigers in Ranthambhore National Park, dine beneath the stars among 
      the sand dunes of Pushkar and learn about life in Rajasthan in the homes of local families.`,
        img: 'https://www.intrepidtravel.com/sites/intrepid/files/styles/480w/public/elements/product/hero/Morning_at_Taj_Mahal-SW_0.jpg',
        rating: 7.5,
      },
    ],
  },
  {
    name: ContinentNames.Europe,
    data: [
      {
        header: 'Highlights of Italy in Winter',
        info: `Ah, Italia. It seems a little unfair that one country does food, architecture, art, history 
      and the central social square so perfectly. It’s just a shame the rest of the world feels the same 
      way! But while most associate Italy with summer, relatively mild winters make Italy the perfect place 
      to visit during the off season. On this trip, you’ll see all the fabulous spots with far fewer tourists 
      crowding the squares and clogging up the lines. Take in the crumbling ruins of Rome, whimsical Florence 
      and the floating 15th century city of Venice in this diverse tour.`,
        img: 'https://www.intrepidtravel.com/sites/intrepid/files/styles/480w/public/elements/product/hero/ZMRR-_0002_Italy_Venice_ChurchOfSaintRoch_004.jpg',
        rating: 8.5,
      },
      {
        header: 'Iceland Discovery',
        info: `Travel to Iceland and delve into the ancient tales of Vikings and volcanoes on this eight-day 
      adventure to its heartlands. Marvel at geothermal hot springs, witness the steamy eruptions of a giant 
      geyser, touch the tongue of Europe's biggest glacier at Vatnajokull and cruise the Jokulsarlong Glacial 
      Lagoon, see lava that's still warm after decades and witness the giant Skogafoss and Detifoss waterfalls 
      in all their splendour. Travel through Iceland's isolated corners and the land of the famous Blue 
      Lagoon – so mysterious and ethereal that they have inspired artists, poets and musicians for centuries. 
      Plus, with a local leader on hand to answer any questions and get you from place to place, you’ll be 
      cruising around this icy isle in no time.`,
        img: 'https://www.intrepidtravel.com/sites/intrepid/files/styles/960w/public/elements/product/hero/BMSI-Iceland_Seljalandsfoss-Waterfall.jpg',
        rating: 9.5,
      },
      {
        header: 'Athens to Santorini',
        info: `Embark on a tour through the Aegean Sea, taking local ferries around the Cyclades Islands. Indulge 
      in a little island hopping and take the time to uncover remote ruins, gorgeous beaches and outstanding 
      scenery. Travel from the ancient capital of Athens all the way to the spectacular natural wonders on the 
      island of Santorini on this wonderful Greek adventure.`,
        img: 'https://www.intrepidtravel.com/sites/intrepid/files/styles/640w/public/elements/product/hero/greece_mykonos_beach-boat.jpg',
        rating: 8,
      },
      {
        header: 'Highlights of Scotland',
        info: `You only have to look around to see why Scotland is praised for its natural landscapes and historic 
      buildings. Rolling hills, rocky cliffs and undulating valleys speckled in myriad colours, pristine lochs 
      shimmering even on the coldest of days, and castles dotted throughout the countryside as if you’ve been 
      transported back in time. With an 8-day exploration of Scotland’s Highlands, lochs and villages, you’ll 
      experience the finest of nature with the warmest of hospitality. Discover the untouched Isle of Skye, the 
      expansive landscapes of Cairngorms National Park, and hit both Scottish hubs of Glasgow and Edinburgh on 
      your way through. With the right amount of small-group adventure, local knowledge and stunning scenery, 
      let the Scottish Highlands enchant you.`,
        img: 'https://www.intrepidtravel.com/sites/intrepid/files/styles/640w/public/elements/product/hero/Scotland-Edinburgh-royal-mile.jpg',
        rating: 7,
      },
      {
        header: 'Highlights of Malta & Gozo',
        info: `Malta may be one of the world’s smallest countries, but when it comes to ancient history, natural 
      beauty and compelling culture, it’s in the big league. Uncover the highlights and hidden treasures of 
      Malta and Gozo on a 7-day adventure with a leader to help you see the country through the eyes of a local. 
      Discover what makes Valletta so special, go back in time at the Three Cities and explore the ancient site 
      of Hagar Qim. Jump across to neighbouring Gozo and hike along the coastline, enjoy wine tasting at a local 
      winery and discover its history. One thing’s for sure – this is a place worth raising a toast to.`,
        img: 'https://www.intrepidtravel.com/sites/intrepid/files/styles/640w/public/elements/product/hero/ZLSM_IntrepidTravel-Malta-The-Blue-Lagoon-and-Cliffside-1100x735.jpg',
        rating: 10,
      },
    ],
  },
  {
    name: ContinentNames.Africa,
    data: [
      {
        header: 'North Morocco Adventure',
        info: `Immerse yourself in the exotic colours and cultures that express the flavours of Morocco. From 
      the imperial cities of Meknes and Rabat to the vibrant town of Chefchaouen, the rich history and traditions 
      of this ancient land await. Discover the medieval city of Fes, experience an exclusive guesthouse stay in 
      Moulay Idriss, explore the spice markets of Marrakech, and travel to the Roman ruins of Volubilis. This 
      nine-day northbound tour lets you soak up the extravagant sights and revel in the hidden delights of 
      Morocco.`,
        img: 'https://www.intrepidtravel.com/sites/intrepid/files/styles/640w/public/elements/product/hero/morocco_fes_tanneries.jpg',
        rating: 7,
      },
      {
        header: 'Premium Kenya',
        info: `Soak in the spectacle of Kenya’s vast plains and wild grasslands on a seven-day Premium adventure. 
      Get among the massive herds and their predators from the comfort of four-wheel drive Landcruisers, with an 
      expert local leader at the helm. From Nairobi, travel to the waters of lakes Naivasha and Nakuru, then take 
      in quintessential Africa in the Masai Mara, filled with spectacular landscapes and rich wildlife. Meet 
      Maasai warriors and learn about their way of life during a visit to a traditional village. With cultural 
      experiences and magnificent wildlife right on your doorstep, it’s easy to fall in love with this enchanting 
      corner of the world.`,
        img: 'https://www.intrepidtravel.com/sites/intrepid/files/styles/640w/public/elements/product/hero/YGPK_Intrepid%20Travel-Kenya-Masai-Mara-hot-air-balloon-1100x735.jpg',
        rating: 8.5,
      },
      {
        header: 'Brilliant Botswana',
        info: `Experience the wilderness and welcoming people of Botswana on a 7-day Premium adventure through 
      its heart. Set out in search of wildlife on a series of game drives, cruise down the Chobe River from 
      the Namibian banks, walk through a private conservancy at the Boteti River and hang out with a family 
      of meerkats at the Ntwetwe Salt Pans. From the rich diversity of Chobe National Park to the curious 
      beauty of the Makgadikgadi Pans, Botswana’s natural wonders will take your breath away.`,
        img: 'https://www.intrepidtravel.com/sites/intrepid/files/styles/640w/public/elements/product/hero/UBPB_IntrepidTravel-Botswana-FeatureStay-Aerial-View-Chobe-River-Camp-1100x735.jpg',
        rating: 10,
      },
      {
        header: 'Gorillas & Game Parks',
        info: `A close encounter with gentle giants on a gorilla safari in Uganda is an extraordinary experience 
      that will always stay with you – and it's just one of the many wildlife sightings this unforgettable trip. 
      Roam the verdant plains, rainforests, papyrus-fringed lakes and acacia woodlands of Kenya and Uganda’s 
      game parks, from Queen Elizabeth National Park to the Masai Mara Reserve. Spot lions, rhinos, chimps, 
      antelopes, hippos, leopards and more in their natural habitats. The staggeringly beautiful African landscape 
      will provide memories that last a lifetime.`,
        img: 'https://www.intrepidtravel.com/sites/intrepid/files/styles/640w/public/elements/product/hero/Peregrine%20Adventures-rwanda_gorilla_forest-young.jpg',
        rating: 7.5,
      },
      {
        header: 'Wildlife in Rwanda and Uganda',
        info: `Come face to face with heartbreaking history and incredible wildlife on a 6-day Premium journey 
      through Rwanda and Uganda. See sombre reminders of Kigali’s devastating past, watch local life play out 
      on the streets and witness a beautiful country that's continuously striving to move forward. Enter the 
      world of rare mountain gorillas in Uganda’s Bwindi Impenetrable Forest and spend a day tracking and 
      observing these endearing creatures. This soul-stirring adventure won’t soon be forgotten.`,
        img: 'https://www.intrepidtravel.com/sites/intrepid/files/styles/640w/public/elements/product/hero/YGPU_Nkuringo-bwindi-gorilla-lodge-1100x735.jpg',
        rating: 8.5,
      },
    ],
  },
];

export default toursStore;
