import React from 'react';
import path from 'path';
import { grey200 } from 'material-ui/styles/colors';

import "react-image-gallery/styles/css/image-gallery.css";

import ImageGallery from 'react-image-gallery';

const handleImageLoad = (event) => {
    console.log('Image loaded ', event.target);
};

const styles = {
  paperStyle: {
    height: '45%',
    width: '90%',
    margin: 'auto',
    marginTop: '2%',
    backgroundColor: grey200,
  },
  photoStyle: {
    marginLeft: '20%',
    marginRight: '25%',
    marginTop: '10%',

  },
  uploadButton: {
    verticalAlign: 'middle',
  },
  uploadInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
  text: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'left',
  },
};



const Chimneys = () => (
  <div>
    <div
      style={styles.text}
    >
      <ul>
        <li >Please upload photos showing at least two sides of the chimney, include areas where damaged bricks are visible. </li>
        <li>Please show how TLP would access the work area with our scaffolding</li>
        <li>If possible please provide us with a close up photo of the brick in use, including its measurements</li>
      </ul>
    </div>
    <div
      style={styles.paperStyle}
    >
    <div
     style={{ backgroundColor: 'transparent' }}
    >
    <ImageGallery
      items={[
       { original: 'https://s3.ca-central-1.amazonaws.com/tlpm/web/chimney1.jpg' },
       { original: 'https://s3.ca-central-1.amazonaws.com/tlpm/web/chimney2.jpg' },
       { original: 'https://s3.ca-central-1.amazonaws.com/tlpm/web/chimney3.jpg' },
       { original: 'https://s3.ca-central-1.amazonaws.com/tlpm/web/chimney4.jpg' },
      ]}
      slideInterval={2000}
      onImageLoad={handleImageLoad}
      showThumbnails={false}
      showFullscreenButton={false}
      showPlayButton={false}
    />
    </div>
    </div>
  </div>
);


const Flagstone = () => (
  <div>
    <div style={styles.text}>
      <ul>
        <li> Please upload photos that show the complete area of your proposed
             project including width/length mesurements
        </li>
        <li>For porches please provide width/length measurements
            of landing and width of steps.
         </li>
      </ul>
    </div>
    <div
      style={styles.paperStyle}
    >
      <ImageGallery
        items={[
          { original: 'https://s3.ca-central-1.amazonaws.com/tlpm/web/flagstone1.JPG' },
          { original: 'https://s3.ca-central-1.amazonaws.com/tlpm/web/flagstone2.JPG' },
          { original: 'https://s3.ca-central-1.amazonaws.com/tlpm/web/flagstone3.JPG' },
        ]}
        slideInterval={2000}
        onImageLoad={handleImageLoad}
        showThumbnails={false}
        showFullscreenButton={false}
        showPlayButton={false} 
      />
    </div>
  </div>
);


const Windowsills = () => (
   <div>
    <div style={styles.text}>
      <ul>
        <li >Please upload photos that show each side of property clearly.
        </li>
        <li> Provide a measurement in inches of any sill to be replaced
        </li>
        <li> Take measurement of sill not window size.
        </li>
      </ul>
    </div>
     <div
       style={styles.paperStyle}
     >
       <ImageGallery
         items={[
          { original: 'https://s3.ca-central-1.amazonaws.com/tlpm/web/windowsills1.JPG' },
          { original: 'https://s3.ca-central-1.amazonaws.com/tlpm/web/windowsills2.JPG' },
          { original: 'https://s3.ca-central-1.amazonaws.com/tlpm/web/windowsills3.JPG' },
         ]}
         slideInterval={2000}
         onImageLoad={handleImageLoad}
         showThumbnails={false}
         showFullscreenButton={false}
         showPlayButton={false}
       />
     </div>
   </div>
);

