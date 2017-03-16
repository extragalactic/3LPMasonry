import PDFMake from 'pdfmake';
import path from 'path';
import fs from 'fs';
import moment from 'moment';

const selections = {
  watertest: false,
  obc: false,
  nbc: false,
  concrete: false,
  retaining: false,
  newcap: false,
  newcrown: false,
  roof: false,
  sills: false,
  pargeex: false,
  coping: false,
  flashing: false,
  waterproofing: false,
  tuckpoint: false,
  flagstone: false,
  banas: false,
  fwarranty: false,
  pwarranty: false,
  custom: false,
  customText: '',
};


const pdfMakeEstimate = (customer, generics, prices) => {
  const waterTest = {
    text: [
    { text: 'Waterproof Test', style: 'heading' },
    { text: 'A water test is the one and one only way to truly troubleshoot where water is coming from. \n \n' },
      "You will need 2 people to conduct this water test. One on the inside and the other on the outside with the hose. Firstly, let's follow the law of gravity. We know water runs downhill so it makes no sense to put water any place on the elevation other than the very bottom( which is on the grass or concrete pavement etc at the foundation). Just let the water sit and flow from the hose. With one person on the inside monitoring and after no more than 15 minutes of steady flow from garden hose, there is no moisture coming in then we know you're below grade foundation is good. The next junction is where the concrete meets the brick work or veneer, if there is not adequate flashing and weepers than that can also cause your water problem. But the water test and hose will tell you that after no more than 15 minutes with somebody monitoring on the inside. If still no evidence of water keep raising the water ( no more than 2 feet in height at a time) whether it be glass doors /windowsills / brickwork etc. Keep on going as one time we found that the water showing up on the basement floor actually originated from voids in mortar joints that were on the second floor a long way from the basement floor. \n \nYou may conduct this test yourself as explained, or we can provide the test for you for $500 plus HST. Which will be discounted from the repair work should you be requiring or accept our services",
    ],
  };

  const stoneWindowSills = {
    content: [
    { text: "Stone Window Sills", style: 'heading' },
      { ul: [
        'New limestone sills to be 3" or 4" depending on size of rough opening',
        'Sills come with rock face and custom cut drip edges (on site) to reflect water away from masonry below',
        'Approximate 2 inch overhang with drip edge cut thoroughly through stone and mortar joints from end to end 1/4"deep (drip edge) and 1-1.5" away from the wall (drip edge)',
        "Sills are full length stones up to 6' in length (less mortar joints)",
        'Caulking at base where new sills meets window',
        ],
      },
      { text: "10 year warranty on workmanship and materials", bold: true }
    ],
  };

  const repairGrindParge = {
    content: [
    { text: "Repair, grind and parge", style: 'heading' },
      { ul: [
        'We lightly grind every single square inch of the foundation until the surface is completely clean. Missing a single square inch can and will cause the parge to breakdown.',
        'We repair all cracks and voids in foundation. Our parge includes 5-6” below grade and where there is interlock, we lift interlock, cut interlock if necessary and reset',
        'We apply trowel on parge by pressing into place as even as possible. After initial setting finish, we parge with a float sandstone finish.',
        ],
      },
      { text: "10 year warranty on workmanship and materials", bold: true }
    ],
  };

  const stoneRefacingSlices = {
    content: [
    { text: "Stone refacing slices - remove siding and/or trim work from around windows", style: 'heading' },
      { ul: [
        'Install minimum half inch thick plywood',
        'Cover new plywood with water resistant paint or primer',
        'Install sliced Arriscraft stone with pl 400',
        'Install real natural limestone 3" thick window sills complete with rock face and drip edge',
        'Caulk and seal all new work where required',
        ],
      },
      { text: "10 year warranty on workmanship and materials", bold: true }
    ],
  };

  const completeStonerefacing = {
    content: [
    { text: "Complete Stone refacing", style: 'heading' },
      { ul: [
        'Remove and haul away brick/masonry',
        'Install new vapour barrier and rubber membrane flashings',
        'Instal new Arriscraft stone complete with 3 inch or 4 inch natural Indiana limestone windowsills complete with rock face and drip edge',
        'Install limestone address plaque',
        'Reattach light fixtures or install new lights (customer supplied)',
        'Caulk and seal all new work where required'
        ],
      },
      { text: "10 year warranty on workmanship and materials", bold: true }
    ],
  };

 const additionalWork = {
   content: [
     { text: "Additional work outside of the estimate to be assessed and discussed on site with customer" },
     { text: "Warranties as stated or until structural movement or work done by others affects our work" },
   ],
 };

const OBC = {
    content: [
    { text: "Ontario Building Code (OBC)—— Sidewalk/ garage pad /slab", style: 'heading' },
      { ul: [
        "Remove existing slab and prepare", 
        "Install 2\" HPB aggregates", 
        "Install 6\"x6\" wire mesh to centre of new concrete", 
        "Pour/place 32 MPA ready-mix concrete, 4\" thick", 
        "Float or broom finish "
    ],
      },
      { text: "2 year warranty on workmanship and materials", bold: true }
    ],
  }

  const NBC = {
    content: [
    { text: "National Building Code (NBC) —— Sidewalk/ garage pad /slab", style: 'heading' },
      { ul: [
        "Remove existing slab or concrete", 
        "Drill 4 foot deep pilings 10 inches in diameter and a minimum of 5 foot intervals", 
        "Install 15 mm steel rebar in centre of pilings", 
        "Pour/place 32 mpa ready-mix concrete (4\"- 8\" thick)", 
        "Float or broom finish"
    ],
      },
      { text: "20 year warranty on workmanship and materials", bold: true }
    ],
  }

const concreteSteps = {
    content: [
    { text: "Concrete steps / landing / treads / risers", style: 'heading' },
      { ul: [
        "Remove existing landing, treads/ risers", 
        "Drill and install 4 foot deep pilings 10 inches in diameter at a maximum of 5 foot intervals at all grades including treads and risers", 
        "Build footings or foundations or both (depending on design)", 
        "Reinforce all with 15m steel rebar", 
        "Build solid concrete or \"solid\" fill concrete block (size to be determined on job site)", 
        "Slabs to be reinforced with 6\"x6\" steel mesh overlapped a minimum of 6\"", 
        "Pour/place 32 mpa concrete", 
        "Float or broom finish"
    ],
      },
    ],
  }

const retainingWalkout = {
    content: [
    { text: "Retaining walk outs (NBC)", style: 'heading' },
      { ul: [
        "Remove existing walk out, landscaping,decking, fence etc. (if required) and haul away", 
        "Drill and install 4 foot deep pilings, 10 inches in diameter at a maximum of 5 foot intervals at all grades, including treads and risers", 
        "Build footings", 
        "Reinforce all with 15 mm steel rebar. (OBC SAYS NO NBC SAYS YES)", 
        "Build solid concrete or \"solid\" fill concrete block (size to be determined on job site)", 
        "Drill weeper's after walls are constructed \"or\" build into wall a minimum 1/4\" tubing to be located at very bottom of wall and at 2' intervals", 
        "Weeper locations to have 3/4\" clear gravel to act as a filter from native soils, to ensure that the hydrostatic pressure is always being released. Thereby taking a lot of pressure off wall (OBC says No NBC says Yes)", 
        "Cover walls with parge (if block) > if concrete (no parge required)", 
        "Backfill and compress native soils into place or backfill with HPB aggregates", 
    ],
      },
    ],
  }

  const chimney = {
    content: [
    { text: "Chimney", style: 'heading' },
      { ul: [
        "Dismantle chimney to roofline/foundation /top only and rebuild with new brick to match as close as possible ( no corbeling)", 
        "Re-use cleaned flue liners. Replace top flue liner (s) \"only\" with new ones", 
        "However, If by slim chance the flu liners need replacing below the top flue liners then extra costs are to be calculated on site and forwarded to customer for approval PRIOR to commencing any \"extra\" work"
      ],
      },
      { text: "New Cap", bold: true },
      { ul: [
        "Install full length 3 inch Indiana limestone CAP (no mitred corners)", 
        "2 inch overhang with drip edge cut thoroughly through stone and mortar joints from end to ends, 1/4” deep (drip edge) and 1-1.5\" away from the wall"
 
      ]},
      { text: "New Crown", bold: true },
      { ul: [
        "Install portland or type 10 mix 3-1 pre-hydrated or hydraulic mortar", 
        "Top of crown to be sloped and feathered from 2\" down to outer edge of limestone cap", 
        "Apply fire rated caulking(orange or grey colour) around all flue liners (including gas)",
 
      ] },
      { text: "Check Roof Flashing", bold: true },
     { ul: [
        "Re-attach flashing and caulk and ensure not even a pinhole exists.", 
        "Clean roof dismantle scaffolding clean up little pigs mess and haul away",
       ] },
      { text: "10 year warranty on workmanship and materials", bold: true },

    ],
  };

  const windowSills = {
    text: [
    { text: 'Window sills', style: 'heading' },
  {text: "One of the biggest reasons that brick windowsills breakdown is due to the fact that there is flashing installed directly underneath the window sill which is according to Ontario Building Code guidelines \n This method plugs up and traps water to the sill plus the course of brick underneath window sills. \n The Nation Building Code ( which we practise ) is to have a clear cavity under the window sill to allow the water that runs behind the brick down the wall and out the weeper that should be located on top of flashed foundation or on top of flashed openings   \n . \n"},
    { ul: [
      "Price to remove existing sills and replace with natural Indiana limestone\nNew sills to be 3\" or 4\" depending on size of rough opening",
      "Sills come with rock face and custom cut drip edges ( on site ) to reflect water away from masonry below",
      "Approximate 2 inch overhang with drip edge cut thoroughly through stone and mortar joints from end to end",
      "1/4\"deep ( drip edge ) and 1-1.5\" away from the wall. ( drip edge )",
      "Sills are full length stones up to 6' in length ( less mortar joints )",
    ] },
      { text: "10 year warranty on workmanship and materials", bold: true },

    ],
  };

  const pargeConcreteExterior = {
    content: [
        { text: 'Parge concrete exterior foundation', style: 'heading' },
        {text: "We lightly grind every single square inch of the foundation until the surface is completely clean. Missing a single square inch can and will cause the parge to breakdown."},
        {text: "We apply trowel on parge by pressing into place as even as possible. After initial setting finish, we parge with a float sandstone finish."},
        { text: "10 year warranty on workmanship and materials", bold: true },


    ]
  }

const copingStone = {
    content: [
    { text: "Coping Stone", style: 'heading' },
      { ul: [
        "Install full length 3 inch Indiana limestone CAP (no mitred corners)",
        "2 inch overhang with drip edge cut thoroughly through stone and mortar joints from end to ends, 1/4\"deep ( drip edge ) and 1-1.5\" away from the wall",
      ],
      },
    ],
  }



 const flashingWeepers = {
    text: [
    { text: 'Flashing/weeper/plugged weepers', style: 'heading' },
  {text: "Through the wall flashing (behind the brick) and clean active weepers should be located at top of foundation walls, all openings, on top of all grade levels and landings (whatever is exposed to the environment) \n Brick (masonry units) absorb water, but when it gets behind the brick (cavity) it needs a place to vent. This is where weepers come in, providing they are functional and are even present \n Without weepers, or plugged weepers, water becomes trapped in the cavity and slowly starts to wear the brick out from the inside out or, worse yet, starts entering inside the building, causing mold and other issues. \n We also want to protect the exterior face by applying a parge to the new brick , to ensure that the exterior is repelling the moisture away rather then absorbing the water that is usually exposed to" },
     { ul: [
      "Remove at least 2 courses of brick",
      "Shore up brickwork above",
      "Install new flashing",
      "Install new brick",
      "Ensure weeper's are installed",
      "Clean weepers after process",
      "Parge outside of new brick (UNLESS OTHERWISE SPECIFIED)"
    ] },
  { text: "10 year warranty on workmanship and materials", bold: true },

    ],
  };

 const exteriorWaterprooinfg = {
    content: [
    { text: 'Exterior Waterproofing', style: 'heading' },
     { ul: [
         "Excavate down to footings ensuring the width is wide enough for the safety of our workers", 
        "Wire brush and clean foundation wall and footing", 
        "Repair all cracks and voids in wall by first V jointing all cracks( minimum 1\" deep ) prior to installing pre-hydrated or hydraulic mortar", 
        "Parge wall only if it is made of blocks or bricks ( solid concrete okay )", 
        "Replace weeping tile if one exists, and/or needs replacement.", 
        "Cover wall with either a trowel on liquid rubber membrane or sheets of blue skin rubber membrane", 
        "Backfill and compress (tamp) native soil back into place or backfill with HPB aggregates ( depending on weather and/or location )", 
        "Concrete (Extra Work)", 
        "Asphalt (Extra Work)",
        "Stone (Extra Work)",
        "Re-sodding and/or Interlock (Extra Work)",
    ] },

    ],
  };

 const tuckPointing = {
    content: [
    { text: 'Tuckpointing', style: 'heading' },
     { ul: [
        "Grind out mortar joints to a minimum depth of 3/4\"",
        "Using a blower remove dust from mortar joints and from face of wall",
        "Slick in with pre-hydrated mortar",
        "Clean up and remove debris from site",
    ] },

    ],
  };

 const flagStone = {
    content: [
    { text: 'Flagstone', style: 'heading' },
     { ul: [
        "We use India Banas stone", 
        "Square cut", 
        "Full piece treads (as little mortar joints as possible on coping area.)", 
        "Overhang with drip edges", 
        "Small joints"
    ] },

    ],
  };

  const indiaBanas = {
    content: [
    { text: 'INDIA BANAS STONES  -  Here is what is available:', style: 'heading' },
    {text: "Banas Beige \n Banas Lavender \n Banas Grey \n Banas Slate Grey \n Banas Brown \n Banas Flint \n Kodak Black \n Banas Imperial Black" }
     ],
  };

  const fwarranty = {
    content: [
    {text: "Please note: Our flagstone installation has a warranty for five years provided you use only sand in the winter for icy conditions. All other products cause damage to the mortar joints. Small bags of construction sand can be purchased at Home Depot" }
     ],
  };

 const pwarranty = {
    content: [
    {text: "Please note: Our parging and coating have a five year warranty provided you use only sand in the winter for icy conditions. All other products cause damage to concrete, parge and coatings. Small bags of construction sand can be purchased at Home Depot." }
     ],
  };

  const fonts = {
    Roboto: {
      normal: path.join(__dirname, '../../assets/fonts/Roboto-Regular.ttf'),
      bold: path.join(__dirname, '../../assets/fonts/Roboto-Medium.ttf'),
      italics: path.join(__dirname, '../../assets/fonts/Roboto-Italic.ttf'),
    },
  };

  const docDefinition = {
    pageSize: 'LETTER',
    footer: { text: 'Three Little Pigs Masonry 14845 YongeSt., Unit6-Suite322, Aurora, ON, L4G 6H8 905-508-0500 416-595-0100', alignment: 'center' },
    background: { image: path.join(__dirname, '../../assets/images/3lplogo.jpg'),
      width: 150,
      height: 150,
      alignment: 'right',
    },
    content: [
     { text: 'Three Little Pigs Masonry', alignment: 'center', style: 'header' },
     { text: 'Estimate', alignment: 'center', style: 'estimate' },
     { text: `${moment().format('dddd, MMMM Do YYYY')}`, alignment: 'left' },
     { text: `Prepared for ${customer.firstName} ${customer.lastName} @ ${customer.address}` },
      { style: 'tableExample',
        table: { widths: [400, 100],
          body: prices,
        },
      },
      { text: "Three Little Pigs Masonry would like to thank you for the opportunity to quote on your project. Why choose Three Little Pigs Masonry? Since 2004, Three Little Pigs Masonry has grown to become a trusted name in masonry and concrete throughout the GTA. With over 40 years experience and with actual masonry and concrete experts at the helm, your satisfaction is our main priority. \n Three Little Pigs Masonry will not leave your property until you are completely satisfied and our warranties reflect our confidence in our ability to provide the best in masonry and concrete. \n"}, 
      {text: "Please take time to review your estimate and the pictures attached. The pricing is based on the pictures provided from your site visit. \n", bold:true},
      {text: "Additional work outside of the estimate to be assessed and discussed on site with customer. Additional charge may apply. \n", bold: true},
      waterTest.text,
      stoneWindowSills.content,
      repairGrindParge.content,
      stoneRefacingSlices.content,
      completeStonerefacing.content,
      additionalWork.content,
      OBC.content,
      NBC.content,
      concreteSteps.content,
      retainingWalkout.content,
      chimney.content,
      windowSills.text,
      pargeConcreteExterior.content,
      copingStone.content,
      flashingWeepers.text,
      exteriorWaterprooinfg.content,
      tuckPointing.content,
      flagStone.content,
      indiaBanas.content,
      pwarranty.content,
      fwarranty.content,
    ],
    styles: {
      header: {
        fontSize: 32,
        bold: true,
        marginRight: 60,
        marginTop: 5,
      },
      estimate: {
        fontSize: 30,
      },
      logo: {
        bottom: 900,
        position: 'relative',
      },
      heading: {
        fontSize: 18,
        bold: true,
      },
      tableExample: {
        margin: [0, 5, 0, 15],
      },
    },
  };

  
 const printer = new PDFMake(fonts);
 const pdfDoc = printer.createPdfKitDocument(docDefinition);
 pdfDoc.pipe(fs.createWriteStream(`documents/${customer.firstName}${customer.lastName}Estimate.pdf`));
 pdfDoc.end();



 return true
 
};

export default pdfMakeEstimate;
