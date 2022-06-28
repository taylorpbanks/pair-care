import React, { useEffect, useState, useRef, useMemo } from 'react';
import './index.css'
import Helmet from 'react-helmet';
import TinderCard from 'react-tinder-card'
import crib from '../../img/concept/crib.jpg'
import seating from '../../img/concept/seating-1.jpg'
import changingTable from '../../img/concept/changing-table-1.jpg'
import pacifier1 from '../../img/recs/parent-pacifier/pacifier1.png';
import { Button } from '@material-ui/core';
import {
  ThumbUp,
  ThumbDown
} from '@material-ui/icons';
import { Link } from 'react-router-dom';

function Pick({}) {
  useEffect(() => {
    document.title = 'Pick your favorite'
  }, []);

  const db = [
    {
      name: 'Pacey4 Daze',
      url: pacifier1
    },
    {
      name: `Crib O'matic`,
      url: crib
    },
    {
      name: 'Changing Dreams 2000',
      url: changingTable
    },
    {
      name: 'Cloud Comfort Chait',
      url: seating
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(db.length - 1)
  const [lastDirection, setLastDirection] = useState()
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex)

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  )

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  const canGoBack = currentIndex < db.length - 1

  const canSwipe = currentIndex >= 0

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction)
    updateCurrentIndex(index - 1)
  }

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  }

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < db.length) {
      await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
    }
  }

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return
    const newIndex = currentIndex + 1
    updateCurrentIndex(newIndex)
    await childRefs[newIndex].current.restoreCard()
  }

  return (
    <div className="pick-component">
      <Helmet
      title="Baby Quick Pick List | Pair Care"
      meta={[
        {
          name: 'description',
          content: `A quiz to help get started a baby list to quick pick your favorite items`
        }
      ]}
    />
      <h1>Quick Pick List</h1>
      <p className="mb-60">Just getting started and need a little extra help on what you like and don't like?  <strong>Swipe right</strong> on things you like.</p>
    
      <div className='cardContainer'>
        {db.map((character, index) => (
          <TinderCard
            ref={childRefs[index]}
            className='swipe'
            key={character.name}
            onSwipe={(dir) => swiped(dir, character.name, index)}
            onCardLeftScreen={() => outOfFrame(character.name, index)}
          >
            <div
              style={{ backgroundImage: 'url(' + character.url + ')' }}
              className='card'
            >
              <h3>{character.name}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
      {currentIndex === -1 && (
        <div>
          <h2>Thanks, we have kick started your list with this information</h2>
          <Link to="/journey">Proceed to your list</Link>
        </div>
      )}
      <div className='buttons'>
        <Button
          variant="contained"
          color="secondary"
          style={{ backgroundColor: !canSwipe && '#c3c4d3' }}
          onClick={() => swipe('left')}
        >
          <ThumbDown /> &nbsp;&nbsp;Swipe left
        </Button>
        <Button variant="contained" style={{ backgroundColor: !canGoBack && '#c3c4d3', marginLeft: '15px' }} onClick={() => goBack()}>Undo swipe!</Button>
        <Button 
          variant="contained"
          color="primary"
          style={{ backgroundColor: !canSwipe && '#c3c4d3', marginLeft: '15px' }}
          onClick={() => swipe('right')}>
            <ThumbUp /> &nbsp;&nbsp;Swipe right
        </Button>
      </div>
      {lastDirection ? (
        <h2 key={lastDirection} className='infoText'>
          You swiped {lastDirection}
        </h2>
      ) : (
        <h2 className='infoText'>
          Start swiping!
        </h2>
      )}
    </div>
  )
}

export default Pick;
