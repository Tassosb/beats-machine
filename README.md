# Beats Machine, a Gazebo demo app

[Live](http://beats-machine.herokuapp.com/ "Live Link")

This is a beat-making web application built with two of my own libraries.
The backend is built with [Gazebo](https://github.com/Tassosb/gazebo "Gazebo Github"), a light-weight MVC framework that I made and turned into a ruby gem.
The frontend uses my DOM Manipulation and Ajax library, LionDOM.

## Beat Machine

The beat machine relies on the Tone.js library. It uses the Multiplayer and Sequence classes to play loops that source from up to six audio files.

## Beat CRUD

Users can sign up or log in to save beats that they've made. Upon saving, a XMLHttpRequest is sent with LionDOM to the backend. The beats controller receives the request and inserts a record into the database with the information sent up with the request. A beat's sound is stored as a string of 0's and 1's.

After logging in, all of the current user's beats are fetched from the database and displayed in the beat index sidebar. Logged-in users can click on a beat to view, play, or delete it.

Each major visual component has a corresponding javascript class that takes on rendering logic. Some of the more complicated components, such as the Matrix, delegate to more granular component classes, like Column and Tile. One of the struggles was writing modular classes while keeping all classes subscribed to a single source of state.


## Features to Implement

- Update beats
- Allow user to share beats by storing beat info in url
- Upload custom audio
