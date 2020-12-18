import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
} from '@material-ui/core'
import {
  AddCircleOutline,
  ExpandMore,
} from '@material-ui/icons';
import './quick-recs.css';
import pacifier1 from '../../img/recs/parent-pacifier/pacifier1.png';
import pacifier2 from '../../img/recs/parent-pacifier/pacifier2.png';
import pacifier3 from '../../img/recs/parent-pacifier/pacifier3.png';
import pacifier4 from '../../img/recs/parent-pacifier/pacifier4.png';
import booties1 from '../../img/recs/parent-booties/booties1.png';
import booties2 from '../../img/recs/parent-booties/booties2.png';
import booties3 from '../../img/recs/parent-booties/booties3.png';
import booties4 from '../../img/recs/parent-booties/booties4.png';

function QuickRecs() {
  const recommendations = [
    {
      title: 'Pacifiers for the parent...',
      items: [
        {
          label: 'tired of looking for lost pacifiers hidden in dark corners',
          img: pacifier1,
          url: 'https://www.target.com/p/mam-glow-in-the-dark-night-pacifier-0-6-months-2ct-green/-/A-75454632?ref=tgt_adv_XS000000&AFID=google_pla_df&fndsrc=tgtao&DFA=71700000012510679&CPNG=PLA_Baby%2BShopping&adgroup=SC_Baby_High%2BMargin&LID=700000001170770pgs&LNM=PRODUCT_GROUP&network=g&device=c&location=9067609&targetid=pla-923670360630&ds_rl=1242884&ds_rl=1246978&ds_rl=1248099&gclid=Cj0KCQiAzZL-BRDnARIsAPCJs70Ki_0PXyO8zYc_TTOm1njzS3mAhBkGDXzI7rQI6qOWkoVkz3Ff-E8aAqqDEALw_wcB&gclsrc=aw.ds'
        },
        {
          label: 'that needs to assist in keeping pacifier in their little one\'s mouth',
          img: pacifier2,
          url: 'https://www.amazon.com/WubbaNub-WN024-Elephant-Pacifier/dp/B0047PAHUW/ref=sr_1_8?m=A32VEP1U5Q7HGC&s=merchant-items&ie=UTF8&qid=1542388017&sr=1-8'
        },
        {
          label: 'that wants something aesthetically pleasing',
          img: pacifier3,
          url: 'https://www.ryanandrose.co/products/cutie-pat-flat?variant=32822992371766&currency=USD&utm_medium=product_sync&utm_source=google&utm_content=sag_organic&utm_campaign=sag_organic&gclid=Cj0KCQiAzZL-BRDnARIsAPCJs73mBBDsHBn22CAktiJldADg8_6ABGAyXNpW_C_ceICJkbjXz7FpWN8aAj-EEALw_wcB'
        },
        {
          label: 'that wants something similar to bottle nipples',
          img: pacifier4,
          url: 'https://www.target.com/p/philips-avent-soothie-0-3m-green-2pk/-/A-13956486?ref=tgt_adv_XS000000&AFID=google_pla_df&fndsrc=tgtao&DFA=71700000012735142&CPNG=PLA_Baby%2BShopping_Local&adgroup=SC_Baby_Low%2BMargin&LID=700000001170770pgs&LNM=PRODUCT_GROUP&network=g&device=c&location=9067609&targetid=pla-974917147852&ds_rl=1242884&ds_rl=1246978&ds_rl=1248099&gclid=Cj0KCQiAzZL-BRDnARIsAPCJs73MvCjCGKTC5260gI2sGALbRJvwMmQWtFr9vNSIf3K2MnnJjvtSV1EaAtGEEALw_wcB&gclsrc=aw.ds'
        }
      ]
    }, 
    {
      title: 'Booties for the parent...',
      items: [
        {
          label: 'looking for cute things but always at a discounted price',
          img: booties1,
          url: 'https://www.carters.com/carters-baby-boy-socks/V_1I692910.html'
        },
        {
          label: 'who has a stylish little one',
          img: booties2,
          url: 'https://www.nike.com/t/jordan-1-baby-crib-bootie-0ZXFgC/AT3745-109?nikemt=true&cp=26375363928_search_%7cPRODUCT_GROUP%7cGOOGLE%7c71700000041489776%7cAll_X_X_X_X-Device_X_Jordan-Clearance_X%7c%7cc&&ds_e_ad_type=pla&gclid=Cj0KCQiAzZL-BRDnARIsAPCJs72jO9a9FqrfXvyKpjESiWwtExBwpibpuOI2Prphtued9K51G3HsKiMaApIdEALw_wcB&gclsrc=aw.ds'
        },
        {
          label: 'who has a little one always able to David Blaine out of their booties off',
          img: booties3,
          url: 'https://zutano.com/products/cozie-fleece-baby-bootie-heather-gray?gclid=Cj0KCQiAzZL-BRDnARIsAPCJs71s-IHCjrBMMM9ZUqAIBXqw3Z6GrppkiAj_VS-Xeg3Ns7BSP4AqmXAaAt-DEALw_wcB'
        },
        {
          label: 'whose baby needs a little extra width room',
          img: booties4,
          url: 'https://seekairun.com/cruz-ii-brown-polar-bear/'
        }
      ]
    }
  ];

  return (
    <div className="quick-recs">
      <h1>Quick Recommendations</h1>
      <p>Item recommendations to meet the need for all types of parents and children.</p>
      {/*{recommendations.map(r => (
        <>
          <h2>{r.title}</h2>
          <div className="standard-flex-box mb-30" style={{ textAlign: 'center' }}>
            {r.items.map(item => (
              <div className="col-2 item-box">
                {item.label}
                <br />
                <br />

                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  <img className="item-img" src={item.img} alt="pacifier" />
                  <br />
                  View Item
                </a>

                <div className="mt-30 secondary-color" style={{ cursor: 'pointer' }}>
                  <div className="add-icon"><AddCircleOutline size="small" /></div>
                  <div className="add-label"> Add Item to Your List</div>
                </div>
              </div>
            ))}
          </div>
        </>
      ))} */}

      {recommendations.map(r => (
        <Accordion key={r}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <h3 className="a-title">{r.title}</h3>
            <div className="a-img-container">
              {r.items.map(item => <img style={{height: '75px'}} src={item.img} alt="pacifier" /> )}
            </div>
          </AccordionSummary>
          <AccordionDetails className="standard-flex-box">
            {r.items.map(item => (
              <Card className="col-2 item-box" variant="outlined">
                <div className="item-title">
                  {item.label}
                </div>

                <div className="mt-15">
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    <img className="item-img" src={item.img} alt="pacifier" />
                    <br />
                    View Item
                  </a>
                </div>

                <div className="mt-30 secondary-color" style={{ cursor: 'pointer' }}>
                  <div className="add-icon"><AddCircleOutline size="small" /></div>
                  <div className="add-label"> Add Item to Your List</div>
                </div>
              </Card>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  )
}

export default QuickRecs;