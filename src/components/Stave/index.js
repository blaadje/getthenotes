import React, { Component } from 'react';
import Vex from 'vexflow'

import notesArray from './notes'
import './style.scss'

const VF = Vex.Flow

class Stave extends Component {
  constructor (args) {
    super(args)
    this.state = {
      notes: [],
      currentIndex: 0
    }

    this.renderer = {}
    this.context = {}
    this.stave = {}
  }

  componentDidMount () {
    this.createStave()

    this.props.notes.map(([note, acc, octave], index) => this.createNote(note, acc, octave, index))
  }

  createStave () {
    const element = document.getElementById('boo')
    const height = element.offsetHeight
    const width = element.offsetWidth

    this.renderer = new VF.Renderer(element, VF.Renderer.Backends.SVG)
    this.renderer.resize(width, height)

    this.context = this.renderer.getContext()
    this.stave = new VF.Stave(10, 40, width)
    
    this.context.setFont('Arial', 10, '').setBackgroundFillStyle('#eed')

    this.stave.addClef(this.props.clef).addTimeSignature('4/4')
    this.stave.setContext(this.context).draw()
  }

  createNote (note, duration, octave, delay) {
    const tickContext = new VF.TickContext()
    const durations = ['8', '4', '2', '1']

    const createdNote = new VF.StaveNote({
      clef: this.props.clef,
      keys: [`${note}${duration}/${octave}`],
      duration: durations[Math.floor(Math.random()*durations.length)]
    })
      .setContext(this.context)
      .setStave(this.stave)

    this.setState(previousState => ({
      notes: [...previousState.notes, createdNote]
    }))
      
    tickContext.addTickable(createdNote)
    tickContext.preFormat().setX(delay * 100)
    createdNote.draw()
  }

  clickHandler (selectedNote) {
    this.state.notes.map((note, index) => {
      const keyNote = note.keyProps[0].key

      if (this.state.currentIndex === index) {
        if (selectedNote.key === keyNote) {
          note.setStyle({ fillStyle: 'green', strokeStyle: 'green' })
          note.setLedgerLineStyle({ strokeStyle: 'green' })
          return note.draw()
        }

        note.setStyle({ fillStyle: 'tomato', strokeStyle: 'tomato' })
        note.setLedgerLineStyle({ strokeStyle: 'tomato' })
        note.draw()
      }
    })

    this.setState({ currentIndex: this.state.currentIndex + 1 })
  }

  renderNotesButtons () {
    return notesArray.map((note, index) => {
      return (
        <button 
          key={index}
          onClick={() => this.clickHandler(note)}
        >
          {note.note}
        </button>
      )
    })
  }

  render() {
    return (
      <div>
        <div 
          id='boo'
          className='Stave-container'
        />
        <div className='Buttons-wrapper'>
          {this.renderNotesButtons()}
        </div>
      </div>
    )
  }
}

export default Stave
