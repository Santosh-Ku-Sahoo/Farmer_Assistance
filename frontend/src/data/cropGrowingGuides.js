/**
 * Static Agronomic Reference Data: Crop Growing Guides (Sowing to Harvest)
 * 
 * SOURCING & CITATIONS:
 * 1. Rice (Paddy): ICAR-National Rice Research Institute (NRRI), Cuttack & 
 *    Department of Agriculture & Farmers' Empowerment, Govt of Odisha ("Package of Practices for Kharif Crops in Odisha").
 *    Assumed: Kharif medium-duration transplanted paddy (e.g. Swarna, MTU-1010, Pooja; 130-140 days).
 * 
 * 2. Tomato: Odisha University of Agriculture and Technology (OUAT), Bhubaneswar & 
 *    Directorate of Horticulture, Govt of Odisha ("Package of Practices for Vegetable Crops").
 *    Assumed: Rabi season determinate/semi-determinate tomato (e.g. BT-10, Utkal Kumari, Arka Rakshak; 110-120 days).
 * 
 * 3. Potato: ICAR-Central Potato Research Institute (CPRI) & Directorate of Horticulture, Odisha ("Potato Mission Guidelines").
 *    Assumed: Winter Rabi early-to-medium table potato (e.g. Kufri Jyoti, Kufri Pukhraj, Kufri Surya; 85-95 days).
 * 
 * SAFETY RULE: This is 100% pre-written, verified static reference material. Never generated dynamically by LLMs.
 */

