import PDFMake from 'pdfmake';
import path from 'path';
import fs from 'fs';
import moment from 'moment';


const pdfMakeEstimate = (customer, generics, prices, surveyPhotos, customText) => {
  const genericText = {};
  // TEST VALUE (remove)

  const IMAGE_MAX_WIDTH = 730;
  const IMAGE_MAX_HEIGHT = 270;


  genericText.waterTest = {
    text: { stack: [
      { text: 'Waterproof Test', style: 'heading' },
      { text: 'A water test is the one and only way to truly troubleshoot where water is coming from. \n\n' },
      "You will need 2 people to conduct this water test - one on the inside and the other on the outside with the hose. Firstly, let's follow the law of gravity. We know water runs downhill so it makes no sense to put water any place on the elevation other than the very bottom (which is on the grass or concrete pavement etc. at the foundation). Just let the water sit and flow from the hose. With one person on the inside monitoring and after no more than 15 minutes of steady flow from a garden hose, if there is no moisture coming in then we know your below-grade foundation is good. The next junction is where the concrete meets the brick work or veneer. If there is not adequate flashing and weepers than that can also cause your water problem. But the water test and hose will tell you that after no more than 15 minutes with somebody monitoring on the inside. If there is still no evidence of water, keep raising the water (no more than 2 feet in height at a time) whether it be glass doors / windowsills / brickwork etc. Keep on going as one time we found that the water showing up on the basement floor actually originated from voids in mortar joints that were on the second floor a long way from the basement floor. \n\nYou may conduct this test yourself as explained, or we can provide the test for you for $500 plus HST. This will be discounted from the repair work should you require and accept our services.",
    ],
      style: 'textSection' },
  };

  genericText.stoneWindowSills = {
    content: { stack: [
    { text: 'Stone Window Sills', style: 'heading' },
      { ul: [
        'New limestone sills to be 3" or 4" depending on size of rough opening',
        'Sills come with rock face and custom cut drip edges (on-site) to reflect water away from masonry below',
        'Approximate 2 inch overhang with drip edge cut thoroughly through stone and mortar joints from end to end 1/4"deep (drip edge) and 1-1.5" away from the wall (drip edge)',
        "Sills are full length stones up to 6' in length (less mortar joints)",
        'Caulking at base where new sills meets window',
      ],
      },
      { text: '10 year warranty on workmanship and materials', bold: true },
    ],
      style: 'textSection' },
  };

  genericText.repairGrindParge = {
    content: { stack: [
      { text: 'Repair, Grind & Parge', style: 'heading' },
      { ul: [
        'We lightly grind every single square inch of concrete until the surface is completely clean. Missing a single square inch can and will cause the parge to breakdown.',
        'We repair all cracks and voids in foundation. Our parge includes 2-3” below grade and where there is interlock, we lift interlock, cut interlock if necessary and reset.',
        'We apply trowel on parge by pressing into place as evenly as possible. After initial setting finish, we parge with a float sandstone finish.\n\n',
      ],
      },
      { text: 'PARGING & COATING WARRANTY: Our parging and coating have a 5 year warranty provided you use only sand in the winter for icy conditions. All other products cause damage to concrete, parge and coatings. Small bags of construction sand can be purchased at Home Depot.' },
    ],
      style: 'textSection' },
  };

  genericText.stoneRefacingSlices = {
    content: { stack: [
    { text: 'Stone Refacing Slices - Remove siding and/or trim work from around windows', style: 'heading' },
      { ul: [
        'Install minimum 3/8\" to 3/4\" thick plywood',
        'Cover new plywood with water resistant paint or primer',
        'Install real natural limestone 3" thick window sills complete with rock face and drip edge',
        'Caulk and seal all new work where required',
      ],
      },
      { text: '10 year warranty on workmanship and materials', bold: true },
    ],
      style: 'textSection' },
  };

  genericText.completeStonerefacing = {
    content: { stack: [
    { text: 'Complete Stone Refacing', style: 'heading' },
      { ul: [
        'Remove and haul away existing brick if required',
        'Install new vapour barrier and rubber membrane flashing if required',
        'Install limestone address plaque',
        'Reattach light fixtures or install new lights (customer supplied)',
        'Caulk and seal all new work where required',
      ],
      },
      { text: '10 year warranty on workmanship and materials', bold: true },
    ],
      style: 'textSection' },
  };

  genericText.OBC = {
    content: { stack: [
    { text: 'Ontario Building Code (OBC) — Sidewalk / Garage Pad / Slab', style: 'heading' },
      { ul: [
        'Remove existing slab if required and prepare',
        'Install 2" HPB aggregates',
        'Install 6"x6" wire mesh to centre of new concrete',
        'Pour/place 32 MPA ready-mix concrete, 4" thick',
        'Float or broom finish ',
      ],
      },
      { text: '2 year warranty on workmanship and materials', bold: true },
    ],
      style: 'textSection' },
  };

  genericText.NBC = {
    content: { stack: [
    { text: 'National Building Code (NBC) — Sidewalk / Garage Pad / Slab', style: 'heading' },
      { ul: [
        'Remove existing slab or concrete',
        'Drill 4 foot deep pilings 10 inches in diameter and a minimum of 5 foot intervals',
        'Install 15 mm steel rebar in centre of pilings',
        'Install 6" x 6" wire mesh to centre of new concrete',
        'Pour/place 32 mpa ready-mix concrete (4"- 8" thick)',
        'Float or broom finish',
      ],
      },
      { text: '20 year warranty on workmanship and materials', bold: true },
    ],
      style: 'textSection' },
  };

  genericText.concreteSteps = {
    content: { stack: [
    { text: 'Concrete Steps / Landing / Treads / Risers', style: 'heading' },
      { ul: [
        'Remove existing landing, treads/ risers',
        'Drill and install 4 foot deep pilings 10 inches in diameter at a maximum of 5 foot intervals at all grades including treads and risers',
        'Build footings or foundations or both (depending on design)',
        'Reinforce all with 15m steel rebar',
        'Build solid concrete or "solid" fill concrete block (size to be determined on job site)',
        'Slabs to be reinforced with 6"x6" steel mesh overlapped a minimum of 6"',
        'Pour/place 32 mpa concrete',
        'Float or broom finish',
      ],
      },
      { text: '20 year warranty on workmanship and materials', bold: true },
    ],
      style: 'textSection' },
  };

  genericText.concreteCare = {
    content: { stack: [
        { text: 'Concrete Care', style: 'heading' },
        { text: 'We only recommend the use of coarse sand on your concrete/flagstone for winter conditions. All other products are harmful and may cause pitting or discolouration. A bag of coarse sand can be purchased at Home Depot.\n\n' },
        { text: 'Please note: our flagstone installation/restoration has a warranty for 5 years provided you use only sand in the winter for icy conditions. All other products cause damage to the mortar joints. Small bags of construction sand can be purchased at Home Depot.' },
    ],
      style: 'textSection' },
  };

  genericText.retainingWalkout = {
    content: { stack: [
    { text: 'Retaining Walk-Outs (NBC)', style: 'heading' },
      { ul: [
        'Remove existing walk out, landscaping, decking, fence etc. (if required) and haul away',
        'Drill and install 4 foot deep pilings, 10 inches in diameter at a maximum of 5 foot intervals at all grades, including treads and risers',
        'Build footings',
        'Reinforce all with 15 mm steel rebar. (OBC says No, NBC says Yes)',
        'Build solid concrete or "solid" fill concrete block (size to be determined on job site)',
        "Drill weepers after walls are constructed OR build into wall a minimum 1/4\" tubing to be located at very bottom of wall and at 2' intervals",
        'Weeper locations to have 3/4" clear gravel to act as a filter from native soils to ensure that the hydrostatic pressure is always being released, thereby taking a lot of pressure off the wall (OBC says No, NBC says Yes)',
        'Cover walls with parge if block (if concrete, no parge is required)',
        'Backfill and compress native soils into place or backfill with HPB aggregates',
      ],
      },
    ],
      style: 'textSection' },
  };

  genericText.chimney = {
    content: { stack: [
    { text: 'Chimney', style: 'heading' },
      { ul: [
        'Dismantle chimney to roofline/foundation/top only and rebuild with new brick to match as close as possible (no corbeling)',
        'Replace top glue liner(s)',
      ],
      },
      { text: 'New Cap', bold: true },
      { ul: [
        'Install full length 3" Indiana limestone CAP (no mitred corners)',
        '2" overhang with drip edge cut thoroughly through stone and mortar joints from end to end, 1/4” deep (drip edge) and 1-1.5" away from the wall',

      ] },
      { text: 'New Crown', bold: true },
      { ul: [
        'Install portland or type 10 mix 3-1 pre-hydrated or hydraulic mortar',
        'Top of crown to be sloped and feathered from 2" down to outer edge of limestone cap',
        'Apply fire rated caulking(orange or grey colour) around all flue liners (including gas)',

      ] },
      { text: 'Check Roof Flashing', bold: true },
      { ul: [
        'Re-attach flashing and caulk and ensure not even a pinhole exists.',
        'Clean roof, dismantle scaffolding, clean up little pigs mess and haul away',
      ] },
      { text: '10 year warranty on workmanship and materials', bold: true },

    ],
      style: 'textSection' },
  };

  genericText.copingStone = {
    content: { stack: [
    { text: 'Coping Stone', style: 'heading' },
      { ul: [
        'Install full length 3 inch Indiana limestone CAP (no mitred corners)',
        '2" overhang with drip edge cut thoroughly through stone and mortar joints from end to end, 1/4"deep (drip edge) and 1-1.5" away from the wall',
      ],
      },
    ],
      style: 'textSection' },
  };

  genericText.flashingWeepers = {
    text: { stack: [
    { text: 'Flashing / Weeper / Plugged Weepers', style: 'heading' },
    { text: 'Through the wall flashing (behind the brick) and clean active weepers should be located at: the top of foundation walls, all openings, and the top of all grade levels and landings (in other words, whatever is exposed to the environment). \n\n Brick (masonry units) absorb water, but when it gets behind the brick (cavity) it needs a place to vent. This is where weepers come in, providing they are functional and are even present. \n\n Without weepers, or plugged weepers, water becomes trapped in the cavity and slowly starts to erode the brick from the inside out, or worse yet, starts entering inside the building, causing mold and other issues. \n\n We also want to protect the exterior face by applying a parge to the new masonry, to ensure that the exterior is repelling the moisture away rather then absorbing the water that it is usually exposed to.\n\n' },
      { ul: [
        'Remove at least 2 courses of brick',
        'Shore up brickwork above',
        'Install new flashing',
        'Install new brick',
        'Ensure weepers are installed',
        'Clean weepers after process',
        'Parge outside of new masonry (UNLESS OTHERWISE SPECIFIED)',
      ] },
    { text: '10 year warranty on workmanship and materials', bold: true },
    ],
      style: 'textSection' },
  };

  genericText.exteriorWaterproofing = {
    content: { stack: [
    { text: 'Exterior Waterproofing', style: 'heading' },
      { ul: [
        'Excavate down to footings ensuring the width is wide enough for the safety of our workers',
        'Wire brush and clean foundation wall and footing',
        'Repair all cracks and voids in wall by first V jointing all cracks (minimum 1" deep) prior to installing pre-hydrated or hydraulic mortar',
        'Parge wall only if it is made of blocks or bricks (solid concrete okay)',
        'Replace weeping tile if one exists, and/or needs replacement.',
        'Cover wall with either a trowel on liquid rubber membrane or sheets of blue skin rubber membrane',
        'Backfill and compress (tamp) native soil back into place or backfill with HPB aggregates (depending on weather and/or location)',
        'Concrete (Extra Work)',
        'Asphalt (Extra Work)',
        'Stone (Extra Work)',
        'Re-sodding and/or Interlock (Extra Work)',
      ] },
     { text: '20 year warranty on workmanship and materials', bold: true },
    ],
      style: 'textSection' },
  };

  genericText.tuckpoint = {
    content: { stack: [
    { text: 'Tuckpointing', style: 'heading' },
      { ul: [
        'Grind out mortar joints to a minimum depth of 3/4"',
        'Using a blower remove dust from mortar joints and from face of wall',
        'Slick in with pre-hydrated mortar',
        'Clean up and remove debris from site',
      ] },
     { text: '10 year warranty on workmanship and materials', bold: true },
    ],
      style: 'textSection' },
  };

  genericText.flagStone = {
    content: { stack: [
      { text: 'Flagstone', style: 'heading' },
      { ul: [
        'We install Banas stone, sandstone, natural stone or limestone',
        'Square cut',
        'Full piece treads (as few mortar joints as possible on coping area)',
        'Overhang with drip edges\n\n',
      ] },
      { text: 'FLAGSTONE WARRANTY: Our flagstone installation has a warranty for 5 years provided you use only sand in the winter for icy conditions. All other products cause damage to the mortar joints. Small bags of construction sand can be purchased at Home Depot.' },
    ],
      style: 'textSection' },
  };

  genericText.fwarranty = {
    content: { stack: [
    { text: 'FLAGSTONE WARRANTY: Our flagstone installation has a warranty for 5 years provided you use only sand in the winter for icy conditions. All other products cause damage to the mortar joints. Small bags of construction sand can be purchased at Home Depot.' },
    ],
      style: 'textSection' },
  };

  genericText.pwarranty = {
    content: { stack: [
    { text: 'PARGING & COATING WARRANTY: Our parging and coating have a 5 year warranty provided you use only sand in the winter for icy conditions. All other products cause damage to concrete, parge and coatings. Small bags of construction sand can be purchased at Home Depot.' },
    ],
      style: 'textSection' },
  };

  genericText.disclaimerA = {
    content: { stack: [
    { text: 'Please Note: Additional work outside of the estimate to be assessed and discussed onsite with customer.' },
    ],
      style: 'textSection' },
  };

  genericText.disclaimerS = {
    content: { stack: [
    { text: 'Warranties as stated or until structural movement or work done by others affects our work.' },
    ],
      style: 'textSection' },
  };

  genericText.disclaimerAS = {
    content: { stack: [
    { text: 'Please Note: Additional work outside of the estimate to be assessed and discussed onsite with customer. Warranties as stated or until structural movement or work done by others affects our work.' },
    ],
      style: 'textSection' },
  };

  genericText.tuckpointUniform = {
    content: { stack: [
      { text: 'For uniformity to the look and long term weather proofing of your masonry we recommend you consider Tuckpointing complete elevations rather than patch repairs.' },
      { text: 'This should also include RGP parge minimum 8" from grade around property where accessible.' }],
      style: 'textSection' },
  };

  genericText.surveyInvite = {
    content: { stack: [
    { text: 'If you are interested in using our services we can arrange for one of our surveyors to visit your property. Estimate may change as a result of the survey.' },
    ],
      style: 'textSection' },
  };

  genericText.surveyInviteDave = {
    content: { stack: [
    { text: 'If you are interested in using our services a further site visit will be required from the owner David Fritz to discuss details etc. Estimate may change as a result of this consultation.' },
    ],
      style: 'textSection' },
  };

  genericText.customerClean = {
    content: { stack: [
    { text: 'Customer to arrange timber decking/handrails etc. to be removed before our work begins and re-installed after our work is done.' },
    ],
      style: 'textSection' },
  };

  genericText.existingConcrete = {
    content: { stack: [
    { text: 'Your existing concrete porch steps/landing show signs of moving so are not structurally solid. Any stones you put on its surface will not last as the movement will break the mortar joints between the stones. Without continually filling these joints, water will get in the broken joints, will freeze, expand, and accelerate the rate of damage.' },
    ],
      style: 'textSection' },
  };

  genericText.custom = {
    content: { stack: [
    { text: customText },
    ],
      style: 'textSection' },
  };
  const fonts = {
    Roboto: {
      normal: path.join(__dirname, '../../assets/fonts/Roboto-Regular.ttf'),
      bold: path.join(__dirname, '../../assets/fonts/Roboto-Medium.ttf'),
      italics: path.join(__dirname, '../../assets/fonts/Roboto-Italic.ttf'),
    },
    Verdana: {
      normal: path.join(__dirname, '../../assets/fonts/Verdana-Regular.ttf'),
      bold: path.join(__dirname, '../../assets/fonts/Verdana-Bold.ttf'),
    },
  };

  // --------------------------------------------------------------------------
  // Build document
  const docDefinition = {
    pageSize: 'LETTER',
    pageMargins: [40, 60, 40, 70],

    footer: [
      horizontalLine(),
      { text: 'Three Little Pigs Masonry 14845 YongeSt., Unit6-Suite322, Aurora, ON, L4G 6H8', alignment: 'center' },
      { text: '905-508-0500  416-595-0100', alignment: 'center' },
    ],

    content: { stack: [
      { image: path.join(__dirname, '../../assets/images/3lplogo.jpg'),
        width: 325,
        height: 325,
        alignment: 'center',
      },

     { text: 'Estimate', alignment: 'center', style: 'estimate' },
     { text: `Prepared for ${customer.firstName} ${customer.lastName}`, alignment: 'center', bold: true, style: 'subheading' },
     { text: `${customer.address}`, alignment: 'center' },
     { text: `${moment().format('dddd, MMMM Do YYYY')}`, alignment: 'center' },

     { text: 'Our Thanks', style: 'heading', id: 'startOfContent' },
     { text: 'Three Little Pigs Masonry would like to thank you for the opportunity to quote on your project. Why choose Three Little Pigs Masonry? Since 2004, Three Little Pigs Masonry has grown to become a trusted name in masonry and concrete throughout the GTA. With over 40 years experience and with actual masonry and concrete experts at the helm, your satisfaction is our main priority. \n\n Three Little Pigs Masonry will not leave your property until you are completely satisfied and our warranties reflect our confidence in our ability to provide the best in masonry and concrete. \n', style: 'textSection' },

     { text: '\nPlease take time to review your estimate and the pictures attached. The pricing is based on the pictures provided from your site visit. \n\n', bold: true },
     { text: 'Additional work outside of the estimate will be assessed and discussed on-site with the customer. Additional charges may apply. \n\n', bold: true },
     { text: 'If you wish to proceed with your estimate, please respond to this email or contact Barbara at (416)595-0100 EXT 102 \n\n' },
     { text: 'Please feel free to call with any questions regarding this estimate. Darren Pryke, our chief estimator, can be reached at (416)595-0100 extension 106.' },

      writeGenericText(generics, genericText),

      { stack: [
       { text: 'Pricing Summary', alignment: 'center', style: 'heading' },
        { table: { widths: [400, 100],
          body: prices,
        },
          style: 'pricingTable',
        },
      ],
        style: 'textSection',
        id: 'pricingTable' },

      createSitePhotos(surveyPhotos),

    ],
      font: 'Verdana' },

    // Note: the page breaks were messing up the site photos section layout, so I added extra logic to not line-break if the node has an id of 'photos'.
    // Line breaks are also set for the start of main text content, and before the pricing table.
    // The id tags on the content blocks are only used to manage these line breaks.
    pageBreakBefore(currentNode, followingNodesOnPage, nodesOnNextPage, previousNodesOnPage) {
      return (
              (currentNode.pageNumbers.length > 1 && previousNodesOnPage.length !== 0 && currentNode.id != 'photos')
              || currentNode.id === 'startOfContent'
              || currentNode.id === 'pricingTable'
      );
    },

    styles: {
      header: {
        fontSize: 32,
        bold: true,
        marginRight: 60,
        marginTop: 0,
      },
      footer: {
        marginTop: 10,
      },
      estimate: {
        fontSize: 30,
        marginTop: -20,
        marginBottom: 5,
      },
      logo: {
        bottom: 900,
        position: 'relative',
      },
      heading: {
        font: 'Roboto',
        fontSize: 17,
        bold: true,
        marginBottom: 5,
      },
      subheading: {
        fontSize: 14,
        bold: true,
        marginBottom: 5,
      },
      sitePhoto: {
        marginBottom: 20,
      },
      pricingTable: {
        margin: [0, 10, 0, 15],
      },
      textSection: {
        marginTop: 10,
        marginBottom: 10,
      },
    },
  };

  // Write the text for the selected services based on an array (object) of boolean flags
  function writeGenericText(selected, genericText) {
    return (
    [
      selected.watertest ? genericText.waterTest.text : '',
      selected.sills ? genericText.stoneWindowSills.content : '',
      selected.pargeex ? genericText.repairGrindParge.content : '',
      selected.refacingSlices ? genericText.stoneRefacingSlices.content : '',
      selected.refacingComplete ? genericText.completeStonerefacing.content : '',
      selected.obc ? genericText.OBC.content : '',
      selected.nbc ? genericText.NBC.content : '',
      selected.concreteSteps ? genericText.concreteSteps.content : '',
      selected.concreteCare ? genericText.concreteCare.content : '',
      selected.retaining ? genericText.retainingWalkout.content : '',
      selected.chimney ? genericText.chimney.content : '',
      selected.coping ? genericText.copingStone.content : '',
      selected.flashing ? genericText.flashingWeepers.text : '',
      selected.waterproofing ? genericText.exteriorWaterproofing.content : '',
      selected.tuckpoint ? genericText.tuckpoint.content : '',
      selected.flagstone ? genericText.flagStone.content : '',
      selected.disclaimerA ? genericText.disclaimerA.content : '',
      selected.disclaimerS ? genericText.disclaimerS.content : '',
      selected.disclaimerAS ? genericText.disclaimerAS.content : '',
      selected.tuckpointUniform ? genericText.tuckpointUniform.content : '',
      selected.surveyInvite ? genericText.surveyInvite.content : '',
      selected.surveyInviteDave ? genericText.surveyInviteDave.content : '',
      selected.customerClean ? genericText.customerClean.content : '',
      selected.existingConcrete ? genericText.existingConcrete.content : '',
      selected.custom ? genericText.custom.content : '',
      selected.pwarranty ? genericText.pwarranty.content : '',
      selected.fwarranty ? genericText.fwarranty.content : '',
    ]
    );
  }


  // Generate the list of site photos
  function createSitePhotos(photos) {
    return (
    { stack: [
        { text: '', pageBreak: 'before' },
        { text: 'Photos From Site Survey\n\n', style: 'heading', alignment: 'center' },

      { stack: photos.map(sitePhoto => (
        { stack: [
                { image: sitePhoto.photo, alignment: 'center', fit: [IMAGE_MAX_WIDTH, IMAGE_MAX_HEIGHT] },
                { text: sitePhoto.caption, alignment: 'center' },
        ],
          style: 'sitePhoto' }
            )),
        id: 'photos',
      },

    ],
      id: 'photos' }
    );
  }

  // create a thin vector horizontal separator line
  function horizontalLine() {
    return { canvas: [{ type: 'line', x1: 215, y1: 2, x2: 400, y2: 2, lineWidth: 0.5 }], marginBottom: 10, alignment: 'center' };
  }


  const printer = new PDFMake(fonts);
  const pdfDoc = printer.createPdfKitDocument(docDefinition);
  pdfDoc.pipe(fs.createWriteStream(`documents/${customer.firstName}${customer.lastName}Estimate.pdf`));
  pdfDoc.end();
  return true;
};

export default pdfMakeEstimate;