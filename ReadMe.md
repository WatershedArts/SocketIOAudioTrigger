## Remote Audio Trigger

### Introduction

This is a prototype for triggering audio content remotely using NodeJS and socket.io.

### Usage

We deployed our project on Heroku.

See their [guide on how to deploy.](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction)

Put all audio files into the `public/audio/` folder.
To add tracks open the config.json file in the same folder. 

There are two listener objects **listener1/listener2**

Select which listener and add in the following lines.

```}
,{
	"trackpath" : "audio/trackname.mp3",
	"trackname" : "trackname"
}
```

### Requirements

If you run npm install inside the folder it should grab all the relevant files for you.

```
git clone https://github.com/WatershedArts/SocketIOAudioTrigger.git
cd SocketIOAudioTrigger
npm install
```