export const CROP_GROWING_GUIDES = {
  Rice: {
    crop_name_en: "Rice / Paddy (Dhan)",
    crop_name_or: "ଧାନ ଚାଷ (Paddy Cultivation)",
    variety_assumption_en: "Standard Kharif medium-duration transplanted paddy in Odisha (130-140 days, e.g., Swarna, Pooja, MTU-1010, CR Dhan 310)",
    variety_assumption_or: "ଓଡ଼ିଶାରେ ସାଧାରଣ ଖରିଫ ମଧ୍ୟମ ଅବଧି ରୁଆ ଧାନ ଚାଷ (୧୩୦-୧୪୦ ଦିନ, ଯଥା: ସ୍ୱର୍ଣ୍ଣ, ପୂଜା, ଏମଟିୟୁ-୧୦୧୦, ସିଆର ଧାନ ୩୧୦)",
    source_citation: "ICAR-National Rice Research Institute (NRRI), Cuttack & Dept. of Agriculture & Farmers' Empowerment, Govt. of Odisha",
    total_duration: "130 - 140 Days",
    stages: [
      {
        stage_num: 1,
        title_en: "Summer Ploughing & Land Preparation",
        title_or: "ଖରାଟିଆ ଚାଷ ଓ ଜମି ପ୍ରସ୍ତୁତି",
        timeframe: "May - June (Pre-Monsoon)",
        actions_en: [
          "Deep summer ploughing (2-3 passes) after pre-monsoon showers to expose weed rhizomes and resting pupae of stem borer to scorching sun.",
          "Repair and reinforce field bunds (Aila) to retain rainwater and prevent soil runoff.",
          "Apply 4-5 tonnes/acre of well-rotted Farmyard Manure (FYM) or compost during final dry ploughing."
        ],
        actions_or: [
          "ପ୍ରାକ୍-ମୌସୁମୀ ବର୍ଷା ପରେ ୨-୩ ଥର ଗଭୀର ଖରାଟିଆ ଚାଷ କରନ୍ତୁ, ଯାହାଦ୍ୱାରା ମାଟିରେ ଥିବା କୀଟପତଙ୍ଗ ଓ ଘାସ ମଞ୍ଜି ଖରାରେ ନଷ୍ଟ ହେବ।",
          "ବର୍ଷା ପାଣି ଅଟକାଇବା ପାଇଁ ଜମିର ହିଡ଼ (ଆଇଳ) ମରାମତି ଓ ସୁଦୃଢ଼ କରନ୍ତୁ।",
          "ଶେଷ ଚାଷ ବେଳେ ଏକର ପିଛା ୪-୫ ଟନ୍ ଭଲ ଭାବେ ସଢ଼ିଥିବା ଗୋବର ଖତ ବା କମ୍ପୋଷ୍ଟ ପ୍ରୟୋଗ କରନ୍ତୁ।"
        ]
      },
      {
        stage_num: 2,
        title_en: "Seed Selection & Nursery Raising",
        title_or: "ବିହନ ବିଶୋଧନ ଓ ତଳିଘରା ପ୍ରସ୍ତୁତି",
        timeframe: "Days 0 - 25 (June)",
        actions_en: [
          "Seed Selection: Salt water test (using fresh egg floating test in brine) to discard unfilled and diseased chaffy grains.",
          "Seed Treatment: Treat 1 kg seed with Carbendazim 12% + Mancozeb 63% WP (Saaf) @ 2g or Trichoderma viride @ 5g in 1L water for 24 hours.",
          "Nursery Management: Raise wet bed nursery (100 sq.m for 1 acre mainfield). Apply 2 kg Urea, 3 kg SSP, and 1.5 kg MOP in nursery bed.",
          "Maintain thin film of water after 5 days of seed germination to prevent crusting."
        ],
        actions_or: [
          "ବିହନ ବାଛିବା: ଲୁଣ ପାଣିରେ ବିହନ ପକାଇ ଭାସୁଥିବା ପାଳୁଆ ଓ ଅଗାଡ଼ି ବିହନ ବାହାର କରି ଭଲ ଓଜନିଆ ବିହନ ବାଛନ୍ତୁ।",
          "ବିହନ ବିଶୋଧନ: ୧ କେଜି ବିହନ ପାଇଁ ୨ ଗ୍ରାମ୍ ସାଫ୍ (Carbendazim + Mancozeb) କିମ୍ବା ୫ ଗ୍ରାମ୍ ଟ୍ରାଇକୋଡର୍ମା ଗୋଳାଇ ୨୪ ଘଣ୍ଟା ଓଦା କରନ୍ତୁ।",
          "ଏକ ଏକର ମୁଖ୍ୟ ଜମି ପାଇଁ ୧୦୦ ବର୍ଗମିଟର ତଳିଘରା ପ୍ରସ୍ତୁତ କରି ସୁପାରିଶ ମାତ୍ରାରେ ସାର ଦିଅନ୍ତୁ।",
          "ଗଜା ବାହାରିବାର ୫ ଦିନ ପରେ ତଳିଘରାରେ ହାଲୁକା ପାଣି ଜମାଇ ରଖନ୍ତୁ।"
        ]
      },
      {
        stage_num: 3,
        title_en: "Puddling & Mainfield Transplanting",
        title_or: "କାଦୁଅ ଚାଷ ଓ ତଳି ରୋପଣ",
        timeframe: "Days 21 - 30 (July)",
        actions_en: [
          "Puddle field with 5 cm standing water twice, 7 days apart, and level perfectly to eliminate high/low spots.",
          "Transplant 21-25 days old healthy seedlings with 2-3 seedlings per hill.",
          "Adopt 20 cm x 15 cm spacing (for medium land) and shallow planting depth of 2-3 cm for vigorous tillering.",
          "Leave 30 cm alleyways (skipping lines) every 2-3 meters (Skipping Alley method) for sunlight and pest aeration."
        ],
        actions_or: [
          "ଜମିରେ ୫ ସେମି ପାଣି ରଖି ୨ ଥର ଭଲ ଭାବେ କାଦୁଅ ଚାଷ (Puddling) କରି ସମତୁଲ କରନ୍ତୁ।",
          "୨୧ ରୁ ୨୫ ଦିନର ସତେଜ ତଳିକୁ ଗୋଟିଏ ଗାତରେ ୨-୩ ଟି ଲେଖାଏଁ ରୁଅନ୍ତୁ।",
          "ଧାଡ଼ିକୁ ଧାଡ଼ି ୨୦ ସେମି ଓ ଗଛକୁ ଗଛ ୧୫ ସେମି ବ୍ୟବଧାନ ରଖି ଅଗଭୀର (୨-୩ ସେମି) ଭାବେ ରୁଅନ୍ତୁ।",
          "ପୋକ ଓ ରୋଗ ଦାଉରୁ ରକ୍ଷା ପାଇବା ପାଇଁ ପ୍ରତି ୨-୩ ମିଟରରେ ୩୦ ସେମି ଖାଲି ରାସ୍ତା (ଆଲି) ଛାଡ଼ନ୍ତୁ।"
        ]
      },
      {
        stage_num: 4,
        title_en: "Basal & Early Tillering Nutrient Management",
        title_or: "ପ୍ରାରମ୍ଭିକ ଖତସାର ଓ ଘାସ ନିୟନ୍ତ୍ରଣ",
        timeframe: "Days 15 - 45 (August)",
        actions_en: [
          "Basal Fertilizer: Apply 25% Nitrogen, 100% Phosphorus (SSP/DAP), and 50% Potash (MOP) during final puddling.",
          "Weed Management: Apply Pre-emergence herbicide Pretilachlor 50% EC @ 600 ml/acre within 3-5 days of transplanting in standing water.",
          "First Top Dressing (21 days after transplanting): Apply 50% Nitrogen (Urea) + 10 kg Zinc Sulphate (21%) per acre.",
          "Run a rotary cono-weeder at 20 and 40 DAT to aerate roots and incorporate weeds as green organic matter."
        ],
        actions_or: [
          "ମୂଳ ସାର (Basal): ଶେଷ କାଦୁଅ ଚାଷ ବେଳେ ୨୫% ଯବକ୍ଷାରଜାନ, ୧୦୦% ଫସଫରସ୍ ଏବଂ ୫୦% ପଟାସ୍ ପ୍ରୟୋଗ କରନ୍ତୁ।",
          "ଘାସ ନିୟନ୍ତ୍ରଣ: ରୁଆର ୩-୫ ଦିନ ମଧ୍ୟରେ ପ୍ରିଟିଲାକ୍ଲୋର ୫୦% EC (Pretilachlor) ଏକର ପିଛା ୬୦୦ ମିଲି ପ୍ରୟୋଗ କରନ୍ତୁ।",
          "ପ୍ରଥମ ଟପ୍ ଡ୍ରେସିଂ (୨୧ ଦିନରେ): ଏକର ପିଛା ୫୦% ୟୁରିଆ ସହିତ ୧୦ କେଜି ଜିଙ୍କ୍ ସଲଫେଟ୍ (୨୧%) ପ୍ରୟୋଗ କରନ୍ତୁ।",
          "ମାଟିରେ ବାୟୁ ଚଳାଚଳ ବୃଦ୍ଧି ପାଇଁ କୋନୋ-ୱିଡ଼ର ଚଳାଇ ଘାସ ଦମନ କରନ୍ତୁ।"
        ]
      },
      {
        stage_num: 5,
        title_en: "Panicle Initiation & Second Top Dressing",
        title_or: "ଥୋଡ଼ ଅବସ୍ଥା ଓ ଶେଷ ପଟାସ୍ ପ୍ରୟୋଗ",
        timeframe: "Days 60 - 75 (September)",
        actions_en: [
          "Second Top Dressing (Panicle Initiation stage): Apply remaining 25% Nitrogen + remaining 50% Potash (MOP). Potash at this stage hardens the stem against blast and lodging.",
          "Water Management: Critical moisture phase. Maintain 3-5 cm continuous standing water until grain filling completes.",
          "Pest Surveillance: Install yellow sticky traps and pheromone traps (5/acre) for Yellow Stem Borer monitoring."
        ],
        actions_or: [
          "ଦ୍ୱିତୀୟ ଟପ୍ ଡ୍ରେସିଂ: ଥୋଡ଼ ବାହାରିବା ସମୟରେ ବାକି ୨୫% ୟୁରିଆ ଏବଂ ବାକି ୫୦% ପଟାସ୍ (MOP) ଦିଅନ୍ତୁ। ପଟାସ୍ ଗଛକୁ ଶକ୍ତ କରି ପତ୍ର ମହିଷା ରୋଗ ପ୍ରତିରୋଧ କରେ।",
          "ଜଳ ପରିଚାଳନା: ଏହି ସମୟରେ ଜମିରେ ୩-୫ ସେମି ପାଣି ସର୍ବଦା ଜମାଇ ରଖନ୍ତୁ (ଜମି ଶୁଖିବାକୁ ଦିଅନ୍ତୁ ନାହିଁ)।",
          "କାଣ୍ଡବିନ୍ଧା ପୋକ ନିୟନ୍ତ୍ରଣ ପାଇଁ ଏକର ପିଛା ୫ ଟି ଫେରୋମନ୍ ଟ୍ରାପ୍ ଲଗାନ୍ତୁ।"
        ]
      },
      {
        stage_num: 6,
        title_en: "Flowering, Milk Stage & Disease Watch",
        title_or: "ଫୁଲ ଫୁଟିବା, କ୍ଷୀର ଧରିବା ଓ ରୋଗ ନଜର",
        timeframe: "Days 80 - 110 (October)",
        actions_en: [
          "Disease Monitoring: Watch for Leaf/Neck Blast spindle lesions and Sheath Blight snakeskin patches on leaf sheaths.",
          "If Neck Blast appears at 5% panicle emergence, spray Tricyclazole 75% WP @ 0.6g/L immediately during calm morning hours.",
          "Brown Plant Hopper (BPH) Watch: Inspect plant base near water level. If $>10$ nymphs/hill, drain water for 3 days and spray Pymetrozine 50% WG @ 120g/acre.",
          "Never spray during midday when spikelets are open for pollination (9:00 AM - 11:30 AM)."
        ],
        actions_or: [
          "ରୋଗ ନିରୀକ୍ଷଣ: ପତ୍ର ମହିଷା (Blast) ଏବଂ ଖୋଳପୋଡ଼ା (Sheath Blight) ଲକ୍ଷଣ ଉପରେ କଡ଼ା ନଜର ରଖନ୍ତୁ।",
          "ମହିଷା ରୋଗ ଦେଖାଦେଲେ ତୁରନ୍ତ ଟ୍ରାଇସାଇକ୍ଲାଜୋଲ ୭୫% WP (Tricyclazole) ଲିଟର ପିଛା ୦.୬ ଗ୍ରାମ୍ ହିସାବରେ ସକାଳେ ସ୍ପ୍ରେ କରନ୍ତୁ।",
          "ମାଟିଆ ଗୁଣ୍ଡି ପୋକ (BPH) ଦେଖାଦେଲେ ଜମିରୁ ୩ ଦିନ ପାଇଁ ପାଣି କାଢ଼ି ଦିଅନ୍ତୁ ଏବଂ ସୁପାରିଶ କୀଟନାଶକ ସ୍ପ୍ରେ କରନ୍ତୁ।",
          "ପରାଗ ସଙ୍ଗମ ସମୟରେ (ସକାଳ ୯ ରୁ ୧୧ ଟା ମଧ୍ୟରେ) ଔଷଧ ସ୍ପ୍ରେ କରନ୍ତୁ ନାହିଁ।"
        ]
      },
      {
        stage_num: 7,
        title_en: "Pre-Harvest Drainage & Maturity",
        title_or: "ପାଣି ନିଷ୍କାସନ ଓ ପରିପକ୍ୱତା ପରୀକ୍ଷା",
        timeframe: "Days 120 - 130 (November)",
        actions_en: [
          "Maturity Indicator: When 80-85% of grains in the panicle turn golden yellow and hard under thumbnail pressure.",
          "Water Drainage: Drain all standing water from the field completely 10-14 days before expected harvest. This hardens the soil for harvesting and ensures uniform ripening.",
          "Do not delay harvest past 85% maturity to avoid grain shattering and lodging."
        ],
        actions_or: [
          "ପରିପକ୍ୱତା ଚିହ୍ନ: ଯେତେବେଳେ ଶିଁଷାର ୮୦-୮୫% ଧାନ ସୁନେଲି ହଳଦିଆ ରଙ୍ଗ ହୋଇଯିବ ଏବଂ ନଖରେ ଚିପିଲେ କଠିନ ଲାଗିବ।",
          "ପାଣି ନିଷ୍କାସନ: ଧାନ କାଟିବାର ୧୦-୧୪ ଦିନ ପୂର୍ବରୁ କ୍ଷେତରୁ ସମସ୍ତ ପାଣି ସମ୍ପୂର୍ଣ୍ଣ ବାହାର କରି ଦିଅନ୍ତୁ।",
          "ଧାନ ଅଧିକ ପାଚି ଝଡ଼ିପଡ଼ିବା ପୂର୍ବରୁ ଠିକ୍ ସମୟରେ ଅମଳ ଆରମ୍ଭ କରନ୍ତୁ।"
        ]
      },
      {
        stage_num: 8,
        title_en: "Harvesting, Threshing & Safe Storage",
        title_or: "ଧାନ କଟା, ମଳା ଓ ସୁରକ୍ଷିତ ସାଇତିବା",
        timeframe: "Days 130 - 140 (Nov - Dec)",
        actions_en: [
          "Harvest with sickles or reapers on a dry sunny day at 20-22% grain moisture.",
          "Thresh within 2-3 days using mechanical pedal/power threshers to minimize mold contamination.",
          "Sun-dry cleaned paddy grains on tarpaulins for 3-4 days until grain moisture drops below 12-14%.",
          "Store in moisture-proof Pusa bins or airtight hermetic bags with neem leaves to prevent grain weevil infestation."
        ],
        actions_or: [
          "ଶୁଖିଲା ଖରାଟିଆ ଦିନରେ ଦାଆ ବା ରିପର ସାହାଯ୍ୟରେ ଧାନ କାଟନ୍ତୁ।",
          "କାଟିବାର ୨-୩ ଦିନ ମଧ୍ୟରେ ଧାନ ମଳି ପରିଷ୍କାର କରନ୍ତୁ।",
          "ଧାନକୁ ପାଲ ଉପରେ ୩-୪ ଦିନ ଟାଣ ଖରାରେ ଶୁଖାଇ ଆର୍ଦ୍ରତା ୧୨-୧୪% କୁ କମାନ୍ତୁ।",
          "ଶୁଖିଲା ନିମପତ୍ର ଦେଇ ପକ୍କା କୋଠି ବା ହରମେଟିକ୍ ବ୍ୟାଗରେ ସୁରକ୍ଷିତ ଭାବେ ସାଇତି ରଖନ୍ତୁ।"
        ]
      }
    ]
  },

  Tomato: {
    crop_name_en: "Tomato (Bilati Baigana)",
    crop_name_or: "ଟମାଟୋ ଚାଷ (Tomato Cultivation)",
    variety_assumption_en: "Rabi winter high-yield determinate / hybrid tomato in Odisha (110-120 days, e.g., BT-10, Utkal Kumari, Arka Rakshak)",
    variety_assumption_or: "ଓଡ଼ିଶାରେ ଶୀତକାଳୀନ ରବି ଟମାଟୋ ଚାଷ (୧୧୦-୧୨୦ ଦିନ, ଯଥା: ବିଟି-୧୦, ଉତ୍କଳ କୁମାରୀ, ଅର୍କ ରକ୍ଷକ)",
    source_citation: "Odisha University of Agriculture and Technology (OUAT), Bhubaneswar & Directorate of Horticulture, Govt. of Odisha",
    total_duration: "110 - 120 Days",
    stages: [
      {
        stage_num: 1,
        title_en: "Raised Bed Nursery & Seed Treatment",
        title_or: "ଡେଙ୍ଗା ତଳିଘରା ଓ ବିହନ ବିଶୋଧନ",
        timeframe: "Days 0 - 25 (Sept - Oct)",
        actions_en: [
          "Prepare raised nursery beds of 15 cm height, 1 meter width to avoid waterlogging and damping-off disease.",
          "Solarize nursery soil with transparent polythene for 15 days, or mix Trichoderma harzianum @ 50g per bed with compost.",
          "Seed Treatment: Treat hybrid seed (100g/acre) with Thiram/Captan @ 2.5g/kg seed.",
          "Erect 40-mesh insect-proof nylon netting over nursery to protect young seedlings from Whiteflies carrying Yellow Leaf Curl Virus."
        ],
        actions_or: [
          "ପାଣି ନଜମିବା ପାଇଁ ୧୫ ସେମି ଉଚ୍ଚତା ଓ ୧ ମିଟର ପ୍ରସ୍ଥର ଡେଙ୍ଗା ତଳିଘରା ପ୍ରସ୍ତୁତ କରନ୍ତୁ।",
          "ତଳିଘରା ମାଟିରେ ଟ୍ରାଇକୋଡର୍ମା (Trichoderma) ୫୦ ଗ୍ରାମ୍ ଗୋବର ଖତ ସହିତ ମିଶାଇ ପକାନ୍ତୁ।",
          "ବିହନ ବିଶୋଧନ: ୧ କେଜି ବିହନ ପାଇଁ ୨.୫ ଗ୍ରାମ୍ ଥିରାମ୍ (Thiram) ବା କ୍ୟାପଟାନ୍ ଗୋଳାନ୍ତୁ।",
          "ପତ୍ରମୋଡ଼ା ଭୂତାଣୁ ବାହକ ଧଳାମାଛି ଦାଉରୁ ରକ୍ଷା ପାଇବା ପାଇଁ ତଳିଘରା ଉପରେ ନେଟ୍ (ଜାଲି) ଘୋଡ଼ାନ୍ତୁ।"
        ]
      },
      {
        stage_num: 2,
        title_en: "Mainfield Ridge Preparation & Basal Nutrition",
        title_or: "ମୁଖ୍ୟ ଜମି ହିଡ଼ ପ୍ରସ୍ତୁତି ଓ ମୂଳ ସାର",
        timeframe: "Days 20 - 30 (October)",
        actions_en: [
          "Plough land to fine tilth (3-4 passes) and form ridges and furrows at 60 cm spacing.",
          "Basal Nutrition (per acre): Apply 8 tonnes FYM + 25 kg Nitrogen (55 kg Urea), 50 kg Phosphorus (310 kg SSP), 25 kg Potash (40 kg MOP), and 10 kg Borax.",
          "Drench soil with Pseudomonas fluorescens @ 5g/L before transplanting if bacterial wilt history exists."
        ],
        actions_or: [
          "ଜମିକୁ ଭଲ ଭାବେ ଗୁଣ୍ଡ ଚାଷ କରି ୬୦ ସେମି ବ୍ୟବଧାନରେ ଧାଡ଼ି ଓ ନାଳି (Ridges & Furrows) ତିଆରି କରନ୍ତୁ।",
          "ମୂଳ ସାର: ଏକର ପିଛା ୮ ଟନ୍ ଗୋବର ଖତ ସହିତ ୫୫ କେଜି ୟୁରିଆ, ୩୧୦ କେଜି ଏସଏସପି, ୪୦ କେଜି ଏମଓପି ଏବଂ ୧୦ କେଜି ବୋରାକ୍ସ ଦିଅନ୍ତୁ।",
          "ଜୀବାଣୁ ଝାଉଁଳା ରୋଗରୁ ରକ୍ଷା ପାଇବା ପାଇଁ ଜମିରେ ସୁଡୋମୋନାସ୍ (Pseudomonas) ପ୍ରୟୋଗ କରନ୍ତୁ।"
        ]
      },
      {
        stage_num: 3,
        title_en: "Transplanting & Staking Setup",
        title_or: "ଚାରା ରୋପଣ ଓ ବାଉଁଶ ଖୁଣ୍ଟି ବନ୍ଧା (Staking)",
        timeframe: "Days 25 - 35 (Nov)",
        actions_en: [
          "Transplant 25-30 days old stocky seedlings during late afternoon to prevent transplanting shock.",
          "Spacing: 60 cm between rows and 45-50 cm between plants.",
          "Give light irrigation immediately after planting.",
          "Staking: Erect bamboo stakes or trellis wires at 30 days to support indeterminate branches, keeping foliage and fruit off wet soil to eliminate fruit rot."
        ],
        actions_or: [
          "୨୫ ରୁ ୩୦ ଦିନର ହୃଷ୍ଟପୁଷ୍ଟ ତଳିକୁ ଅପରାହ୍ନ ସମୟରେ ରୁଅନ୍ତୁ।",
          "ଧାଡ଼ିକୁ ଧାଡ଼ି ୬୦ ସେମି ଏବଂ ଗଛକୁ ଗଛ ୪୫-୫୦ ସେମି ବ୍ୟବଧାନ ରଖନ୍ତୁ।",
          "ରୋପଣ ପରେ ତୁରନ୍ତ ହାଲୁକା ପାଣି ମଡ଼ାନ୍ତୁ।",
          "ଫଳ ମାଟିରେ ଲାଗି ସଢ଼ି ନଯିବା ପାଇଁ ୩୦ ଦିନ ପରେ ବାଉଁଶ ଖୁଣ୍ଟି ପୋତି ଗଛକୁ ଦଉଡ଼ିରେ ବାନ୍ଧନ୍ତୁ।"
        ]
      },
      {
        stage_num: 4,
        title_en: "Vegetative Growth, Weeding & Top Dressing",
        title_or: "ପ୍ରାରମ୍ଭିକ ବୃଦ୍ଧି, ଘାସ ବଛା ଓ ସାର ପ୍ରୟୋଗ",
        timeframe: "Days 35 - 55 (Nov - Dec)",
        actions_en: [
          "First Top Dressing (30 DAT): Apply 25 kg Nitrogen (55 kg Urea) per acre followed by earthing up around roots.",
          "Irrigate at 6-8 day intervals depending on soil drying; avoid fluctuating wet-dry extremes which cause blossom-end rot.",
          "Prune lower yellowing leaves touching the soil surface to enhance airflow and restrict Early Blight spore jumps."
        ],
        actions_or: [
          "ରୁଆର ୩୦ ଦିନ ପରେ ଏକର ପିଛା ୫୫ କେଜି ୟୁରିଆ ଦେଇ ଗଛ ମୂଳରେ ମାଟି ଟେକି ଦିଅନ୍ତୁ।",
          "ମାଟିର ଆର୍ଦ୍ରତା ଦେଖି ପ୍ରତି ୬-୮ ଦିନ ବ୍ୟବଧାନରେ ପାଣି ମଡ଼ାନ୍ତୁ।",
          "ମାଟିରେ ଲାଗୁଥିବା ତଳ ପତ୍ରଗୁଡ଼ିକୁ କାଟି ଦିଅନ୍ତୁ ଯାହାଦ୍ୱାରା ଆଗୁଆ ଝାଉଁଳା ରୋଗ ବ୍ୟାପିବ ନାହିଁ।"
        ]
      },
      {
        stage_num: 5,
        title_en: "Flowering, Fruit Set & Micro-Nutrient Boost",
        title_or: "ଫୁଲ ଫୁଟିବା, ଫଳ ଧରିବା ଓ ଅଣୁସାର ସ୍ପ୍ରେ",
        timeframe: "Days 55 - 80 (Dec - Jan)",
        actions_en: [
          "Second Top Dressing (55-60 DAT): Apply final split of 25 kg Nitrogen + 25 kg Potash (MOP).",
          "Foliar Micronutrients: Spray Boron 20% (Solubor) @ 1g/L + Calcium Nitrate @ 2g/L at flowering to prevent flower drop and blossom-end black rot.",
          "Pest Watch: Look for Tomato Fruit Borer (Helicoverpa). Hang 4-5 pheromone traps/acre and install bird perches."
        ],
        actions_or: [
          "୫୫-୬୦ ଦିନରେ ଶେଷ କିସ୍ତି ୟୁରିଆ ଏବଂ ପଟାସ୍ ସାର ଦିଅନ୍ତୁ।",
          "ଫୁଲ ଝଡ଼ିବା ଓ ଫଳ ଫାଟିବା ରୋକିବା ପାଇଁ ବୋରୋନ୍ (୧ ଗ୍ରାମ୍/ଲି) ଏବଂ କ୍ୟାଲସିୟମ୍ ନାଇଟ୍ରେଟ୍ (୨ ଗ୍ରାମ୍/ଲି) ସ୍ପ୍ରେ କରନ୍ତୁ।",
          "ଫଳବିନ୍ଧା ପୋକ ଦାଉରୁ ରକ୍ଷା ପାଇବା ପାଇଁ ଫେରୋମନ୍ ଟ୍ରାପ୍ ଲଗାନ୍ତୁ।"
        ]
      },
      {
        stage_num: 6,
        title_en: "Fruit Maturity & Selective Stage Harvesting",
        title_or: "ଫଳ ପରିପକ୍ୱତା ଓ ବଜାର ଅନୁଯାୟୀ ତୋଳା",
        timeframe: "Days 80 - 120 (Jan - Feb)",
        actions_en: [
          "For Distant Market: Harvest at 'Breaker Stage' (when blossom end shows 10-20% pink/tangerine blush).",
          "For Local Mandi: Harvest at 'Pink / Full Ripe' stage with uniform red coloration.",
          "Harvest fruit during morning hours with small stalk intact using clean clippers.",
          "Grade tomatoes into uniform size categories and pack in ventilated plastic crates (avoid over-stacking sacks)."
        ],
        actions_or: [
          "ଦୂର ବଜାର ପାଇଁ: ଟମାଟୋରେ ୧୦-୨୦% ହାଲୁକା ଗୋଲାପି ରଙ୍ଗ (Breaker stage) ଧରିବା ମାତ୍ରେ ତୋଳନ୍ତୁ।",
          "ସ୍ଥାନୀୟ ହାଟ ପାଇଁ: ସମ୍ପୂର୍ଣ୍ଣ ଲାଲ୍ ରଙ୍ଗ ହେବା ପରେ ତୋଳନ୍ତୁ।",
          "ସକାଳ ସମୟରେ ବୃନ୍ତ (ଡେମ୍ଫ) ସହିତ ଟମାଟୋ ତୋଳି କ୍ରେଟ୍‌ରେ ସଜାଡ଼ି ରଖନ୍ତୁ।",
          "ଫଳକୁ ଗ୍ରେଡିଂ କରି ଭଲ ଦର ପାଇଁ ବଜାରକୁ ପଠାନ୍ତୁ।"
        ]
      }
    ]
  },

  Potato: {
    crop_name_en: "Potato (Alu)",
    crop_name_or: "ଆଳୁ ଚାଷ (Potato Cultivation)",
    variety_assumption_en: "Winter Rabi early-to-medium table potato in Odisha (85-95 days, e.g., Kufri Jyoti, Kufri Pukhraj, Kufri Surya)",
    variety_assumption_or: "ଓଡ଼ିଶାରେ ଶୀତକାଳୀନ ରବି ଆଳୁ ଚାଷ (୮୫-୯୫ ଦିନ, ଯଥା: କୁଫ୍ରି ଜ୍ୟୋତି, କୁଫ୍ରି ପୁଖରାଜ, କୁଫ୍ରି ସୂର୍ଯ୍ୟ)",
    source_citation: "ICAR-Central Potato Research Institute (CPRI) & Directorate of Horticulture, Govt. of Odisha (Potato Mission)",
    total_duration: "85 - 95 Days",
    stages: [
      {
        stage_num: 1,
        title_en: "Seed Tuber Sprouting & Fungicide Dip",
        title_or: "ବିହନ ଆଳୁ ଗଜା କରାଇବା ଓ ବିଶୋଧନ",
        timeframe: "Days -10 to 0 (October - Nov)",
        actions_en: [
          "Seed Selection: Use certified disease-free medium sized whole tubers (35-45 mm diameter, 40-50g weight).",
          "Pre-Sprouting: Spread cold-storage tubers in single layers in a well-ventilated diffused daylight shed for 8-10 days until stout green sprouts (1 cm) emerge.",
          "Tuber Treatment: Dip tubers in Mancozeb 75% WP @ 2.5g/L water for 15-20 minutes and shade dry before planting to prevent black scurf and rotting."
        ],
        actions_or: [
          "ବିହନ ବାଛିବା: ପ୍ରମାଣିତ ୩୫-୪୫ ମିମି ଆକାରର (୪୦-୫୦ ଗ୍ରାମ୍) ସୁସ୍ଥ ଗୋଟା ଆଳୁ ବିହନ ବାଛନ୍ତୁ।",
          "କୋଲ୍ଡ ଷ୍ଟୋରରୁ ଆଳୁ ଆଣି ଛାଇ ଜାଗାରେ ପତଳା କରି ୮-୧୦ ଦିନ ବିଛାଇ ସବୁଜ ଗଜା (୧ ସେମି) ବାହାର କରନ୍ତୁ।",
          "ବିହନ ବିଶୋଧନ: ଆଳୁକୁ ମାଙ୍କୋଜେବ୍ (Mancozeb ୨.୫ ଗ୍ରାମ୍/ଲି) ଦ୍ରବଣରେ ୧୫-୨୦ ମିନିଟ୍ ବୁଡ଼ାଇ ଛାଇରେ ଶୁଖାଇ ରୋପଣ କରନ୍ତୁ।"
        ]
      },
      {
        stage_num: 2,
        title_en: "Deep Tilth, Basal Nutrients & Furrow Planting",
        title_or: "ଗଭୀର ଚାଷ, ମୂଳ ସାର ଓ ଆଳୁ ରୋପଣ",
        timeframe: "Days 0 - 10 (November)",
        actions_en: [
          "Plough field 4-5 times to achieve a deep, loose, friable seedbed (20-25 cm depth).",
          "Basal Nutrition (per acre): Apply 10 tonnes FYM + 30 kg Nitrogen (65 kg Urea), 40 kg Phosphorus (250 kg SSP), and 30 kg Potash (50 kg MOP - prefer Sulphate of Potash for starch quality).",
          "Plant sprouted tubers at 60 cm ridge-to-ridge spacing and 20 cm plant-to-plant spacing at 5-7 cm depth with sprouts facing upward."
        ],
        actions_or: [
          "ଜମିକୁ ୪-୫ ଥର ଗଭୀର ଚାଷ କରି ମାଟିକୁ ସମ୍ପୂର୍ଣ୍ଣ ଗୁଣ୍ଡ ଓ ହାଲୁକା କରନ୍ତୁ।",
          "ମୂଳ ସାର: ଏକର ପିଛା ୧୦ ଟନ୍ ଗୋବର ଖତ ସହିତ ୬୫ କେଜି ୟୁରିଆ, ୨୫୦ କେଜି ଏସଏସପି ଏବଂ ୫୦ କେଜି ପଟାସ୍ ପ୍ରୟୋଗ କରନ୍ତୁ।",
          "ଧାଡ଼ିକୁ ଧାଡ଼ି ୬୦ ସେମି ଓ ଆଳୁକୁ ଆଳୁ ୨୦ ସେମି ବ୍ୟବଧାନରେ ଗଜା ଅଂଶକୁ ଉପରକୁ ରଖି ୫-୭ ସେମି ଗଭୀରରେ ରୋପଣ କରନ୍ତୁ।"
        ]
      },
      {
        stage_num: 3,
        title_en: "Sprout Emergence & Light Irrigation",
        title_or: "ଗଜା ବାହାରିବା ଓ ପ୍ରଥମ ହାଲୁକା ଜଳସେଚନ",
        timeframe: "Days 10 - 25 (Nov - Dec)",
        actions_en: [
          "Give light furrow irrigation 7-10 days after planting to facilitate uniform emergence.",
          "Keep water level below two-thirds of the ridge height to prevent ridge crusting and tuber asphyxiation.",
          "Inspect emergence count at 20 days; replace missing gaps immediately."
        ],
        actions_or: [
          "ରୋପଣର ୭-୧୦ ଦିନ ପରେ ନାଳି ଦେଇ ହାଲୁକା ପାଣି ମଡ଼ାନ୍ତୁ।",
          "ପାଣି ଯେପରି ହିଡ଼ ଉପରକୁ ନଉଠି ହିଡ଼ର ଦୁଇ-ତୃତୀୟାଂଶ ତଳେ ରହିବ ଧ୍ୟାନ ଦିଅନ୍ତୁ।",
          "୨୦ ଦିନରେ ସବୁ ଗଛ ଉଠିଛି କି ନାହିଁ ଦେଖି ଖାଲି ଜାଗାରେ ଚାରା ଲଗାନ୍ତୁ।"
        ]
      },
      {
        stage_num: 4,
        title_en: "First Earthing-Up & Nitrogen Top Dressing",
        title_or: "ମାଟି ଟେକିବା (Earthing-up) ଓ ଟପ୍ ଡ୍ରେସିଂ",
        timeframe: "Days 25 - 35 (December)",
        actions_en: [
          "Perform weeding and thorough hoeing when plant reaches 15 cm height.",
          "Top Dressing: Apply remaining 30 kg Nitrogen (65 kg Urea) per acre along the ridges.",
          "Earthing-Up: Draw loose soil from furrows to build broad, high ridges (20 cm) around stems. This ensures developing tubers remain buried under darkness to prevent solanine greening."
        ],
        actions_or: [
          "ଗଛ ୧୫ ସେମି ଉଚ୍ଚ ହେଲେ କୋଡ଼ା-ଖୁସା କରି ଘାସ ବାଛି ଦିଅନ୍ତୁ।",
          "ଟପ୍ ଡ୍ରେସିଂ: ଏକର ପିଛା ବାକି ୬୫ କେଜି ୟୁରିଆ ସାର ଧାଡ଼ି ମଝିରେ ଦିଅନ୍ତୁ।",
          "ମାଟି ଟେକିବା: ହିଡ଼ ଉପରକୁ ଭଲ ଭାବେ ଉଚ୍ଚ କରି ମାଟି ଚଢ଼ାନ୍ତୁ ଯାହାଦ୍ୱାରା ଆଳୁ ଖରାରେ ସବୁଜ ପଡ଼ିବ ନାହିଁ।"
        ]
      },
      {
        stage_num: 5,
        title_en: "Tuber Bulking & Prophylactic Blight Watch",
        title_or: "ଆଳୁ ବଢ଼ିବା ଓ ପଛୁଆ ପତ୍ରପୋଡ଼ା (Late Blight) ସତର୍କତା",
        timeframe: "Days 45 - 70 (Dec - Jan)",
        actions_en: [
          "Critical Tuber Bulking Phase: Maintain steady, uniform soil moisture with light irrigations every 7-9 days.",
          "Late Blight Watch: Foggy cool mornings with high humidity ($>90\\%$) trigger devastating Late Blight. Apply prophylactic spray of Mancozeb 75% WP @ 2.5g/L.",
          "If Late Blight water-soaked lesions appear, spray systemic Cymoxanil 8% + Mancozeb 64% WP (Curzate) @ 3g/L immediately."
        ],
        actions_or: [
          "ଏହି ସମୟରେ ଆଳୁ ଆକାରରେ ବଢ଼ୁଥିବାରୁ ପ୍ରତି ୭-୯ ଦିନରେ ନିୟମିତ ହାଲୁକା ପାଣି ମଡ଼ାନ୍ତୁ।",
          "କୁହୁଡ଼ିଆ ଓ ଓଦାଳିଆ ପାଗରେ ଆଳୁ ପଛୁଆ ପତ୍ରପୋଡ଼ା (Late Blight) ରୋଗ ଆଶଙ୍କା ଥିବାରୁ ଆଗୁଆ ମାଙ୍କୋଜେବ୍ ସ୍ପ୍ରେ କରନ୍ତୁ।",
          "ରୋଗ ଲାଗିଲେ ତୁରନ୍ତ ସାଇମୋକ୍ସାନିଲ୍ + ମାଙ୍କୋଜେବ୍ (Curzate ୩ ଗ୍ରାମ୍/ଲି) ସ୍ପ୍ରେ କରନ୍ତୁ।"
        ]
      },
      {
        stage_num: 6,
        title_en: "Dehaulming (Cutting Vines 10 Days Before Digging)",
        title_or: "ପତ୍ର କଟା (Dehaulming) ଓ ଚୋପା ଶକ୍ତ କରିବା",
        timeframe: "Days 75 - 82 (Jan - Feb)",
        actions_en: [
          "Stop irrigation completely 10 days before dehaulming.",
          "Dehaulming: Cut potato foliage (vines) at ground level with sickles 10-12 days before planned harvest.",
          "Leave tubers buried undisturbed in dry soil for 10-12 days. This hardens the tuber skin (periderm), preventing skin peeling and storage rot during transportation."
        ],
        actions_or: [
          "ଡେହଲମିଂ (ପତ୍ର କଟା) ର ୧୦ ଦିନ ପୂର୍ବରୁ ପାଣି ମଡ଼ାଇବା ସମ୍ପୂର୍ଣ୍ଣ ବନ୍ଦ କରନ୍ତୁ।",
          "ଆଳୁ ଖୋଳିବାର ୧୦-୧୨ ଦିନ ପୂର୍ବରୁ ଗଛର ଡାଳପତ୍ରକୁ ମାଟି ପାଖରୁ କାଟି ବାହାର କରି ଦିଅନ୍ତୁ।",
          "ଏହାଦ୍ୱାରା ମାଟି ତଳେ ଥିବା ଆଳୁର ଚୋପା ମୋଟା ଓ ଶକ୍ତ ହୁଏ ଏବଂ ବାହାର କଲାବେଳେ ଚୋପା ଛାଡ଼ି ନଷ୍ଟ ହୁଏ ନାହିଁ।"
        ]
      },
      {
        stage_num: 7,
        title_en: "Harvesting, Shade Curing & Safe Storage",
        title_or: "ଆଳୁ ଖୋଳା, ଛାଇରେ ସୁଖାଇବା ଓ ସାଇତିବା",
        timeframe: "Days 85 - 95 (February)",
        actions_en: [
          "Dig tubers carefully using potato diggers or hand spades on a bright sunny day without bruising skins.",
          "Shade Curing: Cure harvested tubers in a cool, ventilated dark shed in a heap (30-40 cm thickness) for 10-15 days to heal minor skin scratches.",
          "Discard rotten, greened, or pest-damaged tubers before sending to cold storage at 2-4°C with 90% relative humidity."
        ],
        actions_or: [
          "ଟାଣ ଖରାଟିଆ ଦିନରେ କୋଦାଳ ବା ଆଳୁ ଡିଗରରେ ସାବଧାନତାର ସହ ଆଳୁ ଖୋଳନ୍ତୁ ଯେପରି ଚୋପା କଟି ନଯାଏ।",
          "ଖୋଳିବା ପରେ ଆଳୁକୁ ଛାଇ ଜାଗାରେ ୧୦-୧୫ ଦିନ ପତଳା କରି ବିଛାଇ ରଖନ୍ତୁ ଯାହାଦ୍ୱାରା କ୍ଷତ ଶୁଖିଯିବ।",
          "ସଢ଼ା ଓ ସବୁଜ ଆଳୁ ବାଛି ଅଲଗା କରି ଭଲ ଆଳୁକୁ କୋଲ୍ଡ ଷ୍ଟୋରେଜ୍ ବା ବଜାରକୁ ପଠାନ୍ତୁ।"
        ]
      }
    ]
  }
};
