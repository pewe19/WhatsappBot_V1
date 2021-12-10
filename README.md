# WhatsApp Bot

## Index

1. [Introduction](#introduction)
   - [Compatibility](#compatibility)
2. [Usage](#usage)
   - [Python File (Chrome Launcher)](#python)
   - [JavaScript File (Messages)](#javascript)
3. [Contributions](#about-contributions)

## Introduction

A WhatsApp bot developed with:

- Python, using selenium
- JavaScript

I made it for **personal purposes** but modified some things to make it available to _anyone_ looking for a whatsapp bot that really _works well_.

Why did I do it? Well... Because I moved to the other side of the world leaving my life partner behind, so until we can meet again I have to find ways to keep the flame alive :D

After having a lot of headaches with bots from other developers, I realized that it was easier to do it myself (with some libraries of course) than to deal with other people's bugs. So I started this project with the idea of making a bot that is not intrusive for the user and that can stay active without any problem, eventually I realized that **doing it only with python was not going to give me what I wanted** so... I looked for a way to include a language that I'm still getting familiar with, **JavaScript**. Using selenium I was able to inject the javascript code into whatsapp web without having to do it manually.

### Compatibility

For now, this bot is compatible with the following browsers:

- Google Chrome
- Microsoft Edge
- Mozilla Firefox

## Usage

This project is divided into two parts:

1. A python file to open a google chrome window and inject the javascript file
2. A javascript file with the "Logic" of the bot and the phrases

### Python

In the following line you can change the number of the target you want to send messages to _(do not forget the area code "+00")_

    driver.get("https://web.whatsapp.com/send?phone=Number of the target")

### JavaScript

This bot has two modes:

1. Only Random Messages
2. Only Scheduled Messages (An hour or less of time between messages is a **MUST** for this mode, _this requeriment include random messages_)

> You can activate both at the same time

You can add phrases in the constant "phrases", don't forget the "cuotes" and ,commas,. You can change how much time it should wait between messages.

    const everyS = 3600000 // Here you can change the time (miliseconds). Default: every hour

    const phrases = [
        "Some phrase",
        "Another phrase"
    ]

These sentences will be sent _randomly_ every certain time you specify. If you want to send messages at an _exact time_, you can add phrases to the "schePhrases" constant and add the time to the "scheTime" constant. Let me explain this function in detail:

This is the structure of the scheduled phrases

    const schePhrases: [
            {
            phrase: "Some phrase", // Well, the phrase
            time: 12, // Here you should type the specific hour that you want to send it from 0 to 23
            },

    ]

    const scheTime = [12, 13, 1, 23] // Here you should put all the hours you put in the schePhrases time

> - Note-1: In scheTime constant, you DO NOT have to put repeated numbers. Just one time.
> - Note-2: It doesn't matters if you put several phrases for the same time, It will send them together.

## About Contributions

It's my first "bot" so I know there might be people who find bugs in it or manny ways to improve it, so if you want to give me some feedback or contribute to the project that would be great! :D

Also, English is not my first language, so I'd love if you could let me know if there are any grammatical errors.