const Brickrepair = () => (
  <div>
    <div style={styles.text}>
      <ul>
        <li >Brick Repairs: Tuckpointing & Brick Replacement.
        </li>
        <li>Example for flagstones
        </li>
        <li>Example for masonry
        </li>
        <li>Example for porch
        </li>
        <li>Example for stonework
        </li>
      </ul>
    </div>
    <div
      style={styles.paperStyle}
    >
      <ImageGallery
        items={[
          { original: 'https://s3.ca-central-1.amazonaws.com/tlpm/web/brick1.JPG' },
          { original: 'https://s3.ca-central-1.amazonaws.com/tlpm/web/brick2.JPG' },
          { original: 'https://s3.ca-central-1.amazonaws.com/tlpm/web/brick3.JPG' },
          { original: 'https://s3.ca-central-1.amazonaws.com/tlpm/web/brick4.JPG' },

        ]}
        slideInterval={2000}
        onImageLoad={handleImageLoad}
        showThumbnails={false}
        showFullscreenButton={false}
        showPlayButton={false}
      />
    </div>
  </div>
);
const WaterProofing = () => (
    <div>
    <div style={styles.text}>
      <ul>
        <li >Photo to show complete side of property to be waterproofed
        </li>
        <li>Take measurements of wall corner to corner
           </li>
               <li>Give details of foundation material, eg concrete/block etc
          </li>
      </ul>
    </div>
    <div
      style={styles.paperStyle}
    >
      <ImageGallery
        items={[
          { original: 'https://s3.ca-central-1.amazonaws.com/tlpm/web/waterproofing1.JPG' },
          { original: 'https://s3.ca-central-1.amazonaws.com/tlpm/web/waterproofing2.JPG' },
        ]}
        slideInterval={2000}
        onImageLoad={handleImageLoad}
        showThumbnails={false}
        showFullscreenButton={false}
        showPlayButton={false} 
      />
    </div>
  </div>
);
const Concrete = () => (
    <div>
    <div style={styles.text}>
      <ul>
        <li >We require  3 pictures for porches showing the front,left side & right side
        </li>
        <li>Take measurements for width & length of landing and the width for any steps
        </li>
        <li>Walkways/garages/pads etc we require width and length of area
        </li>
      </ul>
    </div>
    <div
      style={styles.paperStyle}
    >
      <ImageGallery
        items={[
          { original: 'https://s3.ca-central-1.amazonaws.com/tlpm/web/concrete1.JPG' },
          { original: 'https://s3.ca-central-1.amazonaws.com/tlpm/web/concrete2.JPG' },
          { original: 'https://s3.ca-central-1.amazonaws.com/tlpm/web/concrete3.JPG' },
          { original: 'https://s3.ca-central-1.amazonaws.com/tlpm/web/concrete4.JPG' },

        ]}
        slideInterval={2000}
        onImageLoad={handleImageLoad}
        showThumbnails={false}
        showFullscreenButton={false}
        showPlayButton={false} 
        
      />
    </div>
  </div>
);

const Foundation = () => (
     <div>
    <div style={styles.text}>
      <ul>
        <li >We require photos of the complete sides of your property foundation.
        </li>
        <li>For garage piers a photo of all front piers in 1 photo
        </li>
      </ul>
    </div>
    <div
      style={styles.paperStyle}
    >
      <ImageGallery
        items={[
          { original: 'https://s3.ca-central-1.amazonaws.com/tlpm/web/parging1.jpg' },
          { original: 'https://s3.ca-central-1.amazonaws.com/tlpm/web/parging2.JPG' },
          { original: 'https://s3.ca-central-1.amazonaws.com/tlpm/web/parging3.jpg' },

        ]}
        slideInterval={2000}
        onImageLoad={handleImageLoad}
      />
    </div>
  </div>
);

const Retaining = () => (
    <div>
    <div style={styles.text}>
      <ul>
        <li >Provide photos from distance, showing the entire existing  wall and steps or area new wall is to be installed
         </li>
        <li>Provide measurements for the length and height of existing/proposed new wall
         </li>
        <li>If steps are part of the retaining wall please measure the width of the steps.
         </li>
      </ul>
    </div>
    <div
      style={styles.paperStyle}
    >
      <ImageGallery
        items={[
          { original: 'https://s3.ca-central-1.amazonaws.com/tlpm/web/retaining1.jpg' },
          { original: 'https://s3.ca-central-1.amazonaws.com/tlpm/web/retaining2.jpg' },
          { original: 'https://s3.ca-central-1.amazonaws.com/tlpm/web/retaining1.jpg' },
        ]}
        slideInterval={2000}
        onImageLoad={handleImageLoad}
        showThumbnails={false}
        showFullscreenButton={false}
        showPlayButton={false} 
      />
    </div>
  </div>
);

export {
    Chimneys,
    Flagstone,
    Windowsills,
    Brickrepair,
    WaterProofing,
    Concrete,
    Foundation,
    Retaining,
};
