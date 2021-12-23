#!/usr/bin/env python3


# ██╗    ██╗██╗  ██╗ █████╗ ████████╗███████╗ █████╗ ██████╗ ██████╗     ██████╗  ██████╗ ████████╗
# ██║    ██║██║  ██║██╔══██╗╚══██╔══╝██╔════╝██╔══██╗██╔══██╗██╔══██╗    ██╔══██╗██╔═══██╗╚══██╔══╝
# ██║ █╗ ██║███████║███████║   ██║   ███████╗███████║██████╔╝██████╔╝    ██████╔╝██║   ██║   ██║
# ██║███╗██║██╔══██║██╔══██║   ██║   ╚════██║██╔══██║██╔═══╝ ██╔═══╝     ██╔══██╗██║   ██║   ██║
# ╚███╔███╔╝██║  ██║██║  ██║   ██║   ███████║██║  ██║██║     ██║         ██████╔╝╚██████╔╝   ██║
#  ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝         ╚═════╝  ╚═════╝    ╚═╝

#                    _   _     _   _   _   _   _   _   _   _   _
#                   / \ / \   / \ / \ / \ / \ / \ / \ / \ / \ / \
#                  ( B | y ) ( F | r | a | g | n | a | r | o | K )
#                   \_/ \_/   \_/ \_/ \_/ \_/ \_/ \_/ \_/ \_/ \_/

# Github profile: https://github.com/FragnaroK
# Website:        https://fcanalejo.web.app

from selenium import webdriver
from os import path, getlogin

# Change the name of the browser that you want to run this bot
# Available browsers:
#       - Chrome
#       - Edge -> I would recommend this browser if you want to run this program for a long time on your computer, because it has less consuption of RAM
#       - Firefox
selectedBrowser = "Chrome"

# Here you can add the target, do not forget the area code +00
phone = "+61404558115"

# Url of whatsapp, do not change ir unless it is necesary
url = "https://web.whatsapp.com/send?phone={}".format(phone)

# Do not change this
dir_path = path.dirname(path.realpath(__file__))
user = getlogin()

# Only change it if the name of the javascript file change, or address
file = open(r"{}\messageScript.js".format(dir_path),
            "r", encoding="utf8")

# Check if all the addresses are okay, may change depending of your computer


def startBotOn(browser):
    global driver
    if browser == ("Chrome" or "chrome"):
        try:
            from selenium.webdriver.chrome.options import Options
            print("Chrome Module Found")
        except ModuleNotFoundError or ImportError as err:
            print("[!] ERROR: Selenium WebDriver Chrome Not Found")
            print(err)

        options = Options()
        options.add_argument(
            "--user-data-dir=C:\\Users\\{}\\AppData\\Local\\Google\\Chrome\\User Data\\Profile 2".format(user))
        options.add_argument("--disable-extensions")
        driver = webdriver.Chrome(
            executable_path='{}\\drivers\\chromedriver.exe'.format(dir_path), options=options)

    if browser == ("Edge" or "edge"):
        try:
            from selenium.webdriver.edge.options import Options
            print("Edge Module Found")
        except ModuleNotFoundError or ImportError as err:
            print("[!] ERROR:  Selenium WebDriver Edge Not Found")
            print(err)
        options = Options()
        options.add_argument(
            "--user-data-dir=C:\\Users\\{}\\AppData\\Local\\MicrosoftEdge\\User\\Default".format(
                user)
        )
        driver = webdriver.Edge(
            executable_path='{}\\drivers\\msedgedriver.exe'.format(dir_path), options=options)

    if browser == ("Firefox" or "firefox"):
        try:
            from selenium.webdriver.firefox.options import Options
            print("Firefox Module Found")
        except ModuleNotFoundError or ImportError as err:
            print("[!] ERROR: Selenium WebDriver Firefox Not Found")
            print(err)
        options = Options()
        options.add_argument(  # May you should have to change the profile name, look for this address -> C:\Users\%USERNAME%\AppData\Local\Mozilla\Profiles
            "--user-data-dir=C:\\Users\\{}\\AppData\\Local\\Mozilla\\Profiles\\2ql2x3dk.default-release".format(
                user)
        )
        driver = webdriver.Firefox(
            executable_path='{}\\drivers\\geckodriver.exe'.format(dir_path), options=options)


if __name__ == "__main__":
    startBotOn(selectedBrowser)
    driver.get(url)
    driver.execute_script(file.read())
